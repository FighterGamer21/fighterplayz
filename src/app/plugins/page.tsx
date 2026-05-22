import type { Metadata } from "next";
import { PluginCard } from "@/components/sections/cards";
import { Section, SectionHeading } from "@/components/ui/section";
import { getPlugins } from "@/server/data";

export const metadata: Metadata = { title: "Plugins", description: "FighterPlayz Minecraft plugin systems, concepts, docs, and downloads." };

export default async function PluginsPage() {
  const plugins = await getPlugins();
  return (
    <main>
      <Section>
        <SectionHeading eyebrow="Plugins" title="Minecraft plugins and concepts built for reliable network operations." />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{plugins.map((plugin) => <PluginCard key={plugin.id} plugin={plugin} />)}</div>
      </Section>
    </main>
  );
}
