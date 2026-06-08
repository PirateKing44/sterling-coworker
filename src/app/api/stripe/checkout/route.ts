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

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID!,
        quantity: 1,
      },
    ],
    metadata: {
      teamId: session.teamId,
      userId: session.userId,
      teamName: session.teamName,
    },
    success_url: `${appUrl}/onboard/success`,
    cancel_url: `${appUrl}/onboard/complete`,
  });

  return NextResponse.json({ url: checkoutSession.url });
}
