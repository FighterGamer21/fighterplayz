import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { CrudPanel } from "@/components/admin/CrudPanel";

export const Route = createFileRoute("/admin/projects")({
  head: () => ({ meta: [{ title: "Projects — Admin" }, { name: "robots", content: "noindex" }] }),
  component: () => (
    <AdminShell>
      <CrudPanel table="projects" title="Projects" fields={["slug","title","category","status","featured","sort_order","short_description","full_description","tech_stack","features","live_url","github_url","image"]} />
    </AdminShell>
  ),
});
