import Image from "next/image";
import Link from "next/link";

import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import type { ProductListItem } from "@/lib/api/schemas";
import { STONE_LABELS } from "@/lib/constants";
import { isOptimizedImage } from "@/lib/images";

type ProductCardProps = {
  product: ProductListItem;
};

export function ProductCard({ product }: ProductCardProps) {
  const stones = product.stoneTypes.map((code) => STONE_LABELS[code]).join(" · ");

  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="relative aspect-square overflow-hidden bg-surface">
        {product.image ? (
          <Image
            src={product.image.url}
            alt={product.image.alt}
            fill
            unoptimized={!isOptimizedImage(product.image.url)}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <ImagePlaceholder label={`${product.name} photo`} className="size-full" />
        )}
        {product.isBestSeller && (
          <span className="absolute top-3 left-3 bg-background/90 px-2 py-1 text-[10px] tracking-label text-primary uppercase">
            Best seller
          </span>
        )}
      </div>
      <p className="mt-4 text-[11px] tracking-label text-gold-dark uppercase">
        {product.category.name}
      </p>
      <h3 className="mt-1 font-serif text-lg leading-snug transition-colors group-hover:text-primary">
        {product.name}
      </h3>
      {stones && <p className="mt-1 text-xs text-muted">{stones}</p>}
    </Link>
  );
}
