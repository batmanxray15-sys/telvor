"use client";

import { motion, type Variants } from "motion/react";

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
 * itself is safe: its own background and text move together as one layer. That
 * is also why the headline does not word-stagger: any per-word or per-line
 * stagger would require one gradient per element and a re-tuned sweep. The
 * headline rises as a single composed unit, and the stagger comes from the
 * surrounding sequence.
 *
 * The reveal itself is owned by the parent (`Hero`): it passes the variant this
 * heading should follow, and gates the whole run on the section entering view
 * rather than on mount, so a scroll-restored reload doesn't burn the animation
 * off-screen.
 */
const titleClassName =
  "text-gradient-brand text-[clamp(2.85rem,10vw,6.25rem)] font-semibold leading-[0.9] tracking-[-0.05em]";

export function HeroTitle({ variants }: { variants: Variants }) {
  return (
    <motion.h1 variants={variants} className={titleClassName}>
      <span className="block md:inline">Built to</span>{" "}
      <span className="block md:inline">Purpose.</span>
    </motion.h1>
  );
}
