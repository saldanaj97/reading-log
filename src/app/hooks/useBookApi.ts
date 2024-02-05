import { useState } from "react";
import { type NewBook } from "~/types/books";
import handleAddBookReq from "../utils/handleAddBookRequest";
import handleDeleteBookReq from "../utils/handleDeleteBookRequest";

export default function useBookApi() {
  const [isLoading, setIsLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isDenied, setIsDenied] = useState(false);

  const addBook = async ({ book }: { book: NewBook }) => {
    try {
      setIsLoading(true);
      await handleAddBookReq({ book });
      setIsAdded(true);
    } catch (error) {
      setIsDenied(true);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteBook = async ({ id }: { id: string }) => {
    try {
      setIsLoading(true);
      await handleDeleteBookReq(id);
      setIsDeleted(false);
    } catch (error) {
      setIsDenied(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { addBook, isLoading, isAdded, isDenied, deleteBook, isDeleted };
}
