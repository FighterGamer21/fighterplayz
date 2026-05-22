import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { HireDialog } from "@/components/site/HireDialog";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — FighterPlayz" },
      { name: "description", content: "FighterPlayz builds Minecraft plugins, server infrastructure and modern web systems." },
      { property: "og:title", content: "About FighterPlayz" },
      { property: "og:description", content: "Minecraft developer, server engineer and web builder." },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="About"
        title="I build Minecraft systems that don't break under load."
        lead="FighterPlayz is a one-person studio building plugins, server infrastructure, network proxies and modern websites. The same hands write Java for Paper, tune Pterodactyl, and ship React UIs."
      />
      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-12 sm:px-8 md:grid-cols-3">
        {[
          { t: "Plugins", d: "Spigot/Paper plugins with configurable systems, GUIs, perms and clean lifecycle." },
          { t: "Servers", d: "Velocity networks, optimised Paper backends and Pterodactyl deployments." },
          { t: "Web", d: "TanStack Start + Supabase apps with real auth, database and modern UI." },
        ].map((b) => (
          <div key={b.t} className="glass rounded-xl p-6">
            <h3 className="text-xl font-black text-white">{b.t}</h3>
            <p className="mt-2 text-sm text-slate-400">{b.d}</p>
          </div>
        ))}
      </section>
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="glass flex flex-col items-start justify-between gap-6 rounded-2xl p-8 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-black text-white">Need something built?</h2>
            <p className="mt-2 max-w-xl text-slate-400">Open a project request and you'll get a ticket ID. I respond on email or Discord.</p>
          </div>
          <HireDialog
            defaultProjectType="Plugin"
            trigger={<button className="rounded-lg bg-[#28e7ff] px-5 py-3 text-sm font-semibold text-[#05070d] hover:bg-white">Hire me</button>}
          />
        </div>
      </section>
    </SiteLayout>
  );
}