"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { CheckboxGroup } from "@/components/admin/product-form/CheckboxGroup";
import { ProductBasicsSection } from "@/components/admin/product-form/ProductBasicsSection";
import { ProductDimensionsSection } from "@/components/admin/product-form/ProductDimensionsSection";
import { ProductStonesSection } from "@/components/admin/product-form/ProductStonesSection";
import { Button } from "@/components/ui/Button";
import { FormField, Input, Textarea } from "@/components/ui/FormField";
import type { AdminProduct, Lookups } from "@/lib/api/admin-schemas";
import { productDefaults, productFormSchema, type ProductValues } from "@/lib/validations/admin";

type ProductFormProps = {
  product?: AdminProduct;
  lookups: Lookups;
  onSubmit: (values: ProductValues) => Promise<void>;
};

function Section({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-border pt-8">
      <h2 className="text-2xl">{title}</h2>
      {hint && <p className="mt-1 text-sm text-muted">{hint}</p>}
      <div className="mt-6">{children}</div>
    </section>
  );
}

export function ProductForm({ product, lookups, onSubmit }: ProductFormProps) {
  const form = useForm<ProductValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: productDefaults(product),
  });
  const { control, register, handleSubmit, formState } = form;
  const toOptions = (rows: { id: string; name: string }[]) =>
    rows.map((r) => ({ value: r.id, label: r.name }));

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-10">
      <ProductBasicsSection form={form} lookups={lookups} />

      <Section title="Options" hint="What the customer can choose on the product page.">
        <div className="space-y-6">
          <Controller
            control={control}
            name="metalIds"
            render={({ field }) => (
              <CheckboxGroup
                legend="Metals"
                hint="Price uses the metal's rate per gram × the weight above."
                options={lookups.metals.map((m) => ({
                  value: m.id,
                  label: m.active ? m.name : `${m.name} (hidden)`,
                }))}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="shapeIds"
            render={({ field }) => (
              <CheckboxGroup
                legend="Shapes"
                options={toOptions(lookups.shapes)}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="styleIds"
            render={({ field }) => (
              <CheckboxGroup
                legend="Styles"
                options={toOptions(lookups.styles)}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </div>
      </Section>

      <Section
        title="Stone options"
        hint="Each row is one choice. Mark one as default; side stones are not 'center'."
      >
        <ProductStonesSection form={form} lookups={lookups} />
      </Section>

      <Section title="Specifications" hint="Shown in the product details table.">
        <ProductDimensionsSection form={form} />
      </Section>

      <Section title="SEO" hint="Optional — the product name and description are used when empty.">
        <div className="space-y-5">
          <FormField
            id="p-seoTitle"
            label="SEO title"
            optional
            error={formState.errors.seoTitle?.message}
          >
            <Input id="p-seoTitle" {...register("seoTitle")} />
          </FormField>
          <FormField
            id="p-seoDescription"
            label="SEO description"
            optional
            error={formState.errors.seoDescription?.message}
          >
            <Textarea id="p-seoDescription" className="min-h-24" {...register("seoDescription")} />
          </FormField>
        </div>
      </Section>

      <div className="sticky bottom-0 -mx-4 flex items-center gap-4 border-t border-border bg-background/95 px-4 py-4 sm:-mx-8 sm:px-8">
        <Button type="submit" disabled={formState.isSubmitting}>
          {formState.isSubmitting ? "Saving…" : product ? "Save changes" : "Create product"}
        </Button>
        {Object.keys(formState.errors).length > 0 && (
          <p role="alert" className="text-sm text-danger">
            Please fix the highlighted fields.
          </p>
        )}
      </div>
    </form>
  );
}
