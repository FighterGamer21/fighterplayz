import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { getAllPlugins } from "@/lib/public-data.functions";

const opts = queryOptions({ queryKey: ["plugins-all"], queryFn: () => getAllPlugins() });

export const Route = createFileRoute("/plugins")({
  head: () => ({
    meta: [
      { title: "Plugins — FighterPlayz" },
      { name: "description", content: "Minecraft plugins built by FighterPlayz: events, anti-cheat, auth, kits and tournament systems." },
      { property: "og:title", content: "FighterPlayz Plugins" },
      { property: "og:description", content: "Premium Spigot/Paper plugins." },
    ],
    links: [{ rel: "canonical", href: "/plugins" }],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(opts),
  component: PluginsPage,
});

function PluginsPage() {
  const { data } = useSuspenseQuery(opts);
  return (
    <SiteLayout>
      <PageHero eyebrow="Plugins" title="Minecraft plugins built for serious networks" lead="Every plugin is configurable, permission-aware, and tuned for Paper performance." />
      <section className="mx-auto grid max-w-7xl gap-5 px-5 pb-20 sm:px-8 md:grid-cols-2 lg:grid-cols-3">
        {data.plugins.map((p) => (
          <article key={p.id} className="glass flex h-full flex-col rounded-xl p-5 transition hover:-translate-y-1">
            <div className="mb-3 flex items-center justify-between gap-2">
              <span className="rounded-full bg-[#8b5cf6]/10 px-3 py-1 text-xs font-bold uppercase text-violet-200">{p.plugin_type}</span>
              <span className="text-xs text-slate-400">v{p.version}</span>
            </div>
            <h3 className="text-2xl font-black text-white">{p.name}</h3>
            <p className="mt-2 line-clamp-3 text-sm text-slate-400">{p.tagline}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {(p.supported_versions ?? []).map((v: string) => (
                <span key={v} className="rounded border border-white/10 px-2 py-0.5 text-[10px] text-slate-300">{v}</span>
              ))}
            </div>
            <div className="mt-auto pt-5">
              <Link to="/plugins/$slug" params={{ slug: p.slug }} className="inline-flex items-center gap-1 rounded-md bg-[#28e7ff] px-3 py-1.5 text-xs font-semibold text-[#05070d] hover:bg-white">
                View plugin
              </Link>
            </div>
          </article>
        ))}
        {data.plugins.length === 0 ? <p className="text-slate-400">No plugins published yet.</p> : null}
      </section>
    </SiteLayout>
  );
}