import { Wrench, Rocket, DraftingCompass, Gauge, CloudCog, Headset } from "lucide-react";
import { CommandCenter } from "@/components/sections/command-center";
import { EcosystemMap } from "@/components/sections/ecosystem-map";
import { Hero } from "@/components/sections/hero";
import { PluginCard, ProjectCard } from "@/components/sections/cards";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { getFeaturedPlugins, getFeaturedProjects, getServices, getSkills, getTestimonials } from "@/server/data";

const process = [
  ["Plan", DraftingCompass],
  ["Design", Wrench],
  ["Build", Rocket],
  ["Optimize", Gauge],
  ["Deploy", CloudCog],
  ["Maintain", Headset]
];

export default async function HomePage() {
  const [plugins, projects, skills, services, testimonials] = await Promise.all([
    getFeaturedPlugins(),
    getFeaturedProjects(),
    getSkills(),
    getServices(),
    getTestimonials()
  ]);

  return (
    <main>
      <Hero />
      <Section>
        <Reveal>
          <SectionHeading eyebrow="Command Center" title="Live-style operating metrics for the FighterPlayz build network." text="A premium infrastructure portfolio should feel operational. These signals summarize the ecosystem surface and the systems it can support." />
          <CommandCenter projects={projects.length} plugins={plugins.length} services={services.length} />
        </Reveal>
      </Section>
      <Section id="ecosystem">
        <Reveal>
          <SectionHeading eyebrow="Ecosystem Map" title="Connected brands, plugin systems, hosting concepts, and Minecraft operations." />
          <EcosystemMap />
        </Reveal>
      </Section>
      <Section>
        <Reveal>
          <SectionHeading eyebrow="Featured Plugins" title="Plugin systems built for server owners who care about polish and control." />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{plugins.map((plugin) => <PluginCard key={plugin.id} plugin={plugin} />)}</div>
        </Reveal>
      </Section>
      <Section>
        <Reveal>
          <SectionHeading eyebrow="Featured Projects" title="Minecraft, web, infrastructure, tools, and AI-ready systems." />
          <div className="mb-6 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wide text-slate-400">
            {["Minecraft", "Web", "Infrastructure", "Tools", "AI Systems"].map((item) => <span key={item} className="rounded-full border border-white/10 px-3 py-2">{item}</span>)}
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{projects.map((project) => <ProjectCard key={project.id} project={project} />)}</div>
        </Reveal>
      </Section>
      <Section>
        <Reveal>
          <SectionHeading eyebrow="Tech Arsenal" title="The stack behind plugins, dashboards, bots, panels, and optimized servers." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skills.slice(0, 18).map((skill) => (
              <div key={skill.id} className="glass rounded-xl p-4">
                <div className="mb-2 flex items-center justify-between"><h3 className="font-bold text-white">{skill.name}</h3><span className="text-sm text-cyan">{skill.level}%</span></div>
                <div className="h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-cyan to-violet" style={{ width: `${skill.level}%` }} /></div>
                <p className="mt-3 text-xs uppercase tracking-wide text-slate-500">{skill.category}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>
      <Section>
        <Reveal>
          <SectionHeading eyebrow="Services" title="Infrastructure-grade help for networks, plugins, panels, and community systems." />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{services.map((service) => <div key={service.id} className="glass rounded-xl p-5"><h3 className="text-xl font-black text-white">{service.title}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{service.description}</p><ul className="mt-4 space-y-2 text-sm text-slate-300">{service.features.slice(0, 3).map((f: string) => <li key={f}>• {f}</li>)}</ul></div>)}</div>
        </Reveal>
      </Section>
      <Section>
        <Reveal>
          <SectionHeading eyebrow="Process" title="From initial request to deployed and maintained system." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {process.map(([label, Icon], index) => <div key={String(label)} className="glass rounded-xl p-5"><Icon className="mb-5 text-cyan" size={24} /><p className="text-xs text-slate-500">0{index + 1}</p><h3 className="mt-2 text-xl font-black text-white">{String(label)}</h3></div>)}
          </div>
        </Reveal>
      </Section>
      <Section>
        <Reveal>
          <SectionHeading eyebrow="Testimonials" title="Signals from server owners and build collaborators." />
          <div className="grid gap-5 md:grid-cols-2">{testimonials.map((item) => <blockquote key={item.id} className="glass rounded-xl p-6"><p className="text-lg leading-8 text-slate-200">“{item.message}”</p><footer className="mt-5 text-sm text-slate-400"><strong className="text-white">{item.name}</strong> • {item.role}</footer></blockquote>)}</div>
        </Reveal>
      </Section>
      <Section className="pb-24">
        <div className="glass rounded-2xl p-8 text-center sm:p-12">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan">Project Request</p>
          <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-black text-white sm:text-5xl">Initialize a Project Request</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">Start a plugin, optimization pass, web build, or full ecosystem layer with a clear brief.</p>
          <div className="mt-8"><Button href="/contact">Open request channel</Button></div>
        </div>
      </Section>
    </main>
  );
}
