'use client'

import { CSSProperties, useLayoutEffect, useRef } from 'react'
import { addLineTrigger, prefersReducedMotion, registerBump } from './motion'

// ─── Letter-settle reveal ─────────────────────────────────────────────────────
// Headings arrive scattered (±4px, ±2deg, faded) and snap to the grid when the
// red line's tip crosses them — the line synchronizes the letters. Scatter is
// applied before paint only when JS runs, so no-JS and reduced-motion readers
// always see settled text. Settles once; later crossings only bump.

export interface SettlePart {
  t: string
  red?: boolean
}

export default function LetterSettle({
  parts,
  settleOn = 'line',
  mountDelay = 0,
  className,
  style,
  as: Tag = 'span',
  bump = true,
}: {
  parts: SettlePart[] | string
  /** 'line' waits for the red line; 'mount' settles shortly after load (hero). */
  settleOn?: 'line' | 'mount'
  mountDelay?: number
  className?: string
  style?: CSSProperties
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'p' | 'div'
  /** Whether later line crossings bump the whole heading. */
  bump?: boolean
}) {
  const ref = useRef<HTMLElement>(null)
  const list: SettlePart[] = typeof parts === 'string' ? [{ t: parts }] : parts

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    const chars = Array.from(el.querySelectorAll<HTMLElement>('.ls-char'))

    // Scatter before paint (JS present, motion allowed).
    chars.forEach(c => {
      const rx = (Math.random() * 8 - 4).toFixed(1)
      const ry = (Math.random() * 8 - 4).toFixed(1)
      const rd = (Math.random() * 4 - 2).toFixed(1)
      c.style.transform = `translate(${rx}px, ${ry}px) rotate(${rd}deg)`
      c.style.opacity = '0'
    })

    let settled = false
    const settle = () => {
      if (settled) return
      settled = true
      chars.forEach((c, i) => {
        c.style.transition = `transform 600ms cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 12}ms, opacity 400ms ease ${i * 12}ms`
        c.style.transform = ''
        c.style.opacity = '1'
      })
    }

    const cleanups: (() => void)[] = []
    if (settleOn === 'mount') {
      const t = window.setTimeout(settle, 300 + mountDelay)
      cleanups.push(() => window.clearTimeout(t))
      if (bump) cleanups.push(registerBump(el, { rotateFactor: 0.06 }))
    } else if (bump) {
      cleanups.push(registerBump(el, { rotateFactor: 0.06, onFirstDown: settle }))
    } else {
      cleanups.push(addLineTrigger({ el, onFirstDown: settle }))
    }
    // Safety: if the line never crosses (e.g. element above the start), settle anyway.
    const safety = window.setTimeout(settle, 4000 + mountDelay)
    cleanups.push(() => window.clearTimeout(safety))

    return () => cleanups.forEach(fn => fn())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={className} style={{ display: 'block', ...style }}>
      {list.map((part, pi) => (
        <span key={pi} style={{ color: part.red ? '#D0274B' : undefined }}>
          {part.t.split(/(\s+)/).map((word, wi) =>
            /^\s+$/.test(word) ? (
              <span key={wi}> </span>
            ) : (
              // Words stay whole — only the chars inside scatter.
              <span key={wi} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
                {word.split('').map((ch, i) => (
                  <span key={i} className="ls-char" style={{ display: 'inline-block', willChange: 'transform' }}>
                    {ch}
                  </span>
                ))}
              </span>
            )
          )}
        </span>
      ))}
    </Tag>
  )
}
