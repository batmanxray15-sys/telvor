import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge conditional class names and de-duplicate conflicting Tailwind utilities.
 * Required by the Motion Primitives component sources.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
