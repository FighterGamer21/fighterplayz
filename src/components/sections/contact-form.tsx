"use client";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

type ContactFormValues = {
  name: string;
  email: string;
  discord?: string;
  subject: string;
  projectType?: string;
  budgetRange?: string;
  message: string;
};

export function ContactForm() {
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<ContactFormValues>();
  async function onSubmit(values: ContactFormValues) {
    const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
    if (!res.ok) {
      toast.error("Request failed validation. Check the details and try again.");
      return;
    }
    toast.success("Project request initialized. The message is in the command center.");
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="glass grid gap-4 rounded-xl p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" {...register("name", { required: true })} />
        <Field label="Email" type="email" {...register("email", { required: true })} />
        <Field label="Discord username" {...register("discord")} />
        <Field label="Subject" {...register("subject", { required: true })} />
        <Field label="Project type" {...register("projectType")} />
        <Field label="Budget range" {...register("budgetRange")} />
      </div>
      <label className="grid gap-2 text-sm font-semibold text-slate-200">Message<textarea className="min-h-40 rounded-lg border border-white/10 bg-black/30 p-3 text-white outline-none transition focus:border-cyan" {...register("message", { required: true })} /></label>
      <Button disabled={isSubmitting}>{isSubmitting ? "Transmitting..." : "Initialize request"}</Button>
    </form>
  );
}

function Field({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return <label className="grid gap-2 text-sm font-semibold text-slate-200">{label}<input className="rounded-lg border border-white/10 bg-black/30 p-3 text-white outline-none transition focus:border-cyan" {...props} /></label>;
}
