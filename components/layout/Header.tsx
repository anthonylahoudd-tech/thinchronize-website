'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { gsap } from 'gsap'
import { Menu, X } from 'lucide-react'
import clsx from 'clsx'

const navLinks = [
  { label: 'Home',     href: '/' },
  { label: 'Work',     href: '/work' },
  { label: 'Services', href: '/services' },
  { label: 'Journal',  href: '/journal' },
  { label: 'Contact',  href: '/contact' },
]

export default function Header() {
  const headerRef = useRef<HTMLElement>(null)
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const router = useRouter()

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
        className={clsx(
          'fixed top-0 left-0 right-0 z-50 will-change-transform',
          'transition-all duration-500',
          scrolled
            ? 'py-4 bg-dark/92 backdrop-blur-md border-b border-white/5'
            : 'py-6 bg-transparent'
        )}
        style={{ transform: 'translateZ(0)' }}
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
                  color:         'rgba(255,255,255,0.65)',
                  transition:    'color 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = '#fff')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.65)')}
                className="link-underline"
              >
                {link.label}
              </button>
            ))}

            <button
              onClick={() => scrollToSection('/contact')}
              className="ml-4 px-5 py-2.5 border border-white/30 text-white rounded-full will-change-transform hover:bg-white hover:text-dark"
              style={{
                fontFamily:    "'PPNeueCorp', system-ui, sans-serif",
                fontWeight:    800,
                fontSize:      11,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                transition:    'all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              }}
            >
              Start a Project
            </button>
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-white p-2"
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
            onClick={() => scrollToSection('/contact')}
            className="self-start mt-8 px-6 py-3 bg-red text-white rounded-full will-change-transform hover:bg-white hover:text-dark"
            style={{
              fontFamily:    "'PPNeueCorp', system-ui, sans-serif",
              fontWeight:    800,
              fontSize:      12,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              transition:    'all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          >
            Start a Project
          </button>
        </nav>
      </div>
    </>
  )
}
