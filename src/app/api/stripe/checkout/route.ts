import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getOnboardingSession } from "@/lib/session";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!);
}

export async function POST() {
  const session = await getOnboardingSession();
  if (!session) {
    return NextResponse.json({ error: "No onboarding session" }, { status: 401 });
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const stripe = getStripe();

  // Base $50 flat price (STRIPE_BASE_PRICE_ID; STRIPE_PRICE_ID kept as fallback
  // for back-compat) + a usage-metered overage price tied to the credits meter.
  const basePriceId = process.env.STRIPE_BASE_PRICE_ID || process.env.STRIPE_PRICE_ID;
  const meteredPriceId = process.env.STRIPE_METERED_PRICE_ID;
  if (!basePriceId) {
    return NextResponse.json({ error: "Stripe base price not configured" }, { status: 500 });
  }

  const lineItems: Array<{ price: string; quantity?: number }> = [
    { price: basePriceId, quantity: 1 },
  ];
  // Metered prices take no quantity — usage is reported via meter events.
  if (meteredPriceId) {
    lineItems.push({ price: meteredPriceId });
  }

  const metadata = {
    teamId: session.teamId,
    userId: session.userId,
    teamName: session.teamName,
  };

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: lineItems,
    metadata,
    // Mirror metadata onto the subscription so customer.subscription.* and
    // invoice.* webhooks (which don't carry checkout metadata) can resolve teamId.
    subscription_data: { metadata },
    success_url: `${appUrl}/onboard/success`,
    cancel_url: `${appUrl}/onboard/complete`,
  });

  return NextResponse.json({ url: checkoutSession.url });
}
