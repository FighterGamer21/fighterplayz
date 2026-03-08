import { useEffect, useState } from "react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const [displayText, setDisplayText] = useState("");
  const fullText = "> Minecraft Developer & Web Engineer";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(fullText.slice(0, i + 1));
      i++;
      if (i >= fullText.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>

      {/* Code rain columns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-primary/20 font-mono-code text-xs"
            style={{
              left: `${(i / 15) * 100}%`,
              animation: `code-rain ${8 + Math.random() * 6}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            {Array.from({ length: 20 }).map((_, j) => (
              <div key={j}>{["0", "1", "{", "}", ";", "//", "fn", "=>", "if", "()"][Math.floor(Math.random() * 10)]}</div>
            ))}
          </div>
        ))}
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Pixel avatar block */}
        <div className="mb-8 inline-block">
          <div className="w-24 h-24 mx-auto pixel-border bg-muted flex items-center justify-center text-4xl">
            ⛏️
          </div>
        </div>

        <h1 className="text-2xl md:text-4xl lg:text-5xl leading-relaxed mb-6 glow-text text-primary">
          DEVELOPER
        </h1>

        <div className="font-mono-code text-lg md:text-xl text-foreground mb-8 h-8">
          <span>{displayText}</span>
          <span className="animate-pulse text-primary">█</span>
        </div>

        <div className="font-body text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mb-10">
          6+ years crafting Minecraft servers & web applications.
          Building digital worlds, one block of code at a time.
        </div>

        {/* Terminal-style stats */}
        <div className="inline-block bg-code-bg pixel-border p-6 text-left font-mono-code text-sm">
          <div className="text-muted-foreground mb-1">$ cat stats.txt</div>
          <div><span className="text-primary">experience:</span> <span className="text-secondary-foreground">6+ years</span></div>
          <div><span className="text-primary">specialty:</span> <span className="text-secondary-foreground">Minecraft & Web Dev</span></div>
          <div><span className="text-primary">status:</span> <span className="text-minecraft-green">● online</span></div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 animate-float">
          <div className="font-pixel text-xs text-muted-foreground">SCROLL DOWN</div>
          <div className="text-primary text-2xl mt-2">▼</div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
