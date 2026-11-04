import { SITE } from "@/lib/constants";

export function AnnouncementBar() {
  return (
    <div className="bg-primary px-4 py-2 text-center text-[10px] tracking-label text-primary-foreground uppercase sm:text-xs">
      {SITE.announcement}
    </div>
  );
}
