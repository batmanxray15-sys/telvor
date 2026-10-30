import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold tracking-tight transition-[background-color,border-color,box-shadow,color] duration-200 ease-brand disabled:cursor-not-allowed disabled:opacity-55";

const variants: Record<Variant, string> = {
  primary:
    "bg-electric text-white shadow-[0_10px_40px_-14px_rgba(23,105,255,0.9)] hover:bg-[#2a76ff] hover:shadow-[0_16px_48px_-12px_rgba(0,212,255,0.5)]",
  secondary:
    "border border-white/15 bg-white/[0.04] text-ink hover:border-cyan/45 hover:bg-white/[0.07]",
  ghost: "text-white/70 hover:text-ink",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5",
  lg: "h-12 px-6 text-[0.95rem]",
};

export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
} = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: Variant;
  size?: Size;
};

/** Navigation belongs in a link, never a button. */
export function ButtonLink({
  variant,
  size,
  className,
  ...props
}: ButtonLinkProps) {
  return <Link className={buttonStyles({ variant, size, className })} {...props} />;
}

type ButtonProps = ComponentProps<"button"> & {
  variant?: Variant;
  size?: Size;
};

/** Actions belong in a button, never a link. */
export function Button({ variant, size, className, type = "button", ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonStyles({ variant, size, className })}
      {...props}
    />
  );
}
