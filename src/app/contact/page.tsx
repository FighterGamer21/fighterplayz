import type { Metadata } from "next";
import { ContactForm } from "@/components/sections/contact-form";
import { Section, SectionHeading } from "@/components/ui/section";

export const metadata: Metadata = { title: "Contact", description: "Initialize a FighterPlayz project request for Minecraft plugins, optimization, web systems, and infrastructure." };

export default function ContactPage() {
  return (
    <main>
      <Section>
        <SectionHeading eyebrow="Contact" title="Initialize a Project Request" text="Send a structured brief for plugin development, server optimization, web systems, hosting/panel setup, Discord backends, or network branding." />
        <ContactForm />
      </Section>
    </main>
  );
}
