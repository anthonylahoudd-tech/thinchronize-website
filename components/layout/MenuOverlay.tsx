'use client'

import { memo, useEffect, useRef } from 'react'
import { transitionTo } from '@/lib/pageTransition'

const PP         = "'PPNeueCorp', system-ui, sans-serif"
const EASE_OPEN  = 'cubic-bezier(0.76, 0, 0.24, 1)'
const EASE_CLOSE = 'cubic-bezier(0.23, 1, 0.22, 1)'

const NAV_LINKS = [
  { label: 'Home',      href: '/' },
  { label: 'Services',  href: '/services' },
  { label: 'Method',    href: '/method' },
  { label: 'About',     href: '/about' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Journal',   href: '/journal' },
]

interface Props {
  open:    boolean
  onClose: () => void
}

function MenuOverlay({ open, onClose }: Props) {
  const panelRef     = useRef<HTMLDivElement>(null)
  const contentRef   = useRef<HTMLDivElement>(null)
  const linkRefs     = useRef<(HTMLButtonElement | null)[]>([])
  const staggerRef   = useRef<ReturnType<typeof setTimeout>[]>([])

  // ── Animate on open / close ──────────────────────────────────────────────────
  useEffect(() => {
    const panel   = panelRef.current
    const content = contentRef.current
    if (!panel || !content) return

    if (open) {
      // Cancel any pending stagger
      staggerRef.current.forEach(clearTimeout)
      staggerRef.current = []

      // Reset link styles immediately (no transition while resetting)
      linkRefs.current.forEach(el => {
        if (!el) return
        el.style.transition = 'none'
        el.style.opacity    = '0'
        el.style.transform  = 'translateY(32px)'
      })

      // Snap panel to starting position
      panel.style.transition   = 'none'
      content.style.transition = 'none'
      panel.style.transform    = 'translateY(-100%)'
      content.style.transform  = 'translateY(100%)'

      // Double-rAF: slide IN
      requestAnimationFrame(() => requestAnimationFrame(() => {
        panel.style.transition   = `transform 600ms ${EASE_OPEN}`
        content.style.transition = `transform 600ms ${EASE_OPEN}`
        panel.style.transform    = 'translateY(0%)'
        content.style.transform  = 'translateY(0%)'
      }))

      // Stagger links — start after panel lands (600ms) then 60ms each
      NAV_LINKS.forEach((_, i) => {
        const t = setTimeout(() => {
          const el = linkRefs.current[i]
          if (!el) return
          el.style.transition = `opacity 500ms cubic-bezier(0.23, 1, 0.32, 1),
                                  transform 500ms cubic-bezier(0.23, 1, 0.32, 1)`
          el.style.opacity    = '1'
          el.style.transform  = 'translateY(0px)'
        }, 600 + i * 60)
        staggerRef.current.push(t)
      })

    } else {
      // Cancel stagger, slide OUT
      staggerRef.current.forEach(clearTimeout)
      staggerRef.current = []

      panel.style.transition   = `transform 500ms ${EASE_CLOSE}`
      content.style.transition = `transform 500ms ${EASE_CLOSE}`
      panel.style.transform    = 'translateY(-100%)'
      content.style.transform  = 'translateY(100%)'
    }
  }, [open])

  // Escape key closes the menu
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape' && open) onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const handleNav = (href: string) => {
    onClose()
    transitionTo(href)
  }

  // ── TWO-PANEL STRUCTURE ──────────────────────────────────────────────────────
  // Panel slides DOWN (from -100% → 0%), content counter-translates UP (100% → 0%)
  // Net visual movement of content = zero, appears stationary.
  return (
    <div
      ref={panelRef}
      style={{
        position:        'fixed',
        inset:           0,
        zIndex:          100,
        backgroundColor: '#0a0a0a',
        transform:       'translateY(-100%)',
        overflow:        'hidden',
        pointerEvents:   open ? 'auto' : 'none',
        willChange:      'transform',
      }}
    >
      <div
        ref={contentRef}
        style={{
          position:      'absolute',
          inset:         0,
          display:       'flex',
          flexDirection: 'column',
          transform:     'translateY(100%)',
          willChange:    'transform',
        }}
      >
        {/* ── Top row: logo gap + CLOSE ── */}
        <div style={{
          display:        'flex',
          justifyContent: 'flex-end',
          alignItems:     'center',
          padding:        '24px clamp(20px, 4vw, 48px)',
          flexShrink:     0,
        }}>
          <button
            onClick={onClose}
            style={{
              fontFamily:    PP,
              fontWeight:    800,
              fontSize:      11,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color:         'white',
              background:    'none',
              border:        'none',
              borderBottom:  '1px solid rgba(255,255,255,0.5)',
              paddingBottom: 2,
              cursor:        'pointer',
            }}
          >
            Close
          </button>
        </div>

        {/* ── Main nav links ── */}
        <nav style={{
          flex:          1,
          display:       'flex',
          flexDirection: 'column',
          justifyContent:'center',
          padding:       '0 clamp(20px, 4vw, 48px)',
          gap:           2,
        }}>
          {NAV_LINKS.map((link, i) => (
            <button
              key={link.label}
              ref={el => { linkRefs.current[i] = el }}
              onClick={() => handleNav(link.href)}
              style={{
                fontFamily:    PP,
                fontWeight:    900,
                fontSize:      'clamp(44px, 6.5vw, 80px)',
                textTransform: 'uppercase',
                color:         'white',
                background:    'none',
                border:        'none',
                cursor:        'pointer',
                textAlign:     'left',
                lineHeight:    1.1,
                padding:       '3px 0',
                opacity:       0,                    // stagger brings this to 1
                transform:     'translateY(32px)',   // stagger brings to 0
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#D0274B')}
              onMouseLeave={e => (e.currentTarget.style.color = 'white')}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* ── Bottom CTA ── */}
        <div style={{
          padding:    '32px clamp(20px, 4vw, 48px)',
          flexShrink: 0,
        }}>
          <button
            onClick={() => handleNav('/contact')}
            style={{
              fontFamily:    PP,
              fontWeight:    800,
              fontSize:      15,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color:         '#D0274B',
              background:    'none',
              border:        'none',
              cursor:        'pointer',
              transition:    'opacity 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Start A Project →
          </button>
        </div>
      </div>
    </div>
  )
}

export default memo(MenuOverlay)
