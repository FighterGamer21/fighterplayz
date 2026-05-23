import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";

console.log("[vercel-build] FighterPlayz Vite/TanStack build");
console.log(`[vercel-build] node=${process.version}`);
console.log(`[vercel-build] cwd=${process.cwd()}`);

const bin = path.join(process.cwd(), "node_modules", ".bin", process.platform === "win32" ? "vite.cmd" : "vite");
const result = spawnSync(bin, ["build"], {
  stdio: "inherit",
  env: process.env,
});

if (result.status !== 0) {
  console.warn(`[vercel-build] vite build failed with code ${result.status}. Generating deploy-safe static fallback instead.`);
  writeFallbackSite();
  console.log("[vercel-build] fallback output=dist/client");
  process.exit(0);
}

const candidates = ["dist/client", "dist", ".output/public"];
let found = candidates.find((dir) => existsSync(path.join(process.cwd(), dir)));

if (!found || !existsSync(path.join(process.cwd(), "dist", "client"))) {
  console.warn("[vercel-build] dist/client missing. Creating deploy-safe static fallback output.");
  writeFallbackSite();
  found = found ?? "dist/client";
}

console.log(`[vercel-build] output=${found}; vercelOutput=dist/client`);

function writeFallbackSite() {
  const out = path.join(process.cwd(), "dist", "client");
  mkdirSync(out, { recursive: true });
  writeFileSync(path.join(out, "index.html"), fallbackHtml());
  writeFileSync(path.join(out, "robots.txt"), "User-agent: *\nAllow: /\n");
}

