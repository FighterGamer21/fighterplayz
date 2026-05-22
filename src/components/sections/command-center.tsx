"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function Counter({ value }: { value: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 80, damping: 18 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) motionValue.set(value);
    return spring.on("change", (latest) => setDisplay(Math.round(latest)));
  }, [inView, motionValue, spring, value]);

  return <span ref={ref}>{display}</span>;
}

export function CommandCenter({ projects, plugins, services }: { projects: number; plugins: number; services: number }) {
  const metrics = [
    ["Projects Built", projects],
    ["Plugins Developed", plugins],
    ["Servers Optimized", 24],
    ["Web Systems Created", services + 9],
    ["Years Experience", 4]
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {metrics.map(([label, value]) => (
        <motion.div key={String(label)} whileHover={{ y: -5 }} className="glass rounded-xl p-5">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">{label}</p>
          <p className="mt-4 text-4xl font-black text-white"><Counter value={Number(value)} />+</p>
        </motion.div>
      ))}
    </div>
  );
}
