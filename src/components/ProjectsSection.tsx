const pastProjects = [
  { name: "Haider Network", role: "Main Developer", desc: "Built core systems, plugins & infrastructure" },
  { name: "UGNetwork", role: "Main Developer", desc: "Full server development & management" },
  { name: "AliveMC", role: "Developer", desc: "Custom gameplay mechanics & features" },
  { name: "Ancient MC", role: "Developer", desc: "Server plugins & optimization" },
  { name: "SunMC", role: "Developer", desc: "Game modes & server systems" },
];

const currentProjects = [
  { name: "OGXNetwork", role: "Active Developer", status: "IN PROGRESS" },
  { name: "MoonMC", role: "Active Developer", status: "IN PROGRESS" },
  { name: "UGXEvents", role: "Active Developer", status: "IN PROGRESS" },
];

const ProjectsSection = () => {
  return (
    <section className="py-24 px-4 bg-muted/30" id="projects">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-xl md:text-2xl text-primary glow-text text-center mb-4">
          PROJECTS
        </h2>
        <p className="text-center text-muted-foreground font-body mb-16">
          Worlds built & servers crafted
        </p>

        {/* Current Projects */}
        <div className="mb-16">
          <div className="font-mono-code text-minecraft-green text-sm mb-6 flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-minecraft-green animate-pulse" />
            Currently Active
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {currentProjects.map((p) => (
              <div key={p.name} className="bg-card pixel-border p-5 relative overflow-hidden group hover:border-primary transition-colors">
                <div className="absolute top-2 right-2 font-pixel text-[8px] text-minecraft-green">{p.status}</div>
                <div className="font-pixel text-xs text-card-foreground mb-2">{p.name}</div>
                <div className="font-mono-code text-sm text-muted-foreground">{p.role}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Past Projects */}
        <div>
          <div className="font-mono-code text-muted-foreground text-sm mb-6">
            // Previous works
          </div>
          <div className="bg-code-bg pixel-border p-6 font-mono-code text-sm">
            <div className="text-muted-foreground mb-3">$ git log --oneline projects/</div>
            {pastProjects.map((p, i) => (
              <div key={p.name} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 py-2 border-b border-border/50 last:border-0">
                <span className="text-muted-foreground text-xs">#{String(i + 1).padStart(3, "0")}</span>
                <span className="text-primary font-semibold">{p.name}</span>
                <span className="text-minecraft-gold text-xs">[{p.role}]</span>
                <span className="text-muted-foreground text-xs hidden sm:inline">— {p.desc}</span>
              </div>
            ))}
            <div className="text-muted-foreground mt-3">... and many more</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
