"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { MOTION_DURATION, MOTION_EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

type LineRevealProps = {
  /** Each entry renders as its own block line. Pass real sentences, not fragments. */
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  /** Stagger between lines, in seconds. */
  stagger?: number;
  as?: "p" | "h2" | "div";
};

/**
 * Scroll-triggered line-by-line reveal.
 *
 * Preferred over `TextEffect` here because `per="line"` only animates on mount,
 * and this needs to fire when the block enters the viewport. Copy stays as real
 * text nodes in `block` spans — nothing is `aria-hidden`, so screen readers read
 * it once, in order.
 *
 * `data-reveal` lets the <noscript> rule in the root layout force the final
 * state when JavaScript never runs.
 */
export function LineReveal({
  lines,
  className,
  lineClassName,
  delay = 0,
  stagger = 0.09,
  as = "p",
}: LineRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const reduceMotion = usePrefersReducedMotion();

  const Tag = as;
  const visible = inView || reduceMotion;

  const body = lines.map((line, index) => (
    <motion.span
      key={`${index}-${line.slice(0, 12)}`}
      className={cn("block", lineClassName)}
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      transition={{
        duration: reduceMotion ? 0 : MOTION_DURATION.slow,
        delay: reduceMotion ? 0 : delay + index * stagger,
        ease: MOTION_EASE,
      }}
    >
      {line}
    </motion.span>
  ));

  return (
    <div ref={ref} data-reveal="">
      <Tag className={className}>{body}</Tag>
    </div>
  );
}
