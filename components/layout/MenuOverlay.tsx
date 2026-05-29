'use client'

import { memo, useEffect, useRef } from 'react'
import Image from 'next/image'
import { transitionTo } from '@/lib/pageTransition'

const EASE_OPEN  = 'cubic-bezier(0.76, 0, 0.24, 1)'
const EASE_CLOSE = 'cubic-bezier(0.23, 1, 0.22, 1)'
const EASE_LINK  = 'cubic-bezier(0.23, 1, 0.32, 1)'
const PP         = "'PPNeueCorp', system-ui, sans-serif"

const NAV_LINKS = [
  { num: '01', label: 'Home',      href: '/'          },
  { num: '02', label: 'Services',  href: '/services'  },
  { num: '03', label: 'Method',    href: '/method'    },
  { num: '04', label: 'About',     href: '/about'     },
  { num: '05', label: 'Portfolio', href: '/portfolio' },
  { num: '06', label: 'Journal',   href: '/journal'   },
]

interface Props {
  open:    boolean
  onClose: () => void
}

function MenuOverlay({ open, onClose }: Props) {
  const panelRef    = useRef<HTMLDivElement>(null)
  const scrollRef   = useRef<HTMLDivElement>(null)
  const firstSetRef = useRef<HTMLDivElement>(null)
  const linkRefs    = useRef<(HTMLButtonElement | null)[]>([])
  const animTimers  = useRef<ReturnType<typeof setTimeout>[]>([])

  // ── Open / close panel animation ───────────────────────────────────────────
  // Counter-translate removed: content rides with the panel so it is never
  // visible at viewport position when the panel is off-screen.
  useEffect(() => {
    const panel = panelRef.current
    if (!panel) return

    animTimers.current.forEach(clearTimeout)
    animTimers.current = []

    if (open) {
      // Pre-hide links (clones stay visible — loop stays seamless)
      linkRefs.current.forEach(el => {
        if (!el) return
        el.style.transition = 'none'
        el.style.opacity    = '0'
        el.style.transform  = 'translateY(40px)'
      })

      // Snap reset
      panel.style.transition = 'none'
      panel.style.transform  = 'translateY(-100%)'

      // Slide IN
      requestAnimationFrame(() => requestAnimationFrame(() => {
        panel.style.transition = `transform 600ms ${EASE_OPEN}`
        panel.style.transform  = 'translateY(0%)'
      }))

      // Stagger links once panel has landed
      const tStagger = setTimeout(() => {
        linkRefs.current.forEach((el, i) => {
          if (!el) return
          el.style.transition = `opacity 600ms ${EASE_LINK} ${i * 55}ms,
                                  transform 600ms ${EASE_LINK} ${i * 55}ms`
          el.style.opacity   = '1'
          el.style.transform = 'translateY(0px)'
        })
        // After all stagger animations finish, clear inline transition so
        // CSS class "transition: color" takes over and hover colour works
        const lastDelay = (NAV_LINKS.length - 1) * 55
        const tClear = setTimeout(() => {
          linkRefs.current.forEach(el => {
            if (!el) return
            el.style.transition = ''
          })
        }, 600 + lastDelay + 50)
        animTimers.current.push(tClear)
      }, 600)
      animTimers.current.push(tStagger)

    } else {
      panel.style.transition = `transform 500ms ${EASE_CLOSE}`
      panel.style.transform  = 'translateY(-100%)'
    }
  }, [open])

  // ── Scroll reset + hint on open ────────────────────────────────────────────
  useEffect(() => {
    if (!open) return
    const el = scrollRef.current
    if (!el) return

    el.scrollTop = 0

    const t1 = setTimeout(() => el.scrollTo({ top: 100, behavior: 'smooth' }), 700)
    const t2 = setTimeout(() => el.scrollTo({ top: 0,   behavior: 'smooth' }), 1100)

    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [open])

  // ── Infinite scroll loop (active only while open) ──────────────────────────
  useEffect(() => {
    if (!open) return
    const el       = scrollRef.current
    const firstSet = firstSetRef.current
    if (!el || !firstSet) return

    const handleScroll = () => {
      const h = firstSet.offsetHeight
      if (!h) return
      if (el.scrollTop >= h) el.scrollTop -= h
      if (el.scrollTop < 0)  el.scrollTop = h + el.scrollTop
    }

    el.addEventListener('scroll', handleScroll, { passive: true })
    return () => el.removeEventListener('scroll', handleScroll)
  }, [open])

  // ── Escape key ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape' && open) onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const handleNav = (href: string) => {
    onClose()
    transitionTo(href)
  }

  const renderLinks = (withRefs: boolean) =>
    NAV_LINKS.map((link, i) => (
      <button
        key={`${link.label}-${withRefs ? 'a' : 'x'}-${i}`}
        ref={withRefs ? (el => { linkRefs.current[i] = el }) : undefined}
        onClick={() => handleNav(link.href)}
        className="menu-link"
        style={withRefs ? { opacity: 0, transform: 'translateY(40px)' } : undefined}
      >
        <span className="menu-link__num">{link.num}</span>
        <span className="menu-link__text">{link.label.toUpperCase()}</span>
      </button>
    ))

  return (
    <div
      ref={panelRef}
      style={{
        position:        'fixed',
        inset:           0,
        zIndex:          100,
        backgroundColor: '#0a0a0a',
        transform:       'translateY(-100%)',
        pointerEvents:   open ? 'auto' : 'none',
        willChange:      'transform',
      }}
    >

      {/* ── Close bar (top 80 px) ────────────────────────────────────── */}
      <div style={{
        position:       'absolute',
        top:            0,
        left:           0,
        right:          0,
        height:         80,
        display:        'flex',
        justifyContent: 'space-between',
        alignItems:     'center',
        padding:        '0 24px 0 24px',
      }}>
        {/* Logo — always visible inside the overlay */}
        <button
          onClick={() => handleNav('/')}
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'block' }}
          aria-label="Go to homepage"
        >
          <Image
            src="/logo-wordmark-white.png"
            alt="Thinchronize"
            width={140}
            height={22}
            style={{ height: 20, width: 'auto', display: 'block' }}
          />
        </button>

        <button
          onClick={onClose}
          style={{
            fontFamily:          PP,
            fontWeight:          400,
            fontSize:            13,
            letterSpacing:       '3px',
            textTransform:       'uppercase',
            color:               'white',
            background:          'none',
            border:              'none',
            cursor:              'pointer',
            textDecoration:      'underline',
            textUnderlineOffset: '4px',
          }}
        >
          Close
        </button>
      </div>

      {/* ── Infinite-scroll nav (fills between bars) ─────────────────── */}
      <div
        ref={scrollRef}
        className="hide-scrollbar"
        data-lenis-prevent
        style={{
          position:  'absolute',
          top:       80,
          bottom:    80,
          left:      0,
          right:     0,
          overflowY: 'scroll',
          overflowX: 'hidden',
        }}
      >
        {/* Set A — refs attached, stagger-animated on open */}
        <div ref={firstSetRef}>
          {renderLinks(true)}
        </div>

        {/* Set B — seamless first repeat */}
        <div aria-hidden="true">
          {renderLinks(false)}
        </div>

        {/* Set C — safety buffer for fast scrollers */}
        <div aria-hidden="true">
          {NAV_LINKS.map((link, i) => (
            <button
              key={`c-${i}`}
              className="menu-link"
              onClick={() => handleNav(link.href)}
            >
              <span className="menu-link__num">{link.num}</span>
              <span className="menu-link__text">{link.label.toUpperCase()}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── CTA bar (bottom 80 px) ────────────────────────────────────── */}
      <div style={{
        position:   'absolute',
        bottom:     0,
        left:       0,
        right:      0,
        height:     80,
        display:    'flex',
        alignItems: 'center',
        padding:    '0 48px',
        borderTop:  '1px solid rgba(255,255,255,0.08)',
      }}>
        <button
          onClick={() => handleNav('/contact')}
          style={{
            fontFamily:    PP,
            fontWeight:    900,
            fontSize:      13,
            letterSpacing: '4px',
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
  )
}

export default memo(MenuOverlay)
