import { createFileRoute } from "@tanstack/react-router";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const BASE_URL = "";
const STATIC = ["/", "/about", "/ecosystem", "/plugins", "/projects", "/servers", "/websites", "/services", "/hire", "/tickets", "/contact"];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const [pl, pr] = await Promise.all([
          supabaseAdmin.from("plugins").select("slug").neq("status", "ARCHIVED"),
          supabaseAdmin.from("projects").select("slug").neq("status", "ARCHIVED"),
        ]);
        const paths = [
          ...STATIC,
          ...(pl.data ?? []).map((r) => `/plugins/${r.slug}`),
          ...(pr.data ?? []).map((r) => `/projects/${r.slug}`),
        ];
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `  <url><loc>${BASE_URL}${p}</loc></url>`).join("\n")}
</urlset>`;
        return new Response(xml, { headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" } });
      },
    },
  },
});
