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
import { CURRENCIES, SERVICE_PRICES, formatCurrency, type CurrencyCode } from "@/lib/pricing";

type Props = {
  trigger: React.ReactNode;
  defaultProjectType?: string;
  referenceLink?: string;
  serviceSlug?: string;
  servicePriceInr?: number;
};

export function HireDialog({
  trigger,
  defaultProjectType = "",
  referenceLink = "",
  serviceSlug = "minecraft-setup",
  servicePriceInr,
}: Props) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [currency, setCurrency] = useState<CurrencyCode>("INR");
  const submit = useServerFn(submitHireTicket);
  const selectedService = SERVICE_PRICES.find((service) => service.slug === serviceSlug);
  const priceInr = servicePriceInr ?? selectedService?.baseInr ?? 3000;
  const projectType = defaultProjectType || selectedService?.projectType || "Minecraft Setup";

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
          project_type: String(f.get("project_type") || ""),
          service_slug: String(f.get("service_slug") || ""),
          service_price_inr: Number(f.get("service_price_inr") || priceInr),
          display_currency: String(f.get("display_currency") || "INR") as CurrencyCode,
          budget_range: String(f.get("budget_range") || ""),
          timeline: String(f.get("timeline") || ""),
          details: String(f.get("details") || ""),
          reference_link: String(f.get("reference_link") || ""),
          priority: String(f.get("priority") || "NORMAL") as "LOW" | "NORMAL" | "HIGH" | "URGENT",
        },
      });
      toast.success(`Ticket ${res.ticket_id} submitted`, {
        description: "I'll be in touch via the email or Discord you provided.",
      });
      e.currentTarget.reset();
      setCurrency("INR");
      setOpen(false);
    } catch (err: any) {
      toast.error("Could not submit ticket", {
        description: err?.message ?? "Please check Supabase migrations/env vars and try again.",
      });
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
            Fill this in and you will get a ticket ID like <span className="text-[#28e7ff]">FP-REQ-0001</span>.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="grid gap-4">
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
              <Input id="hire-discord" name="discord" maxLength={120} placeholder="username" />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="hire-type">Project type</Label>
              <Input id="hire-type" name="project_type" required maxLength={120} defaultValue={projectType} placeholder="Minecraft plugin, server setup, website" />
            </div>
          </div>
          <input type="hidden" name="service_slug" value={serviceSlug} />
          <input type="hidden" name="service_price_inr" value={priceInr} />
          <div className="grid gap-2 sm:grid-cols-3">
            <div className="grid gap-1.5">
              <Label htmlFor="hire-currency">Currency</Label>
              <select
                id="hire-currency"
                name="display_currency"
                value={currency}
                onChange={(event) => setCurrency(event.target.value as CurrencyCode)}
                className="h-9 rounded-md border border-white/10 bg-[#05070d] px-3 text-sm"
              >
                {Object.entries(CURRENCIES).map(([code, item]) => (
                  <option key={code} value={code}>{item.label}</option>
                ))}
              </select>
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="hire-budget">Service price</Label>
              <Input id="hire-budget" name="budget_range" readOnly value={`${formatCurrency(priceInr, currency)} est.`} />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="hire-timeline">Timeline</Label>
              <Input id="hire-timeline" name="timeline" maxLength={120} placeholder="2 weeks" />
            </div>
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
          <div className="grid gap-1.5">
            <Label htmlFor="hire-ref">Reference link</Label>
            <Input id="hire-ref" name="reference_link" defaultValue={referenceLink} maxLength={500} placeholder="https://..." />
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
              {submitting ? "Submitting..." : "Submit request"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
