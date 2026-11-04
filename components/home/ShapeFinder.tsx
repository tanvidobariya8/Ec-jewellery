import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SHAPES } from "@/lib/constants";

import { ShapeIcon } from "@/components/home/ShapeIcon";

export function ShapeFinder() {
  return (
    <section className="bg-surface/40 py-16">
      <Container>
        <SectionHeading
          eyebrow="Shape finder"
          title="Shop by stone shape"
          description="Every center stone is available as a lab-grown diamond or moissanite."
        />
        <ul className="grid grid-cols-3 gap-y-8 sm:grid-cols-5">
          {SHAPES.map((shape) => (
            <li key={shape.slug}>
              <Link
                href={`/shop/engagement-rings?shape=${shape.slug}`}
                className="group flex flex-col items-center gap-3 text-center"
              >
                <ShapeIcon
                  shape={shape.slug}
                  className="size-12 text-muted transition-colors duration-300 group-hover:text-primary"
                />
                <span className="text-[11px] tracking-label text-foreground uppercase group-hover:text-primary">
                  {shape.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
