"use client";

import { ChevronDown } from "lucide-react";
import { Select } from "radix-ui";
import { useEffect } from "react";

import { CURRENCIES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useCurrencyStore } from "@/store/currency-store";
import type { CurrencyCode } from "@/types/catalog";

type CurrencySwitcherProps = {
  className?: string;
};

export function CurrencySwitcher({ className }: CurrencySwitcherProps) {
  const currency = useCurrencyStore((state) => state.currency);
  const setCurrency = useCurrencyStore((state) => state.setCurrency);

  useEffect(() => {
    void useCurrencyStore.persist.rehydrate();
  }, []);

  return (
    <Select.Root value={currency} onValueChange={(value) => setCurrency(value as CurrencyCode)}>
      <Select.Trigger
        aria-label="Select currency"
        className={cn(
          "inline-flex items-center gap-1.5 text-xs tracking-label text-foreground uppercase hover:text-primary",
          className,
        )}
      >
        <Select.Value />
        <Select.Icon>
          <ChevronDown aria-hidden="true" className="size-3" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          position="popper"
          sideOffset={8}
          className="z-50 min-w-28 border border-border bg-background py-1 shadow-sm"
        >
          <Select.Viewport>
            {CURRENCIES.map((option) => (
              <Select.Item
                key={option.code}
                value={option.code}
                className="cursor-pointer px-4 py-2 text-xs tracking-label uppercase outline-none data-highlighted:bg-surface data-[state=checked]:text-primary"
              >
                <Select.ItemText>
                  {option.label} {option.symbol}
                </Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
