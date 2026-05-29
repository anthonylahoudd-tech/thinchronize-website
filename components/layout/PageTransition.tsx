'use client'

import { useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { onTransitionNavigate, transitionTo } from '@/lib/pageTransition'

// ─── Config ───────────────────────────────────────────────────────────────────
const COLORS       = ['#D0274B', '#292929', '#000000', '#919191', '#FFFFFF']
const LIGHT_COLORS = new Set(['#FFFFFF', '#919191'])
const SLIDE_MS     = 750
const HOLD_MS      = 400
const EASE_IN      = 'cubic-bezier(0.76, 0, 0.24, 1)'   // easeInOutQuart
const EASE_OUT     = 'cubic-bezier(0.23, 1, 0.32, 1)'   // easeOutQuint

// ─── Component ────────────────────────────────────────────────────────────────
// Always mounted — never unmounts so refs are always ready.
// Counter-translate removed: logo rides with the curtain.
// The previous two-panel technique caused the logo to appear at viewport
// position even when the curtain was off-screen (CSS overflow:hidden clips
// to the ORIGINAL box, not the translated box — clip-path:inset(0) was also
// unreliable). Riding with the curtain is simpler and artefact-free.
export default function PageTransition() {
  const router      = useRouter()
  const curtainRef  = useRef<HTMLDivElement>(null)
  const logoRef     = useRef<HTMLImageElement>(null)
  const colorIdxRef = useRef(-1)
  const timers      = useRef<ReturnType<typeof setTimeout>[]>([])

  // ── Core fire: animate the curtain, navigate mid-slide ──────────────────────
  const fire = useCallback((href: string) => {
    timers.current.forEach(clearTimeout)
    timers.current = []

    const curtain = curtainRef.current
    const logo    = logoRef.current
    if (!curtain) return

    // Pick next colour
    colorIdxRef.current = (colorIdxRef.current + 1) % COLORS.length
    const color   = COLORS[colorIdxRef.current]
    const isLight = LIGHT_COLORS.has(color)

    // Update colour + logo filter directly (no React state = no reconcile)
    curtain.style.backgroundColor = color
    if (logo) {
      logo.style.filter = isLight
        ? 'brightness(0)'           // dark logo on light bg
        : 'brightness(0) invert(1)' // white logo on dark bg
    }

    // ── PHASE 1: snap to start, then slide IN ─────────────────────────────────
    curtain.style.transition = 'none'
    curtain.style.transform  = 'translateY(100%)'

    // Double rAF — ensures the browser has painted the reset before we animate
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        curtain.style.transition = `transform ${SLIDE_MS}ms ${EASE_IN}`
        curtain.style.transform  = 'translateY(0%)'
      })
    })

    // Navigate AFTER the curtain fully covers the screen
    const tNav = setTimeout(() => router.push(href), SLIDE_MS)

    // ── PHASE 2: hold then slide OUT ──────────────────────────────────────────
    const tOut = setTimeout(() => {
      const c = curtainRef.current
      if (!c) return
      c.style.transition = `transform ${SLIDE_MS}ms ${EASE_OUT}`
      c.style.transform  = 'translateY(-100%)'
    }, SLIDE_MS + HOLD_MS)

    timers.current = [tNav, tOut]
  }, [router])

  // ── Subscribe to programmatic navigation (e.g. Header buttons) ──────────────
  useEffect(() => onTransitionNavigate(fire), [fire])

  // ── Intercept ALL internal <a> clicks (covers every <Link> site-wide) ───────
  // Capture phase fires before Next.js's own click handler.
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      const a = (e.target as Element).closest('a[href]') as HTMLAnchorElement | null
      if (!a) return

      const raw = a.getAttribute('href') ?? ''
      if (!raw.startsWith('/') && !raw.startsWith(window.location.origin)) return
      if (raw.startsWith('/#') || raw === '#') return

      const path = raw.startsWith(window.location.origin)
        ? raw.slice(window.location.origin.length) || '/'
        : raw

      if (path === window.location.pathname) return

      e.preventDefault()
      e.stopPropagation()
      transitionTo(path)
    }

    document.addEventListener('click', handle, true)
    return () => document.removeEventListener('click', handle, true)
  }, [])

  // ── CURTAIN — single panel, logo centered inside, rides with curtain ─────────
  return (
    <div
      ref={curtainRef}
      style={{
        position:        'fixed',
        inset:           0,
        zIndex:          9999,
        backgroundColor: COLORS[0],   // overwritten imperatively on each fire
        transform:       'translateY(100%)',
        pointerEvents:   'none',
        willChange:      'transform',
      }}
    >
      <div
        style={{
          position:       'absolute',
          inset:          0,
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={logoRef}
          src="/images/logo-stacked.png"
          alt="Thinchronize"
          width={72}
          height={72}
          style={{
            objectFit: 'contain',
            filter:    'brightness(0) invert(1)',  // default: white on dark
          }}
        />
      </div>
    </div>
  )
}
