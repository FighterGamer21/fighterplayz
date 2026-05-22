import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { CrudPanel } from "@/components/admin/CrudPanel";

export const Route = createFileRoute("/admin/plugins")({
  head: () => ({ meta: [{ title: "Plugins — Admin" }, { name: "robots", content: "noindex" }] }),
  component: () => (
    <AdminShell>
      <CrudPanel table="plugins" title="Plugins" fields={["slug","name","tagline","plugin_type","version","price_type","status","featured","supported_versions","features","description","github_url","docs_url","image"]} />
    </AdminShell>
  ),
});
