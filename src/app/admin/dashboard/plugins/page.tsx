import { ResourceManager } from "@/components/admin/resource-manager";
import { getPlugins } from "@/server/data";

export const dynamic = "force-dynamic";

export default async function AdminPluginsPage() {
  const rows = await getPlugins();
  return <div><h1 className="text-4xl font-black text-white">Manage Plugins</h1><p className="mt-2 text-slate-400">Plugin CRUD, status badges, featured toggles, downloads, docs, commands, and permissions.</p><div className="mt-8"><ResourceManager resource="plugins" initialRows={rows as any[]} fields={["name", "pluginType", "version", "status", "featured"]} /></div></div>;
}
