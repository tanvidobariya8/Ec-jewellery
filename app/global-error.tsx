"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

import { ErrorState } from "@/components/content/ErrorState";

import "./globals.css";

/** Last-resort fallback when the root layout itself fails. Replaces <html> and <body>. */
export default function GlobalError({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    // TODO(Phase 6): report to Sentry.
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-h-dvh flex-col justify-center">
        <ErrorState onRetry={retry} />
      </body>
    </html>
  );
}
