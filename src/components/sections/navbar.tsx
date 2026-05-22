"use client";

import Link from "next/link";
import { Menu, X, Cpu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const nav = [
  ["Ecosystem", "/ecosystem"],
  ["Projects", "/projects"],
  ["Plugins", "/plugins"],
  ["Services", "/services"],
  ["Dev Logs", "/blog"],
  ["Contact", "/contact"]
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-void/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-3 font-black tracking-tight text-white">
          <span className="grid size-10 place-items-center rounded-lg border border-cyan/30 bg-cyan/10 text-cyan shadow-glow">
            <Cpu size={20} />
          </span>
          <span>FighterPlayz</span>
        </Link>
        <nav className="hidden items-center gap-6 lg:flex">
          {nav.map(([label, href]) => (
            <Link key={href} href={href} className="text-sm font-medium text-slate-300 transition hover:text-cyan">
              {label}
            </Link>
          ))}
          <Button href="/admin/login" variant="outline" className="min-h-10 px-4">Admin</Button>
        </nav>
        <button aria-label="Toggle menu" onClick={() => setOpen((value) => !value)} className="grid size-10 place-items-center rounded-lg border border-white/10 text-white lg:hidden">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open ? (
        <div className="border-t border-white/10 bg-ink/95 px-5 py-5 lg:hidden">
          <div className="grid gap-2">
            {nav.map(([label, href]) => (
              <Link key={href} href={href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10">
                {label}
              </Link>
            ))}
            <Button href="/admin/login" variant="outline" className="mt-2">Admin Login</Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
