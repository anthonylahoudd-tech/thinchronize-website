'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import type { CaseStudy } from '@/lib/sanity/queries'

gsap.registerPlugin(ScrollTrigger)

const gradients = [
  ['#292929', '#3D2020'],
  ['#1A1A2E', '#16213E'],
  ['#0D1B2A', '#1B2838'],
  ['#1C1C1E', '#2C2C2E'],
  ['#1A1A1A', '#2D2424'],
]

interface Props {
  caseStudies: CaseStudy[]
}

export default function Work({ caseStudies }: Props) {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.fromTo(
        '.work-label',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      )

      const track = trackRef.current
      const wrapper = wrapperRef.current
      if (!track || !wrapper) return

      // Horizontal scroll — desktop (md+) only via matchMedia
      const mm = gsap.matchMedia()
      mm.add('(min-width: 768px)', () => {
        const getScrollAmount = () => -(track.scrollWidth - window.innerWidth)

        const tween = gsap.to(track, {
          x: () => getScrollAmount(),
          ease: 'none',
          scrollTrigger: {
            trigger: wrapper,
            start: 'top top',
            end: () => `+=${track.scrollWidth - window.innerWidth + 120}`,
            pin: true,
            scrub: 1.2,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        })

        return () => {
          tween.kill()
          ScrollTrigger.getAll().forEach((t) => {
            if (t.vars.trigger === wrapper) t.kill()
          })
        }
      })

      return () => mm.revert()
    },
    { scope: sectionRef }
  )

  return (
    <section ref={sectionRef} id="work" className="overflow-hidden" style={{ background: '#000000' }}>
      {/* Header */}
      <div className="work-label container mx-auto pt-section pb-12 opacity-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="w-8 h-px bg-red" />
            <span className="eyebrow">Selected Work</span>
          </div>
          <Link
            href="/work"
            className="hidden md:inline-flex items-center gap-2 text-neutral text-sm font-display font-bold tracking-widest uppercase hover:text-white group"
          >
            View all projects
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>

      {/* Pinned horizontal scroll wrapper — full height on desktop, auto on mobile */}
      <div ref={wrapperRef} className="w-full md:h-screen overflow-hidden">
        <div ref={trackRef} className="flex flex-col md:flex-row md:h-full will-change-transform">
          {/* Leading spacer — desktop only */}
          <div className="hidden md:block flex-shrink-0 w-[clamp(20px,5vw,80px)] h-full" />

          {/* Whatsub — static first card with real photo */}
          <WhatsubCard />

          {/* Cafe BDOOZ — static second card */}
          <CafeBdoozCard />

          {caseStudies.filter(cs => cs.title?.toLowerCase() !== 'al baraka').map((cs, i) => (
            <CaseStudyCard
              key={cs._id}
              cs={cs}
              index={i}
              gradient={gradients[i % gradients.length]}
            />
          ))}

          {/* End CTA card */}
          <div className="flex-shrink-0 w-full md:w-[480px] md:h-full flex items-center px-4 pb-10 md:px-0 md:pb-0 md:pr-[clamp(20px,5vw,80px)]">
            <Link
              href="/work"
              className="group w-full border border-white/15 rounded-2xl p-10 flex flex-col justify-between min-h-[480px] hover:border-red/40 will-change-transform"
              style={{ transition: 'border-color 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
            >
              <span className="eyebrow">All Projects</span>
              <div>
                <p className="text-display-sm text-white font-display font-black uppercase mb-6 leading-tight">
                  See the full body of work.
                </p>
                <div className="inline-flex items-center gap-3 text-red text-sm font-display font-bold tracking-widest uppercase group-hover:gap-5"
                  style={{ transition: 'gap 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
                >
                  Explore All
                  <span>→</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function WhatsubCard() {
  return (
    <div className="flex-shrink-0 w-full md:w-[420px] lg:w-[480px] md:h-full flex items-center px-4 py-6 md:py-0">
      <Link href="/portfolio/whatsub" className="block w-full work-card group">
        <div
          className="relative w-full rounded-2xl overflow-hidden will-change-transform"
          style={{
            height: 'min(520px, 72vh)',
            transform: 'translateZ(0)',
            transition: 'transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.transform = 'translateZ(0) scale(1.02)'
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.transform = 'translateZ(0) scale(1)'
          }}
        >
          {/* Real photo background */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img loading="lazy"
            src="/images/work/whatsub/mural.jpg"
            alt="Whatsub"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          />

          {/* Dark gradient overlay for legibility */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.65) 100%)' }}
          />

          {/* Red dot brand mark */}
          <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-red/20 border border-red/40 flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-red" />
          </div>

          {/* Bottom info */}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <p className="eyebrow mb-2">Brand Identity · 2025</p>
            <h3
              className="text-white font-display font-black text-2xl md:text-3xl uppercase mb-2 leading-none"
              style={{ transition: 'color 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
            >
              Whatsub
            </h3>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs font-sans">
              Full brand identity for a D.C. sub sandwich brand
            </p>
          </div>

          {/* Hover overlay */}
          <div className="work-card-overlay rounded-2xl">
            <span className="text-white font-display font-black text-xl uppercase tracking-widest">
              View Project →
            </span>
          </div>
        </div>
      </Link>
    </div>
  )
}

function CafeBdoozCard() {
  return (
    <div className="flex-shrink-0 w-full md:w-[420px] lg:w-[480px] md:h-full flex items-center px-4 py-6 md:py-0">
      <Link href="/portfolio/cafe-bdooz" className="block w-full work-card group">
        <div
          className="relative w-full rounded-2xl overflow-hidden will-change-transform"
          style={{
            height: 'min(520px, 72vh)',
            transform: 'translateZ(0)',
            transition: 'transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.transform = 'translateZ(0) scale(1.02)'
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.transform = 'translateZ(0) scale(1)'
          }}
        >
          {/* Real photo background */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img loading="lazy"
            src="/images/work/cafe-bdooz/Cover-Bdooz.png"
            alt="Cafe BDOOZ"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          />

          {/* Dark gradient overlay */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.65) 100%)' }}
          />

          {/* Red dot brand mark */}
          <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-red/20 border border-red/40 flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-red" />
          </div>

          {/* Bottom info */}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <p className="eyebrow mb-2">Brand Identity · 2025</p>
            <h3
              className="text-white font-display font-black text-2xl md:text-3xl uppercase mb-2 leading-none"
              style={{ transition: 'color 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
            >
              Cafe BDOOZ
            </h3>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs font-sans">
              Brand identity for a Lebanese neighbourhood café
            </p>
          </div>

          {/* Hover overlay */}
          <div className="work-card-overlay rounded-2xl">
            <span className="text-white font-display font-black text-xl uppercase tracking-widest">
              View Project →
            </span>
          </div>
        </div>
      </Link>
    </div>
  )
}

function CaseStudyCard({
  cs,
  index,
  gradient,
}: {
  cs: CaseStudy
  index: number
  gradient: string[]
}) {
  return (
    <div className="flex-shrink-0 w-full md:w-[420px] lg:w-[480px] md:h-full flex items-center px-4 py-6 md:py-0">
      <Link href={`/work/${cs.slug.current}`} className="block w-full work-card group">
        <div
          className="relative w-full rounded-2xl overflow-hidden will-change-transform"
          style={{
            height: 'min(520px, 72vh)',
            transform: 'translateZ(0)',
            transition: 'transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.transform = 'translateZ(0) scale(1.02)'
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.transform = 'translateZ(0) scale(1)'
          }}
        >
          {/* Gradient background */}
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(135deg, ${gradient[0]} 0%, ${gradient[1]} 100%)` }}
          />

          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id={`grid-${index}`} width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#grid-${index})`} />
            </svg>
          </div>

          {/* Red dot brand mark */}
          <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-red/20 border border-red/40 flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-red" />
          </div>

          {/* Bottom info */}
          <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/70 to-transparent">
            <p className="eyebrow mb-2">
              {cs.category?.replace(/-/g, ' ')} · {cs.year}
            </p>
            <h3 className="text-white font-display font-black text-2xl md:text-3xl uppercase mb-2 leading-none"
              style={{ transition: 'color 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
            >
              {cs.title}
            </h3>
            {cs.tagline && (
              <p className="text-white/60 text-sm leading-relaxed max-w-xs font-sans">{cs.tagline}</p>
            )}
          </div>

          {/* Red hover overlay — clean, no blur */}
          <div className="work-card-overlay rounded-2xl">
            <span className="text-white font-display font-black text-xl uppercase tracking-widest">
              View Project →
            </span>
          </div>
        </div>
      </Link>
    </div>
  )
}
