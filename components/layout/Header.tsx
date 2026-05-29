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
    const onScroll = () => setScrolled(window.scrollY > 80)
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

  // Logo state: wordmark visible at top, packed logo visible when scrolled/menu open
  const logoSwapped = scrolled || menuOpen

  return (
    <>
      {/* ══════════════════════════════════════════════════════════════════════
          MOBILE HEADER — logo left · MENU right · fades when overlay opens
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
          padding:        '20px 24px',
          background:     'transparent',
          opacity:        menuOpen ? 0 : 1,
          pointerEvents:  menuOpen ? 'none' : 'auto',
          transition:     `opacity 300ms ${EASE}`,
        }}
      >
        <button
          onClick={() => transitionTo('/')}
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
          aria-label="Go to homepage"
        >
          <Image
            src="/logo-wordmark-white.png"
            alt="Thinchronize"
            width={130} height={22}
            style={{ height: 20, width: 'auto', display: 'block' }}
            priority
          />
        </button>

        <button
          onClick={() => setMenuOpen(true)}
          style={{
            fontFamily:          PP,
            fontWeight:          400,
            fontSize:            11,
            letterSpacing:       '3.5px',
            textTransform:       'uppercase',
            color:               'white',
            background:          'none',
            border:              'none',
            cursor:              'pointer',
            textDecoration:      'underline',
            textUnderlineOffset: '4px',
          }}
        >
          Menu
        </button>
      </header>

      {/* ══════════════════════════════════════════════════════════════════════
          DESKTOP HEADER — Motto-style choreography

          t=0ms:    Links disappear right-to-left · wordmark fades out
          t=100ms:  LET'S SYNC.+MENU pair fades in
          t=225ms:  Last (leftmost) link finishes fading
          t=350ms:  Wordmark gone → packed logo fades in
          t=600ms:  Settled
      ══════════════════════════════════════════════════════════════════════ */}
      <header
        ref={desktopHeaderRef}
        className="hidden md:block"
        style={{
          position:       'fixed',
          top:            0,
          left:           0,
          right:          0,
          zIndex:         50,
          height:         72,
          background:     'transparent',
          backdropFilter: 'none',
          borderBottom:   'none',
          boxShadow:      'none',
        }}
      >

        {/* ── ZONE 1 — Logo cross-fade ──────────────────────────────────── */}
        <div style={{
          position:  'absolute',
          top:       '50%',
          left:      40,
          transform: 'translateY(-50%)',
        }}>
          {/* Wordmark — visible at top, fades out FIRST (no delay) */}
          <button
            onClick={() => transitionTo('/')}
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'block' }}
            aria-label="Go to homepage"
          >
            <Image
              src="/logo-wordmark-white.png"
              alt="Thinchronize"
              width={130} height={22}
              style={{
                height:     20,
                width:      'auto',
                display:    'block',
                opacity:    logoSwapped ? 0 : 1,
                transition: logoSwapped
                  ? `opacity 350ms ${EASE} 0ms`     // fades out first
                  : `opacity 350ms ${EASE} 350ms`,  // fades in after packed is gone
              }}
              priority
            />
          </button>

          {/* Packed logo — fades in AFTER wordmark is gone (350ms delay) */}
          <button
            onClick={() => transitionTo('/')}
            style={{
              position: 'absolute', top: -10, left: -10,
              background: 'none', border: 'none', padding: 0, cursor: 'pointer',
            }}
            aria-label="Go to homepage"
          >
            <Image
              src="/images/logo-stacked.png"
              alt="Thinchronize"
              width={44} height={44}
              style={{
                display:    'block',
                opacity:    logoSwapped ? 1 : 0,
                transition: logoSwapped
                  ? `opacity 350ms ${EASE} 350ms`  // fades in after wordmark gone
                  : `opacity 350ms ${EASE} 0ms`,   // fades out first
                filter: 'brightness(0) invert(1)', // white version
              }}
            />
          </button>
        </div>

        {/* ── ZONE 2 — Center links: staggered right-to-left disappear ─────── */}
        <ul style={{
          position:   'absolute',
          top:        '50%',
          left:       '50%',
          transform:  'translate(-50%, -50%)',
          display:    'flex',
          alignItems: 'center',
          gap:        40,
          listStyle:  'none',
          padding:    0,
          margin:     0,
          whiteSpace: 'nowrap',
        }}>
          {NAV_LINKS.map((link, i) => {
            // right-to-left: last link (i=TOTAL-1) delay=0ms, first link delay=(TOTAL-1)*45ms
            const disappearDelay = (TOTAL - 1 - i) * 45
            const appearDelay    = i * 45
            return (
              <li
                key={link.label}
                style={{
                  opacity:       scrolled ? 0 : 1,
                  transform:     scrolled ? 'translateY(-5px)' : 'translateY(0)',
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
                    fontSize:      13,
                    letterSpacing: '3.5px',
                    textTransform: 'uppercase',
                    color:         'rgba(255,255,255,0.8)',
                    background:    'none',
                    border:        'none',
                    padding:       0,
                    cursor:        'pointer',
                    transition:    `opacity 200ms ease`,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '0.8')}
                >
                  {link.label}
                </button>
              </li>
            )
          })}
        </ul>

        {/* ── ZONE 3 — Full state: LET'S SYNC. pill (not scrolled) ────────── */}
        <div style={{
          position:      'absolute',
          top:           '50%',
          right:         40,
          transform:     scrolled ? 'translateY(calc(-50% - 5px))' : 'translateY(-50%)',
          opacity:       scrolled ? 0 : 1,
          transition:    `opacity 500ms ${EASE}, transform 500ms ${EASE}`,
          pointerEvents: scrolled ? 'none' : 'auto',
        }}>
          <button
            onClick={() => transitionTo('/contact')}
            style={{
              fontFamily:    PP,
              fontWeight:    400,
              fontSize:      12,
              letterSpacing: '3.5px',
              textTransform: 'uppercase',
              color:         '#FFFFFF',
              background:    '#D0274B',
              padding:       '10px 22px',
              border:        'none',
              borderRadius:  '100px',
              cursor:        'pointer',
              opacity:       0.9,
              transition:    'background 0.25s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#b8223f')}
            onMouseLeave={e => (e.currentTarget.style.background = '#D0274B')}
          >
            LET'S SYNC.
          </button>
        </div>

        {/* ── ZONE 4 — Scrolled state: LET'S SYNC. + MENU (100ms delay) ───── */}
        <div style={{
          position:      'absolute',
          top:           '50%',
          right:         40,
          transform:     scrolled ? 'translateY(-50%)' : 'translateY(calc(-50% + 5px))',
          display:       'flex',
          alignItems:    'center',
          gap:           36,
          opacity:       scrolled ? 1 : 0,
          transition:    `opacity 500ms ${EASE} 100ms, transform 500ms ${EASE} 100ms`,
          pointerEvents: scrolled ? 'auto' : 'none',
        }}>
          <button
            onClick={() => transitionTo('/contact')}
            style={{
              fontFamily:          PP,
              fontWeight:          400,
              fontSize:            12,
              letterSpacing:       '3.5px',
              textTransform:       'uppercase',
              color:               'rgba(255,255,255,0.8)',
              background:          'none',
              border:              'none',
              padding:             0,
              cursor:              'pointer',
              textDecoration:      'underline',
              textUnderlineOffset: '4px',
              textDecorationColor: 'rgba(255,255,255,0.35)',
              transition:          'opacity 200ms ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '0.8')}
          >
            LET'S SYNC.
          </button>

          <button
            onClick={() => setMenuOpen(true)}
            style={{
              fontFamily:          PP,
              fontWeight:          400,
              fontSize:            12,
              letterSpacing:       '3.5px',
              textTransform:       'uppercase',
              color:               'rgba(255,255,255,0.8)',
              background:          'none',
              border:              'none',
              padding:             0,
              cursor:              'pointer',
              textDecoration:      'underline',
              textUnderlineOffset: '4px',
              textDecorationColor: 'rgba(255,255,255,0.35)',
              transition:          'opacity 200ms ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '0.8')}
          >
            MENU
          </button>
        </div>

      </header>

      {/* Full-screen overlay — works on all screen sizes */}
      <MenuOverlay open={menuOpen} onClose={handleClose} />
    </>
  )
}
