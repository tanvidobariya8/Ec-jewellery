import { cacheLife } from "next/cache";

/**
 * Copyright year. `new Date()` is not allowed in an uncached prerender with
 * `cacheComponents`, so the value is cached and refreshed daily.
 */
export async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
