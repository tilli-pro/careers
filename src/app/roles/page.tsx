import BasePage from "~/components/structure/base-page";
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
    <BasePage>
      <JobPostingList input={search} />
    </BasePage>
  );
};

export default Page;
