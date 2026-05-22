import type { Metadata } from "next";
import { ProjectCard } from "@/components/sections/cards";
import { Section, SectionHeading } from "@/components/ui/section";
import { getProjects } from "@/server/data";

export const metadata: Metadata = { title: "Projects", description: "FighterPlayz Minecraft, web, infrastructure, tools, and systems projects." };

export default async function ProjectsPage() {
  const projects = await getProjects();
  return (
    <main>
      <Section>
        <SectionHeading eyebrow="Projects" title="Systems, networks, dashboards, tools, and Minecraft infrastructure builds." />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{projects.map((project) => <ProjectCard key={project.id} project={project} />)}</div>
      </Section>
    </main>
  );
}
