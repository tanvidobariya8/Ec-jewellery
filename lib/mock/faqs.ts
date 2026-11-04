import { LEAD_TIMES } from "@/lib/constants";
import type { Faq } from "@/types/content";

/** FAQs — client brief §11. */
export const FAQS: Faq[] = [
  {
    id: "lab-grown-real",
    question: "Are lab-grown diamonds real diamonds?",
    answer:
      "Yes. Lab-grown diamonds are chemically, physically and optically identical to mined diamonds, and are certified by leading gemological institutes.",
  },
  {
    id: "certificates",
    question: "Do your rings come with gemological certificates?",
    answer: "Yes. All primary center stones come with authentic certification (IGI / SGL).",
  },
  {
    id: "lead-time",
    question: "How long does production and shipping take?",
    answer: `Crafting takes ${LEAD_TIMES.craftingDays}; worldwide express insured delivery takes ${LEAD_TIMES.deliveryDays}.`,
  },
  {
    id: "custom-design",
    question: "Can I order a completely custom design?",
    answer:
      "Yes. Upload your images or sketches on our Custom Jewellery page for a free CAD consultation.",
  },
];
