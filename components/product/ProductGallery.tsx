import Image from "next/image";

import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import type { ProductDetail } from "@/lib/api/schemas";
import { isOptimizedImage } from "@/lib/images";

type ProductGalleryProps = {
  name: string;
  media: ProductDetail["media"];
};

/** Main image + thumbnails. Phase 3+: carousel (embla) and 360° video. */
export function ProductGallery({ name, media }: ProductGalleryProps) {
  const images = media.filter((item) => item.kind === "IMAGE");
  const [main, ...rest] = images;

  if (!main) return <ImagePlaceholder label={`${name} photo`} className="aspect-square" />;

  return (
    <div className="space-y-3">
      <div className="relative aspect-square overflow-hidden bg-surface">
        <Image
          src={main.url}
          alt={main.alt}
          fill
          unoptimized={!isOptimizedImage(main.url)}
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      {rest.length > 0 && (
        <ul className="grid grid-cols-4 gap-3">
          {rest.map((item) => (
            <li key={item.url} className="relative aspect-square overflow-hidden bg-surface">
              <Image
                src={item.url}
                alt={item.alt}
                fill
                unoptimized={!isOptimizedImage(item.url)}
                sizes="12vw"
                className="object-cover"
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
