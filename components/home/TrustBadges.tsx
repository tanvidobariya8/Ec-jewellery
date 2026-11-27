import { Gem, Globe, HandHeart, RotateCcw } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { OUR_PROMISE } from "@/lib/mock/home";

const ICONS = {
  origin: Gem,
  handmade: HandHeart,
  shipping: Globe,
  returns: RotateCcw,
} as const;

/** "Our promise": four centred columns (icon, title, text) just above the footer. */
export function TrustBadges() {
  return (
    <section aria-label={OUR_PROMISE.heading} className="bg-background py-16">
      <Container>
        <SectionHeading title={OUR_PROMISE.heading} />
        <ul className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {OUR_PROMISE.items.map(({ icon, title, body }) => {
            const Icon = ICONS[icon];
            return (
              <li key={title} className="flex flex-col items-center text-center">
                <span className="mb-5 flex size-16 items-center justify-center rounded-full bg-section">
                  <Icon aria-hidden="true" className="size-7 text-primary" strokeWidth={1.5} />
                </span>
                <h3 className="mb-2 font-serif text-lg text-primary">{title}</h3>
                <p className="max-w-xs text-sm leading-relaxed text-muted">{body}</p>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
