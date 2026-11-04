import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import type { Metadata } from "next";

import { PageHeader } from "@/components/content/PageHeader";
import { ContactForm } from "@/components/forms/ContactForm";
import { Container } from "@/components/ui/Container";
import { CONTACT, OFFICES, whatsappLink } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Eco Friendly Jewellery by phone, WhatsApp or email. Offices in India and Germany.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="We're here to help"
        title="Contact Us"
        description="Questions about a design, sizing or a custom piece? Send us a message or chat with us on WhatsApp."
      />
      <Container className="grid gap-16 py-16 lg:grid-cols-[1fr_1.4fr]">
        <aside className="space-y-8">
          <ul className="space-y-5 text-sm">
            <li>
              <a href={CONTACT.phoneHref} className="flex items-center gap-3 hover:text-primary">
                <Phone aria-hidden="true" className="size-5 text-gold" />
                {CONTACT.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-primary"
              >
                <MessageCircle aria-hidden="true" className="size-5 text-gold" />
                Live WhatsApp order consultation
              </a>
            </li>
            <li>
              <a
                href={CONTACT.emailHref}
                className="flex items-center gap-3 break-all hover:text-primary"
              >
                <Mail aria-hidden="true" className="size-5 shrink-0 text-gold" />
                {CONTACT.email}
              </a>
            </li>
          </ul>
          <div className="space-y-6 border-t border-border pt-8">
            {OFFICES.map((office) => (
              <div key={office.country} className="flex gap-3">
                <MapPin aria-hidden="true" className="mt-1 size-5 shrink-0 text-gold" />
                <div>
                  <h2 className="text-xl">{office.country} office</h2>
                  <p className="mt-1 text-sm text-muted">{office.city}</p>
                  <p className="text-sm text-muted">{office.role}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>
        <section aria-label="Contact form">
          <ContactForm />
        </section>
      </Container>
    </>
  );
}
