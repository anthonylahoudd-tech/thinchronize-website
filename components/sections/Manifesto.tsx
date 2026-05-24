'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const PP = "'PPNeueCorp', system-ui, sans-serif"

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.fromTo(
        '.manifesto-text',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power4.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
        }
      )
      gsap.fromTo(
        '.manifesto-cta',
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.35,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
        }
      )
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: '#D0274B',
        padding: 'clamp(80px, 10vw, 140px) clamp(20px, 5vw, 80px)',
      }}
    >
      <div style={{ maxWidth: 1440, margin: '0 auto', textAlign: 'center' }}>

        {/* Trueline */}
        <p
          className="manifesto-text"
          style={{
            fontFamily:    PP,
            fontWeight:    900,
            fontSize:      'clamp(36px, 6vw, 110px)',
            lineHeight:    0.92,
            letterSpacing: '-0.01em',
            textTransform: 'uppercase',
            color:         '#FFFFFF',
            opacity:       0,
            marginBottom:  'clamp(48px, 6vw, 80px)',
          }}
        >
          We don&apos;t design
          <br />
          until we understand.
        </p>

        {/* CTA */}
        <div className="manifesto-cta" style={{ opacity: 0 }}>
          <Link
            href="/services"
            style={{
              display:         'inline-flex',
              alignItems:      'center',
              gap:             10,
              padding:         '14px 36px',
              border:          '1px solid rgba(255,255,255,0.65)',
              color:           '#fff',
              fontFamily:      PP,
              fontWeight:      800,
              fontSize:        11,
              letterSpacing:   '0.16em',
              textTransform:   'uppercase',
              borderRadius:    40,
              transition:      'all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.backgroundColor = 'rgba(255,255,255,0.15)'
              el.style.borderColor = '#fff'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.backgroundColor = 'transparent'
              el.style.borderColor = 'rgba(255,255,255,0.65)'
            }}
          >
            See Our Services <span aria-hidden>→</span>
          </Link>
        </div>

      </div>
    </section>
  )
}
