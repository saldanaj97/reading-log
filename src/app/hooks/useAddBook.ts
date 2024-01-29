import { useState } from "react";
import { type NewBook } from "~/types/books";
import handleAddBookReq from "../utils/handleAddBookRequest";

export default function useAddBook() {
  const [isLoading, setIsLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [isDenied, setIsDenied] = useState(false);

  const addBook = async ({ book }: { book: NewBook }) => {
    try {
      // TODO: Change this to a toast or something similar for better UX
      setIsLoading(true);
      await handleAddBookReq({ book });
      setIsAdded(true);
      console.log("New book added! " + book.title + " by " + book.author);
    } catch (error) {
      setIsDenied(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { addBook, isLoading, isAdded, isDenied };
}
