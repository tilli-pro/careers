import React from "react";

import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { api } from "~/trpc/server";

type JobPostingSchema = Awaited<ReturnType<typeof api.post.all>>[number];

const fmtCurrency = new Intl.NumberFormat("en-us", {
  style: "currency",
  currency: "USD",
  currencyDisplay: "symbol",
  compactDisplay: "long",
  notation: "compact",
}).format;

const queryParam = (key: string, value: string) => {
  return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
};

const queryParams = (params: [string, string][]) => {
  return params.map(([key, value]) => queryParam(key, value)).join("&");
};

const JobPostingListItem: React.FC<JobPostingSchema> = ({
  title,
  description,
  department,
  location,
  salaryRange,
  slug,
  hiringManager,
}) => {
  const [start, end] = salaryRange;
  return (
    <section className="box-border flex flex-row items-stretch gap-4 rounded border border-border drop-shadow transition-colors duration-150 has-[a.role:hover]:border-blue-400">
      <div className="flex flex-col gap-1 p-4">
        <h2 className="">{title}</h2>
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
              href={`roles?${queryParam("location", location.slug)}`}
            >
              {location.location}
            </Link>
          </p>
        </div>
        <p className="text-xs font-medium opacity-50">
          {fmtCurrency(start ?? NaN)} - {fmtCurrency(end ?? NaN)}
        </p>
      </div>
      <Link
        href={`/roles/${slug}`}
        className="role group ml-auto flex items-center self-stretch bg-transparent p-6 transition-colors duration-150 hover:bg-blue-500"
      >
        <ArrowRight className="group-hover:text-white" />
      </Link>
    </section>
  );
};

export default JobPostingListItem;
