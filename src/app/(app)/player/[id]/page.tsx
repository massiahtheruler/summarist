import { notFound } from "next/navigation";
import { PlayerAccessGate } from "@/components/PlayerAccessGate";
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
    <PlayerAccessGate
      audioLink={book.audioLink}
      book={{
        id: book.id,
        author: book.author,
        title: book.title,
        subTitle: book.subTitle,
        imageLink: book.imageLink,
        subscriptionRequired: book.subscriptionRequired,
        summary: book.summary,
      }}
    />
  );
}
