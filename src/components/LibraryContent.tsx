"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";
import {
  getFinishedBooks,
  getLibraryBooks,
  removeFinishedBook,
  removeLibraryBook,
  type LibraryBook,
} from "@/lib/library";

export function LibraryContent() {
  const { isAuthReady, openAuthModal, user } = useAuth();
  const [books, setBooks] = useState<LibraryBook[]>([]);
  const [finishedBooks, setFinishedBooks] = useState<LibraryBook[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadLibrary() {
      if (!isAuthReady) {
        return;
      }

      if (!user) {
        setIsLoading(false);
        setBooks([]);
        setFinishedBooks([]);
        return;
      }

      setIsLoading(true);
      setError("");

      try {
        const [savedBooks, completedBooks] = await Promise.all([
          getLibraryBooks(user.uid),
          getFinishedBooks(user.uid),
        ]);

        if (isMounted) {
          setBooks(savedBooks);
          setFinishedBooks(completedBooks);
        }
      } catch {
        if (isMounted) {
          setError("Could not load your library.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadLibrary();

    return () => {
      isMounted = false;
    };
  }, [isAuthReady, user]);

  async function handleRemove(bookId: string) {
    if (!user) {
      return;
    }

    await removeLibraryBook(user.uid, bookId);
    setBooks((currentBooks) => currentBooks.filter((book) => book.id !== bookId));
  }

  async function handleRemoveFinished(bookId: string) {
    if (!user) {
      return;
    }

    await removeFinishedBook(user.uid, bookId);
    setFinishedBooks((currentBooks) =>
      currentBooks.filter((book) => book.id !== bookId),
    );
  }

  if (!isAuthReady || isLoading) {
    return (
      <section className="library-page">
        <h1>My Library</h1>
        <div className="empty-state">
          <h2>Loading your saved books...</h2>
        </div>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="library-page">
        <h1>My Library</h1>
        <div className="empty-state">
          <h2>Log in to view your library</h2>
          <p>Your saved books are attached to your account.</p>
          <button className="btn empty-state__button" onClick={openAuthModal} type="button">
            Login
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="library-page">
      <h1>My Library</h1>
      {error ? <p className="library-page__error">{error}</p> : null}
      <LibrarySection
        books={books}
        emptyDescription="Add a title from any book page and it will show up here."
        emptyTitle="Saved books will appear here"
        onRemove={handleRemove}
        title="Saved Books"
      />
      <LibrarySection
        books={finishedBooks}
        emptyDescription="When an audio summary reaches the end, it will show up here."
        emptyTitle="Finished books will appear here"
        onRemove={handleRemoveFinished}
        title="Finished Books"
      />
    </section>
  );
}

type LibrarySectionProps = {
  books: LibraryBook[];
  emptyDescription: string;
  emptyTitle: string;
  onRemove: (bookId: string) => void;
  title: string;
};

function LibrarySection({
  books,
  emptyDescription,
  emptyTitle,
  onRemove,
  title,
}: LibrarySectionProps) {
  return (
    <section className="library-section">
      <h2>{title}</h2>
      {books.length === 0 ? (
        <div className="empty-state">
          <h3>{emptyTitle}</h3>
          <p>{emptyDescription}</p>
        </div>
      ) : (
        <div className="library-list">
          {books.map((book) => (
            <article className="library-list__item" key={book.id}>
              <Link className="library-list__book" href={`/book/${book.id}`}>
                <Image
                  src={book.imageLink}
                  alt={book.title}
                  width={80}
                  height={120}
                />
                <span>
                  <strong>{book.title}</strong>
                  <small>{book.author}</small>
                  <em>{book.subTitle}</em>
                </span>
              </Link>
              <button
                aria-label={`Remove ${book.title} from ${title}`}
                className="library-list__remove"
                onClick={() => onRemove(book.id)}
                type="button"
              >
                <FiTrash2 aria-hidden="true" />
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
