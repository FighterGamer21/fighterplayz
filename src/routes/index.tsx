import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { ArrowRight, Code2, Cpu, DatabaseZap, Server, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { getHomeData, getAnnouncementsPublic, getApprovedReviews } from "@/lib/public-data.functions";

const homeQueryOptions = queryOptions({
  queryKey: ["home"],
  queryFn: async () => {
    const [home, ann, rev] = await Promise.all([
      getHomeData(),
      getAnnouncementsPublic(),
      getApprovedReviews(),
    ]);
    return { ...home, announcements: ann.announcements, reviews: rev.reviews };
  },
});

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FighterPlayz Ecosystem | Minecraft Infrastructure Developer" },
      { name: "description", content: "Premium Minecraft plugin development, server optimization, web systems, and gaming infrastructure by FighterPlayz." },
      { property: "og:title", content: "FighterPlayz Ecosystem" },
      { property: "og:description", content: "Building Minecraft infrastructure beyond ordinary networks." },
      { property: "og:image", content: "/og/fighterplayz-og.svg" },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(homeQueryOptions),
  component: Index,
});

const NAV = [
  ["Ecosystem", "/ecosystem"],
  ["Projects", "/projects"],
  ["Plugins", "/plugins"],
  ["Services", "/services"],
  ["My Tickets", "/tickets"],
  ["Contact", "/contact"],
] as const;

