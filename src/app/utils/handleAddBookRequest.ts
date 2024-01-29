"use server";

import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import type { NewBook } from "~/types/books";

export default async function handleAddBookReq({ book }: { book: NewBook }) {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  try {
    const addedBook = await api.books.create.mutate(book);
    return addedBook;
  } catch (error) {
    console.error("Error adding book:", error);
    throw error;
  }
}
