"use client";

import { useReducedMotion } from "motion/react";
import { TextEffect } from "@/components/motion/text-effect";

const titleClassName =
  "text-gradient-brand text-balance text-[clamp(2.8rem,11vw,6rem)] font-semibold leading-[0.94] tracking-[-0.045em]";

/**
 * Word-by-word reveal of the brand line (Motion Primitives TextEffect).
 *
 * `per="word"` rather than `char`: the skill's motion data explicitly warns
 * against character-splitting long copy (DOM size, and split text that never
 * reverts is an accessibility hazard). Word mode also emits an `sr-only` copy of
 * the full sentence, so the headline is announced once, intact.
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
      preset="fade-in-blur"
      className={titleClassName}
      delay={0.05}
      speedReveal={1.15}
      speedSegment={0.9}
      segmentWrapperClassName="inline-block"
    >
      Built to Purpose.
    </TextEffect>
  );
}
