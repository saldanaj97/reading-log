import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const booksRouter = createTRPCRouter({
  // TODO:
  //  - Find one
  //  - Delete an entry
  //  - Update an entry
  findAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.book.findMany();
  }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
        author: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.book
        .create({
          data: {
            title: input.title,
            author: input.author,
            isbn: Math.floor(100000000 + Math.random() * 900000000).toString(),
          },
        })
        .then((book) => {
          return ctx.db.ownedBooks.create({
            data: {
              userId: ctx.session.user.id,
              bookId: book.id,
            },
          });
        });
    }),
});
