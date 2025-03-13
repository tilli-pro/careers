import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { Webhooks } from "@octokit/webhooks";

import { env } from "~/env";

const webhooks = new Webhooks({ secret: env.DEPLOY_KEY });

export const POST = async (req: NextRequest) => {
  const secHeader = req.headers.get("X-Hub-Signature-256")?.split("=")[1];
  if (!secHeader) {
    return new NextResponse(undefined, { status: 401 });
  }
  const payload = await req.text();

  const valid = await webhooks.verify(payload, secHeader);
  if (!valid) {
    return new NextResponse(undefined, { status: 401 });
  }

  try {
    const json = JSON.parse(payload);
    console.log(json);
  } catch (e) {
    console.log(e);
  }

  return new NextResponse(undefined, { status: 200 });
};
