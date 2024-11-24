import BasePage from "~/components/structure/base-page";
import { JobPostingListItem } from "~/features/job-posting";
import { api } from "~/trpc/server";

interface PageProps {
  searchParams: Promise<{
    department?: string;
    location?: string;
  }>;
}
const Page: React.FC<PageProps> = async ({ searchParams, ...rest }) => {
  const search = await searchParams;

  const roles = await api.post.all(search);

  return (
    <BasePage>
      <div className="my-4 flex flex-col gap-4">
        {roles.map((role) => (
          <JobPostingListItem key={role.id} {...role} />
        ))}
      </div>
    </BasePage>
  );
};

export default Page;
