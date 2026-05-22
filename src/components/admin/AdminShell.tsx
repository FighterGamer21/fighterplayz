import { useEffect, useState, type ReactNode } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { checkAdminRole } from "@/lib/admin.functions";
import { LogOut } from "lucide-react";

const LINKS = [
  ["/admin", "Dashboard"],
  ["/admin/tickets", "Hire Tickets"],
  ["/admin/messages", "Messages"],
  ["/admin/plugins", "Plugins"],
  ["/admin/projects", "Projects"],
  ["/admin/services", "Services"],
  ["/admin/skills", "Skills"],
  ["/admin/testimonials", "Testimonials"],
  ["/admin/reviews", "Reviews"],
  ["/admin/announcements", "Announcements"],
  ["/admin/blog", "Blog"],
] as const;

export function AdminShell({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();
  const check = useServerFn(checkAdminRole);
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    let alive = true;
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) { navigate({ to: "/admin/login" }); return; }
      try {
        const res = await check();
        if (!alive) return;
        if (!res.isAdmin) { navigate({ to: "/admin/login" }); return; }
        setReady(true);
      } catch { navigate({ to: "/admin/login" }); }
    })();
    return () => { alive = false; };
  }, [check, navigate]);

  if (!ready) return <div className="grid min-h-screen place-items-center bg-[#05070d] text-slate-400">Checking access…</div>;

  return (
    <div className="flex min-h-screen bg-[#05070d] text-slate-100">
      <aside className="hidden w-60 shrink-0 border-r border-white/10 bg-[#070b14] p-4 md:block">
        <Link to="/admin" className="mb-6 block text-lg font-black text-white">FP Admin</Link>
        <nav className="space-y-1 text-sm">
          {LINKS.map(([to, label]) => (
            <Link key={to} to={to} className={`block rounded-md px-3 py-2 ${path === to ? "bg-[#28e7ff]/10 text-[#28e7ff]" : "text-slate-300 hover:bg-white/5"}`}>
              {label}
            </Link>
          ))}
        </nav>
        <button
          onClick={async () => { await supabase.auth.signOut(); navigate({ to: "/admin/login" }); }}
          className="mt-6 flex w-full items-center gap-2 rounded-md border border-white/10 px-3 py-2 text-xs text-slate-300 hover:bg-white/5"
        >
          <LogOut size={14} /> Sign out
        </button>
      </aside>
      <main className="flex-1 p-6 md:p-10">{children}</main>
    </div>
  );
}
