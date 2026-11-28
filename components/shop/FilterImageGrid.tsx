"use client";

import Image from "next/image";
import { RadioGroup } from "radix-ui";

import { ALL, type FilterOption } from "@/components/shop/FilterSelect";
import { isOptimizedImage } from "@/lib/images";

type FilterImageGridProps = {
  label: string;
  value: string | null;
  options: FilterOption[];
  onChange: (value: string | null) => void;
};

/**
 * Single-choice filter shown as a grid of photo tiles (e.g. stone shapes) in the side panel.
 * Clicking the selected tile again clears the filter.
 */
export function FilterImageGrid({ label, value, options, onChange }: FilterImageGridProps) {
  return (
    <RadioGroup.Root
      aria-label={label}
      value={value ?? ALL}
      onValueChange={onChange}
      className="grid grid-cols-3 gap-1"
    >
      {options.map((option) => (
        <RadioGroup.Item
          key={option.value}
          value={option.value}
          onClick={() => option.value === value && onChange(null)}
          className="group flex flex-col items-center gap-1.5 border border-transparent px-0.5 py-2 text-center transition-colors duration-300 outline-none hover:border-border focus-visible:ring-2 focus-visible:ring-primary data-[state=checked]:border-primary"
        >
          <span className="relative size-11">
            {option.image && (
              <Image
                src={option.image}
                alt=""
                fill
                sizes="44px"
                unoptimized={!isOptimizedImage(option.image)}
                className="object-contain transition-transform duration-300 group-hover:scale-105"
              />
            )}
          </span>
          <span className="text-[11px] leading-tight text-foreground group-data-[state=checked]:text-primary">
            {option.label}
          </span>
        </RadioGroup.Item>
      ))}
    </RadioGroup.Root>
  );
}
