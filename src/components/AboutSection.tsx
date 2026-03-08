import { motion } from "framer-motion";

const timeline = [
  { year: "2020", event: "Started Minecraft plugin development", icon: "⛏️" },
  { year: "2021", event: "Joined Haider Network as Main Dev", icon: "🏰" },
  { year: "2022", event: "Built UGNetwork from scratch", icon: "⚔️" },
  { year: "2023", event: "Expanded to web development", icon: "🌐" },
  { year: "2024", event: "Worked on AliveMC, AncientMC, SunMC", icon: "☀️" },
  { year: "2025", event: "Started OGXNetwork & MoonMC", icon: "🌙" },
  { year: "NOW", event: "Actively building new communities", icon: "🔥" },
];

const codeSnippet = `public class Developer extends CraftPlayer {
  
  private final String name = "Developer";
  private final int experience = 6; // years
  private final String[] skills = {
    "Java", "Python", "C++", 
    "HTML", "CSS", "JavaScript"
  };
  
  @Override
  public void onJoin(ServerEvent event) {
    broadcast("§a§l⛏ Ready to build!");
    setGameMode(GameMode.CREATIVE);
  }
  
  public boolean isPassionate() {
    return true; // always
  }
}`;

const AboutSection = () => {
  return (
    <section className="py-24 px-4 grass-top" id="about">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-xl md:text-2xl text-primary glow-text text-center mb-12">
          ABOUT ME
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left - Code card */}
          <motion.div
            className="bg-card pixel-border p-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="font-mono-code text-sm mb-6">
              <span className="text-muted-foreground">/**</span>
              <br />
              <span className="text-muted-foreground"> * @developer Minecraft & Web</span>
              <br />
              <span className="text-muted-foreground"> * @experience 6+ years</span>
              <br />
              <span className="text-muted-foreground"> * @status Always building</span>
              <br />
              <span className="text-muted-foreground"> */</span>
            </div>

            <p className="font-body text-card-foreground leading-relaxed mb-6">
              I'm a passionate developer who bridges the gap between{" "}
              <span className="text-primary font-semibold">Minecraft server development</span> and{" "}
              <span className="text-primary font-semibold">modern web engineering</span>. 
              With over 6 years of experience, I've built and maintained servers for some of 
              the most active Minecraft communities.
            </p>

            <p className="font-body text-card-foreground leading-relaxed mb-8">
              From writing complex Java plugins and C++ optimizations to creating full web 
              dashboards with HTML, CSS, JavaScript, and Python backends — I bring the same 
              dedication to every project.
            </p>

            {/* Tech stack inventory grid */}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {[
                { name: "Java", emoji: "☕" },
                { name: "Python", emoji: "🐍" },
                { name: "C++", emoji: "⚡" },
                { name: "HTML", emoji: "📄" },
                { name: "CSS", emoji: "🎨" },
                { name: "JS", emoji: "📜" },
              ].map((tech, i) => (
                <motion.div
                  key={tech.name}
                  className="inventory-slot p-2 text-center cursor-default"
                  whileHover={{ scale: 1.1 }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div className="text-xl mb-1">{tech.emoji}</div>
                  <div className="font-pixel text-[7px] text-primary">{tech.name}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Code snippet display */}
          <motion.div
            className="bg-code-bg pixel-border p-5 font-mono-code text-xs relative overflow-hidden scanlines"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border/50">
              <span className="w-3 h-3 rounded-full bg-minecraft-redstone" />
              <span className="w-3 h-3 rounded-full bg-minecraft-gold" />
              <span className="w-3 h-3 rounded-full bg-minecraft-green" />
              <span className="text-muted-foreground text-[10px] ml-2">Developer.java</span>
            </div>
            <pre className="overflow-x-auto">
              <code>
                {codeSnippet.split('\n').map((line, i) => (
                  <div key={i} className="flex">
                    <span className="text-muted-foreground/40 w-6 text-right mr-3 select-none">{i + 1}</span>
                    <span className="text-card-foreground">
                      {line.replace(/(public|class|extends|private|final|new|return|void|int|boolean|String)/g, 
                        (match) => `<keyword>${match}</keyword>`)
                        .split(/(<keyword>.*?<\/keyword>|"[^"]*"|\b\d+\b|\/\/.*$)/g)
                        .map((part, j) => {
                          if (part.startsWith('<keyword>')) {
                            return <span key={j} className="text-minecraft-diamond">{part.replace(/<\/?keyword>/g, '')}</span>;
                          }
                          if (part.startsWith('"')) {
                            return <span key={j} className="text-minecraft-green">{part}</span>;
                          }
                          if (part.startsWith('//')) {
                            return <span key={j} className="text-muted-foreground">{part}</span>;
                          }
                          if (/^\d+$/.test(part)) {
                            return <span key={j} className="text-minecraft-gold">{part}</span>;
                          }
                          return <span key={j}>{part}</span>;
                        })}
                    </span>
                  </div>
                ))}
              </code>
            </pre>
          </motion.div>
        </div>

        {/* Timeline */}
        <div className="mt-16">
          <h3 className="font-pixel text-sm text-minecraft-gold glow-text-gold text-center mb-10">
            JOURNEY LOG
          </h3>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-border" />
            
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                className={`relative flex items-center gap-4 mb-6 ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className={`flex-1 hidden md:block ${i % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <div className="font-pixel text-[10px] text-primary mb-1">{item.year}</div>
                  <div className="font-body text-sm text-card-foreground">{item.event}</div>
                </div>
                
                {/* Center dot */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                  <div className="inventory-slot w-10 h-10 flex items-center justify-center text-lg">
                    {item.icon}
                  </div>
                </div>

                <div className={`flex-1 ml-16 md:ml-0 ${i % 2 === 0 ? 'md:pl-8' : 'md:pr-8'}`}>
                  <div className="md:hidden">
                    <div className="font-pixel text-[10px] text-primary mb-1">{item.year}</div>
                    <div className="font-body text-sm text-card-foreground">{item.event}</div>
                  </div>
                  <div className="hidden md:block" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
