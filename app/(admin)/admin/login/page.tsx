import type { Metadata } from "next";
import { Suspense } from "react";

import { LoginForm } from "@/components/admin/LoginForm";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = { title: "Sign in" };

export default function AdminLoginPage() {
  return (
    <main className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center px-4 py-24">
      <p className="text-xs tracking-label text-gold-dark uppercase">{SITE.name}</p>
      <h1 className="mt-2 mb-8 text-4xl">Admin sign in</h1>
      <Suspense>
        <LoginForm />
      </Suspense>
    </main>
  );
}
