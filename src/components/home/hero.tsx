import Image from "next/image";
import { ArrowRight, ArrowDown } from "lucide-react";
import { AmbientBackdrop } from "@/components/site/ambient-backdrop";
import { HeroTitle } from "@/components/home/hero-title";
import { Parallax } from "@/components/motion/parallax";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";

const assurances = ["Accessible by default", "Self-hosted fonts", "No layout shift"];

/**
 * Cinematic hero: one composition, one entrance, then a slow ambient drift.
 *
 * The entrance is a single staggered run — emblem, eyebrow, headline, support,
 * actions, then the closing strip — instead of a set of unrelated delays, so the
 * hierarchy reveals in reading order.
 *
 * Sustained motion comes from the backdrop (a slow CSS drift plus the scroll
 * parallax), never from body copy: the type settles and stays still, which is
 * what keeps the section readable while the lighting keeps breathing.
 */
export function Hero() {
  return (
    <section className="relative isolate flex min-h-[calc(100svh-4rem)] flex-col justify-center overflow-hidden">
      <Parallax distance={18} className="pointer-events-none absolute inset-0 -z-10">
        <AmbientBackdrop />
      </Parallax>

      <Container className="py-16 sm:py-20 lg:py-24">
        {/*
          Brand mark. Decorative here: the header already exposes the logo as a
          link labelled "TELVOR", and the headline carries the statement, so an
          empty alt keeps screen readers from announcing the name twice.
        */}
        <Reveal>
          <div className="relative inline-flex">
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
          </div>
        </Reveal>

        <Reveal delay={0.06} className="mt-6">
          <Eyebrow>TELVOR — web development</Eyebrow>
        </Reveal>

        <div className="mt-7 max-w-5xl">
          <HeroTitle />
        </div>

        <Reveal delay={0.22}>
          <p className="mt-7 max-w-xl text-[1rem] leading-relaxed text-white/65 sm:text-lg">
            TELVOR designs and engineers websites and web applications where
            every decision serves a purpose. Premium execution, no filler —
            fast, accessible, and built to last.
          </p>
        </Reveal>

        <Reveal delay={0.34}>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
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
          </div>
        </Reveal>
      </Container>

      <Container className="pb-10 sm:pb-12">
        <Reveal delay={0.44}>
          <div className="flex flex-col gap-6 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {assurances.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-xs text-white/55 sm:text-sm"
                >
                  <span
                    aria-hidden="true"
                    className="size-1 rounded-full bg-cyan/80"
                  />
                  {item}
                </li>
              ))}
            </ul>

            {/*
              Shown at every width. It used to be `hidden … sm:flex`, so the one
              affordance that tells a phone user the page continues was the one
              thing missing on phones.
            */}
            <p
              aria-hidden="true"
              className="flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.24em] text-white/55"
            >
              Scroll
              <ArrowDown className="size-3.5 animate-scroll-nudge" />
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
