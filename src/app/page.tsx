import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import Link from "next/link";

export default async function Home() {
  const session = await getServerAuthSession();

  return <main className="">welcome home</main>;
}
