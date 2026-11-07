import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { ProductListing } from "@/components/shop/ProductListing";
import { ProductListingSkeleton } from "@/components/shop/ProductListingSkeleton";
import { ShopTitle } from "@/components/shop/ShopTitle";
import { Container } from "@/components/ui/Container";
import { getCategories, getCategory } from "@/lib/api/catalog";
import { loadShopSearchParams } from "@/lib/search-params/shop";

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/shop/[category]">): Promise<Metadata> {
  const { category: slug } = await params;
  const category = await getCategory(slug);
  if (!category) return {};
  return {
    title: category.name,
    description:
      category.description ??
      `Lab-grown diamond and moissanite ${category.name.toLowerCase()}, handcrafted in solid gold and platinum.`,
  };
}

/** Reads URL data (`params`, `searchParams`), so it streams in behind <Suspense>. */
async function CategoryContent({
  params,
  searchParams,
}: Pick<PageProps<"/shop/[category]">, "params" | "searchParams">) {
  const { category: slug } = await params;
  const category = await getCategory(slug);
  if (!category) notFound();
  const filters = await loadShopSearchParams(searchParams);

  return (
    <>
      <ShopTitle
        title={category.name}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop" },
        ]}
      />
      <ProductListing basePath={`/shop/${slug}`} filters={filters} category={slug} />
    </>
  );
}

export default function CategoryPage({ params, searchParams }: PageProps<"/shop/[category]">) {
  return (
    <Container className="py-8">
      <Suspense fallback={<ProductListingSkeleton withTitle />}>
        <CategoryContent params={params} searchParams={searchParams} />
      </Suspense>
    </Container>
  );
}
