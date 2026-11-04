import { create } from "zustand";
import { persist } from "zustand/middleware";

import { DEFAULT_CURRENCY } from "@/lib/constants";
import type { CurrencyCode } from "@/types/catalog";

type CurrencyState = {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
};

/**
 * Selected display currency.
 * Phase 3: the initial value will come from the Geo-IP cookie set in `proxy.ts`.
 */
export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set) => ({
      currency: DEFAULT_CURRENCY,
      setCurrency: (currency) => set({ currency }),
    }),
    // skipHydration avoids server/client mismatch; rehydrated in CurrencySwitcher.
    { name: "efj-currency", skipHydration: true },
  ),
);
