'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { PROJECTS, type Project, type ProjectImage } from '@/lib/projects'

// ─── Constants ────────────────────────────────────────────────────────────────
const PP   = "'PPNeueCorp', system-ui, sans-serif"
const EASE = 'cubic-bezier(0.76, 0, 0.24, 1)'

interface Props {
  project:      Project
  nextProject:  Project
  prevProject:  Project
  currentIndex: number
}

function EyeIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function LinesIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="16" viewBox="0 0 24 18" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round">
      <line x1="2" y1="2"  x2="22" y2="2" />
      <line x1="2" y1="9"  x2="17" y2="9" />
      <line x1="2" y1="16" x2="13" y2="16" />
    </svg>
  )
}

export default function PortfolioProjectClient({
  project, nextProject, prevProject, currentIndex,
}: Props) {
  const [view,         setView]         = useState<'visual' | 'reading'>('visual')
  const [pillMaskX,    setPillMaskX]    = useState(0)
  const [pillMaskW,    setPillMaskW]    = useState(0)
  const [pillScrolled, setPillScrolled] = useState(false)
  const [nextProgress, setNextProgress] = useState(0)
  const [navigating,   setNavigating]   = useState(false)

  const pillTabRefs    = useRef<(HTMLButtonElement | null)[]>([])
  const nextSectionRef = useRef<HTMLDivElement>(null)
  const titleRef       = useRef<HTMLDivElement>(null)
  const bigTextRef     = useRef<HTMLDivElement>(null)
  const servicesRef    = useRef<HTMLDivElement>(null)
  const router         = useRouter()
  const navTriggered   = useRef(false)

  // ── Hero entrance animation (clip reveal, same as TextReveal) ────────────
  useGSAP(() => {
    // Title — treat as single unit, clip from below
    if (titleRef.current) {
      const el = titleRef.current
      el.innerHTML = `<span class="clip-text" style="display:block"><span class="reveal-unit" style="display:block">${project.title}</span></span>`
      gsap.fromTo(
        el.querySelector('.reveal-unit'),
        { yPercent: 110 },
        { yPercent: 0, duration: 1.0, ease: 'power4.out', delay: 0.3 }
      )
    }

    // Big text — each heroLine (or full headline) reveals as a clipped line
    if (bigTextRef.current) {
      const el    = bigTextRef.current
      const lines = project.heroLines ?? [project.brief.headline]
      el.innerHTML = lines
        .map(line => `<div class="clip-text"><div class="reveal-unit" style="display:block">${line}</div></div>`)
        .join('')
      gsap.fromTo(
        el.querySelectorAll('.reveal-unit'),
        { yPercent: 110 },
        { yPercent: 0, duration: 1.0, ease: 'power4.out', stagger: 0.08, delay: 0.45 }
      )
    }

    // Services — simple fade up
    if (servicesRef.current) {
      gsap.fromTo(
        servicesRef.current,
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 1.0 }
      )
    }
  }, { dependencies: [project.title, project.brief.headline] })

  const images: ProjectImage[] = project.images?.length
    ? project.images
    : [{ src: project.coverImage }]

  // ── Pill slider mask: update on view change ───────────────────────────────
  useEffect(() => {
    const idx = view === 'visual' ? 0 : 1
    const el  = pillTabRefs.current[idx]
    if (!el || !el.parentElement) return
    const pRect = el.parentElement.getBoundingClientRect()
    const eRect = el.getBoundingClientRect()
    setPillMaskX(eRect.left - pRect.left)
    setPillMaskW(eRect.width)
  }, [view])

  // ── Pill slider mask: init on mount ──────────────────────────────────────
  useEffect(() => {
    const el = pillTabRefs.current[0]
    if (!el || !el.parentElement) return
    const pRect = el.parentElement.getBoundingClientRect()
    const eRect = el.getBoundingClientRect()
    setPillMaskX(eRect.left - pRect.left)
    setPillMaskW(eRect.width)
  }, [])

  // ── Combined scroll handler ───────────────────────────────────────────────
  useEffect(() => {
    const handle = () => {
      const vh = window.innerHeight

      // 1. Show vertical pill once user has scrolled past the hero
      setPillScrolled(window.scrollY > vh * 0.85)

      // 2. Next-project progress bar + auto-navigate
      if (nextSectionRef.current && !navTriggered.current) {
        const rect     = nextSectionRef.current.getBoundingClientRect()
        // fills 0→1 as the section scrolls from off-screen bottom to 55% in viewport
        const progress = Math.max(0, Math.min(1, (vh - rect.top) / (vh * 0.55)))
        setNextProgress(progress)

        if (progress >= 1) {
          navTriggered.current = true
          setNavigating(true)
          setTimeout(() => router.push(`/portfolio/${nextProject.id}`), 650)
        }
      }
    }

    window.addEventListener('scroll', handle, { passive: true })
    return () => window.removeEventListener('scroll', handle)
  }, [nextProject.id, router])

  const detailRows = [
    { label: 'Type',     value: project.details.type },
    { label: 'Category', value: project.details.category },
    { label: 'Year',     value: project.details.year },
    { label: 'Scope',    value: project.details.scope },
  ]

  // ── Shared pill JSX (reused in hero bottom-bar and fixed sidebar) ─────────
  const PillToggle = ({ tabRefs }: { tabRefs?: React.MutableRefObject<(HTMLButtonElement | null)[]> }) => (
    <div style={{
      position:     'relative',
      background:   'white',
      borderRadius: 9999,
      padding:      8,
      display:      'flex',
      alignItems:   'center',
    }}>
      <div style={{
        position:      'absolute',
        top:           8,
        left:          pillMaskX + 8,
        width:         pillMaskW,
        height:        'calc(100% - 16px)',
        background:    'black',
        borderRadius:  9999,
        transition:    `left 400ms ${EASE}, width 400ms ${EASE}`,
        pointerEvents: 'none',
        zIndex:        0,
      }} />
      {(['visual', 'reading'] as const).map((v, i) => (
        <button
          key={v}
          ref={tabRefs ? el => { tabRefs.current[i] = el } : undefined}
          onClick={() => setView(v)}
          style={{
            position:     'relative',
            zIndex:       1,
            height:       55,
            padding:      '0 35px',
            background:   'transparent',
            border:       'none',
            borderRadius: 9999,
            fontFamily:   PP,
            fontWeight:   400,
            fontSize:     17,
            color:        view === v ? 'white' : 'black',
            transition:   `color 400ms ${EASE}`,
            whiteSpace:   'nowrap',
            cursor:       'pointer',
          }}
        >
          {v === 'visual' ? 'Visual view' : 'Reading view'}
        </button>
      ))}
    </div>
  )

  return (
    <div style={{ background: '#000', minHeight: '100vh' }}>

      {/* ── Transition overlay — fades to black before navigating ── */}
      <div style={{
        position:   'fixed',
        inset:       0,
        background:  '#000',
        zIndex:      100,
        opacity:     navigating ? 1 : 0,
        transition:  'opacity 600ms cubic-bezier(0.76,0,0.24,1)',
        pointerEvents: navigating ? 'all' : 'none',
      }} />

      {/* ════════════════════════════════════════════════════════════════
          HERO — 100vh
      ════════════════════════════════════════════════════════════════ */}
      <section style={{
        position:      'relative',
        height:        '100vh',
        overflow:      'hidden',
        background:    '#000',
        display:       'flex',
        flexDirection: 'column',
      }}>

        {/* Cover image — more visible, no heavy overlay */}
        <Image
          src={project.coverImage}
          alt={project.title}
          fill priority sizes="100vw"
          style={{ objectFit: 'cover', opacity: 0.82 }}
        />

        {/* Subtle bottom-only gradient — just enough for bottom bar legibility */}
        <div style={{
          position:      'absolute',
          inset:         0,
          background:    'linear-gradient(to bottom, rgba(0,0,0,0.10) 0%, transparent 50%, rgba(0,0,0,0.72) 100%)',
          zIndex:        1,
          pointerEvents: 'none',
        }} />

        {/* ── Content block: all left-aligned with logo (5vw), shifted down 20% ── */}
        <div style={{
          position:  'absolute',
          top:       '65%',
          left:      '5vw',
          right:     '35%',
          transform: 'translateY(-50%)',
          zIndex:    2,
        }}>
          {/* WHATSUB title — ultrabold 900, 10% bigger, right above big text */}
          <div
            ref={titleRef}
            aria-label={project.title}
            style={{
              fontFamily:    PP,
              fontWeight:    900,
              fontSize:      'clamp(40px, 5vw, 70px)',
              color:         'white',
              textTransform: 'uppercase',
              letterSpacing: '-1.5px',
              lineHeight:    1,
              marginBottom:  16,
            }}
          >
            {project.title}
          </div>

          {/* Big statement — medium 500, 38px, line breaks via heroLines */}
          <div
            ref={bigTextRef}
            aria-label={project.brief.headline}
            style={{
              fontFamily:    PP,
              fontWeight:    500,
              fontSize:      38,
              color:         'white',
              lineHeight:    1.18,
              letterSpacing: '-0.3px',
              margin:        '0 0 28px',
            }}
          >
            {project.brief.headline}
          </div>

          {/* Services row */}
          <div ref={servicesRef} style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 0' }}>
            {project.services.map((s, i) => (
              <span key={s} style={{
                fontFamily:    PP,
                fontWeight:    400,
                fontSize:      11,
                letterSpacing: '3px',
                textTransform: 'uppercase',
                color:         'rgba(255,255,255,0.5)',
                whiteSpace:    'nowrap',
              }}>
                {s}{i < project.services.length - 1 && (
                  <span style={{ margin: '0 12px', opacity: 0.3 }}>·</span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* ── Bottom bar: left-aligned to 5vw (matches logo + content block) ── */}
        <div style={{
          position:       'absolute',
          bottom:         0,
          left:           0,
          right:          0,
          zIndex:         2,
          padding:        '0 5vw 44px',
          display:        'flex',
          justifyContent: 'space-between',
          alignItems:     'flex-end',
        }}>

          {/* Left: (SCROLL) — 15% bigger, white */}
          <span style={{
            fontFamily:    PP,
            fontWeight:    400,
            fontSize:      12,
            letterSpacing: '5px',
            textTransform: 'uppercase',
            color:         'white',
          }}>
            (Scroll)
          </span>

          {/* Right: pill — 10% bigger, right-aligned to 5vw */}
          <PillToggle tabRefs={pillTabRefs} />

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          CONTENT — keyed so React remounts on switch
      ════════════════════════════════════════════════════════════════ */}
      <div key={view} style={{ animation: 'viewEnter 500ms cubic-bezier(0.19,1,0.22,1) forwards' }}>

        {/* ── VISUAL VIEW ── */}
        {view === 'visual' && (
          <div style={{
            background:    '#000',
            paddingTop:    120,
            paddingBottom: 160,
            paddingLeft:   40,
            paddingRight:  40,
          }}>
            {images.map((img, i) => (
              <div key={i} style={{
                position:     'relative',
                paddingTop:   img.portrait ? '130%' : '70%',
                marginBottom: 16,
                marginLeft:   -40,
                marginRight:  -40,
                overflow:     'hidden',
              }}>
                <Image
                  src={img.src}
                  alt={`${project.title} ${i + 1}`}
                  fill sizes="100vw"
                  style={{ objectFit: 'cover' }}
                  loading={i < 2 ? 'eager' : 'lazy'}
                />
              </div>
            ))}
          </div>
        )}

        {/* ── READING VIEW ── */}
        {view === 'reading' && (
          <section style={{ background: '#000', padding: '0 40px' }}>
            <div style={{
              display:             'grid',
              gridTemplateColumns: '1fr 1fr',
              gap:                 0,
              alignItems:          'start',
            }}>

              {/* LEFT — image stack */}
              <div style={{ paddingRight: 24, paddingTop: 120 }}>
                {images.map((img, i) => (
                  <div key={i} style={{
                    position:     'relative',
                    paddingTop:   img.portrait ? '130%' : '70%',
                    marginBottom: 16,
                    overflow:     'hidden',
                  }}>
                    <Image
                      src={img.src}
                      alt=""
                      fill sizes="50vw"
                      style={{ objectFit: 'cover' }}
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>

              {/* RIGHT — 4 narrative sections */}
              <div style={{ paddingLeft: 80 }}>
                {([
                  { num: '(01)', label: 'The Brief',     section: project.brief,     showDetails: true  },
                  { num: '(02)', label: 'The Diagnosis', section: project.diagnosis, showDetails: false },
                  { num: '(03)', label: 'What We Built', section: project.built,     showDetails: false },
                  { num: '(04)', label: 'The Result',    section: project.result,    showDetails: false },
                ] as const).map(({ num, label, section, showDetails }, i) => (
                  <div key={num} style={{
                    paddingTop:    236,
                    paddingBottom: 260,
                    borderTop:     i === 0 ? 'none' : '1px solid rgba(255,255,255,0.06)',
                  }}>
                    <p style={{
                      fontFamily:    PP,
                      fontWeight:    400,
                      fontSize:      13,
                      letterSpacing: '2px',
                      textTransform: 'uppercase',
                      color:         'rgba(255,255,255,0.3)',
                      margin:        '0 0 40px',
                    }}>
                      {num} — {label}
                    </p>
                    <h3 style={{
                      fontFamily:    PP,
                      fontWeight:    900,
                      fontSize:      'clamp(22px, 2.8vw, 36px)',
                      color:         'white',
                      lineHeight:    1.1,
                      letterSpacing: '-0.5px',
                      margin:        '0 0 32px',
                      textTransform: 'uppercase',
                    }}>
                      {section.headline}
                    </h3>
                    <p style={{
                      fontFamily: PP,
                      fontWeight: 400,
                      fontSize:   16,
                      color:      'rgba(255,255,255,0.5)',
                      lineHeight: 1.75,
                      margin:     0,
                    }}>
                      {section.body}
                    </p>
                    {showDetails && (
                      <div style={{
                        borderTop:           '1px solid rgba(255,255,255,0.06)',
                        marginTop:           48,
                        paddingTop:          32,
                        display:             'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap:                 '24px 16px',
                      }}>
                        {detailRows.map(row => (
                          <div key={row.label}>
                            <span style={{
                              fontFamily:    PP,
                              fontWeight:    400,
                              fontSize:      10,
                              letterSpacing: '3px',
                              textTransform: 'uppercase',
                              color:         'rgba(255,255,255,0.25)',
                              display:       'block',
                              marginBottom:  6,
                            }}>
                              {row.label}
                            </span>
                            <span style={{
                              fontFamily: PP,
                              fontWeight: 400,
                              fontSize:   13,
                              color:      'rgba(255,255,255,0.6)',
                            }}>
                              {row.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

            </div>
          </section>
        )}

      </div>

      {/* ════════════════════════════════════════════════════════════════
          NEXT PROJECT — scroll-driven progress bar navigates automatically
      ════════════════════════════════════════════════════════════════ */}
      <div
        ref={nextSectionRef}
        style={{
          height:         '100vh',
          background:     '#000',
          position:       'relative',
          overflow:       'hidden',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
        }}
      >
        <Image
          src={nextProject.coverImage}
          alt={nextProject.title}
          fill sizes="100vw"
          style={{
            objectFit: 'cover',
            opacity:   0.2 + nextProgress * 0.25,
            transform: `scale(${1 + nextProgress * 0.04})`,
            transition: 'transform 100ms linear',
          }}
          loading="lazy"
        />

        {/* Dark overlay that lifts as progress fills */}
        <div style={{
          position:      'absolute',
          inset:         0,
          background:    `rgba(0,0,0,${0.55 - nextProgress * 0.3})`,
          zIndex:        1,
          pointerEvents: 'none',
          transition:    'background 100ms linear',
        }} />

        {/* Center content */}
        <div style={{
          position:  'relative',
          zIndex:    2,
          textAlign: 'center',
          opacity:   0.4 + nextProgress * 0.6,
          transform: `translateY(${(1 - nextProgress) * 16}px)`,
          transition: 'opacity 100ms linear, transform 100ms linear',
        }}>
          <p style={{
            fontFamily:    PP,
            fontWeight:    400,
            fontSize:      11,
            letterSpacing: '5px',
            textTransform: 'uppercase',
            color:         'rgba(255,255,255,0.35)',
            margin:        '0 0 20px',
          }}>
            Next Project
          </p>
          <h2 style={{
            fontFamily:    PP,
            fontWeight:    900,
            fontSize:      'clamp(40px, 6vw, 80px)',
            color:         'white',
            letterSpacing: '-2px',
            lineHeight:    1,
            margin:        '0 0 12px',
            textTransform: 'uppercase',
          }}>
            {nextProject.title}
          </h2>
          <p style={{
            fontFamily: PP,
            fontWeight: 400,
            fontSize:   14,
            color:      'rgba(255,255,255,0.4)',
            margin:     0,
          }}>
            {nextProject.tagline}
          </p>
        </div>

        {/* ── Progress bar — fills as you scroll into this section ── */}
        <div style={{
          position:  'absolute',
          bottom:    0,
          left:      0,
          height:    2,
          width:     `${nextProgress * 100}%`,
          background: 'white',
          zIndex:    10,
          transition: 'width 80ms linear',
        }} />

        {/* Bottom left: counter */}
        <div style={{
          position:      'absolute',
          bottom:        40,
          left:          40,
          zIndex:        3,
          fontFamily:    PP,
          fontWeight:    400,
          fontSize:      11,
          letterSpacing: '3px',
          color:         'rgba(255,255,255,0.25)',
        }}>
          <span style={{ opacity: 0.5 }}>{String(currentIndex + 1).padStart(2, '0')}</span>
          {' / '}
          {String(PROJECTS.length).padStart(2, '0')}
        </div>

        {/* Bottom right: prev / next arrows */}
        <div style={{
          position: 'absolute',
          bottom:   40,
          right:    40,
          display:  'flex',
          gap:      20,
          zIndex:   3,
        }}>
          <Link
            href={`/portfolio/${prevProject.id}`}
            style={{ color: 'rgba(255,255,255,0.3)', fontSize: 22, textDecoration: 'none' }}
          >←</Link>
          <Link
            href={`/portfolio/${nextProject.id}`}
            style={{ color: 'white', fontSize: 22, textDecoration: 'none' }}
          >→</Link>
        </div>

      </div>

      {/* ════════════════════════════════════════════════════════════════
          VERTICAL PILL — hidden at top, appears after scrolling past hero
      ════════════════════════════════════════════════════════════════ */}
      <div style={{
        position:       'fixed',
        bottom:         30,
        right:          44,
        zIndex:         40,
        background:     'white',
        borderRadius:   9999,
        width:          60,
        height:         110,
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        justifyContent: 'space-between',
        padding:        7,
        boxShadow:      '0 4px 24px rgba(0,0,0,0.15)',
        opacity:        pillScrolled ? 1 : 0,
        transform:      pillScrolled ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.95)',
        transition:     'opacity 400ms cubic-bezier(0.76,0,0.24,1), transform 400ms cubic-bezier(0.76,0,0.24,1)',
        pointerEvents:  pillScrolled ? 'auto' : 'none',
      }}>
        <button
          onClick={() => setView('visual')}
          aria-label="Visual view"
          style={{
            width:          46,
            height:         46,
            borderRadius:   '50%',
            background:     view === 'visual' ? 'black' : 'transparent',
            border:         'none',
            cursor:         'pointer',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            transition:     'background 300ms ease',
            flexShrink:     0,
          }}
        >
          <EyeIcon color={view === 'visual' ? 'white' : 'rgba(0,0,0,0.35)'} />
        </button>
        <button
          onClick={() => setView('reading')}
          aria-label="Reading view"
          style={{
            width:          46,
            height:         46,
            borderRadius:   '50%',
            background:     view === 'reading' ? 'black' : 'transparent',
            border:         'none',
            cursor:         'pointer',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            transition:     'background 300ms ease',
            flexShrink:     0,
          }}
        >
          <LinesIcon color={view === 'reading' ? 'white' : 'rgba(0,0,0,0.35)'} />
        </button>
      </div>

    </div>
  )
}
