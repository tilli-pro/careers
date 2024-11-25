import BasePage from "~/components/structure/base-page";
import { JobPostingList } from "~/features/job-posting";
import { api } from "~/trpc/server";

export default async function Home() {
  return (
    <BasePage>
      <JobPostingList />
    </BasePage>
  );
}
