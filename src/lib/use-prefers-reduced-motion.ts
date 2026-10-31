"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Hydration-safe `prefers-reduced-motion`.
 *
 * Motion's own `useReducedMotion()` reads `matchMedia` during render, which the
 * server cannot do. On a machine with reduced motion enabled, the server emits
 * one tree and the client's first render produces a different one — different
 * element types, different inline styles, sometimes no element at all. React
 * treats that as a hydration mismatch (error #418), throws the server HTML away
 * and re-renders the whole subtree on the client. Anything that had already
 * started — including the hero video's source and playback — is torn down and
 * rebuilt, which is exactly how a background video ends up permanently blank.
 *
 * `useSyncExternalStore` is the primitive designed for this: `getServerSnapshot`
 * returns `false` so the server output and the first client render always agree,
 * and React then re-renders once after hydration with the real value. No
 * mismatch, no discarded DOM, and reduced-motion behaviour still applies — it
 * just applies a tick later, which is imperceptible.
 *
 * The returned value only ever changes after mount, so components may keep
 * branching on it freely.
 */
function subscribe(onChange: () => void) {
  const query = window.matchMedia(QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

const getSnapshot = () => window.matchMedia(QUERY).matches;

/** Server (and first client render): assume no preference, so markup matches. */
const getServerSnapshot = () => false;

export function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
