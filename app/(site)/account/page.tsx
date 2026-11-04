import type { Metadata } from "next";

import { ComingSoon } from "@/components/content/ComingSoon";

export const metadata: Metadata = {
  title: "My Account",
  robots: { index: false },
};

// TODO(Phase 4): OTP / email login, orders, tracking, CAD approvals.
export default function AccountPage() {
  return (
    <ComingSoon
      eyebrow="Account"
      title="Customer accounts are coming soon"
      description="Soon you will be able to track orders and approve CAD designs here. For order updates now, message us on WhatsApp."
      whatsappMessage="Hello, I would like an update on my order."
    />
  );
}
