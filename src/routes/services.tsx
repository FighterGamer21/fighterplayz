import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { HireDialog } from "@/components/site/HireDialog";
import { getServicesPublic } from "@/lib/public-data.functions";
import { SEED_SERVICES } from "@/lib/seed-data";

const SERVICES_FALLBACK = {
  services: SEED_SERVICES.map((service, index) => ({ id: service.slug ?? `service-${index}`, ...service })),
};

async function loadServices() {
  try {
    return await getServicesPublic();
  } catch (error) {
    console.error("[services] using fallback content", error);
    return SERVICES_FALLBACK;
  }
}

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
  component: ServicesPage,
});

function ServicesPage() {
  const { data } = useQuery({
    queryKey: ["services"],
    queryFn: loadServices,
    initialData: SERVICES_FALLBACK,
    retry: false,
  });
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Services"
        title="What I build, for serious networks"
        lead="Premium Minecraft infrastructure, plugins, optimization, and web systems with clear scopes and clean delivery."
      />
      <section className="mx-auto grid max-w-7xl gap-5 px-5 pb-20 sm:px-8 md:grid-cols-2">
        {data.services.map((s, index) => (
          <article key={s.id} className="glass group relative flex h-full flex-col overflow-hidden rounded-xl p-6 transition duration-300 hover:-translate-y-1 hover:border-[#28e7ff]/35">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#28e7ff]/70 to-transparent opacity-0 transition group-hover:opacity-100" />
            <div className="mb-5 flex items-start justify-between gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-lg border border-[#28e7ff]/30 bg-[#28e7ff]/10 text-[#28e7ff] shadow-glow">
                <Sparkles size={20} />
              </span>
              <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-300">
                Tier {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="text-2xl font-black text-white">{s.title}</h3>
            <p className="mt-2 text-sm text-slate-400">{s.description}</p>
            <ul className="mt-5 grid gap-2 text-sm text-slate-300">
              {(s.features ?? []).map((f: string) => (
                <li key={f} className="flex items-start gap-2 rounded-lg border border-white/5 bg-white/[0.025] px-3 py-2">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-[#28e7ff]" size={16} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <div className="mt-auto flex items-center justify-between pt-6">
              <span className="rounded-full border border-[#28e7ff]/25 bg-[#28e7ff]/10 px-3 py-1 text-sm font-bold text-[#28e7ff]">{s.starting_price}</span>
              <HireDialog
                defaultProjectType={s.title}
                trigger={(
                  <button className="inline-flex items-center gap-1 rounded-md bg-[#28e7ff] px-3 py-1.5 text-xs font-bold text-[#05070d] transition hover:bg-white">
                    Request <ArrowRight size={14} />
                  </button>
                )}
              />
            </div>
          </article>
        ))}
      </section>
    </SiteLayout>
  );
}
