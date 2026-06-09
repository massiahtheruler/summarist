import Image from "next/image";
import Link from "next/link";
import { BsStarFill } from "react-icons/bs";
import { FiClock } from "react-icons/fi";
import type { Book } from "@/lib/books";

type BookCardProps = {
  book: Book;
  layout?: "horizontal" | "compact";
};

export function BookCard({ book, layout = "compact" }: BookCardProps) {
  return (
    <Link className={`book-card book-card--${layout}`} href={`/book/${book.id}`}>
      <div className="book-card__image-wrap">
        <Image
          className="book-card__image"
          src={book.imageLink}
          alt={book.title}
          width={160}
          height={240}
        />
        {book.subscriptionRequired ? (
          <span className="book-card__pill">Premium</span>
        ) : null}
      </div>
      <div className="book-card__content">
        <h3 className="book-card__title">{book.title}</h3>
        <p className="book-card__subtitle">{book.subTitle}</p>
        <p className="book-card__author">{book.author}</p>
        <div className="book-card__meta">
          <span>
            <BsStarFill aria-hidden="true" />
            {book.averageRating}
          </span>
          <span>
            <FiClock aria-hidden="true" />
            {book.keyIdeas} key ideas
          </span>
        </div>
      </div>
    </Link>
  );
}
