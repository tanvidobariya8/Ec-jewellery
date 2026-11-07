import type { Metadata } from "next";

import { PricingManager } from "@/components/admin/PricingManager";

export const metadata: Metadata = { title: "Metal rates & margin" };

export default function AdminPricingPage() {
  return <PricingManager />;
}
