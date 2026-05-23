import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { HireDialog } from "@/components/site/HireDialog";

export const Route = createFileRoute("/hire")({
  head: () => ({
    meta: [
      { title: "Hire FighterPlayz" },
      { name: "description", content: "Open a project ticket for plugin work, server optimization, network setup, or web development." },
      { property: "og:title", content: "Hire FighterPlayz" },
      { property: "og:description", content: "Open a project request and get a ticket ID." },
    ],
    links: [{ rel: "canonical", href: "/hire" }],
  }),
  component: HirePage,
});

function HirePage() {
  return (
    <SiteLayout>
      <PageHero eyebrow="Hire" title="Open a project ticket" lead="Tell me what you want built. You'll get a ticket ID and I'll reply via email or Discord." />
      <section className="mx-auto grid max-w-5xl gap-6 px-5 pb-24 sm:px-8 md:grid-cols-3">
        {[
          { t: "Plugin work", d: "Custom Spigot/Paper plugins, GUIs, configs.", type: "Plugin Development" },
          { t: "Server setup", d: "Velocity, Paper tuning, Pterodactyl deploy.", type: "Server Setup" },
          { t: "Web build", d: "React / TanStack / Tailwind / Supabase.", type: "Web Development" },
        ].map((c) => (
          <div key={c.t} className="glass rounded-xl p-6">
            <h3 className="text-xl font-black text-white">{c.t}</h3>
            <p className="mt-2 text-sm text-slate-400">{c.d}</p>
            <div className="mt-5">
              <HireDialog defaultProjectType={c.type} trigger={<button className="rounded-md bg-[#28e7ff] px-3 py-1.5 text-xs font-semibold text-[#05070d] hover:bg-white">Open ticket</button>} />
            </div>
          </div>
        ))}
      </section>
    </SiteLayout>
  );
}