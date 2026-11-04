import type { MetadataRoute } from "next";

import { CATEGORIES, SITE } from "@/lib/constants";
import { BLOG_POSTS } from "@/lib/mock/blog";
import { POLICIES } from "@/lib/mock/policies";

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

export default function sitemap(): MetadataRoute.Sitemap {
  const urls = [
    ...STATIC_ROUTES,
    ...CATEGORIES.map((category) => `/shop/${category.slug}`),
    ...BLOG_POSTS.map((post) => `/blog/${post.slug}`),
    ...POLICIES.map((policy) => `/policies/${policy.slug}`),
  ];
  return urls.map((path) => ({ url: `${SITE.url}${path}` }));
}
