import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * TELVOR brand lockup: the official folded-T emblem followed by the wordmark.
 *
 * The emblem is the real artwork (`/public/images/telvor-logo.png`), keyed off
 * its dark plate and centred on a transparent square canvas. Keeping the canvas
 * square and pairing it with `object-contain` means it scales by height alone
 * and can never be stretched at any breakpoint.
 *
 * The visible wordmark carries the name, so the link wrappers in the header and
 * footer supply the full accessible label. The `alt` still reads "TELVOR" so
 * the mark is identified on its own if the image is ever rendered in isolation.
 */

type LogoVariant = "header" | "footer";

const markSize: Record<LogoVariant, string> = {
  // Mobile stays compact; desktop grows slightly without dominating the bar.
  header: "size-7 sm:size-8 lg:size-9",
  footer: "size-8 sm:size-9",
};

const wordmarkSize: Record<LogoVariant, string> = {
  header:
    "text-[0.8rem] tracking-[0.26em] sm:text-[0.85rem] sm:tracking-[0.3em] lg:text-[0.95rem] lg:tracking-[0.32em]",
  footer: "text-[0.9rem] tracking-[0.3em]",
};

export function Logo({
  variant = "header",
  className,
  priority = false,
}: {
  variant?: LogoVariant;
  className?: string;
  /** Set on the header mark so it never pops in after first paint. */
  priority?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Image
        src="/images/telvor-logo.png"
        alt="TELVOR"
        width={320}
        height={320}
        priority={priority}
        sizes="(min-width: 1024px) 36px, (min-width: 640px) 32px, 28px"
        className={cn("shrink-0 select-none object-contain", markSize[variant])}
      />
      <span
        className={cn(
          "font-display font-semibold uppercase leading-none text-ink",
          wordmarkSize[variant],
        )}
      >
        Telvor
      </span>
    </span>
  );
}
