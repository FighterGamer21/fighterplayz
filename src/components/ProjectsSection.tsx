import { motion } from "framer-motion";

const pastProjects = [
  { name: "Haider Network", role: "Main Developer", desc: "Built core systems, plugins & infrastructure", icon: "🏰" },
  { name: "UGNetwork", role: "Main Developer", desc: "Full server development & management", icon: "⚔️" },
  { name: "AliveMC", role: "Developer", desc: "Custom gameplay mechanics & features", icon: "🌿" },
  { name: "Ancient MC", role: "Developer", desc: "Server plugins & optimization", icon: "🏛️" },
  { name: "SunMC", role: "Developer", desc: "Game modes & server systems", icon: "☀️" },
];

const currentProjects = [
  { name: "OGXNetwork", role: "Active Developer", status: "IN PROGRESS", icon: "🔥", desc: "Building next-gen network infrastructure" },
  { name: "MoonMC", role: "Active Developer", status: "IN PROGRESS", icon: "🌙", desc: "Custom game modes & features" },
  { name: "UGXEvents", role: "Active Developer", status: "IN PROGRESS", icon: "🎪", desc: "Event management & tournament systems" },
];

const ProjectsSection = () => {
  return (
    <section className="py-24 px-4 relative" id="projects">
      <div className="absolute inset-0 dirt-pattern opacity-5" />
      <div className="max-w-5xl mx-auto relative">
        <h2 className="text-xl md:text-2xl text-primary glow-text text-center mb-4">
          PROJECTS
        </h2>
        <p className="text-center text-muted-foreground font-body mb-16">
          Worlds built & servers crafted
        </p>

        {/* Current Projects - Card style */}
        <div className="mb-16">
          <motion.div
            className="font-mono-code text-minecraft-green text-sm mb-6 flex items-center gap-2"
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="inline-block w-3 h-3 rounded-full bg-minecraft-green animate-redstone-pulse" 
                  style={{ "--minecraft-redstone": "var(--minecraft-green)" } as React.CSSProperties} />
            <span className="font-pixel text-[10px]">CURRENTLY ACTIVE</span>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {currentProjects.map((p, i) => (
              <motion.div
                key={p.name}
                className="bg-card pixel-border p-6 relative overflow-hidden group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -4 }}
              >
                <div className="absolute inset-0 enchant-shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="absolute top-0 right-0 font-pixel text-[7px] text-minecraft-green flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-minecraft-green animate-pulse" />
                    {p.status}
                  </div>
                  <div className="text-3xl mb-3">{p.icon}</div>
                  <div className="font-pixel text-xs text-card-foreground mb-2">{p.name}</div>
                  <div className="font-mono-code text-sm text-minecraft-gold mb-2">{p.role}</div>
                  <div className="font-body text-xs text-muted-foreground">{p.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Past Projects - Terminal log style */}
        <div>
          <div className="font-mono-code text-muted-foreground text-sm mb-6">
            {"// "}Previous works — Battle-tested & deployed
          </div>
          <motion.div
            className="bg-code-bg pixel-border p-6 font-mono-code text-sm relative overflow-hidden scanlines"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {/* Terminal header */}
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border/50">
              <span className="w-3 h-3 rounded-full bg-minecraft-redstone" />
              <span className="w-3 h-3 rounded-full bg-minecraft-gold" />
              <span className="w-3 h-3 rounded-full bg-minecraft-green" />
              <span className="text-muted-foreground text-xs ml-2">git-log</span>
            </div>

            <div className="text-muted-foreground mb-3">
              <span className="text-primary">$</span> git log --oneline --graph projects/
            </div>

            {pastProjects.map((p, i) => (
              <motion.div
                key={p.name}
                className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 py-3 border-b border-border/30 last:border-0 group"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <span className="text-xl">{p.icon}</span>
                <span className="text-muted-foreground text-xs font-mono-code">
                  <span className="text-minecraft-redstone">*</span> {String(i + 1).padStart(3, "0")}
                </span>
                <span className="text-primary font-semibold group-hover:glow-text transition-all">{p.name}</span>
                <span className="text-minecraft-gold text-xs pixel-border-gold px-2 py-0.5 inline-block w-fit">[{p.role}]</span>
                <span className="text-muted-foreground text-xs hidden sm:inline flex-1">— {p.desc}</span>
              </motion.div>
            ))}

            <div className="text-muted-foreground mt-4 flex items-center gap-2">
              <span className="text-primary">$</span> 
              <span>... and many more servers crafted</span>
              <span className="cursor-blink" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
