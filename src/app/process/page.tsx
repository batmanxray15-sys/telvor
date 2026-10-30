import { CtaBand } from "@/components/site/cta-band";
import { SiteFooter } from "@/components/site/footer";
import { PageHeader } from "@/components/site/page-header";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { processSteps } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

const expectations = [
  {
    title: "What TELVOR brings",
    items: [
      "A written scope before work starts",
      "Progress at each stage, not radio silence",
      "Accessibility and performance checks as part of delivery",
    ],
  },
  {
    title: "What helps from you",
    items: [
      "The goal the site has to serve",
      "Access to real content and brand material",
      "One decision-maker for sign-off",
    ],
  },
];

export const metadata = pageMetadata({
  title: "Process",
  description:
    "How TELVOR works: discover the purpose, design the structure, build in Next.js and TypeScript, then ship and refine — with accessibility and performance verified before launch.",
  path: "/process",
});

export default function ProcessPage() {
  return (
    <>
      <main id="main" className="flex-1">
        <PageHeader
          eyebrow="Process"
          title="Four stages, no mystery."
          description="A project should never feel like a black box. Each stage has a defined output, and nothing moves forward on assumptions."
        />

        <section aria-labelledby="stages-heading" className="py-14 sm:py-16">
          <Container>
            <h2 id="stages-heading" className="sr-only">
              Project stages
            </h2>

            <ol className="space-y-4">
              {processSteps.map((step, index) => (
                <li key={step.id} id={step.id} className="min-w-0">
                  <Reveal delay={index * 0.04}>
                    <div className="grid gap-5 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-7 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-10">
                      <div className="min-w-0">
                        <span className="font-display text-xs font-semibold tracking-[0.22em] text-cyan/80">
                          Stage {step.label}
                        </span>
                        <h3 className="mt-2 text-xl font-semibold text-ink sm:text-2xl">
                          {step.title}
                        </h3>
                      </div>

                      <div className="min-w-0">
                        <p className="text-sm leading-relaxed text-white/65 sm:text-base">
                          {step.description}
                        </p>
                        <ul className="mt-4 flex flex-wrap gap-2">
                          {step.details.map((detail) => (
                            <li
                              key={detail}
                              className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/60"
                            >
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </Container>
        </section>

        <section
          aria-labelledby="expectations-heading"
          className="border-t border-white/[0.06] py-14 sm:py-16"
        >
          <Container>
            <Reveal>
              <SectionHeading
                eyebrow="Working together"
                title={<span id="expectations-heading">What each side needs to bring</span>}
                description="Clarity in both directions is the difference between a project that lands and one that drifts."
              />
            </Reveal>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {expectations.map((group, index) => (
                <Reveal key={group.title} delay={index * 0.06}>
                  <div className="h-full rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                    <h3 className="text-base font-semibold text-ink">{group.title}</h3>
                    <ul className="mt-4 space-y-2.5">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-sm leading-relaxed text-white/60"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-1.5 size-1 shrink-0 rounded-full bg-cyan/70"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>

            <p className="mt-8 max-w-2xl text-sm leading-relaxed text-white/55">
              Timelines and cost depend on scope and are agreed in writing before
              any work begins. No fixed durations are published here, because they
              would be a guess rather than a commitment.
            </p>
          </Container>
        </section>

        <CtaBand
          title="Ready to start at stage one?"
          description="Send the goal and the constraints. The first conversation is about whether the project makes sense — not a pitch deck."
          secondaryHref="/about"
          secondaryLabel="About TELVOR"
        />
      </main>

      <SiteFooter
        contextTitle="Stages on this page"
        contextLinks={[
          { href: "#discover", label: "01 · Discover" },
          { href: "#design", label: "02 · Design" },
          { href: "#build", label: "03 · Build" },
          { href: "#ship", label: "04 · Ship & refine" },
        ]}
      />
    </>
  );
}
