import {
  Accessibility,
  Code2,
  Gauge,
  Layers3,
  Search,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import type { CapabilityIcon } from "@/lib/content";
import { cn } from "@/lib/utils";

const icons: Record<CapabilityIcon, LucideIcon> = {
  code: Code2,
  layers: Layers3,
  gauge: Gauge,
  accessibility: Accessibility,
  search: Search,
  shield: ShieldCheck,
};

/**
 * Shared capability glyph so the grid (Services) and the editorial ledger
 * (Home) stay visually and semantically in sync from one mapping.
 */
export function CapabilityGlyph({
  icon,
  className,
}: {
  icon: CapabilityIcon;
  className?: string;
}) {
  const Icon = icons[icon];
  return <Icon aria-hidden="true" className={cn("size-5", className)} />;
}
