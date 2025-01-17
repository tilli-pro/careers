"use server";

import { cookies } from "next/headers";

export async function visited() {
  const cookieStore = await cookies();
  cookieStore.set("__T_N_VISITOR", "true", { maxAge: 60 * 60 * 24 * 365 });
}
