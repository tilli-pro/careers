import { cookies, headers } from "next/headers";

export const getServerTheme = async () => {
  const [cookieStore, headerStore] = await Promise.all([cookies(), headers()]);

  const [themeCookie, themeHeader] = await Promise.all([
    cookieStore.get("__next_theme"),
    headerStore.get("Sec-CH-Prefers-Color-Scheme"),
  ]);

  const theme = themeCookie?.value ?? themeHeader ?? "light";

  return theme as "light" | "dark";
};
