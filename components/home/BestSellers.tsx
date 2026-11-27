"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Tabs } from "radix-ui";

import { ProductCarousel } from "@/components/home/ProductCarousel";
import { Container } from "@/components/ui/Container";
import type { ProductListItem } from "@/lib/api/schemas";
import { BEST_SELLERS } from "@/lib/mock/home";

type BestSellerTab = {
  slug: string;
  name: string;
  products: ProductListItem[];
};

type BestSellersProps = {
  tabs: BestSellerTab[];
};

/** "Our best sellers": one tab per top-level category, each with a sliding row of product cards. */
export function BestSellers({ tabs }: BestSellersProps) {
  const visible = tabs.filter((tab) => tab.products.length > 0);
  if (visible.length === 0) return null;

  return (
    <section aria-label={BEST_SELLERS.heading} className="bg-background py-16">
      <Container>
        <h2 className="mb-6 text-3xl sm:text-4xl">{BEST_SELLERS.heading}</h2>
        <Tabs.Root defaultValue={visible[0].slug}>
          <Tabs.List
            aria-label="Category"
            className="-mx-4 mb-8 flex gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
          >
            {visible.map((tab) => (
              <Tabs.Trigger
                key={tab.slug}
                value={tab.slug}
                className="shrink-0 border border-primary px-5 py-3 text-xs tracking-label text-primary uppercase transition-colors duration-300 hover:bg-primary/5 focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:outline-none data-[state=active]:bg-primary data-[state=active]:text-primary-foreground sm:px-7"
              >
                {tab.name}
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          {visible.map((tab) => (
            <Tabs.Content key={tab.slug} value={tab.slug} className="focus-visible:outline-none">
              <ProductCarousel products={tab.products} label={`${tab.name} best sellers`} />
              <div className="mt-10 text-center">
                <Link
                  href={`/shop/${tab.slug}?sort=best-sellers`}
                  className="inline-flex items-center gap-2 text-xs tracking-label text-primary uppercase underline-offset-4 hover:underline"
                >
                  {BEST_SELLERS.viewAll} {tab.name}
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </div>
            </Tabs.Content>
          ))}
        </Tabs.Root>
      </Container>
    </section>
  );
}
