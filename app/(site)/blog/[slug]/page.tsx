import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ContentSections } from "@/components/content/ContentSections";
import { Container } from "@/components/ui/Container";
import { BLOG_POSTS, getBlogPost } from "@/lib/mock/blog";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { type: "article", title: post.title, description: post.excerpt },
  };
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <article>
      <header className="border-b border-border bg-surface/40 py-14">
        <Container className="max-w-3xl text-center">
          <p className="text-xs tracking-label text-gold uppercase">
            Journal · {post.readingMinutes} min read
          </p>
          <h1 className="mt-4 text-3xl leading-tight sm:text-4xl">{post.title}</h1>
          <p className="mt-5 text-muted">{post.excerpt}</p>
        </Container>
      </header>
      <Container className="max-w-3xl py-16">
        <ContentSections sections={post.sections} />
        <Link
          href="/blog"
          className="mt-14 inline-block text-xs tracking-label text-primary uppercase underline-offset-4 hover:underline"
        >
          ← Back to journal
        </Link>
      </Container>
    </article>
  );
}
