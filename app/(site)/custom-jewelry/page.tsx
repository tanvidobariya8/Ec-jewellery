import type { Metadata } from "next";

import { ComingSoon } from "@/components/content/ComingSoon";

export const metadata: Metadata = {
  title: "Custom Jewellery",
  description:
    "Turn your sketches or reference photos into handcrafted fine jewellery with a free CAD consultation.",
};

// TODO(Phase 5): inquiry form with reference image upload (react-hook-form + zod + react-dropzone).
export default function CustomJewelryPage() {
  return (
    <ComingSoon
      eyebrow="Bespoke"
      title="Your Dream Ring, Custom Made."
      description="Send us your sketch or reference photos on WhatsApp for a free CAD consultation. Our online design form is coming soon."
      whatsappMessage="Hello, I would like a custom jewellery design."
    />
  );
}
