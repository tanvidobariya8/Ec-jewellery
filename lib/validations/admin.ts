import { z } from "zod";

import {
  CERTIFICATES,
  GENDERS,
  PRODUCT_STATUSES,
  PRODUCT_TYPES,
  type AdminCategory,
  type AdminCollection,
  type AdminProduct,
  type StonePrice,
} from "@/lib/api/admin-schemas";
import { paiseToRupees, rupeesToPaise } from "@/lib/currency";

/**
 * Admin form schemas. Forms work in rupees; the BE stores paise — the
 * `to…Payload` helpers convert, and turn empty strings into null.
 */

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const slugField = z
  .string()
  .trim()
  .refine((v) => v === "" || SLUG.test(v), "Lowercase letters, numbers and - only");
const optionalText = (max: number) => z.string().trim().max(max);
const httpsUrl = z
  .string()
  .trim()
  .refine((v) => v === "" || /^https:\/\/\S+$/.test(v), "Must start with https://");
const num = (message = "Enter a number") => z.number({ error: message });
const nullIfEmpty = (v: string) => (v.trim() === "" ? null : v.trim());

export const loginSchema = z.object({
  email: z.email("Enter a valid email"),
  password: z.string().min(8, "At least 8 characters"),
});
export type LoginValues = z.infer<typeof loginSchema>;

/* ------------------------------ Categories ----------------------------- */

export const categorySchema = z.object({
  name: z.string().trim().min(2, "At least 2 characters").max(80),
  slug: slugField,
  description: optionalText(1000),
  parentId: z.string(),
  sort: num().int().min(0),
  image: httpsUrl,
});
export type CategoryValues = z.infer<typeof categorySchema>;

export const categoryDefaults = (c?: AdminCategory): CategoryValues => ({
  name: c?.name ?? "",
  slug: c?.slug ?? "",
  description: c?.description ?? "",
  parentId: c?.parentId ?? "",
  sort: c?.sort ?? 0,
  image: c?.image ?? "",
});

export const toCategoryPayload = (v: CategoryValues) => ({
  name: v.name,
  slug: v.slug || undefined,
  description: nullIfEmpty(v.description),
  parentId: nullIfEmpty(v.parentId),
  sort: v.sort,
  image: nullIfEmpty(v.image),
});
export type CategoryPayload = ReturnType<typeof toCategoryPayload>;

/* ------------------------------ Collections ---------------------------- */

export const collectionSchema = categorySchema.pick({ name: true, slug: true, description: true });
export type CollectionValues = z.infer<typeof collectionSchema>;

export const collectionDefaults = (c?: AdminCollection): CollectionValues => ({
  name: c?.name ?? "",
  slug: c?.slug ?? "",
  description: c?.description ?? "",
});

export const toCollectionPayload = (v: CollectionValues) => ({
  name: v.name,
  slug: v.slug || undefined,
  description: nullIfEmpty(v.description),
});
export type CollectionPayload = ReturnType<typeof toCollectionPayload>;

/* ----------------------------- Stone prices ---------------------------- */

export const stonePriceFormSchema = z
  .object({
    stoneTypeId: z.string().min(1, "Choose a stone"),
    shapeId: z.string(),
    caratFrom: num().min(0).max(100),
    caratTo: num().min(0.001).max(100),
    pricePerCaratRupees: num().min(0).max(10_000_000),
    certificate: z.enum(CERTIFICATES),
  })
  .refine((v) => v.caratTo > v.caratFrom, {
    path: ["caratTo"],
    message: "Must be greater than 'from'",
  });
export type StonePriceValues = z.infer<typeof stonePriceFormSchema>;

export const stonePriceDefaults = (p?: StonePrice): StonePriceValues => ({
  stoneTypeId: p?.stoneTypeId ?? "",
  shapeId: p?.shapeId ?? "",
  caratFrom: p?.caratFrom ?? 0,
  caratTo: p?.caratTo ?? 0.999,
  pricePerCaratRupees: p ? paiseToRupees(p.pricePerCaratPaise) : 0,
  certificate: p?.certificate ?? "NONE",
});

