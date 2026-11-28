"use client";

import { cva } from "class-variance-authority";
import { RadioGroup } from "radix-ui";

import { cn } from "@/lib/utils";

export type MetalColour = "yellow" | "white" | "rose";

export type OptionGroupItem = {
  value: string;
  label: string;
  /** Full name for screen readers when `label` is short (e.g. "10K" → "10K Rose Gold"). */
  name?: string;
  /** Metal colour: fills a round chip with that metal's gradient. */
  swatch?: MetalColour;
};

const itemVariants = cva(
  "transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none",
  {
    variants: {
      variant: {
        /** Rectangular tab: GOLD / PLATINUM, Lab-Grown Diamond / Moissanite. */
        tab: "h-11 min-w-24 border border-border px-5 text-sm tracking-wide uppercase hover:border-primary data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
        /** Small circle: karat swatches, carat sizes. */
        round:
          "flex size-11 items-center justify-center rounded-full border border-transparent bg-surface text-xs text-foreground hover:border-primary data-[state=checked]:border-primary data-[state=checked]:ring-1 data-[state=checked]:ring-primary data-[state=checked]:ring-offset-2",
      },
    },
  },
);

const SWATCH_CLASS: Record<MetalColour, string> = {
  yellow: "bg-linear-135 from-metal-yellow to-metal-yellow-dark",
  white: "bg-linear-135 from-metal-white to-metal-white-dark",
  rose: "bg-linear-135 from-metal-rose to-metal-rose-dark",
};

type OptionGroupProps = {
  label: string;
  value: string | null;
  options: OptionGroupItem[];
  onChange: (value: string) => void;
  /** Shown after the label, e.g. "Metal: 10K White Gold". */
  selectedLabel?: string;
  variant?: "tab" | "round";
  /** Hide the label visually (when a parent heading already names the group). */
  hideLabel?: boolean;
};

/** Accessible single-choice options (Radix RadioGroup) for the product configurator. */
export function OptionGroup({
  label,
  value,
  options,
  onChange,
  selectedLabel,
  variant = "tab",
  hideLabel = false,
}: OptionGroupProps) {
  return (
    <fieldset>
      <legend className={cn("text-sm font-medium text-foreground", hideLabel && "sr-only")}>
        {label}:{selectedLabel && <span className="ml-1.5 font-normal">{selectedLabel}</span>}
      </legend>
      <RadioGroup.Root
        value={value ?? ""}
        onValueChange={onChange}
        aria-label={label}
        className={cn("flex flex-wrap gap-2.5", !hideLabel && "mt-3")}
      >
        {options.map((option) => (
          <RadioGroup.Item
            key={option.value}
            value={option.value}
            aria-label={option.name ?? option.label}
            title={option.name}
            className={cn(itemVariants({ variant }), option.swatch && SWATCH_CLASS[option.swatch])}
          >
            {option.label}
          </RadioGroup.Item>
        ))}
      </RadioGroup.Root>
    </fieldset>
  );
}
