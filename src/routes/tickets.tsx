import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { motion } from "framer-motion";
import { Mail, RefreshCcw, Search, Send, Ticket } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getPublicTicketThread, submitPublicTicketReply } from "@/lib/submit.functions";

export const Route = createFileRoute("/tickets")({
  head: () => ({
    meta: [
      { title: "My Tickets - FighterPlayz" },
      { name: "description", content: "Track your FighterPlayz hire ticket and reply in the ticket chat." },
      { property: "og:title", content: "FighterPlayz Ticket Center" },
      { property: "og:description", content: "Track project requests and chat with FighterPlayz." },
    ],
    links: [{ rel: "canonical", href: "/tickets" }],
  }),
  component: TicketsPage,
});

function TicketsPage() {
  const lookup = useServerFn(getPublicTicketThread);
  const reply = useServerFn(submitPublicTicketReply);
  const [ticketId, setTicketId] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [ticket, setTicket] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);

  const canRefresh = useMemo(() => ticketId.trim().length > 2 && email.includes("@"), [ticketId, email]);

  async function loadThread(showToast = true) {
    if (!canRefresh) {
      toast.error("Enter your ticket ID and email first");
      return;
    }
    setLoading(true);
    try {
      const result = await lookup({ data: { ticket_id: ticketId.trim(), email: email.trim() } });
      setTicket(result.ticket);
      setMessages((result as any).messages ?? []);
      setName((current) => current || result.ticket?.name || "");
      if (showToast) toast.success("Ticket loaded");
    } catch (error: any) {
      toast.error(error?.message ?? "Could not load ticket");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!ticket) return;
    const timer = window.setInterval(() => loadThread(false), 7000);
    return () => window.clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticket, ticketId, email]);

  async function sendReply(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const message = String(form.get("message") || "").trim();
    if (!message) return;
    setSending(true);
    try {
      await reply({
        data: {
          ticket_id: ticketId.trim(),
          email: email.trim(),
          name: name.trim() || ticket?.name || "Client",
          message,
        },
      });
      toast.success("Reply sent");
      event.currentTarget.reset();
      await loadThread(false);
    } catch (error: any) {
      toast.error(error?.message ?? "Could not send reply");
    } finally {
      setSending(false);
    }
  }

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Ticket Center"
        title="Track and reply to your project ticket"
        lead="Use the ticket ID you received after submitting a hire request. Replies auto-refresh like a lightweight client portal."
      />

      <section className="mx-auto grid max-w-6xl gap-6 px-5 pb-24 sm:px-8 lg:grid-cols-[0.85fr_1.15fr]">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass h-fit rounded-xl p-6"
        >
          <div className="mb-5 flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-lg border border-[#28e7ff]/30 bg-[#28e7ff]/10 text-[#28e7ff]">
              <Ticket size={20} />
            </span>
            <div>
              <h2 className="text-2xl font-black text-white">Open Thread</h2>
              <p className="text-sm text-slate-400">Ticket ID + email keeps your request private.</p>
            </div>
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              loadThread();
            }}
            className="grid gap-4"
          >
            <div className="grid gap-1.5">
              <Label htmlFor="ticket-id">Ticket ID</Label>
              <Input
                id="ticket-id"
                value={ticketId}
                onChange={(event) => setTicketId(event.target.value)}
                placeholder="FP-REQ-0001"
                required
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="ticket-email">Email</Label>
              <Input
                id="ticket-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>
            <button
              disabled={loading}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#28e7ff] px-5 py-2.5 text-sm font-bold text-[#05070d] shadow-glow transition hover:bg-white disabled:opacity-60"
            >
              {loading ? <RefreshCcw className="animate-spin" size={17} /> : <Search size={17} />}
              {loading ? "Loading..." : "Load ticket"}
            </button>
          </form>

          {ticket ? (
            <div className="mt-6 rounded-xl border border-white/10 bg-black/20 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#28e7ff]">Current Status</p>
              <h3 className="mt-2 text-xl font-black text-white">{ticket.project_type}</h3>
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                <span className="rounded-full border border-[#28e7ff]/30 bg-[#28e7ff]/10 px-3 py-1 font-bold text-[#28e7ff]">
                  {ticket.status}
                </span>
                {ticket.priority ? <span className="rounded-full bg-white/5 px-3 py-1 text-slate-300">{ticket.priority}</span> : null}
                {ticket.display_currency ? (
                  <span className="rounded-full bg-white/5 px-3 py-1 text-slate-300">
                    {ticket.display_currency} {ticket.converted_amount ?? ""}
                  </span>
                ) : null}
              </div>
              <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-slate-400">{ticket.details}</p>
            </div>
          ) : null}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="glass min-h-[520px] rounded-xl p-6"
        >
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#28e7ff]">Live Thread</p>
              <h2 className="mt-1 text-2xl font-black text-white">Ticket Chat</h2>
            </div>
            <button
              type="button"
              disabled={!ticket || loading}
              onClick={() => loadThread(false)}
              className="inline-flex h-10 items-center gap-2 rounded-md border border-white/10 px-3 text-sm font-semibold text-slate-200 transition hover:border-[#28e7ff]/40 hover:text-[#28e7ff] disabled:opacity-40"
            >
              <RefreshCcw size={15} />
              Refresh
            </button>
          </div>

          {!ticket ? (
            <div className="grid min-h-[360px] place-items-center rounded-xl border border-dashed border-white/10 bg-black/20 text-center">
              <div className="max-w-sm px-6">
                <Mail className="mx-auto text-[#28e7ff]" size={34} />
                <p className="mt-4 text-lg font-black text-white">Load a ticket to start chatting</p>
                <p className="mt-2 text-sm text-slate-400">Your messages and admin replies will appear here.</p>
              </div>
            </div>
          ) : (
            <>
              <div className="max-h-[420px] space-y-3 overflow-y-auto rounded-xl border border-white/10 bg-black/20 p-4">
                {messages.length === 0 ? (
                  <p className="py-12 text-center text-sm text-slate-500">No replies yet. Send the first update below.</p>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`rounded-lg p-3 text-sm ${
                        message.sender_type === "admin"
                          ? "ml-auto max-w-[86%] border border-[#28e7ff]/20 bg-[#28e7ff]/10 text-cyan-50"
                          : "mr-auto max-w-[86%] bg-white/5 text-slate-200"
                      }`}
                    >
                      <div className="mb-1 flex items-center justify-between gap-3 text-[11px] font-bold uppercase tracking-wide text-slate-500">
                        <span>{message.sender_type === "admin" ? "FighterPlayz" : message.sender_name || ticket.name}</span>
                        <span>{new Date(message.created_at).toLocaleString()}</span>
                      </div>
                      <p className="whitespace-pre-wrap leading-6">{message.message}</p>
                    </div>
                  ))
                )}
              </div>

              <form onSubmit={sendReply} className="mt-4 grid gap-3">
                <div className="grid gap-1.5">
                  <Label htmlFor="reply-name">Your name</Label>
                  <Input id="reply-name" value={name} onChange={(event) => setName(event.target.value)} required maxLength={120} />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="reply-message">Reply</Label>
                  <Textarea id="reply-message" name="message" required maxLength={2000} rows={4} placeholder="Type your update, question, or file link..." />
                </div>
                <button
                  disabled={sending}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#28e7ff] px-5 py-2.5 text-sm font-bold text-[#05070d] shadow-glow transition hover:bg-white disabled:opacity-60"
                >
                  <Send size={17} />
                  {sending ? "Sending..." : "Send reply"}
                </button>
              </form>
            </>
          )}
        </motion.div>
      </section>
    </SiteLayout>
  );
}
