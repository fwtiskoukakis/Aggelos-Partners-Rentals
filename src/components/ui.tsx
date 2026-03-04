import { type ReactNode } from "react";

export function SectionShell({ children }: { children: ReactNode }) {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-10 sm:px-8 sm:py-14">
      {children}
    </section>
  );
}

export function LuxButton({
  children,
  variant = "primary",
  ...props
}: {
  children: ReactNode;
  variant?: "primary" | "ghost";
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const base =
    "inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-medium tracking-wide transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed";
  const styles =
    variant === "primary"
      ? "bg-accent text-white shadow-soft hover:bg-accentSoft"
      : "bg-stone-100 text-textPrimary hover:bg-stone-200 border border-stone-200";

  return (
    <button className={`${base} ${styles}`} {...props}>
      {children}
    </button>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-stone-200 bg-stone-100 px-3 py-1 text-xs uppercase tracking-[0.18em] text-textMuted">
      {children}
    </span>
  );
}

