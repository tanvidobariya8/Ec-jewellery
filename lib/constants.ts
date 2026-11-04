import type { Category, CurrencyCode, Metal, Shape, StoneType } from "@/types/catalog";
import type { NavGroup, NavItem, Office } from "@/types/content";

/* ------------------------------------------------------------------ */
/* Brand & contact (client brief §1, §3)                              */
/* ------------------------------------------------------------------ */

export const SITE = {
  name: "Eco Friendly Jewellery",
  shortName: "EcFriendly",
  description:
    "Ethical, conflict-free lab-grown diamond and moissanite fine jewellery, handcrafted in India and delivered worldwide from India & Germany.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  announcement: "Lab-grown diamonds & moissanite · Shipping from India & Germany",
} as const;

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "918487008481";

export const CONTACT = {
  phoneDisplay: "+91 84870 08481",
  phoneHref: "tel:+918487008481",
  email: "jewelleryecofriendly@gmail.com",
  emailHref: "mailto:jewelleryecofriendly@gmail.com",
  whatsappHref: `https://wa.me/${WHATSAPP_NUMBER}`,
  whatsappMessage: "Hello Eco Friendly Jewellery, I would like to know more about your jewellery.",
} as const;

export function whatsappLink(message: string = CONTACT.whatsappMessage) {
  return `${CONTACT.whatsappHref}?text=${encodeURIComponent(message)}`;
}

// TODO(client): full street addresses for both offices.
export const OFFICES: Office[] = [
  {
    country: "India",
    city: "Surat / Mumbai",
    role: "Manufacturing, cutting & dispatch",
  },
  {
    country: "Germany",
    city: "Germany",
    role: "European operations & client relations",
  },
];

/* ------------------------------------------------------------------ */
/* Navigation — NOT FINAL (draft mockup). Change items here only.     */
/* ------------------------------------------------------------------ */

export const MAIN_NAV: NavItem[] = [
  { label: "Best Sellers", href: "/shop?sort=best-sellers" },
  { label: "Rings", href: "/shop/rings" },
  { label: "Chains", href: "/shop/chains" },
  { label: "Earrings", href: "/shop/earrings" },
  { label: "Bracelets", href: "/shop/bracelets" },
];

export const FOOTER_NAV: NavGroup[] = [
  {
    title: "Shop",
    links: [
      { label: "All Jewellery", href: "/shop" },
      { label: "Engagement Rings", href: "/shop/engagement-rings" },
      { label: "Wedding Bands", href: "/shop/wedding-bands" },
      { label: "Earrings", href: "/shop/earrings" },
      { label: "Custom Jewellery", href: "/custom-jewelry" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "FAQs", href: "/faq" },
      { label: "Ring Size Guide", href: "/ring-size" },
      { label: "Diamond Guide", href: "/education" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About & Sustainability", href: "/about" },
      { label: "Journal", href: "/blog" },
    ],
  },
  {
    title: "Policies",
    links: [
      { label: "Shipping Policy", href: "/policies/shipping" },
      { label: "30-Day Returns", href: "/policies/returns" },
      { label: "Privacy Policy", href: "/policies/privacy" },
      { label: "Terms of Service", href: "/policies/terms" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Catalogue reference data (client brief §4)                         */
/* ------------------------------------------------------------------ */

export const CATEGORIES: Category[] = [
  { slug: "rings", name: "Rings" },
  { slug: "engagement-rings", name: "Engagement Rings" },
  { slug: "wedding-bands", name: "Wedding Bands" },
  { slug: "eternity-rings", name: "Eternity Rings" },
  { slug: "chains", name: "Chains" },
  { slug: "earrings", name: "Earrings" },
  { slug: "necklaces", name: "Necklaces" },
  { slug: "pendants", name: "Pendants" },
  { slug: "bracelets", name: "Bracelets" },
  { slug: "loose-stones", name: "Loose Stones" },
];

export const SHAPES: Shape[] = [
  { slug: "round", name: "Round" },
  { slug: "oval", name: "Oval" },
  { slug: "emerald", name: "Emerald" },
  { slug: "pear", name: "Pear" },
  { slug: "dutch-marquise", name: "Dutch Marquise" },
  { slug: "radiant", name: "Radiant" },
  { slug: "cushion", name: "Cushion" },
  { slug: "rose-cut", name: "Rose Cut" },
  { slug: "hexagon", name: "Hexagon" },
  { slug: "lozenge", name: "Lozenge" },
];

export const METALS: Metal[] = [
  { code: "10K_YELLOW", name: "10K Yellow Gold", purity: "41.7%" },
  { code: "10K_WHITE", name: "10K White Gold", purity: "41.7%" },
  { code: "10K_ROSE", name: "10K Rose Gold", purity: "41.7%" },
  { code: "14K_YELLOW", name: "14K Yellow Gold", purity: "58.5%" },
  { code: "14K_WHITE", name: "14K White Gold", purity: "58.5%" },
  { code: "14K_ROSE", name: "14K Rose Gold", purity: "58.5%" },
  { code: "18K_YELLOW", name: "18K Yellow Gold", purity: "75%" },
  { code: "18K_WHITE", name: "18K White Gold", purity: "75%" },
  { code: "18K_ROSE", name: "18K Rose Gold", purity: "75%" },
  { code: "PT950", name: "950 Platinum", purity: "95%" },
];

export const STONE_TYPES: StoneType[] = [
  { code: "LAB_DIAMOND", name: "Lab-Grown Diamond", grade: "Type IIa · IGI certified" },
  { code: "MOISSANITE", name: "Moissanite", grade: "VVS · DEF colour" },
];

/** US ring sizes 3–14 in quarter steps. */
export const RING_SIZES: number[] = Array.from({ length: 45 }, (_, i) => 3 + i * 0.25);

export const CURRENCIES: { code: CurrencyCode; label: string; symbol: string }[] = [
  { code: "INR", label: "INR", symbol: "₹" },
  { code: "EUR", label: "EUR", symbol: "€" },
  { code: "USD", label: "USD", symbol: "$" },
  { code: "GBP", label: "GBP", symbol: "£" },
];

export const DEFAULT_CURRENCY: CurrencyCode = "INR";

/** Production + delivery times (client brief §11 Q3). */
export const LEAD_TIMES = {
  craftingDays: "7–10 business days",
  deliveryDays: "4–7 business days",
} as const;
