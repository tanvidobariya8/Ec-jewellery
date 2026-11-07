"use client";

import { Gem, LayoutDashboard, Layers, Package, Scale, Tags } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { ADMIN_NAV, type AdminHref } from "@/lib/constants";
import { cn } from "@/lib/utils";

const ICONS: Record<AdminHref, typeof Gem> = {
  "/admin": LayoutDashboard,
  "/admin/products": Package,
  "/admin/categories": Tags,
  "/admin/collections": Layers,
  "/admin/pricing": Scale,
  "/admin/stone-prices": Gem,
};

/** Sidebar links; scrolls horizontally on small screens. */
export function AdminNav() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/admin" ? pathname === href : pathname.startsWith(href);

  return (
    <nav aria-label="Admin" className="overflow-x-auto px-2 pb-2 lg:px-3 lg:pb-0">
      <ul className="flex gap-1 lg:flex-col">
        {ADMIN_NAV.map(({ href, label }) => {
          const Icon = ICONS[href];
          const active = isActive(href);
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 text-sm whitespace-nowrap transition-colors duration-300",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-surface-muted",
                )}
              >
                <Icon aria-hidden="true" className="size-4 shrink-0" />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
