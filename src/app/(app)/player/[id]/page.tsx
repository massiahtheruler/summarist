import { notFound } from "next/navigation";
import { getBookById } from "@/lib/books";

type PlayerPageProps = {
  params: Promise<{ id: string }>;
};

export default async function PlayerPage({ params }: PlayerPageProps) {
  const { id } = await params;
  const book = await getBookById(id).catch(() => null);

  if (!book) {
    notFound();
  }

  return (
    <section className="player-page">
      <div className="player-page__header">
        <p>{book.author}</p>
        <h1>{book.title}</h1>
      </div>
      <p className="player-page__summary">{book.summary}</p>
      <audio className="audio-player" controls src={book.audioLink}>
        <track kind="captions" />
      </audio>
    </section>
  );
}
