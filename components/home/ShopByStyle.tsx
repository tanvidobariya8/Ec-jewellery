"use client";

import Image from "next/image";
import Link from "next/link";
import { Tabs } from "radix-ui";

import { Container } from "@/components/ui/Container";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { StyleTile } from "@/lib/api/catalog";
import { isOptimizedImage } from "@/lib/images";

type StyleTab = {
  stone: "LAB_DIAMOND" | "MOISSANITE";
  label: string;
  tiles: StyleTile[];
};

type ShopByStyleProps = {
  tabs: StyleTab[];
};

/** "Shop rings by style": stone-type tabs, each with a row of style tiles (photo, name, count). */
export function ShopByStyle({ tabs }: ShopByStyleProps) {
  const visible = tabs.filter((tab) => tab.tiles.length > 0);
  if (visible.length === 0) return null;

  return (
    <section aria-label="Shop rings by style" className="bg-background py-16">
      <Container>
        <SectionHeading title="Shop rings by style" />
        <Tabs.Root defaultValue={visible[0].stone}>
          <Tabs.List aria-label="Center stone" className="mb-8 flex justify-center gap-3">
            {visible.map((tab) => (
              <Tabs.Trigger
                key={tab.stone}
                value={tab.stone}
                className="border border-primary px-5 py-3 text-xs tracking-label text-primary uppercase transition-colors duration-300 hover:bg-primary/5 focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:outline-none data-[state=active]:bg-primary data-[state=active]:text-primary-foreground sm:px-8"
              >
                {tab.label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          {visible.map((tab) => (
            <Tabs.Content key={tab.stone} value={tab.stone} className="focus-visible:outline-none">
              <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-6">
                {tab.tiles.map((tile, index) => (
                  <li key={tile.slug}>
                    <StyleCard tile={tile} stone={tab.stone} index={index} />
                  </li>
                ))}
              </ul>
            </Tabs.Content>
          ))}
        </Tabs.Root>
      </Container>
    </section>
  );
}

function StyleCard({
  tile,
  stone,
  index,
}: {
  tile: StyleTile;
  stone: StyleTab["stone"];
  index: number;
}) {
  return (
    <Link href={`/shop/rings?style=${tile.slug}&stone=${stone}`} className="group block">
      {tile.image ? (
        <div className="relative aspect-[4/5] overflow-hidden bg-surface">
          <Image
            src={tile.image.url}
            alt={tile.image.alt || `${tile.name} ring`}
            fill
            unoptimized={!isOptimizedImage(tile.image.url)}
            sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ) : (
        <ImagePlaceholder
          label={`${tile.name} ring photo`}
          tone={index % 2 === 0 ? "warm" : "muted"}
          className="aspect-[4/5] transition-opacity duration-300 group-hover:opacity-80"
        />
      )}
      <p className="mt-4 font-serif text-lg transition-colors group-hover:text-primary">
        {tile.name}
      </p>
      <p className="text-xs text-muted">
        {tile.count > 0 ? `${tile.count} ${tile.count === 1 ? "item" : "items"}` : "Coming soon"}
      </p>
    </Link>
  );
}
