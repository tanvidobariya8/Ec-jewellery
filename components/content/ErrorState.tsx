import { RotateCcw } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { whatsappLink } from "@/lib/constants";

type ErrorStateProps = {
  onRetry: () => void;
  /** Server error id — lets support match the server log. */
  digest?: string;
};

/** Friendly fallback for unexpected errors (API down, timeouts…). */
export function ErrorState({ onRetry, digest }: ErrorStateProps) {
  return (
    <Container className="py-24 text-center">
      <p className="text-xs tracking-label text-gold-dark uppercase">Something went wrong</p>
      <h1 className="mt-4 text-3xl sm:text-4xl">We couldn&apos;t load this page</h1>
      <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted">
        This is usually temporary. Please try again in a moment — or message us and we will help you
        directly.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Button type="button" onClick={onRetry}>
          <RotateCcw aria-hidden="true" className="size-4" />
          Try again
        </Button>
        <Button asChild variant="outline">
          <Link href="/">Back to home</Link>
        </Button>
        <Button asChild variant="link">
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
            Ask us on WhatsApp
          </a>
        </Button>
      </div>
      {digest && <p className="mt-10 text-[10px] text-muted/70">Error reference: {digest}</p>}
    </Container>
  );
}
