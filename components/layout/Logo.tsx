import Image from "next/image";
import Link from "next/link";

import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  priority?: boolean;
};

export function Logo({ className, priority }: LogoProps) {
  return (
    <Link href="/" aria-label={`${SITE.name} — home`} className={cn("inline-block", className)}>
      <Image
        src="/logo.svg"
        alt={SITE.name}
        width={1215}
        height={331}
        priority={priority}
        className="h-10 w-auto sm:h-12"
      />
    </Link>
  );
}
