"use client";

import Image from "next/image";
import Link from "next/link";
import { Tabs } from "radix-ui";
import { useState } from "react";

import { Container } from "@/components/ui/Container";
import type { ShapeTile } from "@/lib/api/catalog";
import { STONE_TYPES } from "@/lib/constants";
import { isOptimizedImage } from "@/lib/images";
import { cn } from "@/lib/utils";

type Stone = "LAB_DIAMOND" | "MOISSANITE";

/** Wording per stone tab: heading ("Lab Grown Diamond") and the lower-case form in the blurb. */
const STONE_COPY: Record<Stone, { tab: string; title: string; text: string }> = {
  LAB_DIAMOND: { tab: STONE_TYPES[0].name, title: "Lab Grown Diamond", text: "lab grown diamond" },
  MOISSANITE: { tab: STONE_TYPES[1].name, title: "Moissanite", text: "moissanite" },
};
const STONES = Object.keys(STONE_COPY) as Stone[];

const shapeHref = (slug: string, stone: Stone) =>
  `/shop/engagement-rings?shape=${slug}&stone=${stone}`;

/** "Rose Cut" already says cut; "Oval" becomes "Oval Cut". */
const cutName = (name: string) => (/\bcut$/i.test(name) ? name : `${name} Cut`);

type ShopByShapeProps = {
  shapes: ShapeTile[];
};

/**
 * "Shop ring by shape": stone tabs and a card describing the selected shape on the left, the
 * grid of stone photos on the right. Hover or focus picks the shape; a click opens the shop.
 */
export function ShopByShape({ shapes }: ShopByShapeProps) {
  const [stone, setStone] = useState<Stone>("LAB_DIAMOND");
  const [activeSlug, setActiveSlug] = useState(shapes[0]?.slug);
  if (shapes.length === 0) return null;

  const active = shapes.find((s) => s.slug === activeSlug) ?? shapes[0];
  const copy = STONE_COPY[stone];

  return (
    <section aria-labelledby="shop-by-shape-heading" className="bg-neutral-band py-16">
      <Container className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
        <div>
          <h2 id="shop-by-shape-heading" className="text-3xl sm:text-4xl">
            Shop ring by shape
          </h2>
          <Tabs.Root value={stone} onValueChange={(v) => setStone(v as Stone)}>
            <Tabs.List aria-label="Center stone" className="mt-6 flex gap-3">
              {STONES.map((s) => (
                <Tabs.Trigger
                  key={s}
                  value={s}
                  className="border border-primary px-5 py-3 text-xs tracking-label text-primary uppercase transition-colors duration-300 hover:bg-primary/5 focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:outline-none data-[state=active]:bg-primary data-[state=active]:text-primary-foreground sm:px-8"
                >
                  {STONE_COPY[s].tab}
                </Tabs.Trigger>
              ))}
            </Tabs.List>
            {STONES.map((s) => (
              <Tabs.Content key={s} value={s} className="focus-visible:outline-none">
                <Link
                  href={shapeHref(active.slug, s)}
                  aria-live="polite"
                  className="group mt-6 flex items-center gap-6 border border-border p-6 sm:gap-8 sm:p-8"
                >
                  <ShapePhoto
                    tile={active}
                    sizes="128px"
                    className="h-36 w-24 shrink-0 sm:h-40 sm:w-28"
                  />
                  <div>
                    <h3 className="text-xl leading-snug transition-colors group-hover:text-primary">
                      {cutName(active.name)} {copy.title} Engagement Rings
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      Shop {active.name} {copy.text} rings.
                      {active.description ? ` ${active.description}` : ""}
                    </p>
                  </div>
                </Link>
              </Tabs.Content>
            ))}
          </Tabs.Root>
        </div>

        <ul className="grid grid-cols-3 gap-2 self-start sm:grid-cols-4 lg:grid-cols-6">
          {shapes.map((shape) => {
            const selected = shape.slug === active.slug;
            return (
              <li key={shape.slug}>
                <Link
                  href={shapeHref(shape.slug, stone)}
                  aria-label={`${shape.name} ${copy.text} rings`}
                  onMouseEnter={() => setActiveSlug(shape.slug)}
                  onFocus={() => setActiveSlug(shape.slug)}
                  className={cn(
                    "group flex flex-col items-center gap-2 border px-1 py-4 text-center transition-colors duration-300",
                    selected ? "border-primary" : "border-transparent hover:border-border",
                  )}
                >
                  <ShapePhoto tile={shape} sizes="80px" className="size-16 sm:size-20" />
                  <span className="text-sm text-primary">{shape.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

function ShapePhoto({
  tile,
  sizes,
  className,
}: {
  tile: ShapeTile;
  sizes: string;
  className: string;
}) {
  return (
    <div className={cn("relative", className)}>
      {tile.image && (
        <Image
          src={tile.image}
          alt=""
          fill
          unoptimized={!isOptimizedImage(tile.image)}
          sizes={sizes}
          className="object-contain"
        />
      )}
    </div>
  );
}
