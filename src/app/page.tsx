import { Suspense } from "react";

import Benefits from "~/components/pages/home/benefits";
import Hero from "~/components/pages/home/hero";
import "~/components/pages/home/topo/map.css";
import BasePage from "~/components/structure/base-page";
import { VelocityScroll } from "~/components/ui/scroll-based-velocity";
import { Separator } from "~/components/ui/separator";
import { JobPostingList } from "~/features/job-posting";
import { JobPostingListSkeleton } from "~/features/job-posting/job-posting-list.server";
import ProductRow from "~/features/product/product-row";

export default async function Home() {
  return (
    <main>
      <Hero />

      <BasePage
        as="section"
        className="relative z-10 flex min-h-[50vh] flex-col items-center justify-center md:min-h-screen"
      >
        <div id="tilli-about" className="rounded-t-xl p-4 backdrop-blur-lg">
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
        <div className="flex w-full bg-primary py-2 font-mono text-2xl font-bold text-secondary shadow-md">
          <VelocityScroll
            className="select-none"
            text={
              <>
                <span className="text-amber-400 dark:text-amber-500">Love</span>{" "}
                the craft.{" "}
                <span className="text-amber-400 dark:text-amber-500">
                  Empower
                </span>{" "}
                everyone.{" "}
                <span className="text-amber-400 dark:text-amber-500">
                  Trust
                </span>{" "}
                the process.{" "}
                <span className="text-amber-400 dark:text-amber-500">Grow</span>{" "}
                as you go.
              </>
            }
            default_velocity={2}
          />
        </div>
      </BasePage>

      <BasePage as="section" className="relative z-10 md:min-h-[50vh]">
        <h2 className="self-center rounded-md bg-background/50 px-4 py-2 text-center font-sans backdrop-blur lg:text-left">
          What We Make
        </h2>
        <ProductRow />
      </BasePage>

      <Benefits />

      <BasePage as="section" className="pt-16">
        {/* <Stack /> */}
        <h2 className="relative z-10 text-4xl">Open Roles at tilli</h2>
        <p className="p-1">
          Don't see a match? Drop us a line at{" "}
          <a
            className="text-blue-500 transition-all hover:text-cyan-500"
            href="mailto:careers@tilli.pro"
            target="_blank"
          >
            careers@tilli.pro
          </a>{" "}
          and we'll stay in touch.
        </p>
        <div id="roles">
          <Suspense fallback={<JobPostingListSkeleton />}>
            <JobPostingList />
          </Suspense>
        </div>
        <Separator className="mt-8" />
      </BasePage>
    </main>
  );
}
