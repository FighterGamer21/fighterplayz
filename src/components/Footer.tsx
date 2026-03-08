import { motion } from "framer-motion";

const Footer = () => (
  <footer className="py-10 px-4 border-t border-border relative">
    <div className="absolute inset-0 block-grid opacity-10" />
    <div className="max-w-5xl mx-auto relative">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <motion.div
          className="font-pixel text-xs text-primary glow-text flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
        >
          <span>⛏️</span> {"<DEV/>"}
        </motion.div>

        <div className="flex items-center gap-4">
          {["⛏️", "💻", "🎮", "🌐"].map((icon, i) => (
            <motion.span
              key={i}
              className="text-lg cursor-pointer opacity-50 hover:opacity-100 transition-opacity"
              whileHover={{ y: -3, scale: 1.2 }}
            >
              {icon}
            </motion.span>
          ))}
        </div>

        <div className="font-mono-code text-[10px] text-muted-foreground">
          © 2026 — Built with ⛏️ & {"<code/>"}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-6 pt-4 border-t border-border/30 text-center">
        <div className="font-pixel text-[7px] text-muted-foreground/50 tracking-widest">
          CRAFTED WITH PASSION • BLOCK BY BLOCK • LINE BY LINE
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
