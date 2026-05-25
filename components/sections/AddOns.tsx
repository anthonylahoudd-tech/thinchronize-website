'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const addons = [
  {
    id: '01',
    title: 'Print Design',
    description:
      'Collateral, packaging, menus, signage. Built on your brand system, not around it.',
  },
  {
    id: '02',
    title: 'Digital & Social',
    description:
      'Social assets, presentations, email templates, digital ads. Consistent across every screen.',
  },
  {
    id: '03',
    title: 'Animation & Motion',
    description:
      'Logo animations, brand idents, social motion, explainer videos. Your brand, moving.',
  },
  {
    id: '04',
    title: 'Photography & Video',
    description:
      'Art-directed brand photography and video through vetted production partners.',
  },
]

export default function AddOns() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.fromTo(
        '.addon-heading-word',
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1,
          ease: 'power4.out',
          stagger: 0.06,
          scrollTrigger: { trigger: '.addon-heading', start: 'top 80%', once: true },
        }
      )
      gsap.fromTo(
        '.addon-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: '.addon-grid', start: 'top 78%', once: true },
        }
      )
    },
    { scope: sectionRef }
  )

  return (
    <section ref={sectionRef} id="addons" className="bg-dark section-padding">
      <div className="container mx-auto">

        {/* Section eyebrow */}
        <div className="flex items-center gap-4 mb-16">
          <span className="w-8 h-px bg-red" />
          <span className="eyebrow">Production Add-Ons</span>
        </div>

        {/* Heading */}
        <div className="addon-heading mb-6 overflow-hidden">
          <div className="flex flex-wrap gap-x-3">
            {['Everything your brand', 'needs to live', 'in the world.'].map((phrase) => (
              <span key={phrase} className="overflow-hidden">
                <span
                  className="addon-heading-word inline-block text-display-md text-white uppercase"
                  style={{
                    fontFamily: "'PPNeueCorp', system-ui, sans-serif",
                    fontWeight: 900,
                  }}
                >
                  {phrase}
                </span>
              </span>
            ))}
          </div>
        </div>

        <p
          className="mb-16 md:mb-20 max-w-lg"
          style={{
            fontFamily:  "'PPNeueCorp', system-ui, sans-serif",
            fontWeight:  400,
            fontSize:    18,
            lineHeight:  1.7,
            color:       '#919191',
          }}
        >
          Bolt production onto your brand system. Every deliverable inherits your identity —
          no briefing from scratch.
        </p>

        {/* 2×2 card grid */}
        <div className="addon-grid grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
          {addons.map((addon) => (
            <div
              key={addon.id}
              className="addon-card relative bg-dark border border-white/10 rounded-2xl p-8 md:p-10 overflow-hidden"
              style={{ opacity: 0 }}
            >
              {/* Red top accent line */}
              <div className="absolute top-0 left-8 right-8 h-px bg-red" />

              {/* Number */}
              <p
                className="mb-4"
                style={{
                  fontFamily:    "'PPNeueCorp', system-ui, sans-serif",
                  fontWeight:    900,
                  fontSize:      'clamp(48px, 5vw, 72px)',
                  lineHeight:    1,
                  color:         '#D0274B',
                  letterSpacing: '-0.02em',
                }}
              >
                {addon.id}
              </p>

              {/* Title */}
              <h3
                className="mb-3"
                style={{
                  fontFamily:    "'PPNeueCorp', system-ui, sans-serif",
                  fontWeight:    800,
                  fontSize:      'clamp(22px, 2.5vw, 32px)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.02em',
                  color:         '#FFFFFF',
                }}
              >
                {addon.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontFamily: "'PPNeueCorp', system-ui, sans-serif",
                  fontWeight: 400,
                  fontSize:   15,
                  lineHeight: 1.7,
                  color:      '#919191',
                }}
              >
                {addon.description}
              </p>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-10 border-t border-white/10">
          <p
            style={{
              fontFamily: "'PPNeueCorp', system-ui, sans-serif",
              fontWeight: 400,
              fontSize:   14,
              color:      '#919191',
            }}
          >
            Quoted per scope. No packages, no padding.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 will-change-transform"
            style={{
              fontFamily:    "'PPNeueCorp', system-ui, sans-serif",
              fontWeight:    800,
              fontSize:      12,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color:         '#D0274B',
              transition:    'gap 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.gap = '12px')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.gap = '8px')}
          >
            Start a project <span>→</span>
          </Link>
        </div>

      </div>
    </section>
  )
}
