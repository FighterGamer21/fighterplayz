import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const ADMIN_EMAIL = "fightergamerofficial1@gmail.com";

async function assertAdmin(userId: string) {
  const { data, error } = await supabaseAdmin
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
    const { data: existing } = await supabaseAdmin
      .from("user_roles")
      .select("id")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .maybeSingle();
    if (!existing) {
      const { error } = await supabaseAdmin
        .from("user_roles")
        .insert({ user_id: context.userId, role: "admin" });
      if (error) throw new Error(error.message);
    }
    return { granted: !existing, isAdmin: true };
  });

export const checkAdminRole = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await supabaseAdmin
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
    await assertAdmin(context.userId);
    const [plugins, projects, services, tickets, messages, testimonials] = await Promise.all([
      supabaseAdmin.from("plugins").select("id", { count: "exact", head: true }),
      supabaseAdmin.from("projects").select("id", { count: "exact", head: true }),
      supabaseAdmin.from("services").select("id", { count: "exact", head: true }),
      supabaseAdmin.from("hire_tickets").select("id", { count: "exact", head: true }).eq("status", "NEW"),
      supabaseAdmin.from("contact_messages").select("id", { count: "exact", head: true }).eq("status", "NEW"),
      supabaseAdmin.from("testimonials").select("id", { count: "exact", head: true }),
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
    await assertAdmin(context.userId);
    const { data, error } = await supabaseAdmin
      .from("hire_tickets")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return { tickets: data ?? [] };
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
    await assertAdmin(context.userId);
    const { error } = await supabaseAdmin
      .from("hire_tickets")
      .update({ status: data.status, admin_notes: data.admin_notes ?? null })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminListMessages = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.userId);
    const { data, error } = await supabaseAdmin
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
  "reviews",
  "announcements",
  "blog_posts",
] as const;
type AllowedTable = (typeof ALLOWED_TABLES)[number];

export const adminListResource = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) =>
    z.object({ table: z.enum(ALLOWED_TABLES) }).parse(input),
  )
  .handler(async ({ context, data }) => {
    await assertAdmin(context.userId);
    const { data: rows, error } = await supabaseAdmin
      .from(data.table as AllowedTable)
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
    await assertAdmin(context.userId);
    const { error } = await (supabaseAdmin.from(data.table as AllowedTable) as any).upsert(data.row);
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
    await assertAdmin(context.userId);
    const { error } = await supabaseAdmin.from(data.table as AllowedTable).delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
