import { Noto_Sans, Outfit, Prompt, Space_Grotesk } from "next/font/google";
import { cookies, headers } from "next/headers";

import { type Metadata } from "next";

import Header from "~/components/structure/header";
import { ThemeProvider } from "~/features/theme/use-theme";
import "~/styles/globals.css";
import "~/styles/header.css";
import { TRPCReactProvider } from "~/trpc/react";
import { HydrateClient } from "~/trpc/server";

export const metadata: Metadata = {
  title: "Careers at Tilli",
  description: "Find your next job at Tilli",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const Font = Prompt({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [cookieStore, headerStore] = await Promise.all([cookies(), headers()]);

  const [themeCookie, themeHeader] = await Promise.all([
    cookieStore.get("__next_theme"),
    headerStore.get("Sec-CH-Prefers-Color-Scheme"),
  ]);

  const theme = themeCookie?.value ?? themeHeader ?? "light";

  return (
    <ThemeProvider>
      <html lang="en" className={`${Font.className}`} data-mode={theme}>
        <body>
          <Header />
          <TRPCReactProvider>
            <HydrateClient>{children}</HydrateClient>
          </TRPCReactProvider>
        </body>
      </html>
    </ThemeProvider>
  );
}
