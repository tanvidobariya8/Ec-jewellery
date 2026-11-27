import { BadgeCheck, Gem, HandHeart, Leaf, PiggyBank, Sparkles } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WHY_LAB_GROWN } from "@/lib/mock/home";

const ICONS = {
  gem: Gem,
  budget: PiggyBank,
  certified: BadgeCheck,
  ethical: HandHeart,
  planet: Leaf,
  handmade: Sparkles,
} as const;

/** "Why lab-grown": six benefit columns (icon, title, text) and a link to the diamond guide. */
export function WhyLabGrown() {
  return (
    <section aria-label={WHY_LAB_GROWN.eyebrow} className="bg-section py-12">
      <Container>
        <SectionHeading
          title={WHY_LAB_GROWN.heading}
          eyebrow={WHY_LAB_GROWN.eyebrow}
          className="mb-8"
        />
        <ul className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-3 lg:grid-cols-6">
          {WHY_LAB_GROWN.benefits.map(({ icon, title, body }) => {
            const Icon = ICONS[icon];
            return (
              <li key={title}>
                <span className="mb-3 flex size-11 items-center justify-center rounded-full bg-background">
                  <Icon aria-hidden="true" className="size-5 text-primary" strokeWidth={1.5} />
                </span>
                <h3 className="mb-1 font-serif text-lg leading-snug text-primary">{title}</h3>
                <p className="text-sm leading-relaxed text-muted">{body}</p>
              </li>
            );
          })}
        </ul>
        <div className="mt-8 text-center">
          <Button asChild variant="outline">
            <Link href={WHY_LAB_GROWN.cta.href}>{WHY_LAB_GROWN.cta.label}</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
