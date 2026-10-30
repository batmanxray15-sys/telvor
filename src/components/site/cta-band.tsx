import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { TrailCard } from "@/components/ui/trail-card";

/** Closing call to action shared by every page, so the journey always has a next step. */
export function CtaBand({
  title,
  description,
  primaryHref = "/contact",
  primaryLabel = "Start a project",
  secondaryHref = "/services",
  secondaryLabel = "Explore services",
}: {
  title: string;
  description: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <section aria-labelledby="cta-heading" className="pb-20 sm:pb-24">
      <Container>
        <Reveal>
          <TrailCard className="overflow-hidden">
            <div className="relative isolate flex flex-col gap-8 p-7 sm:p-10 lg:flex-row lg:items-center lg:justify-between lg:p-12">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 bg-brand-veil opacity-80"
              />
              <div className="max-w-xl">
                <h2
                  id="cta-heading"
                  className="text-balance text-[clamp(1.6rem,4vw,2.35rem)] font-semibold leading-[1.15]"
                >
                  {title}
                </h2>
                <p className="mt-3 text-[0.98rem] leading-relaxed text-white/62 sm:text-base">
                  {description}
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <ButtonLink href={primaryHref} size="lg">
                  {primaryLabel}
                  <ArrowRight aria-hidden="true" className="size-4" />
                </ButtonLink>
                <ButtonLink href={secondaryHref} variant="secondary" size="lg">
                  {secondaryLabel}
                </ButtonLink>
              </div>
            </div>
          </TrailCard>
        </Reveal>
      </Container>
    </section>
  );
}
