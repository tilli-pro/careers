import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

const defaultInclude = {
  department: true,
  location: true,
  hiringManager: {
    include: {
      user: true,
    },
  },
  questions: true,
};

export const postRouter = createTRPCRouter({
  all: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.jobPosting.findMany({
      include: defaultInclude,
    });
  }),
  bySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.jobPosting.findFirst({
        where: {
          slug: input.slug,
        },
        include: defaultInclude,
      });
    }),
});
