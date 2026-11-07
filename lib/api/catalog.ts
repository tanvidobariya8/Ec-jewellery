import { cacheLife, cacheTag } from "next/cache";
import { z } from "zod";

import { apiGet, apiGetOrNull, toQuery } from "@/lib/api/client";
import {
  categorySchema,
  paginated,
  productDetailSchema,
  productListItemSchema,
  shapeSchema,
  styleSchema,
} from "@/lib/api/schemas";
import type { ShopFilters } from "@/lib/search-params/shop";

/** Catalogue reads (BE `catalog` module). Cached on the server; revalidated hourly. */

export const PRODUCTS_PAGE_SIZE = 12;

export async function getCategories() {
  "use cache";
  cacheLife("hours");
  cacheTag("catalog");
  return apiGet("/categories", z.array(categorySchema));
}

export async function getCategory(slug: string) {
  const categories = await getCategories();
  return categories.find((category) => category.slug === slug) ?? null;
}

export async function getShapes() {
  "use cache";
  cacheLife("hours");
  cacheTag("catalog");
  return apiGet("/shapes", z.array(shapeSchema));
}

export async function getStyles() {
  "use cache";
  cacheLife("hours");
  cacheTag("catalog");
  return apiGet("/styles", z.array(styleSchema));
}

export async function getProducts(filters: ShopFilters) {
  "use cache";
  cacheLife("hours");
  cacheTag("products");
  const query = toQuery({ ...filters, pageSize: PRODUCTS_PAGE_SIZE });
  return apiGet(`/products${query}`, paginated(productListItemSchema));
}

export async function getProduct(slug: string) {
  "use cache";
  cacheLife("hours");
  cacheTag("products", `product:${slug}`);
  return apiGetOrNull(`/products/${encodeURIComponent(slug)}`, productDetailSchema);
}

/** All active product slugs (for static params and the sitemap). */
export async function getProductSlugs() {
  "use cache";
  cacheLife("hours");
  cacheTag("products");
  const page = await apiGet("/products?pageSize=100", paginated(productListItemSchema));
  return page.items.map((product) => product.slug);
}
