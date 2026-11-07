"use client";

import { Controller, type UseFormReturn } from "react-hook-form";

import { AdminSelect } from "@/components/admin/AdminSelect";
import { FormField, Input, Textarea } from "@/components/ui/FormField";
import { GENDERS, PRODUCT_STATUSES, PRODUCT_TYPES, type Lookups } from "@/lib/api/admin-schemas";
import type { ProductValues } from "@/lib/validations/admin";

const label = (v: string) => v.charAt(0) + v.slice(1).toLowerCase().replace("_", " ");
const options = (values: readonly string[]) => values.map((v) => ({ value: v, label: label(v) }));

type Props = { form: UseFormReturn<ProductValues>; lookups: Lookups };

/** Name, SKU, category, status, labour and weight. */
export function ProductBasicsSection({ form, lookups }: Props) {
  const {
    register,
    control,
    formState: { errors },
  } = form;
  const field = (name: keyof ProductValues) => ({
    "aria-invalid": !!errors[name],
    "aria-describedby": errors[name] ? `p-${name}-error` : undefined,
  });

  return (
    <div className="grid gap-5 md:grid-cols-2">
      <FormField id="p-name" label="Product name" error={errors.name?.message}>
        <Input id="p-name" {...field("name")} {...register("name")} />
      </FormField>
      <FormField id="p-sku" label="SKU" error={errors.sku?.message}>
        <Input id="p-sku" placeholder="EFJ-R-1001" {...field("sku")} {...register("sku")} />
      </FormField>
      <FormField id="p-slug" label="URL slug" optional error={errors.slug?.message}>
        <Input id="p-slug" placeholder="Generated from the name" {...register("slug")} />
      </FormField>
      <FormField id="p-categoryId" label="Category" error={errors.categoryId?.message}>
        <Controller
          control={control}
          name="categoryId"
          render={({ field: f }) => (
            <AdminSelect
              id="p-categoryId"
              value={f.value}
              onChange={f.onChange}
              invalid={!!errors.categoryId}
              options={lookups.categories.map((c) => ({ value: c.id, label: c.name }))}
            />
          )}
        />
      </FormField>
      <FormField id="p-collectionId" label="Collection" optional>
        <Controller
          control={control}
          name="collectionId"
          render={({ field: f }) => (
            <AdminSelect
              id="p-collectionId"
              value={f.value}
              onChange={f.onChange}
              emptyLabel="No collection"
              options={lookups.collections.map((c) => ({ value: c.id, label: c.name }))}
            />
          )}
        />
      </FormField>
      {(["type", "gender", "status"] as const).map((name) => (
        <FormField key={name} id={`p-${name}`} label={label(name)}>
          <Controller
            control={control}
            name={name}
            render={({ field: f }) => (
              <AdminSelect
                id={`p-${name}`}
                value={f.value}
                onChange={f.onChange}
                options={options(
                  name === "type" ? PRODUCT_TYPES : name === "gender" ? GENDERS : PRODUCT_STATUSES,
                )}
              />
            )}
          />
        </FormField>
      ))}
      <FormField
        id="p-labourRupees"
        label="Labour / making charge (₹)"
        error={errors.labourRupees?.message}
      >
        <Input
          id="p-labourRupees"
          type="number"
          step="0.01"
          min={0}
          {...field("labourRupees")}
          {...register("labourRupees", { valueAsNumber: true })}
        />
      </FormField>
      <FormField
        id="p-metalWeightG"
        label="Metal weight (grams)"
        error={errors.metalWeightG?.message}
      >
        <Input
          id="p-metalWeightG"
          type="number"
          step="0.001"
          min={0}
          {...field("metalWeightG")}
          {...register("metalWeightG", { valueAsNumber: true })}
        />
      </FormField>
      <div className="md:col-span-2">
        <FormField
          id="p-description"
          label="Description"
          optional
          error={errors.description?.message}
        >
          <Textarea id="p-description" {...register("description")} />
        </FormField>
      </div>
      <fieldset className="flex flex-wrap gap-x-6 gap-y-3 md:col-span-2">
        <legend className="sr-only">Flags</legend>
        {(
          [
            ["isCustomizable", "Customisable"],
            ["hasRingSize", "Has ring size"],
            ["isFeatured", "Featured on home"],
            ["isBestSeller", "Best seller"],
          ] as const
        ).map(([name, text]) => (
          <label key={name} className="flex items-center gap-2 text-sm">
            <input type="checkbox" className="size-4 accent-primary" {...register(name)} />
            {text}
          </label>
        ))}
      </fieldset>
    </div>
  );
}
