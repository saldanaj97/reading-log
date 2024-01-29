import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

import type { Book } from "@prisma/client";
import AddBook from "./_components/add-book";

export default async function Home() {
  noStore();
  const hello = await api.post.hello.query({ text: "from tRPC" });
  const session = await getServerAuthSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          <span className="text-[hsl(280,100%,70%)]">Potato</span>
        </h1>
        <div className="flex flex-col items-center gap-2">
          <p className="text-2xl text-white">
            {hello ? hello.greeting : "Loading tRPC query..."}
          </p>

          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-center text-2xl text-white">
              {session && <span>Logged in as {session.user?.name}</span>}
            </p>
            <Link
              href={session ? "/api/auth/signout" : "/api/auth/signin"}
              className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
            >
              {session ? "Sign out" : "Sign in"}
            </Link>
          </div>
        </div>

        <DisplayBooks />
        <AddBook />

        {/* <CrudShowcase /> */}
      </div>
    </main>
  );
}

async function DisplayBooks() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const books: Book[] = await api.books.findAll.query();

  if (!books) return <div>No books in your library</div>;

  return (
    <div className="w-full max-w-xs">
      <h1 className="flex flex-row justify-center">Books</h1>
      {books.map((book: Book) => (
        <div key={book.id} className="flex flex-row justify-center">
          <p>{book.title}</p>
          <p>{book.author}</p>
        </div>
      ))}
    </div>
  );
}

// async function AddBook() {
//   const session = await getServerAuthSession();
//   if (!session?.user) return null;

//   const testBook: NewBook = {
//     title: "test",
//     author: "bulby",
//     isbn: "1234567891",
//   };

//   // /const addNewBook: Book = await api.books.create.mutate(testBook);

//   return (
//     <div className="w-full max-w-xs">
//       <div className="flex flex-row justify-center">
//         <button onClick={() => addNewBook}>
//           <p>Add a book</p>
//         </button>
//       </div>
//     </div>
//   );
// }

async function CrudShowcase() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const latestPost = await api.post.getLatest.query();

  return (
    <div className="w-full max-w-xs">
      {latestPost ? (
        <p className="truncate">Your most recent post: {latestPost.name}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}

      <CreatePost />
    </div>
  );
}
