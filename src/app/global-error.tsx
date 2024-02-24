"use client";

import { useEffect } from "react";

import * as Sentry from "@sentry/nextjs";
import Error from "next/error";

interface GlobalErrorProps {
  error: unknown;
}
export default function GlobalError({ error }: GlobalErrorProps) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        {/* ??? */}
        <Error statusCode={undefined as unknown as number} />
      </body>
    </html>
  );
}
