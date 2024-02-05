"use server";

import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import type { DeletedBook } from "~/types/books";
import { ErrorMessage } from "./handleErrorMessage";

export default async function handleDeleteBookReq(bookId: string) {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  try {
    const bookDeleted = (await api.books.delete.mutate({
      id: bookId,
    })) as DeletedBook | null;

    if (!bookDeleted) {
      console.log(
        `No book with id ${bookId} was deleted. This can be due to a server error or the book was not found.`,
      );
    }

    return bookDeleted;
  } catch (error: unknown) {
    ErrorMessage(error, "deleting a book from inventory(server)");
  }
}
