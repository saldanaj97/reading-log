import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { type Book } from "~/types/books";
import AddBook from "./add-book";
import BookModal from "./book-modal";

export async function DisplayBooks() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const books = (await api.books.fetchAll.query()) as unknown as Book[] | null;

  if (!books) return <div>No books in your library</div>;

  return (
    <>
      <h1 className="flex flex-row justify-center text-4xl font-bold">
        Books Owned
      </h1>
      <div className="flex w-full flex-row flex-wrap justify-center overflow-auto">
        <BookModal books={books} />
        <AddBook />
      </div>
    </>
  );
}
