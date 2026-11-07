import type { Metadata } from "next";

import { SITE } from "@/lib/constants";

/** Admin area: own look, never indexed (also disallowed in `app/robots.ts`). */
export const metadata: Metadata = {
  title: { default: "Admin", template: `%s | ${SITE.shortName} Admin` },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-1 flex-col bg-background">{children}</div>;
}
