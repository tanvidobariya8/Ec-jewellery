"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { ImageField } from "@/components/admin/ImageField";
import { Button } from "@/components/ui/Button";
import { FormField, Input, Textarea } from "@/components/ui/FormField";
import type { AdminShape } from "@/lib/api/admin-schemas";
import { shapeDefaults, shapeFormSchema, type ShapeValues } from "@/lib/validations/admin";

type ShapeFormProps = {
  shape?: AdminShape;
  onSubmit: (values: ShapeValues) => Promise<void>;
};

export function ShapeForm({ shape, onSubmit }: ShapeFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ShapeValues>({
    resolver: zodResolver(shapeFormSchema),
    defaultValues: shapeDefaults(shape),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <FormField id="shape-name" label="Name" error={errors.name?.message}>
        <Input id="shape-name" aria-invalid={!!errors.name} {...register("name")} />
      </FormField>
      <FormField id="shape-slug" label="URL slug" optional error={errors.slug?.message}>
        <Input
          id="shape-slug"
          placeholder="Generated from the name"
          aria-invalid={!!errors.slug}
          {...register("slug")}
        />
      </FormField>
      <FormField id="shape-image" label="Stone photo" optional error={errors.image?.message}>
        <Controller
          control={control}
          name="image"
          render={({ field }) => (
            <ImageField
              id="shape-image"
              folder="categories"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </FormField>
      <p className="text-xs text-muted">
        Square photo on a white background works best. No upload? Copy it into{" "}
        <code>fe/public/images/shapes/</code> and type its path, e.g.{" "}
        <code>/images/shapes/oval.png</code>.
      </p>
      <FormField
        id="shape-description"
        label="Description"
        optional
        error={errors.description?.message}
      >
        <Textarea
          id="shape-description"
          rows={3}
          placeholder="Shown beside the shape on the home page"
          aria-invalid={!!errors.description}
          {...register("description")}
        />
      </FormField>
      <FormField id="shape-sort" label="Order in the grid" error={errors.sort?.message}>
        <Input
          id="shape-sort"
          type="number"
          min={0}
          aria-invalid={!!errors.sort}
          {...register("sort", { valueAsNumber: true })}
        />
      </FormField>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving…" : "Save shape"}
      </Button>
    </form>
  );
}
