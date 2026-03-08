import { motion } from "framer-motion";

const skills = [
  { name: "Java", level: 95, icon: "☕", rarity: "legendary", desc: "Spigot, Bukkit, Paper plugins" },
  { name: "Python", level: 90, icon: "🐍", rarity: "epic", desc: "Bots, automation, web backends" },
  { name: "C++", level: 80, icon: "⚡", rarity: "rare", desc: "Performance-critical systems" },
  { name: "HTML/CSS", level: 92, icon: "🎨", rarity: "epic", desc: "Responsive, pixel-perfect UIs" },
  { name: "JavaScript", level: 88, icon: "📜", rarity: "epic", desc: "Full-stack web development" },
  { name: "Minecraft Dev", level: 97, icon: "⛏️", rarity: "legendary", desc: "Server configs, plugins, systems" },
];

const mcSkills = [
  { name: "Plugin Development", icon: "🔧" },
  { name: "Server Configuration", icon: "⚙️" },
  { name: "BungeeCord / Velocity", icon: "🌐" },
  { name: "Database Management", icon: "🗄️" },
  { name: "Anti-Cheat Systems", icon: "🛡️" },
  { name: "Custom Game Modes", icon: "🎮" },
  { name: "Economy Systems", icon: "💰" },
  { name: "Permission Systems", icon: "🔑" },
  { name: "World Generation", icon: "🌍" },
];

const rarityColors: Record<string, string> = {
  legendary: "text-minecraft-gold glow-text-gold",
  epic: "text-accent",
  rare: "text-minecraft-diamond",
};

const rarityBorders: Record<string, string> = {
  legendary: "pixel-border-gold",
  epic: "pixel-border",
  rare: "pixel-border-diamond",
};

const BlockDivider = () => (
  <div className="block-divider my-12">
    {["bg-minecraft-brown", "bg-minecraft-green", "bg-minecraft-stone", "bg-minecraft-green", "bg-minecraft-brown"].map((c, i) => (
      <span key={i} className={`${c} opacity-40`} />
    ))}
  </div>
);

const SkillsSection = () => {
  return (
    <section className="py-24 px-4 relative grass-top" id="skills">
      <div className="absolute inset-0 block-grid opacity-30" />
      <div className="max-w-5xl mx-auto relative">
        {/* Achievement banner */}
        <motion.div
          className="achievement-banner px-4 py-3 mb-10 font-mono-code text-sm"
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="text-minecraft-gold font-pixel text-[10px]">🏆 ACHIEVEMENT UNLOCKED:</span>{" "}
          <span className="text-card-foreground">Master of Multiple Languages</span>
        </motion.div>

        <h2 className="text-xl md:text-2xl text-primary glow-text text-center mb-4">
          SKILL TREE
        </h2>
        <p className="text-center text-muted-foreground font-body mb-4">
          Enchantments & abilities unlocked over 6+ years
        </p>

        {/* Rarity legend */}
        <div className="flex justify-center gap-6 mb-12 font-pixel text-[8px]">
          <span className="text-minecraft-gold">◆ LEGENDARY</span>
          <span className="text-accent">◆ EPIC</span>
          <span className="text-minecraft-diamond">◆ RARE</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              className={`bg-card ${rarityBorders[skill.rarity]} p-5 relative overflow-hidden group`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute inset-0 enchant-shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{skill.icon}</span>
                    <div>
                      <span className={`font-pixel text-xs ${rarityColors[skill.rarity]}`}>{skill.name}</span>
                      <div className="text-muted-foreground text-[10px] font-body mt-0.5">{skill.desc}</div>
                    </div>
                  </div>
                  <span className="font-mono-code text-primary text-sm">LVL {skill.level}</span>
                </div>
                {/* XP bar styled like MC */}
                <div className="mt-3 h-4 bg-muted overflow-hidden relative" style={{ imageRendering: "pixelated" }}>
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-minecraft-green relative"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.15 }}
                  >
                    {/* XP bar segments */}
                    <div className="absolute inset-0 flex">
                      {Array.from({ length: 20 }).map((_, j) => (
                        <div key={j} className="flex-1 border-r border-primary-foreground/20" />
                      ))}
                    </div>
                  </motion.div>
                  <span className="absolute right-2 top-0 h-full flex items-center font-pixel text-[7px] text-foreground">
                    {skill.level}/100 XP
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <BlockDivider />

        {/* Minecraft-specific skills inventory */}
        <h3 className="font-pixel text-sm text-minecraft-gold glow-text-gold text-center mb-8">
          MC INVENTORY
        </h3>
        <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
          {mcSkills.map((s, i) => (
            <motion.div
              key={s.name}
              className="inventory-slot px-4 py-3 flex items-center gap-2 cursor-default"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, type: "spring", stiffness: 300 }}
              whileHover={{ scale: 1.08 }}
            >
              <span className="text-lg">{s.icon}</span>
              <span className="font-mono-code text-xs text-card-foreground">{s.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
