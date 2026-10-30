import { LineReveal } from "@/components/ui/line-reveal";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";

/**
 * Immersive introduction — the page changes register here.
 *
 * The copy is the existing TELVOR positioning statement (previously only on
 * /about), reused rather than rewritten: no new business claims. Spacing is
 * deliberately more open than the hero, which is what makes the scroll feel
 * like a chapter change rather than a continuation.
 */
export function Manifesto() {
  return (
    <section
      aria-labelledby="manifesto-heading"
      className="relative border-t border-white/[0.06] py-20 sm:py-28 lg:py-32"
    >
      <Container>
        <Reveal>
          <Eyebrow>Introduction</Eyebrow>
        </Reveal>

        <h2 id="manifesto-heading" className="sr-only">
          Why TELVOR builds the way it does
        </h2>

        <div className="mt-8 max-w-4xl">
          <LineReveal
            as="p"
            lines={[
              "Most websites fail quietly.",
              "Slower than they look.",
              "Harder to use than they should be.",
              "Impossible to change without a rewrite.",
            ]}
            className="font-display text-[clamp(1.6rem,4.6vw,2.9rem)] font-medium leading-[1.22] tracking-[-0.03em] text-white/85"
            stagger={0.1}
          />
        </div>

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <Reveal>
            <p className="text-gradient-brand font-display text-[clamp(1.35rem,3.4vw,2rem)] font-semibold leading-[1.25] tracking-[-0.02em]">
              None of that is inevitable. It is the result of decisions made
              without a purpose attached to them.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="space-y-4 border-l border-white/10 pl-5 text-[0.98rem] leading-relaxed text-white/65 sm:pl-6 sm:text-base">
              <p>
                TELVOR works the other way around. Each section, each
                interaction, each line of type has a job — and if it cannot
                explain that job, it does not ship.
              </p>
              <p className="text-white/55">
                That constraint is what makes the result feel considered rather
                than decorated.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
