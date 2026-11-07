"use client";

import { Check, ChevronDown } from "lucide-react";
import { Select } from "radix-ui";

import { cn } from "@/lib/utils";

/** Radix Select cannot use "" as a value, so this stands for "nothing chosen". */
const NONE = "__none__";

export type SelectOption = { value: string; label: string };

type AdminSelectProps = {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly SelectOption[];
  /** Adds a first option that maps to "" (e.g. "No parent"). */
  emptyLabel?: string;
  placeholder?: string;
  invalid?: boolean;
  className?: string;
  "aria-label"?: string;
};

/** Form select for admin screens (value "" = nothing chosen). */
export function AdminSelect({
  id,
  value,
  onChange,
  options,
  emptyLabel,
  placeholder = "Choose…",
  invalid,
  className,
  ...aria
}: AdminSelectProps) {
  const items = emptyLabel ? [{ value: NONE, label: emptyLabel }, ...options] : options;

  return (
    <Select.Root
      value={value === "" ? (emptyLabel ? NONE : undefined) : value}
      onValueChange={(next) => onChange(next === NONE ? "" : next)}
    >
      <Select.Trigger
        id={id}
        aria-invalid={invalid || undefined}
        aria-label={aria["aria-label"]}
        className={cn(
          "flex h-11 w-full items-center justify-between gap-2 border border-border bg-white/60 px-4 text-left text-sm hover:border-primary focus:border-primary focus:outline-none aria-invalid:border-danger data-[state=open]:border-primary",
          className,
        )}
      >
        <Select.Value placeholder={<span className="text-muted/70">{placeholder}</span>} />
        <Select.Icon>
          <ChevronDown aria-hidden="true" className="size-4 shrink-0 text-muted" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          position="popper"
          sideOffset={4}
          className="z-50 max-h-80 min-w-(--radix-select-trigger-width) border border-border bg-background py-1 shadow-sm"
        >
          <Select.Viewport>
            {items.map((option) => (
              <Select.Item
                key={option.value}
                value={option.value}
                className="relative flex cursor-pointer items-center py-2 pr-3 pl-8 text-sm outline-none data-highlighted:bg-surface data-[state=checked]:text-primary"
              >
                <Select.ItemIndicator className="absolute left-2">
                  <Check aria-hidden="true" className="size-4" />
                </Select.ItemIndicator>
                <Select.ItemText>{option.label}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
