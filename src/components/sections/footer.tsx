import Link from "next/link";
import { Github, Mail, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink/70">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <div className="mb-3 flex items-center gap-2 font-black text-white">
            <ShieldCheck className="text-cyan" size={20} />
            FighterPlayz Ecosystem
          </div>
          <p className="max-w-xl text-sm leading-6 text-slate-400">
            Minecraft plugin development, server optimization, web systems, and digital infrastructure engineered for serious gaming networks.
          </p>
        </div>
        <div>
          <p className="mb-3 text-sm font-bold text-white">Network</p>
          <div className="grid gap-2 text-sm text-slate-400">
            <Link href="/ecosystem">Ecosystem</Link>
            <Link href="/plugins">Plugins</Link>
            <Link href="/projects">Projects</Link>
          </div>
        </div>
        <div>
          <p className="mb-3 text-sm font-bold text-white">Signal</p>
          <div className="flex gap-3 text-slate-400">
            <Link aria-label="GitHub" href="https://www.fighterplays.com"><Github size={19} /></Link>
            <Link aria-label="Email" href="/contact"><Mail size={19} /></Link>
          </div>
          <p className="mt-4 text-xs text-slate-500">@fightergamerofficial1</p>
        </div>
      </div>
    </footer>
  );
}
