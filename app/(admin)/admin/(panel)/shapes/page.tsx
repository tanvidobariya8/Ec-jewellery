import type { Metadata } from "next";

import { ShapesManager } from "@/components/admin/ShapesManager";

export const metadata: Metadata = { title: "Stone shapes" };

export default function AdminShapesPage() {
  return <ShapesManager />;
}
