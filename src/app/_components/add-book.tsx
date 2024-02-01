"use client";

import { useState } from "react";
import useAddBook from "~/app/hooks/useAddBook";

export default function AddBook() {
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    id: "",
    etag: "",
    thumbnail: "",
    selfLink: "",
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
    <div className="flex w-full flex-col">
      <div className="flex flex-row justify-center">
        <input
          type="text"
          name="title"
          value={newBook.title}
          onChange={handleInputChange}
          className="m-1 w-60 p-2 text-black"
          placeholder="Title"
        />
        <input
          type="text"
          name="author"
          value={newBook.author}
          onChange={handleInputChange}
          className="m-1 w-60 p-2 text-black"
          placeholder="Author"
        />
      </div>
      <button
        className="mt-5 self-center rounded-md bg-slate-300 p-2 px-5 text-black"
        onClick={async () =>
          await addBook({ book: newBook }).then(() => {
            setNewBook({
              title: "",
              author: "",
              id: "",
              etag: "",
              thumbnail: "",
              selfLink: "",
            });
          })
        }
        disabled={isLoading}
      >
        <p>Add a book</p>
      </button>
    </div>
  );
}
