"use client";

import { useState } from "react";
import { FiCheck } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";
import { useSubscription } from "@/context/SubscriptionContext";

type Plan = "monthly" | "yearly";

const planDetails = {
  monthly: {
    title: "Premium",
    price: "$9.99",
    cadence: "month",
    description: "Unlimited summaries for steady everyday reading.",
  },
  yearly: {
    title: "Premium Plus",
    price: "$99.99",
    cadence: "year",
    description: "Best value with a 7-day free trial included.",
  },
};

const perks = [
  "Unlimited book summaries",
  "Full audio player access",
  "Read and listen on every device",
  "Premium book access",
];

export function PlanSelector() {
  const { isAuthReady, openAuthModal, user } = useAuth();
  const { hasPremium } = useSubscription();
  const [selectedPlan, setSelectedPlan] = useState<Plan>("yearly");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const plan = planDetails[selectedPlan];

  async function startCheckout() {
    if (!isAuthReady) {
      return;
    }

    if (!user) {
      setError("Log in first so we can attach the subscription to your account.");
      openAuthModal();
      return;
    }

    if (hasPremium) {
      setError("You already have premium access on this account.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          plan: selectedPlan,
          uid: user.uid,
        }),
      });
      const data = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !data.url) {
        throw new Error(data.error ?? "Unable to start checkout.");
      }

      window.location.href = data.url;
    } catch (checkoutError) {
      setError(
        checkoutError instanceof Error
          ? checkoutError.message
          : "Unable to start checkout.",
      );
      setIsLoading(false);
    }
  }

  return (
    <div className="plans">
      <div className="plans__toggle" role="tablist" aria-label="Billing options">
        <button
          className={selectedPlan === "monthly" ? "plans__tab plans__tab--active" : "plans__tab"}
          onClick={() => setSelectedPlan("monthly")}
          type="button"
        >
          Monthly
        </button>
        <button
          className={selectedPlan === "yearly" ? "plans__tab plans__tab--active" : "plans__tab"}
          onClick={() => setSelectedPlan("yearly")}
          type="button"
        >
          Yearly
        </button>
      </div>

      <section className="plans__card" aria-live="polite">
        <div>
          <p className="plans__label">{plan.title}</p>
          <h2>
            {plan.price}
            <span>/{plan.cadence}</span>
          </h2>
          <p>{plan.description}</p>
        </div>

        <ul className="plans__perks">
          {perks.map((perk) => (
            <li key={perk}>
              <FiCheck aria-hidden="true" />
              {perk}
            </li>
          ))}
        </ul>

        {selectedPlan === "yearly" ? (
          <p className="plans__trial">7-day free trial, then yearly billing.</p>
        ) : null}

        {error ? <p className="plans__error">{error}</p> : null}

        <button
          className="btn plans__button"
          disabled={isLoading || !isAuthReady || hasPremium}
          onClick={startCheckout}
          type="button"
        >
          {hasPremium
            ? "Premium active"
            : isLoading
              ? "Opening checkout..."
              : "Start your free trial"}
        </button>
      </section>
    </div>
  );
}
