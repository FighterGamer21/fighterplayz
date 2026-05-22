import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { CrudPanel } from "@/components/admin/CrudPanel";

export const Route = createFileRoute("/admin/blog")({
  head: () => ({ meta: [{ title: "Blog Posts — Admin" }, { name: "robots", content: "noindex" }] }),
  component: () => (
    <AdminShell>
      <CrudPanel table="blog_posts" title="Blog Posts" fields={["slug","title","excerpt","content","tags","cover_image","published"]} />
    </AdminShell>
  ),
});
