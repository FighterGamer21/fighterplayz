import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { CURRENCIES, SERVICE_PRICES, convertFromInr, type CurrencyCode } from "@/lib/pricing";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
  subject: z.string().trim().min(1).max(200),
  message: z.string().trim().min(5).max(4000),
});

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((input) => contactSchema.parse(input))
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin.from("contact_messages").insert({
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

const hireSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
  discord: z.string().trim().max(120).optional().or(z.literal("")),
  project_type: z.string().trim().min(1).max(120),
  service_slug: z.string().trim().max(120).optional().or(z.literal("")),
  service_price_inr: z.coerce.number().min(0).max(1000000).optional(),
  display_currency: z.enum(Object.keys(CURRENCIES) as [CurrencyCode, ...CurrencyCode[]]).default("INR"),
  budget_range: z.string().trim().max(120).optional().or(z.literal("")),
  timeline: z.string().trim().max(120).optional().or(z.literal("")),
  details: z.string().trim().min(10).max(4000),
  reference_link: z.string().trim().max(500).optional().or(z.literal("")),
  priority: z.enum(["LOW", "NORMAL", "HIGH", "URGENT"]).default("NORMAL"),
});

export const submitHireTicket = createServerFn({ method: "POST" })
  .inputValidator((input) => hireSchema.parse(input))
  .handler(async ({ data }) => {
    const selectedService = SERVICE_PRICES.find((service) => service.slug === data.service_slug);
    const servicePriceInr = data.service_price_inr ?? selectedService?.baseInr ?? 3000;
    const convertedAmount = convertFromInr(servicePriceInr, data.display_currency);
    const { data: row, error } = await (supabaseAdmin.from("hire_tickets") as any)
      .insert({
        name: data.name,
        email: data.email,
        discord: data.discord || null,
        project_type: data.project_type,
        service_slug: data.service_slug || selectedService?.slug || null,
        service_price_inr: servicePriceInr,
        display_currency: data.display_currency,
        converted_amount: Number(convertedAmount.toFixed(2)),
        budget_range: data.budget_range || `${data.display_currency} ${convertedAmount.toFixed(data.display_currency === "USD" ? 2 : 0)}`,
        timeline: data.timeline || null,
        details: data.details,
        reference_link: data.reference_link || null,
        priority: data.priority,
      })
      .select("ticket_id")
      .single();
    if (error) throw new Error(error.message);
    return { ok: true, ticket_id: row?.ticket_id ?? null };
  });

const reviewSchema = z.object({
  name: z.string().trim().min(2).max(120),
  role: z.string().trim().max(120).optional().or(z.literal("")),
  message: z.string().trim().min(10).max(1200),
  rating: z.coerce.number().int().min(1).max(5),
});

export const submitReview = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => reviewSchema.parse(input))
  .handler(async ({ context, data }) => {
    const { error } = await (supabaseAdmin.from("reviews" as any) as any).insert({
      user_id: context.userId,
      name: data.name,
      role: data.role || null,
      message: data.message,
      rating: data.rating,
      approved: false,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });
