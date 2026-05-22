import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitContact } from "@/lib/submit.functions";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — FighterPlayz" },
      { name: "description", content: "Get in touch with FighterPlayz via email, Discord or the contact form." },
      { property: "og:title", content: "Contact FighterPlayz" },
      { property: "og:description", content: "Reach out about plugins, servers or web work." },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const submit = useServerFn(submitContact);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setBusy(true);
    try {
      await submit({
        data: {
          name: String(f.get("name") || ""),
          email: String(f.get("email") || ""),
          subject: String(f.get("subject") || ""),
          message: String(f.get("message") || ""),
        },
      });
      toast.success("Message sent");
      (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      toast.error(err?.message ?? "Could not send");
    } finally {
      setBusy(false);
    }
  }

  return (
    <SiteLayout>
      <PageHero eyebrow="Contact" title="Get in touch" lead="Email: fightergamerofficial1@gmail.com — Discord: fightergamer" />
      <section className="mx-auto grid max-w-5xl gap-8 px-5 pb-24 sm:px-8 md:grid-cols-2">
        <div className="glass rounded-xl p-6">
          <h2 className="text-xl font-black text-white">Direct channels</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            <li>📧 <a className="text-[#28e7ff] hover:underline" href="mailto:fightergamerofficial1@gmail.com">fightergamerofficial1@gmail.com</a></li>
            <li>💬 Discord: <span className="text-[#28e7ff]">fightergamer</span></li>
            <li>🐙 GitHub: <a className="text-[#28e7ff] hover:underline" href="https://github.com/FighterPlayz" target="_blank" rel="noreferrer">FighterPlayz</a></li>
          </ul>
        </div>
        <form onSubmit={onSubmit} className="glass grid gap-3 rounded-xl p-6">
          <div className="grid gap-1.5"><Label htmlFor="c-name">Name</Label><Input id="c-name" name="name" required maxLength={120} /></div>
          <div className="grid gap-1.5"><Label htmlFor="c-email">Email</Label><Input id="c-email" name="email" type="email" required maxLength={255} /></div>
          <div className="grid gap-1.5"><Label htmlFor="c-sub">Subject</Label><Input id="c-sub" name="subject" required maxLength={200} /></div>
          <div className="grid gap-1.5"><Label htmlFor="c-msg">Message</Label><Textarea id="c-msg" name="message" required rows={6} maxLength={4000} /></div>
          <button disabled={busy} className="rounded-lg bg-[#28e7ff] px-5 py-2.5 text-sm font-semibold text-[#05070d] hover:bg-white disabled:opacity-60">{busy ? "Sending…" : "Send"}</button>
        </form>
      </section>
    </SiteLayout>
  );
}