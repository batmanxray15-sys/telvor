import { ArrowLeft } from "lucide-react";
import { SiteFooter } from "@/components/site/footer";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { primaryNav } from "@/lib/site";

// Next.js already emits `noindex` for unmatched routes; declaring it here as
// well would publish two conflicting robots meta tags.
export const metadata = {
  title: "Page not found",
  description: "The page you were looking for does not exist on the TELVOR site.",
};

export default function NotFound() {
  return (
    <>
      <main id="main" className="flex-1">
        <Container className="flex flex-col items-start py-20 sm:py-28">
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.28em] text-cyan/90">
            404
          </p>
          <h1 className="mt-4 text-balance text-[clamp(2rem,6vw,3.25rem)] font-semibold leading-[1.05]">
            This page does not exist.
          </h1>
          <p className="mt-4 max-w-lg text-[1rem] leading-relaxed text-white/60">
            The link may be outdated or mistyped. Everything TELVOR publishes is
            reachable from the homepage.
          </p>

          <div className="mt-8">
            <ButtonLink href="/" size="lg">
              <ArrowLeft aria-hidden="true" className="size-4" />
              Back to the homepage
            </ButtonLink>
          </div>

          <nav aria-label="Site sections" className="mt-12 w-full border-t border-white/10 pt-8">
            <h2 className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-white/55">
              Main sections
            </h2>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-white/70 underline decoration-white/20 underline-offset-4 transition-colors duration-200 hover:text-ink hover:decoration-cyan"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </main>

      <SiteFooter
        contextTitle="Site sections"
        contextLinks={primaryNav}
        note="If you followed a link from within this site, it needs updating."
      />
    </>
  );
}
