import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/ui/section";
import { StatusBadge } from "@/components/ui/status-badge";
import { getPluginBySlug } from "@/server/data";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const plugin = await getPluginBySlug(slug);
  return { title: plugin?.name ?? "Plugin", description: plugin?.tagline };
}

export default async function PluginDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const plugin = await getPluginBySlug(slug);
  if (!plugin) notFound();
  const commands = Array.isArray(plugin.commands) ? (plugin.commands as Array<Record<string, string>>) : [];
  const permissions = Array.isArray(plugin.permissions) ? (plugin.permissions as Array<Record<string, string>>) : [];
  const changelog = Array.isArray(plugin.changelog) ? (plugin.changelog as Array<Record<string, string>>) : [];

  return (
    <main>
      <Section>
        <div className="mb-8 flex flex-wrap items-center gap-3"><StatusBadge status={plugin.status} /><span className="rounded-full bg-white/5 px-3 py-1 text-xs font-bold text-slate-300">v{plugin.version}</span>{plugin.supportedVersions.map((v: string) => <span key={v} className="rounded-full border border-cyan/20 px-3 py-1 text-xs text-cyan">{v}</span>)}</div>
        <SectionHeading eyebrow="Plugin Detail" title={plugin.name} text={plugin.description} />
        <div className="grid gap-6 lg:grid-cols-[1fr_0.75fr]">
          <div className="space-y-6">
            <Panel title="Features"><ul className="space-y-2 text-slate-300">{plugin.features.map((feature: string) => <li key={feature}>- {feature}</li>)}</ul></Panel>
            <Panel title="Commands"><DataTable rows={commands} first="command" second="description" /></Panel>
            <Panel title="Permissions"><DataTable rows={permissions} first="permission" second="description" /></Panel>
            <Panel title="Screenshots / gallery"><div className="grid gap-3 sm:grid-cols-2">{plugin.gallery.map((src: string) => <img key={src} src={src} alt={`${plugin.name} screenshot`} className="aspect-video w-full rounded-lg border border-white/10 object-cover" />)}</div></Panel>
            <Panel title="Config preview"><pre className="overflow-x-auto rounded-lg bg-black/40 p-4 font-mono text-sm text-cyan">{plugin.configExample}</pre></Panel>
            <Panel title="Installation guide"><ol className="space-y-2 text-slate-300"><li>1. Download the latest plugin jar.</li><li>2. Drop it into your Paper server plugins folder.</li><li>3. Restart, edit config, then run a permission pass.</li></ol></Panel>
            <Panel title="Changelog"><ul className="space-y-2 text-slate-300">{changelog.map((item) => <li key={item.version}><strong className="text-white">{item.version}</strong> - {item.notes}</li>)}</ul></Panel>
            <Panel title="FAQ"><p className="text-slate-300">Built for Paper-first servers. Database, economy, and proxy behavior can be adapted per project requirements.</p></Panel>
          </div>
          <aside className="glass h-fit rounded-xl p-6">
            <h2 className="text-2xl font-black text-white">{plugin.tagline}</h2>
            <p className="mt-4 text-sm leading-6 text-slate-400">Type: {plugin.pluginType}<br />Pricing: {plugin.priceType}{plugin.price ? ` - $${plugin.price}` : ""}</p>
            <div className="mt-6 grid gap-3"><Button href={plugin.downloadUrl || "#"}>Download / Buy</Button><Button href={plugin.docsUrl || "#"} variant="outline">Documentation</Button></div>
            <h3 className="mt-8 font-black text-white">Dependencies</h3>
            <div className="mt-3 flex flex-wrap gap-2">{plugin.dependencies.map((item: string) => <span key={item} className="rounded-md bg-white/5 px-2 py-1 text-xs text-slate-300">{item}</span>)}</div>
          </aside>
        </div>
      </Section>
    </main>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="glass rounded-xl p-6"><h2 className="mb-4 text-2xl font-black text-white">{title}</h2>{children}</section>;
}

function DataTable({ rows, first, second }: { rows: Array<Record<string, string>>; first: string; second: string }) {
  return <div className="overflow-hidden rounded-lg border border-white/10">{rows.map((row) => <div key={row[first]} className="grid gap-2 border-b border-white/10 p-3 text-sm last:border-0 sm:grid-cols-[0.7fr_1fr]"><code className="text-cyan">{row[first]}</code><span className="text-slate-300">{row[second]}</span></div>)}</div>;
}
