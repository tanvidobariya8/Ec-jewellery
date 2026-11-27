import type { Metadata } from "next";

import { StylesManager } from "@/components/admin/StylesManager";

export const metadata: Metadata = { title: "Ring styles" };

export default function AdminStylesPage() {
  return <StylesManager />;
}
