import { prisma } from "@/lib/prisma";

export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } }).catch(() => []);
  return (
    <div>
      <h1 className="text-4xl font-black text-white">Contact Messages</h1>
      <p className="mt-2 text-slate-400">Project requests submitted through the public contact form.</p>
      <div className="mt-8 grid gap-4">{messages.map((message) => <article key={message.id} className="glass rounded-xl p-5"><div className="flex flex-wrap items-center justify-between gap-3"><h2 className="text-xl font-black text-white">{message.subject}</h2><span className="rounded-full bg-cyan/10 px-3 py-1 text-xs font-bold text-cyan">{message.status}</span></div><p className="mt-2 text-sm text-slate-400">{message.name} • {message.email} • {message.discord}</p><p className="mt-4 leading-7 text-slate-300">{message.message}</p><p className="mt-4 text-xs uppercase tracking-wide text-slate-500">{message.projectType} {message.budgetRange ? `• ${message.budgetRange}` : ""}</p></article>)}</div>
    </div>
  );
}
