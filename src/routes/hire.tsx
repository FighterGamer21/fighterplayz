import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { HireDialog } from "@/components/site/HireDialog";
import { CURRENCIES, SERVICE_PRICES, formatCurrency, type CurrencyCode } from "@/lib/pricing";
import { useState } from "react";

export const Route = createFileRoute("/hire")({
  head: () => ({
    meta: [
      { title: "Hire FighterPlayz" },
      { name: "description", content: "Open a project ticket for plugin work, server optimization, Minecraft setup, or web development." },
      { property: "og:title", content: "Hire FighterPlayz" },
      { property: "og:description", content: "Open a project request and get a ticket ID." },
    ],
    links: [{ rel: "canonical", href: "/hire" }],
  }),
  component: HirePage,
});

function HirePage() {
  const [currency, setCurrency] = useState<CurrencyCode>("INR");

  return (
    <SiteLayout>
      <PageHero eyebrow="Hire" title="Open a project ticket" lead="Minecraft setup starts at Rs 3,000. Pick your currency estimate and submit a ticket." />
      <section className="mx-auto max-w-5xl px-5 pb-6 sm:px-8">
        <div className="glass flex flex-wrap items-center justify-between gap-4 rounded-xl p-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#28e7ff]">Currency preview</p>
            <p className="mt-1 text-sm text-slate-400">Prices are approximate converted estimates from INR.</p>
          </div>
          <select value={currency} onChange={(event) => setCurrency(event.target.value as CurrencyCode)} className="h-10 rounded-md border border-white/10 bg-[#05070d] px-3 text-sm text-white">
            {Object.entries(CURRENCIES).map(([code, item]) => <option key={code} value={code}>{item.label}</option>)}
          </select>
        </div>
      </section>
      <section className="mx-auto grid max-w-5xl gap-6 px-5 pb-24 sm:px-8 md:grid-cols-2">
        {SERVICE_PRICES.map((service, index) => (
          <motion.div
            key={service.slug}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06 }}
            className="glass rounded-xl p-6 transition hover:-translate-y-1 hover:border-[#28e7ff]/40"
          >
            <h3 className="text-xl font-black text-white">{service.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">{service.description}</p>
            <div className="mt-5 rounded-lg border border-white/10 bg-white/[0.03] p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Starting at</p>
              <p className="mt-1 text-2xl font-black text-[#28e7ff]">{formatCurrency(service.baseInr, currency)}</p>
              <p className="mt-1 text-xs text-slate-500">Base: Rs {service.baseInr.toLocaleString("en-IN")}</p>
            </div>
            <div className="mt-5">
              <HireDialog
                defaultProjectType={service.projectType}
                serviceSlug={service.slug}
                servicePriceInr={service.baseInr}
                trigger={<button className="rounded-md bg-[#28e7ff] px-3 py-1.5 text-xs font-semibold text-[#05070d] hover:bg-white">Open ticket</button>}
              />
            </div>
          </motion.div>
        ))}
      </section>
    </SiteLayout>
  );
}
