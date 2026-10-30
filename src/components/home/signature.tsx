import { Spotlight } from "@/components/motion/spotlight";
import { Parallax } from "@/components/motion/parallax";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";

const buildStandard = [
  { label: "Framework", value: "Next.js · React · TypeScript" },
  { label: "Styling", value: "Tailwind CSS design tokens" },
  { label: "Motion", value: "Motion for React, reduced-motion aware" },
  { label: "Delivery", value: "Vercel, per-page metadata" },
];

/**
 * The signature moment: a layered, statement-sized panel that drifts against a
 * ghost numeral and a technical grid.
 *
 * Three planes at different parallax speeds sell the depth illusion (skill data:
 * background slowest, foreground fastest, delta kept small). No pinning — a
 * pinned section needs deterministic height and risks hijacking scroll, both of
 * which the brief and the skill's anti-patterns warn against. Everything is
 * clipped by this section so parallax can never widen the page.
 */
export function Signature() {
  return (
    <section
      aria-labelledby="signature-heading"
      className="relative isolate overflow-hidden border-t border-white/[0.06] py-20 sm:py-28"
    >
      {/* Plane 1 — technical grid, slowest */}
      <Parallax distance={16} className="pointer-events-none absolute inset-0 -z-10">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage:
              "radial-gradient(ellipse 65% 55% at 50% 45%, #000 20%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 65% 55% at 50% 45%, #000 20%, transparent 75%)",
          }}
        />
      </Parallax>

      {/* Plane 2 — ghost numeral, mid speed */}
      <Parallax
        distance={34}
        className="pointer-events-none absolute inset-x-0 top-6 -z-10 select-none"
      >
        <p
          aria-hidden="true"
          className="text-center font-display text-[clamp(9rem,26vw,20rem)] font-bold leading-none tracking-[-0.06em] text-white/[0.028]"
        >
          T
        </p>
      </Parallax>

      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-16">
          <Reveal>
            <div>
              <Eyebrow>Signature</Eyebrow>
              <h2
                id="signature-heading"
                className="mt-5 text-balance font-display text-[clamp(1.9rem,5vw,3.1rem)] font-semibold leading-[1.08] tracking-[-0.035em]"
              >
                The build standard is the argument.
              </h2>
              <p className="mt-5 max-w-md text-[0.98rem] leading-relaxed text-white/65 sm:text-base">
                Choices that are easy to make at the start and expensive to
                change later — so they are made deliberately, once.
              </p>

              <p className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-cyan/25 bg-cyan/[0.06] px-4 py-2 text-xs font-medium text-white/75">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-cyan" />
                Verified before launch, not audited afterwards
              </p>
            </div>
          </Reveal>

          {/* Plane 3 — the panel, fastest */}
          <Reveal delay={0.1}>
            <Parallax distance={-18}>
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-surface/50">
                <Spotlight
                  size={320}
                  className="from-electric/30 via-cyan/10 to-transparent"
                />

                <div className="relative p-6 sm:p-8">
                  <p className="font-display text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-cyan/80">
                    Build standard
                  </p>

                  <dl className="mt-6 divide-y divide-white/[0.07]">
                    {buildStandard.map((row) => (
                      <div
                        key={row.label}
                        className="flex flex-col gap-1 py-3.5 first:pt-0 last:pb-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                      >
                        <dt className="text-[0.68rem] uppercase tracking-[0.16em] text-white/55">
                          {row.label}
                        </dt>
                        <dd className="text-sm leading-snug text-white/80 sm:text-right">
                          {row.value}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <p className="mt-6 border-t border-white/[0.07] pt-5 text-sm leading-relaxed text-white/60">
                    Accessibility and performance are acceptance criteria here,
                    not polish applied at the end.
                  </p>
                </div>
              </div>
            </Parallax>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
