import { NextResponse } from "next/server";
import { searchBooks } from "@/lib/books";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query")?.trim();

  if (!query) {
    return NextResponse.json([]);
  }

  const books = await searchBooks(query);
  return NextResponse.json(books);
}
