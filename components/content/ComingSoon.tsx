import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { whatsappLink } from "@/lib/constants";

type ComingSoonProps = {
  title: string;
  description: string;
  eyebrow?: string;
  whatsappMessage?: string;
};

/**
 * Temporary page body for routes built in later phases, so no link on the site is dead.
 * Replace each usage when the real page is built.
 */
export function ComingSoon({ title, description, eyebrow, whatsappMessage }: ComingSoonProps) {
  return (
    <Container className="py-24">
      <SectionHeading as="h1" eyebrow={eyebrow} title={title} description={description} />
      <div className="flex flex-wrap justify-center gap-4">
        <Button asChild>
          <a href={whatsappLink(whatsappMessage)} target="_blank" rel="noopener noreferrer">
            Ask us on WhatsApp
          </a>
        </Button>
        <Button asChild variant="outline">
          <Link href="/contact">Contact us</Link>
        </Button>
      </div>
    </Container>
  );
}
