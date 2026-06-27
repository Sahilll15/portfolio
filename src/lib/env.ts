/** Environment helpers for gating expensive / motion-heavy interactions. */
export const prefersReducedMotion = (): boolean =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const isCoarsePointer = (): boolean =>
  typeof window !== "undefined" &&
  window.matchMedia("(pointer: coarse)").matches;

/** True only when fancy pointer interactions (cursor, tilt, magnetic) make sense. */
export const fancyPointer = (): boolean =>
  !isCoarsePointer() && !prefersReducedMotion();
