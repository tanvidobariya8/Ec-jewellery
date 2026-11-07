"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { AdminSelect } from "@/components/admin/AdminSelect";
import { Button } from "@/components/ui/Button";
import { FormField, Input } from "@/components/ui/FormField";
import { CERTIFICATES, type Lookups, type StonePrice } from "@/lib/api/admin-schemas";
import {
  stonePriceDefaults,
  stonePriceFormSchema,
  type StonePriceValues,
} from "@/lib/validations/admin";

type StonePriceFormProps = {
  price?: StonePrice;
  lookups: Lookups;
  onSubmit: (values: StonePriceValues) => Promise<void>;
};

export function StonePriceForm({ price, lookups, onSubmit }: StonePriceFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<StonePriceValues>({
    resolver: zodResolver(stonePriceFormSchema),
    defaultValues: stonePriceDefaults(price),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <FormField id="sp-stone" label="Stone" error={errors.stoneTypeId?.message}>
        <Controller
          control={control}
          name="stoneTypeId"
          render={({ field }) => (
            <AdminSelect
              id="sp-stone"
              value={field.value}
              onChange={field.onChange}
              invalid={!!errors.stoneTypeId}
              options={lookups.stoneTypes.map((s) => ({
                value: s.id,
                label: s.grade ? `${s.name} (${s.grade})` : s.name,
              }))}
            />
          )}
        />
      </FormField>
      <FormField id="sp-shape" label="Shape" optional>
        <Controller
          control={control}
          name="shapeId"
          render={({ field }) => (
            <AdminSelect
              id="sp-shape"
              value={field.value}
              onChange={field.onChange}
              emptyLabel="All shapes"
              options={lookups.shapes.map((s) => ({ value: s.id, label: s.name }))}
            />
          )}
        />
      </FormField>
      <div className="grid grid-cols-2 gap-4">
        <FormField id="sp-from" label="Carat from" error={errors.caratFrom?.message}>
          <Input
            id="sp-from"
            type="number"
            step="0.001"
            {...register("caratFrom", { valueAsNumber: true })}
          />
        </FormField>
        <FormField id="sp-to" label="Carat to" error={errors.caratTo?.message}>
          <Input
            id="sp-to"
            type="number"
            step="0.001"
            {...register("caratTo", { valueAsNumber: true })}
          />
        </FormField>
      </div>
      <FormField
        id="sp-price"
        label="Price per carat (₹)"
        error={errors.pricePerCaratRupees?.message}
      >
        <Input
          id="sp-price"
          type="number"
          step="0.01"
          min={0}
          {...register("pricePerCaratRupees", { valueAsNumber: true })}
        />
      </FormField>
      <FormField id="sp-cert" label="Certificate">
        <Controller
          control={control}
          name="certificate"
          render={({ field }) => (
            <AdminSelect
              id="sp-cert"
              value={field.value}
              onChange={field.onChange}
              options={CERTIFICATES.map((c) => ({ value: c, label: c === "NONE" ? "None" : c }))}
            />
          )}
        />
      </FormField>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving…" : "Save price"}
      </Button>
    </form>
  );
}
