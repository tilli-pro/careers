"use client";

import { Suspense } from "react";

import { Skeleton } from "~/components/ui/skeleton";

import { useJobPostListData } from "./job-posting-list-context";
import JobPostingListItem from "./job-posting-list-item.server";
import { JobPostingSchema } from "./types";

const JobPostingList: React.FC<{ initialPosts: JobPostingSchema[] }> = ({
  initialPosts,
}) => {
  const { posts } = useJobPostListData();

  return posts.map((role) => <JobPostingListItem key={role.id} {...role} />);
};

export default JobPostingList;
