import { BookCard } from "@/components/BookCard";
import { getBooksByStatus } from "@/lib/books";

export default async function ForYouPage() {
  const [selectedBooks, recommendedBooks, suggestedBooks] = await Promise.all([
    getBooksByStatus("selected"),
    getBooksByStatus("recommended"),
    getBooksByStatus("suggested"),
  ]);

  const selectedBook = selectedBooks[0];

  return (
    <div className="page-stack">
      <section className="app-section">
        <div className="section-heading">
          <div>
            <h1>Selected just for you</h1>
          </div>
        </div>
        {selectedBook ? (
          <BookCard book={selectedBook} layout="horizontal" />
        ) : null}
      </section>

      <section className="app-section">
        <div className="section-heading">
          <div>
            <h2>Recommended For You</h2>
            <p>We think you&apos;ll like these</p>
          </div>
        </div>
        <div className="book-grid">
          {recommendedBooks.map((book) => (
            <BookCard book={book} key={book.id} />
          ))}
        </div>
      </section>

      <section className="app-section">
        <div className="section-heading">
          <div>
            <h2>Suggested Books</h2>
            <p>Browse those books</p>
          </div>
        </div>
        <div className="book-grid">
          {suggestedBooks.map((book) => (
            <BookCard book={book} key={book.id} />
          ))}
        </div>
      </section>
    </div>
  );
}
