import { Stars } from "@/components/ui/Stars";
import type { ProductDetail } from "@/lib/api/schemas";
import { STONE_TYPES } from "@/lib/constants";

type ProductHeaderProps = {
  product: Pick<
    ProductDetail,
    "name" | "sku" | "collection" | "rating" | "shapes" | "styles" | "stoneOptions" | "description"
  >;
};

const formatCarat = (carat: number) => carat.toFixed(2);

/** "Lab-Grown Diamond • Moissanite • Oval Cut • Halo • 1.00 To 1.50 CT" from the product data. */
function specLine(product: ProductHeaderProps["product"]) {
  const centre = product.stoneOptions.filter((o) => o.isCenter);
  const types = [...new Set(product.stoneOptions.map((o) => o.stoneType.code))].map(
    (code) => STONE_TYPES.find((t) => t.code === code)?.name ?? code,
  );
  const carats = centre.map((o) => o.carat);
  const min = Math.min(...carats);
  const max = Math.max(...carats);
  const caratText =
    carats.length === 0
      ? null
      : min === max
        ? `${formatCarat(min)} CT`
        : `${formatCarat(min)} To ${formatCarat(max)} CT`;

  return [
    ...types,
    ...product.shapes.map((s) => (/\bcut$/i.test(s.name) ? s.name : `${s.name} Cut`)),
    ...product.styles.map((s) => s.name),
    caratText,
  ].filter(Boolean);
}

/** Product title with SKU, rating, a one-line spec summary and the description. */
export function ProductHeader({ product }: ProductHeaderProps) {
  const specs = specLine(product);

  return (
    <div>
      {product.collection && (
        <p className="text-xs tracking-label text-gold-dark uppercase">
          {product.collection.name} collection
        </p>
      )}
      <h1 className="mt-2 text-3xl leading-tight sm:text-4xl">{product.name}</h1>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-sm">
        {product.rating.count > 0 && product.rating.average !== null ? (
          <div className="flex items-center gap-2 text-muted">
            <Stars rating={Math.round(product.rating.average)} />
            {product.rating.count}
          </div>
        ) : (
          <span />
        )}
        <p>
          <span className="font-medium">SKU:</span> {product.sku}
        </p>
      </div>
      {specs.length > 0 && (
        <p className="mt-5 text-sm leading-relaxed text-foreground">{specs.join(" • ")}</p>
      )}
      {product.description && (
        <p className="mt-3 text-sm leading-relaxed text-muted">{product.description}</p>
      )}
    </div>
  );
}
