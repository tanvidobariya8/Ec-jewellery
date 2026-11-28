"use client";

import { OptionGroup, type MetalColour } from "@/components/product/OptionGroup";
import type { ProductDetail } from "@/lib/api/schemas";

type Metal = ProductDetail["metals"][number];

type MetalPickerProps = {
  metals: Metal[];
  selected: Metal;
  onChange: (code: string) => void;
};

const COLOURS: MetalColour[] = ["yellow", "white", "rose"];
const swatchOf = (metal: Metal): MetalColour =>
  COLOURS.find((c) => c === metal.colour.toLowerCase()) ?? "white";

/** Gold has a karat; the others are named by code (PT950 → Platinum, AG925 → Silver). */
const familyOf = (metal: Metal) =>
  metal.karat !== null ? "Gold" : metal.code.startsWith("PT") ? "Platinum" : "Silver";

/** Tab order: SILVER · GOLD · PLATINUM. */
const FAMILY_ORDER = ["Silver", "Gold", "Platinum"];

/**
 * "Metal: 14K Rose Gold", then family tabs (GOLD / PLATINUM) and round karat swatches for the
 * selected family. Picking a family keeps the same colour/karat when it exists there.
 */
export function MetalPicker({ metals, selected, onChange }: MetalPickerProps) {
  const families = [...new Set(metals.map(familyOf))].sort(
    (a, b) => FAMILY_ORDER.indexOf(a) - FAMILY_ORDER.indexOf(b),
  );
  const family = familyOf(selected);
  const inFamily = metals.filter((m) => familyOf(m) === family);

  const pickFamily = (next: string) => {
    const options = metals.filter((m) => familyOf(m) === next);
    const match =
      options.find((m) => m.colour === selected.colour && m.karat === selected.karat) ??
      options.find((m) => m.colour === selected.colour) ??
      options[0];
    if (match) onChange(match.code);
  };

  return (
    <div className="space-y-4">
      {families.length > 1 ? (
        <OptionGroup
          label="Metal"
          selectedLabel={selected.name}
          value={family}
          options={families.map((f) => ({ value: f, label: f }))}
          onChange={pickFamily}
        />
      ) : (
        <p className="text-sm font-medium">
          Metal:<span className="ml-1.5 font-normal">{selected.name}</span>
        </p>
      )}
      {inFamily.length > 1 && (
        <OptionGroup
          label={`${family} karat and colour`}
          hideLabel
          variant="round"
          value={selected.code}
          options={inFamily.map((m) => ({
            value: m.code,
            label: m.karat !== null ? `${m.karat}K` : m.code,
            name: m.name,
            swatch: swatchOf(m),
          }))}
          onChange={onChange}
        />
      )}
    </div>
  );
}
