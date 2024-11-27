import type { api } from "~/trpc/server";

export type JobPostingSchema = Awaited<ReturnType<typeof api.post.all>>[number];
