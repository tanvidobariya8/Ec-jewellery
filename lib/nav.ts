import { getCategories } from "@/lib/api/catalog";
import { MAIN_NAV } from "@/lib/constants";
import type { NavItem } from "@/types/content";

/** Links shown before the category links (not categories themselves). */
const FIXED_NAV: NavItem[] = [{ label: "Best Sellers", href: "/shop?sort=best-sellers" }];

/**
 * The header menu, built from the categories in the admin: every top-level category becomes a
 * menu link (in the admin's sort order), and one with sub-categories gets a dropdown listing
 * them plus "All <name>". New categories appear automatically. Falls back to the static
 * MAIN_NAV if the API is down.
 */
export async function getMainNav(): Promise<NavItem[]> {
  let categories: Awaited<ReturnType<typeof getCategories>>;
  try {
    categories = await getCategories();
  } catch {
    return MAIN_NAV;
  }

  const categoryLinks = categories
    .filter((c) => c.parentSlug === null)
    .map((parent): NavItem => {
      const href = `/shop/${parent.slug}`;
      const subCategories = categories.filter((c) => c.parentSlug === parent.slug);
      if (subCategories.length === 0) return { label: parent.name, href };
      return {
        label: parent.name,
        href,
        children: [
          ...subCategories.map((c) => ({ label: c.name, href: `/shop/${c.slug}`, image: c.image })),
          { label: `All ${parent.name}`, href, image: parent.image },
        ],
      };
    });

  return [...FIXED_NAV, ...categoryLinks];
}
