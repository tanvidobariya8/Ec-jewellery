import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  title: string;
  eyebrow?: string;
  description?: string;
  align?: "center" | "left";
  as?: "h1" | "h2";
  className?: string;
};

export function SectionHeading({
  title,
  eyebrow,
  description,
  align = "center",
  as: Heading = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-10", align === "center" && "text-center", className)}>
      {eyebrow && <p className="mb-3 text-xs tracking-label text-gold-dark uppercase">{eyebrow}</p>}
      <Heading className="text-3xl sm:text-4xl">{title}</Heading>
      <span
        aria-hidden="true"
        className={cn("mt-4 block h-px w-10 bg-gold/60", align === "center" && "mx-auto")}
      />
      {description && (
        <p
          className={cn(
            "mt-5 max-w-2xl text-sm leading-relaxed text-muted",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
