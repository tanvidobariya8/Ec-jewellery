"use client";

import { ActiveFilterChips } from "@/components/shop/ActiveFilterChips";
import { FilterPanel } from "@/components/shop/FilterPanel";
import { FilterSelect, type FilterOption } from "@/components/shop/FilterSelect";
import { FilterSidebar } from "@/components/shop/FilterSidebar";
import { useShopFilters } from "@/hooks/useShopFilters";
import type { ShapeTile } from "@/lib/api/catalog";
import { PRODUCT_SORTS, SORT_LABELS } from "@/lib/search-params/shop";
import { cn } from "@/lib/utils";

type ShopFiltersProps = {
  /** Breadcrumb + page title, above the filter sidebar. */
  title: React.ReactNode;
  categories: FilterOption[];
  /** Shapes with photos: shown as a photo grid in the sidebar. */
  shapeTiles: ShapeTile[];
  styles: FilterOption[];
  /** Hide the category filter on category pages. */
  showCategory?: boolean;
  total: number;
  /** The product grid + pagination (server-rendered). */
  children: React.ReactNode;
};

const SORT_OPTIONS = PRODUCT_SORTS.map((sort) => ({ value: sort, label: SORT_LABELS[sort] }));

/**
 * Shop layout: filter sidebar on the left (a slide-in panel below `lg`), and a top bar
 * with the result count, applied-filter chips and sort above the products.
 * State lives in the URL; changes re-render the server product list.
 */
export function ShopFilters({
  title,
  categories,
  shapeTiles,
  styles,
  showCategory = true,
  total,
  children,
}: ShopFiltersProps) {
  const { sections, active, clearAll, sort, setSort, isPending } = useShopFilters({
    categories,
    shapes: shapeTiles.map((tile) => ({ value: tile.slug, label: tile.name, image: tile.image })),
    styles,
    showCategory,
  });

  const sidebar = (
    <FilterSidebar sections={sections} hasActive={active.length > 0} onClearAll={clearAll} />
  );

  return (
    <div className="lg:grid lg:grid-cols-[15rem_1fr] lg:gap-x-8">
      {/* Title sits above the filters, so the count / sort bar lines up with the breadcrumb. */}
      <div className="lg:flex lg:flex-col">
        {title}
        <aside aria-label="Filters" className="hidden lg:block lg:flex-1">
          <div className="sticky top-48 max-h-[calc(100vh-13rem)] overflow-y-auto pr-2">
            {sidebar}
          </div>
        </aside>
      </div>

      <div className="min-w-0">
        <div className="flex flex-col gap-3 border-b border-border pb-4">
          <div className="flex flex-wrap items-center gap-3">
            <FilterPanel activeCount={active.length}>{sidebar}</FilterPanel>
            <p className="text-xs tracking-label text-muted uppercase" aria-live="polite">
              {total} {total === 1 ? "design" : "designs"}
            </p>
            <FilterSelect
              label="Sort by"
              value={sort}
              options={SORT_OPTIONS}
              allLabel={SORT_LABELS.featured}
              onChange={setSort}
              className="ml-auto"
            />
          </div>
          <ActiveFilterChips filters={active} />
        </div>

        <div className={cn("transition-opacity", isPending && "opacity-60")} aria-busy={isPending}>
          {children}
        </div>
      </div>
    </div>
  );
}
