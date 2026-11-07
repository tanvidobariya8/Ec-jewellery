import { cacheLife, cacheTag } from "next/cache";
import { z } from "zod";

import { apiGet, apiGetOrNull } from "@/lib/api/client";
import {
  blogPostSchema,
  blogPostSummarySchema,
  faqSchema,
  paginated,
  policyPageSchema,
} from "@/lib/api/schemas";

/** Content reads (BE `content` module). Cached on the server; revalidated hourly. */

export async function getFaqs() {
  "use cache";
  cacheLife("hours");
  cacheTag("faqs");
  return apiGet("/faqs", z.array(faqSchema));
}

export async function getBlogPosts() {
  "use cache";
  cacheLife("hours");
  cacheTag("blog");
  const page = await apiGet("/blog?pageSize=100", paginated(blogPostSummarySchema));
  return page.items;
}

export async function getBlogPost(slug: string) {
  "use cache";
  cacheLife("hours");
  cacheTag("blog", `blog:${slug}`);
  return apiGetOrNull(`/blog/${encodeURIComponent(slug)}`, blogPostSchema);
}

/** Policy pages stored in the BE `pages` table. */
export const POLICY_SLUGS = ["shipping", "returns", "privacy", "terms"] as const;

export async function getPolicyPage(slug: string) {
  "use cache";
  cacheLife("hours");
  cacheTag("pages", `page:${slug}`);
  return apiGetOrNull(`/pages/${encodeURIComponent(slug)}`, policyPageSchema);
}
