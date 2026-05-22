import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section, SectionHeading } from "@/components/ui/section";
import { formatDate } from "@/lib/utils";
import { getPostBySlug } from "@/server/data";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  return { title: post?.title ?? "Dev Log", description: post?.excerpt };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();
  return (
    <main>
      <Section>
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-cyan">{formatDate(post.createdAt)}</p>
        <SectionHeading eyebrow="Dev Log" title={post.title} text={post.excerpt} />
        <article className="glass max-w-4xl rounded-xl p-6 text-lg leading-8 text-slate-300">{post.content}</article>
      </Section>
    </main>
  );
}
