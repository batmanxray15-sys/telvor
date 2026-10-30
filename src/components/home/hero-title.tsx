"use client";

import { useReducedMotion } from "motion/react";
import { TextEffect } from "@/components/motion/text-effect";

const titleClassName =
  "text-gradient-brand text-balance text-[clamp(2.6rem,9.5vw,4.75rem)] font-semibold leading-[0.98] tracking-[-0.04em]";

/**
 * Word-by-word reveal of the brand line (Motion Primitives TextEffect).
 * Reduced motion renders the finished headline immediately.
 */
export function HeroTitle() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <h1 className={titleClassName}>Built to Purpose.</h1>;
  }

  return (
    <TextEffect
      as="h1"
      per="word"
      preset="fade"
      className={titleClassName}
      delay={0.06}
      speedReveal={1.1}
      segmentWrapperClassName="inline-block"
    >
      Built to Purpose.
    </TextEffect>
  );
}
