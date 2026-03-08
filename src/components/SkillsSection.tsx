const skills = [
  { name: "Python", level: 90, icon: "🐍" },
  { name: "Java", level: 95, icon: "☕" },
  { name: "C++", level: 80, icon: "⚡" },
  { name: "HTML/CSS", level: 92, icon: "🎨" },
  { name: "JavaScript", level: 88, icon: "📜" },
  { name: "Minecraft Dev", level: 97, icon: "⛏️" },
];

const SkillsSection = () => {
  return (
    <section className="py-24 px-4 relative" id="skills">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-xl md:text-2xl text-primary glow-text text-center mb-4">
          SKILL TREE
        </h2>
        <p className="text-center text-muted-foreground font-body mb-16">
          Enchantments & abilities unlocked over 6+ years
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((skill, i) => (
            <div
              key={skill.name}
              className="bg-card pixel-border p-5 animate-fade-in-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{skill.icon}</span>
                  <span className="font-pixel text-xs text-card-foreground">{skill.name}</span>
                </div>
                <span className="font-mono-code text-primary text-sm">LVL {skill.level}</span>
              </div>
              {/* XP bar */}
              <div className="h-3 bg-muted overflow-hidden" style={{ imageRendering: "pixelated" }}>
                <div
                  className="h-full bg-primary transition-all duration-1000"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
