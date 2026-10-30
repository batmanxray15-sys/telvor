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
 * Cinematic hero: one composition, one entrance, then stillness.
 *
 * The build-standard panel that used to live here moved to the Signature
 * section, which gives the hero a single focal point — a statement of scale
 * rather than a statement plus a widget competing for attention. Only the
 * backdrop drifts; the type never parallaxes.
 */
export function Hero() {
  return (
    <section className="relative isolate flex min-h-[calc(100svh-4rem)] flex-col justify-center overflow-hidden">
      <Parallax distance={18} className="pointer-events-none absolute inset-0 -z-10">
        <AmbientBackdrop />
      </Parallax>

      <Container className="py-16 sm:py-20 lg:py-24">
        <Reveal>
          <Eyebrow>TELVOR — web development</Eyebrow>
        </Reveal>

        <div className="mt-7 max-w-5xl" data-reveal="">
          <HeroTitle />
        </div>

        <Reveal delay={0.12}>
          <p className="mt-7 max-w-xl text-[1rem] leading-relaxed text-white/65 sm:text-lg">
            TELVOR designs and engineers websites and web applications where
            every decision serves a purpose. Premium execution, no filler —
            fast, accessible, and built to last.
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href="/contact" size="lg">
              Start a project
              <ArrowRight aria-hidden="true" className="size-4" />
            </ButtonLink>
            <ButtonLink href="/services" variant="secondary" size="lg">
              Explore services
            </ButtonLink>
          </div>
        </Reveal>
      </Container>

      <Container className="pb-10 sm:pb-12">
        <Reveal delay={0.24}>
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

            <p
              aria-hidden="true"
              className="hidden items-center gap-2 text-[0.68rem] uppercase tracking-[0.24em] text-white/55 sm:flex"
            >
              Scroll
              <ArrowDown className="size-3.5" />
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
