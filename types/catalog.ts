export type CurrencyCode = "INR" | "EUR" | "USD" | "GBP";

export type ShapeSlug =
  | "dutch-marquise"
  | "marquise"
  | "oval"
  | "cushion"
  | "pear"
  | "radiant"
  | "emerald"
  | "round"
  | "rose-cut"
  | "old-cut"
  | "portuguese"
  | "coffin"
  | "hexagon"
  | "lozenge"
  | "heart"
  | "princess";

export type Shape = {
  slug: ShapeSlug;
  name: string;
  /** Stone photo in `public/images/shapes`. */
  image: string;
  description: string;
};

export type Category = {
  slug: string;
  name: string;
  description?: string;
};

export type Metal = {
  code: string;
  name: string;
  purity: string;
};

export type StoneType = {
  code: "LAB_DIAMOND" | "MOISSANITE";
  name: string;
  grade: string;
};
