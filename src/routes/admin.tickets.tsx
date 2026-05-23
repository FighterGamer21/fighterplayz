import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { adminListTickets, adminReplyTicket, adminUpdateTicket } from "@/lib/admin.functions";

export const Route = createFileRoute("/admin/tickets")({
  head: () => ({ meta: [{ title: "Tickets - Admin" }, { name: "robots", content: "noindex" }] }),
  component: TicketsPage,
});

const STATUSES = ["NEW", "REVIEWING", "ACCEPTED", "IN_PROGRESS", "COMPLETED", "REJECTED"] as const;

function TicketsPage() {
  const list = useServerFn(adminListTickets);
  const upd = useServerFn(adminUpdateTicket);
  const reply = useServerFn(adminReplyTicket);
  const [rows, setRows] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [replyText, setReplyText] = useState<Record<string, string>>({});

  const grouped = useMemo(() => {
    const map: Record<string, any[]> = {};
    for (const message of messages) {
      map[message.ticket_id] ||= [];
      map[message.ticket_id].push(message);
    }
    return map;
  }, [messages]);

  async function load() {
    try {
      const result = await list();
      setRows(result.tickets);
      setMessages((result as any).messages ?? []);
    } catch (error: any) {
      toast.error(error?.message ?? "Could not load tickets");
    }
  }

  useEffect(() => {
    load();
    const timer = window.setInterval(load, 7000);
    return () => window.clearInterval(timer);
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

  async function sendReply(ticketId: string) {
    const message = (replyText[ticketId] ?? "").trim();
    if (!message) return;
    try {
      await reply({ data: { ticket_id: ticketId, message } });
      setReplyText((current) => ({ ...current, [ticketId]: "" }));
      toast.success("Reply sent");
      await load();
    } catch (error: any) {
      toast.error(error?.message ?? "Could not send reply");
    }
  }

  return (
    <AdminShell>
      <h1 className="text-3xl font-black text-white">Hire Tickets</h1>
      <p className="mt-2 text-sm text-slate-400">Reply to users directly from each ticket. Messages auto-refresh every few seconds.</p>
      <div className="mt-6 space-y-4">
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

            <div className="mt-5 rounded-xl border border-white/10 bg-black/20 p-4">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#28e7ff]">Ticket Chat</p>
              <div className="max-h-72 space-y-3 overflow-y-auto pr-1">
                {(grouped[ticket.id] ?? []).length ? grouped[ticket.id].map((message) => (
                  <div key={message.id} className={`rounded-lg p-3 text-sm ${message.sender_type === "admin" ? "ml-auto max-w-[82%] bg-[#28e7ff]/10 text-cyan-50" : "mr-auto max-w-[82%] bg-white/5 text-slate-200"}`}>
                    <div className="mb-1 text-[11px] font-bold uppercase tracking-wide text-slate-500">{message.sender_type === "admin" ? "FighterPlayz" : message.sender_name || ticket.name}</div>
                    <p className="whitespace-pre-wrap">{message.message}</p>
                  </div>
                )) : <p className="text-sm text-slate-500">No chat messages yet.</p>}
              </div>
              <div className="mt-4 flex gap-2">
                <input value={replyText[ticket.id] ?? ""} onChange={(event) => setReplyText((current) => ({ ...current, [ticket.id]: event.target.value }))} placeholder="Reply to this ticket..." className="h-10 flex-1 rounded-md border border-white/10 bg-[#05070d] px-3 text-sm outline-none focus:border-[#28e7ff]" />
                <button onClick={() => sendReply(ticket.id)} className="inline-flex h-10 items-center gap-2 rounded-md bg-[#28e7ff] px-4 text-sm font-bold text-[#05070d] hover:bg-white"><Send size={15} /> Send</button>
              </div>
            </div>
          </div>
        ))}
        {rows.length === 0 ? <p className="text-slate-400">No tickets yet.</p> : null}
      </div>
    </AdminShell>
  );
}
