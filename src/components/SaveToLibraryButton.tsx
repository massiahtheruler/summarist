"use client";

import { useState } from "react";
import { FirebaseError } from "firebase/app";
import { FiBookmark } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";
import { saveLibraryBook, type LibraryBook } from "@/lib/library";

type SaveToLibraryButtonProps = {
  book: LibraryBook;
};

export function SaveToLibraryButton({ book }: SaveToLibraryButtonProps) {
  const { isAuthReady, openAuthModal, user } = useAuth();
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");

  function getLibraryErrorMessage(error: unknown) {
    if (error instanceof FirebaseError) {
      if (error.code === "permission-denied") {
        return "Permission denied. Check Firestore rules and make sure you are logged in.";
      }

      if (error.code === "unavailable") {
        return "Firestore is unavailable right now. Try again.";
      }

      return `${error.code}: ${error.message}`;
    }

    return "Could not save this book.";
  }

  async function handleSave() {
    if (!isAuthReady) {
      return;
    }

    if (!user) {
      openAuthModal();
      return;
    }

    setStatus("saving");
    setErrorMessage("");

    try {
      await saveLibraryBook(user.uid, book);
      setStatus("saved");
    } catch (error) {
      console.error("Library save failed", error);
      setErrorMessage(getLibraryErrorMessage(error));
      setStatus("error");
    }
  }

  return (
    <div className="library-save">
      <button
        className="library-save__button"
        disabled={!isAuthReady || status === "saving"}
        onClick={handleSave}
        type="button"
      >
        <FiBookmark aria-hidden="true" />
        {status === "saving"
          ? "Saving..."
          : status === "saved"
            ? "Added to My Library"
            : "Add title to My Library"}
      </button>
      {status === "error" ? (
        <p className="library-save__error">{errorMessage}</p>
      ) : null}
    </div>
  );
}
