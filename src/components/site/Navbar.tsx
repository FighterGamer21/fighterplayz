import { Cpu, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/ecosystem", label: "Ecosystem" },
  { to: "/plugins", label: "Plugins" },
  { to: "/projects", label: "Projects" },
  { to: "/services", label: "Services" },
  { to: "/announcements", label: "Updates" },
  { to: "/reviews", label: "Reviews" },
] as const;

const MORE_NAV = [
  { to: "/servers", label: "Servers" },
  { to: "/websites", label: "Websites" },
  { to: "/tickets", label: "My Tickets" },
  { to: "/contact", label: "Contact" },
  { to: "/hire", label: "Hire Me" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  const mobileNav = [...NAV, ...MORE_NAV];

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#05070d]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link to="/" className="flex shrink-0 items-center gap-3 font-black tracking-tight text-white" onClick={() => setOpen(false)}>
          <span className="grid size-10 place-items-center rounded-lg border border-[#28e7ff]/30 bg-[#28e7ff]/10 text-[#28e7ff] shadow-glow">
            <Cpu size={20} />
          </span>
          <span>FighterPlayz</span>
        </Link>

        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-1 xl:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-semibold transition",
                path === item.to ? "bg-[#28e7ff]/10 text-[#28e7ff]" : "text-slate-300 hover:bg-white/5 hover:text-[#28e7ff]",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 xl:flex">
          <Link to="/tickets" className="rounded-md border border-white/10 px-3 py-2 text-sm font-semibold text-slate-200 transition hover:border-[#28e7ff]/40 hover:text-[#28e7ff]">
            Tickets
          </Link>
          <Link to="/hire" className="rounded-md bg-[#28e7ff] px-3 py-2 text-sm font-bold text-[#05070d] shadow-glow transition hover:bg-white">
            Hire Me
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          className="grid size-10 place-items-center rounded-md border border-white/10 text-white xl:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <div className={cn("xl:hidden", open ? "block" : "hidden")}>
        <div className="grid gap-1 border-t border-white/10 bg-[#05070d]/95 px-5 py-4 sm:grid-cols-2">
          {mobileNav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={cn(
                "block rounded-md px-3 py-2 text-sm font-semibold",
                path === item.to ? "bg-[#28e7ff]/10 text-[#28e7ff]" : "text-slate-200 hover:bg-white/5 hover:text-[#28e7ff]",
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
