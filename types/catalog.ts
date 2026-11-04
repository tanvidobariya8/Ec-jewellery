export type CurrencyCode = "INR" | "EUR" | "USD" | "GBP";

export type ShapeSlug =
  | "dutch-marquise"
  | "round"
  | "oval"
  | "emerald"
  | "pear"
  | "radiant"
  | "cushion"
  | "rose-cut"
  | "hexagon"
  | "lozenge";

export type Shape = {
  slug: ShapeSlug;
  name: string;
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
