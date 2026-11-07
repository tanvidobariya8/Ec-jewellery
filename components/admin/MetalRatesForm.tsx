"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/FormField";
import { adminMessage, updateMetal, updateMetalRates } from "@/lib/api/admin";
import type { AdminMetal } from "@/lib/api/admin-schemas";
import { paiseToRupees, rupeesToPaise } from "@/lib/currency";

type Values = { rates: { metalId: string; rupees: number }[] };

export const METALS_KEY = ["admin", "metals"];

/** Today's rate per gram for every metal, saved in one go. */
export function MetalRatesForm({ metals }: { metals: AdminMetal[] }) {
  const queryClient = useQueryClient();
  const { register, control, handleSubmit, formState } = useForm<Values>({
    defaultValues: {
      rates: metals.map((m) => ({ metalId: m.id, rupees: paiseToRupees(m.pricePerGramPaise) })),
    },
  });
  const { fields } = useFieldArray({ control, name: "rates" });

  const onSubmit = async ({ rates }: Values) => {
    const changed = rates
      .map((r) => ({ metalId: r.metalId, pricePerGramPaise: rupeesToPaise(r.rupees) }))
      .filter(
        (r) => metals.find((m) => m.id === r.metalId)?.pricePerGramPaise !== r.pricePerGramPaise,
      );
    if (!changed.length) {
      toast.info("No rate changed");
      return;
    }
    if (changed.some((r) => !Number.isFinite(r.pricePerGramPaise) || r.pricePerGramPaise <= 0)) {
      toast.error("Every rate must be a number above 0");
      return;
    }
    try {
      const updated = await updateMetalRates(changed);
      queryClient.setQueryData(METALS_KEY, updated);
      toast.success(`Saved ${changed.length} rate${changed.length > 1 ? "s" : ""}`);
    } catch (error) {
      toast.error(adminMessage(error));
    }
  };

  const toggle = useMutation({
    mutationFn: (m: AdminMetal) => updateMetal(m.id, { active: !m.active }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: METALS_KEY }),
    onError: (error) => toast.error(adminMessage(error)),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="overflow-x-auto border border-border">
        <table className="w-full min-w-xl text-left text-sm">
          <thead className="bg-surface text-xs tracking-label uppercase">
            <tr>
              <th className="px-4 py-3 font-medium">Metal</th>
              <th className="px-4 py-3 font-medium">Purity</th>
              <th className="px-4 py-3 font-medium">Rate ₹ / gram</th>
              <th className="px-4 py-3 font-medium">Products</th>
              <th className="px-4 py-3 font-medium">In shop</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field, index) => {
              const metal = metals[index]!;
              return (
                <tr key={field.id} className="border-t border-border">
                  <td className="px-4 py-2">
                    <p className="font-medium">{metal.name}</p>
                    <p className="text-xs text-muted">{metal.code}</p>
                  </td>
                  <td className="px-4 py-2">{(metal.purity * 100).toFixed(1)}%</td>
                  <td className="px-4 py-2">
                    <Input
                      type="number"
                      step="0.01"
                      min={0}
                      aria-label={`${metal.name} rate per gram in rupees`}
                      className="h-10 max-w-40 py-2"
                      {...register(`rates.${index}.rupees`, { valueAsNumber: true })}
                    />
                  </td>
                  <td className="px-4 py-2">{metal.productCount}</td>
                  <td className="px-4 py-2">
                    <input
                      type="checkbox"
                      className="size-4 accent-primary"
                      aria-label={`Show ${metal.name} in shop`}
                      checked={metal.active}
                      disabled={toggle.isPending}
                      onChange={() => toggle.mutate(metal)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Button type="submit" className="mt-6" disabled={formState.isSubmitting}>
        {formState.isSubmitting ? "Saving…" : "Save rates"}
      </Button>
    </form>
  );
}
