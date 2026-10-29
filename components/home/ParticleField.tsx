'use client'

import { useEffect, useRef } from 'react'
import { clamp, prefersReducedMotion } from './motion'

const RED = '#D0274B'
const GRAY = '#919191'

// ─── The hero particle field ──────────────────────────────────────────────────
// A field of gray dashes whose targets form one horizontal line. Idle: aligned →
// slow drift apart (~6s) → re-synchronize (~1.2s). The Cycle, ambient. Cursor
// repels (change); release and stillness spring the field back (design). Drag
// flings particles with pointer velocity. Chaos is gray; synchronization is red
// — when the field aligns, the formed line glows #D0274B and hands off to the
// page's red spine, which begins exactly here.
// 2D canvas only. Initialized after first paint, destroyed on unmount.

const LINE_Y = 0.66      // fraction of hero height where the line forms
const CURSOR_R = 120
const DRAG_R = 160

type Phase = 'sync' | 'drift' | 'resync'

interface P {
  x: number; y: number
  vx: number; vy: number
  tx: number; ty: number
  len: number
}

export default function ParticleField({ heroRef }: { heroRef: React.RefObject<HTMLElement> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const hero = heroRef.current
    if (!canvas || !hero) return
    if (prefersReducedMotion()) return // static red line rendered by parent instead

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0, h = 0, dpr = 1
    let particles: P[] = []
    let raf = 0
    let destroyed = false

    const isMobile = window.innerWidth < 768
    const COUNT = isMobile ? 150 : 300

    const resize = () => {
      const r = hero.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = r.width
      h = r.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      layoutTargets()
    }

    const layoutTargets = () => {
      const y0 = h * LINE_Y
      const x0 = w * 0.08
      const x1 = w * 0.92
      if (!particles.length) {
        particles = Array.from({ length: COUNT }, () => ({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: 0, vy: 0, tx: 0, ty: 0,
          len: 4 + Math.random() * 5,
        }))
      }
      particles.forEach((p, i) => {
        p.tx = x0 + ((x1 - x0) * i) / (COUNT - 1)
        p.ty = y0 + (Math.random() * 3 - 1.5)
      })
    }

    // Phase machine: the Cycle, ambient.
    let phase: Phase = 'sync'
    let phaseAt = performance.now()
    const phaseLen: Record<Phase, number> = { sync: 2600, drift: 6000, resync: 1200 }
    const nextPhase: Record<Phase, Phase> = { sync: 'drift', drift: 'resync', resync: 'sync' }

    // Pointer state (attached to the hero so text stays selectable above canvas).
    const pointer = { x: -9999, y: -9999, down: false, vx: 0, vy: 0, lastX: 0, lastY: 0 }
    const toLocal = (e: PointerEvent) => {
      const r = hero.getBoundingClientRect()
      return { x: e.clientX - r.left, y: e.clientY - r.top }
    }
    const onMove = (e: PointerEvent) => {
      const { x, y } = toLocal(e)
      pointer.vx = x - pointer.lastX
      pointer.vy = y - pointer.lastY
      pointer.lastX = x; pointer.lastY = y
      pointer.x = x; pointer.y = y
    }
    const onDown = (e: PointerEvent) => {
      pointer.down = true
      const { x, y } = toLocal(e)
      pointer.lastX = x; pointer.lastY = y
      pointer.x = x; pointer.y = y
    }
    const onUp = () => {
      if (pointer.down) { phase = 'resync'; phaseAt = performance.now() }
      pointer.down = false
    }
    const onLeave = () => { pointer.x = -9999; pointer.y = -9999 }
    hero.addEventListener('pointermove', onMove)
    hero.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    hero.addEventListener('pointerleave', onLeave)

    const frame = () => {
      if (destroyed) return
      const now = performance.now()
      if (now - phaseAt > phaseLen[phase] && !pointer.down) {
        phase = nextPhase[phase]
        phaseAt = now
      }

      const drifting = phase === 'drift'
      const stiffness = drifting ? 0.002 : 0.08
      const damping = drifting ? 0.96 : 0.82

      let settledCount = 0
      for (const p of particles) {
        // Spring toward target (weakened while drifting apart).
        p.vx += (p.tx - p.x) * stiffness
        p.vy += (p.ty - p.y) * stiffness
        if (drifting) {
          p.vx += (Math.random() - 0.5) * 0.12
          p.vy += (Math.random() - 0.5) * 0.12
        }
        // Cursor: proximity repulsion (change); drag flings with velocity.
        const dx = p.x - pointer.x
        const dy = p.y - pointer.y
        const d2 = dx * dx + dy * dy
        const R = pointer.down ? DRAG_R : CURSOR_R
        if (d2 < R * R && d2 > 0.01) {
          const d = Math.sqrt(d2)
          const f = (1 - d / R) * (1 - d / R)
          p.vx += (dx / d) * f * 2.2
          p.vy += (dy / d) * f * 2.2
          if (pointer.down) {
            p.vx += clamp(pointer.vx, -30, 30) * 0.22 * f
            p.vy += clamp(pointer.vy, -30, 30) * 0.22 * f
          }
        }
        p.vx *= damping
        p.vy *= damping
        p.x += p.vx
        p.y += p.vy
        const ddx = p.x - p.tx, ddy = p.y - p.ty
        if (ddx * ddx + ddy * ddy < 36) settledCount++
      }
      pointer.vx *= 0.8
      pointer.vy *= 0.8

      const alignment = settledCount / particles.length

      // Draw.
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)

      // The formed line glows red as the field synchronizes.
      if (alignment > 0.55) {
        const glow = (alignment - 0.55) / 0.45
        ctx.strokeStyle = RED
        ctx.globalAlpha = glow * 0.9
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(w * 0.08, h * LINE_Y)
        ctx.lineTo(w * 0.92, h * LINE_Y)
        ctx.stroke()
      }

      ctx.lineWidth = 1.5
      ctx.lineCap = 'round'
      for (const p of particles) {
        const ddx = p.x - p.tx, ddy = p.y - p.ty
        const near = ddx * ddx + ddy * ddy < 9
        ctx.strokeStyle = near ? RED : GRAY
        ctx.globalAlpha = near ? 0.95 : 0.55
        // Dash oriented along velocity; horizontal when settled.
        const sp = Math.hypot(p.vx, p.vy)
        const ux = sp > 0.3 ? p.vx / sp : 1
        const uy = sp > 0.3 ? p.vy / sp : 0
        ctx.beginPath()
        ctx.moveTo(p.x - ux * p.len * 0.5, p.y - uy * p.len * 0.5)
        ctx.lineTo(p.x + ux * p.len * 0.5, p.y + uy * p.len * 0.5)
        ctx.stroke()
      }
      ctx.globalAlpha = 1

      raf = requestAnimationFrame(frame)
    }

    // Initialize after first paint so the LCP headline is unaffected.
    resize()
    const start = window.setTimeout(() => { raf = requestAnimationFrame(frame) }, 250)
    window.addEventListener('resize', resize)

    return () => {
      destroyed = true
      window.clearTimeout(start)
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      hero.removeEventListener('pointermove', onMove)
      hero.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      hero.removeEventListener('pointerleave', onLeave)
    }
  }, [heroRef])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, zIndex: 0 }}
    />
  )
}
