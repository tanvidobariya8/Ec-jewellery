"use client";

import { Plus, Trash2 } from "lucide-react";
import { Controller, useFieldArray, type UseFormReturn } from "react-hook-form";

import { AdminSelect } from "@/components/admin/AdminSelect";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/FormField";
import type { Lookups } from "@/lib/api/admin-schemas";
import type { ProductValues } from "@/lib/validations/admin";

type Props = { form: UseFormReturn<ProductValues>; lookups: Lookups };

/** Stone options the customer can choose (type × carat), plus side stones. */
export function ProductStonesSection({ form, lookups }: Props) {
  const { control, register, formState } = form;
  const { fields, append, remove } = useFieldArray({ control, name: "stones" });
  const errors = formState.errors.stones;

  return (
    <div className="space-y-3">
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="grid grid-cols-2 items-end gap-3 border border-border p-3 sm:grid-cols-[2fr_1fr_1fr_auto_auto_auto]"
        >
          <div className="col-span-2 space-y-1 sm:col-span-1">
            <span className="text-xs text-muted">Stone</span>
            <Controller
              control={control}
              name={`stones.${index}.stoneTypeId`}
              render={({ field: f }) => (
                <AdminSelect
                  aria-label="Stone type"
                  value={f.value}
                  onChange={f.onChange}
                  invalid={!!errors?.[index]?.stoneTypeId}
                  options={lookups.stoneTypes.map((s) => ({ value: s.id, label: s.name }))}
                />
              )}
            />
          </div>
          <label className="space-y-1 text-xs text-muted">
            Carat
            <Input
              type="number"
              step="0.001"
              aria-invalid={!!errors?.[index]?.carat}
              className="h-11 py-2"
              {...register(`stones.${index}.carat`, { valueAsNumber: true })}
            />
          </label>
          <label className="space-y-1 text-xs text-muted">
            Count
            <Input
              type="number"
              min={1}
              className="h-11 py-2"
              {...register(`stones.${index}.stoneCount`, { valueAsNumber: true })}
            />
          </label>
          <label className="flex h-11 items-center gap-2 text-sm">
            <input
              type="checkbox"
              className="size-4 accent-primary"
              {...register(`stones.${index}.isCenter`)}
            />
            Center
          </label>
          <label className="flex h-11 items-center gap-2 text-sm">
            <input
              type="checkbox"
              className="size-4 accent-primary"
              {...register(`stones.${index}.isDefault`)}
            />
            Default
          </label>
          <Button
            type="button"
            variant="link"
            size="icon"
            aria-label="Remove stone option"
            className="text-danger"
            onClick={() => remove(index)}
          >
            <Trash2 aria-hidden="true" className="size-4" />
          </Button>
        </div>
      ))}
      {!fields.length && <p className="text-sm text-muted">No stone options yet.</p>}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() =>
          append({
            stoneTypeId: lookups.stoneTypes[0]?.id ?? "",
            carat: 1,
            stoneCount: 1,
            isCenter: true,
            isDefault: fields.length === 0,
          })
        }
      >
        <Plus aria-hidden="true" className="size-4" /> Add stone option
      </Button>
    </div>
  );
}
