import type { HeroBannerContent, Review } from "@/types/content";

/** Home hero banner — copy from client brief §9. */
export const HERO_BANNER: HeroBannerContent = {
  eyebrow: "Engagement Collection",
  heading: "Modern Love. Conscious Luxury.",
  subtext: "Handcrafted lab-grown diamond & moissanite engagement rings.",
  cta: { label: "Shop Engagement Rings", href: "/shop/engagement-rings" },
  imageLabel: "Model holding an EcoFriendly gift box, wearing lab-grown diamond rings",
  image: "/images/hero/hero-gift-portrait.png",
};

/** Custom sub-banner — client brief §9. */
export const CUSTOM_BANNER = {
  eyebrow: "Bespoke",
  heading: "Your Dream Ring, Custom Made.",
  subtext: "Turn your sketches or reference photos into handcrafted fine jewellery.",
  cta: { label: "Design Your Own Ring", href: "/custom-jewelry" },
  before: {
    label: "Your inspiration",
    image: "/images/custom/reference.png",
    alt: "Customer's reference photo of an oval halo ring with baguette sunburst in rose gold",
  },
  after: {
    label: "Our creation",
    image: "/images/custom/finished.png",
    alt: "The finished custom oval sunburst halo ring in rose gold, worn on the hand",
  },
} as const;

/** Home "Why lab-grown" benefits strip — draft copy, confirm with client. */
export const WHY_LAB_GROWN = {
  eyebrow: "Why lab-grown",
  heading: "Brilliance, Without the Footprint.",
  benefits: [
    {
      icon: "gem",
      title: "Real Diamond, Real Sparkle",
      body: "Grown above ground with the same crystal structure, hardness and fire as a mined stone.",
    },
    {
      icon: "budget",
      title: "More Stone for Your Budget",
      body: "Choose a larger or finer stone for the same spend, with no compromise on cut or clarity.",
    },
    {
      icon: "certified",
      title: "Independently Graded",
      body: "Every lab-grown diamond comes with an IGI report, so you know exactly what you are buying.",
    },
    {
      icon: "ethical",
      title: "Traceable & Conflict-Free",
      body: "No mining and no murky supply chains — just a clear origin you can feel good about.",
    },
    {
      icon: "planet",
      title: "Gentler on the Planet",
      body: "Created with far less land disturbance and waste than traditional mining.",
    },
    {
      icon: "handmade",
      title: "Handcrafted to Order",
      body: "Each piece is set by hand in solid gold or platinum and made just for you.",
    },
  ],
  cta: { label: "Lab-grown vs mined", href: "/education" },
} as const;

/** Home "Our promise" strip above the footer — draft copy, confirm with client. */
export const OUR_PROMISE = {
  heading: "Our Promise to You",
  items: [
    {
      icon: "origin",
      title: "Crafted in Surat, India",
      body: "Cut, polished and set in the world's diamond capital by artisans with generations of skill.",
    },
    {
      icon: "handmade",
      title: "Made Just for You",
      body: "Every piece is handcrafted to order in our own workshop — never mass-produced.",
    },
    {
      icon: "shipping",
      title: "Insured Worldwide Delivery",
      body: "Fully insured, discreetly packed and tracked from our studio to your door.",
    },
    {
      icon: "returns",
      title: "30-Day Returns",
      body: "Not quite right? Return or exchange within 30 days, no fuss.",
    },
  ],
} as const;

/** Home "Best sellers" tabbed product row. */
export const BEST_SELLERS = {
  heading: "Our Best Sellers",
  viewAll: "View all",
} as const;

/** Home "Shop by category" tiles — NOT FINAL (draft mockup). */
export const HOME_CATEGORIES = [
  { slug: "bestSellers", name: "Best sellers" },
  { slug: "rings", name: "Rings" },
  { slug: "chains", name: "Chain & Pendant" },
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
