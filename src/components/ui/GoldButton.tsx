import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "solid" | "outline";

const base =
  "inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 px-8 py-3 text-[0.72rem] font-medium uppercase tracking-luxe transition-all duration-300 ease-out";

const variants: Record<Variant, string> = {
  solid:
    "bg-gold-500 text-ink hover:bg-gold-400 hover:shadow-[0_0_30px_-8px_var(--color-gold-500)]",
  outline:
    "border border-gold-600/60 text-gold-400 hover:border-gold-400 hover:bg-gold-500/10",
};

type GoldLinkProps = ComponentProps<typeof Link> & {
  variant?: Variant;
  children: ReactNode;
};

export function GoldLink({
  variant = "solid",
  className = "",
  children,
  ...props
}: GoldLinkProps) {
  return (
    <Link className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </Link>
  );
}

type GoldButtonProps = ComponentProps<"button"> & {
  variant?: Variant;
  children: ReactNode;
};

export function GoldButton({
  variant = "solid",
  className = "",
  children,
  ...props
}: GoldButtonProps) {
  return (
    <button
      className={`${base} ${variants[variant]} disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
