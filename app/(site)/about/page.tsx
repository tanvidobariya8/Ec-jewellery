import type { Metadata } from "next";

import { PageHeader } from "@/components/content/PageHeader";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { OFFICES } from "@/lib/constants";
import { ABOUT, TEAM_GROUPS, USPS } from "@/lib/mock/about";

export const metadata: Metadata = {
  title: "About & Sustainability",
  description: ABOUT.intro,
};

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="Our story" title="About & Sustainability" description={ABOUT.intro} />

      <Container className="grid gap-12 py-16 md:grid-cols-3">
        {[
          { title: "Our history", body: ABOUT.history },
          { title: "Our mission", body: ABOUT.mission },
          { title: "Our vision", body: ABOUT.vision },
        ].map((item) => (
          <section key={item.title}>
            <h2 className="text-2xl">{item.title}</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">{item.body}</p>
          </section>
        ))}
      </Container>

      <section className="bg-surface/40 py-16">
        <Container>
          <SectionHeading eyebrow="Why lab-grown" title="Brilliance without compromise" />
          <ul className="grid gap-8 md:grid-cols-3">
            {USPS.map((usp) => (
              <li key={usp.title} className="border-t border-gold/40 pt-6 text-center">
                <h3 className="text-xl">{usp.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{usp.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <SectionHeading eyebrow="Our atelier" title="The people behind every piece" />
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM_GROUPS.map((group) => (
              <li key={group.title} className="border border-border p-6">
                <h3 className="text-xl">{group.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{group.description}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-t border-border py-16">
        <Container>
          <SectionHeading eyebrow="Global presence" title="India & Germany" />
          <ul className="grid gap-8 md:grid-cols-2">
            {OFFICES.map((office) => (
              <li key={office.country} className="bg-surface/40 p-8 text-center">
                <h3 className="text-2xl">{office.country}</h3>
                <p className="mt-2 text-xs tracking-label text-gold-dark uppercase">
                  {office.city}
                </p>
                <p className="mt-4 text-sm text-muted">{office.role}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
