import type { BlogPost } from "@/types/content";

/** Blog posts — titles from client brief §6. Body copy is a first draft for review. */
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "lab-grown-vs-natural-diamonds",
    title: "Lab-Grown Diamonds vs Natural Mined Diamonds: Complete Chemical, Price & Ethical Guide",
    excerpt:
      "Same carbon, same sparkle, very different footprint. Here is what really separates a lab-grown diamond from a mined one.",
    readingMinutes: 6,
    sections: [
      {
        heading: "Chemically identical",
        paragraphs: [
          "A lab-grown diamond is pure carbon arranged in the same cubic crystal structure as a mined diamond. It has the same hardness (10 on the Mohs scale), the same refractive index and the same fire and brilliance.",
          "Our lab-grown diamonds are Type IIa — the purest diamond type, with almost no nitrogen — and are graded by independent laboratories such as IGI.",
        ],
      },
      {
        heading: "How they are made",
        paragraphs: [
          "Lab diamonds are grown using HPHT (high pressure, high temperature) or CVD (chemical vapour deposition), recreating the conditions in which diamonds form naturally, in weeks instead of millions of years.",
        ],
      },
      {
        heading: "Price",
        paragraphs: [
          "Because there is no mining and a shorter supply chain, lab-grown diamonds cost significantly less than mined diamonds of the same grade — often letting you choose up to 40% more carat size for the same budget.",
        ],
      },
      {
        heading: "Ethics and environment",
        paragraphs: [
          "Lab-grown diamonds are conflict-free by origin and avoid the land disruption of mining, with a far lower carbon footprint.",
        ],
      },
    ],
  },
  {
    slug: "moissanite-vs-lab-diamond",
    title: "Moissanite vs Lab Diamond: Which Stone Should You Choose for Your Engagement Ring?",
    excerpt:
      "Both are brilliant, durable and ethical. The difference is in the sparkle, the chemistry and the price.",
    readingMinutes: 5,
    sections: [
      {
        heading: "What they are",
        paragraphs: [
          "A lab-grown diamond is a real diamond (carbon). Moissanite is silicon carbide — a different gemstone with its own optical character.",
        ],
      },
      {
        heading: "Sparkle",
        paragraphs: [
          "Moissanite has a higher refractive index and stronger dispersion than diamond, so it shows more rainbow 'fire'. A diamond shows a crisper balance of white brilliance and fire.",
        ],
      },
      {
        heading: "Durability",
        paragraphs: [
          "Diamond is 10 on the Mohs scale; moissanite is about 9.25. Both are excellent for everyday rings.",
        ],
      },
      {
        heading: "Which should you choose?",
        paragraphs: [
          "Choose a lab-grown diamond if you want a certified diamond. Choose moissanite (VVS, DEF colour) if you want maximum sparkle for the lowest budget. Every design on our site can be made with either stone.",
        ],
      },
    ],
  },
  {
    slug: "measure-ring-size-at-home",
    title: "How to Accurately Measure Your Ring Size at Home (Complete Printable Chart)",
    excerpt:
      "Three simple ways to find your ring size at home — plus a printable chart from US size 3 to 14.",
    readingMinutes: 4,
    sections: [
      {
        heading: "Method 1: Measure a ring you already own",
        paragraphs: [
          "Measure the inside diameter of a ring that fits the same finger, in millimetres, and match it to the diameter column of our ring size chart.",
        ],
      },
      {
        heading: "Method 2: String or paper strip",
        paragraphs: [
          "Wrap a thin strip of paper around the base of your finger, mark where it overlaps and measure the length in millimetres. Match it to the circumference column of the chart.",
        ],
      },
      {
        heading: "Tips for an accurate size",
        paragraphs: [],
        list: [
          "Measure at the end of the day, when fingers are slightly larger.",
          "Avoid measuring when your hands are cold.",
          "Make sure the ring can pass over your knuckle.",
          "For wide bands (6 mm+), go up a quarter or half size.",
        ],
      },
      {
        heading: "Printable chart",
        paragraphs: [
          "Open our Ring Size Guide and print it for a quick reference. We offer US sizes 3 to 14 with quarter and half increments.",
        ],
      },
    ],
  },
  {
    slug: "caring-for-gold-and-diamond-rings",
    title: "Caring for Your 14K/18K Solid Gold & Diamond Rings for Lifetime Sparkle",
    excerpt:
      "A few simple habits keep solid gold and diamond jewellery looking brand new for decades.",
    readingMinutes: 4,
    sections: [
      {
        heading: "Clean gently at home",
        paragraphs: [
          "Soak your ring in warm water with a little mild dish soap for 15–20 minutes, then brush gently with a soft toothbrush and dry with a lint-free cloth.",
        ],
      },
      {
        heading: "What to avoid",
        paragraphs: [],
        list: [
          "Chlorine (pools, cleaning products) — it can weaken gold alloys.",
          "Harsh chemicals and abrasive cleaners.",
          "Wearing rings during gym sessions, gardening or heavy work.",
        ],
      },
      {
        heading: "Storage",
        paragraphs: [
          "Store each piece separately in a soft pouch or lined box — diamonds can scratch other jewellery and even other diamonds.",
        ],
      },
      {
        heading: "Professional check-ups",
        paragraphs: [
          "Have prongs and settings checked once a year. White gold may need re-rhodium plating every 1–2 years to keep its bright white finish.",
        ],
      },
    ],
  },
];

export function getBlogPost(slug: string) {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
