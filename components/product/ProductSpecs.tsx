import type { ProductDetail } from "@/lib/api/schemas";
import { LEAD_TIMES } from "@/lib/constants";

type ProductSpecsProps = {
  product: Pick<ProductDetail, "sku" | "dimensions" | "metalWeightG" | "shapes" | "styles">;
};

const startCase = (key: string) => key.charAt(0).toUpperCase() + key.slice(1);

export function ProductSpecs({ product }: ProductSpecsProps) {
  const rows: [string, string][] = [["SKU", product.sku]];
  if (product.shapes.length) rows.push(["Shape", product.shapes.map((s) => s.name).join(", ")]);
  if (product.styles.length) rows.push(["Style", product.styles.map((s) => s.name).join(", ")]);
  rows.push(["Approx. metal weight", `${product.metalWeightG} g (14K)`]);
  for (const [key, value] of Object.entries(product.dimensions ?? {})) {
    rows.push([startCase(key), value]);
  }
  rows.push(
    ["Crafting time", LEAD_TIMES.craftingDays],
    ["Insured delivery", LEAD_TIMES.deliveryDays],
  );

  return (
    <dl className="divide-y divide-border border-y border-border text-sm">
      {rows.map(([term, detail]) => (
        <div key={term} className="flex justify-between gap-6 py-3">
          <dt className="text-muted">{term}</dt>
          <dd className="text-right">{detail}</dd>
        </div>
      ))}
    </dl>
  );
}
