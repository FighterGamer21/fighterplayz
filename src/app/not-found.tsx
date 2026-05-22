import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";

export default function NotFound() {
  return (
    <main>
      <Section className="min-h-[65vh] text-center">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan">404 Signal Lost</p>
        <h1 className="mt-4 text-5xl font-black text-white">This node is offline.</h1>
        <p className="mx-auto mt-4 max-w-xl text-slate-400">The requested route is not part of the current FighterPlayz ecosystem map.</p>
        <div className="mt-8"><Button href="/">Return home</Button></div>
      </Section>
    </main>
  );
}
