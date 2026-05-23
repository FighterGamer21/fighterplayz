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
    const { data: ticketId, error } = await (supabaseAdmin as any).rpc("create_hire_ticket", {
      _name: data.name,
      _email: data.email,
      _discord: data.discord || "",
      _project_type: data.project_type,
      _budget_range: data.budget_range || "",
      _timeline: data.timeline || "",
      _details: data.details,
      _reference_link: data.reference_link || "",
      _priority: data.priority,
      _service_slug: data.service_slug || "",
      _service_price_inr: data.service_price_inr ?? null,
      _display_currency: data.display_currency ?? null,
      _converted_amount: data.converted_amount ?? null,
    });
    if (error) throw new Error(error.message);
    return { ok: true, ticket_id: ticketId ?? null };
  });

const ticketLookupSchema = z.object({
  ticket_id: z.string().trim().min(3).max(80),
  email: z.string().trim().email().max(255),
});

export const getPublicTicketThread = createServerFn({ method: "POST" })
  .inputValidator((input) => ticketLookupSchema.parse(input))
  .handler(async ({ data }) => {
    const { data: result, error } = await (supabaseAdmin as any).rpc("get_ticket_thread", {
      _ticket_id: data.ticket_id,
      _email: data.email,
    });
    if (error) throw new Error(error.message);
    if (!result?.ticket) throw new Error("Ticket not found. Check ticket ID and email.");
    return { ticket: result.ticket, messages: result.messages ?? [] };
  });

const publicTicketReplySchema = ticketLookupSchema.extend({
  name: z.string().trim().min(1).max(120),
  message: z.string().trim().min(1).max(2000),
});

export const submitPublicTicketReply = createServerFn({ method: "POST" })
  .inputValidator((input) => publicTicketReplySchema.parse(input))
  .handler(async ({ data }) => {
    const { error } = await (supabaseAdmin as any).rpc("submit_ticket_reply", {
      _ticket_id: data.ticket_id,
      _email: data.email,
      _sender_name: data.name,
      _message: data.message,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
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
