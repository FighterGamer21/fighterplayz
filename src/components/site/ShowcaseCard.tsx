import { ArrowRight } from "lucide-react";
import { HireDialog } from "./HireDialog";

type Item = {
  slug: string;
  title: string;
  badge?: string | null;
  status?: string | null;
  description?: string | null;
  tags?: string[];
  liveUrl?: string | null;
  githubUrl?: string | null;
};

export function ShowcaseCard({
  item,
  detailHref,
  projectType,
}: {
  item: Item;
  detailHref: string;
  projectType: string;
}) {
  return (
    <article className="glass group relative flex h-full flex-col rounded-xl p-5 transition hover:-translate-y-1">
      <div className="mb-4 flex items-center justify-between gap-2">
        {item.badge ? (
          <span className="rounded-full bg-[#8b5cf6]/10 px-3 py-1 text-xs font-bold uppercase text-violet-200">{item.badge}</span>
        ) : <span />}
        {item.status ? (
          <span className="rounded-full border border-[#28e7ff]/30 bg-[#28e7ff]/10 px-3 py-1 text-xs font-bold uppercase text-[#28e7ff]">
            {item.status}
          </span>
        ) : null}
      </div>
      <h3 className="text-2xl font-black text-white">{item.title}</h3>
      {item.description ? (
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-400">{item.description}</p>
      ) : null}
      {item.tags && item.tags.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {item.tags.slice(0, 5).map((t) => (
            <span key={t} className="rounded-md border border-white/10 px-2 py-0.5 text-xs text-slate-300">{t}</span>
          ))}
        </div>
      ) : null}
      <div className="mt-auto flex flex-wrap gap-2 pt-5">
        <a
          href={detailHref}
          className="inline-flex items-center gap-1 rounded-md bg-[#28e7ff] px-3 py-1.5 text-xs font-semibold text-[#05070d] hover:bg-white"
        >
          View details <ArrowRight size={13} />
        </a>
        <HireDialog
          defaultProjectType={projectType}
          trigger={
            <button className="rounded-md border border-[#28e7ff]/30 px-3 py-1.5 text-xs font-semibold text-[#28e7ff] hover:bg-[#28e7ff]/10">
              Request similar
            </button>
          }
        />
        {item.liveUrl ? (
          <a href={item.liveUrl} target="_blank" rel="noreferrer" className="rounded-md border border-white/10 px-3 py-1.5 text-xs text-slate-200 hover:bg-white/5">Live</a>
        ) : null}
        {item.githubUrl ? (
          <a href={item.githubUrl} target="_blank" rel="noreferrer" className="rounded-md border border-white/10 px-3 py-1.5 text-xs text-slate-200 hover:bg-white/5">GitHub</a>
        ) : null}
      </div>
    </article>
  );
}