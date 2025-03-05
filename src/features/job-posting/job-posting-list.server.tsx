import { Suspense } from "react";

import { Skeleton } from "~/components/ui/skeleton";
import { cn, multiGroupBy } from "~/lib/utils";
import { api } from "~/trpc/server";

import JobPostingFilter from "./job-posting-filter";
import JobPostingList from "./job-posting-list";
import { JobPostingListDataProvider } from "./job-posting-list-context";

interface JobPostingListProps {
  input?: Parameters<typeof api.post.all>[0];
  showFilters?: boolean;
  filterClassName?: string;
}

export const JobPostingListSkeleton: React.FC<{ amount?: number }> = ({
  amount = 3,
}) => (
  <div className="my-4 flex h-full w-full flex-col gap-4">
    {[...Array(amount)].map((_, i) => (
      <div
        key={`${i.toString()}-`}
        className="grid min-h-[114px] grid-flow-col grid-rows-1 items-center gap-4 rounded border border-border bg-background/80 backdrop-blur transition-colors duration-150 has-[a.role:hover]:border-blue-400 md:grid-cols-3"
      >
        <div className="flex flex-col gap-1 p-4">
          <Skeleton className="mb-2 h-5" />
          <div className="mb-1 flex flex-row gap-2">
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-6 w-1/4" />
          </div>
          <div className="flex flex-row gap-2">
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
        <Skeleton className="ml-auto mr-4 h-12 w-1/4" />
      </div>
    ))}
  </div>
);

const JobPostingListSSR: React.FC<JobPostingListProps> = async ({
  input,
  showFilters,
  filterClassName,
}) => {
  const posts = await api.post.all();
  const { departments, locations } = multiGroupBy(posts, {
    departments: ["department.name", "department.slug"],
    locations: ["location.location", "location.slug"],
  });
  const initialPosts = posts.filter((post) => {
    return (
      (!input?.department || post.department.slug === input.department) &&
      (!input?.location || post.location.slug === input.location)
    );
  });

  return (
    <JobPostingListDataProvider
      initialValues={{
        department: {
          value: input?.department,
          values: Object.entries(departments).map(([department, roles]) => ({
            value: department.split(";;;")[1] ?? "",
            label: `${department.split(";;;")[0] ?? ""} (${roles.length})`,
          })),
        },
        location: {
          value: input?.location,
          values: Object.entries(locations).map(([location, roles]) => ({
            value: location.split(";;;")[1] ?? "",
            label: `${location.split(";;;")[0] ?? ""} (${roles.length})`,
          })),
        },
        posts: initialPosts,
      }}
    >
      {showFilters && (
        <div
          className={cn("flex flex-row items-center gap-4", filterClassName)}
        >
          <JobPostingFilter filter="location" />
          <JobPostingFilter filter="department" />
        </div>
      )}
      <div className="my-4 flex h-full w-full flex-col gap-4">
        <JobPostingList initialPosts={initialPosts} />
      </div>
    </JobPostingListDataProvider>
  );
};

export default JobPostingListSSR;
