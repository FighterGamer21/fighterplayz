import { ResourceManager } from "@/components/admin/resource-manager";
import { getSkills } from "@/server/data";

export default async function AdminSkillsPage() {
  const rows = await getSkills();
  return <div><h1 className="text-4xl font-black text-white">Manage Skills</h1><p className="mt-2 text-slate-400">Skill categories, levels, icons, and sort order.</p><div className="mt-8"><ResourceManager resource="skills" initialRows={rows as any[]} fields={["name", "category", "level", "sortOrder"]} /></div></div>;
}
