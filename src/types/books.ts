type Book = {
  id: number;
  title: string;
  author: string;
  isbn: string;
  completed: boolean;
  purchased: boolean;
  startedAt: Date | undefined;
  finishedAt: Date | undefined;
};

type NewBook = {
  title: string;
  author: string;
};

type OwnedBooks = {
  id: number;
  userId: number;
  bookId: number;
  createdAt: Date;
  updatedAt: Date;
};

export type { Book, NewBook, OwnedBooks };
