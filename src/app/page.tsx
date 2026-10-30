import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/home/hero";
import { Manifesto } from "@/components/home/manifesto";
import { Signature } from "@/components/home/signature";
import { CapabilityLedger, LedgerFootnote } from "@/components/home/capability-ledger";
import { ProcessTimeline } from "@/components/home/process-timeline";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { CtaBand } from "@/components/site/cta-band";
import { SiteFooter } from "@/components/site/footer";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { principles } from "@/lib/content";
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
      <ScrollProgress />

      <main id="main" className="flex-1">
        <Hero />

        <Manifesto />

        <Signature />

        <section
          id="capabilities"
          aria-labelledby="capabilities-heading"
          className="border-t border-white/[0.06] py-20 sm:py-24"
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

            <div className="mt-12">
              <CapabilityLedger />
              <LedgerFootnote />
            </div>
          </Container>
        </section>

        <section
          id="approach"
          aria-labelledby="approach-heading"
          className="border-t border-white/[0.06] py-20 sm:py-24"
        >
          <Container>
            <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
              <Reveal>
                <div className="lg:sticky lg:top-28">
                  <SectionHeading
                    eyebrow="The approach"
                    title={
                      <span id="approach-heading">Principles, not preferences.</span>
                    }
                    description="These are the rules the work is measured against. They are deliberately short, because a principle that needs a paragraph to justify itself usually is not one."
                  />
                </div>
              </Reveal>

              <dl className="border-t border-white/10">
                {principles.map((principle, index) => (
                  <Reveal key={principle.title} delay={Math.min(index * 0.05, 0.2)}>
                    <div className="grid gap-2 border-b border-white/10 py-7 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] sm:gap-8">
                      <dt className="font-display text-base font-semibold text-ink">
                        {principle.title}
                      </dt>
                      <dd className="text-sm leading-relaxed text-white/60">
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
          className="border-t border-white/[0.06] py-20 sm:py-24"
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

            <ProcessTimeline />
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
