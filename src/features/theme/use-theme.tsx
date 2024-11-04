"use client";

import { createContext, useContext, useLayoutEffect, useState } from "react";

import CookieJS from "js-cookie";

const getTheme = () =>
  typeof document === "undefined"
    ? (undefined as any) // ssr shenanigrams
    : ((document.documentElement.dataset.mode === "dark" ? "dark" : "light") as
        | "light"
        | "dark");

const ThemeContext = createContext<{ theme: "light" | "dark" }>({
  theme: getTheme(),
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [theme, setTheme] = useState<"light" | "dark">(getTheme());

  useLayoutEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "data-mode"
        ) {
          const documentElement = mutation.target as HTMLElement;
          const mode = documentElement.dataset.mode;
          setTheme(mode === "dark" ? "light" : "dark");
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-mode"],
      childList: false,
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>
  );
};
