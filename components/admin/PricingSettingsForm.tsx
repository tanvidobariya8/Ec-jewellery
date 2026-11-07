"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/Button";
import { FormField, Input } from "@/components/ui/FormField";
import { adminMessage, updatePricingSetting } from "@/lib/api/admin";
import type { PricingSetting } from "@/lib/api/admin-schemas";

const n = () => z.number({ error: "Enter a number" });
const schema = z.object({
  margin_percent: n().min(0).max(500),
  gst_percent: n().min(0).max(100),
  roundToInr: n().int().min(1).max(10_000),
  baseSize: n().min(3).max(14),
  weightPercentPerSize: n().min(0).max(50),
});
type Values = z.infer<typeof schema>;

export const SETTINGS_KEY = ["admin", "pricing-settings"];

/** Reads a stored setting; seed values are used as fallbacks. */
function toValues(settings: PricingSetting[]): Values {
  const get = (key: string) => settings.find((s) => s.key === key)?.value;
  const num = (v: unknown, fallback: number) => (typeof v === "number" ? v : fallback);
  const obj = (v: unknown) => (v && typeof v === "object" ? (v as Record<string, unknown>) : {});
  return {
    margin_percent: num(get("margin_percent"), 40),
    gst_percent: num(get("gst_percent"), 3),
    roundToInr: num(obj(get("rounding")).toNearestInr, 100),
    baseSize: num(obj(get("size_surcharge_rules")).baseSize, 6),
    weightPercentPerSize: num(obj(get("size_surcharge_rules")).weightPercentPerSize, 2.5),
  };
}

const FIELDS: { name: keyof Values; label: string; hint: string; step: string }[] = [
  {
    name: "margin_percent",
    label: "Margin %",
    hint: "Added on top of metal + stones + labour",
    step: "0.1",
  },
  { name: "gst_percent", label: "GST %", hint: "Tax for Indian orders", step: "0.1" },
  { name: "roundToInr", label: "Round prices to ₹", hint: "e.g. 100 → ₹45,300", step: "1" },
  {
    name: "baseSize",
    label: "Base ring size (US)",
    hint: "Metal weight is for this size",
    step: "0.25",
  },
  {
    name: "weightPercentPerSize",
    label: "Extra metal % per size",
    hint: "Added per size above base",
    step: "0.1",
  },
];

export function PricingSettingsForm({ settings }: { settings: PricingSetting[] }) {
  const queryClient = useQueryClient();
  const initial = toValues(settings);
  const { register, handleSubmit, formState } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: initial,
  });
  const { errors, isSubmitting } = formState;

  const onSubmit = async (v: Values) => {
    const updates: [string, unknown][] = [];
    if (v.margin_percent !== initial.margin_percent)
      updates.push(["margin_percent", v.margin_percent]);
    if (v.gst_percent !== initial.gst_percent) updates.push(["gst_percent", v.gst_percent]);
    if (v.roundToInr !== initial.roundToInr)
      updates.push(["rounding", { toNearestInr: v.roundToInr }]);
    if (
      v.baseSize !== initial.baseSize ||
      v.weightPercentPerSize !== initial.weightPercentPerSize
    ) {
      updates.push([
        "size_surcharge_rules",
        { baseSize: v.baseSize, weightPercentPerSize: v.weightPercentPerSize },
      ]);
    }
    if (!updates.length) return void toast.info("Nothing changed");
    try {
      for (const [key, value] of updates) await updatePricingSetting(key, value);
      await queryClient.invalidateQueries({ queryKey: SETTINGS_KEY });
      toast.success("Pricing settings saved");
    } catch (error) {
      toast.error(adminMessage(error));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {FIELDS.map((f) => (
          <FormField
            key={f.name}
            id={`ps-${f.name}`}
            label={f.label}
            error={errors[f.name]?.message}
          >
            <Input
              id={`ps-${f.name}`}
              type="number"
              step={f.step}
              aria-invalid={!!errors[f.name]}
              {...register(f.name, { valueAsNumber: true })}
            />
            <p className="text-xs text-muted">{f.hint}</p>
          </FormField>
        ))}
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving…" : "Save settings"}
      </Button>
    </form>
  );
}
