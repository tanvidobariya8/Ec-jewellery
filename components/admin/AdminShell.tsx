"use client";

import { useQueryClient } from "@tanstack/react-query";
import { ExternalLink, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

import { AdminNav } from "@/components/admin/AdminNav";
import { QueryState } from "@/components/admin/QueryState";
import { Button } from "@/components/ui/Button";
import { useAdminSession } from "@/hooks/useAdminSession";
import { logout } from "@/lib/api/admin";
import { SITE } from "@/lib/constants";

/**
 * Admin frame: sidebar + session guard. Only decides what to show — the BE
 * rejects every admin call from a non-admin anyway.
 */
export function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const session = useAdminSession();

  useEffect(() => {
    if (session.signedOut) {
      router.replace(`/admin/login?next=${encodeURIComponent(pathname)}`);
    }
  }, [session.signedOut, pathname, router]);

  const signOut = async () => {
    await logout().catch(() => undefined);
    queryClient.clear();
    router.replace("/admin/login");
  };

  if (!session.data) {
    return (
      <main className="mx-auto w-full max-w-md px-4 py-24">
        <QueryState
          isPending={session.isPending || session.signedOut}
          error={session.signedOut ? null : session.error}
          onRetry={() => session.refetch()}
        />
      </main>
    );
  }

  if (session.data.role !== "ADMIN") {
    return (
      <main className="mx-auto w-full max-w-md space-y-6 px-4 py-24 text-center">
        <h1 className="text-3xl">No access</h1>
        <p className="text-sm text-muted">
          {session.data.email} is not an admin account. Sign in with an admin account.
        </p>
        <Button onClick={signOut}>Sign out</Button>
      </main>
    );
  }

  return (
    <div className="flex min-h-dvh flex-col lg:flex-row">
      <aside className="border-b border-border bg-surface lg:sticky lg:top-0 lg:h-dvh lg:w-64 lg:shrink-0 lg:border-r lg:border-b-0">
        <div className="flex items-center justify-between gap-4 px-4 py-4 lg:block lg:px-6 lg:py-8">
          <Link href="/admin" className="font-serif text-xl text-primary">
            {SITE.shortName} Admin
          </Link>
          <p className="hidden truncate text-xs text-muted lg:mt-1 lg:block">
            {session.data.email}
          </p>
        </div>
        <AdminNav />
        <div className="hidden gap-1 px-3 pb-6 lg:mt-6 lg:flex lg:flex-col">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-3 py-2 text-sm text-muted hover:text-primary"
          >
            <ExternalLink aria-hidden="true" className="size-4" /> View store
          </Link>
          <button
            type="button"
            onClick={signOut}
            className="flex items-center gap-2 px-3 py-2 text-left text-sm text-muted hover:text-primary"
          >
            <LogOut aria-hidden="true" className="size-4" /> Sign out
          </button>
        </div>
      </aside>
      <main className="min-w-0 flex-1 px-4 py-8 sm:px-8 lg:py-12">{children}</main>
    </div>
  );
}
