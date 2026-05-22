import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Star } from "lucide-react";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { getApprovedReviews } from "@/lib/public-data.functions";
import { submitReview } from "@/lib/submit.functions";

const opts = queryOptions({ queryKey: ["reviews"], queryFn: () => getApprovedReviews() });

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews - FighterPlayz" },
      { name: "description", content: "Registered user reviews for FighterPlayz services." },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(opts),
  component: ReviewsPage,
});

function ReviewsPage() {
  const { data } = useSuspenseQuery(opts);
  const submit = useServerFn(submitReview);
  const [busy, setBusy] = useState(false);
  const [rating, setRating] = useState(5);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) {
      toast.error("Login required", { description: "Please sign in before posting a review." });
      return;
    }
    const form = new FormData(event.currentTarget);
    setBusy(true);
    try {
      await submit({
        data: {
          name: String(form.get("name") || auth.user.email || "Registered user"),
          role: String(form.get("role") || ""),
          message: String(form.get("message") || ""),
          rating,
        },
      });
      toast.success("Review submitted", { description: "It will appear after admin approval." });
      event.currentTarget.reset();
      setRating(5);
    } catch (error: any) {
      toast.error(error?.message ?? "Could not submit review");
    } finally {
      setBusy(false);
    }
  }

  return (
    <SiteLayout>
      <PageHero eyebrow="Reviews" title="Registered user reviews" lead="Only logged-in users can post reviews. New reviews are held for admin approval." />
      <section className="mx-auto grid max-w-6xl gap-6 px-5 pb-24 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        <form onSubmit={onSubmit} className="glass grid h-fit gap-4 rounded-xl p-6">
          <h2 className="text-2xl font-black text-white">Post a review</h2>
          <div className="grid gap-1.5"><Label htmlFor="review-name">Name</Label><Input id="review-name" name="name" required maxLength={120} /></div>
          <div className="grid gap-1.5"><Label htmlFor="review-role">Role</Label><Input id="review-role" name="role" maxLength={120} placeholder="Server owner, client, developer" /></div>
          <div className="grid gap-2">
            <Label>Rating</Label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((value) => (
                <button key={value} type="button" onClick={() => setRating(value)} className="rounded-md p-1 text-[#28e7ff]" aria-label={`${value} stars`}>
                  <Star size={22} fill={value <= rating ? "currentColor" : "none"} />
                </button>
              ))}
            </div>
          </div>
          <div className="grid gap-1.5"><Label htmlFor="review-message">Review</Label><Textarea id="review-message" name="message" required rows={5} maxLength={1200} /></div>
          <Button disabled={busy}>{busy ? "Submitting..." : "Submit review"}</Button>
        </form>
        <div className="grid gap-4">
          {data.reviews.length ? data.reviews.map((review: any) => (
            <article key={review.id} className="glass rounded-xl p-6">
              <div className="mb-3 flex gap-1 text-[#28e7ff]">{[1, 2, 3, 4, 5].map((star) => <Star key={star} size={16} fill={star <= review.rating ? "currentColor" : "none"} />)}</div>
              <p className="text-lg leading-8 text-slate-200">&quot;{review.message}&quot;</p>
              <p className="mt-4 text-sm text-slate-400"><strong className="text-white">{review.name}</strong>{review.role ? ` - ${review.role}` : ""}</p>
            </article>
          )) : <p className="glass rounded-xl p-6 text-slate-400">No approved reviews yet.</p>}
        </div>
      </section>
    </SiteLayout>
  );
}
