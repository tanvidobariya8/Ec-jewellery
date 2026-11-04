import type { Metadata } from "next";

import { PageHeader } from "@/components/content/PageHeader";
import { Accordion } from "@/components/ui/Accordion";
import { Container } from "@/components/ui/Container";
import { FAQS } from "@/lib/mock/faqs";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers about lab-grown diamonds, certificates, production times and custom designs.",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
      />
      <PageHeader eyebrow="Help" title="Frequently Asked Questions" />
      <Container className="max-w-3xl py-16">
        <Accordion
          items={FAQS.map((faq) => ({
            id: faq.id,
            title: faq.question,
            content: <p>{faq.answer}</p>,
          }))}
        />
      </Container>
    </>
  );
}
