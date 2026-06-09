"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";
import {
  getLibraryBooks,
  removeLibraryBook,
  type LibraryBook,
} from "@/lib/library";

export function LibraryContent() {
  const { isAuthReady, openAuthModal, user } = useAuth();
  const [books, setBooks] = useState<LibraryBook[]>([]);
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
        return;
      }

      setIsLoading(true);
      setError("");

      try {
        const savedBooks = await getLibraryBooks(user.uid);

        if (isMounted) {
          setBooks(savedBooks);
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
      {books.length === 0 ? (
        <div className="empty-state">
          <h2>Saved books will appear here</h2>
          <p>Add a title from any book page and it will show up here.</p>
        </div>
      ) : (
        <div className="library-list">
          {books.map((book) => (
            <article className="library-list__item" key={book.id}>
              <Link className="library-list__book" href={`/book/${book.id}`}>
                <Image src={book.imageLink} alt={book.title} width={80} height={120} />
                <span>
                  <strong>{book.title}</strong>
                  <small>{book.author}</small>
                  <em>{book.subTitle}</em>
                </span>
              </Link>
              <button
                aria-label={`Remove ${book.title} from library`}
                className="library-list__remove"
                onClick={() => handleRemove(book.id)}
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
