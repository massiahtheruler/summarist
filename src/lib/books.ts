export type Book = {
  id: string;
  author: string;
  title: string;
  subTitle: string;
  imageLink: string;
  audioLink: string;
  totalRating: number;
  averageRating: number;
  keyIdeas: number;
  type: string;
  status: "selected" | "recommended" | "suggested";
  subscriptionRequired: boolean;
  summary: string;
  tags: string[];
  bookDescription: string;
  authorDescription: string;
};

const API_BASE = "https://us-central1-summaristt.cloudfunctions.net";

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`Book API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export function getBooksByStatus(status: Book["status"]) {
  return fetchJson<Book[]>(`${API_BASE}/getBooks?status=${status}`);
}

export function getBookById(id: string) {
  return fetchJson<Book>(`${API_BASE}/getBook?id=${id}`);
}

export function searchBooks(search: string) {
  const encodedSearch = encodeURIComponent(search);
  return fetchJson<Book[]>(
    `${API_BASE}/getBooksByAuthorOrTitle?search=${encodedSearch}`,
  );
}
