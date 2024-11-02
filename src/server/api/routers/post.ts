import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  all: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.jobPosting.findMany({
      include: {
        department: true,
        location: true,
        hiringManager: true,
        questions: true,
      }
    });
  }),
  bySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.jobPosting.findFirst({
        where: {
          slug: input.slug
        },
        include: {
          department: true,
          location: true,
          hiringManager: true,
          questions: true,
        }
      })
    }),
});
