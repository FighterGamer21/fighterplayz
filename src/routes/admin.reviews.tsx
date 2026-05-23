import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { CrudPanel } from "@/components/admin/CrudPanel";

export const Route = createFileRoute("/admin/reviews")({
  head: () => ({ meta: [{ title: "Reviews — Admin" }, { name: "robots", content: "noindex" }] }),
  component: () => (
    <AdminShell>
      <CrudPanel table="reviews" title="Reviews" fields={["name","role","message","rating","approved"]} />
    </AdminShell>
  ),
});