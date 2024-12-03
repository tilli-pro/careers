import { Figtree, Lora } from "next/font/google";

import { type Metadata } from "next";
import { ViewTransitions } from "next-view-transitions";

import Header from "~/components/structure/header";
import { getServerTheme } from "~/features/theme/server-theme";
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

const BodyFont = Figtree({
  weight: "variable",
  subsets: ["latin-ext"],
  variable: "--font-body",
  display: "swap",
});

const HeaderFont = Lora({
  weight: "variable",
  subsets: ["latin-ext"],
  variable: "--font-header",
});

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const theme = await getServerTheme();

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
