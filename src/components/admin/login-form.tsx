"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function submit(formData: FormData) {
    setLoading(true);
    const result = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false
    });
    setLoading(false);
    if (result?.error) {
      toast.error("Invalid admin credentials.");
      return;
    }
    toast.success("Command center unlocked.");
    router.push("/admin/dashboard");
  }

  return (
    <form action={submit} className="glass mx-auto grid max-w-md gap-4 rounded-xl p-6">
      <label className="grid gap-2 text-sm font-semibold text-slate-200">Email<input name="email" type="email" required className="rounded-lg border border-white/10 bg-black/30 p-3 text-white outline-none focus:border-cyan" /></label>
      <label className="grid gap-2 text-sm font-semibold text-slate-200">Password<input name="password" type="password" required className="rounded-lg border border-white/10 bg-black/30 p-3 text-white outline-none focus:border-cyan" /></label>
      <Button disabled={loading}>{loading ? "Authenticating..." : "Login"}</Button>
    </form>
  );
}
