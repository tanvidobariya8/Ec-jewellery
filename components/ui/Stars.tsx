import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

type StarsProps = {
  rating: number;
  className?: string;
};

export function Stars({ rating, className }: StarsProps) {
  return (
    <div
      className={cn("flex gap-0.5", className)}
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          aria-hidden="true"
          className={cn("size-4", i < rating ? "fill-gold text-gold" : "text-border")}
        />
      ))}
    </div>
  );
}
