"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { Container } from "@/components/ui/Container";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { isOptimizedImage } from "@/lib/images";
import { cn } from "@/lib/utils";

type CategoryGridProps = {
  categories: readonly { slug: string; name: string; image?: string | null }[];
};

/**
 * "Shop by category" row: large portrait tiles (4 per row on desktop), scrollable sideways
 * (drag/swipe or arrows). Images come from Admin → Categories; best results with full-bleed
 * 4:5 portrait styled shots (jewellery on a soft background).
 */
export function CategoryGrid({ categories }: CategoryGridProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", dragFree: true });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  useEffect(() => {
    if (!emblaApi) return;
    const update = () => {
      setCanPrev(emblaApi.canScrollPrev());
      setCanNext(emblaApi.canScrollNext());
    };
    update();
    emblaApi.on("select", update).on("reInit", update).on("scroll", update);
    return () => {
      emblaApi.off("select", update).off("reInit", update).off("scroll", update);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  if (categories.length === 0) return null;

  return (
    <section aria-label="Shop by category" className="bg-background py-16">
      <Container>
        <h2 className="mb-8 text-3xl sm:text-4xl">Shop by category</h2>
        <div className="relative">
          <div ref={emblaRef} className="overflow-hidden">
            <ul className="-ml-4 flex sm:-ml-6">
              {categories.map((category, index) => (
                <li
                  key={category.slug}
                  className="min-w-0 shrink-0 grow-0 basis-[75%] pl-4 sm:basis-1/2 sm:pl-6 md:basis-1/3 lg:basis-1/4"
                >
                  <Link href={`/shop/${category.slug}`} className="group block">
                    {category.image ? (
                      <div className="relative aspect-4/5 overflow-hidden bg-surface">
                        <Image
                          src={category.image}
                          alt={`${category.name} jewellery`}
                          fill
                          unoptimized={!isOptimizedImage(category.image)}
                          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 75vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                    ) : (
                      <ImagePlaceholder
                        label={`${category.name} photo`}
                        tone={index % 2 === 0 ? "warm" : "muted"}
                        className="aspect-4/5 transition-opacity duration-300 group-hover:opacity-80"
                      />
                    )}
                    <p className="mt-5 text-center font-serif text-xl transition-colors group-hover:text-primary sm:text-2xl">
                      {category.name}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {(canPrev || canNext) && (
            <>
              <ArrowButton direction="prev" onClick={scrollPrev} disabled={!canPrev} />
              <ArrowButton direction="next" onClick={scrollNext} disabled={!canNext} />
            </>
          )}
        </div>
      </Container>
    </section>
  );
}

function ArrowButton({
  direction,
  onClick,
  disabled,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  disabled: boolean;
}) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Previous categories" : "More categories"}
      className={cn(
        "absolute top-[42%] hidden size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-white/90 shadow-sm transition-opacity hover:text-primary disabled:pointer-events-none disabled:opacity-0 md:flex",
        direction === "prev" ? "-left-5" : "-right-5",
      )}
    >
      <Icon className="size-5" aria-hidden />
    </button>
  );
}
