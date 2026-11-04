import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { CONTACT, FOOTER_NAV, OFFICES, SITE, whatsappLink } from "@/lib/constants";

import { CurrentYear } from "@/components/layout/CurrentYear";
import { Logo } from "@/components/layout/Logo";

/** Note: no social media links by client requirement (brief §12). */
export function Footer() {
  return (
    <footer className="no-print border-t border-border bg-surface/40">
      <Container className="grid gap-12 py-16 lg:grid-cols-[1.2fr_2fr]">
        <div className="space-y-6">
          <Logo />
          <p className="max-w-sm text-sm leading-relaxed text-muted">{SITE.description}</p>
          <ul className="space-y-3 text-sm">
            <li>
              <a href={CONTACT.phoneHref} className="flex items-center gap-3 hover:text-primary">
                <Phone aria-hidden="true" className="size-4 text-gold" />
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
                <MessageCircle aria-hidden="true" className="size-4 text-gold" />
                WhatsApp consultation
              </a>
            </li>
            <li>
              <a
                href={CONTACT.emailHref}
                className="flex items-center gap-3 break-all hover:text-primary"
              >
                <Mail aria-hidden="true" className="size-4 shrink-0 text-gold" />
                {CONTACT.email}
              </a>
            </li>
            {OFFICES.map((office) => (
              <li key={office.country} className="flex items-start gap-3 text-muted">
                <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-gold" />
                <span>
                  <span className="text-foreground">{office.country}</span> — {office.role}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {FOOTER_NAV.map((group) => (
            <div key={group.title}>
              <h2 className="mb-4 font-sans text-xs tracking-label text-gold uppercase">
                {group.title}
              </h2>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </Container>

      <div className="border-t border-border">
        <Container className="py-6 text-center text-xs text-muted">
          © <CurrentYear /> {SITE.name}. All rights reserved.
        </Container>
      </div>
    </footer>
  );
}
