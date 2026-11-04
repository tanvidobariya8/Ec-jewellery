import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContentSections } from "@/components/content/ContentSections";
import { PageHeader } from "@/components/content/PageHeader";
import { Container } from "@/components/ui/Container";
import { getPolicy, POLICIES } from "@/lib/mock/policies";

export function generateStaticParams() {
  return POLICIES.map((policy) => ({ slug: policy.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/policies/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const policy = getPolicy(slug);
  if (!policy) return {};
  return { title: policy.title, description: policy.summary };
}

export default async function PolicyPage({ params }: PageProps<"/policies/[slug]">) {
  const { slug } = await params;
  const policy = getPolicy(slug);
  if (!policy) notFound();

  return (
    <>
      <PageHeader eyebrow="Policies" title={policy.title} description={policy.summary} />
      <Container className="max-w-3xl py-16">
        <ContentSections sections={policy.sections} />
      </Container>
    </>
  );
}
