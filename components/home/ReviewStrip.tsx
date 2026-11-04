import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stars } from "@/components/ui/Stars";
import type { Review } from "@/types/content";

type ReviewStripProps = {
  reviews: Review[];
};

export function ReviewStrip({ reviews }: ReviewStripProps) {
  return (
    <section className="py-16">
      <Container>
        <SectionHeading eyebrow="Reviews" title="Loved around the world" />
        <ul className="grid gap-6 md:grid-cols-3">
          {reviews.map((review) => (
            <li key={review.id}>
              <figure className="flex h-full flex-col border border-border bg-white/50 p-8">
                <Stars rating={review.rating} />
                <blockquote className="mt-5 flex-1 font-serif text-lg leading-relaxed text-foreground">
                  “{review.body}”
                </blockquote>
                <figcaption className="mt-6 text-xs tracking-label text-muted uppercase">
                  {review.author}
                  {review.product && <span className="mt-1 block text-gold">{review.product}</span>}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
