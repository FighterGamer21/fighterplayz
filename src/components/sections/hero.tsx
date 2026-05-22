"use client";

import { motion } from "framer-motion";
import { ArrowRight, Code2, DatabaseZap, Server } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-cyan">
            @fightergamerofficial1 - OGxDevs signal online
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="text-balance text-5xl font-black leading-[0.96] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Building Minecraft Infrastructure <span className="text-gradient">Beyond Ordinary Networks</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }} className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Plugin Development - Server Optimization - Web Systems - Gaming Infrastructure
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }} className="mt-8 flex flex-wrap gap-3">
            <Button href="/ecosystem">Explore Ecosystem <ArrowRight size={17} /></Button>
            <Button href="/projects" variant="outline">View Projects</Button>
            <Button href="/contact" variant="ghost">Contact Me</Button>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="glass scanline relative min-h-[420px] overflow-hidden rounded-2xl p-5">
          <div className="absolute inset-0 bg-radial-core opacity-70" />
          <div className="relative grid h-full gap-4">
            {([
              ["Velocity Proxy", "Latency routing stable", Server],
              ["Plugin Core", "Commands compiled", Code2],
              ["PostgreSQL", "Content sync active", DatabaseZap]
            ] as const).map(([title, text, Icon], index) => (
              <motion.div key={String(title)} animate={{ y: [0, -8, 0] }} transition={{ duration: 5 + index, repeat: Infinity }} className="glass rounded-xl p-5">
                <div className="mb-4 flex items-center justify-between">
                  <div className="grid size-11 place-items-center rounded-lg bg-cyan/10 text-cyan"><Icon size={21} /></div>
                  <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300">ONLINE</span>
                </div>
                <h3 className="text-xl font-black text-white">{String(title)}</h3>
                <p className="mt-1 text-sm text-slate-400">{String(text)}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
