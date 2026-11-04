import { MessageCircle } from "lucide-react";

import { whatsappLink } from "@/lib/constants";

/** Persistent floating WhatsApp chat trigger (client brief §15). */
export function WhatsAppButton() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="no-print fixed right-4 bottom-4 z-40 inline-flex size-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg transition-transform duration-300 hover:scale-105 sm:right-6 sm:bottom-6"
    >
      <MessageCircle aria-hidden="true" className="size-7" />
    </a>
  );
}
