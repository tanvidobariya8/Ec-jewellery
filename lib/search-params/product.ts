import { parseAsFloat, parseAsString } from "nuqs/server";

/** Product configurator selections in the URL (shareable, back-button safe). */
export const productSearchParams = {
  metal: parseAsString,
  /** ProductStone option id (stone type + carat). */
  stone: parseAsString,
  size: parseAsFloat,
};
