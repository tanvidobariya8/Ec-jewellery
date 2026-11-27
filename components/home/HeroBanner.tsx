import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import type { HeroBannerContent } from "@/types/content";

type HeroBannerProps = {
  banner: HeroBannerContent;
};

/**
 * Full-bleed home hero. Desktop (lg+): the whole photo (uncropped, sized to the banner height) sits on the right,
 * aligned to the Container's right edge and faded into the `bg-banner` colour on both sides, with the copy laid over the empty left side.
 * Mobile: photo on top, copy below. Works best with a photo whose background matches `bg-banner`.
 */
export function HeroBanner({ banner }: HeroBannerProps) {
  return (
    <section
      aria-label="Featured collection"
      className="relative overflow-hidden bg-banner lg:h-[min(65vh,560px)] lg:min-h-[440px]"
    >
      {banner.image ? (
        <div className="relative aspect-[6/5] lg:absolute lg:inset-y-0 lg:right-[max(2rem,calc((100%-80rem)/2+2rem))] lg:aspect-1375/1144 lg:h-full lg:max-w-[50%] lg:mask-[linear-gradient(to_right,transparent,black_15%,black_90%,transparent)]">
          <Image
            src={banner.image}
            alt={banner.imageLabel}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-top lg:object-contain lg:object-bottom-right"
          />
        </div>
      ) : (
        <ImagePlaceholder
          label={banner.imageLabel}
          className="aspect-[6/5] lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:w-1/2"
        />
      )}

      <Container className="relative flex h-full items-center py-10 lg:py-0">
        <div className="max-w-md lg:max-w-sm xl:max-w-md">
          <p className="mb-4 text-xs tracking-label text-gold-dark uppercase">{banner.eyebrow}</p>
          <h1 className="text-3xl leading-tight sm:text-4xl xl:text-5xl">{banner.heading}</h1>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">{banner.subtext}</p>
          <Button asChild className="mt-8">
            <Link href={banner.cta.href}>{banner.cta.label}</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
