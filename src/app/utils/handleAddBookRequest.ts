"use server";

import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import type { NewBook } from "~/types/books";

export default async function handleAddBookReq({ book }: { book: NewBook }) {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  try {
    const bookInfo = await api.books.fetchBookInfo.query({
      title: book.title,
      author: book.author,
    });

    if (!bookInfo) {
      alert("No book info found for that title and author. Please try again.");
    }

    const newBookWithCorrectedInfo: NewBook = {
      title: bookInfo.volumeInfo.title,
      author: bookInfo.volumeInfo.authors[0]!,
      id: bookInfo.id,
      etag: bookInfo.etag,
    };

    const addedBook = await api.books.create.mutate(newBookWithCorrectedInfo);
    return addedBook;
  } catch (error) {
    console.error("Error adding book:", error);
    throw error;
  }
}
