'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const PP = "'PPNeueCorp', system-ui, sans-serif"

const WORDS = ['MINDFUL', 'DESIGN']

export default function MindfulDesignReveal() {
  const sectionRef = useRef<HTMLElement>(null)
  const imgWrapRef = useRef<HTMLDivElement>(null)
  const imgRef     = useRef<HTMLImageElement>(null)

  useGSAP(
    () => {
      const section = sectionRef.current
      const wrap    = imgWrapRef.current
      const img     = imgRef.current
      if (!section || !wrap || !img) return

      // Image clip-path reveal on scroll enter
      gsap.fromTo(
        wrap,
        { clipPath: 'inset(10% 5% 10% 5%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          ease:     'power3.inOut',
          scrollTrigger: {
            trigger: section,
            start:   'top 80%',
            end:     'top 15%',
            scrub:   0.8,
          },
        }
      )

      // Subtle parallax on image
      gsap.fromTo(
        img,
        { yPercent: -5 },
        {
          yPercent: 5,
          ease:     'none',
          scrollTrigger: {
            trigger: section,
            start:   'top bottom',
            end:     'bottom top',
            scrub:   true,
          },
        }
      )

      // Stagger words up on enter
      gsap.fromTo(
        '.mdr-word',
        { yPercent: 105, opacity: 0 },
        {
          yPercent: 0,
          opacity:  1,
          duration: 0.9,
          ease:     'power4.out',
          stagger:  0.08,
          scrollTrigger: {
            trigger: section,
            start:   'top 72%',
            once:    true,
          },
        }
      )

      // Eyebrow line slide in
      gsap.fromTo(
        '.mdr-eyebrow',
        { opacity: 0, x: -16 },
        {
          opacity:  1,
          x:        0,
          duration: 0.7,
          ease:     'power3.out',
          delay:    0.15,
          scrollTrigger: {
            trigger: section,
            start:   'top 72%',
            once:    true,
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
        padding:         'clamp(80px, 10vw, 140px) clamp(20px, 5vw, 80px)',
        overflow:        'hidden',
      }}
    >
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>

        {/* Eyebrow */}
        <div
          className="mdr-eyebrow"
          style={{
            display:      'flex',
            alignItems:   'center',
            gap:          16,
            marginBottom: 'clamp(32px, 4vw, 56px)',
            opacity:      0,
          }}
        >
          <span style={{ width: 32, height: 1, background: '#D0274B', flexShrink: 0 }} />
          <span style={{
            fontFamily:    PP,
            fontWeight:    800,
            fontSize:      11,
            letterSpacing: '0.2em',
            textTransform: 'uppercase' as const,
            color:         'rgba(255,255,255,0.4)',
          }}>
            Our Approach
          </span>
        </div>

        {/* Two-column layout: text left, image right */}
        <div style={{
          display:             'grid',
          gridTemplateColumns: '1fr 1fr',
          gap:                 'clamp(32px, 4vw, 80px)',
          alignItems:          'center',
        }}
          className="mdr-grid"
        >
          {/* Left — animated headline */}
          <div>
            {WORDS.map((word) => (
              <div key={word} style={{ overflow: 'hidden' }}>
                <span
                  className="mdr-word"
                  style={{
                    display:       'block',
                    fontFamily:    PP,
                    fontWeight:    900,
                    fontSize:      'clamp(56px, 8vw, 130px)',
                    lineHeight:    0.92,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase' as const,
                    color:         '#FFFFFF',
                    opacity:       0,
                  }}
                >
                  {word}
                </span>
              </div>
            ))}

            <p style={{
              fontFamily:    PP,
              fontWeight:    400,
              fontSize:      'clamp(13px, 1.1vw, 15px)',
              lineHeight:    1.75,
              color:         'rgba(255,255,255,0.45)',
              marginTop:     'clamp(20px, 2.5vw, 36px)',
              maxWidth:      380,
            }}>
              Strategy-led creative studio based in Beirut. We diagnose before we design —
              because every mark, every word, and every system should earn its place.
            </p>
          </div>

          {/* Right — contained image */}
          <div
            ref={imgWrapRef}
            style={{
              clipPath:  'inset(10% 5% 10% 5%)',
              willChange:'clip-path',
              overflow:  'hidden',
              borderRadius: 0,
              aspectRatio: '4 / 3',
              position:  'relative',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imgRef}
              src="/images/Thinchronize-Mindful-Design-Website.jpg"
              alt="Thinchronize — Mindful Design"
              style={{
                position:       'absolute',
                inset:          '-5% 0',
                width:          '100%',
                height:         '110%',
                objectFit:      'cover',
                objectPosition: 'center',
                willChange:     'transform',
              }}
            />
          </div>
        </div>

      </div>

      {/* Responsive styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 767px) {
          .mdr-grid {
            grid-template-columns: 1fr !important;
          }
        }
      ` }} />
    </section>
  )
}
