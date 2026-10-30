import { CtaBand } from "@/components/site/cta-band";
import { SiteFooter } from "@/components/site/footer";
import { PageHeader } from "@/components/site/page-header";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { principles } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

const notPublished = [
  "Client case studies and results",
  "Testimonials or references",
  "A published phone number or business email",
];

export const metadata = pageMetadata({
  title: "About",
  description:
    "TELVOR is a web development brand built around a single idea: every decision should serve a purpose. Learn the principles behind the work and what is still to be published.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <main id="main" className="flex-1">
        <PageHeader
          eyebrow="About"
          title="A brand built around purpose."
          description={`${site.name} exists to make the case that restraint and precision are more valuable than novelty. The tagline is not decoration — it is the brief.`}
        />

        <section aria-labelledby="story-heading" className="py-14 sm:py-16">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
              <Reveal>
                <SectionHeading
                  eyebrow="The idea"
                  title={<span id="story-heading">&ldquo;Built to Purpose.&rdquo;</span>}
                />
              </Reveal>

              <Reveal delay={0.08}>
                <div className="max-w-2xl space-y-4 text-[0.98rem] leading-relaxed text-white/65 sm:text-base">
                  <p>
                    Most websites fail quietly: they are slower than they look,
                    harder to use than they should be, and impossible to change
                    without a rewrite. None of that is inevitable. It is the
                    result of decisions made without a purpose attached to them.
                  </p>
                  <p>
                    {site.name} works the other way around. Each section, each
                    interaction, each line of type has a job — and if it cannot
                    explain that job, it does not ship. That constraint is what
                    makes the result feel considered rather than decorated.
                  </p>
                  <p>
                    The work is deliberately technical: Next.js and TypeScript for
                    structure, a design token system for consistency, and
                    accessibility and performance treated as requirements rather
                    than refinements.
                  </p>
                </div>
              </Reveal>
            </div>
          </Container>
        </section>

        <section
          aria-labelledby="principles-heading"
          className="border-t border-white/[0.06] py-14 sm:py-16"
        >
          <Container>
            <Reveal>
              <SectionHeading
                eyebrow="Principles"
                title={<span id="principles-heading">What the work is measured against</span>}
                description="Four commitments that apply to every project, regardless of size."
              />
            </Reveal>

            <dl className="mt-10 grid gap-4 sm:grid-cols-2">
              {principles.map((principle, index) => (
                <Reveal key={principle.title} delay={index * 0.05}>
                  <div className="h-full rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">
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
          </Container>
        </section>

        <section
          aria-labelledby="transparency-heading"
          className="border-t border-white/[0.06] py-14 sm:py-16"
        >
          <Container>
            <Reveal>
              <div className="max-w-3xl rounded-2xl border border-cyan/20 bg-cyan/[0.04] p-6 sm:p-7">
                <h2
                  id="transparency-heading"
                  className="text-lg font-semibold text-ink sm:text-xl"
                >
                  What is not published yet
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-white/65">
                  To keep this site honest, nothing here is invented. The
                  following are still to be supplied, and will only appear once
                  they are real:
                </p>
                <ul className="mt-4 space-y-2">
                  {notPublished.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-white/60"
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
          </Container>
        </section>

        <CtaBand
          title="Does this sound like the right way to build?"
          description="If so, the next step is a short conversation about what you need — and an honest answer about whether TELVOR is the right fit."
          secondaryHref="/process"
          secondaryLabel="How the work runs"
        />
      </main>

      <SiteFooter
        contextTitle="About this site"
        contextLinks={[
          { href: "#story-heading", label: "The idea" },
          { href: "#principles-heading", label: "Principles" },
          { href: "#transparency-heading", label: "What is not published" },
        ]}
      />
    </>
  );
}
