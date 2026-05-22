"use client";

import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main>
      <Section className="min-h-[65vh] text-center">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-red-300">Runtime Fault</p>
        <h1 className="mt-4 text-5xl font-black text-white">A system panel failed to load.</h1>
        <p className="mx-auto mt-4 max-w-xl text-slate-400">Try reloading the route. If this is the admin panel, confirm the database and environment variables are online.</p>
        <div className="mt-8"><Button onClick={reset}>Retry</Button></div>
      </Section>
    </main>
  );
}
