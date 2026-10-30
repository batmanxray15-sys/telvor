import {
  Accessibility,
  Code2,
  Gauge,
  Layers3,
  Search,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { TiltCard } from "@/components/ui/tilt-card";
import { SurfaceCard } from "@/components/ui/surface-card";
import { Reveal } from "@/components/ui/reveal";
import { capabilities, type CapabilityIcon } from "@/lib/content";

const icons: Record<CapabilityIcon, LucideIcon> = {
  code: Code2,
  layers: Layers3,
  gauge: Gauge,
  accessibility: Accessibility,
  search: Search,
  shield: ShieldCheck,
};

/**
 * Capability grid shared by Home and Services. `detailed` adds the deliverable
 * list; both variants come from the same content source.
 */
export function CapabilityGrid({ detailed = false }: { detailed?: boolean }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {capabilities.map((capability, index) => {
        const Icon = icons[capability.icon];

        return (
          <li key={capability.slug} className="h-full min-w-0" id={detailed ? capability.slug : undefined}>
            <Reveal delay={index * 0.05} className="h-full">
              <TiltCard rotationFactor={4} className="h-full">
                <SurfaceCard className="flex h-full flex-col">
                  <span className="inline-flex size-11 items-center justify-center rounded-xl border border-white/10 bg-electric/10 text-cyan transition-colors duration-300 group-hover:border-cyan/30">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>

                  <h3 className="mt-5 text-[1.0625rem] font-semibold leading-snug text-ink">
                    {capability.title}
                  </h3>

                  <p className="mt-2.5 text-sm leading-relaxed text-white/60">
                    {capability.summary}
                  </p>

                  {detailed && (
                    <ul className="mt-5 space-y-2.5 border-t border-white/[0.07] pt-5">
                      {capability.deliverables.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-[0.8125rem] leading-relaxed text-white/55"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-[0.45rem] size-1 shrink-0 rounded-full bg-cyan/70"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </SurfaceCard>
              </TiltCard>
            </Reveal>
          </li>
        );
      })}
    </ul>
  );
}
