import Benefits from "~/components/pages/home/benefits";
import Hero from "~/components/pages/home/hero";
import Stack from "~/components/pages/home/stack";
import BasePage from "~/components/structure/base-page";
import { JobPostingList } from "~/features/job-posting";
import "~/features/topo/map.css";

export default async function Home() {
  return (
    <>
      <Hero />

      <Benefits />

      <BasePage>
        <Stack />
        <div id="roles">
          <JobPostingList />
        </div>
        <hr className="py-20" />
      </BasePage>
    </>
  );
}
