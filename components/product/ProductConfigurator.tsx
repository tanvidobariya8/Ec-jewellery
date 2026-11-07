"use client";

import { MessageCircle } from "lucide-react";
import { useQueryStates } from "nuqs";

import { OptionGroup } from "@/components/product/OptionGroup";
import { FilterSelect } from "@/components/shop/FilterSelect";
import { Button } from "@/components/ui/Button";
import type { ProductDetail, StoneOption } from "@/lib/api/schemas";
import { RING_SIZES, STONE_LABELS, whatsappLink } from "@/lib/constants";
import { productSearchParams } from "@/lib/search-params/product";

type ProductConfiguratorProps = {
  product: Pick<ProductDetail, "name" | "metals" | "stoneOptions" | "hasRingSize">;
};

const SIZE_OPTIONS = RING_SIZES.map((size) => ({ value: String(size), label: `US ${size}` }));

const stoneLabel = (option: StoneOption) =>
  option.isCenter
    ? `${STONE_LABELS[option.stoneType.code]} · ${option.carat} ct`
    : `${STONE_LABELS[option.stoneType.code]} · ${option.stoneCount} × ${option.carat} ct`;

/**
 * Metal / stone / ring-size selectors. Selections live in the URL.
 * Phase 3: call BE POST /pricing/quote with this config and show the live price.
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

  const enquiry = `Hello, I'm interested in the ${product.name}${
    summary.length ? ` (${summary.join(", ")})` : ""
  }. Could you share the price?`;

  return (
    <div className="space-y-8">
      {product.metals.length > 0 && (
        <OptionGroup
          label="Metal"
          value={metal?.code ?? null}
          selectedLabel={metal?.name}
          options={product.metals.map((m) => ({ value: m.code, label: m.code.replace("_", " ") }))}
          onChange={(code) => void setSelection({ metal: code })}
        />
      )}

      {product.stoneOptions.length > 0 && (
        <OptionGroup
          label="Stone"
          value={stone?.id ?? null}
          selectedLabel={stone?.stoneType.grade ?? undefined}
          options={product.stoneOptions.map((option) => ({
            value: option.id,
            label: stoneLabel(option),
          }))}
          onChange={(id) => void setSelection({ stone: id })}
        />
      )}

      {product.hasRingSize && (
        <div>
          <p className="mb-3 text-xs tracking-label uppercase">Ring size</p>
          <FilterSelect
            label="Size"
            value={size !== null ? String(size) : null}
            options={SIZE_OPTIONS}
            allLabel="Select"
            onChange={(value) => void setSelection({ size: value ? Number(value) : null })}
          />
        </div>
      )}

      <div className="border-t border-border pt-6">
        <p className="text-xs tracking-label text-muted uppercase">Price</p>
        <p className="mt-1 font-serif text-2xl">Price on request</p>
        <p className="mt-2 text-sm text-muted">
          Live pricing for your exact configuration is coming soon. Message us for a quote today.
        </p>
        <Button asChild size="lg" className="mt-5 w-full sm:w-auto">
          <a href={whatsappLink(enquiry)} target="_blank" rel="noopener noreferrer">
            <MessageCircle aria-hidden="true" className="size-4" />
            Ask for a quote on WhatsApp
          </a>
        </Button>
      </div>
    </div>
  );
}
