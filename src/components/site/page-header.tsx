import type { ReactNode } from "react";
import { AmbientBackdrop } from "@/components/site/ambient-backdrop";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";

/** Shared masthead for inner pages: consistent rhythm, one h1 per page. */
export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-white/[0.06]">
      <AmbientBackdrop />
      <Container className="pb-12 pt-14 sm:pb-16 sm:pt-20">
        <Reveal className="max-w-3xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-5 text-balance text-[clamp(2rem,6vw,3.5rem)] font-semibold leading-[1.06] tracking-[-0.03em]">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-[1rem] leading-relaxed text-white/65 sm:text-lg">
            {description}
          </p>
          {children && <div className="mt-8">{children}</div>}
        </Reveal>
      </Container>
    </section>
  );
}
