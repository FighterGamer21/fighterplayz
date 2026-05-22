import { ResourceManager } from "@/components/admin/resource-manager";
import { getTestimonials } from "@/server/data";

export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage() {
  const rows = await getTestimonials();
  return <div><h1 className="text-4xl font-black text-white">Manage Testimonials</h1><p className="mt-2 text-slate-400">Approve or hide social proof entries.</p><div className="mt-8"><ResourceManager resource="testimonials" initialRows={rows as any[]} fields={["name", "role", "rating", "approved"]} /></div></div>;
}
