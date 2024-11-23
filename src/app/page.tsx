import BasePage from "~/components/structure/base-page";
import { JobPostingListItem } from "~/features/job-posting";
import { api } from "~/trpc/server";

export default async function Home() {
  const openRoles = await api.post.all();

  return (
    <div data-theme="dark">
      <BasePage>
        <div className="my-4 flex h-full w-full flex-col gap-4">
          {openRoles.map((role) => (
            <JobPostingListItem key={role.id} {...role} />
          ))}
        </div>
      </BasePage>
    </div>
  );
}
