import "@/styles/globals.css";
import { TRPCReactProvider } from "@/trpc/react";
import { Open_Sans, Poppins } from "next/font/google";
import { headers } from "next/headers";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-header",
  weight: ["100", "500", "700"],
});
const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "Careers at Tilli",
  description: "Global connections. Galaxy scale.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const darkTheme = headers().get("Sec-CH-Prefers-Color-Scheme");

  return (
    <html lang="en" data-mode={darkTheme}>
      <body className={`${poppins.variable} ${openSans.variable}`}>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
