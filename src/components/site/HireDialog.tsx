import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitHireTicket } from "@/lib/submit.functions";

type ServiceOption = { slug: string; label: string; price_inr: number };

const SERVICE_OPTIONS: ServiceOption[] = [
  { slug: "minecraft-setup", label: "Minecraft Server Setup", price_inr: 3000 },
  { slug: "plugin-development", label: "Custom Plugin Development", price_inr: 5000 },
  { slug: "server-optimization", label: "Server Optimization", price_inr: 2500 },
  { slug: "web-development", label: "Website / Web App", price_inr: 6000 },
  { slug: "custom", label: "Other / Custom brief", price_inr: 0 },
];

// Approximate FX rates from INR. Estimates only — not live rates.
const FX_FROM_INR: Record<string, { rate: number; symbol: string }> = {
  INR: { rate: 1, symbol: "₹" },
  USD: { rate: 0.012, symbol: "$" },
  NPR: { rate: 1.6, symbol: "Rs." },
  PKR: { rate: 3.35, symbol: "₨" },
  BDT: { rate: 1.32, symbol: "৳" },
};

type Currency = keyof typeof FX_FROM_INR;

type Props = {
  trigger: React.ReactNode;
  defaultProjectType?: string;
  referenceLink?: string;
};

export function HireDialog({ trigger, defaultProjectType = "", referenceLink = "" }: Props) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serviceSlug, setServiceSlug] = useState<string>(SERVICE_OPTIONS[0].slug);
  const [currency, setCurrency] = useState<Currency>("INR");
  const submit = useServerFn(submitHireTicket);

  const selected = SERVICE_OPTIONS.find((s) => s.slug === serviceSlug) ?? SERVICE_OPTIONS[0];
  const fx = FX_FROM_INR[currency];
  const converted = Math.round(selected.price_inr * fx.rate * 100) / 100;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setSubmitting(true);
    try {
      const res = await submit({
        data: {
          name: String(f.get("name") || ""),
          email: String(f.get("email") || ""),
          discord: String(f.get("discord") || ""),
          project_type: String(f.get("project_type") || "") || selected.label,
          budget_range: String(f.get("budget_range") || ""),
          timeline: String(f.get("timeline") || ""),
          details: String(f.get("details") || ""),
          reference_link: String(f.get("reference_link") || ""),
          priority: (String(f.get("priority") || "NORMAL") as "LOW" | "NORMAL" | "HIGH" | "URGENT"),
          service_slug: selected.slug,
          service_price_inr: selected.price_inr,
          display_currency: currency,
          converted_amount: converted,
        },
      });
      toast.success(`Ticket ${res.ticket_id} submitted`, {
        description: "I'll be in touch via the email or Discord you provided.",
      });
      setOpen(false);
    } catch (err: any) {
      toast.error(err?.message ?? "Could not submit ticket");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto border-white/10 bg-[#090d18] text-slate-100 sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black text-white">Open Project Request</DialogTitle>
          <DialogDescription className="text-slate-400">
            Fill this in and you'll get a ticket ID like <span className="text-[#28e7ff]">FP-REQ-0001</span>.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="grid gap-4">
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="grid gap-1.5">
              <Label htmlFor="hire-service">Service</Label>
              <select
                id="hire-service"
                value={serviceSlug}
                onChange={(e) => setServiceSlug(e.target.value)}
                className="h-9 rounded-md border border-white/10 bg-[#05070d] px-3 text-sm"
              >
                {SERVICE_OPTIONS.map((s) => (
                  <option key={s.slug} value={s.slug}>{s.label}</option>
                ))}
              </select>
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="hire-currency">Display currency</Label>
              <select
                id="hire-currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value as Currency)}
                className="h-9 rounded-md border border-white/10 bg-[#05070d] px-3 text-sm"
              >
                {(Object.keys(FX_FROM_INR) as Currency[]).map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
          {selected.price_inr > 0 ? (
            <div className="rounded-lg border border-[#28e7ff]/20 bg-[#28e7ff]/5 px-4 py-3 text-sm">
              <div className="font-semibold text-white">
                Starts at {fx.symbol}{converted.toLocaleString()} {currency}
                <span className="ml-2 text-xs font-normal text-slate-400">(≈ ₹{selected.price_inr.toLocaleString()} INR)</span>
              </div>
              <p className="mt-1 text-xs text-slate-400">Approximate estimate — final quote confirmed after we discuss scope.</p>
            </div>
          ) : null}
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="grid gap-1.5">
              <Label htmlFor="hire-name">Name</Label>
              <Input id="hire-name" name="name" required maxLength={120} />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="hire-email">Email</Label>
              <Input id="hire-email" name="email" type="email" required maxLength={255} />
            </div>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="grid gap-1.5">
              <Label htmlFor="hire-discord">Discord</Label>
              <Input id="hire-discord" name="discord" maxLength={120} placeholder="user#1234" />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="hire-type">Project type</Label>
              <Input id="hire-type" name="project_type" maxLength={120} defaultValue={defaultProjectType || selected.label} placeholder="Minecraft plugin, server setup, website…" />
            </div>
          </div>
          <div className="grid gap-2 sm:grid-cols-3">
            <div className="grid gap-1.5">
              <Label htmlFor="hire-budget">Budget</Label>
              <Input id="hire-budget" name="budget_range" maxLength={120} placeholder="$50 – $200" />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="hire-timeline">Timeline</Label>
              <Input id="hire-timeline" name="timeline" maxLength={120} placeholder="2 weeks" />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="hire-priority">Priority</Label>
              <select id="hire-priority" name="priority" defaultValue="NORMAL" className="h-9 rounded-md border border-white/10 bg-[#05070d] px-3 text-sm">
                <option value="LOW">Low</option>
                <option value="NORMAL">Normal</option>
                <option value="HIGH">High</option>
                <option value="URGENT">Urgent</option>
              </select>
            </div>
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="hire-ref">Reference link</Label>
            <Input id="hire-ref" name="reference_link" defaultValue={referenceLink} maxLength={500} placeholder="https://…" />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="hire-details">Project details</Label>
            <Textarea id="hire-details" name="details" required maxLength={4000} rows={6} placeholder="What do you need built?" />
          </div>
          <DialogFooter>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[#28e7ff] px-5 py-2.5 text-sm font-semibold text-[#05070d] shadow-glow hover:bg-white disabled:opacity-60"
            >
              {submitting ? "Submitting…" : "Submit request"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}