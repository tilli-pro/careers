import { unstable_cache } from "next/cache";

import { Prisma } from "@prisma/client";
import { count } from "console";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

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

const roleSearch = z.object({
  location: z.string().optional(),
  department: z.string().optional(),
});

const roleSearchWhere = Prisma.validator<Prisma.JobPostingWhereInput>();

const dbBySlug = unstable_cache(
  async (slug: string) => {
    return db.jobPosting.findFirst({
      where: {
        slug: slug,
      },
      include: defaultInclude,
    });
  },
  ["jobPosting"],
  { revalidate: 60 * 60 },
);

export const dbAll = unstable_cache(
  async () => {
    return db.jobPosting.findMany({
      include: defaultInclude,
    });
  },
  ["jobPostingAll"],
  { revalidate: 60 * 60 },
);

export const postRouter = createTRPCRouter({
  all: publicProcedure
    .input(roleSearch.optional())
    .query(async ({ ctx, input = {} }) => {
      const { location, department } = input;

      const allPosts = await dbAll();
      return location || department
        ? allPosts.filter((post) => {
            if (location && post.location.slug !== location) return false;
            if (department && post.department.slug !== department) return false;
            return true;
          })
        : allPosts;
    }),
  count: publicProcedure.query(async () => {
    return (await dbAll()).length;
  }),
  bySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      return dbBySlug(input.slug);
    }),
  allDepartments: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.department.findMany({
      include: {
        _count: true,
      },
    });
  }),
  allLocations: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.jobLocation.findMany({
      include: {
        _count: true,
      },
    });
  }),
});
