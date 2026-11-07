import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export const metadata: Metadata = { title: "Dashboard" };

const SECTIONS = [
  {
    href: "/admin/products",
    title: "Products",
    text: "Add products, upload photos and videos, choose metals and stone options.",
  },
  {
    href: "/admin/pricing",
    title: "Metal rates & margin",
    text: "Update today's gold and platinum rate per gram, margin and GST. All prices follow.",
  },
  {
    href: "/admin/stone-prices",
    title: "Stone prices",
    text: "Price per carat for lab-grown diamonds and moissanite, by shape and carat range.",
  },
  {
    href: "/admin/categories",
    title: "Categories",
    text: "Shop menu categories and sub-categories with their images.",
  },
  { href: "/admin/collections", title: "Collections", text: "Group products into collections." },
] as const;

export default function AdminDashboardPage() {
  return (
    <>
      <AdminPageHeader
        title="Dashboard"
        description="Manage the catalogue and pricing here — no database edits needed."
      />
      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {SECTIONS.map((section) => (
          <li key={section.href}>
            <Link
              href={section.href}
              className="group flex h-full flex-col border border-border bg-white/50 p-6 transition-colors duration-300 hover:border-primary"
            >
              <h2 className="text-2xl">{section.title}</h2>
              <p className="mt-2 flex-1 text-sm text-muted">{section.text}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-xs tracking-label text-primary uppercase">
                Open <ArrowRight aria-hidden="true" className="size-3" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
