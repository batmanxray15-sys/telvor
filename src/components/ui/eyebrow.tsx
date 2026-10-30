import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Small monospaced-feeling label used above section headings. */
export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.7rem] font-medium uppercase tracking-[0.28em] text-cyan/90",
        className,
      )}
    >
      <span aria-hidden="true" className="h-px w-6 bg-cyan/60" />
      {children}
    </p>
  );
}
