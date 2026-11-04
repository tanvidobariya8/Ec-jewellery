import type { ShapeSlug } from "@/types/catalog";

/** Outline illustrations of stone cuts (custom brand art — not available in lucide). */
const SHAPE_PATHS: Record<ShapeSlug, React.ReactNode> = {
  round: <circle cx="24" cy="24" r="16" />,
  oval: <ellipse cx="24" cy="24" rx="12" ry="18" />,
  emerald: <path d="M17 6h14l5 5v26l-5 5H17l-5-5V11z" />,
  pear: <path d="M24 5c6 9 13 16 13 25a13 13 0 0 1-26 0c0-9 7-16 13-25z" />,
  "dutch-marquise": <path d="M24 4c9 6 12 13 12 20s-3 14-12 20c-9-6-12-13-12-20S15 10 24 4z" />,
  radiant: <path d="M16 6h16l4 4v28l-4 4H16l-4-4V10z" />,
  cushion: <rect x="9" y="9" width="30" height="30" rx="9" />,
  "rose-cut": (
    <>
      <circle cx="24" cy="24" r="16" />
      <path d="M24 8v32M8 24h32M13 13l22 22M35 13L13 35" opacity="0.5" />
    </>
  ),
  hexagon: <path d="M24 6l15 9v18l-15 9-15-9V15z" />,
  lozenge: <path d="M24 4l11 20-11 20-11-20z" />,
};

type ShapeIconProps = {
  shape: ShapeSlug;
  className?: string;
};

export function ShapeIcon({ shape, className }: ShapeIconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {SHAPE_PATHS[shape]}
    </svg>
  );
}
