export const ecosystemNodes = ["FighterPlayz", "OGxDevs", "OGxNodes", "Loftix Host", "ArctixMC Projects", "Plugin Systems"];

export const fallbackSkills = [
  "Java", "Python", "HTML", "CSS", "JavaScript", "TypeScript", "C++", "Minecraft Plugin Development",
  "Paper/Spigot/Pufferfish", "Velocity Proxy", "Pterodactyl", "Docker", "PostgreSQL", "MySQL", "Prisma",
  "Node.js", "Next.js", "Tailwind CSS"
].map((name, index) => ({
  id: name,
  name,
  category: index < 8 ? "Minecraft Development" : index < 12 ? "Infrastructure" : index < 16 ? "Backend" : "Frontend",
  level: [92, 85, 88, 86, 90, 89, 72][index % 7],
  icon: "Terminal",
  description: `${name} used across Minecraft networks, web systems, tooling, and optimization workflows.`,
  sortOrder: index
}));

export const fallbackProjects = [
  "OGxDevs", "OGxNodes", "ArctixMC Systems", "KitHub", "Minecraft Optimization Systems", "Custom Server GUIs", "Discord Bot Systems"
].map((title, index) => ({
  id: title,
  title,
  slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
  shortDescription: [
    "Developer ecosystem identity and systems foundation.",
    "Node and hosting infrastructure concept for gaming operations.",
    "Minecraft network systems built around speed, UX, and maintainability.",
    "Kit and progression architecture for competitive servers.",
    "Performance tuning playbooks for Paper, Pufferfish, and Velocity stacks.",
    "Inventory-driven interfaces for onboarding, kits, rewards, and navigation.",
    "Discord automation and backend integrations for communities."
  ][index],
  fullDescription: "A production-minded build focused on clean architecture, scalable infrastructure, maintainable operations, and premium Minecraft network experiences.",
  category: ["Infrastructure", "Infrastructure", "Minecraft", "Minecraft", "Tools", "Minecraft", "Web"][index],
  status: "ACTIVE",
  image: "/og/fighterplayz-og.svg",
  gallery: ["/og/fighterplayz-og.svg"],
  techStack: ["Java", "Next.js", "Prisma", "PostgreSQL", "Docker"].slice(0, 3 + (index % 3)),
  liveUrl: "https://www.fighterplays.com",
  githubUrl: "",
  featured: index < 4,
  sortOrder: index,
  problemSolved: "Reduces messy server operations by turning systems, tooling, and player flows into structured infrastructure.",
  features: ["Optimized backend flow", "Premium admin UX", "Scalable content model", "Deployment-ready architecture"],
  developmentNotes: "Designed around modular ownership, explicit configuration, and predictable maintenance.",
  outcome: "A more reliable ecosystem surface for plugins, servers, and community operations.",
  createdAt: new Date(),
  updatedAt: new Date()
}));

export const fallbackPlugins = [
  ["KitHub", "Advanced kits, cooldowns, GUIs, and progression-ready inventory flows."],
  ["OGXEvents concept", "Event automation framework for network-wide live operations."],
  ["OGxFairPvP concept", "Fair PvP enforcement, combat rules, and anti-abuse utilities."],
  ["LifeSteal concept", "Configurable hearts, revive flows, and progression hooks."],
  ["Server Guide GUI concept", "Guided onboarding menus for commands, ranks, warps, and server help."]
].map(([name, tagline], index) => ({
  id: name,
  name,
  slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
  tagline,
  description: "A premium Minecraft plugin concept built with clean command handling, permission clarity, configurable GUIs, and maintainable server-owner workflows.",
  version: index === 0 ? "1.4.0" : "0.1.0-concept",
  supportedVersions: ["1.19", "1.20", "1.21"],
  pluginType: ["Kits", "Events", "PvP", "Survival", "GUI"][index],
  priceType: index === 0 ? "Free" : "Concept",
  price: null,
  downloadUrl: "#",
  spigotUrl: "",
  githubUrl: "",
  docsUrl: "#",
  image: "/og/fighterplayz-og.svg",
  gallery: ["/og/fighterplayz-og.svg"],
  features: ["Configurable YAML modules", "Permission-aware commands", "GUI-first UX", "Server-safe defaults"],
  commands: [{ command: "/kithub", description: "Open the main plugin interface" }, { command: "/kit", description: "Claim or preview kits" }],
  permissions: [{ permission: "fighterplayz.admin", description: "Access admin controls" }, { permission: "fighterplayz.use", description: "Use player features" }],
  dependencies: ["Paper API"],
  configExample: "plugin:\n  prefix: '&bFighterPlayz'\n  storage: postgresql\n  cooldowns: true\n",
  changelog: [{ version: "1.0.0", notes: "Initial production system architecture." }],
  featured: index < 3,
  status: index === 0 ? "ACTIVE" : "CONCEPT",
  createdAt: new Date(),
  updatedAt: new Date()
}));

export const fallbackServices = [
  "Minecraft plugin development", "Server setup", "Server optimization", "Web development",
  "Hosting/panel setup", "Discord bot/backend systems", "Minecraft network branding"
].map((title, index) => ({
  id: title,
  title,
  slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  description: "Premium engineering support for Minecraft networks, gaming brands, and developer ecosystems.",
  features: ["Discovery and system plan", "Clean implementation", "Performance pass", "Deployment support"],
  icon: "ServerCog",
  startingPrice: index < 2 ? "Custom" : "From request",
  active: true
}));

export const fallbackTestimonials = [
  { id: "1", name: "Network Owner", role: "Minecraft Community", message: "FighterPlayz made our systems feel organized, faster, and easier to run.", avatar: "", rating: 5, approved: true },
  { id: "2", name: "Plugin Client", role: "Server Team", message: "The plugin flow was clean, configurable, and built with real server operations in mind.", avatar: "", rating: 5, approved: true }
];

export const fallbackPosts = [
  {
    id: "launch",
    title: "Designing a Premium Minecraft Infrastructure Ecosystem",
    slug: "premium-minecraft-infrastructure-ecosystem",
    excerpt: "How FighterPlayz combines plugins, web systems, and server operations into one maintainable ecosystem.",
    content: "A premium Minecraft infrastructure brand needs more than a list of projects. It needs reliable systems, strong defaults, thoughtful admin surfaces, and a clear identity across plugins, hosting, tools, and web experiences.",
    coverImage: "/og/fighterplayz-og.svg",
    tags: ["Minecraft", "Infrastructure", "Development"],
    published: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];
