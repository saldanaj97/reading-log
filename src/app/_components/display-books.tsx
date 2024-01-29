import { type Book } from "@prisma/client";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export async function DisplayBooks() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const books: Book[] = await api.books.findAll.query();

  if (!books) return <div>No books in your library</div>;

  return (
    <div className="">
      <h1 className="flex flex-row justify-center text-4xl font-bold">Books</h1>
      <div className="flex w-full flex-row flex-wrap justify-center overflow-auto">
        {books.map((book: Book) => (
          <div key={book.id} className="m-1 flex flex-col p-2">
            <div className="flex flex-row justify-center">
              <div className="h-40 w-28 bg-slate-300 object-cover" />
            </div>
            <p className="max-w-[100px] overflow-hidden overflow-ellipsis whitespace-nowrap text-center">
              {book.title}
            </p>
            <p className="max-w-[100px] overflow-hidden overflow-ellipsis whitespace-nowrap text-center">
              {book.author}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
