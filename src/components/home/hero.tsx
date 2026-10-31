"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  type Variants,
} from "motion/react";
import { HeroTitle } from "@/components/home/hero-title";
import { HeroVideo } from "@/components/home/hero-video";
import { ScrollCue } from "@/components/home/scroll-cue";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { MOTION_EASE } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

const assurances = ["Accessible by default", "Self-hosted fonts", "No layout shift"];

/**
 * Cinematic hero: footage, one orchestrated entrance, then a slow scroll-away.
 *
 * The entrance is a single variant run — emblem, eyebrow, headline, support,
 * actions, closing strip — instead of independent delays, so the hierarchy
 * reveals in reading order and the whole thing can be retimed in one place.
 *
 * Two things are deliberately *not* animated:
 *
 * - Body copy never parallaxes. Only the footage, the poster and the closing
 *   veil are scroll-linked; readable text stays still while the visitor scrolls.
 * - Nothing here re-renders per frame. Every scroll-linked value is a Motion
 *   value written straight to the compositor via `style`, with no React state.
 *
 * The run is gated on `useInView` rather than mount, and `once: true` keeps it
 * to a single play-through. A mount-triggered sequence fires at hydration even
 * when the hero is off-screen — which is what happens on desktop reloads that
 * restore a mid-page scroll position — and would be over before it was seen.
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const inView = useInView(sectionRef, { once: true, amount: 0.15 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Small, compositor-only numbers: 56 px of travel and 5% of scale across the
  // whole hero exit. Enough to feel layered, far too little to feel like motion.
  const videoY = useTransform(scrollYProgress, [0, 1], [0, 56]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const veil = useTransform(scrollYProgress, [0, 1], [0, 0.45]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.35], {
    clamp: true,
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -32]);

  const show = inView || Boolean(reduceMotion);

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.09,
        delayChildren: reduceMotion ? 0 : 0.35,
      },
    },
  };

  const item: Variants = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: MOTION_EASE },
        },
      };

  // The headline is the one item that earns a longer, slower move than the rest.
  const headlineItem: Variants = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.9, ease: MOTION_EASE },
        },
      };

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-[calc(100svh-4rem)] flex-col justify-center overflow-hidden"
    >
      <HeroVideo y={videoY} scale={videoScale} veil={veil} />

      <motion.div
        data-reveal=""
        initial="hidden"
        animate={show ? "visible" : "hidden"}
        variants={container}
        /* Content is lifted explicitly: the media layer no longer uses a negative
           z-index, so this is what guarantees the copy stays above the footage. */
        className="relative z-10"
        style={reduceMotion ? undefined : { opacity: contentOpacity, y: contentY }}
      >
        <Container className="py-16 sm:py-20 lg:py-24">
          {/*
            Brand mark. Decorative here: the header already exposes the logo as a
            link labelled "TELVOR", and the headline carries the statement, so an
            empty alt keeps screen readers from announcing the name twice.
          */}
          <motion.div variants={item} className="relative inline-flex">
            <span
              aria-hidden="true"
              className="absolute -inset-3 rounded-full bg-electric/25 blur-xl"
            />
            <Image
              src="/images/telvor-logo.png"
              alt=""
              aria-hidden="true"
              width={320}
              height={320}
              priority
              sizes="48px"
              className="relative size-11 select-none object-contain sm:size-12"
            />
          </motion.div>

          <motion.div variants={item} className="mt-6">
            <Eyebrow>TELVOR — web development</Eyebrow>
          </motion.div>

          <div className="mt-7 max-w-5xl">
            <HeroTitle variants={headlineItem} />
          </div>

          <motion.p
            variants={item}
            className="mt-7 max-w-xl text-[1rem] leading-relaxed text-white/65 sm:text-lg"
          >
            TELVOR designs and engineers websites and web applications where
            every decision serves a purpose. Premium execution, no filler —
            fast, accessible, and built to last.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <ButtonLink href="/contact" size="lg" className="group">
              Start a project
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform duration-200 ease-brand group-hover:translate-x-0.5"
              />
            </ButtonLink>
            <ButtonLink href="/services" variant="secondary" size="lg">
              Explore services
            </ButtonLink>
          </motion.div>
        </Container>

        <Container className="pb-10 sm:pb-12">
          <motion.div
            variants={item}
            className="flex flex-col gap-6 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between"
          >
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {assurances.map((assurance) => (
                <li
                  key={assurance}
                  className="flex items-center gap-2 text-xs text-white/55 sm:text-sm"
                >
                  <span
                    aria-hidden="true"
                    className="size-1 rounded-full bg-cyan/80"
                  />
                  {assurance}
                </li>
              ))}
            </ul>

            <ScrollCue progress={scrollYProgress} />
          </motion.div>
        </Container>
      </motion.div>
    </section>
  );
}
