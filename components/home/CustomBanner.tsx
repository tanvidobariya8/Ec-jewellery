import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CUSTOM_BANNER } from "@/lib/mock/home";

export function CustomBanner() {
  return (
    <section className="py-16">
      <Container>
        <div className="grid items-center overflow-hidden bg-primary text-primary-foreground md:grid-cols-2">
          <div className="relative grid grid-cols-2 gap-1">
            {[CUSTOM_BANNER.before, CUSTOM_BANNER.after].map(({ label, image, alt }) => (
              <figure key={label} className="relative aspect-4/5 overflow-hidden bg-surface">
                <Image
                  src={image}
                  alt={alt}
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-primary/80 py-2 text-center text-[10px] tracking-label text-primary-foreground uppercase sm:text-xs">
                  {label}
                </figcaption>
              </figure>
            ))}
            <span
              aria-hidden="true"
              className="absolute top-1/2 left-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-background text-primary shadow-sm"
            >
              <ArrowRight className="size-5" strokeWidth={1.5} />
            </span>
          </div>
          <div className="px-6 py-12 sm:px-12">
            <p className="mb-4 text-xs tracking-label text-gold-light uppercase">
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
