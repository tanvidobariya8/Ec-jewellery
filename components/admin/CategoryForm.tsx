"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { AdminSelect } from "@/components/admin/AdminSelect";
import { ImageField } from "@/components/admin/ImageField";
import { Button } from "@/components/ui/Button";
import { FormField, Input, Textarea } from "@/components/ui/FormField";
import type { AdminCategory } from "@/lib/api/admin-schemas";
import { categoryDefaults, categorySchema, type CategoryValues } from "@/lib/validations/admin";

type CategoryFormProps = {
  category?: AdminCategory;
  /** Possible parents (the category itself is excluded). */
  parents: AdminCategory[];
  onSubmit: (values: CategoryValues) => Promise<void>;
};

export function CategoryForm({ category, parents, onSubmit }: CategoryFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CategoryValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: categoryDefaults(category),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <FormField id="cat-name" label="Name" error={errors.name?.message}>
        <Input id="cat-name" aria-invalid={!!errors.name} {...register("name")} />
      </FormField>
      <FormField id="cat-slug" label="URL slug" optional error={errors.slug?.message}>
        <Input
          id="cat-slug"
          placeholder="Generated from the name"
          aria-invalid={!!errors.slug}
          {...register("slug")}
        />
      </FormField>
      <FormField id="cat-parent" label="Parent category" optional>
        <Controller
          control={control}
          name="parentId"
          render={({ field }) => (
            <AdminSelect
              id="cat-parent"
              value={field.value}
              onChange={field.onChange}
              emptyLabel="None (top level)"
              options={parents
                .filter((p) => p.id !== category?.id)
                .map((p) => ({ value: p.id, label: p.name }))}
            />
          )}
        />
      </FormField>
      <FormField id="cat-sort" label="Sort order" error={errors.sort?.message}>
        <Input
          id="cat-sort"
          type="number"
          min={0}
          aria-invalid={!!errors.sort}
          {...register("sort", { valueAsNumber: true })}
        />
      </FormField>
      <FormField id="cat-description" label="Description" optional>
        <Textarea id="cat-description" className="min-h-24" {...register("description")} />
      </FormField>
      <FormField id="cat-image" label="Image" optional error={errors.image?.message}>
        <Controller
          control={control}
          name="image"
          render={({ field }) => (
            <ImageField
              id="cat-image"
              folder="categories"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </FormField>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving…" : "Save category"}
      </Button>
    </form>
  );
}
