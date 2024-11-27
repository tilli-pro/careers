"use client";

import { Suspense } from "react";

import { useJobPostListData } from "./job-posting-list-context";
import JobPostingListItem from "./job-posting-list-item.server";
import { JobPostingSchema } from "./types";

const JobPostingList: React.FC<{ initialPosts: JobPostingSchema[] }> = ({
  initialPosts,
}) => {
  const { posts } = useJobPostListData();

  return (
    <Suspense
      fallback={
        <>
          {initialPosts.map((role) => (
            <JobPostingListItem key={role.id} {...role} />
          ))}
        </>
      }
    >
      {posts.map((role) => (
        <JobPostingListItem key={role.id} {...role} />
      ))}
    </Suspense>
  );
};

export default JobPostingList;
