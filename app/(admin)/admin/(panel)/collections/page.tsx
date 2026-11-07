import type { Metadata } from "next";

import { CollectionsManager } from "@/components/admin/CollectionsManager";

export const metadata: Metadata = { title: "Collections" };

export default function AdminCollectionsPage() {
  return <CollectionsManager />;
}
