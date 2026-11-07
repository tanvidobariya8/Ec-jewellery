import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContentSections } from "@/components/content/ContentSections";
import { PageHeader } from "@/components/content/PageHeader";
import { Container } from "@/components/ui/Container";
import { getPolicyPage, POLICY_SLUGS } from "@/lib/api/content";

export function generateStaticParams() {
  return POLICY_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/policies/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const policy = await getPolicyPage(slug);
  if (!policy) return {};
  return { title: policy.title, description: policy.summary ?? undefined };
}

export default async function PolicyPage({ params }: PageProps<"/policies/[slug]">) {
  const { slug } = await params;
  const policy = await getPolicyPage(slug);
  if (!policy) notFound();

  return (
    <>
      <PageHeader
        eyebrow="Policies"
        title={policy.title}
        description={policy.summary ?? undefined}
      />
      <Container className="max-w-3xl py-16">
        <ContentSections sections={policy.sections} />
      </Container>
    </>
  );
}
