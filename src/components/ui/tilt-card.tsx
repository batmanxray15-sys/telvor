"use client";

import type { ReactNode } from "react";
import { useReducedMotion } from "motion/react";
import { Tilt } from "@/components/motion/tilt";
import { cn } from "@/lib/utils";

/**
 * Pointer-driven 3D tilt (Motion Primitives). Disabled entirely under
 * `prefers-reduced-motion` — the card renders as a plain surface.
 */
export function TiltCard({
  children,
  className,
  rotationFactor = 5,
}: {
  children: ReactNode;
  className?: string;
  rotationFactor?: number;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={cn("h-full", className)}>{children}</div>;
  }

  return (
    <Tilt
      className={cn("h-full will-change-transform", className)}
      rotationFactor={rotationFactor}
      springOptions={{ stiffness: 120, damping: 18, mass: 0.4 }}
    >
      {children}
    </Tilt>
  );
}
