import { Search, ShoppingBag, User } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

const iconLinkClasses =
  "inline-flex size-10 items-center justify-center text-foreground transition-colors hover:text-primary";

type HeaderActionsProps = {
  className?: string;
};

export function HeaderActions({ className }: HeaderActionsProps) {
  return (
    <div className={cn("flex items-center", className)}>
      <Link
        href="/shop"
        aria-label="Search jewellery"
        className={cn(iconLinkClasses, "max-md:hidden")}
      >
        <Search aria-hidden="true" className="size-5" strokeWidth={1.5} />
      </Link>
      <Link
        href="/account"
        aria-label="My account"
        className={cn(iconLinkClasses, "max-md:hidden")}
      >
        <User aria-hidden="true" className="size-5" strokeWidth={1.5} />
      </Link>
      {/* Phase 4: show cart item count badge from the cart store. */}
      <Link href="/cart" aria-label="Shopping bag" className={iconLinkClasses}>
        <ShoppingBag aria-hidden="true" className="size-5" strokeWidth={1.5} />
      </Link>
    </div>
  );
}
