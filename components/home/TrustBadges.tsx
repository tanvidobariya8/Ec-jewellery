import { BadgeCheck, Leaf, RotateCcw, ShieldCheck, Truck } from "lucide-react";

import { Container } from "@/components/ui/Container";

const BADGES = [
  { icon: BadgeCheck, label: "IGI / SGL certified" },
  { icon: Leaf, label: "Conflict-free & ethical" },
  { icon: Truck, label: "Insured worldwide shipping" },
  { icon: RotateCcw, label: "30-day returns" },
  { icon: ShieldCheck, label: "Secure checkout" },
] as const;

export function TrustBadges() {
  return (
    <section aria-label="Why shop with us" className="border-t border-border bg-surface/40">
      <Container>
        <ul className="grid grid-cols-2 gap-6 py-10 sm:grid-cols-3 lg:grid-cols-5">
          {BADGES.map(({ icon: Icon, label }) => (
            <li key={label} className="flex flex-col items-center gap-3 text-center">
              <Icon aria-hidden="true" className="size-6 text-gold" strokeWidth={1.3} />
              <span className="text-[11px] tracking-label text-foreground uppercase">{label}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
