import type { Metadata } from "next";

import { StonePricesManager } from "@/components/admin/StonePricesManager";

export const metadata: Metadata = { title: "Stone prices" };

export default function AdminStonePricesPage() {
  return <StonePricesManager />;
}
