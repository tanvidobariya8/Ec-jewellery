import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ComingSoon } from "@/components/content/ComingSoon";
import { CATEGORIES } from "@/lib/constants";

function getCategory(slug: string) {
  return CATEGORIES.find((category) => category.slug === slug);
}

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/shop/[category]">): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  return {
    title: category.name,
    description: `Lab-grown diamond and moissanite ${category.name.toLowerCase()}, handcrafted in solid gold and platinum.`,
  };
}

// TODO(Phase 2): category listing (shape / style tabs, filters, product grid).
export default async function CategoryPage({ params }: PageProps<"/shop/[category]">) {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  return (
    <ComingSoon
      eyebrow="Shop"
      title={`${category.name} — coming soon`}
      description={`Our ${category.name.toLowerCase()} collection is launching soon. Message us for current designs, prices and custom options.`}
      whatsappMessage={`Hello, I'm interested in your ${category.name.toLowerCase()}.`}
    />
  );
}
