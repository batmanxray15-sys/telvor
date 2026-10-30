import { ArrowRight, Check } from "lucide-react";
import { AmbientBackdrop } from "@/components/site/ambient-backdrop";
import { HeroTitle } from "@/components/home/hero-title";
import { Spotlight } from "@/components/motion/spotlight";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { TrailCard } from "@/components/ui/trail-card";

const buildStandard = [
  { label: "Framework", value: "Next.js · React · TypeScript" },
  { label: "Styling", value: "Tailwind CSS design tokens" },
  { label: "Motion", value: "Motion for React, reduced-motion aware" },
  { label: "Delivery", value: "Vercel, per-page metadata" },
];

const assurances = ["Accessible by default", "Self-hosted fonts", "No layout shift"];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <AmbientBackdrop />

      <Container className="pb-16 pt-14 sm:pb-20 sm:pt-20 lg:pb-24 lg:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <div className="min-w-0">
            <Reveal>
              <Eyebrow>{`${"TELVOR"} — web development`}</Eyebrow>
            </Reveal>

            <div className="mt-6" data-reveal="">
              <HeroTitle />
            </div>

            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-[1rem] leading-relaxed text-white/65 sm:text-lg">
                TELVOR designs and engineers websites and web applications where
                every decision serves a purpose. Premium execution, no filler —
                fast, accessible, and built to last.
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <ButtonLink href="/contact" size="lg">
                  Start a project
                  <ArrowRight aria-hidden="true" className="size-4" />
                </ButtonLink>
                <ButtonLink href="/services" variant="secondary" size="lg">
                  Explore services
                </ButtonLink>
              </div>
            </Reveal>

            <Reveal delay={0.22}>
              <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
                {assurances.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-white/55"
                  >
                    <Check aria-hidden="true" className="size-4 text-cyan" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.14} className="min-w-0">
            <TrailCard className="overflow-hidden">
              <div className="relative isolate overflow-hidden rounded-[inherit] bg-surface/40 p-6 sm:p-7">
                <Spotlight
                  size={300}
                  className="from-electric/35 via-cyan/12 to-transparent"
                />

                <div className="relative">
                  <p className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-white/55">
                    Build standard
                  </p>

                  <dl className="mt-5 divide-y divide-white/[0.07]">
                    {buildStandard.map((row) => (
                      <div
                        key={row.label}
                        className="flex flex-col gap-1 py-3 first:pt-0 last:pb-0"
                      >
                        <dt className="text-[0.7rem] uppercase tracking-[0.16em] text-white/55">
                          {row.label}
                        </dt>
                        <dd className="text-sm leading-snug text-white/80">
                          {row.value}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <p className="mt-6 rounded-xl border border-white/10 bg-obsidian/60 p-4 text-sm leading-relaxed text-white/60">
                    <span className="block font-display text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-cyan/85">
                      Non-negotiable
                    </span>
                    <span className="mt-2 block">
                      Accessibility and performance are verified before launch,
                      not audited afterwards.
                    </span>
                  </p>
                </div>
              </div>
            </TrailCard>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
