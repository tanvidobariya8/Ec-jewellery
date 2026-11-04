"use client";

import { Menu, MessageCircle, X } from "lucide-react";
import Link from "next/link";
import { Dialog } from "radix-ui";
import { useState } from "react";

import { CurrencySwitcher } from "@/components/layout/CurrencySwitcher";
import { CONTACT, MAIN_NAV, whatsappLink } from "@/lib/constants";

const SECONDARY_LINKS = [
  { label: "Custom Jewellery", href: "/custom-jewelry" },
  { label: "About Us", href: "/about" },
  { label: "Diamond Guide", href: "/education" },
  { label: "Ring Size Guide", href: "/ring-size" },
  { label: "Contact", href: "/contact" },
  { label: "My Account", href: "/account" },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        aria-label="Open menu"
        className="inline-flex size-10 items-center justify-center text-foreground md:hidden"
      >
        <Menu aria-hidden="true" className="size-5" strokeWidth={1.5} />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-foreground/30" />
        <Dialog.Content className="fixed inset-y-0 left-0 z-50 flex w-[85vw] max-w-sm flex-col overflow-y-auto bg-background p-6">
          <div className="mb-8 flex items-center justify-between">
            <Dialog.Title className="text-xs tracking-label text-gold uppercase">Menu</Dialog.Title>
            <Dialog.Close
              aria-label="Close menu"
              className="inline-flex size-10 items-center justify-center"
            >
              <X aria-hidden="true" className="size-5" strokeWidth={1.5} />
            </Dialog.Close>
          </div>
          <Dialog.Description className="sr-only">Site navigation</Dialog.Description>

          <nav aria-label="Mobile">
            <ul className="space-y-1 border-b border-border pb-6">
              {MAIN_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={close}
                    className="block py-2 font-serif text-2xl text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="space-y-1 py-6">
              {SECONDARY_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={close}
                    className="block py-2 text-xs tracking-label text-foreground uppercase"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto space-y-4 border-t border-border pt-6">
            <CurrencySwitcher />
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-primary"
            >
              <MessageCircle aria-hidden="true" className="size-4" />
              {CONTACT.phoneDisplay}
            </a>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
