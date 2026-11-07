import { z } from "zod";

/** Response schemas for the BE (`../be/src/modules`). Types are inferred from these. */

const slugName = z.object({ slug: z.string(), name: z.string() });

export const paginated = <T extends z.ZodType>(item: T) =>
  z.object({
    items: z.array(item),
    page: z.number(),
    pageSize: z.number(),
    total: z.number(),
    totalPages: z.number(),
  });

/* ----------------------------- Catalogue ----------------------------- */

export const categorySchema = z.object({
  slug: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  image: z.string().nullable(),
  parentSlug: z.string().nullable(),
});

export const shapeSchema = z.object({ slug: z.string(), name: z.string() });
export const styleSchema = slugName;

export const stoneTypeCodeSchema = z.enum(["LAB_DIAMOND", "MOISSANITE", "PEARL"]);

export const productListItemSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  type: z.string(),
  category: slugName,
  collection: slugName.nullable(),
  image: z.object({ url: z.string(), alt: z.string() }).nullable(),
  shapes: z.array(z.string()),
  metals: z.array(z.string()),
  stoneTypes: z.array(stoneTypeCodeSchema),
  isFeatured: z.boolean(),
  isBestSeller: z.boolean(),
});

export const productDetailSchema = z.object({
  id: z.string(),
  sku: z.string(),
  slug: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  type: z.string(),
  gender: z.string(),
  category: slugName,
  collection: slugName.nullable(),
  dimensions: z.record(z.string(), z.string()).nullable(),
  metalWeightG: z.number(),
  isCustomizable: z.boolean(),
  hasRingSize: z.boolean(),
  isFeatured: z.boolean(),
  isBestSeller: z.boolean(),
  media: z.array(
    z.object({
      url: z.string(),
      kind: z.enum(["IMAGE", "VIDEO", "VIDEO_360"]),
      alt: z.string(),
      metalCode: z.string().nullable(),
    }),
  ),
  shapes: z.array(slugName),
  styles: z.array(slugName),
  metals: z.array(
    z.object({
      code: z.string(),
      name: z.string(),
      karat: z.number().nullable(),
      colour: z.string(),
    }),
  ),
  stoneOptions: z.array(
    z.object({
      id: z.string(),
      stoneType: z.object({
        code: stoneTypeCodeSchema,
        name: z.string(),
        grade: z.string().nullable(),
      }),
      carat: z.number(),
      stoneCount: z.number(),
      isCenter: z.boolean(),
      isDefault: z.boolean(),
    }),
  ),
  rating: z.object({ count: z.number(), average: z.number().nullable() }),
  seo: z.object({ title: z.string().nullable(), description: z.string().nullable() }),
});

/* ------------------------------ Content ------------------------------ */

export const contentSectionSchema = z.object({
  heading: z.string().optional(),
  paragraphs: z.array(z.string()),
  list: z.array(z.string()).optional(),
});

export const faqSchema = z.object({
  id: z.string(),
  question: z.string(),
  answer: z.string(),
  category: z.string().nullable(),
});

export const blogPostSummarySchema = z.object({
  slug: z.string(),
  title: z.string(),
  excerpt: z.string().nullable(),
  cover: z.string().nullable(),
  readingMinutes: z.number(),
  publishedAt: z.string().nullable(),
});

export const blogPostSchema = blogPostSummarySchema.extend({
  sections: z.array(contentSectionSchema),
  seoTitle: z.string().nullable(),
  seoDescription: z.string().nullable(),
});

export const policyPageSchema = z.object({
  slug: z.string(),
  title: z.string(),
  summary: z.string().nullable(),
  sections: z.array(contentSectionSchema),
});

export type Category = z.infer<typeof categorySchema>;
export type ProductListItem = z.infer<typeof productListItemSchema>;
export type ProductDetail = z.infer<typeof productDetailSchema>;
export type StoneOption = ProductDetail["stoneOptions"][number];
export type Faq = z.infer<typeof faqSchema>;
export type BlogPostSummary = z.infer<typeof blogPostSummarySchema>;
export type BlogPost = z.infer<typeof blogPostSchema>;
export type PolicyPage = z.infer<typeof policyPageSchema>;
