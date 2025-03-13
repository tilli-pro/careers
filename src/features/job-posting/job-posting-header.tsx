"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import type { api } from "~/trpc/server";
import { Button } from "~/components/ui/button";
import { cn, fmtCurrency, queryParam } from "~/lib/utils";

// TODO: Does Date.now involve the creation of a Date object? If so, this might actually be less performant than not throttling at all
const throttle = (fn: () => any, delay: number) => {
  let time = Date.now();

  return () => {
    if (time + delay - Date.now() <= 0) {
      fn();
      time = Date.now();
    }
  };
};

export interface JobPostingHeaderProps {
  post: Exclude<Awaited<ReturnType<typeof api.post.bySlug>>, null>;
  submissionSuccessful: {
    id: string;
    userId: string | null;
  } | null;
}
export const JobPostingHeader: React.FC<JobPostingHeaderProps> = ({
  post,
  submissionSuccessful,
}) => {
  const [mini, setMini] = useState(false);

  useEffect(() => {
    const scrollListener = throttle(() => {
      if (window.scrollY > 40) {
        setMini(true);
      } else {
        setMini(false);
      }
    }, 10);

    window.addEventListener("scroll", scrollListener);

    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);

  const [start, end] = post.salaryRange;

  return (
    <div
      className={cn(
        "sticky top-16 -mx-4 rounded-b bg-background/70 px-4 backdrop-blur transition-all",
        {
          "pt-2": mini,
        },
      )}
      id="job-posting-header"
    >
      <div
        className={cn(
          "row flex w-full items-start justify-between gap-4 transition-all",
        )}
      >
        <h1
          className={cn("transition-all", { "text-2xl": mini, "mb-0": mini })}
        >
          {post.title}
        </h1>
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
      <p
        className={cn(
          "h-4 overflow-visible text-xs font-medium opacity-50 transition-all",
          {
            "h-0": mini,
            "opacity-0": mini,
            "overflow-hidden": mini,
          },
        )}
      >
        {fmtCurrency(start ?? NaN)} - {fmtCurrency(end ?? NaN)}
      </p>
    </div>
  );
};
