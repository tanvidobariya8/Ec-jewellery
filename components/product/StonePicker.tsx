"use client";

import { OptionGroup } from "@/components/product/OptionGroup";
import type { StoneOption } from "@/lib/api/schemas";
import { STONE_TYPES } from "@/lib/constants";

type StonePickerProps = {
  options: StoneOption[];
  selected: StoneOption;
  onChange: (id: string) => void;
};

const typeName = (code: string) => STONE_TYPES.find((t) => t.code === code)?.name ?? code;

/** Centre stones show the carat ("1.5"); side-stone sets show count × carat ("10×0.02"). */
const sizeLabel = (option: StoneOption) =>
  option.isCenter ? String(option.carat) : `${option.stoneCount}×${option.carat}`;

/**
 * "Stone: Lab-Grown Diamond" tabs (one per stone type), then round carat chips for that type.
 * Switching type picks that type's default option (or its first).
 */
export function StonePicker({ options: allOptions, selected, onChange }: StonePickerProps) {
  // Side-stone sets (e.g. 18 × 0.01 ct pavé) are part of the design, not a choice, when the
  // product has centre stones to pick from.
  const centre = allOptions.filter((o) => o.isCenter);
  const options = centre.length > 0 ? centre : allOptions;
  const types = [...new Set(options.map((o) => o.stoneType.code))];
  const type = selected.stoneType.code;
  const sizes = options.filter((o) => o.stoneType.code === type);
  const stoneWord = type === "LAB_DIAMOND" ? "Diamond" : typeName(type);

  const pickType = (next: string) => {
    const ofType = options.filter((o) => o.stoneType.code === next);
    const match =
      ofType.find((o) => o.carat === selected.carat) ??
      ofType.find((o) => o.isDefault) ??
      ofType[0];
    if (match) onChange(match.id);
  };

  return (
    <div className="space-y-5">
      <OptionGroup
        label="Stone"
        selectedLabel={[typeName(type), selected.stoneType.grade].filter(Boolean).join(" · ")}
        value={type}
        options={types.map((t) => ({ value: t, label: typeName(t) }))}
        onChange={pickType}
      />
      <OptionGroup
        label={`Select ${stoneWord} Size (ct)`}
        variant="round"
        value={selected.id}
        options={sizes.map((o) => ({
          value: o.id,
          label: sizeLabel(o),
          name: `${sizeLabel(o)} ct ${typeName(type)}`,
        }))}
        onChange={onChange}
      />
    </div>
  );
}
