import type { Category, CurrencyCode, Metal, Shape, ShapeSlug, StoneType } from "@/types/catalog";
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

// TODO(client): DUMMY number — replace with the real phone/WhatsApp number before launch.
// Change it here only (digits with country code, no "+"), plus the display text below.
const PHONE_NUMBER = "910000000000";
const PHONE_DISPLAY = "+91 00000 00000";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? PHONE_NUMBER;

export const CONTACT = {
  phoneDisplay: PHONE_DISPLAY,
  phoneHref: `tel:+${PHONE_NUMBER}`,
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
  { label: "Chain & Pendant", href: "/shop/chains" },
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
  { slug: "chains", name: "Chain & Pendant" },
  { slug: "earrings", name: "Earrings" },
  { slug: "necklaces", name: "Necklaces" },
  { slug: "bracelets", name: "Bracelets" },
  { slug: "loose-stones", name: "Loose Stones" },
];

/** Shape grid fallback (matches the BE seed) for when the API is down. */
export const SHAPES: Shape[] = (
  [
    [
      "dutch-marquise",
      "Dutch Marquise",
      "An elongated marquise with angular, step-cut tips for a modern, architectural sparkle.",
    ],
    [
      "marquise",
      "Marquise",
      "The classic boat shaped cut maximizes sparkle and creates a flattering, lengthening effect on the finger.",
    ],
    [
      "oval",
      "Oval",
      "A brilliant, elongated round that looks larger for its carat weight and slims the finger.",
    ],
    [
      "cushion",
      "Cushion",
      "Soft rounded corners and large facets give a romantic, pillow-like glow.",
    ],
    ["pear", "Pear", "Part round, part marquise: a graceful teardrop that elongates the hand."],
    [
      "radiant",
      "Radiant",
      "Trimmed corners with brilliant faceting for fiery sparkle in a rectangular outline.",
    ],
    [
      "emerald",
      "Emerald",
      "Long step-cut facets create a hall-of-mirrors effect with elegant, clean lines.",
    ],
    ["round", "Round", "The timeless brilliant cut, engineered for maximum fire and brilliance."],
    [
      "rose-cut",
      "Rose Cut",
      "A flat base and domed, triangular facets give a soft, candlelit antique glow.",
    ],
    [
      "old-cut",
      "Old Cut",
      "Inspired by hand-cut antique stones: chunky facets, a high crown and vintage charm.",
    ],
    [
      "portuguese",
      "Portuguese",
      "A round cut with extra rows of facets for an intricate, kaleidoscopic sparkle.",
    ],
    [
      "coffin",
      "Coffin",
      "A bold, six-sided step cut with a tapered silhouette for a distinctive statement.",
    ],
    [
      "hexagon",
      "Hexagon",
      "Six crisp sides and step-cut facets for a geometric, contemporary look.",
    ],
    [
      "lozenge",
      "Lozenge Cut",
      "A slender diamond-shaped kite cut with striking, art-deco inspired lines.",
    ],
    [
      "heart",
      "Heart",
      "The ultimate symbol of love, cut with brilliant facets for a romantic sparkle.",
    ],
    ["princess", "Princess", "A square brilliant with sharp corners and a crisp, modern sparkle."],
  ] as const satisfies [ShapeSlug, string, string][]
).map(([slug, name, description]) => ({
  slug,
  name,
  description,
  image: `/images/shapes/${slug}.png`,
}));

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

/** Short stone names keyed by BE stone type code. */
export const STONE_LABELS: Record<"LAB_DIAMOND" | "MOISSANITE" | "PEARL", string> = {
  LAB_DIAMOND: "Lab diamond",
  MOISSANITE: "Moissanite",
  PEARL: "Pearl",
};

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

/* ------------------------------------------------------------------ */
/* Admin panel                                                        */
/* ------------------------------------------------------------------ */

export const ADMIN_NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/categories", label: "Categories" },
  { href: "/admin/collections", label: "Collections" },
  { href: "/admin/styles", label: "Ring styles" },
  { href: "/admin/shapes", label: "Stone shapes" },
  { href: "/admin/pricing", label: "Metal rates & margin" },
  { href: "/admin/stone-prices", label: "Stone prices" },
] as const;

export type AdminHref = (typeof ADMIN_NAV)[number]["href"];
