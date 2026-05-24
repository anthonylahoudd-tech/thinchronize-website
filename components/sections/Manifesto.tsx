'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.fromTo(
        '.manifesto-text',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
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
        backgroundColor: '#D0274B',
        padding: 'clamp(80px, 10vw, 140px) clamp(20px, 5vw, 80px)',
      }}
    >
      <div style={{ maxWidth: 1440, margin: '0 auto', textAlign: 'center' }}>
        <p
          className="manifesto-text"
          style={{
            fontFamily:    "'PPNeueCorp', system-ui, sans-serif",
            fontWeight:    900,
            fontSize:      'clamp(36px, 6vw, 110px)',
            lineHeight:    0.92,
            letterSpacing: '-0.01em',
            textTransform: 'uppercase',
            color:         '#FFFFFF',
            opacity:       0,
          }}
        >
          We don&apos;t decorate.
          <br />
          We resolve.
        </p>
      </div>
    </section>
  )
}
