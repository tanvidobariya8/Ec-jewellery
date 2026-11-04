import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center">
      <Container className="py-24 text-center">
        <p className="text-xs tracking-label text-gold uppercase">404</p>
        <h1 className="mt-4 text-4xl">Page not found</h1>
        <p className="mt-4 text-sm text-muted">
          The page you are looking for doesn&apos;t exist or has moved.
        </p>
        <Button asChild className="mt-8">
          <Link href="/">Back to home</Link>
        </Button>
      </Container>
    </main>
  );
}
