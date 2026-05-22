import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { AdminShell } from "@/components/admin/AdminShell";
import { getAdminStats } from "@/lib/admin.functions";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "Admin — FighterPlayz" }, { name: "robots", content: "noindex" }] }),
  component: AdminHome,
});

function AdminHome() {
  const stats = useServerFn(getAdminStats);
  const [s, setS] = useState<any>(null);
  useEffect(() => { stats().then(setS).catch(() => setS({})); }, [stats]);
  const cards: [string, any][] = [
    ["Plugins", s?.plugins ?? "—"],
    ["Projects", s?.projects ?? "—"],
    ["Services", s?.services ?? "—"],
    ["New Tickets", s?.newTickets ?? "—"],
    ["New Messages", s?.newMessages ?? "—"],
    ["Testimonials", s?.testimonials ?? "—"],
  ];
  return (
    <AdminShell>
      <h1 className="text-3xl font-black text-white">Dashboard</h1>
      <p className="mt-1 text-sm text-slate-400">Overview of the FighterPlayz ecosystem.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(([label, value]) => (
          <div key={label} className="glass rounded-xl p-5">
            <p className="text-xs uppercase tracking-wider text-slate-400">{label}</p>
            <p className="mt-2 text-3xl font-black text-[#28e7ff]">{String(value)}</p>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
