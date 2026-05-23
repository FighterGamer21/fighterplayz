import { useEffect, useState, type ReactNode } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { checkAdminRole } from "@/lib/admin.functions";
import { AlertTriangle, LogOut } from "lucide-react";

const ADMIN_EMAIL = "fightergamerofficial1@gmail.com";

const LINKS = [
  ["/admin", "Dashboard"],
  ["/admin/tickets", "Hire Tickets"],
  ["/admin/messages", "Messages"],
  ["/admin/plugins", "Plugins"],
  ["/admin/projects", "Projects"],
  ["/admin/services", "Services"],
  ["/admin/skills", "Skills"],
  ["/admin/reviews", "Reviews"],
  ["/admin/announcements", "Announcements"],
  ["/admin/testimonials", "Testimonials"],
  ["/admin/blog", "Blog"],
] as const;

export function AdminShell({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const check = useServerFn(checkAdminRole);
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    let alive = true;
    const timeout = <T,>(promise: Promise<T>, ms: number, label: string) =>
      Promise.race<T>([
        promise,
        new Promise<T>((_, reject) => window.setTimeout(() => reject(new Error(`${label} timed out`)), ms)),
      ]);

    (async () => {
      setError("");
      const { data: sessionData } = await timeout(supabase.auth.getSession(), 8000, "Session check");
      const session = sessionData.session;
      const userEmail = session?.user?.email?.toLowerCase();
      if (!session?.user) { navigate({ to: "/admin/login" }); return; }

      try {
        const res = await timeout(check(), 8000, "Admin role check");
        if (!alive) return;
        if (!res.isAdmin) { navigate({ to: "/admin/login" }); return; }
        setReady(true);
      } catch (err: any) {
        if (!alive) return;
        if (userEmail === ADMIN_EMAIL.toLowerCase()) {
          setError("Role check was slow, so the command center opened for the configured admin email.");
          setReady(true);
          return;
        }
        navigate({ to: "/admin/login" });
      }
    })();
    return () => { alive = false; };
  }, [check, navigate]);

  if (!ready) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#05070d] text-slate-300">
        <div className="glass rounded-2xl p-8 text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-[#28e7ff]/20 border-t-[#28e7ff]" />
          <p className="text-sm font-semibold">Checking admin access...</p>
          <p className="mt-2 text-xs text-slate-500">This will auto-redirect if the session is not valid.</p>
        </div>
      </div>
    );
  }

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
      <main className="flex-1 p-6 md:p-10">
        {error ? (
          <div className="mb-5 flex items-center gap-2 rounded-lg border border-amber-300/20 bg-amber-300/10 px-4 py-3 text-sm text-amber-100">
            <AlertTriangle size={16} />
            {error}
          </div>
        ) : null}
        {children}
      </main>
    </div>
  );
}
