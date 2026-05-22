import { getDashboardCounts } from "@/server/data";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const counts = await getDashboardCounts();
  return (
    <div>
      <h1 className="text-4xl font-black text-white">Dashboard Overview</h1>
      <p className="mt-2 text-slate-400">Operational summary for the FighterPlayz content system.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Object.entries(counts).map(([label, value]) => <div key={label} className="glass rounded-xl p-6"><p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">{label}</p><p className="mt-4 text-4xl font-black text-white">{value}</p></div>)}
      </div>
    </div>
  );
}
