"use client";

import { Plus, Trash2 } from "lucide-react";
import { useFieldArray, type UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/FormField";
import type { ProductValues } from "@/lib/validations/admin";

/** Free-form specs shown on the product page, e.g. "Band width → 2 mm". */
export function ProductDimensionsSection({ form }: { form: UseFormReturn<ProductValues> }) {
  const { fields, append, remove } = useFieldArray({ control: form.control, name: "dimensions" });

  return (
    <div className="space-y-3">
      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-3">
          <Input
            aria-label="Spec name"
            placeholder="e.g. Band width"
            className="h-11 py-2"
            {...form.register(`dimensions.${index}.key`)}
          />
          <Input
            aria-label="Spec value"
            placeholder="e.g. 2 mm"
            className="h-11 py-2"
            {...form.register(`dimensions.${index}.value`)}
          />
          <Button
            type="button"
            variant="link"
            size="icon"
            aria-label="Remove spec"
            className="shrink-0 text-danger"
            onClick={() => remove(index)}
          >
            <Trash2 aria-hidden="true" className="size-4" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => append({ key: "", value: "" })}
      >
        <Plus aria-hidden="true" className="size-4" /> Add spec
      </Button>
    </div>
  );
}
