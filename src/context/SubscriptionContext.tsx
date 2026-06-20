"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useAuth } from "@/context/AuthContext";

type Plan = "monthly" | "yearly";

type SubscriptionContextValue = {
  plan: Plan | null;
  hasPremium: boolean;
  markPremium: (plan: Plan) => void;
  clearPremium: () => void;
};

const STORAGE_KEY = "summarist-subscription";
const SubscriptionContext = createContext<SubscriptionContextValue | null>(null);

function parsePlan(value: string | null) {
  return value === "monthly" || value === "yearly" ? value : null;
}

function getSavedPlans() {
  if (typeof window === "undefined") {
    return {} as Record<string, Plan>;
  }

  const rawPlans = window.localStorage.getItem(STORAGE_KEY);

  if (!rawPlans) {
    return {} as Record<string, Plan>;
  }

  try {
    const parsedPlans = JSON.parse(rawPlans) as Record<string, string>;

    return Object.fromEntries(
      Object.entries(parsedPlans).flatMap(([uid, value]) => {
        const plan = parsePlan(value);
        return plan ? [[uid, plan]] : [];
      }),
    ) as Record<string, Plan>;
  } catch {
    return {} as Record<string, Plan>;
  }
}

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [plansByUid, setPlansByUid] = useState<Record<string, Plan>>(getSavedPlans);
  const plan = user ? plansByUid[user.uid] ?? null : null;

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const savedPlans = getSavedPlans();
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(savedPlans));
  }, []);

  const markPremium = useCallback(
    (nextPlan: Plan) => {
      if (!user) {
        return;
      }

      setPlansByUid((currentPlans) => {
        const nextPlans = {
          ...currentPlans,
          [user.uid]: nextPlan,
        };

        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextPlans));
        return nextPlans;
      });
    },
    [user],
  );

  const clearPremium = useCallback(() => {
    if (!user) {
      return;
    }

    setPlansByUid((currentPlans) => {
      const nextPlans = { ...currentPlans };
      delete nextPlans[user.uid];
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextPlans));
      return nextPlans;
    });
  }, [user]);

  const value = useMemo<SubscriptionContextValue>(
    () => ({
      plan,
      hasPremium: Boolean(plan),
      markPremium,
      clearPremium,
    }),
    [clearPremium, markPremium, plan],
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
