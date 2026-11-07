import type { Metadata } from "next";
import { Suspense } from "react";

import { ProductListing } from "@/components/shop/ProductListing";
import { ProductListingSkeleton } from "@/components/shop/ProductListingSkeleton";
import { ShopTitle } from "@/components/shop/ShopTitle";
import { Container } from "@/components/ui/Container";
import { loadShopSearchParams } from "@/lib/search-params/shop";

export const metadata: Metadata = {
  title: "Shop All Jewellery",
  description: "Lab-grown diamond and moissanite rings, earrings, chains and bracelets.",
};

async function ShopResults({ searchParams }: Pick<PageProps<"/shop">, "searchParams">) {
  const filters = await loadShopSearchParams(searchParams);
  return <ProductListing basePath="/shop" filters={filters} />;
}

export default function ShopPage({ searchParams }: PageProps<"/shop">) {
  return (
    <Container className="py-8">
      <ShopTitle title="All Jewellery" crumbs={[{ label: "Home", href: "/" }]} />
      <Suspense fallback={<ProductListingSkeleton />}>
        <ShopResults searchParams={searchParams} />
      </Suspense>
    </Container>
  );
}
