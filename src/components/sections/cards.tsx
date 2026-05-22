import Link from "next/link";
import { ArrowUpRight, Download, FileText } from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";

export function PluginCard({ plugin }: { plugin: any }) {
  return (
    <article className="glass group rounded-xl p-5 transition hover:-translate-y-1 hover:border-cyan/35">
      <div className="mb-5 flex items-center justify-between gap-3">
        <StatusBadge status={plugin.status} />
        <span className="text-xs font-semibold text-slate-500">v{plugin.version}</span>
      </div>
      <h3 className="text-2xl font-black text-white">{plugin.name}</h3>
      <p className="mt-2 min-h-12 text-sm leading-6 text-slate-400">{plugin.tagline}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {plugin.supportedVersions?.slice(0, 3).map((version: string) => <span key={version} className="rounded-md bg-white/5 px-2 py-1 text-xs text-slate-300">{version}</span>)}
      </div>
      <div className="mt-5 flex gap-3 text-sm">
        <Link className="inline-flex items-center gap-1 font-bold text-cyan" href={`/plugins/${plugin.slug}`}>Details <ArrowUpRight size={15} /></Link>
        <Link className="inline-flex items-center gap-1 text-slate-300" href={plugin.downloadUrl || "#"}><Download size={15} /> Download</Link>
        <Link className="inline-flex items-center gap-1 text-slate-300" href={plugin.docsUrl || "#"}><FileText size={15} /> Docs</Link>
      </div>
    </article>
  );
}

export function ProjectCard({ project }: { project: any }) {
  return (
    <article className="glass rounded-xl p-5 transition hover:-translate-y-1 hover:border-violet/40">
      <div className="mb-4 flex items-center justify-between">
        <span className="rounded-full bg-violet/10 px-3 py-1 text-xs font-bold text-violet-200">{project.category}</span>
        <StatusBadge status={project.status} />
      </div>
      <h3 className="text-2xl font-black text-white">{project.title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-400">{project.shortDescription}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {project.techStack?.slice(0, 4).map((tech: string) => <span key={tech} className="rounded-md border border-white/10 px-2 py-1 text-xs text-slate-300">{tech}</span>)}
      </div>
      <Link href={`/projects/${project.slug}`} className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-cyan">
        Inspect build <ArrowUpRight size={15} />
      </Link>
    </article>
  );
}
