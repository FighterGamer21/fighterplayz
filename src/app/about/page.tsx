import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/section";

export const metadata: Metadata = { title: "About", description: "About FighterPlayz, Minecraft developer and gaming infrastructure builder." };

export default function AboutPage() {
  return (
    <main>
      <Section className="min-h-[70vh]">
        <SectionHeading eyebrow="About FighterPlayz" title="Minecraft developer, plugin engineer, web systems builder, and infrastructure-focused gaming creator." text="FighterPlayz builds systems for Minecraft networks and gaming brands: plugins, optimized server stacks, dashboards, bots, panels, and identity layers that feel polished instead of improvised." />
        <div className="grid gap-5 lg:grid-cols-3">
          {["Plugin engineering", "Server optimization", "Web infrastructure"].map((item) => (
            <div key={item} className="glass rounded-xl p-6"><h2 className="text-2xl font-black text-white">{item}</h2><p className="mt-3 leading-7 text-slate-400">Production-minded systems with clean configuration, maintainable code, and operator-friendly workflows.</p></div>
          ))}
        </div>
      </Section>
    </main>
  );
}
