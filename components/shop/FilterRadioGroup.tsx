"use client";

import { RadioGroup } from "radix-ui";
import { useId } from "react";

import { ALL, type FilterOption } from "@/components/shop/FilterSelect";
import { cn } from "@/lib/utils";

type FilterRadioGroupProps = {
  label: string;
  value: string | null;
  options: FilterOption[];
  onChange: (value: string | null) => void;
  /** Label for the "no filter" option. Pass `null` to hide it (e.g. sort). */
  allLabel?: string | null;
};

/** Single-choice list of radio buttons used inside the filter side panel. */
export function FilterRadioGroup({
  label,
  value,
  options,
  onChange,
  allLabel = "All",
}: FilterRadioGroupProps) {
  const groupId = useId();
  const items = allLabel === null ? options : [{ value: ALL, label: allLabel }, ...options];

  return (
    <RadioGroup.Root
      aria-label={label}
      value={value ?? ALL}
      onValueChange={(next) => onChange(next === ALL ? null : next)}
      className="flex flex-col gap-1"
    >
      {items.map((option) => {
        const id = `${groupId}-${option.value}`;
        const checked = (value ?? ALL) === option.value;
        return (
          <label
            key={option.value}
            htmlFor={id}
            className={cn(
              "flex cursor-pointer items-center gap-3 py-1.5 text-sm text-foreground transition-colors duration-300 hover:text-primary",
              checked && "text-primary",
            )}
          >
            <RadioGroup.Item
              id={id}
              value={option.value}
              className="flex size-4 shrink-0 items-center justify-center rounded-full border border-border outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 data-[state=checked]:border-primary"
            >
              <RadioGroup.Indicator className="size-2 rounded-full bg-primary" />
            </RadioGroup.Item>
            {option.label}
          </label>
        );
      })}
    </RadioGroup.Root>
  );
}
