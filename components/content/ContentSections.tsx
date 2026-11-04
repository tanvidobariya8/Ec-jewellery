import { cn } from "@/lib/utils";
import type { ContentSection } from "@/types/content";

type ContentSectionsProps = {
  sections: ContentSection[];
  className?: string;
};

/** Renders long-form text (blog posts, policies, guides) with consistent typography. */
export function ContentSections({ sections, className }: ContentSectionsProps) {
  return (
    <div className={cn("space-y-10", className)}>
      {sections.map((section, index) => (
        <section key={section.heading ?? index} className="space-y-4">
          {section.heading && <h2 className="text-2xl sm:text-3xl">{section.heading}</h2>}
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph} className="leading-relaxed text-muted">
              {paragraph}
            </p>
          ))}
          {section.list && (
            <ul className="list-disc space-y-2 pl-5 text-muted marker:text-gold">
              {section.list.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  );
}
