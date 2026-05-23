import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Boxes, Code2, Network, Server, ShieldCheck, Zap } from "lucide-react";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/ecosystem")({
  head: () => ({
    meta: [
      { title: "Ecosystem - FighterPlayz" },
      { name: "description", content: "The FighterPlayz ecosystem across Minecraft plugins, servers, web systems, and infrastructure." },
      { property: "og:title", content: "FighterPlayz Ecosystem" },
      { property: "og:description", content: "A connected Minecraft infrastructure and developer systems brand." },
    ],
    links: [{ rel: "canonical", href: "/ecosystem" }],
  }),
  component: EcosystemPage,
});

const nodes = [
  { title: "FighterPlayz", body: "Core developer identity for plugins, web systems, and Minecraft infrastructure.", icon: ShieldCheck },
  { title: "OGxDevs", body: "Developer collaboration signal for tools, network systems, and custom builds.", icon: Code2 },
  { title: "OGxNodes", body: "Node, hosting, and deployment layer for server-focused projects.", icon: Network },
  { title: "Loftix Host", body: "Hosting and panel-oriented infrastructure path for client deployments.", icon: Server },
  { title: "ArctixMC Systems", body: "Minecraft network experiments, gameplay systems, and optimization work.", icon: Boxes },
  { title: "Plugin Systems", body: "Reusable command cores, GUIs, permissions, configs, and gameplay modules.", icon: Zap },
] as const;

function EcosystemPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Ecosystem"
        title="A connected infrastructure stack, not a basic portfolio"
        lead="FighterPlayz brings together Minecraft development, hosting logic, plugin engineering, server optimization, and web systems into one premium operating layer."
      />

      <section className="mx-auto max-w-7xl px-5 pb-24 pt-6 sm:px-8">
        <div className="relative grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_30%,rgba(40,231,255,0.12),transparent_34%),radial-gradient(circle_at_80%_70%,rgba(139,92,246,0.12),transparent_30%)]" />
          {nodes.map((node, index) => (
            <motion.article
              key={node.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className="glass group rounded-xl p-6 transition hover:-translate-y-1 hover:border-[#28e7ff]/35"
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="grid size-12 place-items-center rounded-lg border border-[#28e7ff]/30 bg-[#28e7ff]/10 text-[#28e7ff] shadow-glow">
                  <node.icon size={22} />
                </span>
                <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_20px_rgba(110,231,183,0.8)]" />
              </div>
              <h2 className="text-2xl font-black text-white">{node.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">{node.body}</p>
            </motion.article>
          ))}
        </div>

        <div className="glass mt-8 rounded-xl p-6">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#28e7ff]">Signal Flow</p>
          <div className="mt-5 grid gap-3 text-sm text-slate-300 md:grid-cols-5">
            {["Plan", "Build", "Optimize", "Deploy", "Maintain"].map((step) => (
              <div key={step} className="rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-center font-bold">
                {step}
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
