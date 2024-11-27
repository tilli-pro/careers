import { cn, groupBy } from "~/lib/utils";
import { api } from "~/trpc/server";

import JobPostingFilter from "./job-posting-filter";
import JobPostingList from "./job-posting-list";
import { JobPostingListDataProvider } from "./job-posting-list-context";

interface JobPostingListProps {
  input?: Parameters<typeof api.post.all>[0];
  showFilters?: boolean;
  filterClassName?: string;
}

const JobPostingListSSR: React.FC<JobPostingListProps> = async ({
  input,
  showFilters,
  filterClassName,
}) => {
  const posts = await api.post.all(input);
  const departments = groupBy(posts, ["department.name", "department.slug"]);
  const locations = groupBy(posts, ["location.location", "location.slug"]);

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
      }}
    >
      {showFilters && (
        <div
          className={cn("flex flex-row items-center gap-4", filterClassName)}
        >
          <JobPostingFilter filter="location" />
          <JobPostingFilter filter="department" />
          {/* <ComboboxSSR
            values={Object.entries(departments).map(([department, roles]) => ({
              value: department.split(";;;")[1] ?? "",
              label: `${department.split(";;;")[0] ?? ""} (${roles.length})`,
              to: `/roles?${queryParam("department", department.split(";;;")[1] ?? "")}`,
            }))}
            placeholder="Department"
            defaultValue={input?.department}
          />
          <ComboboxSSR
            values={Object.entries(locations).map(([location, roles]) => ({
              value: location.split(";;;")[1] ?? "",
              label: `${location.split(";;;")[0] ?? ""} (${roles.length})`,
              to: `/roles?${queryParam("location", location.split(";;;")[1] ?? "")}`,
            }))}
            placeholder="Location"
            defaultValue={input?.location}
          /> */}
        </div>
      )}
      <div className="my-4 flex h-full w-full flex-col gap-4">
        <JobPostingList initialPosts={posts} />
      </div>
    </JobPostingListDataProvider>
  );
};

export default JobPostingListSSR;
