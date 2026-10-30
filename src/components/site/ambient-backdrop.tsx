import { cn } from "@/lib/utils";

/**
 * Decorative page backdrop: a masked engineering grid plus the brand lighting.
 *
 * Lighting is three stacked radial glows rather than many small ones: fewer
 * large layers composite better than a crowd of blurred elements, and each stays
 * under a 130px blur so nothing turns into a full-viewport filter cost.
 *
 * The electric-blue wash drifts on a slow CSS keyframe (transform only, so it
 * stays on the compositor). That gives the hero *sustained* motion after the
 * entrance has finished — the previous version went completely still about a
 * second after load, which reads as a static page on a large desktop canvas.
 * The global `prefers-reduced-motion` rule in globals.css collapses the
 * animation duration, so this stays static for anyone who asked for that.
 */
export function AmbientBackdrop({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className,
      )}
    >
      <div
        className="absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, #000 25%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, #000 25%, transparent 78%)",
        }}
      />

      {/* Electric-blue key light — the dominant wash, slow drift. */}
      <div className="absolute -left-32 -top-40 size-[30rem] rounded-full bg-electric/20 blur-[130px] sm:size-[40rem] animate-ambient-drift" />

      {/* Cyan fill from the right, counter-phase so the two never pulse together. */}
      <div className="absolute -right-24 top-6 size-[22rem] rounded-full bg-cyan/12 blur-[120px] sm:size-[32rem] animate-ambient-drift [animation-delay:-13s]" />

      {/* Deep blue floor glow behind the headline block for separation from black. */}
      <div className="absolute left-1/2 top-1/3 size-[26rem] -translate-x-1/2 rounded-full bg-electric/10 blur-[120px] sm:size-[38rem]" />
    </div>
  );
}
