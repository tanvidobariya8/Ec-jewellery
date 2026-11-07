import { getCategories } from "@/lib/api/catalog";
import { MAIN_NAV } from "@/lib/constants";
import type { NavItem } from "@/types/content";

const CATEGORY_HREF = /^\/shop\/([^/?]+)$/;

/**
 * MAIN_NAV with dropdowns filled from the catalogue: a category link whose category has
 * sub-categories gets one entry per sub-category plus "All <name>". New sub-categories
 * added in the admin appear automatically. Falls back to the plain nav if the API is down.
 */
export async function getMainNav(): Promise<NavItem[]> {
  let categories: Awaited<ReturnType<typeof getCategories>>;
  try {
    categories = await getCategories();
  } catch {
    return MAIN_NAV;
  }

  return MAIN_NAV.map((item) => {
    const slug = item.href.match(CATEGORY_HREF)?.[1];
    const subCategories = slug ? categories.filter((c) => c.parentSlug === slug) : [];
    if (subCategories.length === 0) return item;
    return {
      ...item,
      children: [
        ...subCategories.map((c) => ({ label: c.name, href: `/shop/${c.slug}`, image: c.image })),
        {
          label: `All ${item.label}`,
          href: item.href,
          image: categories.find((c) => c.slug === slug)?.image,
        },
      ],
    };
  });
}
