import { cn } from "@/lib/utils";

/**
 * A single restrained brand glow for section backgrounds.
 *
 * Deliberately CSS-only: no client component, no JS, no blurred *element* to
 * composite. A radial-gradient on one absolutely-positioned layer is far cheaper
 * than the stack of blur-[120px] divs it replaces in spirit, and it can never
 * receive a pointer event or a focus ring.
 *
 * Kept to very low opacity (<= 0.10) so it reads as atmosphere behind the copy
 * rather than as a lit surface competing with it. Used on a couple of sections
 * only — applying it everywhere would flatten the rhythm the page already has.
 */
export function SectionGlow({
  /** Which corner the light comes from. */
  from = "top",
  tone = "electric",
  className,
}: {
  from?: "top" | "left" | "right" | "center";
  tone?: "electric" | "cyan";
  className?: string;
}) {
  const position = {
    top: "at 50% 0%",
    left: "at 0% 50%",
    right: "at 100% 50%",
    center: "at 50% 50%",
  }[from];

  const colour =
    tone === "electric" ? "rgba(23,105,255,0.10)" : "rgba(0,212,255,0.09)";

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 -z-10",
        className,
      )}
      style={{
        backgroundImage: `radial-gradient(ellipse 70% 55% ${position}, ${colour}, transparent 72%)`,
      }}
    />
  );
}
