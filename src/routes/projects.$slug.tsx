import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { HireDialog } from "@/components/site/HireDialog";
import { getProjectBySlug } from "@/lib/public-data.functions";

const opts = (slug: string) =>
  queryOptions({ queryKey: ["project", slug], queryFn: () => getProjectBySlug({ data: { slug } }) });

export const Route = createFileRoute("/projects/$slug")({
  loader: async ({ params, context }) => {
    const d = await context.queryClient.ensureQueryData(opts(params.slug));
    if (!d.project) throw notFound();
    return d;
  },
  head: ({ loaderData }) => ({
    meta: loaderData?.project
      ? [
          { title: `${loaderData.project.title} — FighterPlayz` },
          { name: "description", content: loaderData.project.short_description },
          { property: "og:title", content: loaderData.project.title },
          { property: "og:description", content: loaderData.project.short_description },
        ]
      : [],
  }),
  component: ProjectDetail,
  notFoundComponent: () => <SiteLayout><div className="mx-auto max-w-7xl px-5 py-24 text-slate-300">Project not found.</div></SiteLayout>,
  errorComponent: () => <SiteLayout><div className="mx-auto max-w-7xl px-5 py-24 text-slate-300">Failed to load project.</div></SiteLayout>,
});

function ProjectDetail() {
  const { slug } = Route.useParams();
  const { data } = useSuspenseQuery(opts(slug));
  const p = data.project!;
  return (
    <SiteLayout>
      <section className="mx-auto max-w-5xl px-5 pb-12 pt-16 sm:px-8 lg:pt-24">
        <Link to="/projects" className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-[#28e7ff]"><ArrowLeft size={14} /> All projects</Link>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-[#8b5cf6]/10 px-3 py-1 text-xs font-bold uppercase text-violet-200">{p.category}</span>
          <span className="rounded-full border border-[#28e7ff]/30 bg-[#28e7ff]/10 px-3 py-1 text-xs font-bold text-[#28e7ff]">{p.status}</span>
        </div>
        <h1 className="mt-4 text-4xl font-black text-white sm:text-6xl">{p.title}</h1>
        <p className="mt-4 text-lg text-slate-300">{p.short_description}</p>
        <p className="mt-6 text-slate-400">{p.full_description}</p>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <div className="glass rounded-xl p-6">
            <h2 className="text-lg font-black text-white">Features</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              {(p.features ?? []).map((f: string) => <li key={f}>— {f}</li>)}
            </ul>
          </div>
          <div className="glass rounded-xl p-6">
            <h2 className="text-lg font-black text-white">Tech stack</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {(p.tech_stack ?? []).map((t: string) => (
                <span key={t} className="rounded border border-white/10 px-2 py-1 text-xs text-slate-200">{t}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <HireDialog defaultProjectType={`${p.category}: ${p.title}`} trigger={<button className="rounded-lg bg-[#28e7ff] px-5 py-3 text-sm font-semibold text-[#05070d] hover:bg-white">Request similar</button>} />
          {p.live_url ? <a href={p.live_url} target="_blank" rel="noreferrer" className="rounded-lg border border-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/5">Live</a> : null}
          {p.github_url ? <a href={p.github_url} target="_blank" rel="noreferrer" className="rounded-lg border border-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/5">GitHub</a> : null}
        </div>
      </section>
    </SiteLayout>
  );
}