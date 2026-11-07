import { z } from "zod";

/** Response schemas for BE `/auth/*` and `/admin/*` (`../be/src/modules/admin`). */

export const PRODUCT_TYPES = [
  "RING",
  "EARRING",
  "PENDANT",
  "BRACELET",
  "NECKLACE",
  "LOOSE_STONE",
  "CHAIN",
] as const;
export const GENDERS = ["WOMEN", "MEN", "UNISEX"] as const;
export const PRODUCT_STATUSES = ["DRAFT", "ACTIVE", "ARCHIVED"] as const;
export const MEDIA_KINDS = ["IMAGE", "VIDEO", "VIDEO_360"] as const;
export const CERTIFICATES = ["NONE", "IGI", "SGL"] as const;

export const authUserSchema = z.object({
  id: z.string(),
  email: z.string().nullable(),
  name: z.string().nullable(),
  role: z.enum(["CUSTOMER", "ADMIN"]),
});

const idName = z.object({ id: z.string(), name: z.string(), slug: z.string() });

export const lookupsSchema = z.object({
  categories: z.array(idName.extend({ parentId: z.string().nullable() })),
  collections: z.array(idName),
  shapes: z.array(idName),
  styles: z.array(idName),
  metals: z.array(
    z.object({ id: z.string(), code: z.string(), name: z.string(), active: z.boolean() }),
  ),
  stoneTypes: z.array(
    z.object({ id: z.string(), code: z.string(), name: z.string(), grade: z.string().nullable() }),
  ),
});

export const adminCategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
  parentId: z.string().nullable(),
  sort: z.number(),
  image: z.string().nullable(),
  productCount: z.number().optional(),
});

export const adminCollectionSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
  productCount: z.number().optional(),
});

export const adminMetalSchema = z.object({
  id: z.string(),
  code: z.string(),
  name: z.string(),
  karat: z.number().nullable(),
  colour: z.string(),
  purity: z.number(),
  pricePerGramPaise: z.number(),
  active: z.boolean(),
  sort: z.number(),
  productCount: z.number(),
});

export const stonePriceSchema = z.object({
  id: z.string(),
  stoneTypeId: z.string(),
  shapeId: z.string().nullable(),
  caratFrom: z.number(),
  caratTo: z.number(),
  pricePerCaratPaise: z.number(),
  certificate: z.enum(CERTIFICATES),
  stoneType: z.object({ code: z.string(), name: z.string() }).optional(),
  shape: z.object({ name: z.string(), slug: z.string() }).nullable().optional(),
});

export const pricingSettingSchema = z.object({
  key: z.string(),
  value: z.unknown(),
  updatedAt: z.string(),
});

export const adminProductRowSchema = z.object({
  id: z.string(),
  sku: z.string(),
  name: z.string(),
  slug: z.string(),
  status: z.enum(PRODUCT_STATUSES),
  type: z.enum(PRODUCT_TYPES),
  category: z.string(),
  image: z.string().nullable(),
  mediaCount: z.number(),
  metalCount: z.number(),
  stoneCount: z.number(),
  isFeatured: z.boolean(),
  updatedAt: z.string(),
});

export const productMediaSchema = z.object({
  id: z.string(),
  url: z.string(),
  kind: z.enum(MEDIA_KINDS),
  alt: z.string().nullable(),
  metalCode: z.string().nullable(),
  sort: z.number(),
});

export const adminProductSchema = z.object({
  id: z.string(),
  sku: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
  categoryId: z.string(),
  collectionId: z.string().nullable(),
  type: z.enum(PRODUCT_TYPES),
  gender: z.enum(GENDERS),
  baseLabourPaise: z.number(),
  metalWeightG: z.number(),
  dimensions: z.record(z.string(), z.string()).nullable(),
  isCustomizable: z.boolean(),
  hasRingSize: z.boolean(),
  status: z.enum(PRODUCT_STATUSES),
  isFeatured: z.boolean(),
  isBestSeller: z.boolean(),
  seoTitle: z.string().nullable(),
  seoDescription: z.string().nullable(),
  updatedAt: z.string(),
  media: z.array(productMediaSchema),
  shapeIds: z.array(z.string()),
  styleIds: z.array(z.string()),
  metalIds: z.array(z.string()),
  stones: z.array(
    z.object({
      id: z.string(),
      stoneTypeId: z.string(),
      carat: z.number(),
      stoneCount: z.number(),
      isCenter: z.boolean(),
      isDefault: z.boolean(),
    }),
  ),
});

export const uploadSignatureSchema = z.object({
  uploadUrl: z.string(),
  apiKey: z.string(),
  folder: z.string(),
  timestamp: z.number(),
  signature: z.string(),
  limits: z.object({ imageMb: z.number(), videoMb: z.number() }),
});

export type AuthUser = z.infer<typeof authUserSchema>;
export type Lookups = z.infer<typeof lookupsSchema>;
export type AdminCategory = z.infer<typeof adminCategorySchema>;
export type AdminCollection = z.infer<typeof adminCollectionSchema>;
export type AdminMetal = z.infer<typeof adminMetalSchema>;
export type StonePrice = z.infer<typeof stonePriceSchema>;
export type PricingSetting = z.infer<typeof pricingSettingSchema>;
export type AdminProductRow = z.infer<typeof adminProductRowSchema>;
export type AdminProduct = z.infer<typeof adminProductSchema>;
export type ProductMedia = z.infer<typeof productMediaSchema>;
export type MediaKind = (typeof MEDIA_KINDS)[number];
export type ProductStatus = (typeof PRODUCT_STATUSES)[number];
