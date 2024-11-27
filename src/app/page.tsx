import BasePage from "~/components/structure/base-page";
import { JobPostingList } from "~/features/job-posting";

export default async function Home() {
  return (
    <BasePage>
      <JobPostingList />
    </BasePage>
  );
}
