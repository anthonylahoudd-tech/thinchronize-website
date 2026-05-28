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
  { label: 'Home',      href: '/' },
  { label: 'Services',  href: '/services' },
  { label: 'Method',    href: '/method' },
  { label: 'About',     href: '/about' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Journal',   href: '/journal' },
]

export default function Header() {
  const logoRef   = useRef<HTMLDivElement>(null)
  const navRef    = useRef<HTMLElement>(null)
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

  // ── Body scroll lock ───────────────────────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // ── Entrance animation ─────────────────────────────────────────────────────
  useEffect(() => {
    gsap.fromTo(logoRef.current,  { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 1.2 })
    gsap.fromTo(navRef.current,   { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 1.2 })
  }, [])

  // ── Stable close handler (memoised so MenuOverlay never re-renders mid-animation)
  const handleClose = useCallback(() => setMenuOpen(false), [])

  const logoSrc = (isLight && !menuOpen) ? '/logo-wordmark-red.png' : '/logo-wordmark-white.png'
  const PAD_H   = 'clamp(20px, 4vw, 48px)'

  return (
    <>
      {/* ════════════════════════════════════════════════════════════════════════
          LOGO — always fixed top-left, z:200, never fades, above overlay
      ════════════════════════════════════════════════════════════════════════ */}
      <div
        ref={logoRef}
        style={{
          position:   'fixed',
          top:        scrolled ? 16 : 24,
          left:       PAD_H,
          zIndex:     200,
          transition: `top 300ms ${EASE}`,
        }}
      >
        <button
          onClick={() => transitionTo('/')}
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'block' }}
          aria-label="Go to homepage"
        >
          <Image
            src={logoSrc}
            alt="Thinchronize"
            width={180}
            height={28}
            style={{ height: 26, width: 'auto', display: 'block' }}
            priority
          />
        </button>
      </div>

      {/* ════════════════════════════════════════════════════════════════════════
          FULL NAV BAR — desktop only, fades out after 80px scroll
      ════════════════════════════════════════════════════════════════════════ */}
      <header
        ref={navRef}
        className="hidden md:block"
        style={{
          position:      'fixed',
          top:           0,
          left:          0,
          right:         0,
          zIndex:        50,
          padding:       `24px ${PAD_H}`,
          background:    isLight ? '#FFFFFF' : 'transparent',
          opacity:       scrolled ? 0 : 1,
          pointerEvents: scrolled ? 'none' : 'auto',
          transition:    `opacity 600ms ${EASE}`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <nav style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            {NAV_LINKS.map(link => (
              <button
                key={link.label}
                onClick={() => transitionTo(link.href)}
                className="link-underline"
                style={{
                  fontFamily:    PP,
                  fontWeight:    800,
                  fontSize:      12,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color:         isLight ? 'rgba(41,41,41,0.6)' : 'rgba(255,255,255,0.65)',
                  background:    'none',
                  border:        'none',
                  cursor:        'pointer',
                  transition:    'color 0.25s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = isLight ? '#292929' : '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = isLight ? 'rgba(41,41,41,0.6)' : 'rgba(255,255,255,0.65)')}
              >
                {link.label}
              </button>
            ))}

            <button
              onClick={() => transitionTo('/contact')}
              style={{
                fontFamily:    PP,
                fontWeight:    800,
                fontSize:      14,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                background:    '#D0274B',
                color:         '#FFFFFF',
                padding:       '10px 24px',
                border:        'none',
                cursor:        'pointer',
                transition:    'background 0.25s ease',
                marginLeft:    16,
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#b8223f')}
              onMouseLeave={e => (e.currentTarget.style.background = '#D0274B')}
            >
              Message Bin
            </button>
          </nav>
        </div>
      </header>

      {/* ════════════════════════════════════════════════════════════════════════
          FLOATING BUTTONS (desktop) — WORK WITH US + MENU, fade IN after scroll
      ════════════════════════════════════════════════════════════════════════ */}
      <div
        className="hidden md:flex"
        style={{
          position:      'fixed',
          top:           scrolled ? 28 : 32,
          right:         40,
          zIndex:        150,
          alignItems:    'center',
          gap:           32,
          opacity:       scrolled && !menuOpen ? 1 : 0,
          pointerEvents: scrolled && !menuOpen ? 'auto' : 'none',
          transition:    `opacity 600ms ${EASE}, top 300ms ${EASE}`,
        }}
      >
        <button
          onClick={() => transitionTo('/contact')}
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
            transition:          'opacity 0.2s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.6')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          Work With Us
        </button>

        <button
          onClick={() => setMenuOpen(true)}
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
            transition:          'opacity 0.2s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.6')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          Menu
        </button>
      </div>

      {/* ════════════════════════════════════════════════════════════════════════
          MOBILE MENU BUTTON — always visible top-right on mobile, adapts to bg
      ════════════════════════════════════════════════════════════════════════ */}
      <div
        className="md:hidden"
        style={{
          position:      'fixed',
          top:           24,
          right:         PAD_H,
          zIndex:        150,
          opacity:       menuOpen ? 0 : 1,
          pointerEvents: menuOpen ? 'none' : 'auto',
          transition:    `opacity 300ms ${EASE}`,
        }}
      >
        <button
          onClick={() => setMenuOpen(true)}
          style={{
            fontFamily:    PP,
            fontWeight:    800,
            fontSize:      11,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color:         isLight ? '#292929' : 'white',
            background:    'none',
            border:        'none',
            borderBottom:  `1px solid ${isLight ? 'rgba(41,41,41,0.4)' : 'rgba(255,255,255,0.5)'}`,
            paddingBottom: 2,
            cursor:        'pointer',
          }}
        >
          Menu
        </button>
      </div>

      {/* ════════════════════════════════════════════════════════════════════════
          FULL-SCREEN OVERLAY — memoised, two-panel trick, slides DOWN from top
      ════════════════════════════════════════════════════════════════════════ */}
      <MenuOverlay open={menuOpen} onClose={handleClose} />
    </>
  )
}
