import { Lora, Moderustic } from "next/font/google";
import { cookies, headers } from "next/headers";

import { type Metadata } from "next";
import { ViewTransitions } from "next-view-transitions";

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

const HeaderFont = Moderustic({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin-ext"],
  variable: "--font-sans",
});

const BodyFont = Lora({
  weight: "variable",
  subsets: ["latin-ext"],
  variable: "--font-serif",
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
    <ViewTransitions>
      <ThemeProvider>
        <html
          lang="en"
          className={`${HeaderFont.variable} ${BodyFont.variable}`}
          data-mode={theme}
        >
          <body className="overflow-x-hidden">
            <Header />
            <TRPCReactProvider>
              <HydrateClient>{children}</HydrateClient>
            </TRPCReactProvider>
          </body>
        </html>
      </ThemeProvider>
    </ViewTransitions>
  );
}
