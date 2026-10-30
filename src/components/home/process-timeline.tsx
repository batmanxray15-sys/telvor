import { TimelineRule } from "@/components/home/timeline-rule";
import { Reveal } from "@/components/ui/reveal";
import { processSteps } from "@/lib/content";

/**
 * Process as a numbered timeline drawn by the scroll position.
 *
 * Replaces four identical cards: a single continuous rule communicates sequence
 * (the actual meaning of a process) far better than parallel boxes, and the
 * scroll-linked draw gives the section its one moment of motion without any
 * per-frame React work.
 */
export function ProcessTimeline() {
  return (
    <ol className="relative mt-10 space-y-10 pl-6 sm:pl-8">
      <TimelineRule />

      {processSteps.map((step, index) => (
        <li key={step.id} id={step.id} className="relative min-w-0">
          <span
            aria-hidden="true"
            className="absolute -left-6 top-1.5 size-2 rounded-full bg-cyan ring-4 ring-obsidian sm:-left-8"
          />

          <Reveal delay={Math.min(index * 0.05, 0.2)}>
            <div className="grid gap-3 sm:grid-cols-[minmax(0,0.55fr)_minmax(0,1.45fr)] sm:gap-8">
              <div className="min-w-0">
                <p className="font-display text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-cyan/80">
                  Stage {step.label}
                </p>
                <h3 className="mt-1.5 text-lg font-semibold text-ink sm:text-xl">
                  {step.title}
                </h3>
              </div>

              <div className="min-w-0">
                <p className="text-sm leading-relaxed text-white/65">
                  {step.description}
                </p>
                <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
                  {step.details.map((detail) => (
                    <li
                      key={detail}
                      className="text-xs text-white/55 before:mr-2 before:text-cyan/80 before:content-['—']"
                    >
                      {detail}
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
