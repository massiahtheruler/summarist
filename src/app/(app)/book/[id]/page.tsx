import Image from "next/image";
import { notFound } from "next/navigation";
import { BsStarFill } from "react-icons/bs";
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
          <div className="book-detail__actions">
            <a className="btn" href={`/player/${book.id}`}>
              Read
            </a>
            <a className="btn btn--secondary" href={`/player/${book.id}`}>
              Listen
            </a>
          </div>
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
