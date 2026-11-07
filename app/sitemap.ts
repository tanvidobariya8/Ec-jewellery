import type { MetadataRoute } from "next";

import { getCategories, getProductSlugs } from "@/lib/api/catalog";
import { getBlogPosts, POLICY_SLUGS } from "@/lib/api/content";
import { SITE } from "@/lib/constants";

const STATIC_ROUTES = [
  "",
  "/shop",
  "/custom-jewelry",
  "/about",
  "/contact",
  "/faq",
  "/education",
  "/ring-size",
  "/blog",
];

/** API-driven URLs; an empty list if the API is unavailable (the sitemap must never fail). */
async function dynamicRoutes(): Promise<string[]> {
  try {
    const [categories, productSlugs, posts] = await Promise.all([
      getCategories(),
      getProductSlugs(),
      getBlogPosts(),
    ]);
    return [
      ...categories.map((category) => `/shop/${category.slug}`),
      ...productSlugs.map((slug) => `/product/${slug}`),
      ...posts.map((post) => `/blog/${post.slug}`),
    ];
  } catch (error) {
    console.error("sitemap: API unavailable, serving static routes only", error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const urls = [
    ...STATIC_ROUTES,
    ...POLICY_SLUGS.map((slug) => `/policies/${slug}`),
    ...(await dynamicRoutes()),
  ];
  return urls.map((path) => ({ url: `${SITE.url}${path}` }));
}
