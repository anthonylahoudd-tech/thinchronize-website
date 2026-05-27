'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { motion } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

const PP = "'PPNeueCorp', system-ui, sans-serif"

export default function MindfulDesignReveal() {
  const sectionRef  = useRef<HTMLElement>(null)
  const wrapRef     = useRef<HTMLDivElement>(null)
  const imgRef      = useRef<HTMLImageElement>(null)

  useGSAP(
    () => {
      const section = sectionRef.current
      const wrap    = wrapRef.current
      const img     = imgRef.current
      if (!section || !wrap || !img) return

      // ── 1. Clip-path reveal on enter ──────────────────────────────
      gsap.fromTo(
        wrap,
        { clipPath: 'inset(12% 6% 12% 6% round 0px)' },
        {
          clipPath: 'inset(0% 0% 0% 0% round 0px)',
          ease:     'power3.inOut',
          duration: 1.2,
          scrollTrigger: {
            trigger: section,
            start:   'top 80%',
            end:     'top 20%',
            scrub:   0.8,
          },
        }
      )

      // ── 2. Parallax: image moves slower than scroll ───────────────
      gsap.fromTo(
        img,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease:     'none',
          scrollTrigger: {
            trigger: section,
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
        position:        'relative',
        height:          '100vh',
        backgroundColor: '#000',
        overflow:        'hidden',
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'center',
      }}
    >
      {/* ── Image wrap (clip-path animated) ── */}
      <div
        ref={wrapRef}
        style={{
          position:   'absolute',
          inset:      0,
          clipPath:   'inset(12% 6% 12% 6% round 0px)',
          willChange: 'clip-path',
          overflow:   'hidden',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          src="/images/Thinchronize-Mindful-Design-Website.jpg"
          alt="Thinchronize — Mindful Design"
          style={{
            position:   'absolute',
            inset:      '-10% 0',
            width:      '100%',
            height:     '120%',
            objectFit:  'cover',
            objectPosition: 'center',
            willChange: 'transform',
          }}
        />

        {/* Gradient overlay — removed */}
      </div>

      {/* ── Text overlay ── */}
      <div style={{
        position:  'relative',
        zIndex:    1,
        textAlign: 'center',
        padding:   '0 clamp(20px, 5vw, 80px)',
        display:   'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap:        20,
      }}>
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            fontFamily:    PP,
            fontWeight:    900,
            fontSize:      'clamp(52px, 9vw, 120px)',
            lineHeight:    0.92,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color:         '#FFFFFF',
          }}
        >
          Mindful Design
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            fontFamily:    PP,
            fontWeight:    400,
            fontSize:      13,
            color:         'rgba(255,255,255,0.5)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
          }}
        >
          Strategy-Led Creative Studio · Beirut
        </motion.p>
      </div>
    </section>
  )
}
