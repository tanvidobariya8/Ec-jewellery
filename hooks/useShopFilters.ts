"use client";

import { useQueryStates } from "nuqs";
import { useTransition } from "react";

import type { FilterOption } from "@/components/shop/FilterSelect";
import { METALS, STONE_LABELS } from "@/lib/constants";
import {
  CARAT_RANGES,
  PRODUCT_SORTS,
  STONE_FILTERS,
  shopSearchParams,
} from "@/lib/search-params/shop";

export type FilterSection = {
  id: string;
  label: string;
  value: string | null;
  options: FilterOption[];
  onChange: (value: string | null) => void;
};

export type ActiveFilter = { id: string; label: string; clear: () => void };

type UseShopFiltersArgs = {
  categories: FilterOption[];
  shapes: FilterOption[];
  styles: FilterOption[];
  showCategory: boolean;
};

const STONE_OPTIONS = STONE_FILTERS.map((code) => ({ value: code, label: STONE_LABELS[code] }));
const METAL_OPTIONS = METALS.map((metal) => ({ value: metal.code, label: metal.name }));
const CARAT_OPTIONS = CARAT_RANGES.map((range) => ({
  value: `${range.min ?? ""}-${range.max ?? ""}`,
  label: range.label,
}));

/** Shop filter + sort state (in the URL via nuqs), shaped for the sidebar, chips and sort. */
export function useShopFilters({ categories, shapes, styles, showCategory }: UseShopFiltersArgs) {
  const [isPending, startTransition] = useTransition();
  const [filters, setFilters] = useQueryStates(shopSearchParams, {
    shallow: false,
    scroll: false,
    startTransition,
  });

  /** Any filter change goes back to page 1. */
  const update = (patch: Partial<typeof filters>) => void setFilters({ ...patch, page: null });

  const caratValue =
    filters.caratMin !== null || filters.caratMax !== null
      ? `${filters.caratMin ?? ""}-${filters.caratMax ?? ""}`
      : null;

  const sections: FilterSection[] = [
    ...(showCategory
      ? [
          {
            id: "category",
            label: "Category",
            value: filters.category,
            options: categories,
            onChange: (category: string | null) => update({ category }),
          },
        ]
      : []),
    {
      id: "stone",
      label: "Stone",
      value: filters.stone,
      options: STONE_OPTIONS,
      onChange: (stone) => update({ stone: stone as (typeof STONE_FILTERS)[number] | null }),
    },
    {
      id: "shape",
      label: "Shape",
      value: filters.shape,
      options: shapes,
      onChange: (shape) => update({ shape }),
    },
    {
      id: "style",
      label: "Style",
      value: filters.style,
      options: styles,
      onChange: (style) => update({ style }),
    },
    {
      id: "metal",
      label: "Metal",
      value: filters.metal,
      options: METAL_OPTIONS,
      onChange: (metal) => update({ metal }),
    },
    {
      id: "carat",
      label: "Carat",
      value: caratValue,
      options: CARAT_OPTIONS,
      onChange: (value) => {
        const [min, max] = (value ?? "-").split("-");
        update({ caratMin: min ? Number(min) : null, caratMax: max ? Number(max) : null });
      },
    },
  ];

  const active: ActiveFilter[] = sections.flatMap((section) => {
    const option = section.options.find((o) => o.value === section.value);
    return option
      ? [{ id: section.id, label: option.label, clear: () => section.onChange(null) }]
      : [];
  });

  const clearAll = () =>
    update({
      ...(showCategory && { category: null }),
      shape: null,
      style: null,
      metal: null,
      stone: null,
      caratMin: null,
      caratMax: null,
    });

  const setSort = (sort: string | null) =>
    update({ sort: (sort ?? "featured") as (typeof PRODUCT_SORTS)[number] });

  return { sections, active, clearAll, sort: filters.sort, setSort, isPending };
}
