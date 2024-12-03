import Script from "next/script";

import { ArrowRight } from "lucide-react";

import MapSSR from "~/components/pages/home/topo/topo-map.ssr";

const Hero: React.FC = () => {
  return (
    <>
      <Script
        id="scroll-to-roles"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(() => {
          document.getElementById("to-roles").addEventListener("click", (e) => {
            window.scrollTo({
              top: document.getElementById("roles").offsetTop - 30,
              behavior: "smooth",
            })
          });
        })()`,
        }}
      />

      <section
        id="careers-hero"
        className="relative box-border max-h-screen w-screen overflow-visible"
      >
        <div className="relative w-screen">
          <MapSSR className="object-fill" />
        </div>
        <div className="absolute left-0 top-0 grid h-full max-h-screen w-full grid-cols-3 grid-rows-4 md:grid-rows-3">
          <div className="col-span-2 row-start-2 flex flex-col items-end justify-center self-center text-right md:col-span-1">
            <h1 className="select-none bg-background/50 p-2 backdrop-blur">
              Grow your Career.
              <br />
              Join the Creators.
            </h1>
            <div
              id="to-roles"
              className="group flex cursor-pointer items-center gap-2 bg-background/50 p-4 backdrop-blur"
            >
              <p>
                See open roles at{" "}
                <span className="font-bold tracking-wider transition-all group-hover:font-black group-hover:uppercase group-hover:tracking-widest group-hover:text-blue-600">
                  tilli
                </span>
              </p>
              <ArrowRight
                size={20}
                className="transition-all group-hover:translate-x-1 group-hover:stroke-blue-600"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
