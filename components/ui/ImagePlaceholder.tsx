import { cn } from "@/lib/utils";

type ImagePlaceholderProps = {
  label: string;
  tone?: "warm" | "muted";
  className?: string;
};

/**
 * Stand-in for photography until the client supplies real images.
 * Replace with `next/image` when assets arrive.
 */
export function ImagePlaceholder({ label, tone = "warm", className }: ImagePlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "flex items-center justify-center p-4 text-center",
        tone === "warm" ? "bg-surface" : "bg-surface-muted",
        className,
      )}
    >
      <span className="text-[10px] tracking-label text-muted/70 uppercase">[{label}]</span>
    </div>
  );
}
