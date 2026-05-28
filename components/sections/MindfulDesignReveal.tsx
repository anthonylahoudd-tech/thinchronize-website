'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

export default function MindfulDesignReveal() {
  const sectionRef = useRef<HTMLElement>(null)
  const wrapRef    = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const wrap = wrapRef.current
      if (!wrap) return

      // Clip-path reveal: inset shrinks to zero as section enters
      gsap.fromTo(
        wrap,
        { clipPath: 'inset(6% 4%)' },
        {
          clipPath: 'inset(0% 0%)',
          ease:     'power3.inOut',
          scrollTrigger: {
            trigger: wrap,
            start:   'top 85%',
            end:     'top 20%',
            scrub:   0.9,
          },
        }
      )

      // Subtle scale-down as you scroll in (Ken Burns enters)
      gsap.fromTo(
        wrap,
        { scale: 1.03 },
        {
          scale: 1,
          ease:  'none',
          scrollTrigger: {
            trigger: wrap,
            start:   'top bottom',
            end:     'bottom top',
            scrub:   true,
          },
        }
      )
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: '#000000',
        padding:         'clamp(60px, 8vw, 100px) clamp(20px, 4vw, 60px)',
      }}
    >
      {/* Image wrapper — clip-path animated, no aspect-ratio forcing */}
      <div
        ref={wrapRef}
        style={{
          clipPath:   'inset(6% 4%)',
          willChange: 'clip-path, transform',
          lineHeight: 0, // kills inline gap under img
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img loading="lazy"
          src="/images/Thinchronize-Mindful-Design-Website.jpg"
          alt="Thinchronize — Mindful Design"
          style={{
            display:   'block',
            width:     '100%',
            height:    'auto',        // natural ratio — zero crop
            maxWidth:  '100%',
          }}
        />
      </div>
    </section>
  )
}
