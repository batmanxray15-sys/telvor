import { CircleAlert } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";
import { SiteFooter } from "@/components/site/footer";
import { PageHeader } from "@/components/site/page-header";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { contactChannels } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Start a conversation with TELVOR about your project. Direct contact channels are being configured — the form prepares a message you can send yourself.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <main id="main" className="flex-1">
        <PageHeader
          eyebrow="Contact"
          title="Start a conversation."
          description="Describe what you need built and what it has to achieve. Enough detail to make the first reply useful — a few sentences is plenty."
        />

        <section aria-labelledby="contact-heading" className="py-14 sm:py-16">
          <Container>
            <h2 id="contact-heading" className="sr-only">
              Contact TELVOR
            </h2>

            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-12">
              <div className="min-w-0">
                <Reveal>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">
                    <h3 className="text-base font-semibold text-ink">
                      Direct channels
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/55">
                      Automatic delivery is not configured, and no contact details
                      have been published yet. Nothing below is a working address.
                    </p>

                    <dl className="mt-5 space-y-4">
                      {contactChannels.map((channel) => (
                        <div key={channel.label}>
                          <dt className="text-[0.7rem] uppercase tracking-[0.18em] text-white/55">
                            {channel.label}
                          </dt>
                          <dd className="mt-1 text-sm">
                            {channel.href && channel.value ? (
                              <a
                                href={channel.href}
                                className="text-cyan hover:underline"
                              >
                                {channel.value}
                              </a>
                            ) : (
                              <span className="inline-flex items-start gap-2 text-white/50">
                                <CircleAlert
                                  aria-hidden="true"
                                  className="mt-0.5 size-4 shrink-0 text-cyan/70"
                                />
                                {channel.note}
                              </span>
                            )}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </Reveal>

                <Reveal delay={0.08}>
                  <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">
                    <h3 className="text-base font-semibold text-ink">
                      What to include
                    </h3>
                    <ul className="mt-3 space-y-2.5">
                      {[
                        "What the site or application has to achieve",
                        "Who it is for, and what they need to do",
                        "Any deadline or constraint already fixed",
                      ].map((item) => (
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
              </div>

              <Reveal delay={0.12} className="min-w-0">
                <ContactForm />
              </Reveal>
            </div>
          </Container>
        </section>
      </main>

      <SiteFooter
        contextTitle="Contact status"
        contextLinks={[
          { href: "/services", label: "What TELVOR builds" },
          { href: "/process", label: "How the work runs" },
          { href: "/about", label: "About TELVOR" },
        ]}
        note="No business email or phone number is published yet, and this form has no delivery backend. Both will appear here once configured."
      />
    </>
  );
}