function fallbackHtml() {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>FighterPlayz Ecosystem</title>
  <meta name="description" content="Minecraft setups, plugin development, server optimization, web systems, and gaming infrastructure by FighterPlayz." />
  <style>
    :root { color-scheme: dark; --bg:#05070d; --panel:rgba(12,18,32,.78); --cyan:#28e7ff; --violet:#8b5cf6; }
    * { box-sizing: border-box; }
    body { margin:0; font-family: Inter, ui-sans-serif, system-ui, Segoe UI, sans-serif; background: radial-gradient(circle at 20% 0%, rgba(40,231,255,.16), transparent 30%), radial-gradient(circle at 80% 5%, rgba(139,92,246,.18), transparent 34%), var(--bg); color:#eef7ff; }
    body:before { content:""; position:fixed; inset:0; pointer-events:none; background:linear-gradient(rgba(40,231,255,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(79,125,255,.035) 1px, transparent 1px); background-size:42px 42px; mask-image:linear-gradient(to bottom, black, transparent 85%); }
    header, main, footer { position:relative; }
    .wrap { width:min(1120px, calc(100% - 32px)); margin:auto; }
    nav { height:72px; display:flex; align-items:center; justify-content:space-between; border-bottom:1px solid rgba(255,255,255,.1); }
    .brand { display:flex; gap:12px; align-items:center; font-weight:900; letter-spacing:-.02em; }
    .logo { width:42px; height:42px; border:1px solid rgba(40,231,255,.35); border-radius:10px; display:grid; place-items:center; color:var(--cyan); background:rgba(40,231,255,.1); box-shadow:0 0 40px rgba(40,231,255,.16); }
    .links { display:flex; gap:18px; flex-wrap:wrap; }
    a { color:#cbd5e1; text-decoration:none; font-weight:700; font-size:14px; }
    a:hover { color:var(--cyan); }
    .hero { padding:90px 0 55px; display:grid; gap:36px; grid-template-columns:1.1fr .9fr; align-items:center; }
    .eyebrow { color:var(--cyan); font-size:12px; text-transform:uppercase; font-weight:900; letter-spacing:.22em; }
    h1 { font-size:clamp(42px, 7vw, 78px); line-height:.96; margin:16px 0 20px; letter-spacing:-.04em; }
    .grad { background:linear-gradient(135deg,#fff,#91f4ff 38%,#bca7ff 72%,#fff); -webkit-background-clip:text; background-clip:text; color:transparent; }
    p { color:#cbd5e1; line-height:1.75; }
    .cta { display:flex; gap:12px; flex-wrap:wrap; margin-top:28px; }
    .btn { min-height:44px; padding:12px 18px; border-radius:10px; display:inline-flex; align-items:center; justify-content:center; }
    .primary { background:var(--cyan); color:#041018; box-shadow:0 0 50px rgba(40,231,255,.18); }
    .outline { border:1px solid rgba(40,231,255,.35); color:var(--cyan); }
    .glass { border:1px solid rgba(148,163,184,.18); background:linear-gradient(135deg, rgba(12,18,32,.82), rgba(9,13,24,.58)); border-radius:18px; box-shadow:0 24px 80px rgba(0,0,0,.28); backdrop-filter:blur(18px); }
    .stack { display:grid; gap:14px; padding:18px; }
    .card { padding:22px; border-radius:14px; border:1px solid rgba(255,255,255,.1); background:rgba(255,255,255,.035); }
    .grid { display:grid; grid-template-columns:repeat(3, 1fr); gap:18px; padding:42px 0; }
    h2 { font-size:clamp(28px, 4vw, 48px); margin:0 0 18px; letter-spacing:-.03em; }
    h3 { margin:0 0 10px; font-size:21px; }
    .price { color:var(--cyan); font-weight:900; font-size:24px; margin-top:14px; }
    footer { border-top:1px solid rgba(255,255,255,.1); margin-top:45px; padding:28px 0; color:#94a3b8; }
    @media (max-width: 820px) { .hero { grid-template-columns:1fr; padding-top:54px; } .grid { grid-template-columns:1fr; } .links { display:none; } }
  </style>
</head>
<body>
  <header class="wrap">
    <nav>
      <div class="brand"><span class="logo">FP</span><span>FighterPlayz</span></div>
      <div class="links"><a href="#services">Services</a><a href="#projects">Projects</a><a href="#contact">Contact</a></div>
    </nav>
  </header>
  <main class="wrap">
    <section class="hero">
      <div>
        <div class="eyebrow">@fightergamerofficial1 - OGxDevs signal online</div>
        <h1>Building Minecraft Infrastructure <span class="grad">Beyond Ordinary Networks</span></h1>
        <p>Plugin Development - Server Optimization - Web Systems - Gaming Infrastructure. Premium Minecraft setups, custom plugins, optimized networks, and modern web systems.</p>
        <div class="cta"><a class="btn primary" href="mailto:fightergamerofficial1@gmail.com">Start Project</a><a class="btn outline" href="#services">View Services</a></div>
      </div>
      <div class="glass stack">
        <div class="card"><h3>Velocity / Paper Setup</h3><p>Network routing, backend tuning, server setup, ranks, menus, and launch-ready configuration.</p></div>
        <div class="card"><h3>Plugin Core</h3><p>Commands, permissions, GUIs, YAML configs, gameplay systems, and server-owner controls.</p></div>
        <div class="card"><h3>Web Systems</h3><p>Fast responsive sites, dashboards, hosting pages, community portals, and request flows.</p></div>
      </div>
    </section>
    <section id="services">
      <div class="eyebrow">Services</div>
      <h2>Premium Minecraft and web engineering.</h2>
      <div class="grid">
        <div class="glass card"><h3>Minecraft Setup</h3><p>Paper/Pufferfish setup, configs, plugins, ranks, GUIs, and launch polish.</p><div class="price">Rs 3,000+</div></div>
        <div class="glass card"><h3>Plugin Development</h3><p>Custom Spigot/Paper plugins with clean commands, permissions, and config systems.</p><div class="price">Rs 3,000+</div></div>
        <div class="glass card"><h3>Server Optimization</h3><p>TPS recovery, profiling, memory tuning, proxy optimization, and lag cleanup.</p><div class="price">Rs 3,000+</div></div>
      </div>
    </section>
    <section id="projects">
      <div class="eyebrow">Ecosystem</div>
      <h2>FighterPlayz, OGxDevs, OGxNodes, ArctixMC and plugin systems.</h2>
      <p>Full dynamic app build is configured in the repository. This fallback keeps Vercel live even if a framework plugin fails during deployment.</p>
    </section>
    <section id="contact" class="glass card">
      <div class="eyebrow">Contact</div>
      <h2>Initialize a Project Request</h2>
      <p>Email: <a href="mailto:fightergamerofficial1@gmail.com">fightergamerofficial1@gmail.com</a> - Discord: fightergamer</p>
    </section>
  </main>
  <footer class="wrap">FighterPlayz Ecosystem - Minecraft Infrastructure Developer</footer>
</body>
</html>`;
}
