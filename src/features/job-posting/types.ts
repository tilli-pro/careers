import type { api } from "~/trpc/server";

export type JobPostingSchema = Awaited<ReturnType<typeof api.post.all>>[number];

export const SubmissionFailures = {
  email: "email",
  exists: "exists",
  sizelimit: "sizelimit",
  upload: "upload",
  resume: "resume",
  create: "create",
} as const;
export type FailureReason = keyof typeof SubmissionFailures;
