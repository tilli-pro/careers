import { exec } from "node:child_process";
import { statfs } from "node:fs/promises";
import { resolve } from "node:path";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { Webhooks } from "@octokit/webhooks";

import { env } from "~/env";

const webhooks = new Webhooks({ secret: env.DEPLOY_KEY });
export const runtime = "nodejs";

export const POST = async (req: NextRequest) => {
  const secHeader = req.headers.get("X-Hub-Signature-256");
  if (!secHeader) {
    console.log("No signature header");
    return new NextResponse(undefined, { status: 401 });
  }
  const payload = await req.text();

  const valid = await webhooks.verify(payload, secHeader);
  if (!valid) {
    console.log("Invalid signature");
    return new NextResponse(undefined, { status: 401 });
  }

  try {
    const json = JSON.parse(payload);
    console.log(json);
    if ("repository" in json && "ref" in json) {
      if (json.ref === "refs/heads/build") {
        console.log("Received build event. Redeploying...");

        const redeployScriptExists = await statfs(
          resolve(process.cwd(), "redeploy.sh"),
        );

        if (!redeployScriptExists) {
          console.log("No redeploy script found");
          return new NextResponse(undefined, { status: 202 });
        }

        // we dont await this because... well we're about to kill this process theoretically
        exec("sh redeploy.sh");

        return new NextResponse(undefined, { status: 200 });
      }
    }
  } catch (e) {
    console.log("error parsing");
    console.log(e);
  }

  return new NextResponse(undefined, { status: 404 });
};
