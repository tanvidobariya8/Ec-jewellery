"use client";

import { ChevronDown } from "lucide-react";
import { Accordion } from "radix-ui";
import { useState } from "react";

import { FilterRadioGroup } from "@/components/shop/FilterRadioGroup";
import type { FilterSection } from "@/hooks/useShopFilters";

/** How many options a section shows before "+ N more". */
const VISIBLE_OPTIONS = 6;
/** How many sections start expanded (plus any section with a selection). */
const OPEN_SECTIONS = 2;

type FilterSidebarProps = {
  sections: FilterSection[];
  hasActive: boolean;
  onClearAll: () => void;
};

/** "FILTERS / CLEAR ALL" header followed by every filter as a collapsible radio list. */
export function FilterSidebar({ sections, hasActive, onClearAll }: FilterSidebarProps) {
  const defaultOpen = sections
    .filter((section, index) => index < OPEN_SECTIONS || section.value)
    .map((section) => section.id);

  return (
    <div>
      <div className="flex items-center justify-between border-b border-border pb-4">
        <h2 className="text-sm font-medium tracking-label uppercase">Filters</h2>
        {hasActive && (
          <button
            type="button"
            onClick={onClearAll}
            className="text-xs tracking-label text-primary uppercase underline-offset-4 hover:underline"
          >
            Clear all
          </button>
        )}
      </div>
      <Accordion.Root type="multiple" defaultValue={defaultOpen}>
        {sections.map((section) => (
          <FilterSidebarSection key={section.id} section={section} />
        ))}
      </Accordion.Root>
    </div>
  );
}

function FilterSidebarSection({ section }: { section: FilterSection }) {
  const [expanded, setExpanded] = useState(false);
  const selected = section.options.find((o) => o.value === section.value);
  const selectedIndex = selected ? section.options.indexOf(selected) : -1;
  // Never hide the selected option behind "+ N more".
  const limit = Math.max(VISIBLE_OPTIONS, selectedIndex + 1);
  const hidden = section.options.length - limit;
  const options = expanded || hidden <= 0 ? section.options : section.options.slice(0, limit);

  return (
    <Accordion.Item value={section.id} className="border-b border-border">
      <Accordion.Header>
        <Accordion.Trigger className="group flex w-full items-center justify-between gap-3 py-4 text-left">
          <span className="min-w-0">
            <span className="block text-xs font-medium tracking-label uppercase">
              {section.label}
            </span>
            {selected && (
              <span className="mt-1 block truncate text-xs text-primary group-data-[state=open]:hidden">
                {selected.label}
              </span>
            )}
          </span>
          <ChevronDown
            aria-hidden="true"
            className="size-4 shrink-0 text-gold transition-transform duration-300 group-data-[state=open]:rotate-180"
          />
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="pb-5">
        <FilterRadioGroup
          label={section.label}
          value={section.value}
          options={options}
          onChange={section.onChange}
        />
        {hidden > 0 && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="mt-2 text-xs text-primary underline-offset-4 hover:underline"
          >
            {expanded ? "Show less" : `+ ${hidden} more`}
          </button>
        )}
      </Accordion.Content>
    </Accordion.Item>
  );
}
