import { Suspense } from "react";

import { AdminShell } from "@/components/admin/AdminShell";

/**
 * Every signed-in admin screen (everything except /admin/login).
 * Suspense: the shell reads the URL (`usePathname`), which is request-time data.
 */
export default function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <AdminShell>{children}</AdminShell>
    </Suspense>
  );
}
