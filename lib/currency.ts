import type { CurrencyCode } from "@/types/catalog";

const LOCALES: Record<CurrencyCode, string> = {
  INR: "en-IN",
  EUR: "de-DE",
  USD: "en-US",
  GBP: "en-GB",
};

/**
 * Format an amount for display. Prices always come from the backend in INR;
 * pass the converted amount and the target currency here.
 */
export function formatPrice(amount: number, currency: CurrencyCode) {
  return new Intl.NumberFormat(LOCALES[currency], {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Convert an INR amount using a rate expressed as 1 INR = `rate` target currency. */
export function convertFromInr(amountInr: number, rate: number) {
  return amountInr * rate;
}
