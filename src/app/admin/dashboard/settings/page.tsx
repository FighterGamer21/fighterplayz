import { ResourceManager } from "@/components/admin/resource-manager";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const rows = process.env.DATABASE_URL && !process.env.DATABASE_URL.includes("localhost")
    ? await import("@/lib/prisma").then(async ({ getPrisma }) => (await getPrisma()).siteSetting.findMany()).catch(() => [])
    : [];
  return <div><h1 className="text-4xl font-black text-white">Site Settings</h1><p className="mt-2 text-slate-400">Editable key/value configuration for brand, SEO, and integration settings.</p><div className="mt-8"><ResourceManager resource="settings" initialRows={rows as any[]} fields={["key", "value"]} /></div></div>;
}
