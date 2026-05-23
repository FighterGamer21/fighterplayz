import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { getProjectsByCategory } from "@/lib/public-data.functions";
import { SEED_PROJECTS } from "@/lib/seed-data";

const PROJECTS_FALLBACK = {
  projects: SEED_PROJECTS.map((project, index) => ({ id: project.slug ?? `project-${index}`, ...project })),
};

async function loadProjects() {
  try {
    return await getProjectsByCategory({ data: {} });
  } catch (error) {
    console.error("[projects] using fallback content", error);
    return PROJECTS_FALLBACK;
  }
}

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — FighterPlayz" },
      { name: "description", content: "Servers, websites and Minecraft systems built by FighterPlayz." },
      { property: "og:title", content: "FighterPlayz Projects" },
      { property: "og:description", content: "Portfolio of Minecraft servers, hosting brands and infrastructure." },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const { data } = useQuery({
    queryKey: ["projects-all"],
    queryFn: loadProjects,
    initialData: PROJECTS_FALLBACK,
    retry: false,
  });
  return (
    <SiteLayout>
      <PageHero eyebrow="Projects" title="Servers, websites and systems shipped" />
      <section className="mx-auto grid max-w-7xl gap-5 px-5 pb-20 sm:px-8 md:grid-cols-2 lg:grid-cols-3">
        {data.projects.map((p) => (
          <article key={p.id} className="glass flex h-full flex-col rounded-xl p-5 transition hover:-translate-y-1">
            <div className="mb-3 flex items-center justify-between">
              <span className="rounded-full bg-[#8b5cf6]/10 px-3 py-1 text-xs font-bold uppercase text-violet-200">{p.category}</span>
              <span className="rounded-full border border-[#28e7ff]/30 bg-[#28e7ff]/10 px-3 py-1 text-xs font-bold text-[#28e7ff]">{p.status}</span>
            </div>
            <h3 className="text-2xl font-black text-white">{p.title}</h3>
            <p className="mt-2 line-clamp-3 text-sm text-slate-400">{p.short_description}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {(p.tech_stack ?? []).slice(0, 5).map((t: string) => (
                <span key={t} className="rounded border border-white/10 px-2 py-0.5 text-[10px] text-slate-300">{t}</span>
              ))}
            </div>
            <div className="mt-auto pt-5">
              <Link to="/projects/$slug" params={{ slug: p.slug }} className="inline-flex items-center gap-1 rounded-md bg-[#28e7ff] px-3 py-1.5 text-xs font-semibold text-[#05070d] hover:bg-white">View project</Link>
            </div>
          </article>
        ))}
      </section>
    </SiteLayout>
  );
}
