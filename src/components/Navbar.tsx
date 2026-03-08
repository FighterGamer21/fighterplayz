import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <a href="#" className="font-pixel text-xs text-primary glow-text">
          {"<DEV/>"}
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6 font-mono-code text-sm">
          {["Skills", "Projects", "About", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              .{item.toLowerCase()}()
            </a>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden font-pixel text-xs text-primary"
        >
          {open ? "[X]" : "[=]"}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-card border-b border-border px-4 py-4 flex flex-col gap-3 font-mono-code text-sm">
          {["Skills", "Projects", "About", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setOpen(false)}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              .{item.toLowerCase()}()
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
