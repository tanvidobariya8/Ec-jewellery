"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { cn } from "@/lib/utils";
import type { HeroSlide } from "@/types/content";

type HeroSliderProps = {
  slides: HeroSlide[];
};

export function HeroSlider({ slides }: HeroSliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 6000, stopOnInteraction: true }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured collections"
      className="py-10 md:py-14"
    >
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${slides.length}`}
              className="min-w-0 shrink-0 grow-0 basis-full"
            >
              <Container className="grid items-center gap-10 md:grid-cols-2">
                <div className="order-2 md:order-1">
                  <p className="mb-4 text-xs tracking-label text-gold-dark uppercase">
                    {slide.eyebrow}
                  </p>
                  {index === 0 ? (
                    <h1 className="text-4xl leading-tight sm:text-5xl lg:text-6xl">
                      {slide.heading}
                    </h1>
                  ) : (
                    <h2 className="text-4xl leading-tight sm:text-5xl lg:text-6xl">
                      {slide.heading}
                    </h2>
                  )}
                  <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
                    {slide.subtext}
                  </p>
                  <Button asChild className="mt-8">
                    <Link href={slide.cta.href}>{slide.cta.label}</Link>
                  </Button>
                </div>
                <ImagePlaceholder
                  label={slide.imageLabel}
                  className="order-1 aspect-[5/4] md:order-2"
                />
              </Container>
            </div>
          ))}
        </div>
      </div>

      {slides.length > 1 && (
        <div className="mt-8 flex justify-center gap-3">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => scrollTo(index)}
              aria-label={`Show slide ${index + 1}`}
              aria-current={index === selectedIndex}
              className={cn(
                "h-0.5 w-8 transition-colors duration-300",
                index === selectedIndex ? "bg-primary" : "bg-border",
              )}
            />
          ))}
        </div>
      )}
    </section>
  );
}
