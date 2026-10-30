"use client";

import { useSyncExternalStore } from "react";

/**
 * Renders the current year so the footer copyright never goes stale.
 *
 * Cache Components (enabled in next.config.ts) rejects `new Date()` during
 * prerendering, and a `setState` inside an effect trips
 * `react-hooks/set-state-in-effect`. `useSyncExternalStore` solves both: React
 * uses `getServerSnapshot` for the static shell and re-reads the clock on the
 * client after hydration, with no state update and no hydration mismatch.
 *
 * The span reserves four digits of width, so the value lands without shifting
 * the layout.
 */
const subscribe = () => () => {};
const getSnapshot = () => new Date().getFullYear();
const getServerSnapshot = () => null;

export function CurrentYear() {
  const year = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <span className="inline-block min-w-[3.2ch] tabular-nums">
      {year ?? ""}
    </span>
  );
}
