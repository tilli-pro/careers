"use client";

import CookieJS from "js-cookie";
import { SunMoon } from "lucide-react";

import { useTheme } from "./use-theme";

// READ:
// Something funky and lame about using server actions to toggle the color scheme (via next/headers cookies)
// is that it results in redownloading a layout.css and the FULL document for replacement in page since this theme-toggle component is used in the header (at the root layout.tsx). When we use js-cookie, we can toggle the theme while also signaling to the next app on page reload that the theme has changed. It does add the additional js-cookie dep but I think this is worth the tradeoff for the extra 40kb that is redownloaded on theme toggle via server action.
// import { toggleColorScheme } from "~/server/actions/color-scheme";

const ThemeToggle: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div
      className="flex cursor-pointer items-center justify-center rounded-full p-2 hover:bg-accent"
      onClick={() => {
        document.documentElement.dataset.mode =
          theme === "light" ? "dark" : "light";
        CookieJS.set("__next_theme", theme === "light" ? "dark" : "light", {
          sameSite: "lax",
        });
      }}
    >
      <SunMoon className="theme-toggle h-5 w-5" />
    </div>
  );
};

export default ThemeToggle;
