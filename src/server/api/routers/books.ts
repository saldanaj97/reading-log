import { z } from "zod";
import { env } from "~/env";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import type { BookInfo } from "~/types/books";

// Ensure the API key is present
if (!env.GOOGLE_BOOKS_API_KEY) {
  throw new Error("Google Books API key is not set");
}

export const booksRouter = createTRPCRouter({
  // Query to find all books in the database
  findAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.book.findMany();
  }),

  // Query to find a single book based on title and author
  findOneBook: publicProcedure
    .input(z.object({ title: z.string().min(1), author: z.string().min(1) }))
    .query(async ({ input, ctx }) => {
      return ctx.db.book.findFirst({
        where: {
          title: input.title,
          author: input.author,
        },
      });
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

  // Mutation to create a new book entry in the database
  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
        author: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const newBook = await ctx.db.book.create({
        data: {
          title: input.title,
          author: input.author,
          isbn: generateRandomISBN(),
        },
      });

      await ctx.db.ownedBooks.create({
        data: {
          userId: ctx.session.user.id,
          bookId: newBook.id,
        },
      });

      return newBook;
    }),
});

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

    // we know this is going to be a list of items of there is no errrror
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data = await response.json();

    console.log("Data:", data);

    // Check if the book data is available
    if (!data?.items || data.items.length === 0) {
      throw new Error("No book found for that title and author");
    }

    const bookLinkFromApi = data.items[0].selfLink as string;

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
