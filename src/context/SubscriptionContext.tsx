"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type Plan = "monthly" | "yearly";

type SubscriptionContextValue = {
  plan: Plan | null;
  hasPremium: boolean;
  markPremium: (plan: Plan) => void;
  clearPremium: () => void;
};

const STORAGE_KEY = "summarist-subscription";
const SubscriptionContext = createContext<SubscriptionContextValue | null>(null);

function getSavedPlan() {
  if (typeof window === "undefined") {
    return null;
  }

  const savedPlan = window.localStorage.getItem(STORAGE_KEY);
  return savedPlan === "monthly" || savedPlan === "yearly" ? savedPlan : null;
}

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<Plan | null>(getSavedPlan);

  const value = useMemo<SubscriptionContextValue>(
    () => ({
      plan,
      hasPremium: Boolean(plan),
      markPremium: (nextPlan) => {
        setPlan(nextPlan);
        window.localStorage.setItem(STORAGE_KEY, nextPlan);
      },
      clearPremium: () => {
        setPlan(null);
        window.localStorage.removeItem(STORAGE_KEY);
      },
    }),
    [plan],
  );

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);

  if (!context) {
    throw new Error("useSubscription must be used inside SubscriptionProvider");
  }

  return context;
}
