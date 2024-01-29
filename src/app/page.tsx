import { unstable_noStore as noStore } from "next/cache";

import AddBook from "./_components/add-book";
import { DisplayBooks } from "./_components/display-books";

// TODO: Make a global store for the session
export default async function Home() {
  noStore();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          <span className="text-[hsl(280,100%,70%)]">Potato</span>
        </h1>
        {/* <UserSignedInMessage /> */}
        <AddBook />
        <DisplayBooks />
      </div>
    </main>
  );
}
