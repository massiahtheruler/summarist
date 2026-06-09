import { NextResponse } from "next/server";
import { getStripe, stripePrices } from "@/lib/stripe";

type CheckoutRequest = {
  email?: string | null;
  plan?: "monthly" | "yearly";
  uid?: string;
};

export async function POST(request: Request) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: "Missing STRIPE_SECRET_KEY in .env.local" },
      { status: 500 },
    );
  }

  const body = (await request.json()) as CheckoutRequest;
  const plan = body.plan === "yearly" ? "yearly" : "monthly";
  const price = stripePrices[plan];
  const origin = request.headers.get("origin") ?? "http://localhost:3000";
  const stripe = getStripe();

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer_email: body.email ?? undefined,
    client_reference_id: body.uid,
    line_items: [
      {
        price,
        quantity: 1,
      },
    ],
    subscription_data:
      plan === "yearly"
        ? {
            trial_period_days: 7,
          }
        : undefined,
    success_url: `${origin}/settings?checkout=success&plan=${plan}`,
    cancel_url: `${origin}/choose-plan?checkout=cancelled`,
  });

  if (!session.url) {
    return NextResponse.json(
      { error: "Stripe did not return a checkout URL" },
      { status: 500 },
    );
  }

  return NextResponse.json({ url: session.url });
}
