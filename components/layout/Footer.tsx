import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { CONTACT, FOOTER_NAV, OFFICES, SITE, whatsappLink } from "@/lib/constants";

import { CurrentYear } from "@/components/layout/CurrentYear";
import { Logo } from "@/components/layout/Logo";

/** Note: no social media links by client requirement (brief §12). */
export function Footer() {
  return (
    <footer className="no-print bg-primary text-primary-foreground">
      <Container className="grid gap-12 py-16 lg:grid-cols-[1.2fr_2fr]">
        <div className="space-y-6">
          <Logo className="[&_img]:brightness-0 [&_img]:invert" />
          <p className="max-w-sm text-sm leading-relaxed text-primary-foreground/75">
            {SITE.description}
          </p>
          <ul className="space-y-3 text-sm">
            <li>
              <a href={CONTACT.phoneHref} className="flex items-center gap-3 hover:text-gold-light">
                <Phone aria-hidden="true" className="size-4 text-gold-light" />
                {CONTACT.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-gold-light"
              >
                <MessageCircle aria-hidden="true" className="size-4 text-gold-light" />
                WhatsApp consultation
              </a>
            </li>
            <li>
              <a
                href={CONTACT.emailHref}
                className="flex items-center gap-3 break-all hover:text-gold-light"
              >
                <Mail aria-hidden="true" className="size-4 shrink-0 text-gold-light" />
                {CONTACT.email}
              </a>
            </li>
            {OFFICES.map((office) => (
              <li
                key={office.country}
                className="flex items-start gap-3 text-primary-foreground/75"
              >
                <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-gold-light" />
                <span>
                  <span className="text-primary-foreground">{office.country}</span> — {office.role}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {FOOTER_NAV.map((group) => (
            <div key={group.title}>
              <h2 className="mb-4 font-sans text-xs tracking-label text-gold-light uppercase">
                {group.title}
              </h2>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-primary-foreground/75 transition-colors hover:text-gold-light"
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

      <div className="border-t border-primary-foreground/15">
        <Container className="py-6 text-center text-xs text-primary-foreground/60">
          © <CurrentYear /> {SITE.name}. All rights reserved.
        </Container>
      </div>
    </footer>
  );
}
