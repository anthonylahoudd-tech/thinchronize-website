// ─── Homepage motion core — "The Line That Synchronizes" ─────────────────────
// One law governs every animation: nothing moves without a visible cause.
// Cause → effect → settle. One spring config sitewide; impulses proportional
// to scroll velocity. No physics library, no three.js: this file + Lenis
// (already global) is the whole stack.

export const SPRING = { stiffness: 0.08, damping: 0.82 }
export const K_IMPULSE = 0.35
export const MAX_IMPULSE = 24

export const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))

export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Damped spring integrator — one instance per animated element.
export class Spring {
  y = 0
  vy = 0
  impulse(v: number) { this.vy += v }
  tick(): number {
    this.vy += -SPRING.stiffness * this.y
    this.vy *= SPRING.damping
    this.y += this.vy
    if (Math.abs(this.y) < 0.05 && Math.abs(this.vy) < 0.05) { this.y = 0; this.vy = 0 }
    return this.y
  }
  get active() { return this.y !== 0 || this.vy !== 0 }
}

// ─── Registries (module singletons; the RedLine component runs the loop) ─────

export interface LineTrigger {
  el: HTMLElement
  /** Fraction of the element's height where the anchor sits (default 0.35). */
  anchorFrac?: number
  /** Fires on every line crossing, both directions (the physical bump). */
  onCross?: (impulse: number, dir: 1 | -1) => void
  /** Fires once, the first time the line tip passes downward (the settle). */
  onFirstDown?: () => void
  _side?: 1 | -1
  _fired?: boolean
  _coolUntil?: number
}

export interface BumpTarget {
  el: HTMLElement
  spring: Spring
  /** Degrees of rotation per px of spring offset (0 for none, clamp ±1.5deg). */
  rotateFactor?: number
}

export interface SkewTarget {
  el: HTMLElement
  _skew?: number
}

export const lineTriggers = new Set<LineTrigger>()
export const bumpTargets = new Set<BumpTarget>()
export const skewTargets = new Set<SkewTarget>()

export function addLineTrigger(t: LineTrigger): () => void {
  lineTriggers.add(t)
  return () => lineTriggers.delete(t)
}
export function addBumpTarget(t: BumpTarget): () => void {
  bumpTargets.add(t)
  return () => { t.el.style.transform = ''; bumpTargets.delete(t) }
}
export function addSkewTarget(t: SkewTarget): () => void {
  skewTargets.add(t)
  return () => { t.el.style.transform = ''; skewTargets.delete(t) }
}

/** Convenience: register an element that bumps when the line crosses it. */
export function registerBump(el: HTMLElement, opts?: { rotateFactor?: number; anchorFrac?: number; onFirstDown?: () => void }): () => void {
  const spring = new Spring()
  const removeBump = addBumpTarget({ el, spring, rotateFactor: opts?.rotateFactor ?? 0 })
  const removeTrigger = addLineTrigger({
    el,
    anchorFrac: opts?.anchorFrac,
    onCross: impulse => spring.impulse(impulse),
    onFirstDown: opts?.onFirstDown,
  })
  return () => { removeBump(); removeTrigger() }
}
