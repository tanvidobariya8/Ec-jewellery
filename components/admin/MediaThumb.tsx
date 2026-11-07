import Image from "next/image";

import type { ProductMedia } from "@/lib/api/admin-schemas";

/** Preview of one product photo or video in the admin media grid. */
export function MediaThumb({ media, isMain }: { media: ProductMedia; isMain: boolean }) {
  return (
    <div className="relative aspect-square overflow-hidden bg-surface">
      {media.kind === "IMAGE" ? (
        <Image
          src={media.url}
          alt={media.alt ?? ""}
          fill
          unoptimized
          sizes="320px"
          className="object-cover"
        />
      ) : (
        <video src={media.url} muted playsInline controls className="size-full object-cover" />
      )}
      {isMain && (
        <span className="absolute top-2 left-2 bg-primary px-2 py-1 text-[10px] tracking-label text-primary-foreground uppercase">
          Main
        </span>
      )}
    </div>
  );
}
