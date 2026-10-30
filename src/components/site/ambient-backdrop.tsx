import { cn } from "@/lib/utils";

/**
 * Decorative page backdrop: a masked engineering grid plus two brand glows.
 * Purely presentational, never receives focus, and is clipped by its own
 * container so it can never widen the page.
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
      <div className="absolute -left-24 -top-32 size-[26rem] rounded-full bg-electric/12 blur-[110px] sm:size-[34rem]" />
      <div className="absolute -right-20 top-10 size-[20rem] rounded-full bg-cyan/10 blur-[100px] sm:size-[28rem]" />
    </div>
  );
}
