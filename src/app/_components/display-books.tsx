import Image from "next/image";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { type Book } from "~/types/books";

export async function DisplayBooks() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const books = (await api.books.findAll.query()) as unknown as Book[] | null;

  if (!books) return <div>No books in your library</div>;

  return (
    <div className="">
      <h1 className="flex flex-row justify-center text-4xl font-bold">
        Books Owned
      </h1>
      <div className="flex w-full flex-row flex-wrap justify-center overflow-auto">
        {books.map((book: Book) => (
          <div key={book.id} className="m-1 flex flex-col p-2">
            {!book.thumbnail ||
            book.thumbnail === null ||
            book.thumbnail === undefined ? (
              <div className="flex flex-row justify-center">
                <div className="h-40 w-28 bg-slate-300 object-cover">
                  <p className="aling-center text-center text-black">
                    {book.title}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-row justify-center">
                <Image
                  src={book.thumbnail}
                  alt={book.title}
                  className="h-40 w-28 object-cover"
                  width={112}
                  height={160}
                />
              </div>
            )}
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
