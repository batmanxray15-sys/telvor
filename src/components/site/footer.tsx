import Link from "next/link";
import { Logo } from "@/components/site/logo";
import { CurrentYear } from "@/components/site/current-year";
import { Container } from "@/components/ui/container";
import { primaryNav, site } from "@/lib/site";

export type FooterLink = { href: string; label: string };

type SiteFooterProps = {
  /** Page-specific link group. Keeps each footer relevant to the page it closes. */
  contextTitle: string;
  contextLinks: FooterLink[];
  /** Optional page-specific status line (used on the contact page). */
  note?: string;
};

export function SiteFooter({ contextTitle, contextLinks, note }: SiteFooterProps) {
  return (
    <footer className="mt-auto border-t border-white/10 bg-obsidian-soft">
      <Container className="py-12 sm:py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-12">
          <div className="max-w-sm">
            <Link
              href="/"
              aria-label="TELVOR — go to the homepage"
              className="inline-flex rounded-lg py-1 transition-opacity duration-200 hover:opacity-85"
            >
              <Logo variant="footer" />
            </Link>
            <p className="mt-4 font-display text-lg font-medium text-ink">
              {site.tagline}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-white/55">
              {site.shortDescription}
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-white/55">
              Explore
            </h2>
            <ul className="mt-4 space-y-3">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/70 transition-colors duration-200 hover:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-white/55">
              {contextTitle}
            </h2>
            <ul className="mt-4 space-y-3">
              {contextLinks.map((item) => (
                <li key={`${item.href}-${item.label}`}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/70 transition-colors duration-200 hover:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            {note && (
              <p className="mt-5 max-w-xs text-xs leading-relaxed text-white/55">
                {note}
              </p>
            )}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CurrentYear /> {site.name}. {site.tagline}
          </p>
          <p className="text-white/55">
            Designed and engineered in-house.
          </p>
        </div>
      </Container>
    </footer>
  );
}
