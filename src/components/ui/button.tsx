import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string;
  variant?: "primary" | "ghost" | "outline";
};

export function Button({ className, href, variant = "primary", children, ...props }: ButtonProps) {
  const classes = cn(
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan/70 focus:ring-offset-2 focus:ring-offset-void",
    variant === "primary" && "bg-cyan text-void shadow-glow hover:bg-white",
    variant === "ghost" && "text-slate-100 hover:bg-white/10",
    variant === "outline" && "border border-cyan/30 text-cyan hover:border-cyan hover:bg-cyan/10",
    className
  );
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
