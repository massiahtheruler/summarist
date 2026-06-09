import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Book } from "@/lib/books";

export type LibraryBook = Pick<
  Book,
  "id" | "author" | "title" | "subTitle" | "imageLink" | "subscriptionRequired"
> & {
  savedAt?: unknown;
};

function libraryCollectionPath(uid: string) {
  return collection(db, "users", uid, "library");
}

export async function saveLibraryBook(uid: string, book: LibraryBook) {
  await setDoc(doc(db, "users", uid, "library", book.id), {
    ...book,
    savedAt: serverTimestamp(),
  });
}

export async function removeLibraryBook(uid: string, bookId: string) {
  await deleteDoc(doc(db, "users", uid, "library", bookId));
}

export async function getLibraryBooks(uid: string) {
  const snapshot = await getDocs(
    query(libraryCollectionPath(uid), orderBy("savedAt", "desc")),
  );

  return snapshot.docs.map((libraryDoc) => ({
    id: libraryDoc.id,
    ...libraryDoc.data(),
  })) as LibraryBook[];
}
