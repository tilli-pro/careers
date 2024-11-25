import BasePage from "~/components/structure/base-page";
import { ComboboxSSR } from "~/components/ui/combobox.server";
import GradientFC from "~/features/gradient/gradient-fc";
import { JobPostingList } from "~/features/job-posting";
import { groupBy } from "~/lib/utils";
import { api } from "~/trpc/server";

interface PageProps {
  searchParams: Promise<{
    department?: string;
    location?: string;
  }>;
}
const Page: React.FC<PageProps> = async ({ searchParams, ...rest }) => {
  const search = await searchParams;

  const posts = await api.post.all(search);
  const departments = groupBy(posts, ["department.name", "department.slug"]);
  const locations = groupBy(posts, ["location.location", "location.slug"]);

  return (
    <BasePage className="overflow-hidden">
      <div className="absolute top-28 z-40 mx-auto w-[calc(100%-16px)] md:mx-0 md:w-auto">
        <h1 className="relative z-20 text-center font-serif text-6xl font-black text-white drop-shadow-lg md:text-left">
          Explore Roles
        </h1>
        <div className="relative z-10 rounded bg-background/90 px-4 py-2 text-center font-mono backdrop-blur-sm md:text-left">
          We're hiring.
        </div>
      </div>
      <GradientFC
        id="RECRUIT_TIME"
        className="absolute left-0 top-12 h-[50vh] w-screen overflow-hidden md:h-[800px]"
      />
      <div className="absolute -left-[50vw] top-[30vh] -z-0 h-[100vh] w-[200vw] -rotate-6 bg-background md:top-[300px]" />
      <div className="h-[30vh] md:h-[300px]" />
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="z-10 flex flex-row items-center justify-center gap-4 rounded-full p-1 drop-shadow md:col-start-2 md:justify-end">
          <ComboboxSSR
            values={Object.entries(departments).map(([department, roles]) => ({
              value: department.split(";;;")[1] ?? "",
              label: `${department.split(";;;")[0] ?? ""} (${roles.length})`,
            }))}
            placeholder="Department"
          />
          <ComboboxSSR
            values={Object.entries(locations).map(([location, roles]) => ({
              value: location.split(";;;")[1] ?? "",
              label: `${location.split(";;;")[0] ?? ""} (${roles.length})`,
            }))}
            placeholder="Location"
          />
        </div>
      </div>
      <JobPostingList input={search} />
    </BasePage>
  );
};

export default Page;
