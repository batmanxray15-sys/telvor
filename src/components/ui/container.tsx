import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Page-width container. Horizontal padding is the only thing that keeps content
 * off the viewport edge; every page and footer uses this so nothing can bleed.
 */
export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}
