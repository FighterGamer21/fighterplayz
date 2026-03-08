import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const MinecraftParticles = () => {
  const particles = useMemo(() =>
    Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 4 + Math.random() * 8,
      duration: 3 + Math.random() * 4,
      delay: Math.random() * 5,
      char: ["✦", "◈", "⬥", "◆", "❖", "⬢"][Math.floor(Math.random() * 6)],
    })),
  []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute text-primary/20"
          style={{ left: `${p.x}%`, top: `${p.y}%`, fontSize: p.size }}
          animate={{
            y: [0, -40, 0],
            opacity: [0.1, 0.4, 0.1],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {p.char}
        </motion.div>
      ))}
    </div>
  );
};

const HeroSection = () => {
  const [displayText, setDisplayText] = useState("");
  const fullText = "> Minecraft Developer & Web Engineer";
  const [showSecondLine, setShowSecondLine] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(fullText.slice(0, i + 1));
      i++;
      if (i >= fullText.length) {
        clearInterval(interval);
        setTimeout(() => setShowSecondLine(true), 500);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/70 to-background" />
        <div className="absolute inset-0 block-grid" />
      </div>

      <MinecraftParticles />

      {/* Code rain columns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-primary/15 font-mono-code text-xs"
            style={{
              left: `${(i / 20) * 100}%`,
              animation: `code-rain ${8 + Math.random() * 8}s linear infinite`,
              animationDelay: `${Math.random() * 6}s`,
            }}
          >
            {Array.from({ length: 25 }).map((_, j) => (
              <div key={j}>
                {["0", "1", "{", "}", ";", "//", "fn", "=>", "if", "()", "int", "var", "new", "for", "try"][Math.floor(Math.random() * 15)]}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Minecraft block avatar with enchant shimmer */}
        <motion.div
          className="mb-8 inline-block"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
        >
          <div className="relative">
            <div className="w-28 h-28 mx-auto pixel-border bg-muted flex items-center justify-center text-5xl relative overflow-hidden">
              <div className="absolute inset-0 enchant-shimmer" />
              <span className="relative z-10">⛏️</span>
            </div>
            {/* Floating items around avatar */}
            <motion.span
              className="absolute -top-3 -right-3 text-2xl"
              animate={{ y: [0, -8, 0], rotate: [0, 15, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              💎
            </motion.span>
            <motion.span
              className="absolute -bottom-2 -left-3 text-xl"
              animate={{ y: [0, -6, 0], rotate: [0, -10, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
            >
              🔥
            </motion.span>
            <motion.span
              className="absolute top-0 -left-6 text-lg"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            >
              ⚡
            </motion.span>
          </div>
        </motion.div>

        <motion.h1
          className="text-2xl md:text-4xl lg:text-5xl leading-relaxed mb-6 glow-text text-primary animate-glitch"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          DEVELOPER
        </motion.h1>

        <div className="font-mono-code text-lg md:text-xl text-foreground mb-2 h-8">
          <span>{displayText}</span>
          <span className="animate-pulse text-primary">█</span>
        </div>

        {showSecondLine && (
          <motion.div
            className="font-mono-code text-sm text-minecraft-gold mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {">"} 6+ years of crafting digital worlds
          </motion.div>
        )}

        <motion.div
          className="font-body text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Building Minecraft servers & web applications.
          One block of code at a time.
        </motion.div>

        {/* Terminal-style stats with more detail */}
        <motion.div
          className="inline-block bg-code-bg pixel-border p-6 text-left font-mono-code text-sm relative overflow-hidden scanlines"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, type: "spring" }}
        >
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border/50">
            <span className="w-3 h-3 rounded-full bg-minecraft-redstone" />
            <span className="w-3 h-3 rounded-full bg-minecraft-gold" />
            <span className="w-3 h-3 rounded-full bg-minecraft-green" />
            <span className="text-muted-foreground text-xs ml-2">terminal@developer</span>
          </div>
          <div className="text-muted-foreground mb-2">$ neofetch --dev</div>
          <div className="grid grid-cols-1 gap-1">
            <div><span className="text-primary">┌ experience:</span> <span className="text-secondary-foreground">6+ years</span></div>
            <div><span className="text-primary">├ specialty:</span> <span className="text-secondary-foreground">Minecraft & Web Dev</span></div>
            <div><span className="text-primary">├ languages:</span> <span className="text-secondary-foreground">Java, Python, C++, JS</span></div>
            <div><span className="text-primary">├ servers:</span> <span className="text-secondary-foreground">10+ communities</span></div>
            <div><span className="text-primary">└ status:</span> <span className="text-minecraft-green">● online</span></div>
          </div>
        </motion.div>

        {/* Hotbar-style navigation hint */}
        <motion.div
          className="mt-12 hotbar inline-flex items-center gap-1 px-4 py-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
        >
          {["⛏️", "🗡️", "🏗️", "📖", "💬"].map((item, i) => (
            <div key={i} className="inventory-slot w-10 h-10 flex items-center justify-center text-lg">
              {item}
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <div className="mt-10 animate-float">
          <div className="font-pixel text-[9px] text-muted-foreground tracking-wider">SCROLL DOWN</div>
          <div className="text-primary text-xl mt-2">▼</div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
