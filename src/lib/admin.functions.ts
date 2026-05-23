import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const ADMIN_EMAIL = "fightergamerofficial1@gmail.com";

async function assertAdmin(db: any, userId: string) {
  const { data, error } = await db
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Forbidden: admin role required");
}

/**
 * Called by the admin login page after the user signs in.
 * If the user's email matches the configured admin email and they don't yet
 * have the admin role, grant it. Idempotent.
 */
export const bootstrapAdminRole = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const email = (context.claims?.email as string | undefined)?.toLowerCase();
    if (!email || email !== ADMIN_EMAIL.toLowerCase()) {
      return { granted: false, isAdmin: false };
    }
    const { data, error } = await (context.supabase as any).rpc("bootstrap_admin_role");
    if (error) throw new Error(error.message);
    return { granted: !!data, isAdmin: true };
  });

export const checkAdminRole = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await (context.supabase as any)
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .maybeSingle();
    return { isAdmin: !!data };
  });

export const getAdminStats = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const db = context.supabase as any;
    await assertAdmin(db, context.userId);
    const [plugins, projects, services, tickets, messages, testimonials] = await Promise.all([
      db.from("plugins").select("id", { count: "exact", head: true }),
      db.from("projects").select("id", { count: "exact", head: true }),
      db.from("services").select("id", { count: "exact", head: true }),
      db.from("hire_tickets").select("id", { count: "exact", head: true }).eq("status", "NEW"),
      db.from("contact_messages").select("id", { count: "exact", head: true }).eq("status", "NEW"),
      db.from("testimonials").select("id", { count: "exact", head: true }),
    ]);
    return {
      plugins: plugins.count ?? 0,
      projects: projects.count ?? 0,
      services: services.count ?? 0,
      newTickets: tickets.count ?? 0,
      newMessages: messages.count ?? 0,
      testimonials: testimonials.count ?? 0,
    };
  });

export const adminListTickets = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const db = context.supabase as any;
    await assertAdmin(db, context.userId);
    const { data, error } = await db
      .from("hire_tickets")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    const ticketIds = (data ?? []).map((ticket: any) => ticket.id);
    const { data: messages, error: msgError } = ticketIds.length
      ? await db.from("ticket_messages").select("*").in("ticket_id", ticketIds).order("created_at", { ascending: true })
      : { data: [], error: null };
    if (msgError) throw new Error(msgError.message);
    return { tickets: data ?? [], messages: messages ?? [] };
  });

export const adminUpdateTicket = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) =>
    z
      .object({
        id: z.string().uuid(),
        status: z.enum(["NEW", "REVIEWING", "ACCEPTED", "IN_PROGRESS", "COMPLETED", "REJECTED"]),
        admin_notes: z.string().max(4000).optional(),
      })
      .parse(input),
  )
  .handler(async ({ context, data }) => {
    const db = context.supabase as any;
    await assertAdmin(db, context.userId);
    const { error } = await db
      .from("hire_tickets")
      .update({ status: data.status, admin_notes: data.admin_notes ?? null })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminReplyTicket = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) =>
    z
      .object({
        ticket_id: z.string().uuid(),
        message: z.string().trim().min(1).max(2000),
      })
      .parse(input),
  )
  .handler(async ({ context, data }) => {
    const db = context.supabase as any;
    await assertAdmin(db, context.userId);
    const { error } = await db.from("ticket_messages").insert({
      ticket_id: data.ticket_id,
      sender_type: "admin",
      sender_name: "FighterPlayz",
      message: data.message,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminListMessages = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const db = context.supabase as any;
    await assertAdmin(db, context.userId);
    const { data, error } = await db
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return { messages: data ?? [] };
  });

const ALLOWED_TABLES = [
  "plugins",
  "projects",
  "services",
  "skills",
  "testimonials",
  "blog_posts",
  "announcements",
  "reviews",
] as const;
type AllowedTable = (typeof ALLOWED_TABLES)[number];

export const adminListResource = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) =>
    z.object({ table: z.enum(ALLOWED_TABLES) }).parse(input),
  )
  .handler(async ({ context, data }) => {
    const db = context.supabase as any;
    await assertAdmin(db, context.userId);
    const { data: rows, error } = await db
      .from(data.table)
      .select("*")
      .order("id");
    if (error) throw new Error(error.message);
    return { rows: rows ?? [] };
  });

export const adminUpsertResource = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) =>
    z
      .object({
        table: z.enum(ALLOWED_TABLES),
        row: z.record(z.string(), z.any()),
      })
      .parse(input),
  )
  .handler(async ({ context, data }) => {
    const db = context.supabase as any;
    await assertAdmin(db, context.userId);
    const { error } = await db.from(data.table).upsert(data.row);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminDeleteResource = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) =>
    z
      .object({
        table: z.enum(ALLOWED_TABLES),
        id: z.string(),
      })
      .parse(input),
  )
  .handler(async ({ context, data }) => {
    const db = context.supabase as any;
    await assertAdmin(db, context.userId);
    const { error } = await db.from(data.table).delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
