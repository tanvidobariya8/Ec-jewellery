"use client";

import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { useQueryStates } from "nuqs";

import { MetalPicker } from "@/components/product/MetalPicker";
import { StonePicker } from "@/components/product/StonePicker";
import { FilterSelect } from "@/components/shop/FilterSelect";
import { Button } from "@/components/ui/Button";
import type { ProductDetail, StoneOption } from "@/lib/api/schemas";
import { RING_SIZES, STONE_LABELS, whatsappLink } from "@/lib/constants";
import { formatPrice } from "@/lib/currency";
import { productSearchParams } from "@/lib/search-params/product";

type ProductConfiguratorProps = {
  product: Pick<ProductDetail, "name" | "metals" | "stoneOptions" | "hasRingSize" | "prices">;
};

const SIZE_OPTIONS = RING_SIZES.map((size) => ({ value: String(size), label: `US ${size}` }));

const stoneLabel = (option: StoneOption) =>
  option.isCenter
    ? `${STONE_LABELS[option.stoneType.code]} · ${option.carat} ct`
    : `${STONE_LABELS[option.stoneType.code]} · ${option.stoneCount} × ${option.carat} ct`;

/**
 * Price, metal (family tabs + karat swatches), stone (type tabs + carat sizes) and ring size.
 * Selections live in the URL; the price is looked up in the BE price table (`product.prices`).
 */
export function ProductConfigurator({ product }: ProductConfiguratorProps) {
  const [selection, setSelection] = useQueryStates(productSearchParams, {
    history: "replace",
    scroll: false,
  });

  const defaultStone =
    product.stoneOptions.find((option) => option.isDefault) ?? product.stoneOptions[0];
  const metal = product.metals.find((m) => m.code === selection.metal) ?? product.metals[0] ?? null;
  const stone =
    product.stoneOptions.find((option) => option.id === selection.stone) ?? defaultStone ?? null;
  const size = product.hasRingSize ? selection.size : null;

  const summary = [
    metal?.name,
    stone && stoneLabel(stone),
    size !== null && `ring size US ${size}`,
  ].filter(Boolean);

  // Prices come from the BE per metal × centre stone; side stones are always included.
  const centreId = stone?.isCenter ? stone.id : null;
  const price =
    product.prices.find((p) => p.metal === metal?.code && p.stone === centreId)?.priceInr ?? null;

  const enquiry = `Hello, I'm interested in the ${product.name}${
    summary.length ? ` (${summary.join(", ")})` : ""
  }${price !== null ? `, listed at ${formatPrice(price, "INR")}. Could you help me order it?` : ". Could you share the price?"}`;

  return (
    <div className="space-y-7">
      <div aria-live="polite">
        {price !== null ? (
          <>
            <p className="text-2xl font-medium text-primary">{formatPrice(price, "INR")}</p>
            <p className="mt-1 text-xs text-muted">For the selected metal and stone, excl. GST.</p>
          </>
        ) : (
          <>
            <p className="font-serif text-2xl text-primary">Price on request</p>
            <p className="mt-1 text-xs text-muted">Message us for a quote on this design.</p>
          </>
        )}
      </div>

      {metal && (
        <MetalPicker
          metals={product.metals}
          selected={metal}
          onChange={(code) => void setSelection({ metal: code })}
        />
      )}

      {stone && (
        <StonePicker
          options={product.stoneOptions}
          selected={stone}
          onChange={(id) => void setSelection({ stone: id })}
        />
      )}

      {product.hasRingSize && (
        <div>
          <div className="mb-3 flex items-center justify-between gap-4">
            <p className="text-sm font-medium">Select Ring Size (US):</p>
            <Link
              href="/ring-size"
              className="text-xs font-medium tracking-wide text-primary uppercase underline underline-offset-4"
            >
              Find ring size
            </Link>
          </div>
          <FilterSelect
            label="Size"
            value={size !== null ? String(size) : null}
            options={SIZE_OPTIONS}
            allLabel="Select"
            onChange={(value) => void setSelection({ size: value ? Number(value) : null })}
          />
        </div>
      )}

      <Button asChild size="lg" className="w-full">
        <a href={whatsappLink(enquiry)} target="_blank" rel="noopener noreferrer">
          <MessageCircle aria-hidden="true" className="size-4" />
          {price !== null ? "Order on WhatsApp" : "Ask for a quote on WhatsApp"}
        </a>
      </Button>
    </div>
  );
}
