"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { NavigationMenu } from "radix-ui";

import { cn } from "@/lib/utils";
import type { NavItem } from "@/types/content";

const LINK_CLASS =
  "text-xs tracking-label text-foreground uppercase transition-colors duration-300 hover:text-primary";

/** Desktop main nav. Items with `children` open a dropdown on hover / click / keyboard. */
export function MainNav({ items }: { items: NavItem[] }) {
  return (
    <NavigationMenu.Root aria-label="Main" className="border-y border-border max-md:hidden">
      <NavigationMenu.List className="flex items-center justify-center gap-10 py-3.5">
        {items.map((item) => (
          <NavigationMenu.Item key={item.label} className="relative">
            {item.children ? (
              <>
                <NavigationMenu.Trigger
                  className={cn(
                    LINK_CLASS,
                    "group inline-flex items-center gap-1 data-[state=open]:text-primary",
                  )}
                >
                  {item.label}
                  <ChevronDown
                    aria-hidden="true"
                    className="size-3 transition-transform duration-300 group-data-[state=open]:rotate-180"
                  />
                </NavigationMenu.Trigger>
                <NavigationMenu.Content className="absolute top-full left-1/2 z-50 mt-3.5 min-w-52 -translate-x-1/2 border border-border bg-background py-2 shadow-sm">
                  <ul>
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <NavigationMenu.Link asChild>
                          <Link
                            href={child.href}
                            className="block px-5 py-2.5 text-xs tracking-label whitespace-nowrap text-foreground uppercase transition-colors duration-300 hover:bg-surface hover:text-primary"
                          >
                            {child.label}
                          </Link>
                        </NavigationMenu.Link>
                      </li>
                    ))}
                  </ul>
                </NavigationMenu.Content>
              </>
            ) : (
              <NavigationMenu.Link asChild>
                <Link href={item.href} className={LINK_CLASS}>
                  {item.label}
                </Link>
              </NavigationMenu.Link>
            )}
          </NavigationMenu.Item>
        ))}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}
