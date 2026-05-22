import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/section";
import { formatDate } from "@/lib/utils";
import { getPosts } from "@/server/data";

export const metadata: Metadata = { title: "Dev Logs", description: "FighterPlayz blog and development logs for Minecraft infrastructure and web systems." };

export default async function BlogPage() {
  const posts = await getPosts();
  return (
    <main>
      <Section>
        <SectionHeading eyebrow="Dev Logs" title="Build notes from the FighterPlayz ecosystem." />
        <div className="grid gap-5 md:grid-cols-2">{posts.map((post) => <Link key={post.id} href={`/blog/${post.slug}`} className="glass rounded-xl p-6 transition hover:-translate-y-1"><p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan">{formatDate(post.createdAt)}</p><h2 className="mt-4 text-2xl font-black text-white">{post.title}</h2><p className="mt-3 leading-7 text-slate-400">{post.excerpt}</p><div className="mt-5 flex gap-2">{post.tags.map((tag: string) => <span key={tag} className="rounded-md bg-white/5 px-2 py-1 text-xs text-slate-300">{tag}</span>)}</div></Link>)}</div>
      </Section>
    </main>
  );
}
