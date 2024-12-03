import Benefits from "~/components/pages/home/benefits";
import Hero from "~/components/pages/home/hero";
import "~/components/pages/home/topo/map.css";
import BasePage from "~/components/structure/base-page";
import { JobPostingList } from "~/features/job-posting";

export default async function Home() {
  return (
    <main>
      <Hero />

      <BasePage
        as="section"
        className="relative z-10 flex min-h-[50vh] flex-col items-center justify-center md:min-h-screen"
      >
        <div className="rounded-xl p-4 backdrop-blur-lg">
          <div className="flex flex-col items-center justify-center md:flex-row">
            <h2 className="w-full border-r-2 border-primary p-8 text-right text-6xl md:w-2/5">
              tilli
            </h2>
            <p className="p-8 text-right text-lg md:text-left">
              We are a team of{" "}
              <span className="font-semibold text-zinc-600 dark:text-zinc-400">
                creators
              </span>
              ,{" "}
              <span className="font-semibold text-slate-600 dark:text-slate-400">
                builders
              </span>
              , and{" "}
              <span className="font-semibold text-stone-600 dark:text-stone-400">
                innovators
              </span>
              . Our mission is to create software that will stand the test of
              time. Above all else, we place our trust in the{" "}
              <span className="font-semibold text-amber-600 dark:text-amber-400">
                values
              </span>{" "}
              we use to build.
            </p>
          </div>
        </div>
        <div className="w-full flex-col md:flex-row">
          VALUES GO HERE ONCE I FIGURE OUT A FORMAT I LIKE
        </div>
      </BasePage>

      <Benefits />

      <BasePage as="section" className="py-16">
        {/* <Stack /> */}
        <h2>Open Roles at Tilli</h2>
        <div id="roles">
          <JobPostingList />
        </div>
        <hr className="py-20" />
      </BasePage>
    </main>
  );
}
