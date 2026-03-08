import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const items = ["Skills", "Projects", "About", "Contact"];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <motion.a
          href="#"
          className="font-pixel text-xs text-primary glow-text flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
        >
          <span className="text-lg">⛏️</span>
          {"<DEV/>"}
        </motion.a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {items.map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-muted-foreground hover:text-primary transition-colors font-mono-code text-sm px-3 py-1.5 rounded-sm hover:bg-muted/50"
              whileHover={{ y: -1 }}
            >
              .{item.toLowerCase()}()
            </motion.a>
          ))}
          <div className="ml-4 inventory-slot px-3 py-1.5 font-pixel text-[8px] text-minecraft-green cursor-pointer">
            ● ONLINE
          </div>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden font-pixel text-xs text-primary inventory-slot w-10 h-10 flex items-center justify-center"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="md:hidden bg-card border-b border-border px-4 py-4 flex flex-col gap-2 font-mono-code text-sm"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            {items.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setOpen(false)}
                className="text-muted-foreground hover:text-primary transition-colors py-2 px-3 hover:bg-muted/50"
              >
                .{item.toLowerCase()}()
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
