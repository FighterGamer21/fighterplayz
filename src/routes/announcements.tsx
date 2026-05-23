import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Pin, Megaphone } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { getAnnouncementsPublic } from "@/lib/public-data.functions";

const opts = queryOptions({ queryKey: ["announcements"], queryFn: () => getAnnouncementsPublic() });

export const Route = createFileRoute("/announcements")({
  head: () => ({
    meta: [
      { title: "Updates & Announcements — FighterPlayz" },
      { name: "description", content: "Latest updates, release notes, and announcements from FighterPlayz." },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(opts),
  component: Page,
});

function Page() {
  const { data } = useSuspenseQuery(opts);
  return (
    <SiteLayout>
      <section className="mx-auto max-w-5xl px-5 py-16 sm:px-8">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#28e7ff]">Site Updates</p>
        <h1 className="text-balance text-4xl font-black text-white sm:text-5xl">Announcements</h1>
        <p className="mt-3 max-w-2xl text-slate-400">Release notes, roadmap signals, and operational notices.</p>
        <div className="mt-10 space-y-4">
          {data.announcements.length === 0 ? (
            <p className="text-slate-500">No announcements yet — check back soon.</p>
          ) : null}
          {data.announcements.map((a: any, i: number) => (
            <motion.article
              key={a.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="glass rounded-xl p-6"
            >
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full border border-[#28e7ff]/30 bg-[#28e7ff]/10 px-3 py-1 text-xs font-bold uppercase text-[#28e7ff]">
                  <Megaphone size={12} /> {a.type}
                </span>
                {a.pinned ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/10 px-3 py-1 text-xs font-bold text-amber-200">
                    <Pin size={12} /> Pinned
                  </span>
                ) : null}
                <span className="text-xs text-slate-500">{new Date(a.created_at).toLocaleDateString()}</span>
              </div>
              <h2 className="text-2xl font-black text-white">{a.title}</h2>
              <p className="mt-3 whitespace-pre-wrap text-slate-300">{a.body}</p>
            </motion.article>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}