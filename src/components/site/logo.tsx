import { cn } from "@/lib/utils";

/**
 * TELVOR wordmark: a "T" monogram in a rounded prism, electric blue → cyan.
 *
 * `gradientId` must be unique per rendered instance — SVG gradient ids are
 * document-global, so header and footer pass different ids to keep the HTML valid.
 */
export function Logo({
  gradientId,
  className,
}: {
  gradientId: string;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 32 32"
        className="size-8 shrink-0"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id={gradientId}
            x1="4"
            y1="2"
            x2="28"
            y2="30"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#1769FF" />
            <stop offset="1" stopColor="#00D4FF" />
          </linearGradient>
        </defs>
        <rect
          x="1"
          y="1"
          width="30"
          height="30"
          rx="9"
          stroke={`url(#${gradientId})`}
          strokeOpacity="0.55"
          strokeWidth="1.5"
        />
        <path
          d="M9.5 10.75h13M16 10.75v11.5"
          stroke={`url(#${gradientId})`}
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>
      <span className="font-display text-[0.95rem] font-semibold uppercase leading-none tracking-[0.32em] text-ink">
        Telvor
      </span>
    </span>
  );
}
