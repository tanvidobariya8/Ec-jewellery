import { CONTACT, LEAD_TIMES } from "@/lib/constants";
import type { PolicyPage } from "@/types/content";

/*
 * TODO(client): these are working drafts built from the client brief.
 * Replace with client-approved legal text before launch.
 */
export const POLICIES: PolicyPage[] = [
  {
    slug: "shipping",
    title: "Shipping Policy",
    summary: "Insured worldwide express delivery from our India and Germany offices.",
    sections: [
      {
        heading: "Production time",
        paragraphs: [
          `Every piece is made to order. Crafting takes ${LEAD_TIMES.craftingDays} from order confirmation (or from CAD approval for custom designs).`,
        ],
      },
      {
        heading: "Delivery time",
        paragraphs: [
          `Once dispatched, worldwide express insured delivery takes ${LEAD_TIMES.deliveryDays}. You will receive a tracking link by email and SMS when your order ships.`,
        ],
      },
      {
        heading: "Insurance",
        paragraphs: ["All shipments are fully insured until they are delivered and signed for."],
      },
    ],
  },
  {
    slug: "returns",
    title: "30-Day Returns",
    summary: "Return eligible pieces within 30 days of delivery.",
    sections: [
      {
        heading: "Eligibility",
        paragraphs: [
          "You may return eligible items within 30 days of delivery, unworn and in their original condition and packaging, together with any certificates.",
        ],
      },
      {
        heading: "How to start a return",
        paragraphs: [
          `Contact us at ${CONTACT.email} or on WhatsApp at ${CONTACT.phoneDisplay} with your order number. We will send you return instructions.`,
        ],
      },
      {
        heading: "Exceptions",
        paragraphs: [
          "Custom-designed, engraved or resized pieces may not be eligible for return. Details will be confirmed before your order is placed.",
        ],
      },
    ],
  },
  {
    slug: "privacy",
    title: "Privacy Policy",
    summary: "How we collect, use and protect your personal data.",
    sections: [
      {
        heading: "What we collect",
        paragraphs: [
          "We collect the information you give us when you place an order, create an account, request a custom design or contact us — such as your name, email, phone number, shipping address and any reference images you upload.",
        ],
      },
      {
        heading: "How we use it",
        paragraphs: [
          "We use your data to process orders, send order, CAD and shipping updates by email and SMS, and to answer your questions. We do not sell your data.",
        ],
      },
      {
        heading: "Your rights",
        paragraphs: [
          `Customers in the EU and elsewhere can request access to, correction of, or deletion of their personal data by emailing ${CONTACT.email}.`,
        ],
      },
    ],
  },
  {
    slug: "terms",
    title: "Terms of Service",
    summary: "The terms that apply when you use this website and place an order.",
    sections: [
      {
        heading: "Orders",
        paragraphs: [
          "All orders are subject to acceptance and availability. Prices are confirmed at checkout in your selected currency.",
        ],
      },
      {
        heading: "Custom work",
        paragraphs: [
          "Custom designs go into production only after you approve the CAD design. Changes after approval may affect price and delivery time.",
        ],
      },
      {
        heading: "Contact",
        paragraphs: [`Questions about these terms can be sent to ${CONTACT.email}.`],
      },
    ],
  },
];

export function getPolicy(slug: string) {
  return POLICIES.find((policy) => policy.slug === slug);
}
