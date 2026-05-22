import { ResourceManager } from "@/components/admin/resource-manager";
import { getPosts } from "@/server/data";

export default async function AdminBlogPage() {
  const rows = await getPosts();
  return <div><h1 className="text-4xl font-black text-white">Manage Blog Posts</h1><p className="mt-2 text-slate-400">Dev log content and publication state.</p><div className="mt-8"><ResourceManager resource="blog" initialRows={rows as any[]} fields={["title", "slug", "published", "createdAt"]} /></div></div>;
}
