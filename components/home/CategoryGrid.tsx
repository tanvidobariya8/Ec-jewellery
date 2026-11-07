import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { isOptimizedImage } from "@/lib/images";

type CategoryGridProps = {
  categories: readonly { slug: string; name: string; image?: string | null }[];
};

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <section className="py-16">
      <Container>
        <SectionHeading title="Shop by category" />
        <ul className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {categories.map((category, index) => (
            <li key={category.slug}>
              <Link href={`/shop/${category.slug}`} className="group block">
                {category.image ? (
                  <div className="relative aspect-[4/5] overflow-hidden bg-surface">
                    <Image
                      src={category.image}
                      alt={`${category.name} jewellery`}
                      fill
                      unoptimized={!isOptimizedImage(category.image)}
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <ImagePlaceholder
                    label={`${category.name} photo`}
                    tone={index % 2 === 0 ? "warm" : "muted"}
                    className="aspect-[4/5] transition-opacity duration-300 group-hover:opacity-80"
                  />
                )}
                <p className="mt-4 text-center text-xs tracking-label uppercase transition-colors group-hover:text-primary">
                  {category.name}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
