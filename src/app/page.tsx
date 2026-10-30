import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/home/hero";
import { CapabilityGrid } from "@/components/site/capability-grid";
import { CtaBand } from "@/components/site/cta-band";
import { SiteFooter } from "@/components/site/footer";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { processSteps, principles } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: `${site.name} — ${site.tagline}`,
  absoluteTitle: true,
  description: site.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <main id="main" className="flex-1">
        <Hero />

        <section
          id="capabilities"
          aria-labelledby="capabilities-heading"
          className="border-t border-white/[0.06] py-16 sm:py-20"
        >
          <Container>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading
                eyebrow="Capabilities"
                title={
                  <span id="capabilities-heading">
                    Everything on the page has a job to do.
                  </span>
                }
                description="Six disciplines, applied together. Each one is a constraint the others have to respect — which is why the result holds up long after launch."
              />
              <ButtonLink
                href="/services"
                variant="secondary"
                className="shrink-0 self-start sm:self-auto"
              >
                All services
                <ArrowRight aria-hidden="true" className="size-4" />
              </ButtonLink>
            </div>

            <div className="mt-10">
              <CapabilityGrid />
            </div>
          </Container>
        </section>

        <section
          id="approach"
          aria-labelledby="approach-heading"
          className="border-t border-white/[0.06] py-16 sm:py-20"
        >
          <Container>
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
              <Reveal>
                <SectionHeading
                  eyebrow="The approach"
                  title={<span id="approach-heading">Principles, not preferences.</span>}
                  description="These are the rules the work is measured against. They are deliberately short, because a principle that needs a paragraph to justify itself usually is not one."
                />
              </Reveal>

              <dl className="grid gap-4 sm:grid-cols-2">
                {principles.map((principle, index) => (
                  <Reveal key={principle.title} delay={index * 0.06}>
                    <div className="h-full min-w-0 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                      <dt className="font-display text-base font-semibold text-ink">
                        {principle.title}
                      </dt>
                      <dd className="mt-2 text-sm leading-relaxed text-white/60">
                        {principle.description}
                      </dd>
                    </div>
                  </Reveal>
                ))}
              </dl>
            </div>
          </Container>
        </section>

        <section
          id="process"
          aria-labelledby="process-heading"
          className="border-t border-white/[0.06] py-16 sm:py-20"
        >
          <Container>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading
                eyebrow="Process"
                title={<span id="process-heading">Four stages, no mystery.</span>}
                description="A clear sequence from brief to launch, so you always know what is happening and what comes next."
              />
              <ButtonLink
                href="/process"
                variant="secondary"
                className="shrink-0 self-start sm:self-auto"
              >
                See the process
                <ArrowRight aria-hidden="true" className="size-4" />
              </ButtonLink>
            </div>

            <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {processSteps.map((step, index) => (
                <li key={step.id} className="min-w-0">
                  <Reveal delay={index * 0.06} className="h-full">
                    <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                      <span className="font-display text-xs font-semibold tracking-[0.2em] text-cyan/80">
                        {step.label}
                      </span>
                      <h3 className="mt-2 text-base font-semibold text-ink">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/58">
                        {step.description}
                      </p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </Container>
        </section>

        <CtaBand
          title="Have a project with a purpose?"
          description="Tell us what it needs to achieve. If TELVOR is the right fit, the next step is a short conversation about scope — not a sales pitch."
        />
      </main>

      <SiteFooter
        contextTitle="On this page"
        contextLinks={[
          { href: "#capabilities", label: "Capabilities" },
          { href: "#approach", label: "The approach" },
          { href: "#process", label: "Process" },
        ]}
      />
    </>
  );
}
