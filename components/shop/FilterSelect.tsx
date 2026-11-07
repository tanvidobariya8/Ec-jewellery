"use client";

import { ChevronDown } from "lucide-react";
import { Select } from "radix-ui";

import { cn } from "@/lib/utils";

/** Radix Select cannot use "" as a value, so "all" stands for "no filter". */
export const ALL = "all";

export type FilterOption = { value: string; label: string };

type FilterSelectProps = {
  label: string;
  value: string | null;
  options: FilterOption[];
  onChange: (value: string | null) => void;
  allLabel?: string;
  className?: string;
};

export function FilterSelect({
  label,
  value,
  options,
  onChange,
  allLabel = "All",
  className,
}: FilterSelectProps) {
  const current = options.find((option) => option.value === value);

  return (
    <Select.Root
      value={value ?? ALL}
      onValueChange={(next) => onChange(next === ALL ? null : next)}
    >
      <Select.Trigger
        aria-label={label}
        className={cn(
          "inline-flex h-10 min-w-36 items-center justify-between gap-2 border border-border bg-background px-3 text-left text-xs tracking-label uppercase hover:border-primary data-[state=open]:border-primary",
          current && "border-primary text-primary",
          className,
        )}
      >
        <span className="truncate">
          <span className="text-muted">{label}: </span>
          {current?.label ?? allLabel}
        </span>
        <Select.Icon>
          <ChevronDown aria-hidden="true" className="size-3 shrink-0" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          position="popper"
          sideOffset={4}
          className="z-50 max-h-80 min-w-(--radix-select-trigger-width) border border-border bg-background py-1 shadow-sm"
        >
          <Select.Viewport>
            {[{ value: ALL, label: allLabel }, ...options].map((option) => (
              <Select.Item
                key={option.value}
                value={option.value}
                className="cursor-pointer px-3 py-2 text-xs tracking-label uppercase outline-none data-highlighted:bg-surface data-[state=checked]:text-primary"
              >
                <Select.ItemText>{option.label}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
