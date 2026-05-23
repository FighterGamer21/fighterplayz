import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

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
  budget_range: z.string().trim().max(120).optional().or(z.literal("")),
  timeline: z.string().trim().max(120).optional().or(z.literal("")),
  details: z.string().trim().min(10).max(4000),
  reference_link: z.string().trim().max(500).optional().or(z.literal("")),
  priority: z.enum(["LOW", "NORMAL", "HIGH", "URGENT"]).default("NORMAL"),
  service_slug: z.string().trim().max(120).optional().or(z.literal("")),
  service_price_inr: z.number().nonnegative().optional().nullable(),
  display_currency: z.enum(["INR", "USD", "NPR", "PKR", "BDT"]).optional(),
  converted_amount: z.number().nonnegative().optional().nullable(),
});

export const submitHireTicket = createServerFn({ method: "POST" })
  .inputValidator((input) => hireSchema.parse(input))
  .handler(async ({ data }) => {
    const { data: row, error } = await supabaseAdmin
      .from("hire_tickets")
      .insert({
        name: data.name,
        email: data.email,
        discord: data.discord || null,
        project_type: data.project_type,
        budget_range: data.budget_range || null,
        timeline: data.timeline || null,
        details: data.details,
        reference_link: data.reference_link || null,
        priority: data.priority,
        service_slug: data.service_slug || null,
        service_price_inr: data.service_price_inr ?? null,
        display_currency: data.display_currency ?? null,
        converted_amount: data.converted_amount ?? null,
      } as any)
      .select("ticket_id")
      .single();
    if (error) throw new Error(error.message);
    return { ok: true, ticket_id: row?.ticket_id ?? null };
  });

// Reviews — authenticated users only (RLS enforces user_id = auth.uid())
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const reviewSchema = z.object({
  name: z.string().trim().min(1).max(120),
  role: z.string().trim().max(120).optional().or(z.literal("")),
  message: z.string().trim().min(5).max(2000),
  rating: z.number().int().min(1).max(5),
});

export const submitReview = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => reviewSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { error } = await supabaseAdmin.from("reviews").insert({
      user_id: context.userId,
      name: data.name,
      role: data.role || null,
      message: data.message,
      rating: data.rating,
      approved: false,
    } as any);
    if (error) throw new Error(error.message);
    return { ok: true };
  });