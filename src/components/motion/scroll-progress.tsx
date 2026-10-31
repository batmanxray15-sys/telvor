"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

/**
 * Hairline reading-progress indicator pinned to the top of the viewport.
 *
 * A transform-only scroll-linked value (scaleX): it never triggers a React
 * render, so it costs nothing per frame. Purely decorative, hence
 * `aria-hidden` — the document outline already conveys position. Disabled
 * entirely under `prefers-reduced-motion`.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduceMotion = usePrefersReducedMotion();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.3,
  });

  if (reduceMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-electric via-cyan to-electric"
    />
  );
}
