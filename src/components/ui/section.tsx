import { cn } from "@/lib/utils";

export function Section({ className, children, id }: { className?: string; children: React.ReactNode; id?: string }) {
  return (
    <section id={id} className={cn("mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 lg:py-24", className)}>
      {children}
    </section>
  );
}

export function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="mb-10 max-w-3xl">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-cyan">{eyebrow}</p>
      <h2 className="text-balance text-3xl font-black tracking-tight text-white sm:text-5xl">{title}</h2>
      {text ? <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg">{text}</p> : null}
    </div>
  );
}
