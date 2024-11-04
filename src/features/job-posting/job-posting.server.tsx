import "server-only";

import { api } from "~/trpc/server";

import JobMDX from "./job-mdx.server";

type JobPostingSchema = Awaited<ReturnType<typeof api.post.all>>[number];

const JobPosting: React.FC<JobPostingSchema> = ({ title, post }) => {
  return <JobMDX post={post} />;
};

export default JobPosting;
