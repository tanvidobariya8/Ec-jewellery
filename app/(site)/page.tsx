import { CategoryGrid } from "@/components/home/CategoryGrid";
import { CustomBanner } from "@/components/home/CustomBanner";
import { HeroSlider } from "@/components/home/HeroSlider";
import { ReviewStrip } from "@/components/home/ReviewStrip";
import { ShapeFinder } from "@/components/home/ShapeFinder";
import { TrustBadges } from "@/components/home/TrustBadges";
import { HERO_SLIDES, HOME_CATEGORIES, REVIEWS } from "@/lib/mock/home";

/** Section order is provisional — reorder freely when the final mockup arrives. */
export default function HomePage() {
  return (
    <>
      <HeroSlider slides={HERO_SLIDES} />
      <CategoryGrid categories={HOME_CATEGORIES} />
      <ShapeFinder />
      <CustomBanner />
      <ReviewStrip reviews={REVIEWS} />
      <TrustBadges />
    </>
  );
}
