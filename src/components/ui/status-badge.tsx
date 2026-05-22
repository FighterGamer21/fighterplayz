import { cn } from "@/lib/utils";

export function StatusBadge({ status }: { status?: string | null }) {
  const value = status ?? "ACTIVE";
  return (
    <span className={cn("inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide",
      value === "ACTIVE" || value === "MAINTAINED" ? "border-cyan/30 bg-cyan/10 text-cyan" : "border-violet/30 bg-violet/10 text-violet-200"
    )}>
      {value}
    </span>
  );
}
