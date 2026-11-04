import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { CUSTOM_BANNER } from "@/lib/mock/home";

export function CustomBanner() {
  return (
    <section className="py-16">
      <Container>
        <div className="grid items-center overflow-hidden bg-primary text-primary-foreground md:grid-cols-2">
          <ImagePlaceholder
            label="Sketch to finished ring"
            className="aspect-[4/3] md:aspect-auto md:h-full"
          />
          <div className="px-6 py-12 sm:px-12">
            <p className="mb-4 text-xs tracking-label text-gold uppercase">
              {CUSTOM_BANNER.eyebrow}
            </p>
            <h2 className="text-3xl text-primary-foreground sm:text-4xl">
              {CUSTOM_BANNER.heading}
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-primary-foreground/80">
              {CUSTOM_BANNER.subtext}
            </p>
            <Button asChild variant="light" className="mt-8">
              <Link href={CUSTOM_BANNER.cta.href}>{CUSTOM_BANNER.cta.label}</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
