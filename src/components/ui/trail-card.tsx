"use client";

import type { ReactNode } from "react";
import { BorderTrail } from "@/components/motion/border-trail";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

/**
 * A surface with an animated border highlight (Motion Primitives).
 * The trail is not rendered at all under `prefers-reduced-motion`.
 */
export function TrailCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <div
      className={cn(
        "relative isolate rounded-3xl border border-white/10 bg-white/[0.025]",
        className,
      )}
    >
      {!reduceMotion && (
        <BorderTrail
          className="bg-gradient-to-r from-electric via-cyan to-electric"
          size={140}
          transition={{ repeat: Infinity, duration: 9, ease: "linear" }}
        />
      )}
      {children}
    </div>
  );
}
