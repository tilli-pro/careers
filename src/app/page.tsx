import BasePage from "~/components/structure/base-page";
import { JobPostingListItem } from "~/features/job-posting";
import { api } from "~/trpc/server";

export default async function Home() {
  const openRoles = await api.post.all();

  console.log(openRoles);
  return (
    <BasePage>
      {openRoles.map((role) => (
        <JobPostingListItem key={role.id} {...role} />
      ))}
    </BasePage>
  );
}
