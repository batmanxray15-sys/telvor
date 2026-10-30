import { ArrowUpRight } from "lucide-react";
import { CapabilityGlyph } from "@/components/site/capability-glyph";
import { Reveal } from "@/components/ui/reveal";
import { capabilities } from "@/lib/content";

/**
 * Editorial capability ledger.
 *
 * Deliberately not a card grid: on the homepage six identical tiles produced
 * six identical reveals, which is the "repetitive cards / identical animation
 * patterns" failure the brief calls out. Rows give the copy room, create a
 * scannable vertical rhythm, and let each capability carry its deliverables as
 * inline meta instead of a second nested list.
 */
export function CapabilityLedger() {
  return (
    <ol className="border-t border-white/10">
      {capabilities.map((capability, index) => (
        <li key={capability.slug} className="group border-b border-white/10">
          <Reveal delay={Math.min(index * 0.05, 0.25)}>
            <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-4 gap-y-3 py-7 sm:gap-x-6 sm:py-9 lg:grid-cols-[3.5rem_minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-x-10">
              <span className="pt-1 font-display text-xs font-semibold tabular-nums tracking-[0.2em] text-cyan/70 lg:text-sm">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="min-w-0">
                <h3 className="flex items-center gap-3 text-lg font-semibold text-ink transition-colors duration-300 group-hover:text-ink sm:text-xl">
                  <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-cyan transition-colors duration-300 group-hover:border-cyan/30">
                    <CapabilityGlyph icon={capability.icon} className="size-4" />
                  </span>
                  {capability.title}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-white/60">
                  {capability.summary}
                </p>
              </div>

              <div className="col-span-2 min-w-0 lg:col-span-1 lg:pt-1">
                <ul className="flex flex-wrap gap-2">
                  {capability.deliverables.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/55 transition-colors duration-300 group-hover:border-white/20 group-hover:text-white/70"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}

/** Section header used above the ledger, kept here to keep page.tsx readable. */
export function LedgerFootnote() {
  return (
    <p className="mt-8 flex items-center gap-2 text-sm text-white/55">
      <ArrowUpRight aria-hidden="true" className="size-4 text-cyan" />
      Every capability is part of the standard build — none are add-ons.
    </p>
  );
}
