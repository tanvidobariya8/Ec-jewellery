import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

type PageHeaderProps = {
  title: string;
  eyebrow?: string;
  description?: string;
};

/** Standard top-of-page title block (one h1 per page). */
export function PageHeader({ title, eyebrow, description }: PageHeaderProps) {
  return (
    <div className="border-b border-border bg-surface/40 pt-14 pb-4">
      <Container>
        <SectionHeading as="h1" title={title} eyebrow={eyebrow} description={description} />
      </Container>
    </div>
  );
}
