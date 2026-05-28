'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { onTransitionNavigate, transitionTo } from '@/lib/pageTransition'

const COLORS  = ['#D0274B', '#000000', '#1A1A1A']
const SLIDE_MS = 560
const HOLD_MS  = 700

export default function PageTransition() {
  const router        = useRouter()
  const [visible, setVisible] = useState(false)
  const [phase,   setPhase]   = useState<'in' | 'out'>('in')
  const [color,   setColor]   = useState(COLORS[0])
  const colorIndexRef = useRef(0)
  const timers        = useRef<ReturnType<typeof setTimeout>[]>([])

  // ── Core: fire animation then navigate ──────────────────────────────────────
  const fire = useCallback((href: string) => {
    // Cancel any in-flight transition
    timers.current.forEach(clearTimeout)

    colorIndexRef.current = (colorIndexRef.current + 1) % COLORS.length
    setColor(COLORS[colorIndexRef.current])
    setPhase('in')
    setVisible(true)

    // Navigate AFTER the panel has fully covered the screen
    const t1 = setTimeout(() => router.push(href),   SLIDE_MS)
    // Start exit
    const t2 = setTimeout(() => setPhase('out'),      SLIDE_MS + HOLD_MS)
    // Remove from DOM
    const t3 = setTimeout(() => setVisible(false),    SLIDE_MS * 2 + HOLD_MS)

    timers.current = [t1, t2, t3]
  }, [router])

  // ── Listen for programmatic navigate calls (e.g. from Header buttons) ───────
  useEffect(() => onTransitionNavigate(fire), [fire])

  // ── Intercept ALL internal anchor clicks (covers every <Link> on the site) ──
  // Uses capture phase so we get it before Next.js's own click handler.
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      const anchor = (e.target as Element).closest('a[href]') as HTMLAnchorElement | null
      if (!anchor) return

      const raw = anchor.getAttribute('href') ?? ''

      // Skip: external, hash-only anchors, mailto, tel, etc.
      if (!raw.startsWith('/') && !raw.startsWith(window.location.origin)) return
      if (raw.startsWith('/#') || raw === '#') return

      // Resolve to a path
      const path = raw.startsWith(window.location.origin)
        ? raw.slice(window.location.origin.length) || '/'
        : raw

      // Skip same-page links
      if (path === window.location.pathname) return

      e.preventDefault()
      e.stopPropagation()
      transitionTo(path)
    }

    document.addEventListener('click', handle, true)   // capture = fires first
    return () => document.removeEventListener('click', handle, true)
  }, [])

  if (!visible) return null

  return (
    <div
      style={{
        position:        'fixed',
        inset:           0,
        zIndex:          9999,
        backgroundColor: color,
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'center',
        animation:
          phase === 'in'
            ? `pageSlideUp  ${SLIDE_MS}ms cubic-bezier(0.76, 0, 0.24, 1) forwards`
            : `pageSlideOut ${SLIDE_MS}ms cubic-bezier(0.76, 0, 0.24, 1) forwards`,
        pointerEvents: 'all',
      }}
    >
      <Image
        src="/images/logo-stacked.png"
        alt="Thinchronize"
        width={120}
        height={120}
        style={{
          height:    90,
          width:     'auto',
          objectFit: 'contain',
          filter:    'brightness(0) invert(1)',
        }}
        priority
      />
    </div>
  )
}
