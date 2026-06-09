"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useSubscription } from "@/context/SubscriptionContext";

type BookActionsProps = {
  bookId: string;
  subscriptionRequired: boolean;
};

export function BookActions({
  bookId,
  subscriptionRequired,
}: BookActionsProps) {
  const router = useRouter();
  const { isAuthReady, openAuthModal, user } = useAuth();
  const { hasPremium } = useSubscription();

  function handleAccess() {
    if (!isAuthReady) {
      return;
    }

    if (!user) {
      openAuthModal();
      return;
    }

    if (subscriptionRequired && !hasPremium) {
      router.push("/choose-plan");
      return;
    }

    router.push(`/player/${bookId}`);
  }

  return (
    <div className="book-detail__actions">
      <button className="btn" disabled={!isAuthReady} onClick={handleAccess} type="button">
        Read
      </button>
      <button
        className="btn btn--secondary"
        disabled={!isAuthReady}
        onClick={handleAccess}
        type="button"
      >
        Listen
      </button>
    </div>
  );
}
