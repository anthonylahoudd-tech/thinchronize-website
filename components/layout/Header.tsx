'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'
import { transitionTo } from '@/lib/pageTransition'
import MenuOverlay from './MenuOverlay'

const PP          = "'PPNeueCorp', system-ui, sans-serif"
const EASE        = 'cubic-bezier(0.19, 1, 0.22, 1)'
const LIGHT_PAGES = ['/services', '/portfolio', '/about', '/method']

const NAV_LINKS = [
  { label: 'Work',     href: '/portfolio' },
  { label: 'About',   href: '/about'     },
  { label: 'Method',  href: '/method'    },
  { label: 'Services', href: '/services' },
  { label: 'Ideas',   href: '/journal'   },
]

export default function Header() {
  const desktopHeaderRef = useRef<HTMLElement>(null)
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const pathname = usePathname()

  const isLight = LIGHT_PAGES.some(p => pathname === p || pathname.startsWith(p + '/'))

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

  const logoSrc   = (isLight && !menuOpen) ? '/logo-wordmark-red.png' : '/logo-wordmark-white.png'
  const linkColor = isLight ? 'rgba(41,41,41,0.7)' : 'rgba(255,255,255,0.85)'
  const linkHover = isLight ? '#292929' : '#ffffff'

  return (
    <>
      {/* ══════════════════════════════════════════════════════════════════════
          MOBILE HEADER — always visible (md:hidden)
          Logo left · MENU button right · fades out when overlay is open
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
            src={logoSrc}
            alt="Thinchronize"
            width={140}
            height={22}
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
            letterSpacing:       '1.5px',
            color:               isLight ? '#292929' : 'white',
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
          DESKTOP HEADER — three-zone choreography (hidden md:block)

          ZONE 1 · Logo          — absolute left, always visible
          ZONE 2 · Center links  — fade + slide up on scroll
          ZONE 3 · MESSAGE BIN   — right, visible at top, fades out on scroll
          ZONE 4 · MSG BIN+MENU  — right, hidden at top, fades in on scroll

          Both fades use 600 ms easeOutExpo → one seamless choreography.
      ══════════════════════════════════════════════════════════════════════ */}
      <header
        ref={desktopHeaderRef}
        className="hidden md:block"
        style={{
          position:   'fixed',
          top:        0,
          left:       0,
          right:      0,
          zIndex:     50,
          height:     72,
          background: isLight ? '#FFFFFF' : 'transparent',
        }}
      >

        {/* ZONE 1 — Logo (always) ──────────────────────────────────────── */}
        <div style={{
          position:  'absolute',
          top:       '50%',
          left:      40,
          transform: 'translateY(-50%)',
        }}>
          <button
            onClick={() => transitionTo('/')}
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'block' }}
            aria-label="Go to homepage"
          >
            <Image
              src={logoSrc}
              alt="Thinchronize"
              width={160}
              height={26}
              style={{ height: 24, width: 'auto', display: 'block' }}
              priority
            />
          </button>
        </div>

        {/* ZONE 2 — Center links (fade out when scrolled) ───────────────── */}
        <div style={{
          position:      'absolute',
          top:           '50%',
          left:          '50%',
          transform:     'translate(-50%, -50%)',
          display:       'flex',
          alignItems:    'center',
          gap:           40,
          opacity:       scrolled ? 0 : 1,
          pointerEvents: scrolled ? 'none' : 'auto',
          transition:    'opacity 500ms ease',
          whiteSpace:    'nowrap',
        }}>
          {NAV_LINKS.map(link => (
            <button
              key={link.label}
              onClick={() => transitionTo(link.href)}
              style={{
                fontFamily:    PP,
                fontWeight:    400,
                fontSize:      15,
                letterSpacing: '1px',
                color:         linkColor,
                background:    'none',
                border:        'none',
                padding:       0,
                cursor:        'pointer',
                transition:    'color 300ms ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = linkHover)}
              onMouseLeave={e => (e.currentTarget.style.color = linkColor)}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* ZONE 3 — MESSAGE BIN, top state (fades out when scrolled) ────── */}
        <div style={{
          position:      'absolute',
          top:           '50%',
          right:         40,
          transform:     'translateY(-50%)',
          opacity:       scrolled ? 0 : 1,
          pointerEvents: scrolled ? 'none' : 'auto',
          transition:    'opacity 500ms ease',
        }}>
          <button
            onClick={() => transitionTo('/contact')}
            style={{
              fontFamily:    PP,
              fontWeight:    400,
              fontSize:      11,
              letterSpacing: '1.5px',
              background:    '#D0274B',
              color:         '#FFFFFF',
              padding:       '10px 22px',
              border:        'none',
              borderRadius:  '100px',
              cursor:        'pointer',
              transition:    'background 0.25s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#b8223f')}
            onMouseLeave={e => (e.currentTarget.style.background = '#D0274B')}
          >
            Let's Sync.
          </button>
        </div>

        {/* ZONE 4 — MESSAGE BIN + MENU, scrolled state (fades in) ─────────
            Opacity 0→1 at 500ms ease — starts slowly so the fade is visible,
            simultaneous with Zone 2+3 fading out for a single choreography.         */}
        <div style={{
          position:      'absolute',
          top:           '50%',
          right:         40,
          transform:     'translateY(-50%)',
          display:       'flex',
          alignItems:    'center',
          gap:           32,
          opacity:       scrolled && !menuOpen ? 1 : 0,
          pointerEvents: scrolled && !menuOpen ? 'auto' : 'none',
          transition:    'opacity 500ms ease',
        }}>
          <button
            onClick={() => transitionTo('/contact')}
            style={{
              fontFamily:          PP,
              fontWeight:          400,
              fontSize:            12,
              letterSpacing:       '1.5px',
              color:               'white',
              background:          'none',
              border:              'none',
              cursor:              'pointer',
              textDecoration:      'underline',
              textUnderlineOffset: '4px',
              textDecorationColor: 'rgba(255,255,255,0.4)',
              transition:          'opacity 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Let's Sync.
          </button>

          <button
            onClick={() => setMenuOpen(true)}
            style={{
              fontFamily:          PP,
              fontWeight:          400,
              fontSize:            12,
              letterSpacing:       '1.5px',
              color:               'white',
              background:          'none',
              border:              'none',
              cursor:              'pointer',
              textDecoration:      'underline',
              textUnderlineOffset: '4px',
              textDecorationColor: 'rgba(255,255,255,0.4)',
              transition:          'opacity 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Menu
          </button>
        </div>

      </header>

      {/* Full-screen overlay — works on all screen sizes */}
      <MenuOverlay open={menuOpen} onClose={handleClose} />
    </>
  )
}
