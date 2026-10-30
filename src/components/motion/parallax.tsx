"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  /**
   * Vertical travel in pixels across the observed scroll range. Keep it small
   * (8–40px): the skill data advises a 5–15% delta so foreground and background
   * never desync distractingly.
   */
  distance?: number;
};

/**
 * Scroll-linked vertical drift for *decorative* layers only.
 *
 * The Motion Primitives scroll-progress component was removed upstream for
 * motion@14 incompatibility (`layoutEffect` was dropped from `useScroll`), so
 * this uses the current v14 API. Never apply this to body copy or controls —
 * parallaxing readable text hurts comfort and is a documented anti-pattern.
 */
export function Parallax({ children, className, distance = 24 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={cn("will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}
