import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { ProductConfigurator } from "@/components/product/ProductConfigurator";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductHeader } from "@/components/product/ProductHeader";
import { ProductSpecs } from "@/components/product/ProductSpecs";
import { Container } from "@/components/ui/Container";
import { getProduct, getProductSlugs } from "@/lib/api/catalog";
import type { ProductDetail } from "@/lib/api/schemas";
import { SITE } from "@/lib/constants";

export async function generateStaticParams() {
  const slugs = await getProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/product/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return {};
  const title = product.seo.title ?? product.name;
  const description = product.seo.description ?? product.description ?? undefined;
  const image = product.media[0]?.url;
  return {
    title: { absolute: title },
    description,
    openGraph: { title, description, images: image ? [image] : undefined },
  };
}

function productJsonLd(product: ProductDetail) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.sku,
    description: product.description ?? undefined,
    image: product.media.map((item) => item.url),
    brand: { "@type": "Brand", name: SITE.name },
    category: product.category.name,
    url: `${SITE.url}/product/${product.slug}`,
    ...(product.rating.count > 0 &&
      product.rating.average !== null && {
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: product.rating.average,
          reviewCount: product.rating.count,
        },
      }),
  };
}

export default async function ProductPage({ params }: PageProps<"/product/[slug]">) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd(product)).replace(/</g, "\\u003c"),
        }}
      />
      <Container className="py-10 lg:py-14">
        <nav aria-label="Breadcrumb" className="mb-8 text-xs tracking-label text-muted uppercase">
          <Link href="/shop" className="hover:text-primary">
            Shop
          </Link>
          <span className="mx-2">/</span>
          <Link href={`/shop/${product.category.slug}`} className="hover:text-primary">
            {product.category.name}
          </Link>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <ProductGallery name={product.name} media={product.media} />

          <div>
            <ProductHeader product={product} />

            <div className="mt-8">
              <Suspense fallback={<div className="h-80 animate-pulse bg-surface/60" />}>
                <ProductConfigurator product={product} />
              </Suspense>
            </div>

            <div className="mt-10">
              <h2 className="mb-4 text-xs tracking-label uppercase">Details</h2>
              <ProductSpecs product={product} />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
