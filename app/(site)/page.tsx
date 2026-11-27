import { BestSellers } from "@/components/home/BestSellers";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { CustomBanner } from "@/components/home/CustomBanner";
import { HeroBanner } from "@/components/home/HeroBanner";
import { ReviewStrip } from "@/components/home/ReviewStrip";
import { ShopByShape } from "@/components/home/ShopByShape";
import { ShopByStyle } from "@/components/home/ShopByStyle";
import { TrustBadges } from "@/components/home/TrustBadges";
import { WhyLabGrown } from "@/components/home/WhyLabGrown";
import { getBestSellers, getCategories, getRingStyleTiles, getShapeTiles } from "@/lib/api/catalog";
import { STONE_TYPES } from "@/lib/constants";
import { HERO_BANNER, HOME_CATEGORIES, REVIEWS } from "@/lib/mock/home";

/**
 * Home category tiles: the top-level categories from Admin → Categories (in their sort order,
 * with the image set there). Falls back to the draft list when the API is down or empty.
 */
async function HomeCategories() {
  const categories = await getCategories().catch(() => []);
  const topLevel = categories.filter((c) => c.parentSlug === null);
  return (
    <CategoryGrid
      categories={
        topLevel.length > 0 ? topLevel : HOME_CATEGORIES.map((c) => ({ ...c, image: null }))
      }
    />
  );
}

/** Best-seller tabs: one per top-level category; empty categories are dropped. Hidden when the API is down. */
async function HomeBestSellers() {
  const categories = await getCategories().catch(() => []);
  const topLevel = categories.filter((c) => c.parentSlug === null);
  const tabs = await Promise.all(
    topLevel.map(async (c) => ({
      slug: c.slug,
      name: c.name,
      products: await getBestSellers(c.slug).catch(() => []),
    })),
  );
  return <BestSellers tabs={tabs} />;
}

/** Ring style tiles per center stone, built from the live catalogue. Hidden when the API is down. */
async function HomeRingStyles() {
  const [labDiamond, moissanite] = await Promise.all(
    (["LAB_DIAMOND", "MOISSANITE"] as const).map((stone) =>
      getRingStyleTiles(stone).catch(() => []),
    ),
  );
  return (
    <ShopByStyle
      tabs={[
        { stone: "LAB_DIAMOND", label: STONE_TYPES[0].name, tiles: labDiamond },
        { stone: "MOISSANITE", label: STONE_TYPES[1].name, tiles: moissanite },
      ]}
    />
  );
}

/** Shape grid with photos and blurbs from Admin → Stone shapes (built-in list when the API is down). */
async function HomeShapes() {
  return <ShopByShape shapes={await getShapeTiles()} />;
}

/** Section order is provisional — reorder freely when the final mockup arrives. */
export default function HomePage() {
  return (
    <>
      <HeroBanner banner={HERO_BANNER} />
      <HomeRingStyles />
      <HomeShapes />
      <HomeBestSellers />
      <WhyLabGrown />
      <CustomBanner />
      <HomeCategories />
      <ReviewStrip reviews={REVIEWS} />
      <TrustBadges />
    </>
  );
}
