import { Suspense } from "react";

import { SunMoon } from "lucide-react";

import ThemeToggle from "./theme-toggle";

const ThemeToggleSSR: React.FC = () => {
  return (
    <Suspense
      fallback={
        <div className="flex cursor-pointer items-center justify-center rounded-full p-2 hover:bg-accent">
          <SunMoon className="theme-toggle h-5 w-5" />
        </div>
      }
    >
      <ThemeToggle />
    </Suspense>
  );
  // if (typeof window === "undefined") {
  //   return (
  //     <div className="flex cursor-pointer items-center justify-center rounded-full p-2 hover:bg-accent">
  //       <SunMoon className="theme-toggle h-5 w-5" />
  //     </div>
  //   );
  // }

  // return <ThemeToggle />;
};

export default ThemeToggleSSR;
