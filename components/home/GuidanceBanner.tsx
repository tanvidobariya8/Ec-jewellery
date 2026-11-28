import { Phone } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CONTACT, whatsappLink } from "@/lib/constants";
import { GUIDANCE_BANNER } from "@/lib/mock/home";

/**
 * Full-width green band: "Get personalized guidance" copy with a virtual-appointment button
 * (opens WhatsApp with a booking message) and the phone number, beside two photos.
 */
export function GuidanceBanner() {
  return (
    <section
      aria-labelledby="guidance-heading"
      className="bg-primary py-12 text-primary-foreground"
    >
      <Container className="grid items-center gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-14">
        <div>
          <h2 id="guidance-heading" className="text-3xl text-primary-foreground sm:text-4xl">
            {GUIDANCE_BANNER.heading}
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-primary-foreground/80">
            {GUIDANCE_BANNER.subtext}
          </p>
          <div className="mt-7 flex flex-col items-start gap-3">
            <Button asChild variant="light">
              <a
                href={whatsappLink(GUIDANCE_BANNER.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {GUIDANCE_BANNER.ctaLabel}
              </a>
            </Button>
            <a
              href={CONTACT.phoneHref}
              className="inline-flex h-11 items-center gap-2 border border-primary-foreground/60 px-7 text-sm tracking-wide text-primary-foreground transition-colors duration-300 hover:bg-primary-foreground hover:text-primary"
            >
              <Phone aria-hidden="true" className="size-4" strokeWidth={1.5} />
              {CONTACT.phoneDisplay}
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {GUIDANCE_BANNER.images.map((image) => (
            <div key={image.src} className="relative aspect-16/9 overflow-hidden bg-surface">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 33vw, 50vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
