import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { getProjectsByCategory } from "@/lib/public-data.functions";

const opts = queryOptions({ queryKey: ["projects-website"], queryFn: () => getProjectsByCategory({ data: { category: "website" } }) });

export const Route = createFileRoute("/websites")({
  head: () => ({
    meta: [
      { title: "Websites — FighterPlayz" },
      { name: "description", content: "Modern websites built for hosting brands, server networks and businesses." },
      { property: "og:title", content: "FighterPlayz Websites" },
      { property: "og:description", content: "React, TanStack, Tailwind and Supabase." },
    ],
    links: [{ rel: "canonical", href: "/websites" }],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(opts),
  component: WebsitesPage,
});

function WebsitesPage() {
  const { data } = useSuspenseQuery(opts);
  return (
    <SiteLayout>
      <PageHero eyebrow="Websites" title="Modern sites for brands & networks" />
      <section className="mx-auto grid max-w-7xl gap-5 px-5 pb-20 sm:px-8 md:grid-cols-2 lg:grid-cols-3">
        {data.projects.map((p) => (
          <article key={p.id} className="glass flex h-full flex-col rounded-xl p-5">
            <h3 className="text-2xl font-black text-white">{p.title}</h3>
            <p className="mt-2 line-clamp-3 text-sm text-slate-400">{p.short_description}</p>
            <Link to="/projects/$slug" params={{ slug: p.slug }} className="mt-auto inline-flex w-fit items-center gap-1 rounded-md bg-[#28e7ff] px-3 py-1.5 text-xs font-semibold text-[#05070d] hover:bg-white">Details</Link>
          </article>
        ))}
      </section>
    </SiteLayout>
  );
}