import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  align = "left",
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <Eyebrow className={align === "center" ? "justify-center" : undefined}>
        {eyebrow}
      </Eyebrow>
      <h2 className="mt-4 text-balance text-[clamp(1.65rem,4.2vw,2.5rem)] font-semibold leading-[1.15]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-[0.98rem] leading-relaxed text-white/62 sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}
