"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

/**
 * The vertical rule behind the process timeline, drawn as the section scrolls.
 *
 * `scaleY` is a transform, so this stays on the compositor — no layout work per
 * frame and no React state. Under `prefers-reduced-motion` the rule renders
 * fully drawn and static.
 */
export function TimelineRule() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 65%"],
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0.04, 1]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="absolute inset-y-0 left-0 w-px overflow-hidden bg-white/[0.08]"
    >
      <motion.div
        style={reduceMotion ? undefined : { scaleY }}
        className="h-full w-full origin-top bg-gradient-to-b from-electric via-cyan to-transparent"
      />
    </div>
  );
}
