import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/content/PageHeader";
import { Container } from "@/components/ui/Container";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { BLOG_POSTS } from "@/lib/mock/blog";

export const metadata: Metadata = {
  title: "Journal",
  description: "Guides on lab-grown diamonds, moissanite, ring sizing and jewellery care.",
};

export default function BlogPage() {
  return (
    <>
      <PageHeader eyebrow="Journal" title="Guides & Stories" />
      <Container className="py-16">
        <ul className="grid gap-10 md:grid-cols-2">
          {BLOG_POSTS.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <ImagePlaceholder label="Article image" className="aspect-[16/9]" />
                <p className="mt-5 text-xs tracking-label text-gold uppercase">
                  {post.readingMinutes} min read
                </p>
                <h2 className="mt-2 text-2xl transition-colors group-hover:text-primary-dark">
                  {post.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">{post.excerpt}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
