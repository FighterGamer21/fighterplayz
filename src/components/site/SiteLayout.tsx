import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export function PageHero({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) {
  return (
    <section className="mx-auto w-full max-w-7xl px-5 pb-6 pt-16 sm:px-8 lg:pt-24">
      <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#28e7ff]">{eyebrow}</p>
      <h1 className="text-balance text-4xl font-black tracking-tight text-white sm:text-6xl">{title}</h1>
      {lead ? <p className="mt-5 max-w-2xl text-lg text-slate-300">{lead}</p> : null}
    </section>
  );
}