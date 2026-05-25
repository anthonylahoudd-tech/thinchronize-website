'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const PP = "'PPNeueCorp', system-ui, sans-serif"

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const imgRef     = useRef<HTMLImageElement>(null)
  const textRef    = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // Parallax on the image
      if (imgRef.current) {
        gsap.fromTo(
          imgRef.current,
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start:   'top bottom',
              end:     'bottom top',
              scrub:   true,
            },
          }
        )
      }

      // Text fade-up on enter
      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              once:  true,
            },
          }
        )
      }
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{
        position:   'relative',
        width:      '100%',
        height:     '100vh',
        minHeight:  '600px',
        overflow:   'hidden',
      }}
    >
      {/* Full-bleed image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src="/images/about-signage.jpg"
        alt="Thinchronize studio"
        style={{
          position:       'absolute',
          inset:          '-6% 0',
          width:          '100%',
          height:         '112%',
          objectFit:      'cover',
          objectPosition: 'center',
          willChange:     'transform',
        }}
      />

      {/* Dark gradient overlay */}
      <div style={{
        position:   'absolute',
        inset:      0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.45) 60%, rgba(0,0,0,0.65) 100%)',
      }} />

      {/* Text overlay — top-left */}
      <div
        ref={textRef}
        style={{
          position:  'absolute',
          top:       'clamp(100px, 12vw, 160px)',
          left:      'clamp(24px, 5vw, 80px)',
          opacity:   0,
        }}
      >
        <p style={{
          fontFamily:    PP,
          fontWeight:    400,
          fontSize:      'clamp(11px, 1.1vw, 13px)',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color:         'rgba(255,255,255,0.6)',
        }}>
          Strategy-Led Creative Studio
        </p>
      </div>
    </section>
  )
}
