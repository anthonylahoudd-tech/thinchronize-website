'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import { gsap } from 'gsap'
import { Menu, X } from 'lucide-react'
import clsx from 'clsx'

// Pages with white (#FFFFFF) backgrounds — header must use dark text + white bg
const LIGHT_PAGES = ['/services', '/portfolio', '/about']

const navLinks = [
  { label: 'Home',      href: '/' },
  { label: 'Services',  href: '/services' },
  { label: 'Method',    href: '/method' },
  { label: 'About',     href: '/about' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Journal',   href: '/journal' },
]

const DIAGNOSTIC_HREF = '/contact'

export default function Header() {
  const headerRef = useRef<HTMLElement>(null)
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const router   = useRouter()
  const pathname = usePathname()

  // Is this a white-background page?
  const isLight = LIGHT_PAGES.some(p => pathname === p || pathname.startsWith(p + '/'))

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 1.2 }
    )
  }, [])

  const scrollToSection = (href: string) => {
    setMenuOpen(false)
    if (!href.startsWith('/#')) {
      router.push(href)
      return
    }
    const id = href.slice(2)
    const el = document.getElementById(id)
    if (!el) return
    const lenis = (window as typeof window & { lenis?: { scrollTo: (el: Element, opts?: object) => void } }).lenis
    lenis
      ? lenis.scrollTo(el, { offset: -80, duration: 1.4 })
      : el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 will-change-transform transition-all duration-500"
        style={{
          transform:    'translateZ(0)',
          padding:      scrolled ? '16px 0' : '24px 0',
          background:   isLight
            ? (scrolled ? 'rgba(255,255,255,0.96)' : '#FFFFFF')
            : (scrolled ? 'rgba(0,0,0,0.92)' : 'transparent'),
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled
            ? (isLight ? '1px solid #E8E8E8' : '1px solid rgba(255,255,255,0.05)')
            : 'none',
        }}
      >
        <div className="container mx-auto flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo-wordmark-red.png"
              alt="Thinchronize"
              width={180}
              height={28}
              style={{ height: 26, width: 'auto' }}
              priority
            />
          </Link>

          {/* Desktop nav — NormalUltrabold (800) */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.href)}
                style={{
                  fontFamily:    "'PPNeueCorp', system-ui, sans-serif",
                  fontWeight:    800,
                  fontSize:      12,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color:         isLight ? 'rgba(41,41,41,0.6)' : 'rgba(255,255,255,0.65)',
                  background:    'none',
                  border:        'none',
                  cursor:        'pointer',
                  transition:    'color 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = isLight ? '#292929' : '#fff')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = isLight ? 'rgba(41,41,41,0.6)' : 'rgba(255,255,255,0.65)')}
                className="link-underline"
              >
                {link.label}
              </button>
            ))}

            <button
              onClick={() => scrollToSection(DIAGNOSTIC_HREF)}
              className="ml-4 will-change-transform"
              style={{
                fontFamily:    "'PPNeueCorp', system-ui, sans-serif",
                fontWeight:    800,
                fontSize:      14,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                background:    '#D0274B',
                color:         '#FFFFFF',
                padding:       '10px 24px',
                borderRadius:  0,
                border:        'none',
                cursor:        'pointer',
                transition:    'background 0.25s',
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = '#b8223f')}
              onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = '#D0274B')}
            >
              Message Bin
            </button>
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2"
            style={{ color: isLight ? '#292929' : '#fff' }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={clsx(
          'fixed inset-0 z-40 bg-dark flex flex-col justify-center transition-all duration-500 md:hidden',
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      >
        <nav className="container mx-auto flex flex-col gap-8">
          {navLinks.map((link, i) => (
            <button
              key={link.label}
              onClick={() => scrollToSection(link.href)}
              className="text-left text-display-sm text-white hover:text-red"
              style={{
                fontFamily:      "'PPNeueCorp', system-ui, sans-serif",
                fontWeight:      900,
                textTransform:   'uppercase',
                transitionDelay: menuOpen ? `${i * 60}ms` : '0ms',
                transition:      'color 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollToSection(DIAGNOSTIC_HREF)}
            className="self-start mt-8 will-change-transform"
            style={{
              fontFamily:    "'PPNeueCorp', system-ui, sans-serif",
              fontWeight:    800,
              fontSize:      14,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              background:    '#D0274B',
              color:         '#FFFFFF',
              padding:       '10px 24px',
              borderRadius:  0,
              border:        'none',
              cursor:        'pointer',
              transition:    'background 0.25s',
            }}
          >
            Message Bin
          </button>
        </nav>
      </div>
    </>
  )
}
