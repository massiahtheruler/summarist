import Stripe from "stripe";

export function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new Error("Missing STRIPE_SECRET_KEY in .env.local");
  }

  return new Stripe(secretKey, {
    apiVersion: "2026-05-27.dahlia",
  });
}

export const stripePrices = {
  monthly: process.env.STRIPE_MONTHLY_PRICE_ID ?? "price_1TgHcCPUXNL9ggXmwjOZZMgR",
  yearly: process.env.STRIPE_YEARLY_PRICE_ID ?? "price_1TgHy5PUXNL9ggXmSJgLnj1V",
};
