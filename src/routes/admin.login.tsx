import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { bootstrapAdminRole } from "@/lib/admin.functions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ADMIN_EMAIL = "fightergamerofficial1@gmail.com";

export const Route = createFileRoute("/admin/login")({
  head: () => ({ meta: [{ title: "Admin Login — FighterPlayz" }, { name: "robots", content: "noindex" }] }),
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const bootstrap = useServerFn(bootstrapAdminRole);
  const [busy, setBusy] = useState(false);
  const timeout = <T,>(promise: Promise<T>, ms: number, label: string) =>
    Promise.race<T>([
      promise,
      new Promise<T>((_, reject) => window.setTimeout(() => reject(new Error(`${label} timed out`)), ms)),
    ]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email") || "").trim();
    setBusy(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email, password: String(f.get("password") || ""),
      });
      if (error) throw error;
      try {
        const res = await timeout(bootstrap(), 8000, "Admin bootstrap");
        if (!res.isAdmin) { await supabase.auth.signOut(); toast.error("Not an admin"); return; }
      } catch (bootstrapError: any) {
        if (email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) throw bootstrapError;
        toast.warning("Admin role check was slow, opening command center for the configured admin email.");
      }
      toast.success("Welcome");
      navigate({ to: "/admin" });
    } catch (err: any) { toast.error(err?.message ?? "Sign-in failed"); }
    finally { setBusy(false); }
  }
  return (
    <div className="grid min-h-screen place-items-center bg-[#05070d] p-6 text-slate-100">
      <form onSubmit={onSubmit} className="glass w-full max-w-sm rounded-2xl p-8">
        <h1 className="text-2xl font-black text-white">Admin sign in</h1>
        <p className="mt-1 text-sm text-slate-400">FighterPlayz control panel</p>
        <div className="mt-6 grid gap-3">
          <div className="grid gap-1.5"><Label htmlFor="a-email">Email</Label><Input id="a-email" name="email" type="email" required /></div>
          <div className="grid gap-1.5"><Label htmlFor="a-pass">Password</Label><Input id="a-pass" name="password" type="password" required /></div>
          <button disabled={busy} className="mt-2 rounded-lg bg-[#28e7ff] px-5 py-2.5 text-sm font-semibold text-[#05070d] hover:bg-white disabled:opacity-60">{busy ? "Signing in…" : "Sign in"}</button>
        </div>
      </form>
    </div>
  );
}
