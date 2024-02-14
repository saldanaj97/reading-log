import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";

export async function UserSignedInMessage() {
  const session = await getServerAuthSession();

  // Get users timezone and display a message based on the time of day
  function TimeOfDayMessage() {
    const date = new Date();
    const hours = date.getHours();
    let message = "";
    if (hours < 12) {
      message = "Good morning, ";
    } else if (hours < 18) {
      message = "Good afternoon, ";
    } else {
      message = "Good evening, ";
    }

    return <>{message}</>;
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex flex-col items-center justify-center gap-4">
        <p className="text-center text-2xl text-white">
          {session && (
            <span>
              <TimeOfDayMessage />
              {session.user?.name}
            </span>
          )}
        </p>
        <Link
          href={session ? "/api/auth/signout" : "/api/auth/signin"}
          className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
        >
          {session ? "Sign out" : "Sign in"}
        </Link>
      </div>
    </div>
  );
}
