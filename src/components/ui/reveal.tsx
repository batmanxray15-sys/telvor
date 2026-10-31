"use client";

import type { ReactNode } from "react";
import { InView } from "@/components/motion/in-view";
import { MOTION_DURATION, MOTION_EASE } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger helper, in seconds. */
  delay?: number;
};

/**
 * Fade + lift on first view. Under `prefers-reduced-motion` the content renders
 * in its final state with no transform or opacity animation.
 *
 * The `data-reveal` hook lets the <noscript> styles in the root layout force the
 * final state when JavaScript is unavailable, so content is never invisible.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reduceMotion = usePrefersReducedMotion();

  const variants = reduceMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } };

  return (
    <div className={className} data-reveal="">
      <InView
        viewOptions={{ once: true, margin: "0px 0px -72px 0px" }}
        variants={variants}
        transition={{
          duration: reduceMotion ? 0 : MOTION_DURATION.slow,
          delay,
          ease: MOTION_EASE,
        }}
      >
        {children}
      </InView>
    </div>
  );
}
