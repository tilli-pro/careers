import React from "react";

import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { fmtCurrency, queryParam } from "~/lib/utils";

import type { JobPostingSchema } from "./types";

const JobPostingListItem: React.FC<JobPostingSchema> = ({
  title,
  description,
  department,
  location,
  salaryRange,
  slug,
}) => {
  const [start, end] = salaryRange;

  const descWords = description?.split(" ") ?? [];
  const descLength = descWords.length;
  const shortDescription = descWords
    .slice(0, Math.min(20, descLength))
    .concat(descLength > 20 ? "..." : [])
    .join(" ");

  return (
    <section className="box-border grid grid-flow-col grid-rows-1 items-center gap-4 rounded border border-border bg-background/80 backdrop-blur transition-colors duration-150 has-[a.role:hover]:border-blue-400 md:grid-cols-3">
      <div className="flex flex-col gap-1 p-4">
        <h2 className="whitespace-nowrap">{title}</h2>
        <div className="flex flex-row gap-2">
          <p>
            <Link
              className="hover:underline"
              href={`/roles?${queryParam("department", department.slug)}`}
            >
              {department.name}
            </Link>
          </p>
          <span>•</span>
          <p>
            <Link
              className="hover:underline"
              href={`/roles?${queryParam("location", location.slug)}`}
            >
              {location.location}
            </Link>
          </p>
        </div>
        <p className="text-xs font-medium opacity-50">
          {fmtCurrency(start ?? NaN)} - {fmtCurrency(end ?? NaN)}
        </p>
      </div>
      {!!description && (
        <div className="hidden w-[360px] flex-col items-start justify-center self-stretch p-4 md:flex">
          <div className="flex h-full flex-col items-start justify-center border-l border-zinc-300 pl-4 dark:border-zinc-900">
            <p className="text-pretty text-sm leading-none text-primary opacity-90">
              {shortDescription}
            </p>
          </div>
        </div>
      )}
      <Link
        prefetch
        href={`/roles/${slug}`}
        className="role w-18 group col-auto ml-auto flex items-center self-stretch rounded-r-[3px] bg-transparent p-6 transition-colors duration-150 hover:bg-blue-500"
      >
        <ArrowRight className="group-hover:text-white" />
      </Link>
    </section>
  );
};

export default JobPostingListItem;
