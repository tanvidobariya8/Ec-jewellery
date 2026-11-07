import { z } from "zod";

import {
  adminCategorySchema,
  adminCollectionSchema,
  adminMetalSchema,
  adminProductRowSchema,
  adminProductSchema,
  authUserSchema,
  lookupsSchema,
  pricingSettingSchema,
  productMediaSchema,
  stonePriceSchema,
  uploadSignatureSchema,
} from "@/lib/api/admin-schemas";
import { ApiError, apiFetch, apiGet, apiSend, toQuery, userMessage } from "@/lib/api/client";
import { paginated } from "@/lib/api/schemas";
import type {
  CategoryPayload,
  CollectionPayload,
  ProductPayload,
  StonePricePayload,
} from "@/lib/validations/admin";

/**
 * Admin API (client-side only, via React Query). The BE checks the ADMIN role on
 * every call — the FE guard only decides what to show.
 */

const json = (method: string, body?: unknown): RequestInit => ({
  method,
  body: body === undefined ? undefined : JSON.stringify(body),
});
const ok = z.unknown();

/** Admin-facing error text: the BE's own messages are written for admins, so show them. */
export function adminMessage(error: unknown, fallback = "Something went wrong. Please try again.") {
  if (error instanceof ApiError) {
    return error.details.length ? error.details.join(" · ") : userMessage(error, fallback);
  }
  return error instanceof Error ? error.message : fallback;
}

/* -------------------------------- Auth -------------------------------- */

export const getMe = () => apiGet("/auth/me", authUserSchema);
export const login = (body: { email: string; password: string }) =>
  apiSend("/auth/login", authUserSchema, json("POST", body));
export const logout = () => apiFetch<void>("/auth/logout", json("POST"));

/* ------------------------------ Taxonomy ------------------------------ */

export const getLookups = () => apiGet("/admin/lookups", lookupsSchema);

export const getCategories = () => apiGet("/admin/categories", z.array(adminCategorySchema));
export const createCategory = (body: CategoryPayload) =>
  apiSend("/admin/categories", adminCategorySchema, json("POST", body));
export const updateCategory = (id: string, body: Partial<CategoryPayload>) =>
  apiSend(`/admin/categories/${id}`, adminCategorySchema, json("PATCH", body));
export const deleteCategory = (id: string) =>
  apiFetch<void>(`/admin/categories/${id}`, json("DELETE"));

export const getCollections = () => apiGet("/admin/collections", z.array(adminCollectionSchema));
export const createCollection = (body: CollectionPayload) =>
  apiSend("/admin/collections", adminCollectionSchema, json("POST", body));
export const updateCollection = (id: string, body: Partial<CollectionPayload>) =>
  apiSend(`/admin/collections/${id}`, adminCollectionSchema, json("PATCH", body));
export const deleteCollection = (id: string) =>
  apiFetch<void>(`/admin/collections/${id}`, json("DELETE"));

/* ------------------------------- Pricing ------------------------------ */

export const getMetals = () => apiGet("/admin/metals", z.array(adminMetalSchema));
export const updateMetalRates = (rates: { metalId: string; pricePerGramPaise: number }[]) =>
  apiSend("/admin/metal-rates", z.array(adminMetalSchema), json("PUT", { rates }));
export const updateMetal = (id: string, body: { active?: boolean }) =>
  apiSend(`/admin/metals/${id}`, ok, json("PATCH", body));

export const getStonePrices = () => apiGet("/admin/stone-prices", z.array(stonePriceSchema));
export const createStonePrice = (body: StonePricePayload) =>
  apiSend("/admin/stone-prices", stonePriceSchema, json("POST", body));
export const updateStonePrice = (id: string, body: StonePricePayload) =>
  apiSend(`/admin/stone-prices/${id}`, stonePriceSchema, json("PATCH", body));
export const deleteStonePrice = (id: string) =>
  apiFetch<void>(`/admin/stone-prices/${id}`, json("DELETE"));

export const getPricingSettings = () =>
  apiGet("/admin/pricing-settings", z.array(pricingSettingSchema));
export const updatePricingSetting = (key: string, value: unknown) =>
  apiSend(`/admin/pricing-settings/${key}`, pricingSettingSchema, json("PUT", { value }));

/* ------------------------------ Products ------------------------------ */

export type ProductListParams = {
  search?: string | null;
  status?: string | null;
  page?: number;
};

export const getAdminProducts = (params: ProductListParams) =>
  apiGet(
    `/admin/products${toQuery({ ...params, pageSize: 20 })}`,
    paginated(adminProductRowSchema),
  );
export const getAdminProduct = (id: string) => apiGet(`/admin/products/${id}`, adminProductSchema);
export const createProduct = (body: ProductPayload) =>
  apiSend("/admin/products", adminProductSchema, json("POST", body));
export const updateProduct = (id: string, body: Partial<ProductPayload>) =>
  apiSend(`/admin/products/${id}`, adminProductSchema, json("PATCH", body));
export const deleteProduct = (id: string) =>
  apiFetch<void>(`/admin/products/${id}`, json("DELETE"));

export const addProductMedia = (
  productId: string,
  body: { url: string; kind?: string; alt?: string | null },
) => apiSend(`/admin/products/${productId}/media`, productMediaSchema, json("POST", body));
export const updateProductMedia = (
  productId: string,
  mediaId: string,
  body: { alt?: string | null; metalCode?: string | null },
) => apiFetch<void>(`/admin/products/${productId}/media/${mediaId}`, json("PATCH", body));
export const reorderProductMedia = (productId: string, ids: string[]) =>
  apiFetch<void>(`/admin/products/${productId}/media/order`, json("PUT", { ids }));
export const deleteProductMedia = (productId: string, mediaId: string) =>
  apiFetch<void>(`/admin/products/${productId}/media/${mediaId}`, json("DELETE"));

/* ------------------------------- Uploads ------------------------------ */

export const signUpload = (folder: "products" | "categories" | "banners") =>
  apiSend("/admin/uploads/sign", uploadSignatureSchema, json("POST", { folder }));
