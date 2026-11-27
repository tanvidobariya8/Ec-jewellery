"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Controller,
  useForm,
  type Control,
  type FieldErrors,
  type UseFormRegister,
} from "react-hook-form";

import { ImageField } from "@/components/admin/ImageField";
import { Button } from "@/components/ui/Button";
import { FormField, Input } from "@/components/ui/FormField";
import type { AdminStyle } from "@/lib/api/admin-schemas";
import { styleDefaults, styleFormSchema, type StyleValues } from "@/lib/validations/admin";

type StyleFormProps = {
  style?: AdminStyle;
  onSubmit: (values: StyleValues) => Promise<void>;
};

export function StyleForm({ style, onSubmit }: StyleFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<StyleValues>({
    resolver: zodResolver(styleFormSchema),
    defaultValues: styleDefaults(style),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <FormField id="style-name" label="Name" error={errors.name?.message}>
        <Input id="style-name" aria-invalid={!!errors.name} {...register("name")} />
      </FormField>
      <FormField id="style-slug" label="URL slug" optional error={errors.slug?.message}>
        <Input
          id="style-slug"
          placeholder="Generated from the name"
          aria-invalid={!!errors.slug}
          {...register("slug")}
        />
      </FormField>
      <p className="text-xs text-muted">
        Home page &ldquo;Shop rings by style&rdquo; has one tab per stone, each with its own tile
        photo and order. No upload? Copy the photo into <code>fe/public/images/styles/</code> and
        type its path, e.g. <code>/images/styles/solitaire.png</code>. Empty photo = first matching
        ring&apos;s photo.
      </p>
      <TileFields
        legend="Lab-grown diamond tab"
        idPrefix="style-lab"
        imageName="image"
        sortName="sort"
        control={control}
        register={register}
        errors={errors}
      />
      <TileFields
        legend="Moissanite tab"
        idPrefix="style-moissanite"
        imageName="moissaniteImage"
        sortName="moissaniteSort"
        control={control}
        register={register}
        errors={errors}
      />
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving…" : "Save style"}
      </Button>
    </form>
  );
}

type TileFieldsProps = {
  legend: string;
  idPrefix: string;
  imageName: "image" | "moissaniteImage";
  sortName: "sort" | "moissaniteSort";
  control: Control<StyleValues>;
  register: UseFormRegister<StyleValues>;
  errors: FieldErrors<StyleValues>;
};

/** Tile photo + position for one stone tab. */
function TileFields({
  legend,
  idPrefix,
  imageName,
  sortName,
  control,
  register,
  errors,
}: TileFieldsProps) {
  return (
    <fieldset className="space-y-4 border border-border p-4">
      <legend className="px-1 text-xs tracking-label uppercase">{legend}</legend>
      <FormField
        id={`${idPrefix}-image`}
        label="Tile image"
        optional
        error={errors[imageName]?.message}
      >
        <Controller
          control={control}
          name={imageName}
          render={({ field }) => (
            <ImageField
              id={`${idPrefix}-image`}
              folder="categories"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </FormField>
      <FormField
        id={`${idPrefix}-sort`}
        label="Order on this tab"
        error={errors[sortName]?.message}
      >
        <Input
          id={`${idPrefix}-sort`}
          type="number"
          min={0}
          aria-invalid={!!errors[sortName]}
          {...register(sortName, { valueAsNumber: true })}
        />
      </FormField>
    </fieldset>
  );
}
