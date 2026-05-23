import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { adminListResource, adminUpsertResource, adminDeleteResource } from "@/lib/admin.functions";

type TableName = "plugins" | "projects" | "services" | "skills" | "testimonials" | "blog_posts" | "announcements" | "reviews";
const ARRAY_FIELDS = ["features","tech_stack","supported_versions","gallery","tags","dependencies"];
const BOOL_FIELDS = ["featured","active","approved","published","pinned","currently_working"];
const NUM_FIELDS = ["sort_order","level","rating","price"];
const LONG_FIELDS = ["description","full_description","short_description","content","details","message","tagline","body"];

export function CrudPanel({ table, title, fields }: { table: TableName; title: string; fields: string[] }) {
  const list = useServerFn(adminListResource);
  const upsert = useServerFn(adminUpsertResource);
  const del = useServerFn(adminDeleteResource);
  const [rows, setRows] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);
  async function load() { try { const r = await list({ data: { table } }); setRows(r.rows); } catch (e: any) { toast.error(e?.message); } }
  useEffect(() => { load(); /* eslint-disable-next-line */ }, [table]);
  function parseVal(field: string, raw: string): any {
    if (raw === "") return null;
    if (ARRAY_FIELDS.includes(field)) return raw.split(",").map((s) => s.trim()).filter(Boolean);
    if (BOOL_FIELDS.includes(field)) return raw === "true";
    if (NUM_FIELDS.includes(field)) return Number(raw);
    return raw;
  }
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const row: Record<string, any> = {};
    if (editing?.id) row.id = editing.id;
    for (const field of fields) row[field] = parseVal(field, String(f.get(field) ?? ""));
    try { await upsert({ data: { table, row } }); toast.success("Saved"); setEditing(null); await load(); }
    catch (err: any) { toast.error(err?.message); }
  }
  async function onDelete(id: string) {
    if (!confirm("Delete?")) return;
    try { await del({ data: { table, id } }); toast.success("Deleted"); await load(); }
    catch (e: any) { toast.error(e?.message); }
  }
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black text-white">{title}</h1>
        <button onClick={() => setEditing({})} className="rounded-md bg-[#28e7ff] px-3 py-1.5 text-sm font-semibold text-[#05070d]">+ New</button>
      </div>
      {editing ? (
        <form onSubmit={onSubmit} className="glass mt-6 grid gap-3 rounded-xl p-5">
          {fields.map((field) => {
            const v = editing?.[field];
            const display = Array.isArray(v) ? v.join(", ") : v == null ? "" : String(v);
            return (
              <div key={field} className="grid gap-1">
                <label className="text-xs uppercase tracking-wider text-slate-400">{field}</label>
                {LONG_FIELDS.includes(field) ? (
                  <textarea name={field} defaultValue={display} rows={4} className="rounded-md border border-white/10 bg-[#05070d] px-3 py-2 text-sm" />
                ) : (
                  <input name={field} defaultValue={display} className="h-9 rounded-md border border-white/10 bg-[#05070d] px-3 text-sm" />
                )}
              </div>
            );
          })}
          <div className="flex gap-2">
            <button className="rounded-md bg-[#28e7ff] px-4 py-2 text-sm font-semibold text-[#05070d]">Save</button>
            <button type="button" onClick={() => setEditing(null)} className="rounded-md border border-white/10 px-4 py-2 text-sm">Cancel</button>
          </div>
        </form>
      ) : null}
      <div className="mt-6 overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-left text-xs uppercase text-slate-400">
            <tr>
              {fields.slice(0, 4).map((f) => <th key={f} className="px-4 py-3">{f}</th>)}
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-white/5">
                {fields.slice(0, 4).map((f) => (
                  <td key={f} className="max-w-xs truncate px-4 py-3 text-slate-200">{Array.isArray(r[f]) ? r[f].join(", ") : String(r[f] ?? "")}</td>
                ))}
                <td className="px-4 py-3 text-right">
                  <button onClick={() => setEditing(r)} className="mr-2 rounded border border-white/10 px-2 py-1 text-xs">Edit</button>
                  <button onClick={() => onDelete(r.id)} className="rounded border border-red-500/30 px-2 py-1 text-xs text-red-300">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 ? <p className="p-6 text-slate-400">No rows yet.</p> : null}
      </div>
    </div>
  );
}