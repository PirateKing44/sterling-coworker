import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/lib/firebase";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!);
}

const BUCKET_CREDITS = 20000; // one $50 bucket = 20,000 credits

/** Subscription quantity = number of $50 buckets (the high-water tier). */
function quantityFromSubscription(sub: Stripe.Subscription): number {
  return sub.items?.data?.[0]?.quantity || 1;
}

/** Period bounds live on the subscription (older API) or its items (newer API). */
function periodFromSubscription(sub: Stripe.Subscription): { start: string | null; end: string | null } {
  const s = sub as unknown as {
    current_period_start?: number;
    current_period_end?: number;
    items?: { data?: Array<{ current_period_start?: number; current_period_end?: number }> };
  };
  const startTs = s.current_period_start ?? s.items?.data?.[0]?.current_period_start ?? null;
  const endTs = s.current_period_end ?? s.items?.data?.[0]?.current_period_end ?? null;
  return {
    start: startTs ? new Date(startTs * 1000).toISOString() : null,
    end: endTs ? new Date(endTs * 1000).toISOString() : null,
  };
}

/** Resolve the Slack teamId from subscription metadata, else by stripeCustomerId. */
async function resolveTeamId(opts: { teamId?: string | null; customerId?: string | null }): Promise<string | null> {
  if (opts.teamId) return opts.teamId;
  if (opts.customerId) {
    const snap = await db
      .collection("workspaces")
      .where("stripeCustomerId", "==", opts.customerId)
      .limit(1)
      .get();
    if (!snap.empty) return snap.docs[0].id;
  }
  return null;
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const stripe = getStripe();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error("Stripe webhook signature verification failed:", msg);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const teamId = session.metadata?.teamId;
        const subId = session.subscription as string;
        if (teamId) {
          let qty = 1;
          try {
            const sub = await stripe.subscriptions.retrieve(subId);
            qty = quantityFromSubscription(sub);
          } catch {
            /* default qty 1 */
          }
          await db.collection("workspaces").doc(teamId).set(
            {
              planTier: "team",
              plan: "team",
              stripeCustomerId: session.customer as string,
              stripeSubscriptionId: subId,
              subscriptionStatus: "active",
              subscriptionQuantity: qty,
              // Prepaid wallet: seed the balance to the bucket allotment.
              creditBalance: qty * BUCKET_CREDITS,
              creditsUsedThisPeriod: 0,
              rechargeCentsThisCycle: 0,
              autoRechargeEnabled: true,
              paidAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
            { merge: true }
          );
        }
        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const sub = event.data.object as Stripe.Subscription;
        const teamId = await resolveTeamId({
          teamId: sub.metadata?.teamId,
          customerId: sub.customer as string,
        });
        if (teamId) {
          const { start, end } = periodFromSubscription(sub);
          // Mirror quantity (tier) + status; the wallet itself only resets on a
          // paid invoice (see invoice.payment_succeeded), not on quantity changes.
          await db.collection("workspaces").doc(teamId).set(
            {
              stripeSubscriptionId: sub.id,
              subscriptionStatus: sub.status,
              subscriptionQuantity: quantityFromSubscription(sub),
              currentPeriodStart: start,
              currentPeriodEnd: end,
              updatedAt: new Date().toISOString(),
            },
            { merge: true }
          );
        }
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        const subId = (invoice as unknown as { subscription?: string }).subscription;
        const teamId = await resolveTeamId({
          teamId: invoice.metadata?.teamId,
          customerId: invoice.customer as string,
        });
        // Only subscription invoices reach here (off-session top-ups are bare
        // PaymentIntents, not invoices). Each one is a CYCLE RESET: refill the
        // wallet to qty × 20,000 and zero the per-cycle counters.
        if (teamId) {
          let qty = 1;
          let start: string | null = null;
          let end: string | null = null;
          if (subId) {
            try {
              const sub = await stripe.subscriptions.retrieve(subId);
              qty = quantityFromSubscription(sub);
              ({ start, end } = periodFromSubscription(sub));
            } catch {
              /* best-effort */
            }
          }
          await db.collection("workspaces").doc(teamId).set(
            {
              subscriptionStatus: "active",
              subscriptionQuantity: qty,
              creditBalance: qty * BUCKET_CREDITS,
              creditsUsedThisPeriod: 0,
              rechargeCentsThisCycle: 0,
              ...(start ? { currentPeriodStart: start } : {}),
              ...(end ? { currentPeriodEnd: end } : {}),
              updatedAt: new Date().toISOString(),
            },
            { merge: true }
          );
        }
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const teamId = await resolveTeamId({
          teamId: invoice.metadata?.teamId,
          customerId: invoice.customer as string,
        });
        if (teamId) {
          await db.collection("workspaces").doc(teamId).set(
            { subscriptionStatus: "past_due", updatedAt: new Date().toISOString() },
            { merge: true }
          );
        }
        break;
      }

      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        const teamId = await resolveTeamId({
          teamId: sub.metadata?.teamId,
          customerId: sub.customer as string,
        });
        if (teamId) {
          await db.collection("workspaces").doc(teamId).set(
            { subscriptionStatus: "canceled", updatedAt: new Date().toISOString() },
            { merge: true }
          );
        }
        break;
      }

      case "payment_intent.succeeded": {
        // Off-session auto-recharge top-ups (metadata.kind === "topup") are
        // credited synchronously by the app at charge time — this webhook is a
        // deliberate NO-OP so credits are never double-counted.
        break;
      }

      default:
        break;
    }
  } catch (err) {
    console.error("Stripe webhook handler error:", err instanceof Error ? err.message : err);
    // Return 500 so Stripe retries on transient Firestore failures.
    return NextResponse.json({ error: "Handler error" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
