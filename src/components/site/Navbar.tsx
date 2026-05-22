import { Cpu, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/plugins", label: "Plugins" },
  { to: "/projects", label: "Projects" },
  { to: "/servers", label: "Servers" },
  { to: "/websites", label: "Websites" },
  { to: "/services", label: "Services" },
  { to: "/announcements", label: "Updates" },
  { to: "/reviews", label: "Reviews" },
  { to: "/hire", label: "Hire Me" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#05070d]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="/" className="flex items-center gap-3 font-black tracking-tight text-white" onClick={() => setOpen(false)}>
          <span className="grid size-10 place-items-center rounded-lg border border-[#28e7ff]/30 bg-[#28e7ff]/10 text-[#28e7ff] shadow-glow">
            <Cpu size={20} />
          </span>
          <span>FighterPlayz</span>
        </a>

        <nav className="hidden items-center gap-5 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.to}
              href={item.to}
              className="text-sm font-medium text-slate-300 transition hover:text-[#28e7ff]"
            >
              {item.label}
            </a>
          ))}
          <a
            href="/admin/login"
            className="rounded-md border border-[#28e7ff]/30 px-3 py-1.5 text-xs font-semibold text-[#28e7ff] hover:bg-[#28e7ff]/10"
          >
            Admin
          </a>
        </nav>

        <button
          aria-label="Toggle menu"
          className="grid size-10 place-items-center rounded-md border border-white/10 text-white lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <div className={cn("lg:hidden", open ? "block" : "hidden")}>
        <div className="space-y-1 border-t border-white/10 bg-[#05070d]/95 px-5 py-4">
          {NAV.map((item) => (
            <a
              key={item.to}
              href={item.to}
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2 text-sm font-medium text-slate-200 hover:bg-white/5 hover:text-[#28e7ff]"
            >
              {item.label}
            </a>
          ))}
          <a
            href="/admin/login"
            onClick={() => setOpen(false)}
            className="block rounded-md px-3 py-2 text-sm font-medium text-[#28e7ff] hover:bg-white/5"
          >
            Admin
          </a>
        </div>
      </div>
    </header>
  );
}
