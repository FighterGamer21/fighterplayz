import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/ui/section";
import { StatusBadge } from "@/components/ui/status-badge";
import { getProjectBySlug } from "@/server/data";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  return { title: project?.title ?? "Project", description: project?.shortDescription };
}

export default async function ProjectDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <main>
      <Section>
        <div className="mb-8 flex flex-wrap items-center gap-3"><StatusBadge status={project.status} /><span className="rounded-full bg-violet/10 px-3 py-1 text-xs font-bold text-violet-200">{project.category}</span></div>
        <SectionHeading eyebrow="Project Detail" title={project.title} text={project.fullDescription} />
        <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <div className="glass rounded-xl p-6">
            <h2 className="text-2xl font-black text-white">Problem solved</h2>
            <p className="mt-3 leading-7 text-slate-300">{project.problemSolved}</p>
            <h2 className="mt-8 text-2xl font-black text-white">Features</h2>
            <ul className="mt-3 space-y-2 text-slate-300">{project.features.map((feature: string) => <li key={feature}>• {feature}</li>)}</ul>
            <h2 className="mt-8 text-2xl font-black text-white">Development notes</h2>
            <p className="mt-3 leading-7 text-slate-300">{project.developmentNotes}</p>
            <h2 className="mt-8 text-2xl font-black text-white">Result</h2>
            <p className="mt-3 leading-7 text-slate-300">{project.outcome}</p>
            <h2 className="mt-8 text-2xl font-black text-white">Gallery</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">{project.gallery.map((src: string) => <img key={src} src={src} alt={`${project.title} gallery asset`} className="aspect-video w-full rounded-lg border border-white/10 object-cover" />)}</div>
          </div>
          <aside className="glass rounded-xl p-6">
            <h2 className="text-xl font-black text-white">Tech stack</h2>
            <div className="mt-4 flex flex-wrap gap-2">{project.techStack.map((tech: string) => <span key={tech} className="rounded-md bg-white/5 px-3 py-2 text-sm text-slate-300">{tech}</span>)}</div>
            <div className="mt-8 grid gap-3">
              {project.liveUrl ? <Button href={project.liveUrl}>Live URL</Button> : null}
              {project.githubUrl ? <Button href={project.githubUrl} variant="outline">GitHub URL</Button> : null}
            </div>
          </aside>
        </div>
      </Section>
    </main>
  );
}
