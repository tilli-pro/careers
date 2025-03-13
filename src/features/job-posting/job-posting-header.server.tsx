import { Suspense } from "react";
import Link from "next/link";

import type { JobPostingHeaderProps } from "./job-posting-header";
import { Button } from "~/components/ui/button";
import { cn, fmtCurrency, queryParam } from "~/lib/utils";
import { JobPostingHeader } from "./job-posting-header";

const JobPostingHeaderFallback: React.FC<JobPostingHeaderProps> = ({
  post,
  submissionSuccessful,
}) => {
  const [start, end] = post.salaryRange;

  return (
    <div className="sticky top-16 rounded-b bg-background/70 pb-4 backdrop-blur">
      <div className="row flex w-full items-start justify-between gap-4">
        <h1>{post.title}</h1>
        <Link href="#apply" className="md:hidden">
          <Button
            className={cn(
              "dark:text-white",
              submissionSuccessful
                ? "bg-green-600 hover:bg-green-500/90"
                : "bg-blue-600 hover:bg-blue-600/90",
            )}
          >
            {submissionSuccessful ? "Submitted!" : "Apply"}
          </Button>
        </Link>
      </div>
      <div className="flex flex-row gap-2">
        <p>
          <Link
            className="hover:underline"
            href={`/roles?${queryParam("department", post.department.slug)}`}
          >
            {post.department.name}
          </Link>
        </p>
        <span>•</span>
        <p>
          <Link
            className="hover:underline"
            href={`roles?${queryParam("location", post.location.slug)}`}
          >
            {post.location.location}
          </Link>
        </p>
      </div>
      <p className="text-xs font-medium opacity-50">
        {fmtCurrency(start ?? NaN)} - {fmtCurrency(end ?? NaN)}
      </p>
    </div>
  );
};

const JobPostingHeaderSSR: React.FC<JobPostingHeaderProps> = ({
  post,
  submissionSuccessful,
}) => {
  return (
    <Suspense
      fallback={
        <JobPostingHeaderFallback
          post={post}
          submissionSuccessful={submissionSuccessful}
        />
      }
    >
      <JobPostingHeader
        post={post}
        submissionSuccessful={submissionSuccessful}
      />
    </Suspense>
  );
};

export default JobPostingHeaderSSR;
