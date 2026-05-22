import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { AdminShell } from "@/components/admin/AdminShell";
import { adminListTickets, adminUpdateTicket } from "@/lib/admin.functions";

export const Route = createFileRoute("/admin/tickets")({
  head: () => ({ meta: [{ title: "Tickets - Admin" }, { name: "robots", content: "noindex" }] }),
  component: TicketsPage,
});

const STATUSES = ["NEW", "REVIEWING", "ACCEPTED", "IN_PROGRESS", "COMPLETED", "REJECTED"] as const;

function TicketsPage() {
  const list = useServerFn(adminListTickets);
  const upd = useServerFn(adminUpdateTicket);
  const [rows, setRows] = useState<any[]>([]);

  async function load() {
    try {
      const result = await list();
      setRows(result.tickets);
    } catch (error: any) {
      toast.error(error?.message ?? "Could not load tickets");
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function setStatus(id: string, status: (typeof STATUSES)[number]) {
    try {
      await upd({ data: { id, status } });
      toast.success("Ticket updated");
      await load();
    } catch (error: any) {
      toast.error(error?.message ?? "Could not update ticket");
    }
  }

  return (
    <AdminShell>
      <h1 className="text-3xl font-black text-white">Hire Tickets</h1>
      <div className="mt-6 space-y-3">
        {rows.map((ticket) => (
          <div key={ticket.id} className="glass rounded-xl p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="font-mono text-xs text-[#28e7ff]">{ticket.ticket_id}</span>
                <h3 className="text-lg font-black text-white">{ticket.name} - {ticket.project_type}</h3>
                <p className="text-xs text-slate-400">{ticket.email}{ticket.discord ? ` - ${ticket.discord}` : ""}</p>
              </div>
              <select value={ticket.status} onChange={(event) => setStatus(ticket.id, event.target.value as any)} className="h-9 rounded-md border border-white/10 bg-[#05070d] px-3 text-sm">
                {STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}
              </select>
            </div>
            <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-400">
              {ticket.display_currency ? <span className="rounded-full bg-white/5 px-2 py-1">{ticket.display_currency} {ticket.converted_amount ?? ""}</span> : null}
              {ticket.service_price_inr ? <span className="rounded-full bg-white/5 px-2 py-1">INR {ticket.service_price_inr}</span> : null}
              {ticket.timeline ? <span className="rounded-full bg-white/5 px-2 py-1">{ticket.timeline}</span> : null}
            </div>
            <p className="mt-3 whitespace-pre-wrap text-sm text-slate-300">{ticket.details}</p>
          </div>
        ))}
        {rows.length === 0 ? <p className="text-slate-400">No tickets yet.</p> : null}
      </div>
    </AdminShell>
  );
}
