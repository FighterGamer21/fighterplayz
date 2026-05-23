import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { SiteLayout } from "@/components/site/SiteLayout";
import { getApprovedReviews } from "@/lib/public-data.functions";
import { submitReview } from "@/lib/submit.functions";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const opts = queryOptions({ queryKey: ["reviews-approved"], queryFn: () => getApprovedReviews() });

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews — FighterPlayz" },
      { name: "description", content: "Real reviews from clients and collaborators of FighterPlayz." },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(opts),
  component: Page,
});

function StarRow({ value, onChange }: { value: number; onChange?: (n: number) => void }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange?.(n)}
          className={n <= value ? "text-amber-300" : "text-slate-600"}
          aria-label={`${n} stars`}
        >
          <Star size={20} fill={n <= value ? "currentColor" : "none"} />
        </button>
      ))}
    </div>
  );
}

function Page() {
  const { data } = useSuspenseQuery(opts);
  const qc = useQueryClient();
  const submit = useServerFn(submitReview);
  const [user, setUser] = useState<any>(null);
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setUser(s?.user ?? null));
    return () => sub.subscription.unsubscribe();
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setSubmitting(true);
    try {
      await submit({
        data: {
          name: String(f.get("name") || ""),
          role: String(f.get("role") || ""),
          message: String(f.get("message") || ""),
          rating,
        },
      });
      toast.success("Thanks! Your review is pending approval.");
      (e.currentTarget as HTMLFormElement).reset();
      setRating(5);
      qc.invalidateQueries({ queryKey: ["reviews-approved"] });
    } catch (err: any) {
      toast.error(err?.message ?? "Could not submit");
    } finally {
      setSubmitting(false);
    }
  }

  async function quickAuth(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email") || "");
    const password = String(f.get("password") || "");
    const mode = String(f.get("mode") || "signin");
    const fn = mode === "signup" ? supabase.auth.signUp : supabase.auth.signInWithPassword;
    const { error } = await fn.call(supabase.auth, { email, password });
    if (error) toast.error(error.message);
    else toast.success(mode === "signup" ? "Account created" : "Signed in");
  }

  return (
    <SiteLayout>
      <section className="mx-auto max-w-5xl px-5 py-16 sm:px-8">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#28e7ff]">Community signal</p>
        <h1 className="text-balance text-4xl font-black text-white sm:text-5xl">Reviews</h1>
        <p className="mt-3 max-w-2xl text-slate-400">
          Real reviews from clients and collaborators. Only signed-in users can post; reviews are visible after admin approval.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {data.reviews.length === 0 ? (
            <p className="text-slate-500">No approved reviews yet.</p>
          ) : null}
          {data.reviews.map((r: any, i: number) => (
            <motion.blockquote
              key={r.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="glass rounded-xl p-6"
            >
              <StarRow value={r.rating} />
              <p className="mt-4 text-lg leading-7 text-slate-200">&ldquo;{r.message}&rdquo;</p>
              <footer className="mt-4 text-sm text-slate-400">
                <strong className="text-white">{r.name}</strong>
                {r.role ? ` — ${r.role}` : ""}
              </footer>
            </motion.blockquote>
          ))}
        </div>

        <div className="glass mt-12 rounded-xl p-6">
          <h2 className="text-2xl font-black text-white">Leave a review</h2>
          {!user ? (
            <form onSubmit={quickAuth} className="mt-4 grid gap-3 sm:grid-cols-[1fr_1fr_auto_auto]">
              <Input name="email" type="email" placeholder="Email" required />
              <Input name="password" type="password" placeholder="Password (8+)" minLength={8} required />
              <button name="mode" value="signin" className="rounded-md bg-[#28e7ff] px-4 py-2 text-sm font-semibold text-[#05070d]">Sign in</button>
              <button name="mode" value="signup" className="rounded-md border border-[#28e7ff]/30 px-4 py-2 text-sm font-semibold text-[#28e7ff]">Sign up</button>
            </form>
          ) : (
            <form onSubmit={onSubmit} className="mt-4 grid gap-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="grid gap-1.5"><Label>Display name</Label><Input name="name" required maxLength={120} /></div>
                <div className="grid gap-1.5"><Label>Role (optional)</Label><Input name="role" maxLength={120} placeholder="Server owner, dev…" /></div>
              </div>
              <div className="grid gap-1.5"><Label>Message</Label><Textarea name="message" required minLength={5} maxLength={2000} rows={4} /></div>
              <div className="grid gap-1.5"><Label>Rating</Label><StarRow value={rating} onChange={setRating} /></div>
              <div className="flex items-center gap-3">
                <button disabled={submitting} className="rounded-md bg-[#28e7ff] px-4 py-2 text-sm font-semibold text-[#05070d] disabled:opacity-50">
                  {submitting ? "Submitting…" : "Submit review"}
                </button>
                <button type="button" onClick={() => supabase.auth.signOut()} className="text-xs text-slate-400 hover:text-slate-200">Sign out</button>
              </div>
            </form>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}