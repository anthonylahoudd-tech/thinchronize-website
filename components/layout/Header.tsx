'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { transitionTo } from '@/lib/pageTransition'
import MenuOverlay from './MenuOverlay'

const PP   = "'PPNeueCorp', system-ui, sans-serif"
const EASE = 'cubic-bezier(0.19, 1, 0.22, 1)'

const NAV_LINKS = [
  { label: 'Work',     href: '/portfolio' },
  { label: 'About',   href: '/about'     },
  { label: 'Method',  href: '/method'    },
  { label: 'Services', href: '/services' },
  { label: 'Ideas',   href: '/journal'   },
]

const TOTAL = NAV_LINKS.length

export default function Header() {
  const desktopHeaderRef = useRef<HTMLElement>(null)
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)

  // ── Scroll tracking ────────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ── Body scroll lock + Lenis pause ────────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    const lenis = (window as typeof window & { lenis?: { stop: () => void; start: () => void } }).lenis
    if (menuOpen) lenis?.stop()
    else          lenis?.start()
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // ── Desktop entrance animation ─────────────────────────────────────────────
  useEffect(() => {
    gsap.fromTo(
      desktopHeaderRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 1.2 }
    )
  }, [])

  const handleClose = useCallback(() => setMenuOpen(false), [])

  // Logo state: wordmark at top, packed logo when scrolled/menu open
  const logoSwapped = scrolled || menuOpen

  return (
    <>
      {/* ══════════════════════════════════════════════════════════════════════
          MOBILE HEADER
          mix-blend-mode: difference → logo + MENU text invert against any bg
      ══════════════════════════════════════════════════════════════════════ */}
      <header
        className="flex md:hidden"
        style={{
          position:       'fixed',
          top:            0,
          left:           0,
          right:          0,
          zIndex:         150,
          alignItems:     'center',
          justifyContent: 'space-between',
          padding:        '24px 28px',
          background:     'transparent',
          opacity:        menuOpen ? 0 : 1,
          pointerEvents:  menuOpen ? 'none' : 'auto',
          transition:     `opacity 300ms ${EASE}`,
          mixBlendMode:   'difference',
        }}
      >
        <button
          onClick={() => transitionTo('/')}
          style={{ background: 'none', border: 'none', padding: 0 }}
          aria-label="Go to homepage"
        >
          <Image
            src="/logo-wordmark-white.png"
            alt="Thinchronize"
            width={130} height={22}
            style={{ height: 24, width: 'auto', display: 'block' }}
            priority
          />
        </button>

        <button
          onClick={() => setMenuOpen(true)}
          style={{
            fontFamily:          PP,
            fontWeight:          400,
            fontSize:            13,
            letterSpacing:       '4px',
            textTransform:       'uppercase',
            color:               'white',
            background:          'none',
            border:              'none',
            textDecoration:      'underline',
            textUnderlineOffset: '4px',
          }}
        >
          Menu
        </button>
      </header>

      {/* ══════════════════════════════════════════════════════════════════════
          DESKTOP HEADER

          mix-blend-mode: difference ─────────────────────────────────────────
          All white elements invert against whatever is painted beneath them.
          Dark bg  → white stays white (|dark − white| ≈ white)
          Light bg → white becomes black (|white − white| = 0)
          Same effect as the custom cursor, applied to every nav element.

          Scroll choreography ────────────────────────────────────────────────
          t=0ms:   Links stagger out right→left · wordmark fades out first
          t=80ms:  MENU wrapper begins expanding (width 0 → 110px)
          t=150ms: MENU text slides/fades in
          t=350ms: Packed logo fades in (wordmark fully gone)
          t=600ms: Settled
      ══════════════════════════════════════════════════════════════════════ */}
      <header
        ref={desktopHeaderRef}
        className="hidden md:block"
        style={{
          position:     'fixed',
          top:          0,
          left:         0,
          right:        0,
          zIndex:       50,
          height:       96,
          background:   'transparent',
          mixBlendMode: 'difference',
        }}
      >

        {/* ── Zone 1 — Logo cross-fade ──────────────────────────────────── */}
        <div style={{
          position:  'absolute',
          top:       '50%',
          left:      56,
          transform: 'translateY(-50%)',
        }}>
          {/* Wordmark — always present, fades out FIRST on scroll */}
          <button
            onClick={() => transitionTo('/')}
            style={{ background: 'none', border: 'none', padding: 0, display: 'block' }}
            aria-label="Go to homepage"
          >
            <Image
              src="/logo-wordmark-white.png"
              alt="Thinchronize"
              width={130} height={22}
              style={{
                height:     30,
                width:      'auto',
                display:    'block',
                opacity:    logoSwapped ? 0 : 1,
                transition: logoSwapped
                  ? `opacity 350ms ${EASE} 0ms`
                  : `opacity 350ms ${EASE} 350ms`,
              }}
              priority
            />
          </button>

          {/* Packed logo — fades in AFTER wordmark gone (350ms delay) */}
          <button
            onClick={() => transitionTo('/')}
            style={{
              position: 'absolute', top: -13, left: -12,
              background: 'none', border: 'none', padding: 0,
            }}
            aria-label="Go to homepage"
          >
            <Image
              src="/images/logo-stacked.png"
              alt="Thinchronize"
              width={56} height={56}
              style={{
                display:    'block',
                opacity:    logoSwapped ? 1 : 0,
                transition: logoSwapped
                  ? `opacity 350ms ${EASE} 350ms`
                  : `opacity 350ms ${EASE} 0ms`,
                filter:     'brightness(0) invert(1)',
              }}
            />
          </button>
        </div>

        {/* ── Zone 2 — Center links: staggered right→left disappear ────── */}
        <ul style={{
          position:   'absolute',
          top:        '50%',
          left:       '50%',
          transform:  'translate(-50%, -50%)',
          display:    'flex',
          alignItems: 'center',
          gap:        48,
          listStyle:  'none',
          padding:    0,
          margin:     0,
          whiteSpace: 'nowrap',
        }}>
          {NAV_LINKS.map((link, i) => {
            const disappearDelay = (TOTAL - 1 - i) * 45
            const appearDelay    = i * 45
            return (
              <li
                key={link.label}
                style={{
                  opacity:       scrolled ? 0 : 1,
                  transform:     scrolled ? 'translateY(-8px)' : 'translateY(0)',
                  transition:    scrolled
                    ? `opacity 500ms ${EASE} ${disappearDelay}ms, transform 500ms ${EASE} ${disappearDelay}ms`
                    : `opacity 500ms ${EASE} ${appearDelay}ms,    transform 500ms ${EASE} ${appearDelay}ms`,
                  pointerEvents: scrolled ? 'none' : 'auto',
                }}
              >
                <button
                  onClick={() => transitionTo(link.href)}
                  style={{
                    fontFamily:    PP,
                    fontWeight:    400,
                    fontSize:      15,
                    letterSpacing: '4px',
                    textTransform: 'uppercase',
                    color:         'rgba(255,255,255,0.85)',
                    background:    'none',
                    border:        'none',
                    padding:       0,
                    transition:    'opacity 200ms ease',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '0.85')}
                >
                  {link.label}
                </button>
              </li>
            )
          })}
        </ul>

        {/* ── Zone 3 — Right: LET'S SYNC. always · MENU slides in on scroll ──
            Container is right-anchored (right: 56).
            As the MENU clip-wrapper grows (0 → 130px), it pushes LET'S SYNC.
            to the left — giving the Motto-style "split reveal" on scroll.
        ──────────────────────────────────────────────────────────────────── */}
        <div style={{
          position:   'absolute',
          top:        '50%',
          right:      56,
          transform:  'translateY(-50%)',
          display:    'flex',
          alignItems: 'center',
        }}>

          {/* LET'S SYNC. — always visible, plain underlined text (no pill) */}
          <button
            onClick={() => transitionTo('/contact')}
            style={{
              fontFamily:          PP,
              fontWeight:          400,
              fontSize:            14,
              letterSpacing:       '4px',
              textTransform:       'uppercase',
              color:               'rgba(255,255,255,0.85)',
              background:          'none',
              border:              'none',
              padding:             0,
              textDecoration:      'underline',
              textUnderlineOffset: '4px',
              textDecorationColor: 'rgba(255,255,255,0.35)',
              transition:          'opacity 200ms ease',
              whiteSpace:          'nowrap',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '0.85')}
          >
            LET&apos;S SYNC.
          </button>

          {/* MENU — clip-reveals on scroll, pushing SYNC left
              overflow:hidden on wrapper clips the inner content.
              Width 0 → 130px drives the layout push (LET'S SYNC. slides left).
              The 36px paddingLeft on the inner div acts as the visual gap —
              it is clipped away when width is 0 (box-sizing: border-box). */}
          <div style={{
            overflow:   'hidden',
            width:      scrolled ? '130px' : '0px',
            transition: scrolled
              ? `width 600ms ${EASE} 80ms`
              : `width 500ms ${EASE} 0ms`,
            display:    'flex',
            alignItems: 'center',
          }}>
            <div style={{ paddingLeft: 36, flexShrink: 0, display: 'flex', alignItems: 'center' }}>
              <button
                onClick={() => setMenuOpen(true)}
                style={{
                  fontFamily:          PP,
                  fontWeight:          400,
                  fontSize:            14,
                  letterSpacing:       '4px',
                  textTransform:       'uppercase',
                  color:               'rgba(255,255,255,0.85)',
                  background:          'none',
                  border:              'none',
                  padding:             0,
                  textDecoration:      'underline',
                  textUnderlineOffset: '4px',
                  textDecorationColor: 'rgba(255,255,255,0.35)',
                  opacity:             scrolled ? 1 : 0,
                  transform:           scrolled ? 'translateX(0)' : 'translateX(8px)',
                  transition:          scrolled
                    ? `opacity 400ms ${EASE} 200ms, transform 500ms ${EASE} 150ms`
                    : `opacity 200ms ease, transform 300ms ease`,
                  whiteSpace:          'nowrap',
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '0.85')}
              >
                MENU
              </button>
            </div>
          </div>

        </div>

      </header>

      {/* Full-screen overlay — all screen sizes */}
      <MenuOverlay open={menuOpen} onClose={handleClose} />
    </>
  )
}
