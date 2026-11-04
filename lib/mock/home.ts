import type { HeroSlide, Review } from "@/types/content";

/** Hero banners — copy from client brief §9. */
export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "modern-love",
    eyebrow: "Engagement Collection",
    heading: "Modern Love. Conscious Luxury.",
    subtext: "Handcrafted lab-grown diamond & moissanite engagement rings.",
    cta: { label: "Shop Engagement Rings", href: "/shop/engagement-rings" },
    imageLabel: "Hero photo: engagement ring",
  },
  {
    id: "kind-not-mined",
    eyebrow: "IGI Certified",
    heading: "Kind, Not Mined.",
    subtext: "Get up to 40% more carat size with zero environmental exploitation.",
    cta: { label: "Explore Best Sellers", href: "/shop?sort=best-sellers" },
    imageLabel: "Hero photo: lab-grown diamond",
  },
];

/** Custom sub-banner — client brief §9. */
export const CUSTOM_BANNER = {
  eyebrow: "Bespoke",
  heading: "Your Dream Ring, Custom Made.",
  subtext: "Turn your sketches or reference photos into handcrafted fine jewellery.",
  cta: { label: "Design Your Own Ring", href: "/custom-jewelry" },
} as const;

/** Home "Shop by category" tiles — NOT FINAL (draft mockup). */
export const HOME_CATEGORIES = [
  { slug: "bestSellers", name: "Best sellers" },
  { slug: "rings", name: "Rings" },
  { slug: "chains", name: "Chains" },
  { slug: "earrings", name: "Earrings" },
  { slug: "bracelets", name: "Bracelets" },
] as const;

/** Testimonials — client brief §7. Author names not provided yet. */
export const REVIEWS: Review[] = [
  {
    id: "r1",
    rating: 5,
    body: "My custom Dutch Marquise lab diamond ring in 14k yellow gold turned out stunning. Delivery to Germany was smooth and fully insured.",
    author: "Verified Buyer · Germany",
    product: "Custom Dutch Marquise Ring",
  },
  {
    id: "r2",
    rating: 5,
    body: "Exceptional sparkle and certified stone quality. Customer support on WhatsApp answered every CAD adjustment quickly.",
    author: "Verified Buyer",
  },
  {
    id: "r3",
    rating: 5,
    body: "Knowing that our wedding bands are 100% eco-friendly and conflict-free made the proposal truly meaningful.",
    author: "Verified Buyer",
    product: "Wedding Bands",
  },
];
