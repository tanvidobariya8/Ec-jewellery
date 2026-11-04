import Link from "next/link";

import { MAIN_NAV } from "@/lib/constants";

export function MainNav() {
  return (
    <nav aria-label="Main" className="border-y border-border max-md:hidden">
      <ul className="flex items-center justify-center gap-10 py-3.5">
        {MAIN_NAV.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-xs tracking-label text-foreground uppercase transition-colors duration-300 hover:text-primary"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
