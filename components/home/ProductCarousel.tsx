"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { ProductCard } from "@/components/shop/ProductCard";
import type { ProductListItem } from "@/lib/api/schemas";
import { cn } from "@/lib/utils";

type ProductCarouselProps = {
  products: ProductListItem[];
  label: string;
};

/** Sideways product row (drag/swipe or arrows): 4 cards on desktop, 2 on tablet, 1.5 on mobile. */
export function ProductCarousel({ products, label }: ProductCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", slidesToScroll: 1 });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  useEffect(() => {
    if (!emblaApi) return;
    const update = () => {
      setCanPrev(emblaApi.canScrollPrev());
      setCanNext(emblaApi.canScrollNext());
    };
    update();
    emblaApi.on("select", update).on("reInit", update);
    return () => {
      emblaApi.off("select", update).off("reInit", update);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="relative" role="region" aria-roledescription="carousel" aria-label={label}>
      <div ref={emblaRef} className="overflow-hidden">
        <ul className="-ml-4 flex sm:-ml-6">
          {products.map((product) => (
            <li
              key={product.id}
              className="min-w-0 shrink-0 grow-0 basis-[70%] pl-4 sm:basis-1/2 sm:pl-6 md:basis-1/3 lg:basis-1/4"
            >
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>

      {(canPrev || canNext) &&
        (["prev", "next"] as const).map((direction) => {
          const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
          return (
            <button
              key={direction}
              type="button"
              onClick={direction === "prev" ? scrollPrev : scrollNext}
              disabled={direction === "prev" ? !canPrev : !canNext}
              aria-label={direction === "prev" ? "Previous products" : "Next products"}
              className={cn(
                "absolute top-[38%] hidden size-10 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm transition-opacity hover:bg-primary-dark focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-0 md:flex",
                direction === "prev" ? "-left-5" : "-right-5",
              )}
            >
              <Icon className="size-5" aria-hidden />
            </button>
          );
        })}
    </div>
  );
}
