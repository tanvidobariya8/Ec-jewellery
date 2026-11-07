"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

import { ErrorState } from "@/components/content/ErrorState";

/**
 * Catches errors in any storefront page (e.g. the API is down or times out).
 * Rendered inside the (site) layout, so the header and footer stay usable.
 */
export default function SiteError({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    // TODO(Phase 6): report to Sentry.
    console.error(error);
  }, [error]);

  const digest =
    error instanceof Error && "digest" in error && typeof error.digest === "string"
      ? error.digest
      : undefined;

  return <ErrorState onRetry={retry} digest={digest} />;
}
