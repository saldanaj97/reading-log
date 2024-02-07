"use client";

import { useState } from "react";
import useBookApi from "~/app/hooks/useBookApi";

export default function AddBook() {
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    id: "",
    etag: "",
    thumbnail: "",
    selfLink: "",
  });

  const { addBook, isLoading, isDenied } = useBookApi();

  if (isDenied) {
    alert("Failed to add book. Please try again.");
  }

  const handleInputChange = (e: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = e.target;
    setNewBook((prev) => ({ ...prev, [name]: value }));
  };

  // TODO: Change the onlick to a become a modal that will then allow the user to add a book
  return (
    <div className="flex flex-col">
      <div className="m-1 flex cursor-pointer flex-col p-2">
        <button
          className="flex h-40 w-28 items-center justify-center bg-slate-500/50"
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
          <p className="text-center text-4xl text-black">+</p>
        </button>
      </div>
    </div>
  );
}

{
  /* <div className="flex flex-row justify-center">
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
      </div> */
}
