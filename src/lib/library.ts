import {
  collection,
  deleteDoc,
  doc,
  getDoc,
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

function finishedCollectionPath(uid: string) {
  return collection(db, "users", uid, "finished");
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

export async function hasLibraryBook(uid: string, bookId: string) {
  const libraryDoc = await getDoc(doc(db, "users", uid, "library", bookId));
  return libraryDoc.exists();
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

export async function saveFinishedBook(uid: string, book: LibraryBook) {
  await setDoc(doc(db, "users", uid, "finished", book.id), {
    ...book,
    finishedAt: serverTimestamp(),
  });
}

export async function removeFinishedBook(uid: string, bookId: string) {
  await deleteDoc(doc(db, "users", uid, "finished", bookId));
}

export async function getFinishedBooks(uid: string) {
  const snapshot = await getDocs(
    query(finishedCollectionPath(uid), orderBy("finishedAt", "desc")),
  );

  return snapshot.docs.map((finishedDoc) => ({
    id: finishedDoc.id,
    ...finishedDoc.data(),
  })) as LibraryBook[];
}
