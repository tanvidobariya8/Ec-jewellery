import { timingSafeEqual } from "node:crypto";

import { revalidateTag } from "next/cache";
import { z } from "zod";

/**
 * Called by the BE after admin edits (be/src/modules/admin/storefront-cache.service.ts)
 * so storefront pages show the change on the next visit instead of after the hourly refresh.
 */
const bodySchema = z.object({
  tags: z
    .array(z.string().regex(/^(catalog|products|product:[a-z0-9-]+)$/))
    .min(1)
    .max(20),
});

function isAuthorized(header: string | null) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret || !header) return false;
  const a = Buffer.from(header);
  const b = Buffer.from(secret);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(request: Request) {
  if (!isAuthorized(request.headers.get("x-revalidate-secret"))) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return Response.json({ error: "Invalid tags" }, { status: 400 });
  }
  // `expire: 0` — the admin expects to see the change right away, not stale-while-revalidate.
  for (const tag of parsed.data.tags) revalidateTag(tag, { expire: 0 });
  return Response.json({ revalidated: parsed.data.tags });
}
