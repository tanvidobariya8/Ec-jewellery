/**
 * Hosts whose images go through the Next image optimizer (also used by `next.config.ts`).
 * Add the client's CDN here when real product photos arrive.
 */
export const OPTIMIZED_IMAGE_HOSTS = ["placehold.co", "res.cloudinary.com"];

/**
 * Admins can paste an image URL from any site. Images from hosts not in
 * OPTIMIZED_IMAGE_HOSTS are shown as-is (`unoptimized`) instead of crashing `next/image`.
 */
export function isOptimizedImage(src: string): boolean {
  if (src.startsWith("/")) return true;
  try {
    const url = new URL(src);
    return url.protocol === "https:" && OPTIMIZED_IMAGE_HOSTS.includes(url.hostname);
  } catch {
    return false;
  }
}
