'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { type Project, type ProjectImage } from '@/lib/projects'

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
  project, nextProject,
}: Props) {
  const [view,         setView]         = useState<'visual' | 'reading'>('reading')
  const [pillMaskX,    setPillMaskX]    = useState(0)
  const [pillMaskW,    setPillMaskW]    = useState(0)
  const [pillScrolled, setPillScrolled] = useState(false)
  const [nextProgress,    setNextProgress]    = useState(0)
  const [navigating,      setNavigating]      = useState(false)
  const [projectProgress, setProjectProgress] = useState(0)
  const [heroParallax,    setHeroParallax]    = useState(0)
  const [showScrollHint,  setShowScrollHint]  = useState(true)

  const pillTabRefs    = useRef<(HTMLButtonElement | null)[]>([])
  const nextSectionRef = useRef<HTMLDivElement>(null)
  const titleRef       = useRef<HTMLDivElement>(null)
  const bigTextRef     = useRef<HTMLDivElement>(null)
  const servicesRef    = useRef<HTMLDivElement>(null)
  const leftColRef     = useRef<HTMLDivElement>(null)
  const rightColRef    = useRef<HTMLDivElement>(null)
  const router         = useRouter()
  const navTriggered    = useRef(false)
  const nextProgressRef = useRef(0)
  const gateActive      = useRef(false) // true once gate fills viewport — Lenis stopped

  // ── Hero entrance animation (clip reveal, same as TextReveal) ────────────
  useGSAP(() => {
    // Title — single clip reveal, font-weight/family explicit on span
    if (titleRef.current) {
      const el = titleRef.current
      el.innerHTML = `<span class="clip-text" style="display:block"><span class="reveal-unit" style="display:block;font-family:'PPNeueCorp',system-ui,sans-serif;font-weight:900">${project.title}</span></span>`
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

  // Reading view: use readingImages if provided, otherwise all images
  const readingViewImages = project.readingImages ?? images

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

  // ── "Scroll to explore" hint — fades after 2 s or first scroll ──────────
  useEffect(() => {
    const t = setTimeout(() => setShowScrollHint(false), 2000)
    return () => clearTimeout(t)
  }, [])

  // ── Restore header on unmount ─────────────────────────────────────────────
  useEffect(() => {
    return () => {
      const h = document.querySelector('[data-site-header]') as HTMLElement | null
      if (h) h.style.opacity = '1'
    }
  }, [])

  // ── Scroll handler — pill, progress bar, header fade, Lenis gate lock ───────
  useEffect(() => {
    type LenisWin = { lenis?: { stop: () => void; start: () => void } }

    const handle = () => {
      const sy = window.scrollY
      const vh = window.innerHeight
      setPillScrolled(sy > vh * 1.1)
      if (sy > 20) setShowScrollHint(false)
      setHeroParallax(Math.min(sy * 0.15, vh * 0.15))

      const contentHeight = Math.max(1, document.body.scrollHeight - 2 * vh)
      setProjectProgress(Math.max(0, Math.min(1, sy / contentHeight)))

      if (!nextSectionRef.current) return
      const rect      = nextSectionRef.current.getBoundingClientRect()
      const fadeStart = vh * 1.5
      const opacity   = Math.max(0, Math.min(1, rect.top / fadeStart))
      const h = document.querySelector('[data-site-header]') as HTMLElement | null
      if (h) h.style.opacity = String(opacity)

      // Gate arrived — freeze Lenis so page cannot scroll further
      if (!gateActive.current && rect.top <= 5) {
        gateActive.current = true
        ;(window as unknown as LenisWin).lenis?.stop()
      }

      // Gate left (user scrolled back) — resume Lenis, reset progress
      if (gateActive.current && rect.top > 50) {
        gateActive.current = false
        ;(window as unknown as LenisWin).lenis?.start()
        nextProgressRef.current = 0
        setNextProgress(0)
      }
    }
    window.addEventListener('scroll', handle, { passive: true })
    return () => {
      window.removeEventListener('scroll', handle)
      // Always restore Lenis on unmount (e.g. navigation)
      ;(window as unknown as LenisWin).lenis?.start()
    }
  }, [])

  // ── Wheel handler — drives gate cover while Lenis is frozen ───────────────
  useEffect(() => {
    const WHEEL_TOTAL = 3000

    const handle = (e: WheelEvent) => {
      if (!gateActive.current || navTriggered.current) return
      // Ignore scroll-up (let Lenis handle going back once it's re-enabled)
      if (e.deltaY <= 0) return

      const newProg = Math.min(1, nextProgressRef.current + e.deltaY / WHEEL_TOTAL)
      nextProgressRef.current = newProg
      setNextProgress(newProg)

      if (newProg >= 1) {
        navTriggered.current = true
        setNavigating(true)
        setTimeout(() => router.push(`/portfolio/${nextProject.id}`), 650)
      }
    }
    window.addEventListener('wheel', handle, { passive: true })
    return () => window.removeEventListener('wheel', handle)
  }, [nextProject.id, router])

  // ── Right column min-height = left column height so sticky last section works ─
  useEffect(() => {
    if (view !== 'reading') return
    const sync = () => {
      if (!leftColRef.current || !rightColRef.current) return
      rightColRef.current.style.minHeight = `${leftColRef.current.offsetHeight}px`
    }
    sync()
    window.addEventListener('resize', sync)
    return () => window.removeEventListener('resize', sync)
  }, [view])

  const detailRows = [
    { label: 'Type',     value: project.details.type },
    { label: 'Category', value: project.details.category },
    { label: 'Year',     value: project.details.year },
    { label: 'Scope',    value: project.details.scope },
  ]

  // ── Inline pill JSX — NOT a sub-component (sub-components remount on every
  //    render, destroying the DOM node and killing the CSS transition)
  const pillJSX = (
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
        left:          pillMaskX,
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
          ref={el => { pillTabRefs.current[i] = el }}
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
          HERO — 140vh outer.
          Image + gradient: absolute, cover full 140vh (no black gap).
          Content (banner + text): absolute 100vh, scrolls naturally off.
          Sticky: ONLY pill + (Scroll) bar — stays locked at viewport bottom.
      ════════════════════════════════════════════════════════════════ */}
      <section style={{ height: '140vh', position: 'relative', overflow: 'hidden', background: '#000' }}>

        {/* ── Image — covers full 140vh, scrolls with section ── */}
        <div style={{
          position:   'absolute',
          top: '-15%', left: 0, right: 0, bottom: '-15%',
          transform:  `translateY(${heroParallax}px)`,
          willChange: 'transform',
        }}>
          <Image
            src={project.coverImage}
            alt={project.title}
            fill priority sizes="100vw"
            style={{ objectFit: 'cover', opacity: 0.82 }}
          />
        </div>

        {/* ── Gradient — covers full 140vh ── */}
        <div style={{
          position:      'absolute',
          inset:          0,
          background:    'linear-gradient(to bottom, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.30) 18%, transparent 42%, rgba(0,0,0,0.72) 100%)',
          zIndex:         1,
          pointerEvents: 'none',
        }} />

        {/* ── Content: banner + text — flex column, same layout as PageHero ── */}
        <div style={{
          position:      'absolute',
          top:            0,
          left:           0,
          right:          0,
          height:        '100vh',
          zIndex:         2,
          display:       'flex',
          flexDirection: 'column',
          paddingTop:    'calc(96px + 3vh)',
          overflow:      'hidden',
        }}>

          {/* Hero animated banner (project with location) */}
          {project.location && (
            <div style={{ overflow: 'hidden', flexShrink: 0 }}>
              <div className="page-marquee-track">
                <span style={{
                  fontFamily:    PP,
                  fontWeight:    900,
                  fontSize:      'clamp(88px, 13vw, 185px)',
                  color:         'white',
                  textTransform: 'uppercase',
                  letterSpacing: '-4px',
                  lineHeight:    0.9,
                  whiteSpace:    'nowrap',
                  opacity:       0.95,
                }}>
                  {`${project.title} * ${project.location} * ${project.title} * ${project.location} * ${project.title} * ${project.location} * `}
                  {`${project.title} * ${project.location} * ${project.title} * ${project.location} * ${project.title} * ${project.location} * `}
                </span>
              </div>
            </div>
          )}

          {/* Content block: title if no location, big text, services */}
          <div style={{
            padding:  '44px 5vw 0',
            flexShrink: 0,
          }}>
            {!project.location && (
              <div
                ref={titleRef}
                aria-label={project.title}
                style={{
                  fontFamily:    PP,
                  fontWeight:    900,
                  fontSize:      'clamp(46px, 5.75vw, 80px)',
                  color:         'white',
                  textTransform: 'uppercase',
                  letterSpacing: '-1.5px',
                  lineHeight:    1,
                  marginBottom:  16,
                }}
              />
            )}
            {project.location && (
              <div ref={titleRef} style={{ display: 'none' }} aria-hidden />
            )}

            <div
              ref={bigTextRef}
              aria-label={project.brief.headline}
              style={{
                fontFamily:    PP,
                fontWeight:    400,
                fontSize:      'clamp(22px, 3vw, 42px)',
                color:         'white',
                lineHeight:    1.25,
                letterSpacing: '-0.5px',
                margin:        '0 0 28px',
              }}
            >
              {project.brief.headline}
            </div>

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

          {/* ── Pill + (Scroll) — bottom of content div, scrolls naturally with cover ── */}
          <div style={{
            marginTop:      'auto',
            padding:        '0 5vw 44px',
            display:        'flex',
            justifyContent: 'space-between',
            alignItems:     'flex-end',
            flexShrink:      0,
          }}>
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
            {pillJSX}
          </div>

        </div>{/* end content block */}

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

        {/* ── READING VIEW — Motto-style: off-white bg, dark text, editorial ── */}
        {view === 'reading' && (
          <section style={{ background: '#ECECEA' }}>
            <div style={{
              display:             'grid',
              gridTemplateColumns: '1fr 1fr',
              gap:                 0,
              alignItems:          'stretch',   // right column stretches to match image height
            }}>

              {/* LEFT — images, curated subset so scroll ends when text ends */}
              <div ref={leftColRef} style={{ paddingTop: 100, paddingBottom: 200 }}>
                {readingViewImages.map((img, i) => (
                  <div key={i} style={{
                    position:     'relative',
                    paddingTop:   img.portrait ? '130%' : '70%',
                    marginBottom: 8,
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

              {/* RIGHT — sections scroll naturally; last section goes sticky */}
              <div ref={rightColRef} style={{ paddingLeft: '6vw', paddingRight: '5vw', position: 'relative' }}>
                {([
                  { num: '(01)', label: 'The Brief',     section: project.brief,     showDetails: true  },
                  { num: '(02)', label: 'The Diagnosis', section: project.diagnosis, showDetails: false },
                  { num: '(03)', label: 'What We Built', section: project.built,     showDetails: false },
                  { num: '(04)', label: 'The Result',    section: project.result,    showDetails: false },
                ] as const).map(({ num, label, section, showDetails }, i) => (
                  <div key={num} style={{
                    paddingTop:    i === 3 ? 80  : 200,
                    paddingBottom: i === 3 ? 100 : 220,
                    borderTop:     i === 0 ? 'none' : '1px solid rgba(0,0,0,0.1)',
                    // Last section: sticks so right col doesn't go blank while
                    // images continue on the left. Reduced padding keeps it
                    // within viewport height so it visually locks in place.
                    ...(i === 3 ? {
                      position:   'sticky' as const,
                      top:        96,
                      background: '#ECECEA',
                      zIndex:     2,
                    } : {}),
                  }}>

                    {/* Number alone */}
                    <p style={{
                      fontFamily:    PP,
                      fontWeight:    400,
                      fontSize:      13,
                      color:         'rgba(0,0,0,0.35)',
                      margin:        '0 0 10px',
                      letterSpacing: '0.5px',
                    }}>
                      {num}
                    </p>

                    {/* Section label — medium weight, mixed case, no caps */}
                    <p style={{
                      fontFamily: PP,
                      fontWeight: 500,
                      fontSize:   15,
                      color:      'rgba(0,0,0,0.5)',
                      margin:     '0 0 52px',
                    }}>
                      {label}
                    </p>

                    {/* Headline — override global h3{uppercase 800} explicitly */}
                    <h3 style={{
                      fontFamily:    PP,
                      fontWeight:    400,
                      fontSize:      'clamp(40px, 5.5vw, 76px)',
                      color:         '#0f0f0f',
                      lineHeight:    1.05,
                      letterSpacing: '-1px',
                      margin:        '0 0 40px',
                      textTransform: 'none',
                    }}>
                      {section.headline}
                    </h3>

                    {/* Body */}
                    <p style={{
                      fontFamily: PP,
                      fontWeight: 400,
                      fontSize:   20,
                      color:      'rgba(0,0,0,0.55)',
                      lineHeight: 1.75,
                      margin:     0,
                    }}>
                      {section.body}
                    </p>

                    {/* What we did — bullet list */}
                    {section.deliverables && section.deliverables.length > 0 && (
                      <div style={{ marginTop: 48 }}>
                        <p style={{
                          fontFamily:    PP,
                          fontWeight:    500,
                          fontSize:      12,
                          letterSpacing: '2.5px',
                          textTransform: 'uppercase',
                          color:         'rgba(0,0,0,0.35)',
                          margin:        '0 0 20px',
                        }}>
                          (What we did)
                        </p>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                          {section.deliverables.map((item, di) => (
                            <li key={di} style={{
                              display:       'flex',
                              alignItems:    'baseline',
                              gap:           14,
                              paddingBottom: 12,
                              borderBottom:  di < section.deliverables!.length - 1
                                ? '1px solid rgba(0,0,0,0.07)'
                                : 'none',
                              marginBottom:  di < section.deliverables!.length - 1 ? 12 : 0,
                            }}>
                              <span style={{
                                width:           5,
                                height:          5,
                                borderRadius:    '50%',
                                background:      '#0f0f0f',
                                flexShrink:      0,
                                marginTop:       8,
                              }} />
                              <span style={{
                                fontFamily: PP,
                                fontWeight: 400,
                                fontSize:   18,
                                color:      'rgba(0,0,0,0.65)',
                                lineHeight: 1.5,
                              }}>
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Details grid — brief only */}
                    {showDetails && (
                      <div style={{
                        borderTop:           '1px solid rgba(0,0,0,0.09)',
                        marginTop:           52,
                        paddingTop:          36,
                        display:             'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap:                 '28px 16px',
                      }}>
                        {detailRows.map(row => (
                          <div key={row.label}>
                            <span style={{
                              fontFamily:    PP,
                              fontWeight:    400,
                              fontSize:      10,
                              letterSpacing: '3px',
                              textTransform: 'uppercase',
                              color:         'rgba(0,0,0,0.3)',
                              display:       'block',
                              marginBottom:  8,
                            }}>
                              {row.label}
                            </span>
                            <span style={{
                              fontFamily: PP,
                              fontWeight: 400,
                              fontSize:   14,
                              color:      'rgba(0,0,0,0.7)',
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
          CONVERTING CTA — full-width, after reading content
      ════════════════════════════════════════════════════════════════ */}
      <section style={{
        background: '#ECECEA',
        borderTop:  '1px solid rgba(0,0,0,0.08)',
        padding:    'clamp(100px, 12vh, 160px) 5vw',
      }}>
        <p style={{
          fontFamily:    PP,
          fontWeight:    400,
          fontSize:      12,
          letterSpacing: '3px',
          textTransform: 'uppercase',
          color:         'rgba(0,0,0,0.3)',
          margin:        '0 0 44px',
        }}>
          (Start a project)
        </p>

        <h2 style={{
          fontFamily:    PP,
          fontWeight:    900,
          fontSize:      'clamp(64px, 9vw, 128px)',
          color:         '#0f0f0f',
          letterSpacing: '-3px',
          lineHeight:    0.93,
          textTransform: 'uppercase',
          margin:        '0 0 60px',
        }}>
          Let's build<br />yours.
        </h2>

        <p style={{
          fontFamily: PP,
          fontWeight: 400,
          fontSize:   20,
          color:      'rgba(0,0,0,0.5)',
          lineHeight: 1.7,
          maxWidth:   540,
          margin:     '0 0 52px',
        }}>
          Every brand we've built started with one honest
          conversation. Ready to have it?
        </p>

        <Link
          href="/contact"
          style={{
            display:        'inline-flex',
            alignItems:     'center',
            gap:            14,
            fontFamily:     PP,
            fontWeight:     900,
            fontSize:       13,
            letterSpacing:  '4px',
            textTransform:  'uppercase',
            color:          '#0f0f0f',
            textDecoration: 'none',
            borderBottom:   '1px solid rgba(0,0,0,0.25)',
            paddingBottom:  6,
          }}
        >
          Let's Sync.
          <span style={{ fontSize: 18, letterSpacing: 0 }}>→</span>
        </Link>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          END OF PROJECT GATE — light bg (#ECECEA), snap on arrival.
          On snap: name slides up 15vh + cover peeks 15% from bottom.
          Scrolling then raises cover from 85%→0% translateY.
      ════════════════════════════════════════════════════════════════ */}
      <div ref={nextSectionRef} style={{
        height:   '100vh',
        position: 'relative',
        overflow: 'hidden',
        background: '#ECECEA',
      }}>
        <div style={{ position: 'relative', height: '100%' }}>

          {/* ── "Keep scrolling" + progress bar — fixed on top of everything ── */}
          <div style={{
            position:   'absolute',
            top:        '28%',
            left:       '5vw',
            right:      '5vw',
            zIndex:     5,
            display:    'flex',
            alignItems: 'center',
            gap:        32,
            transform:  'translateY(-50%)',
          }}>
            <p style={{
              fontFamily:    PP,
              fontWeight:    400,
              fontSize:      12,
              letterSpacing: '0.05em',
              color:         'rgba(0,0,0,0.5)',
              margin:        0,
              whiteSpace:    'nowrap',
            }}>
              Keep scrolling for the next case study.
            </p>
            <div style={{ position: 'relative', height: 1, flex: 1 }}>
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.12)' }} />
              <div style={{
                position:  'absolute',
                left:       0,
                top:        0,
                height:     1,
                width:      `${nextProgress * 100}%`,
                background: '#0f0f0f',
                transition: 'width 60ms linear',
              }} />
            </div>
          </div>

          {/* ── Marquee — under the cover, gets hidden as cover rises ── */}
          <div style={{
            position: 'absolute',
            top:      '50%',
            left:     0,
            right:    0,
            zIndex:   2,
            transform:'translateY(-50%)',
            overflow: 'hidden',
          }}>
            <div className="marquee-track" style={{ display: 'flex', gap: '0.5em', whiteSpace: 'nowrap' }}>
              {[...Array(2)].map((_, copy) => (
                <span key={copy} style={{ display: 'flex', gap: '0.5em', flexShrink: 0 }}>
                  {[...Array(6)].map((_, i) => (
                    <span key={i} style={{
                      fontFamily:    PP,
                      fontWeight:    900,
                      fontSize:      'clamp(80px, 12vw, 160px)',
                      color:         '#0f0f0f',
                      letterSpacing: '-0.03em',
                      lineHeight:    1,
                      textTransform: 'uppercase',
                      paddingRight:  '0.4em',
                    }}>
                      {nextProject.title} *
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>

          {/* ── Cover — rises from bottom, covers marquee, stays under bar ── */}
          <div style={{
            position:  'absolute',
            inset:      0,
            transform: `translateY(${Math.max(0, 72 - nextProgress * 72)}%)`,
            willChange:'transform',
            zIndex:    3,
          }}>
            <Image
              src={nextProject.coverImage}
              alt={nextProject.title}
              fill
              sizes="100vw"
              style={{ objectFit: 'cover' }}
              loading="lazy"
            />
          </div>

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
        transform:      pillScrolled ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.7)',
        transition:     'opacity 500ms cubic-bezier(0.34,1.56,0.64,1), transform 500ms cubic-bezier(0.34,1.56,0.64,1)',
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

      {/* ════════════════════════════════════════════════════════════════
          IN-PROJECT PROGRESS BAR — fixed left edge, #D0274B, 1px wide.
          Tracks scroll from page top to gate start, resets on navigate.
      ════════════════════════════════════════════════════════════════ */}
      <div style={{
        position:      'fixed',
        left:           0,
        top:            0,
        width:          1,
        height:         '100vh',
        background:    'rgba(255,255,255,0.06)',
        zIndex:         50,
        pointerEvents: 'none',
      }}>
        <div style={{
          position:   'absolute',
          top:         0,
          left:        0,
          width:       '100%',
          height:      `${projectProgress * 100}%`,
          background:  '#D0274B',
          transition:  'height 80ms linear',
        }} />
      </div>

      {/* ════════════════════════════════════════════════════════════════
          "SCROLL TO EXPLORE" HINT — bottom-right, fades after 2 s or
          first scroll. Only visible at the very top of the page.
      ════════════════════════════════════════════════════════════════ */}
      <div style={{
        position:      'fixed',
        bottom:         44,
        right:          44,
        zIndex:         50,
        opacity:        showScrollHint ? 1 : 0,
        transition:    'opacity 600ms ease',
        pointerEvents: 'none',
        textAlign:     'center',
      }}>
        <p style={{
          fontFamily:    PP,
          fontWeight:    400,
          fontSize:      11,
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color:         '#919191',
          margin:        '0 0 8px 0',
        }}>
          Scroll to explore
        </p>
        <span className="explore-bounce-arrow" style={{ color: '#919191', fontSize: 18 }}>↓</span>
      </div>

    </div>
  )
}
