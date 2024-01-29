"use client";

import { useState } from "react";
import useAddBook from "~/app/hooks/useAddBook";

export default function AddBook() {
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
  });

  const { addBook, isLoading, isDenied } = useAddBook();

  if (isDenied) {
    alert("Failed to add book. Please try again.");
  }

  const handleInputChange = (e: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = e.target;
    setNewBook((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full max-w-xs">
      <div className="flex flex-row justify-center">
        <input
          type="text"
          name="title"
          value={newBook.title}
          onChange={handleInputChange}
          className="text-red-500"
        />
        <input
          type="text"
          name="author"
          value={newBook.author}
          onChange={handleInputChange}
          className="text-red-500"
        />
        <button
          onClick={async () =>
            await addBook({ book: newBook }).then(() => {
              setNewBook({ title: "", author: "" });
            })
          }
          disabled={isLoading}
        >
          <p>Add a book</p>
        </button>
      </div>
    </div>
  );
}
