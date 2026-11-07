"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ImageOff, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { parseAsInteger, parseAsString, parseAsStringLiteral, useQueryStates } from "nuqs";

import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminSelect } from "@/components/admin/AdminSelect";
import { QueryState } from "@/components/admin/QueryState";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/FormField";
import { getAdminProducts } from "@/lib/api/admin";
import { PRODUCT_STATUSES } from "@/lib/api/admin-schemas";
import { cn } from "@/lib/utils";

const searchParams = {
  search: parseAsString.withDefault(""),
  status: parseAsStringLiteral(PRODUCT_STATUSES),
  page: parseAsInteger.withDefault(1),
};

const STATUS_STYLE = {
  ACTIVE: "bg-primary text-primary-foreground",
  DRAFT: "bg-surface-muted text-foreground",
  ARCHIVED: "bg-border text-muted",
} as const;

export function ProductsTable() {
  const [params, setParams] = useQueryStates(searchParams, { history: "replace" });
  const query = useQuery({
    queryKey: ["admin", "products", params],
    queryFn: () => getAdminProducts(params),
    placeholderData: keepPreviousData,
  });
  const data = query.data;

  return (
    <>
      <AdminPageHeader
        title="Products"
        description="Only ACTIVE products appear in the shop. Keep a product as DRAFT until its photos and options are ready."
        actions={
          <Button asChild>
            <Link href="/admin/products/new">
              <Plus aria-hidden="true" className="size-4" /> New product
            </Link>
          </Button>
        }
      />
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <Input
          type="search"
          aria-label="Search by name or SKU"
          placeholder="Search name or SKU…"
          value={params.search}
          onChange={(e) => setParams({ search: e.target.value, page: 1 })}
          className="h-11 py-2 sm:max-w-xs"
        />
        <AdminSelect
          aria-label="Status"
          className="sm:w-48"
          value={params.status ?? ""}
          onChange={(v) => setParams({ status: (v || null) as typeof params.status, page: 1 })}
          emptyLabel="All statuses"
          options={PRODUCT_STATUSES.map((s) => ({ value: s, label: s }))}
        />
      </div>
      <QueryState isPending={query.isPending} error={query.error} onRetry={query.refetch} />
      {data && (
        <>
          <ul className="divide-y divide-border border border-border">
            {data.items.map((p) => (
              <li key={p.id}>
                <Link
                  href={`/admin/products/${p.id}`}
                  className="flex items-center gap-4 px-4 py-3 text-sm hover:bg-surface"
                >
                  <div className="relative size-14 shrink-0 overflow-hidden border border-border bg-surface">
                    {p.image ? (
                      <Image
                        src={p.image}
                        alt=""
                        fill
                        unoptimized
                        sizes="56px"
                        className="object-cover"
                      />
                    ) : (
                      <ImageOff aria-hidden="true" className="m-auto mt-4 size-5 text-muted" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{p.name}</p>
                    <p className="truncate text-xs text-muted">
                      {p.sku} · {p.category} · {p.mediaCount} photos · {p.metalCount} metals ·{" "}
                      {p.stoneCount} stone options
                    </p>
                  </div>
                  <span
                    className={cn(
                      "px-2 py-1 text-[10px] tracking-label uppercase",
                      STATUS_STYLE[p.status],
                    )}
                  >
                    {p.status}
                  </span>
                </Link>
              </li>
            ))}
            {!data.items.length && (
              <li className="px-4 py-10 text-center text-sm text-muted">No products found.</li>
            )}
          </ul>
          {data.totalPages > 1 && (
            <div className="mt-6 flex items-center justify-between text-sm">
              <Button
                variant="outline"
                size="sm"
                disabled={params.page <= 1}
                onClick={() => setParams({ page: params.page - 1 })}
              >
                Previous
              </Button>
              <span className="text-muted">
                Page {data.page} of {data.totalPages} · {data.total} products
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={params.page >= data.totalPages}
                onClick={() => setParams({ page: params.page + 1 })}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </>
  );
}
