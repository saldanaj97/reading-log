"use client";

import useBookApi from "~/app/hooks/useBookApi";

export default function DeleteBook({ id }: { id: string }) {
  const { deleteBook, isLoading, isDenied } = useBookApi();

  if (isDenied) {
    alert("Failed to delete book. Please try again.");
  }

  return (
    <div>
      <button
        onClick={async () => {
          await deleteBook({ id: id });
        }}
        disabled={isLoading}
        className="w-full rounded-md p-2 text-center text-red-500"
      >
        x
      </button>
    </div>
  );
}
