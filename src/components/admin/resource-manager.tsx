"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

type Row = Record<string, any> & { id: string };

export function ResourceManager({ resource, initialRows, fields }: { resource: string; initialRows: Row[]; fields: string[] }) {
  const [rows, setRows] = useState(initialRows);
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState("{}");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState("{}");
  const filtered = useMemo(() => rows.filter((row) => JSON.stringify(row).toLowerCase().includes(query.toLowerCase())), [rows, query]);

  async function create() {
    let body: Record<string, unknown>;
    try {
      body = JSON.parse(draft);
    } catch {
      toast.error("Invalid JSON.");
      return;
    }
    const res = await fetch(`/api/admin/${resource}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    if (!res.ok) return toast.error("Create failed. Check required fields and JSON shape.");
    const row = await res.json();
    setRows((current) => [row, ...current]);
    toast.success("Item created.");
  }

  async function toggle(id: string, key: string, value: boolean) {
    const res = await fetch(`/api/admin/${resource}/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ [key]: !value }) });
    if (!res.ok) return toast.error("Update failed.");
    const row = await res.json();
    setRows((current) => current.map((item) => (item.id === id ? row : item)));
    toast.success("Status updated.");
  }

  async function saveEdit() {
    if (!editingId) return;
    let body: Record<string, unknown>;
    try {
      body = JSON.parse(editDraft);
    } catch {
      toast.error("Invalid JSON.");
      return;
    }
    delete body.id;
    delete body.createdAt;
    delete body.updatedAt;
    const res = await fetch(`/api/admin/${resource}/${editingId}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    if (!res.ok) return toast.error("Update failed. Check JSON and validation rules.");
    const row = await res.json();
    setRows((current) => current.map((item) => (item.id === editingId ? row : item)));
    setEditingId(null);
    toast.success("Item updated.");
  }

  async function remove(id: string) {
    if (!confirm("Delete this item?")) return;
    const res = await fetch(`/api/admin/${resource}/${id}`, { method: "DELETE" });
    if (!res.ok) return toast.error("Delete failed.");
    setRows((current) => current.filter((item) => item.id !== id));
    toast.success("Item deleted.");
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search table..." className="w-full rounded-lg border border-white/10 bg-black/30 p-3 text-sm text-white outline-none focus:border-cyan sm:max-w-sm" />
      </div>
      <div className="glass mb-6 rounded-xl p-4">
        <p className="mb-2 text-sm font-bold text-white">Create / JSON editor</p>
        <textarea value={draft} onChange={(e) => setDraft(e.target.value)} className="min-h-40 w-full rounded-lg border border-white/10 bg-black/40 p-3 font-mono text-sm text-cyan outline-none focus:border-cyan" />
        <div className="mt-3"><Button onClick={create}>Create item</Button></div>
      </div>
      {editingId ? (
        <div className="glass mb-6 rounded-xl p-4">
          <p className="mb-2 text-sm font-bold text-white">Edit selected item</p>
          <textarea value={editDraft} onChange={(e) => setEditDraft(e.target.value)} className="min-h-56 w-full rounded-lg border border-white/10 bg-black/40 p-3 font-mono text-sm text-cyan outline-none focus:border-cyan" />
          <div className="mt-3 flex gap-3"><Button onClick={saveEdit}>Save changes</Button><Button variant="outline" onClick={() => setEditingId(null)}>Cancel</Button></div>
        </div>
      ) : null}
      <div className="glass overflow-x-auto rounded-xl">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="border-b border-white/10 text-xs uppercase tracking-wide text-slate-500"><tr>{fields.map((field) => <th key={field} className="p-4">{field}</th>)}<th className="p-4">Actions</th></tr></thead>
          <tbody>{filtered.map((row) => <tr key={row.id} className="border-b border-white/10 last:border-0">{fields.map((field) => <td key={field} className="max-w-xs truncate p-4 text-slate-300">{String(row[field] ?? "")}</td>)}<td className="flex gap-2 p-4"><button className="rounded-md bg-white/10 px-3 py-2 text-xs font-bold text-white" onClick={() => { setEditingId(row.id); setEditDraft(JSON.stringify(row, null, 2)); }}>Edit</button>{typeof row.featured === "boolean" ? <button className="rounded-md bg-cyan/10 px-3 py-2 text-xs font-bold text-cyan" onClick={() => toggle(row.id, "featured", row.featured)}>{row.featured ? "Unfeature" : "Feature"}</button> : null}{typeof row.approved === "boolean" ? <button className="rounded-md bg-cyan/10 px-3 py-2 text-xs font-bold text-cyan" onClick={() => toggle(row.id, "approved", row.approved)}>{row.approved ? "Hide" : "Approve"}</button> : null}<button className="rounded-md bg-red-500/10 px-3 py-2 text-xs font-bold text-red-300" onClick={() => remove(row.id)}>Delete</button></td></tr>)}</tbody>
        </table>
      </div>
    </div>
  );
}
