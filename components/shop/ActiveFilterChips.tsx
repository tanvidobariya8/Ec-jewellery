import { X } from "lucide-react";

import type { ActiveFilter } from "@/hooks/useShopFilters";

type ActiveFilterChipsProps = {
  filters: ActiveFilter[];
};

/** Removable pills for every applied filter. */
export function ActiveFilterChips({ filters }: ActiveFilterChipsProps) {
  if (filters.length === 0) return null;

  return (
    <ul className="flex flex-wrap gap-2" aria-label="Applied filters">
      {filters.map((filter) => (
        <li key={filter.id}>
          <button
            type="button"
            onClick={filter.clear}
            aria-label={`Remove filter ${filter.label}`}
            className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs text-foreground transition-colors duration-300 hover:border-primary hover:text-primary"
          >
            {filter.label}
            <X aria-hidden="true" className="size-3" />
          </button>
        </li>
      ))}
    </ul>
  );
}
