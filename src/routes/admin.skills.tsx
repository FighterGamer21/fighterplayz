import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { CrudPanel } from "@/components/admin/CrudPanel";

export const Route = createFileRoute("/admin/skills")({
  head: () => ({ meta: [{ title: "Skills — Admin" }, { name: "robots", content: "noindex" }] }),
  component: () => (
    <AdminShell>
      <CrudPanel table="skills" title="Skills" fields={["name","category","level","description","sort_order","icon"]} />
    </AdminShell>
  ),
});
