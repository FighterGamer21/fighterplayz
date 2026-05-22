import { ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#090d18]/70">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:px-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 font-black text-white">
            <ShieldCheck className="text-[#28e7ff]" size={20} />
            FighterPlayz Ecosystem
          </div>
          <p className="mt-3 max-w-md text-sm text-slate-400">
            Minecraft plugin development, server optimization, web systems and infrastructure built for serious networks.
          </p>
        </div>
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-500">Explore</p>
          <ul className="space-y-2 text-sm">
            <li><a href="/plugins" className="text-slate-300 hover:text-[#28e7ff]">Plugins</a></li>
            <li><a href="/projects" className="text-slate-300 hover:text-[#28e7ff]">Projects</a></li>
            <li><a href="/servers" className="text-slate-300 hover:text-[#28e7ff]">Servers</a></li>
            <li><a href="/websites" className="text-slate-300 hover:text-[#28e7ff]">Websites</a></li>
          </ul>
        </div>
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-500">Connect</p>
          <ul className="space-y-2 text-sm">
            <li><a href="/services" className="text-slate-300 hover:text-[#28e7ff]">Services</a></li>
            <li><a href="/hire" className="text-slate-300 hover:text-[#28e7ff]">Hire Me</a></li>
            <li><a href="/contact" className="text-slate-300 hover:text-[#28e7ff]">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5 px-5 py-5 text-center text-xs text-slate-500 sm:px-8">
        © {new Date().getFullYear()} FighterPlayz · @fightergamerofficial1 · OGxDevs
      </div>
    </footer>
  );
}