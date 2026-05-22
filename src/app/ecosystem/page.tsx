import type { Metadata } from "next";
import { EcosystemMap } from "@/components/sections/ecosystem-map";
import { Section, SectionHeading } from "@/components/ui/section";

export const metadata: Metadata = { title: "Ecosystem", description: "FighterPlayz ecosystem map for OGxDevs, OGxNodes, plugins, hosting, and Minecraft systems." };

export default function EcosystemPage() {
  return (
    <main>
      <Section>
        <SectionHeading eyebrow="Ecosystem" title="A connected operating layer for Minecraft infrastructure, developer systems, and gaming communities." text="FighterPlayz is positioned as more than a portfolio: it is the visible command surface for plugins, network operations, web systems, and brand infrastructure." />
        <EcosystemMap />
      </Section>
    </main>
  );
}
