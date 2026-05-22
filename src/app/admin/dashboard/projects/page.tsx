import { ResourceManager } from "@/components/admin/resource-manager";
import { getProjects } from "@/server/data";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const rows = await getProjects();
  return <AdminPage title="Manage Projects"><ResourceManager resource="projects" initialRows={rows as any[]} fields={["title", "category", "status", "featured", "sortOrder"]} /></AdminPage>;
}

function AdminPage({ title, children }: { title: string; children: React.ReactNode }) {
  return <div><h1 className="text-4xl font-black text-white">{title}</h1><p className="mt-2 text-slate-400">Create, search, reorder, toggle, and remove content.</p><div className="mt-8">{children}</div></div>;
}
