import { CategoryGrid } from "@/components/home/CategoryGrid";
import { CustomBanner } from "@/components/home/CustomBanner";
import { HeroSlider } from "@/components/home/HeroSlider";
import { ReviewStrip } from "@/components/home/ReviewStrip";
import { ShapeFinder } from "@/components/home/ShapeFinder";
import { TrustBadges } from "@/components/home/TrustBadges";
import { getCategories } from "@/lib/api/catalog";
import { HERO_SLIDES, HOME_CATEGORIES, REVIEWS } from "@/lib/mock/home";

/** Home category tiles with the image set in the admin (placeholder when none / API down). */
async function HomeCategories() {
  const categories = await getCategories().catch(() => []);
  const images = new Map(categories.map((c) => [c.slug, c.image]));
  return (
    <CategoryGrid
      categories={HOME_CATEGORIES.map((c) => ({ ...c, image: images.get(c.slug) ?? null }))}
    />
  );
}

/** Section order is provisional — reorder freely when the final mockup arrives. */
export default function HomePage() {
  return (
    <>
      <HeroSlider slides={HERO_SLIDES} />
      <HomeCategories />
      <ShapeFinder />
      <CustomBanner />
      <ReviewStrip reviews={REVIEWS} />
      <TrustBadges />
    </>
  );
}
