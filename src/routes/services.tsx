import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { motion } from "framer-motion";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { HireDialog } from "@/components/site/HireDialog";
import { getServicesPublic } from "@/lib/public-data.functions";
import { CURRENCIES, SERVICE_PRICES, formatCurrency, type CurrencyCode } from "@/lib/pricing";

const opts = queryOptions({ queryKey: ["services"], queryFn: () => getServicesPublic() });

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services - FighterPlayz" },
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
  const [currency, setCurrency] = useState<CurrencyCode>("INR");
  const services = data.services.length ? data.services : SERVICE_PRICES.map((service) => ({
    id: service.slug,
    title: service.title,
    slug: service.slug,
    description: service.description,
    features: ["Planning", "Setup/build", "Testing", "Delivery support"],
    starting_price: `from Rs ${service.baseInr}`,
  }));

  return (
    <SiteLayout>
      <PageHero eyebrow="Services" title="What I build, for who needs it" lead="Minecraft setup and core services start at Rs 3,000, with live estimates for USD, NPR, PKR, and BDT." />
      <section className="mx-auto max-w-7xl px-5 pb-6 sm:px-8">
        <div className="glass flex flex-wrap items-center justify-between gap-4 rounded-xl p-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#28e7ff]">Currency</p>
            <p className="mt-1 text-sm text-slate-400">Approximate conversion from INR base pricing.</p>
          </div>
          <select value={currency} onChange={(event) => setCurrency(event.target.value as CurrencyCode)} className="h-10 rounded-md border border-white/10 bg-[#05070d] px-3 text-sm text-white">
            {Object.entries(CURRENCIES).map(([code, item]) => <option key={code} value={code}>{item.label}</option>)}
          </select>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-5 px-5 pb-20 sm:px-8 md:grid-cols-2">
        {services.map((s: any, index: number) => {
          const configured = SERVICE_PRICES.find((service) => service.slug === s.slug || service.title === s.title);
          const baseInr = configured?.baseInr ?? 3000;
          return (
            <motion.article
              key={s.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="glass flex h-full flex-col rounded-xl p-6 transition hover:-translate-y-1 hover:border-[#28e7ff]/40"
            >
              <h3 className="text-2xl font-black text-white">{s.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{s.description}</p>
              <ul className="mt-4 space-y-1.5 text-sm text-slate-300">
                {(s.features ?? []).map((f: string) => <li key={f}>- {f}</li>)}
              </ul>
              <div className="mt-auto flex items-center justify-between gap-3 pt-6">
                <span className="text-sm font-semibold text-[#28e7ff]">{formatCurrency(baseInr, currency)}</span>
                <HireDialog
                  defaultProjectType={s.title}
                  serviceSlug={configured?.slug ?? s.slug ?? "minecraft-setup"}
                  servicePriceInr={baseInr}
                  trigger={<button className="rounded-md bg-[#28e7ff] px-3 py-1.5 text-xs font-semibold text-[#05070d] hover:bg-white">Request</button>}
                />
              </div>
            </motion.article>
          );
        })}
      </section>
    </SiteLayout>
  );
}
