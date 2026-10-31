"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

/**
 * Scroll indicator: a hairline with a cyan marker travelling down it.
 *
 * It fades out as the visitor starts scrolling (`0 → 0.12` of the hero exit), so
 * it is an invitation rather than a permament fixture, and it is `aria-hidden` —
 * the heading order and the page length already say the page continues.
 *
 * Under `prefers-reduced-motion` the marker is rendered without the travelling
 * animation: a static dot at the top of a static rule, not a 0.001 ms infinite
 * loop that some browsers still schedule.
 */
export function ScrollCue({ progress }: { progress: MotionValue<number> }) {
  const reduceMotion = usePrefersReducedMotion();
  const opacity = useTransform(progress, [0, 0.12], [1, 0], { clamp: true });

  return (
    <motion.p
      aria-hidden="true"
      style={reduceMotion ? undefined : { opacity }}
      className="flex items-center gap-3"
    >
      <span className="relative flex h-9 w-px justify-center bg-white/[0.14]">
        <span
          className={cn(
            "absolute left-1/2 top-0 size-1 -translate-x-1/2 rounded-full bg-cyan",
            !reduceMotion && "animate-scroll-travel",
          )}
        />
      </span>
      <span className="text-[0.68rem] uppercase tracking-[0.24em] text-white/55">
        Scroll
      </span>
    </motion.p>
  );
}
