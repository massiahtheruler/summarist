"use client";

import { useState } from "react";
import { FirebaseError } from "firebase/app";
import { useAuth } from "@/context/AuthContext";
import { saveFinishedBook, type LibraryBook } from "@/lib/library";

type AudioPlayerProps = {
  audioLink: string;
  book: LibraryBook;
};

function getFinishedErrorMessage(error: unknown) {
  if (error instanceof FirebaseError) {
    return `${error.code}: ${error.message}`;
  }

  return "Could not mark this book finished.";
}

export function AudioPlayer({ audioLink, book }: AudioPlayerProps) {
  const { user } = useAuth();
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");

  async function handleEnded() {
    if (!user || status === "saved" || status === "saving") {
      return;
    }

    setStatus("saving");
    setErrorMessage("");

    try {
      await saveFinishedBook(user.uid, book);
      setStatus("saved");
    } catch (error) {
      console.error("Finished book save failed", error);
      setErrorMessage(getFinishedErrorMessage(error));
      setStatus("error");
    }
  }

  return (
    <div className="player-audio">
      <audio
        className="audio-player"
        controls
        onEnded={handleEnded}
        src={audioLink}
      >
        <track kind="captions" />
      </audio>
      {status === "saved" ? (
        <p className="player-audio__status">Marked as finished.</p>
      ) : null}
      {status === "error" ? (
        <p className="player-audio__error">{errorMessage}</p>
      ) : null}
    </div>
  );
}
