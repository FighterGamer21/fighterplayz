export const CURRENCIES = {
  INR: { label: "INR", symbol: "Rs", rateFromInr: 1 },
  USD: { label: "USD", symbol: "$", rateFromInr: 0.012 },
  NPR: { label: "NPR", symbol: "NPR", rateFromInr: 1.6 },
  PKR: { label: "PKR", symbol: "PKR", rateFromInr: 3.35 },
  BDT: { label: "BDT", symbol: "BDT", rateFromInr: 1.42 },
} as const;

export type CurrencyCode = keyof typeof CURRENCIES;

export const SERVICE_PRICES = [
  {
    slug: "minecraft-setup",
    title: "Minecraft Setup",
    description: "Paper/Pufferfish setup, configs, plugins, ranks, menus, and launch-ready server polish.",
    baseInr: 3000,
    projectType: "Minecraft Setup",
  },
  {
    slug: "plugin-development",
    title: "Minecraft Plugin Development",
    description: "Custom Paper/Spigot plugin logic, commands, permissions, configs, and GUI workflows.",
    baseInr: 3000,
    projectType: "Plugin Development",
  },
  {
    slug: "server-optimization",
    title: "Server Optimization",
    description: "TPS tuning, Paper/Pufferfish optimization, timings/spark review, and lag cleanup.",
    baseInr: 3000,
    projectType: "Server Optimization",
  },
  {
    slug: "web-development",
    title: "Web Development",
    description: "Modern server, portfolio, hosting, or community website with responsive UI.",
    baseInr: 3000,
    projectType: "Web Development",
  },
] as const;

export function convertFromInr(amountInr: number, currency: CurrencyCode) {
  return amountInr * CURRENCIES[currency].rateFromInr;
}

export function formatCurrency(amountInr: number, currency: CurrencyCode) {
  const value = convertFromInr(amountInr, currency);
  if (currency === "USD") return `${CURRENCIES[currency].symbol}${value.toFixed(2)}`;
  return `${CURRENCIES[currency].symbol} ${Math.round(value).toLocaleString("en-IN")}`;
}
