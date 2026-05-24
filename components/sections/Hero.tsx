'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const sectionRef  = useRef<HTMLElement>(null)
  const centerRef   = useRef<HTMLDivElement>(null)
  const lineRef     = useRef<HTMLDivElement>(null)
  const metaRef     = useRef<HTMLDivElement>(null)
  const scrollRef   = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      /* ── Entrance ────────────────────────────────────────────────────── */
      const tl = gsap.timeline({ delay: 0.2 })

      tl.fromTo(
        centerRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' }
      )
        .fromTo(
          lineRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.9, ease: 'power4.out', transformOrigin: 'center' },
          '-=0.5'
        )
        .fromTo(
          [metaRef.current, scrollRef.current],
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.08 },
          '-=0.4'
        )

      /* ── Scroll-linked fade + scale ─────────────────────────────────── */
      gsap.to(centerRef.current, {
        scale:   0.88,
        opacity: 0,
        y:       -60,
        ease:    'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start:   'top top',
          end:     '+=500',
          scrub:   1.2,
        },
      })

      gsap.to([metaRef.current, scrollRef.current], {
        opacity: 0,
        y:       -24,
        ease:    'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start:   'top top',
          end:     '+=280',
          scrub:   1,
        },
      })
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen bg-dark flex items-center justify-center overflow-hidden"
    >
      {/* ── Background photo ─────────────────────────────────────────── */}
      <Image
        src="/images/hero-bg.jpg"
        alt=""
        fill
        priority
        quality={90}
        className="object-cover object-center"
        style={{ zIndex: 0 }}
      />

      {/* Dark overlay — deepens near edges, lighter in center */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 1,
          background:
            'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(41,41,41,0.55) 0%, rgba(41,41,41,0.90) 100%)',
        }}
      />

      {/* Solid bottom fade so the meta bar stays legible */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          zIndex: 2,
          background: 'linear-gradient(to bottom, transparent, rgba(41,41,41,0.95))',
        }}
      />

      {/* ── Centered brand block ──────────────────────────────────────── */}
      <div
        ref={centerRef}
        className="flex flex-col items-center text-center px-6"
        style={{ opacity: 0, position: 'relative', zIndex: 3 }}
      >
        {/* Logo — ~60vw, object-fit: contain */}
        <div
          className="mb-10 md:mb-12"
          style={{ maxWidth: '60vw', width: '100%', minWidth: 280 }}
        >
          <Image
            src="/logo-wordmark-red.png"
            alt="Thinchronize"
            width={960}
            height={180}
            priority
            style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
          />
        </div>

        {/* Tagline — PPNeueCorp ExtendedUltrabold */}
        <p
          style={{
            fontFamily:    "'PPNeueCorp', system-ui, sans-serif",
            fontWeight:    900,
            fontSize:      'clamp(18px, 4vw, 56px)',
            color:         '#FFFFFF',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            marginBottom:  '2.5rem',
          }}
        >
          Mindful Design
        </p>

        {/* Red divider — 120px, centered */}
        <div
          ref={lineRef}
          style={{
            width:           120,
            height:          1,
            backgroundColor: '#D0274B',
          }}
        />
      </div>

      {/* ── Bottom meta row ───────────────────────────────────────────── */}
      <div
        ref={metaRef}
        className="absolute bottom-10 left-0 right-0 flex items-end justify-between"
        style={{
          padding: '0 clamp(20px, 5vw, 80px)',
          opacity: 0,
          zIndex: 4,
        }}
      >
        <p
          style={{
            fontFamily:    "'PPNeueCorp', system-ui, sans-serif",
            fontWeight:    400,
            fontSize:      11,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color:         '#919191',
          }}
        >
          Est. 2020 · Beirut, LB
        </p>
        <p
          style={{
            fontFamily:    "'PPNeueCorp', system-ui, sans-serif",
            fontWeight:    400,
            fontSize:      11,
            letterSpacing: '0.12em',
            color:         '#919191',
          }}
        >
          Brand Strategy · Visual Identity
        </p>
      </div>

      {/* ── Scroll indicator — bottom-center ──────────────────────────── */}
      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: 0, zIndex: 4 }}
      >
        <span
          style={{
            fontFamily:    "'PPNeueCorp', system-ui, sans-serif",
            fontWeight:    800,
            fontSize:      10,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color:         '#919191',
          }}
        >
          Scroll
        </span>
        {/* Animated down arrow */}
        <span
          className="animate-bounce"
          style={{ color: '#919191', fontSize: 14 }}
        >
          ↓
        </span>
      </div>
    </section>
  )
}