export const toStonePricePayload = (v: StonePriceValues) => ({
  stoneTypeId: v.stoneTypeId,
  shapeId: nullIfEmpty(v.shapeId),
  caratFrom: v.caratFrom,
  caratTo: v.caratTo,
  pricePerCaratPaise: rupeesToPaise(v.pricePerCaratRupees),
  certificate: v.certificate,
});
export type StonePricePayload = ReturnType<typeof toStonePricePayload>;

/* ------------------------------- Products ------------------------------ */

const stoneOptionSchema = z.object({
  id: z.string().optional(),
  stoneTypeId: z.string().min(1, "Choose a stone"),
  carat: num().min(0.001, "Above 0").max(100),
  stoneCount: num().int().min(1).max(500),
  isCenter: z.boolean(),
  isDefault: z.boolean(),
});

export const productFormSchema = z.object({
  sku: z
    .string()
    .trim()
    .regex(/^[A-Za-z0-9-]{2,40}$/, "2–40 letters, numbers or -"),
  name: z.string().trim().min(2, "At least 2 characters").max(120),
  slug: slugField,
  description: optionalText(5000),
  categoryId: z.string().min(1, "Choose a category"),
  collectionId: z.string(),
  type: z.enum(PRODUCT_TYPES),
  gender: z.enum(GENDERS),
  status: z.enum(PRODUCT_STATUSES),
  labourRupees: num().min(0).max(10_000_000),
  metalWeightG: num().min(0).max(9999),
  isCustomizable: z.boolean(),
  hasRingSize: z.boolean(),
  isFeatured: z.boolean(),
  isBestSeller: z.boolean(),
  seoTitle: optionalText(120),
  seoDescription: optionalText(320),
  shapeIds: z.array(z.string()),
  styleIds: z.array(z.string()),
  metalIds: z.array(z.string()),
  stones: z.array(stoneOptionSchema),
  dimensions: z.array(z.object({ key: z.string().trim(), value: z.string().trim().max(100) })),
});
export type ProductValues = z.infer<typeof productFormSchema>;

export const productDefaults = (p?: AdminProduct): ProductValues => ({
  sku: p?.sku ?? "",
  name: p?.name ?? "",
  slug: p?.slug ?? "",
  description: p?.description ?? "",
  categoryId: p?.categoryId ?? "",
  collectionId: p?.collectionId ?? "",
  type: p?.type ?? "RING",
  gender: p?.gender ?? "WOMEN",
  status: p?.status ?? "DRAFT",
  labourRupees: p ? paiseToRupees(p.baseLabourPaise) : 0,
  metalWeightG: p?.metalWeightG ?? 0,
  isCustomizable: p?.isCustomizable ?? true,
  hasRingSize: p?.hasRingSize ?? false,
  isFeatured: p?.isFeatured ?? false,
  isBestSeller: p?.isBestSeller ?? false,
  seoTitle: p?.seoTitle ?? "",
  seoDescription: p?.seoDescription ?? "",
  shapeIds: p?.shapeIds ?? [],
  styleIds: p?.styleIds ?? [],
  metalIds: p?.metalIds ?? [],
  stones: p?.stones ?? [],
  dimensions: Object.entries(p?.dimensions ?? {}).map(([key, value]) => ({ key, value })),
});

export function toProductPayload(v: ProductValues) {
  const { labourRupees, dimensions, collectionId, ...rest } = v;
  const dims = Object.fromEntries(
    dimensions.filter((d) => d.key && d.value).map((d) => [d.key, d.value]),
  );
  return {
    ...rest,
    slug: v.slug || undefined,
    description: nullIfEmpty(v.description),
    collectionId: nullIfEmpty(collectionId),
    seoTitle: nullIfEmpty(v.seoTitle),
    seoDescription: nullIfEmpty(v.seoDescription),
    baseLabourPaise: rupeesToPaise(labourRupees),
    dimensions: Object.keys(dims).length ? dims : null,
  };
}
export type ProductPayload = ReturnType<typeof toProductPayload>;
