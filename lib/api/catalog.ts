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
import { SHAPES } from "@/lib/constants";
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

/** Home "Best sellers" row for one category (sub-categories included): best-seller-flagged first. */
export async function getBestSellers(category: string, limit = 8) {
  "use cache";
  cacheLife("hours");
  cacheTag("products");
  const query = toQuery({ category, sort: "best-sellers", pageSize: limit });
  const page = await apiGet(`/products${query}`, paginated(productListItemSchema));
  return page.items;
}

/** All active product slugs (for static params and the sitemap). */
export async function getProductSlugs() {
  "use cache";
  cacheLife("hours");
  cacheTag("products");
  const page = await apiGet("/products?pageSize=100", paginated(productListItemSchema));
  return page.items.map((product) => product.slug);
}

export type StyleTile = {
  slug: string;
  name: string;
  count: number;
  image: { url: string; alt: string } | null;
};

/**
 * "Shop rings by style" tiles for one stone type: each style with its ring count and that tab's
 * tile photo from Admin → Ring styles (or the first matching product's photo), in that tab's order.
 * A style shows when it has a tile photo or at least one ring for that stone.
 */
export async function getRingStyleTiles(stone: ShopFilters["stone"]): Promise<StyleTile[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("catalog", "products");
  const styles = await getStyles();
  const tiles = await Promise.all(
    styles.map(async (style) => {
      const query = toQuery({ category: "rings", style: style.slug, stone, pageSize: 1 });
      const page = await apiGet(`/products${query}`, paginated(productListItemSchema));
      const isMoissanite = stone === "MOISSANITE";
      const tileImage = isMoissanite ? style.moissaniteImage : style.image;
      // The tab's own tile photo wins; otherwise the first matching ring's photo.
      const image = tileImage
        ? { url: tileImage, alt: `${style.name} ring` }
        : (page.items[0]?.image ?? null);
      const order = (isMoissanite ? style.moissaniteSort : style.sort) ?? 0;
      const tile: StyleTile = { slug: style.slug, name: style.name, count: page.total, image };
      return { tile, order };
    }),
  );
  return tiles
    .filter(({ tile }) => tile.count > 0 || tile.image !== null)
    .sort((a, b) => a.order - b.order)
    .map(({ tile }) => tile);
}

export type ShapeTile = {
  slug: string;
  name: string;
  image: string | null;
  description: string | null;
};

/**
 * "Shop ring by shape" tiles from Admin → Stone shapes (photo, blurb, order). Falls back to the
 * built-in list when the API is down or has no shapes yet.
 */
export async function getShapeTiles(): Promise<ShapeTile[]> {
  const shapes = await getShapes().catch(() => []);
  if (shapes.length === 0) return SHAPES;
  return shapes.map((shape) => ({
    slug: shape.slug,
    name: shape.name,
    image: shape.image ?? null,
    description: shape.description ?? null,
  }));
}
