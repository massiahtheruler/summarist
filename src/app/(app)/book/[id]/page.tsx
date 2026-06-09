import Image from "next/image";
import { notFound } from "next/navigation";
import { BsStarFill } from "react-icons/bs";
import { BookActions } from "@/components/BookActions";
import { SaveToLibraryButton } from "@/components/SaveToLibraryButton";
import { getBookById } from "@/lib/books";

type BookPageProps = {
  params: Promise<{ id: string }>;
};

export default async function BookPage({ params }: BookPageProps) {
  const { id } = await params;
  const book = await getBookById(id).catch(() => null);

  if (!book) {
    notFound();
  }

  return (
    <article className="book-detail">
      <div className="book-detail__intro">
        <div>
          <h1>{book.title}</h1>
          <p className="book-detail__subtitle">{book.subTitle}</p>
          <p className="book-detail__author">{book.author}</p>
          <div className="book-detail__meta">
            <span>
              <BsStarFill aria-hidden="true" />
              {book.averageRating} ({book.totalRating} ratings)
            </span>
            <span>{book.keyIdeas} key ideas</span>
            <span>{book.type}</span>
          </div>
          <BookActions
            bookId={book.id}
            subscriptionRequired={book.subscriptionRequired}
          />
          <SaveToLibraryButton
            book={{
              id: book.id,
              author: book.author,
              title: book.title,
              subTitle: book.subTitle,
              imageLink: book.imageLink,
              subscriptionRequired: book.subscriptionRequired,
            }}
          />
        </div>
        <Image
          className="book-detail__image"
          src={book.imageLink}
          alt={book.title}
          width={240}
          height={360}
        />
      </div>

      <section className="book-detail__section">
        <h2>What&apos;s it about?</h2>
        <p>{book.bookDescription}</p>
      </section>

      <section className="book-detail__section">
        <h2>About the author</h2>
        <p>{book.authorDescription}</p>
      </section>
    </article>
  );
}
