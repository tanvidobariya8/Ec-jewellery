import {
  createLoader,
  parseAsFloat,
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
} from "nuqs/server";

/** Shop filter / sort / page state in the URL — shared by the server page and client filters. */

export const PRODUCT_SORTS = ["featured", "best-sellers", "newest", "name"] as const;
export const STONE_FILTERS = ["LAB_DIAMOND", "MOISSANITE"] as const;

export const shopSearchParams = {
  category: parseAsString,
  shape: parseAsString,
  style: parseAsString,
  metal: parseAsString,
  stone: parseAsStringLiteral(STONE_FILTERS),
  caratMin: parseAsFloat,
  caratMax: parseAsFloat,
  sort: parseAsStringLiteral(PRODUCT_SORTS).withDefault("featured"),
  page: parseAsInteger.withDefault(1),
};

export const loadShopSearchParams = createLoader(shopSearchParams);

export type ShopFilters = Awaited<ReturnType<typeof loadShopSearchParams>>;

export const SORT_LABELS: Record<(typeof PRODUCT_SORTS)[number], string> = {
  featured: "Featured",
  "best-sellers": "Best sellers",
  newest: "Newest",
  name: "Name A–Z",
};

/** Carat filter presets (center stone). */
export const CARAT_RANGES = [
  { label: "Under 1 ct", min: null, max: 0.99 },
  { label: "1 – 1.99 ct", min: 1, max: 1.99 },
  { label: "2 – 2.99 ct", min: 2, max: 2.99 },
  { label: "3 ct +", min: 3, max: null },
] as const;
