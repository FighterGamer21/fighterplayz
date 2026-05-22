import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { getAnnouncementsPublic } from "@/lib/public-data.functions";

const opts = queryOptions({ queryKey: ["announcements"], queryFn: () => getAnnouncementsPublic() });

export const Route = createFileRoute("/announcements")({
  head: () => ({
    meta: [
      { title: "Announcements - FighterPlayz" },
      { name: "description", content: "Latest FighterPlayz updates, announcements, and site posts." },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(opts),
  component: AnnouncementsPage,
});

function AnnouncementsPage() {
  const { data } = useSuspenseQuery(opts);
  return (
    <SiteLayout>
      <PageHero eyebrow="Updates" title="Announcements and site updates" lead="Latest project notices, launches, service changes, and important updates." />
      <section className="mx-auto grid max-w-5xl gap-4 px-5 pb-24 sm:px-8">
        {data.announcements.length ? data.announcements.map((item: any) => (
          <article key={item.id} className="glass rounded-xl p-6">
            <div className="mb-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-[#28e7ff]/10 px-3 py-1 text-xs font-bold text-[#28e7ff]">{item.type}</span>
              {item.pinned ? <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs font-bold text-violet-200">PINNED</span> : null}
            </div>
            <h2 className="text-2xl font-black text-white">{item.title}</h2>
            <p className="mt-3 whitespace-pre-wrap leading-7 text-slate-300">{item.body}</p>
          </article>
        )) : <p className="glass rounded-xl p-6 text-slate-400">No announcements yet.</p>}
      </section>
    </SiteLayout>
  );
}
