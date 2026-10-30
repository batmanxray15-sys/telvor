import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Shared card surface: consistent border, radius, padding and interaction.
 *
 * Tailwind 4 already wraps `hover:` in `@media (hover: hover)`, so the border and
 * shadow lift never stick on a touch device. `active:` supplies the feedback
 * touch users can actually produce.
 *
 * `interactive={false}` is for surfaces that only hold information and are not
 * part of a hover story — they keep the visual treatment but drop the lift, so
 * the page doesn't imply a click target that isn't there.
 */
export function SurfaceCard({
  children,
  className,
  interactive = true,
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  return (
    <div
      className={cn(
        "group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition-[border-color,background-color,box-shadow] duration-300 ease-brand sm:p-6",
        interactive &&
          "hover:border-cyan/25 hover:bg-white/[0.04] hover:shadow-[0_1px_0_0_rgba(255,255,255,0.06)_inset,0_24px_60px_-32px_rgba(0,212,255,0.35)] active:border-cyan/35 active:bg-white/[0.05]",
        className,
      )}
    >
      {children}
    </div>
  );
}
