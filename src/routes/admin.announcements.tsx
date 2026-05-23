import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { CrudPanel } from "@/components/admin/CrudPanel";

export const Route = createFileRoute("/admin/announcements")({
  head: () => ({ meta: [{ title: "Announcements — Admin" }, { name: "robots", content: "noindex" }] }),
  component: () => (
    <AdminShell>
      <CrudPanel table="announcements" title="Announcements" fields={["title","body","type","published","pinned"]} />
    </AdminShell>
  ),
});