import { unstable_noStore as noStore } from "next/cache";
import { DisplayBooks } from "./_components/books/display-books";
import { UserSignedInMessage } from "./_components/signed-in";

// TODO: Make a global store for the session
export default async function Home() {
  noStore();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
        <span className="text-[hsl(280,100%,70%)]">Potato</span>
      </h1>
      <UserSignedInMessage />
      <DisplayBooks />
    </div>
  );
}
