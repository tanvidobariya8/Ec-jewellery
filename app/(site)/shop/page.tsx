import type { Metadata } from "next";

import { ComingSoon } from "@/components/content/ComingSoon";

export const metadata: Metadata = {
  title: "Shop All Jewellery",
  description: "Lab-grown diamond and moissanite rings, earrings, chains and bracelets.",
};

// TODO(Phase 2): product grid with carat, stone, shape, metal and price filters (nuqs).
export default function ShopPage() {
  return (
    <ComingSoon
      eyebrow="Shop"
      title="Our collection is launching soon"
      description="We are photographing our first collection. Meanwhile, tell us what you are looking for and we will share designs and prices directly."
    />
  );
}
