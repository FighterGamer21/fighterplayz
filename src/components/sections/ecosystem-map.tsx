"use client";

import { motion } from "framer-motion";
import { ecosystemNodes } from "@/lib/fallback-data";

export function EcosystemMap() {
  return (
    <div className="glass relative overflow-hidden rounded-2xl p-6 sm:p-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(40,231,255,.16),transparent_45%)]" />
      <div className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {ecosystemNodes.map((node, index) => (
          <motion.div key={node} whileHover={{ scale: 1.02 }} className="rounded-xl border border-white/10 bg-white/[0.035] p-5">
            <div className="mb-4 flex items-center gap-3">
              <span className="relative grid size-4 place-items-center rounded-full bg-cyan">
                <span className="absolute size-8 animate-ping rounded-full bg-cyan/20" />
              </span>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Node {String(index + 1).padStart(2, "0")}</span>
            </div>
            <h3 className="text-xl font-black text-white">{node}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">Connected identity, tooling, infrastructure, and operations layer.</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