function Index() {
  const { data } = useSuspenseQuery(homeQueryOptions);
  const { projects, plugins, services, skills, announcements, reviews } = data;
  const pinnedAnnouncements = announcements.filter((a: any) => a.pinned).slice(0, 3);

  return (
    <div>
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#05070d]/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link to="/" className="flex items-center gap-3 font-black tracking-tight text-white">
            <span className="grid size-10 place-items-center rounded-lg border border-[#28e7ff]/30 bg-[#28e7ff]/10 text-[#28e7ff] shadow-glow">
              <Cpu size={20} />
            </span>
            <span>FighterPlayz</span>
          </Link>
          <nav className="hidden items-center gap-6 lg:flex">
            {NAV.map(([label, href]) => (
              <a key={href} href={href} className="text-sm font-medium text-slate-300 transition hover:text-[#28e7ff]">{label}</a>
            ))}
          </nav>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="relative isolate overflow-hidden px-5 py-20 sm:px-8 lg:py-28">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-[#28e7ff]">@fightergamerofficial1 — OGxDevs signal online</p>
              <h1 className="text-balance text-5xl font-black leading-[0.96] tracking-tight text-white sm:text-6xl lg:text-7xl">
                Building Minecraft Infrastructure <span className="text-gradient">Beyond Ordinary Networks</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                Plugin Development · Server Optimization · Web Systems · Gaming Infrastructure
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="/projects" className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-[#28e7ff] px-5 py-2.5 text-sm font-semibold text-[#05070d] shadow-glow transition hover:bg-white">
                  Explore projects <ArrowRight size={17} />
                </a>
                <a href="/contact" className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-[#28e7ff]/30 px-5 py-2.5 text-sm font-semibold text-[#28e7ff] hover:bg-[#28e7ff]/10">
                  Contact
                </a>
                <a href="/tickets" className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/10 px-5 py-2.5 text-sm font-semibold text-slate-200 hover:border-[#28e7ff]/40 hover:text-[#28e7ff]">
                  Track ticket
                </a>
              </div>
            </div>
            <div className="glass scanline relative min-h-[420px] overflow-hidden rounded-2xl p-5">
              <div className="relative grid h-full gap-4">
                {([["Velocity Proxy", "Latency routing stable", Server], ["Plugin Core", "Commands compiled", Code2], ["PostgreSQL", "Content sync active", DatabaseZap]] as const).map(([t, s, Icon]) => (
                  <div key={t} className="glass rounded-xl p-5">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="grid size-11 place-items-center rounded-lg bg-[#28e7ff]/10 text-[#28e7ff]"><Icon size={21} /></div>
                      <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300">ONLINE</span>
                    </div>
                    <h3 className="text-xl font-black text-white">{t}</h3>
                    <p className="mt-1 text-sm text-slate-400">{s}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <Section eyebrow="Featured Projects" title="Minecraft, web, infrastructure, and tools.">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((p: any) => (
              <article key={p.id} className="glass rounded-xl p-5 transition hover:-translate-y-1">
                <div className="mb-4 flex items-center justify-between">
                  <span className="rounded-full bg-[#8b5cf6]/10 px-3 py-1 text-xs font-bold text-violet-200">{p.category}</span>
                  <span className="rounded-full border border-[#28e7ff]/30 bg-[#28e7ff]/10 px-3 py-1 text-xs font-bold uppercase text-[#28e7ff]">{p.status}</span>
                </div>
                <h3 className="text-2xl font-black text-white">{p.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{p.short_description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {(p.tech_stack ?? []).slice(0, 4).map((t: string) => (
                    <span key={t} className="rounded-md border border-white/10 px-2 py-1 text-xs text-slate-300">{t}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </Section>

        {/* PLUGINS */}
        <Section eyebrow="Featured Plugins" title="Plugin systems built for serious server owners.">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {plugins.map((pl: any) => (
              <article key={pl.id} className="glass rounded-xl p-5">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <span className="rounded-full border border-[#28e7ff]/30 bg-[#28e7ff]/10 px-3 py-1 text-xs font-bold uppercase text-[#28e7ff]">{pl.status}</span>
                  <span className="text-xs font-semibold text-slate-500">v{pl.version}</span>
                </div>
                <h3 className="text-2xl font-black text-white">{pl.name}</h3>
                <p className="mt-2 min-h-12 text-sm leading-6 text-slate-400">{pl.tagline}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {(pl.supported_versions ?? []).slice(0, 3).map((v: string) => (
                    <span key={v} className="rounded-md bg-white/5 px-2 py-1 text-xs text-slate-300">{v}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </Section>

        {/* SKILLS */}
        <Section eyebrow="Tech Arsenal" title="The stack behind plugins, dashboards, and optimized servers.">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skills.slice(0, 18).map((s: any) => (
              <div key={s.id} className="glass rounded-xl p-4">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-bold text-white">{s.name}</h3>
                  <span className="text-sm text-[#28e7ff]">{s.level}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-gradient-to-r from-[#28e7ff] to-[#8b5cf6]" style={{ width: `${s.level}%` }} />
                </div>
                <p className="mt-3 text-xs uppercase tracking-wide text-slate-500">{s.category}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* SERVICES */}
        <Section eyebrow="Services" title="Infrastructure-grade help for networks and communities.">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {services.map((svc: any) => (
              <div key={svc.id} className="glass rounded-xl p-5">
                <h3 className="text-xl font-black text-white">{svc.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{svc.description}</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-300">
                  {(svc.features ?? []).slice(0, 3).map((f: string) => <li key={f}>— {f}</li>)}
                </ul>
                {svc.starting_price ? <p className="mt-4 text-sm font-bold text-[#28e7ff]">{svc.starting_price}</p> : null}
              </div>
            ))}
          </div>
        </Section>

        {/* PINNED ANNOUNCEMENTS */}
        {pinnedAnnouncements.length > 0 && (
          <Section eyebrow="Latest Updates" title="Pinned announcements from the FighterPlayz channel.">
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {pinnedAnnouncements.map((a: any, i: number) => (
                <motion.article
                  key={a.id}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="glass rounded-xl p-5"
                >
                  <span className="rounded-full border border-[#28e7ff]/30 bg-[#28e7ff]/10 px-3 py-1 text-xs font-bold uppercase text-[#28e7ff]">{a.type}</span>
                  <h3 className="mt-3 text-xl font-black text-white">{a.title}</h3>
                  <p className="mt-2 line-clamp-4 text-sm text-slate-400">{a.body}</p>
                  <a href="/announcements" className="mt-4 inline-block text-xs font-semibold text-[#28e7ff]">Read all updates →</a>
                </motion.article>
              ))}
            </div>
          </Section>
        )}

        {/* REVIEWS */}
        {reviews.length > 0 && (
          <Section eyebrow="Reviews" title="What clients and collaborators are saying.">
            <div className="grid gap-5 md:grid-cols-2">
              {reviews.slice(0, 4).map((t: any, i: number) => (
                <motion.blockquote
                  key={t.id}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.05 }}
                  className="glass rounded-xl p-6"
                >
                  <p className="text-lg leading-8 text-slate-200">&ldquo;{t.message}&rdquo;</p>
                  <footer className="mt-5 text-sm text-slate-400">
                    <strong className="text-white">{t.name}</strong>{t.role ? ` — ${t.role}` : ""}
                  </footer>
                </motion.blockquote>
              ))}
            </div>
            <div className="mt-6"><a href="/reviews" className="text-sm font-semibold text-[#28e7ff]">Browse all reviews →</a></div>
          </Section>
        )}

        {/* CTA */}
        <section className="mx-auto w-full max-w-7xl px-5 pb-24 sm:px-8">
          <div className="glass rounded-2xl p-8 text-center sm:p-12">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#28e7ff]">Project Request</p>
            <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-black text-white sm:text-5xl">Initialize a Project Request</h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-300">Start a plugin, optimization pass, web build, or full ecosystem layer with a clear brief.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href="/contact" className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-[#28e7ff] px-5 py-2.5 text-sm font-semibold text-[#05070d] shadow-glow hover:bg-white">Open request channel</a>
              <a href="/tickets" className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-[#28e7ff]/30 px-5 py-2.5 text-sm font-semibold text-[#28e7ff] hover:bg-[#28e7ff]/10">Track existing ticket</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#090d18]/70">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-8 sm:px-8">
          <div className="flex items-center gap-2 font-black text-white">
            <ShieldCheck className="text-[#28e7ff]" size={20} />
            FighterPlayz Ecosystem
          </div>
          <p className="text-xs text-slate-500">@fightergamerofficial1</p>
        </div>
      </footer>
    </div>
  );
}

function Section({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
      <div className="mb-10 max-w-3xl">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#28e7ff]">{eyebrow}</p>
        <h2 className="text-balance text-3xl font-black tracking-tight text-white sm:text-5xl">{title}</h2>
      </div>
      {children}
    </section>
  );
}
