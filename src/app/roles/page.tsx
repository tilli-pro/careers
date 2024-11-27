import BasePage from "~/components/structure/base-page";
import GradientFC from "~/features/gradient/gradient-fc";
import { JobPostingList } from "~/features/job-posting";

interface PageProps {
  searchParams: Promise<{
    department?: string;
    location?: string;
  }>;
}
const Page: React.FC<PageProps> = async ({ searchParams, ...rest }) => {
  const search = await searchParams;

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

      <JobPostingList
        showFilters
        filterClassName="justify-center md:justify-end z-10"
        input={search}
      />
    </BasePage>
  );
};

export default Page;
