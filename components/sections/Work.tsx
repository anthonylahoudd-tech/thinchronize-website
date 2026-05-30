'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { PROJECTS } from '@/lib/projects'
import type { CaseStudy } from '@/lib/sanity/queries'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  caseStudies: CaseStudy[]
}

export default function Work({ caseStudies: _ }: Props) {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef   = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.fromTo(
        '.work-label',
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
        }
      )

      const track   = trackRef.current
      const wrapper = wrapperRef.current
      if (!track || !wrapper) return

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
            pin: true, scrub: 1.2, invalidateOnRefresh: true, anticipatePin: 1,
          },
        })
        return () => {
          tween.kill()
          ScrollTrigger.getAll().forEach(t => { if (t.vars.trigger === wrapper) t.kill() })
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
            href="/portfolio"
            className="hidden md:inline-flex items-center gap-2 text-neutral text-sm font-display font-bold tracking-widest uppercase hover:text-white group"
          >
            View all projects
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>

      {/* Pinned horizontal scroll */}
      <div ref={wrapperRef} className="w-full md:h-screen overflow-hidden">
        <div ref={trackRef} className="flex flex-col md:flex-row md:h-full will-change-transform">
          {/* Leading spacer — desktop only */}
          <div className="hidden md:block flex-shrink-0 w-[clamp(20px,5vw,80px)] h-full" />

          {PROJECTS.map(project => (
            <WorkCard
              key={project.id}
              href={`/portfolio/${project.id}`}
              image={project.coverImage}
              title={project.title}
              tagline={project.subtitle}
              category={project.category}
              year={project.year}
            />
          ))}

          {/* End CTA card */}
          <div className="flex-shrink-0 w-full md:w-[480px] md:h-full flex items-center px-4 pb-10 md:px-0 md:pb-0 md:pr-[clamp(20px,5vw,80px)]">
            <Link
              href="/portfolio"
              className="group w-full border border-white/15 rounded-2xl p-10 flex flex-col justify-between min-h-[480px] hover:border-red/40 will-change-transform"
              style={{ transition: 'border-color 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
            >
              <span className="eyebrow">All Projects</span>
              <div>
                <p className="text-display-sm text-white font-display font-black uppercase mb-6 leading-tight">
                  See the full body of work.
                </p>
                <div
                  className="inline-flex items-center gap-3 text-red text-sm font-display font-bold tracking-widest uppercase group-hover:gap-5"
                  style={{ transition: 'gap 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
                >
                  Explore All <span>→</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function WorkCard({
  href, image, title, tagline, category, year,
}: {
  href: string
  image: string
  title: string
  tagline: string
  category: string
  year: string
}) {
  return (
    <div className="flex-shrink-0 w-full md:w-[420px] lg:w-[480px] md:h-full flex items-center px-4 py-6 md:py-0">
      <Link href={href} className="block w-full work-card group">
        <div
          className="relative w-full rounded-2xl overflow-hidden will-change-transform"
          style={{
            height: 'min(520px, 72vh)',
            transform: 'translateZ(0)',
            transition: 'transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateZ(0) scale(1.02)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateZ(0) scale(1)' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            loading="lazy"
            src={image}
            alt={title}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
          />

          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.65) 100%)' }} />

          <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-red/20 border border-red/40 flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-red" />
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-8">
            <p className="eyebrow mb-2">{category} · {year}</p>
            <h3
              className="text-white font-display font-black text-2xl md:text-3xl uppercase mb-2 leading-none"
              style={{ transition: 'color 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
            >
              {title}
            </h3>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs font-sans">{tagline}</p>
          </div>

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
