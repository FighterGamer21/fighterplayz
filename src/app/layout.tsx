import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "@/styles/globals.css";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { ScrollProgress } from "@/components/ui/scroll-progress";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.fighterplays.com"),
  title: {
    default: "FighterPlayz Ecosystem | Minecraft Infrastructure Developer",
    template: "%s | FighterPlayz Ecosystem"
  },
  description: "Premium Minecraft plugin development, server optimization, web systems, and gaming infrastructure by FighterPlayz.",
  keywords: ["FighterPlayz", "Minecraft Developer", "Plugin Developer", "Minecraft Server Optimizer", "Web Developer", "OGxDevs", "Minecraft Infrastructure Developer"],
  alternates: { canonical: "/" },
  openGraph: {
    title: "FighterPlayz Ecosystem",
    description: "Building Minecraft infrastructure beyond ordinary networks.",
    url: "https://www.fighterplays.com",
    siteName: "FighterPlayz",
    images: [{ url: "/og/fighterplayz-og.svg", width: 1200, height: 630 }],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    creator: "@fightergamerofficial1",
    title: "FighterPlayz Ecosystem",
    description: "Plugin Development • Server Optimization • Web Systems • Gaming Infrastructure",
    images: ["/og/fighterplayz-og.svg"]
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ScrollProgress />
        <Navbar />
        {children}
        <Footer />
        <Toaster theme="dark" richColors position="bottom-right" />
      </body>
    </html>
  );
}
