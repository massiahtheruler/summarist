"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import type { Book } from "@/lib/books";

export function SearchBar() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const debounceRef = useRef<number | null>(null);

  function handleSearchChange(value: string) {
    setSearch(value);
    const trimmedValue = value.trim();

    if (debounceRef.current) {
      window.clearTimeout(debounceRef.current);
    }

    if (!trimmedValue) {
      setResults([]);
      setIsLoading(false);
      debounceRef.current = null;
      return;
    }

    setIsLoading(true);
    debounceRef.current = window.setTimeout(async () => {
      try {
        const response = await fetch(
          `/api/search?query=${encodeURIComponent(trimmedValue)}`,
        );
        const data = (await response.json()) as Book[];
        setResults(data);
      } catch {
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);
  }

  return (
    <div className="search">
      <div className="search__input-wrap">
        <FiSearch aria-hidden="true" />
        <input
          aria-label="Search by title or author"
          className="search__input"
          onChange={(event) => handleSearchChange(event.target.value)}
          placeholder="Search for books"
          type="search"
          value={search}
        />
      </div>

      {search.trim() ? (
        <div className="search__results">
          {isLoading ? <div className="search__state">Searching...</div> : null}
          {!isLoading && results.length === 0 ? (
            <div className="search__state">No books found</div>
          ) : null}
          {!isLoading
            ? results.slice(0, 5).map((book) => (
                <Link className="search__result" href={`/book/${book.id}`} key={book.id}>
                  <Image src={book.imageLink} alt="" width={40} height={60} />
                  <span>
                    <strong>{book.title}</strong>
                    <small>{book.author}</small>
                  </span>
                </Link>
              ))
            : null}
        </div>
      ) : null}
    </div>
  );
}
