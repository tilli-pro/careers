"use server";

import { cookies, headers } from "next/headers";

export async function getCurrentColorScheme() {
  const [cookieStore, headerStore] = await Promise.all([cookies(), headers()]);

  const currentScheme =
    (await cookieStore.get("__next_theme"))?.value ??
    headerStore.get("Sec-CH-Prefers-Color-Scheme") ??
    "light";

  return {
    currentScheme,
    cookieStore,
    headerStore,
  };
}

export async function toggleColorScheme() {
  const { cookieStore, currentScheme } = await getCurrentColorScheme();

  const scheme = currentScheme === "light" ? "dark" : "light";

  await cookieStore.set("__next_theme", scheme, {
    sameSite: "lax",
  });
}
