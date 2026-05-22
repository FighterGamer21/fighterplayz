import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/ui/section";
import { getServices } from "@/server/data";

export const metadata: Metadata = { title: "Services", description: "Minecraft plugin development, server optimization, web development, panels, bots, and branding." };

export default async function ServicesPage() {
  const services = await getServices();
  return (
    <main>
      <Section>
        <SectionHeading eyebrow="Services" title="Commission infrastructure, plugins, optimization, panels, bots, and web systems." />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{services.map((service) => <article key={service.id} className="glass rounded-xl p-6"><h2 className="text-2xl font-black text-white">{service.title}</h2><p className="mt-3 leading-7 text-slate-400">{service.description}</p><ul className="mt-5 space-y-2 text-sm text-slate-300">{service.features.map((feature: string) => <li key={feature}>- {feature}</li>)}</ul><p className="mt-5 text-sm font-bold text-cyan">{service.startingPrice}</p></article>)}</div>
        <div className="mt-10"><Button href="/contact">Initialize a Project Request</Button></div>
      </Section>
    </main>
  );
}
