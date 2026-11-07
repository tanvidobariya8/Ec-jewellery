"use client";

import { RadioGroup } from "radix-ui";

import { cn } from "@/lib/utils";

export type OptionGroupItem = { value: string; label: string };

type OptionGroupProps = {
  label: string;
  value: string | null;
  options: OptionGroupItem[];
  onChange: (value: string) => void;
  /** Shown next to the label, e.g. the selected metal's full name. */
  selectedLabel?: string;
};

/** Accessible single-choice chips (Radix RadioGroup) for the product configurator. */
export function OptionGroup({ label, value, options, onChange, selectedLabel }: OptionGroupProps) {
  return (
    <fieldset>
      <legend className="text-xs tracking-label uppercase">
        {label}
        {selectedLabel && <span className="ml-2 text-muted normal-case">{selectedLabel}</span>}
      </legend>
      <RadioGroup.Root
        value={value ?? ""}
        onValueChange={onChange}
        aria-label={label}
        className="mt-3 flex flex-wrap gap-2"
      >
        {options.map((option) => (
          <RadioGroup.Item
            key={option.value}
            value={option.value}
            className={cn(
              "h-10 min-w-12 border border-border px-3 text-xs tracking-wide transition-colors duration-300 hover:border-primary",
              "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none",
              "data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
            )}
          >
            {option.label}
          </RadioGroup.Item>
        ))}
      </RadioGroup.Root>
    </fieldset>
  );
}
