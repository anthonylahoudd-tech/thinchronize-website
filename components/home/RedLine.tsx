'use client'

import { useEffect, useRef } from 'react'
import {
  clamp, prefersReducedMotion, lineTriggers, bumpTargets, skewTargets,
  K_IMPULSE, MAX_IMPULSE,
} from './motion'

const RED = '#D0274B'

// ─── The red line spine ───────────────────────────────────────────────────────
// One continuous 2px path drawn down the whole page as the visitor scrolls.
// It starts at the hero's synchronized particle line and ends at LET'S SYNC.
// The path routes through elements marked [data-line-waypoint]; its tip is
// pinned to ~55% of the viewport so scrolling feels like pulling the line down.
// This component also owns the single rAF loop that ticks every spring,
// fires line-crossing triggers, and applies velocity skew.

const TIP_ANCHOR = 0.55
const JOG_SPAN = 140 // px of vertical travel used to jog horizontally between waypoints

export default function RedLine() {
  const svgRef = useRef<SVGSVGElement>(null)
  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    const svg = svgRef.current
    const path = pathRef.current
    if (!svg || !path) return
    const reduced = prefersReducedMotion()

    let total = 0
    let startY = 0
    let endY = 0
    // Monotone y → path length lookup, sampled from the built path.
    let table: { y: number; len: number }[] = []

    const build = () => {
      const points = Array.from(document.querySelectorAll<HTMLElement>('[data-line-waypoint]')).map(el => {
        const r = el.getBoundingClientRect()
        return { x: r.left + r.width / 2, y: r.top + window.scrollY + r.height / 2 }
      }).sort((a, b) => a.y - b.y)
      if (points.length < 2) return

      const docH = document.documentElement.scrollHeight
      svg.setAttribute('viewBox', `0 0 ${window.innerWidth} ${docH}`)
      svg.style.height = `${docH}px`

      let d = `M ${points[0].x} ${points[0].y}`
      for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1]
        const next = points[i]
        if (Math.abs(next.x - prev.x) < 2) {
          d += ` L ${prev.x} ${next.y}`
        } else {
          const jogTop = Math.max(prev.y, next.y - JOG_SPAN)
          d += ` L ${prev.x} ${jogTop}`
          const mid = jogTop + (next.y - jogTop) / 2
          d += ` C ${prev.x} ${mid}, ${next.x} ${mid}, ${next.x} ${next.y}`
        }
      }
      path.setAttribute('d', d)

      total = path.getTotalLength()
      startY = points[0].y
      endY = points[points.length - 1].y
      table = []
      const SAMPLES = 400
      for (let i = 0; i <= SAMPLES; i++) {
        const len = (total * i) / SAMPLES
        const p = path.getPointAtLength(len)
        table.push({ y: p.y, len })
      }
      path.style.strokeDasharray = `${total}`
      if (reduced) path.style.strokeDashoffset = '0'
    }

    // Length drawn so the tip sits at document-y `tipY`.
    const lenAtY = (tipY: number): number => {
      if (!table.length) return 0
      if (tipY <= table[0].y) return 0
      if (tipY >= table[table.length - 1].y) return total
      let lo = 0, hi = table.length - 1
      while (lo < hi - 1) {
        const mid = (lo + hi) >> 1
        if (table[mid].y <= tipY) lo = mid
        else hi = mid
      }
      const a = table[lo], b = table[hi]
      const t = b.y === a.y ? 1 : (tipY - a.y) / (b.y - a.y)
      return a.len + (b.len - a.len) * t
    }

    build()
    const t1 = window.setTimeout(build, 600)   // after fonts settle
    const t2 = window.setTimeout(build, 1600)  // after images/layout settle
    const onResize = () => build()
    window.addEventListener('resize', onResize)
    const ro = new ResizeObserver(() => build())
    ro.observe(document.body)

    let raf = 0
    let lastScroll = window.scrollY
    let smoothV = 0

    const frame = () => {
      const scrollY = window.scrollY
      const vh = window.innerHeight
      const rawV = scrollY - lastScroll
      lastScroll = scrollY
      smoothV = smoothV * 0.85 + rawV * 0.15

      const tipY = clamp(scrollY + vh * TIP_ANCHOR, startY, endY)

      if (!reduced && total > 0) {
        path.style.strokeDashoffset = `${total - lenAtY(tipY)}`
      }

      // Line-crossing triggers: bump on every crossing, settle once (downward).
      const now = performance.now()
      lineTriggers.forEach(t => {
        if (!t.el.isConnected) return
        const r = t.el.getBoundingClientRect()
        const anchorY = r.top + scrollY + r.height * (t.anchorFrac ?? 0.35)
        const side: 1 | -1 = tipY >= anchorY ? 1 : -1
        if (t._side === undefined) { t._side = side; if (side === 1 && !t._fired) { t._fired = true; t.onFirstDown?.() } ; return }
        if (side !== t._side) {
          t._side = side
          if (t._coolUntil && now < t._coolUntil) return
          t._coolUntil = now + 300
          if (!reduced) t.onCross?.(clamp(smoothV * K_IMPULSE, -MAX_IMPULSE, MAX_IMPULSE), side)
          if (side === 1 && !t._fired) { t._fired = true; t.onFirstDown?.() }
        }
      })

      // Tick springs (the physical bumps).
      bumpTargets.forEach(b => {
        if (!b.spring.active) return
        const y = b.spring.tick()
        const rot = b.rotateFactor ? clamp(y * b.rotateFactor, -1.5, 1.5) : 0
        b.el.style.transform = y === 0 && rot === 0
          ? ''
          : `translateY(${y.toFixed(2)}px)${rot ? ` rotate(${rot.toFixed(3)}deg)` : ''}`
      })

      // Velocity skew (the gate line leans with scroll speed).
      skewTargets.forEach(s => {
        const target = reduced ? 0 : clamp(smoothV * 0.08, -1.5, 1.5)
        s._skew = (s._skew ?? 0) * 0.9 + target * 0.1
        if (Math.abs(s._skew) < 0.01 && target === 0) {
          if (s.el.style.transform) s.el.style.transform = ''
        } else {
          s.el.style.transform = `skewX(${s._skew.toFixed(3)}deg)`
        }
      })

      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(t1)
      window.clearTimeout(t2)
      window.removeEventListener('resize', onResize)
      ro.disconnect()
    }
  }, [])

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        pointerEvents: 'none',
        zIndex: 30,
        overflow: 'visible',
      }}
    >
      <path
        ref={pathRef}
        fill="none"
        stroke={RED}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  )
}
