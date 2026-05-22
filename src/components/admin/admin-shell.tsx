import Link from "next/link";
import { LayoutDashboard, MessageSquare, Package, PanelsTopLeft, Plug, Settings, Sparkles, Star, Wrench } from "lucide-react";

const links = [
  ["Overview", "/admin/dashboard", LayoutDashboard],
  ["Projects", "/admin/dashboard/projects", PanelsTopLeft],
  ["Plugins", "/admin/dashboard/plugins", Plug],
  ["Skills", "/admin/dashboard/skills", Sparkles],
  ["Services", "/admin/dashboard/services", Wrench],
  ["Testimonials", "/admin/dashboard/testimonials", Star],
  ["Blog", "/admin/dashboard/blog", Package],
  ["Messages", "/admin/dashboard/messages", MessageSquare],
  ["Settings", "/admin/dashboard/settings", Settings]
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto grid max-w-7xl gap-6 px-5 py-8 sm:px-8 lg:grid-cols-[250px_1fr]">
      <aside className="glass h-fit rounded-xl p-4">
        <p className="mb-4 px-2 text-xs font-bold uppercase tracking-[0.22em] text-cyan">Command Center</p>
        <nav className="grid gap-1">
          {links.map(([label, href, Icon]) => <Link key={String(href)} href={String(href)} className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold text-slate-300 hover:bg-white/10 hover:text-white"><Icon size={17} />{String(label)}</Link>)}
        </nav>
      </aside>
      <section>{children}</section>
    </main>
  );
}
