import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { createSerializer } from "nuqs/server";

import { shopSearchParams, type ShopFilters } from "@/lib/search-params/shop";
import { cn } from "@/lib/utils";

const serialize = createSerializer(shopSearchParams);

type PaginationProps = {
  basePath: string;
  filters: ShopFilters;
  page: number;
  totalPages: number;
};

export function Pagination({ basePath, filters, page, totalPages }: PaginationProps) {
  if (totalPages <= 1) return null;

  const href = (target: number) => serialize(basePath, { ...filters, page: target });
  const linkClass =
    "inline-flex size-10 items-center justify-center border border-border text-xs transition-colors hover:border-primary hover:text-primary";

  return (
    <nav aria-label="Pagination" className="mt-14 flex items-center justify-center gap-2">
      {page > 1 && (
        <Link href={href(page - 1)} className={linkClass} aria-label="Previous page">
          <ChevronLeft aria-hidden="true" className="size-4" />
        </Link>
      )}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((target) => (
        <Link
          key={target}
          href={href(target)}
          aria-current={target === page ? "page" : undefined}
          className={cn(
            linkClass,
            target === page && "border-primary bg-primary text-primary-foreground",
          )}
        >
          {target}
        </Link>
      ))}
      {page < totalPages && (
        <Link href={href(page + 1)} className={linkClass} aria-label="Next page">
          <ChevronRight aria-hidden="true" className="size-4" />
        </Link>
      )}
    </nav>
  );
}
