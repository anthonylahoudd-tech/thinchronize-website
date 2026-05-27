'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const metaRef    = useRef<HTMLDivElement>(null)
  const scrollRef  = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      /* ── Entrance ─────────────────────────────────────────────────── */
      gsap.fromTo(
        [metaRef.current, scrollRef.current],
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08, delay: 0.6 }
      )

      /* ── Scroll-linked fade ───────────────────────────────────────── */
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
      style={{
        position:   'relative',
        width:      '100%',
        height:     '100vh',
        minHeight:  '600px',
        overflow:   'hidden',
        display:    'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* ── Background image ──────────────────────────────────────── */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/hero-main.jpg"
        alt=""
        style={{
          position:       'absolute',
          inset:          0,
          width:          '100%',
          height:         '100%',
          objectFit:      'cover',
          objectPosition: 'center',
          zIndex:         0,
        }}
      />

      {/* ── Dark overlay ──────────────────────────────────────────── */}
      <div style={{
        position:   'absolute',
        inset:      0,
        background: 'rgba(0,0,0,0.45)',
        zIndex:     1,
      }} />

      {/* ── Bottom meta row ───────────────────────────────────────── */}
      <div
        ref={metaRef}
        className="absolute bottom-10 left-0 right-0 flex items-end justify-between"
        style={{ padding: '0 clamp(20px, 5vw, 80px)', opacity: 0, zIndex: 2 }}
      >
        <p style={{
          fontFamily:    "'PPNeueCorp', system-ui, sans-serif",
          fontWeight:    400,
          fontSize:      11,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color:         'rgba(255,255,255,0.75)',
          textShadow:    '0 1px 6px rgba(0,0,0,0.6)',
        }}>
          Est. 2020 · Beirut, LB
        </p>
        <p style={{
          fontFamily:    "'PPNeueCorp', system-ui, sans-serif",
          fontWeight:    400,
          fontSize:      11,
          letterSpacing: '0.12em',
          color:         'rgba(255,255,255,0.75)',
          textShadow:    '0 1px 6px rgba(0,0,0,0.6)',
        }}>
          Brand Strategy · Visual Identity
        </p>
      </div>

      {/* ── Scroll indicator ──────────────────────────────────────── */}
      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: 0, zIndex: 2 }}
      >
        <span style={{
          fontFamily:    "'PPNeueCorp', system-ui, sans-serif",
          fontWeight:    800,
          fontSize:      10,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color:         'rgba(255,255,255,0.75)',
          textShadow:    '0 1px 6px rgba(0,0,0,0.6)',
        }}>
          Scroll
        </span>
        <span className="animate-bounce" style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, textShadow: '0 1px 6px rgba(0,0,0,0.6)' }}>
          ↓
        </span>
      </div>
    </section>
  )
}
