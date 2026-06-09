"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useSubscription } from "@/context/SubscriptionContext";

export function SettingsContent() {
  const searchParams = useSearchParams();
  const { isAuthReady, openAuthModal, user } = useAuth();
  const { hasPremium, markPremium, plan } = useSubscription();

  useEffect(() => {
    const checkoutStatus = searchParams.get("checkout");
    const checkoutPlan = searchParams.get("plan");

    if (
      checkoutStatus === "success" &&
      (checkoutPlan === "monthly" || checkoutPlan === "yearly")
    ) {
      markPremium(checkoutPlan);
    }
  }, [markPremium, searchParams]);

  if (!isAuthReady) {
    return (
      <section className="settings-page">
        <h1>Settings</h1>
        <div className="settings-panel">
          <p className="settings-panel__label">Loading account...</p>
        </div>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="settings-page">
        <h1>Settings</h1>
        <div className="settings-panel settings-panel--stacked">
          <div>
            <p className="settings-panel__label">You are not logged in</p>
            <p className="settings-panel__value">Log in to view your account.</p>
          </div>
          <button className="btn settings-panel__button" onClick={openAuthModal} type="button">
            Login
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="settings-page">
      <h1>Settings</h1>
      <div className="settings-panel">
        <div>
          <p className="settings-panel__label">Your Subscription plan</p>
          <p className="settings-panel__value">
            {hasPremium
              ? plan === "yearly"
                ? "Premium Plus"
                : "Premium"
              : "Basic"}
          </p>
        </div>
        {hasPremium ? (
          <span className="settings-panel__badge">Active</span>
        ) : (
          <Link className="btn settings-panel__button" href="/choose-plan">
            Upgrade to Premium
          </Link>
        )}
      </div>
      <div className="settings-panel">
        <div>
          <p className="settings-panel__label">Email</p>
          <p className="settings-panel__value">{user.email ?? "Signed in user"}</p>
        </div>
      </div>
    </section>
  );
}
