"use client";

import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

import CookieJS from "js-cookie";

const getTheme = () =>
  typeof document === "undefined"
    ? (undefined as any) // ssr shenanigrams
    : ((document.documentElement.dataset.mode === "dark" ? "dark" : "light") as
        | "light"
        | "dark");

const ThemeContext = createContext<{
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
  toggleTheme: () => void;
}>({
  theme: getTheme(),
  setTheme: () => {},
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [reactTheme, setReactTheme] = useState<"light" | "dark">(getTheme());

  useLayoutEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "data-mode"
        ) {
          const documentElement = mutation.target as HTMLElement;
          const mode = documentElement.dataset.mode;
          setReactTheme(mode === "dark" ? "dark" : "light");
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

  const setTheme = (theme: "light" | "dark") => {
    setReactTheme(theme);
    document.documentElement.dataset.mode = theme;
    CookieJS.set("__next_theme", theme, {
      sameSite: "lax",
    });
  };

  const toggleTheme = () => {
    const currentTheme = (document.documentElement.dataset.mode ?? "light") as
      | "light"
      | "dark";
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider
      value={{ theme: reactTheme, setTheme: setTheme, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
