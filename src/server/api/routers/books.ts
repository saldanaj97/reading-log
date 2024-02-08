import { z } from "zod";
import { ErrorMessage } from "~/app/utils/handleErrorMessage";
import { env } from "~/env";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import type { Book, BookInfo, DeletedBook } from "~/types/books";

// Ensure the API key is present
if (!env.GOOGLE_BOOKS_API_KEY) {
  throw new Error("Google Books API key is not set");
}

export const booksRouter = createTRPCRouter({
  // Query to find all books in the database
  fetchAll: protectedProcedure.query(async ({ ctx }) => {
    try {
      const books = await ctx.db.book.findMany({
        where: {
          owners: { every: { userId: ctx.session.user.id } },
        },
      });
      return books as Book[] | null;
    } catch (error: unknown) {
      ErrorMessage(error, "fetching all books(server)");
    }
  }),

  // Query to find a single book based on title and author
  findOneBook: publicProcedure
    .input(z.object({ title: z.string().min(1), author: z.string().min(1) }))
    .query(async ({ input, ctx }) => {
      try {
        return (await ctx.db.book.findFirst({
          where: {
            title: input.title,
            author: input.author,
          },
        })) as BookInfo | null;
      } catch (error: unknown) {
        ErrorMessage(error, "finding one book(server)");
      }
    }),

  // Query to fetch book information from the Google Books API
  fetchBookInfo: protectedProcedure
    .input(z.object({ title: z.string().min(1), author: z.string().min(1) }))
    .query(async ({ input }) => {
      const bookInfo = await fetchBookInfoFromGoogleBooks({
        title: input.title,
        author: input.author,
      });
      return bookInfo;
    }),

  // Mutation to create a new book entry in the owned books table
  create: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1),
        title: z.string().min(1),
        author: z.string().min(1),
        thumbnail: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const newBook = (await ctx.db.book.create({
          data: {
            id: input.id,
            title: input.title,
            author: input.author,
            isbn: generateRandomISBN(),
            purchased: true,
            thumbnail: input.thumbnail,
          },
        })) as Book;

        await ctx.db.ownedBooks.create({
          data: {
            userId: ctx.session.user.id,
            bookId: newBook.id,
          },
        });

        return newBook;
      } catch (error: unknown) {
        ErrorMessage(error, "adding a new book(server)");
      }
    }),

  // Query to delete a book from the users owned books
  delete: protectedProcedure
    .input(z.object({ id: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      try {
        const bookDeleted = (await ctx.db.book.delete({
          where: { id: input.id },
        })) as DeletedBook;

        return bookDeleted;
      } catch (error: unknown) {
        ErrorMessage(error, "deleting a book from inventory(server)");
      }
    }),
});

// Helper function to fetch book information from the Google Books API
async function fetchBookInfoFromGoogleBooks({
  title,
  author,
}: {
  title: string;
  author: string;
}) {
  try {
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${title}+inauthor:${author}&maxResults=1&key=${env.GOOGLE_BOOKS_API_KEY}`;
    const response = await fetch(apiUrl);
    if (!response.ok)
      throw new Error("Failed to fetch data from Google Books API");

    const data = (await response.json()) as {
      items: { selfLink: string }[];
    };

    if (data.items.length === 0 || data.items[0] === undefined) {
      throw new Error("No book found for that title and author");
    }

    const bookLinkFromApi = data.items[0].selfLink;

    const bookInfoResponse = await fetch(bookLinkFromApi);
    if (!bookInfoResponse.ok)
      throw new Error("Failed to fetch book info from Google Books API");

    const bookInfo = (await bookInfoResponse.json()) as BookInfo;
    return bookInfo;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

// Helper function to generate a random ISBN number
function generateRandomISBN() {
  return Math.floor(100000000 + Math.random() * 900000000).toString();
}
