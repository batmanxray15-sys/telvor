import { CapabilityGrid } from "@/components/site/capability-grid";
import { CtaBand } from "@/components/site/cta-band";
import { SiteFooter } from "@/components/site/footer";
import { PageHeader } from "@/components/site/page-header";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { pageMetadata } from "@/lib/seo";

const engagementNotes = [
  {
    title: "Scoped per project",
    description:
      "Every engagement is quoted individually against a written scope. No packages are published, because no two briefs are the same.",
  },
  {
    title: "Timeline agreed up front",
    description:
      "A schedule is confirmed before work begins, with clear checkpoints at each stage rather than a single delivery at the end.",
  },
  {
    title: "Handover included",
    description:
      "Code, design tokens and documentation are handed over so the site can be maintained or extended without dependency.",
  },
];

export const metadata = pageMetadata({
  title: "Services",
  description:
    "The disciplines TELVOR applies to every build: web engineering in Next.js and TypeScript, interface design, performance, accessibility, technical SEO and maintenance.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <main id="main" className="flex-1">
        <PageHeader
          eyebrow="Services"
          title="Capability, applied to a purpose."
          description="TELVOR builds and maintains websites and web applications. These are the disciplines that shape the work — used together, not sold separately."
        />

        <section aria-labelledby="disciplines-heading" className="py-14 sm:py-16">
          <Container>
            <Reveal>
              <SectionHeading
                eyebrow="Disciplines"
                title={<span id="disciplines-heading">What the work covers</span>}
                description="Each capability below is part of the standard build process, not an optional extra."
              />
            </Reveal>

            <div className="mt-10">
              <CapabilityGrid detailed />
            </div>
          </Container>
        </section>

        <section
          aria-labelledby="engagements-heading"
          className="border-t border-white/[0.06] py-14 sm:py-16"
        >
          <Container>
            <Reveal>
              <SectionHeading
                eyebrow="Engagements"
                title={<span id="engagements-heading">How working together is structured</span>}
                description="Deliberately simple: agree the scope, build against it, hand it over properly."
              />
            </Reveal>

            <ul className="mt-10 grid gap-4 sm:grid-cols-3">
              {engagementNotes.map((note, index) => (
                <li key={note.title} className="min-w-0">
                  <Reveal delay={index * 0.06} className="h-full">
                    <div className="h-full rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                      <h3 className="text-base font-semibold text-ink">{note.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/60">
                        {note.description}
                      </p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        <CtaBand
          title="Not sure which of these you need?"
          description="That is usually the right starting point. Describe the problem and TELVOR will tell you what it actually takes — including whether it is a good fit."
        />
      </main>

      <SiteFooter
        contextTitle="Services on this page"
        contextLinks={[
          { href: "#engineering", label: "Web engineering" },
          { href: "#interface-design", label: "Interface design" },
          { href: "#performance", label: "Performance" },
          { href: "#accessibility", label: "Accessibility" },
        ]}
      />
    </>
  );
}
