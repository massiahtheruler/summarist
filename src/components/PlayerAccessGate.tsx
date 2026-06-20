"use client";

import Link from "next/link";
import { AudioPlayer } from "@/components/AudioPlayer";
import { useAuth } from "@/context/AuthContext";
import { useSubscription } from "@/context/SubscriptionContext";
import type { LibraryBook } from "@/lib/library";

type PlayerAccessGateProps = {
  audioLink: string;
  book: LibraryBook & {
    author: string;
    summary: string;
    title: string;
  };
};

export function PlayerAccessGate({
  audioLink,
  book,
}: PlayerAccessGateProps) {
  const { isAuthReady, openAuthModal, user } = useAuth();
  const { hasPremium } = useSubscription();

  if (!isAuthReady) {
    return (
      <section className="player-page">
        <div className="empty-state">
          <h2>Loading access...</h2>
          <p>Checking your account before opening this summary.</p>
        </div>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="player-page">
        <div className="empty-state">
          <h2>Log in to keep listening</h2>
          <p>This title is tied to your Summarist account access.</p>
          <button
            className="btn empty-state__button"
            onClick={openAuthModal}
            type="button"
          >
            Login
          </button>
        </div>
      </section>
    );
  }

  if (book.subscriptionRequired && !hasPremium) {
    return (
      <section className="player-page">
        <div className="empty-state">
          <h2>Premium required</h2>
          <p>
            This book&apos;s full reading and audio access is locked behind a
            premium membership.
          </p>
          <Link className="btn empty-state__button" href="/choose-plan">
            Upgrade to Premium
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="player-page">
      <div className="player-page__header">
        <p>{book.author}</p>
        <h1>{book.title}</h1>
      </div>
      <p className="player-page__summary">{book.summary}</p>
      <AudioPlayer audioLink={audioLink} book={book} />
    </section>
  );
}
