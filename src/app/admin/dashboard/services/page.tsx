import { ResourceManager } from "@/components/admin/resource-manager";
import { getServices } from "@/server/data";

export default async function AdminServicesPage() {
  const rows = await getServices();
  return <div><h1 className="text-4xl font-black text-white">Manage Services</h1><p className="mt-2 text-slate-400">Service cards, active toggles, and price labels.</p><div className="mt-8"><ResourceManager resource="services" initialRows={rows as any[]} fields={["title", "startingPrice", "active"]} /></div></div>;
}
