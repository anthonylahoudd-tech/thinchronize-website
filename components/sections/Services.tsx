'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import MagneticButton from '@/components/ui/MagneticButton'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    id: '01',
    title: 'Brand Engagement',
    headline: 'Build it right, the first time.',
    description:
      'For brands being born or reborn. We take you through strategy, positioning, naming, and full visual identity, creating a complete brand system that is ready to face the world.',
    deliverables: [
      'Brand Strategy & Positioning',
      'Naming & Verbal Identity',
      'Visual Identity System',
      'Brand Guidelines',
      'Art Direction',
      'Digital & Print Applications',
    ],
  },
  {
    id: '02',
    title: 'Brand Guardianship',
    headline: 'Keep it coherent, always.',
    description:
      'For established brands that need to stay sharp. We act as your ongoing creative partner, reviewing touchpoints, evolving the system, and protecting the integrity of the brand over time.',
    deliverables: [
      'Brand Audits',
      'Creative Direction',
      'Design System Evolution',
      'Campaign Development',
      'Asset Production',
      'Brand Management',
    ],
  },
]

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.fromTo(
        '.services-bg',
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.2,
          ease: 'power4.inOut',
          transformOrigin: 'bottom center',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true },
        }
      )
      gsap.fromTo(
        '.services-word',
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 0.9,
          ease: 'power4.out',
          stagger: 0.06,
          scrollTrigger: { trigger: '.services-heading', start: 'top 78%', once: true },
        }
      )
      gsap.fromTo(
        '.service-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.2,
          scrollTrigger: { trigger: '.services-grid', start: 'top 75%', once: true },
        }
      )
    },
    { scope: sectionRef }
  )

  return (
    <section ref={sectionRef} id="services" className="relative overflow-hidden">
      {/* Light background */}
      <div className="services-bg absolute inset-0 bg-off-white" />

      <div className="relative z-10 section-padding">
        <div className="container mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-16">
            <span className="w-8 h-px bg-red" />
            <span className="eyebrow">Services</span>
          </div>

          {/* Heading */}
          <div className="services-heading mb-16 md:mb-24 max-w-4xl">
            <div className="flex flex-wrap gap-x-4">
              {['Precision work', 'for brands that', 'mean it.'].map((word) => (
                <span key={word} className="overflow-hidden">
                  <span className="services-word inline-block text-display-md text-dark font-display font-black uppercase">
                    {word}
                  </span>
                </span>
              ))}
            </div>
          </div>

          {/* Service cards */}
          <div className="services-grid grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
            {services.map((service) => (
              <div
                key={service.id}
                className="service-card group bg-white rounded-2xl p-10 md:p-14 border border-dark/5 will-change-transform"
                style={{
                  transition: 'border-color 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  overflow: 'hidden',
                  maxWidth: '100%',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(208,39,75,0.2)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(0,0,0,0.05)')}
              >
                {/* Number + title */}
                <div className="flex items-start justify-between mb-8">
                  <span className="text-red font-display font-black text-sm tracking-widest">{service.id}</span>
                  <div className="w-8 h-px bg-dark/20 origin-right mt-2" />
                </div>

                <h3
                  className="text-dark font-display font-black uppercase mb-4 leading-tight"
                  style={{ fontSize: 'clamp(18px, 2vw, 22px)' }}
                >
                  {service.title}
                </h3>
                <p className="text-dark/40 text-lg font-sans font-medium mb-6 italic">{service.headline}</p>
                <p className="text-dark/60 text-base leading-relaxed mb-10 font-sans">
                  {service.description}
                </p>

                {/* Deliverables list */}
                <div className="border-t border-dark/10 pt-8">
                  <p className="eyebrow mb-5" style={{ color: 'rgba(0,0,0,0.4)' }}>
                    Deliverables
                  </p>
                  <ul className="grid grid-cols-2 gap-y-2 gap-x-4">
                    {service.deliverables.map((d) => (
                      <li key={d} className="text-dark/70 text-sm flex items-center gap-2 font-sans">
                        <span className="w-1 h-1 rounded-full bg-red flex-shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col items-center text-center gap-8 py-16 md:py-24 border-t border-dark/10">
            <p className="eyebrow" style={{ color: 'rgba(0,0,0,0.5)' }}>Ready to begin?</p>
            <div className="text-display-sm text-dark font-display font-black uppercase max-w-lg leading-tight text-center">
              {['Every great brand', 'starts with a', 'single conversation.'].map((line) => (
                <div key={line}>{line}</div>
              ))}
            </div>
            <MagneticButton
              className="group inline-flex items-center gap-3 px-8 py-4 bg-dark text-white rounded-full text-sm font-display font-bold tracking-widest uppercase will-change-transform hover:bg-red"
              style={{ transition: 'all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
              onClick={() => {
                const el = document.getElementById('contact')
                const lenis = (window as typeof window & { lenis?: { scrollTo: (el: Element, opts?: object) => void } }).lenis
                if (el) lenis ? lenis.scrollTo(el, { offset: -80 }) : el.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Start a Project
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  )
}
