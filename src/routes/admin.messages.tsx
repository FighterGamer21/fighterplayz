import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { AdminShell } from "@/components/admin/AdminShell";
import { adminListMessages } from "@/lib/admin.functions";

export const Route = createFileRoute("/admin/messages")({
  head: () => ({ meta: [{ title: "Messages — Admin" }, { name: "robots", content: "noindex" }] }),
  component: MessagesPage,
});

function MessagesPage() {
  const list = useServerFn(adminListMessages);
  const [rows, setRows] = useState<any[]>([]);
  useEffect(() => { list().then((r) => setRows(r.messages)).catch(() => setRows([])); }, [list]);
  return (
    <AdminShell>
      <h1 className="text-3xl font-black text-white">Contact Messages</h1>
      <div className="mt-6 space-y-3">
        {rows.map((m) => (
          <div key={m.id} className="glass rounded-xl p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-white">{m.subject}</h3>
              <span className="text-xs text-slate-500">{new Date(m.created_at).toLocaleString()}</span>
            </div>
            <p className="text-xs text-slate-400">{m.name} • {m.email}</p>
            <p className="mt-3 whitespace-pre-wrap text-sm text-slate-300">{m.message}</p>
          </div>
        ))}
        {rows.length === 0 ? <p className="text-slate-400">No messages yet.</p> : null}
      </div>
    </AdminShell>
  );
}
