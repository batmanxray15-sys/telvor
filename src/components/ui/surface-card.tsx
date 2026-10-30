import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Shared card surface: consistent border, radius, and hover treatment. */
export function SurfaceCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition-[border-color,background-color,box-shadow] duration-300 ease-brand hover:border-cyan/25 hover:bg-white/[0.04] hover:shadow-[0_1px_0_0_rgba(255,255,255,0.06)_inset,0_24px_60px_-32px_rgba(0,212,255,0.35)] sm:p-6",
        className,
      )}
    >
      {children}
    </div>
  );
}
