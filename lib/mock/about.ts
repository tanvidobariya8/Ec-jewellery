import type { TeamGroup } from "@/types/content";

/** About content — client brief §1, §2, §5. */
export const ABOUT = {
  intro:
    "Eco Friendly Jewellery is an international fine jewellery atelier crafting ethical, conflict-free lab-grown diamond and moissanite jewellery, combining bespoke Indian artisan craft with global quality certifications.",
  history:
    "We set out to make luxury fine jewellery accessible directly to consumers — without earth-mining exploitation and with zero blood-diamond footprint.",
  mission:
    "To provide 100% certified, sustainable lab-grown diamond and moissanite jewellery with uncompromised sparkle, a luxury feel and transparent pricing.",
  vision:
    "To become the leading and most-trusted sustainable brand for conscious fine jewellery across the USA, Europe and India.",
} as const;

export const USPS = [
  {
    title: "Identical to mined",
    body: "Type IIa lab-grown diamonds with 100% identical physical and chemical composition.",
  },
  {
    title: "85%+ lower carbon footprint",
    body: "No mining, no displaced earth — a far smaller environmental impact.",
  },
  {
    title: "Certified stones",
    body: "Primary center stones are certified by IGI or SGL.",
  },
] as const;

export const TEAM_GROUPS: TeamGroup[] = [
  {
    title: "Master Gem Cutters & Polishers",
    description: "Generations of Surat craftsmanship expertise in precise fancy diamond faceting.",
  },
  {
    title: "CAD / 3D Jewellery Designers",
    description: "Bespoke custom engagement ring modelling and 3D rendering specialists.",
  },
  {
    title: "Gemology & Quality Control",
    description:
      "Certified gemologists inspecting stone clarity, colour grading and micro-pavé setting durability.",
  },
  {
    title: "Client Relationship Team",
    description: "Dedicated international liaisons for India, Germany and North America.",
  },
];
