import { ShoppingBag } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Shopping Bag",
  robots: { index: false },
};

// TODO(Phase 4): cart items from BE, totals, checkout button.
export default function CartPage() {
  return (
    <Container className="flex flex-col items-center py-24 text-center">
      <ShoppingBag aria-hidden="true" className="size-10 text-gold" strokeWidth={1.2} />
      <h1 className="mt-6 text-3xl sm:text-4xl">Your bag is empty</h1>
      <p className="mt-4 text-sm text-muted">
        Discover rings, earrings and more in lab-grown diamond and moissanite.
      </p>
      <Button asChild className="mt-8">
        <Link href="/shop">Continue shopping</Link>
      </Button>
    </Container>
  );
}
