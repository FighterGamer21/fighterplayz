import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { HireDialog } from "@/components/site/HireDialog";
import { getServicesPublic } from "@/lib/public-data.functions";

const opts = queryOptions({ queryKey: ["services"], queryFn: () => getServicesPublic() });

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — FighterPlayz" },
      { name: "description", content: "Plugin development, server optimization, network setup and web development services." },
      { property: "og:title", content: "FighterPlayz Services" },
      { property: "og:description", content: "What I build for clients." },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(opts),
  component: ServicesPage,
});

function ServicesPage() {
  const { data } = useSuspenseQuery(opts);
  return (
    <SiteLayout>
      <PageHero eyebrow="Services" title="What I build, for who needs it" />
      <section className="mx-auto grid max-w-7xl gap-5 px-5 pb-20 sm:px-8 md:grid-cols-2">
        {data.services.map((s) => (
          <article key={s.id} className="glass flex h-full flex-col rounded-xl p-6">
            <h3 className="text-2xl font-black text-white">{s.title}</h3>
            <p className="mt-2 text-sm text-slate-400">{s.description}</p>
            <ul className="mt-4 space-y-1.5 text-sm text-slate-300">
              {(s.features ?? []).map((f: string) => <li key={f}>— {f}</li>)}
            </ul>
            <div className="mt-auto flex items-center justify-between pt-6">
              <span className="text-sm font-semibold text-[#28e7ff]">{s.starting_price}</span>
              <HireDialog defaultProjectType={s.title} trigger={<button className="rounded-md bg-[#28e7ff] px-3 py-1.5 text-xs font-semibold text-[#05070d] hover:bg-white">Request</button>} />
            </div>
          </article>
        ))}
      </section>
    </SiteLayout>
  );
}