"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { MOTION_EASE } from "@/lib/motion";

/**
 * Cinematic statement headline.
 *
 * Typography: tighter leading and a `clamp()` that lands near 100px on large
 * screens, so the line reads as a composed statement rather than body copy.
 *
 * Line breaks are explicit instead of left to `text-balance`: two stacked lines
 * below `md`, one full-width line from `md` up. Leaving it to the wrapper alone
 * produced an accidental break near 640–700px, where the clamp is already large
 * but the container is not yet wide enough.
 *
 * The gradient lives on the animated `<h1>` itself and nothing inside it is ever
 * transformed. `background-clip: text` paints an ancestor's background through
 * descendant glyphs, so wrapping words in transformed spans makes the type
 * disappear — the classic way this effect breaks. Animating the gradient element
 * itself is safe: its own background and text move together as one layer.
 *
 * The entrance is gated on `useInView` rather than mount. A mount-triggered
 * reveal fires at hydration even when the hero is off-screen — which is what
 * happens on desktop reloads that restore a mid-page scroll position — so the
 * animation has silently finished before the section is ever seen.
 */
const titleClassName =
  "text-gradient-brand text-[clamp(2.85rem,10vw,6.25rem)] font-semibold leading-[0.9] tracking-[-0.05em]";

export function HeroTitle() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const show = inView || reduceMotion;

  return (
    <div ref={ref} data-reveal="">
      <motion.h1
        className={titleClassName}
        initial={reduceMotion ? false : { opacity: 0, y: 28 }}
        animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
        transition={{ duration: reduceMotion ? 0 : 0.9, ease: MOTION_EASE }}
      >
        <span className="block md:inline">Built to</span>{" "}
        <span className="block md:inline">Purpose.</span>
      </motion.h1>
    </div>
  );
}
