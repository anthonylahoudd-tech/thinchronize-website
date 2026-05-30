'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { PROJECTS, type Project, type ProjectImage } from '@/lib/projects'

const PP   = "'PPNeueCorp', system-ui, sans-serif"
const EASE = 'cubic-bezier(0.76, 0, 0.24, 1)'

interface Props {
  project:      Project
  nextProject:  Project
  prevProject:  Project
  currentIndex: number
}

// ─── Icons ────────────────────────────────────────────────────────────────────

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

// ─── Main component ───────────────────────────────────────────────────────────

export default function PortfolioProjectClient({
  project, nextProject, prevProject, currentIndex,
}: Props) {
  const [view,             setView]             = useState<'visual' | 'reading'>('visual')
  const [scrollResistance, setScrollResistance] = useState(0)
  const [heroPillMaskX,    setHeroPillMaskX]    = useState(0)
  const [heroPillMaskW,    setHeroPillMaskW]    = useState(0)

  const heroPillTabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const router          = useRouter()

  const images: ProjectImage[] = project.images?.length
    ? project.images
    : [{ src: project.coverImage }]

  // ── Hero pill slider — update on view change ──────────────────────────────
  useEffect(() => {
    const idx = view === 'visual' ? 0 : 1
    const el = heroPillTabRefs.current[idx]
    if (!el || !el.parentElement) return
    const pRect = el.parentElement.getBoundingClientRect()
    const eRect = el.getBoundingClientRect()
    setHeroPillMaskX(eRect.left - pRect.left)
    setHeroPillMaskW(eRect.width)
  }, [view])

  // ── Hero pill slider — initialise on mount ────────────────────────────────
  useEffect(() => {
    const el = heroPillTabRefs.current[0]
    if (!el || !el.parentElement) return
    const pRect = el.parentElement.getBoundingClientRect()
    const eRect = el.getBoundingClientRect()
    setHeroPillMaskX(eRect.left - pRect.left)
    setHeroPillMaskW(eRect.width)
  }, [])

  // ── Scroll resistance ─────────────────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      const scrollBottom = document.body.scrollHeight - window.scrollY - window.innerHeight
      const resistance   = Math.max(0, Math.min(1, 1 - scrollBottom / 400))
      setScrollResistance(resistance)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const totalProjects = PROJECTS.length

  const readingSections = [
    { num: '01', label: 'The Brief',     data: project.brief },
    { num: '02', label: 'The Diagnosis', data: project.diagnosis },
    { num: '03', label: 'What We Built', data: project.built },
    { num: '04', label: 'The Result',    data: project.result },
  ]

  return (
    <div style={{ background: '#000', minHeight: '100vh' }}>

      {/* ══════════════════════════════════════════════════════════════════
          SCROLL RESISTANCE WRAPPER
          The fixed pill is a sibling of this div so position:fixed is
          unaffected by the transform.
      ══════════════════════════════════════════════════════════════════ */}
      <div style={{
        transform:       scrollResistance > 0.3
          ? `scale(${1 - scrollResistance * 0.025}) translateY(${-scrollResistance * 12}px)`
          : 'none',
        transition:      'transform 400ms cubic-bezier(0.19,1,0.22,1)',
        transformOrigin: 'top center',
      }}>

        {/* ══════════════════════════════════════════════════════════════
            SECTION A — HERO (100vh)
        ══════════════════════════════════════════════════════════════ */}
        <section style={{
          position:   'relative',
          height:     '100vh',
          background: '#000',
          overflow:   'hidden',
        }}>

          {/* 1. Cover image */}
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover', opacity: 0.6, zIndex: 1 }}
          />

          {/* Gradient overlay */}
          <div style={{
            position:      'absolute',
            inset:         0,
            background:    'linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.55) 100%)',
            zIndex:        2,
            pointerEvents: 'none',
          }} />

          {/* 2. Watermark — 4× stacked title, faint */}
          <div style={{
            position:      'absolute',
            bottom:        '160px',
            left:          '40px',
            right:         '40px',
            zIndex:        3,
            pointerEvents: 'none',
          }}>
            {[...Array(4)].map((_, i) => (
              <div key={i} style={{
                fontFamily:    PP,
                fontWeight:    900,
                fontSize:      'clamp(60px, 10vw, 120px)',
                color:         'rgba(255,255,255,0.07)',
                textTransform: 'uppercase',
                letterSpacing: '-3px',
                lineHeight:    0.88,
              }}>
                {project.title}
              </div>
            ))}
          </div>

          {/* 3. Bottom-left — readable project name */}
          <div style={{
            position: 'absolute',
            bottom:   '80px',
            left:     '48px',
            zIndex:   5,
          }}>
            <p style={{
              fontFamily:    PP,
              fontWeight:    400,
              fontSize:      'clamp(18px, 2vw, 22px)',
              color:         'white',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              margin:        0,
            }}>
              {project.title}
            </p>
          </div>

          {/* 4. Bottom-right — category */}
          <div style={{
            position: 'absolute',
            bottom:   '80px',
            right:    '48px',
            zIndex:   5,
          }}>
            <p style={{
              fontFamily:    PP,
              fontWeight:    400,
              fontSize:      'clamp(18px, 2vw, 22px)',
              color:         'rgba(255,255,255,0.5)',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              margin:        0,
            }}>
              {project.category}
            </p>
          </div>

          {/* 5. Description — centered, above scroll indicator */}
          <div style={{
            position:  'absolute',
            bottom:    '148px',
            left:      0,
            right:     0,
            zIndex:    5,
            display:   'flex',
            justifyContent: 'center',
            padding:   '0 10%',
          }}>
            <p style={{
              fontFamily:  PP,
              fontWeight:  400,
              fontSize:    'clamp(14px, 1.8vw, 18px)',
              color:       'rgba(255,255,255,0.6)',
              lineHeight:  1.6,
              maxWidth:    '600px',
              textAlign:   'center',
              margin:      0,
            }}>
              {project.brief.body}
            </p>
          </div>

          {/* 6. (SCROLL) indicator */}
          <div style={{
            position:  'absolute',
            bottom:    '108px',
            left:      '50%',
            transform: 'translateX(-50%)',
            zIndex:    5,
          }}>
            <p style={{
              fontFamily:    PP,
              fontWeight:    400,
              fontSize:      '10px',
              letterSpacing: '5px',
              color:         'rgba(255,255,255,0.3)',
              textTransform: 'uppercase',
              margin:        0,
              whiteSpace:    'nowrap',
            }}>
              (SCROLL)
            </p>
          </div>

          {/* 7. Visual / Reading pill switcher — centered bottom */}
          <div style={{
            position:  'absolute',
            bottom:    '40px',
            left:      '50%',
            transform: 'translateX(-50%)',
            zIndex:    6,
          }}>
            <div style={{
              position:     'relative',
              background:   'white',
              borderRadius: 9999,
              padding:      7,
              display:      'flex',
              alignItems:   'center',
            }}>
              {/* Sliding black mask */}
              <div style={{
                position:      'absolute',
                top:           7,
                left:          heroPillMaskX + 7,
                width:         heroPillMaskW,
                height:        'calc(100% - 14px)',
                background:    'black',
                borderRadius:  9999,
                transition:    `left 400ms ${EASE}, width 400ms ${EASE}`,
                pointerEvents: 'none',
                zIndex:        0,
              }} />

              {(['visual', 'reading'] as const).map((v, i) => (
                <button
                  key={v}
                  ref={el => { heroPillTabRefs.current[i] = el }}
                  onClick={() => setView(v)}
                  style={{
                    position:      'relative',
                    zIndex:        1,
                    height:        62,
                    padding:       '0 40px',
                    background:    'transparent',
                    border:        'none',
                    borderRadius:  9999,
                    fontFamily:    PP,
                    fontWeight:    400,
                    fontSize:      19,
                    color:         view === v ? 'white' : 'black',
                    transition:    `color 400ms ${EASE}`,
                    whiteSpace:    'nowrap',
                    cursor:        'pointer',
                  }}
                >
                  {v === 'visual' ? 'Visual view' : 'Reading view'}
                </button>
              ))}
            </div>
          </div>

          {/* 8. See all projects — bottom right */}
          <Link
            href="/portfolio"
            style={{
              position:            'absolute',
              bottom:              '44px',
              right:               '40px',
              zIndex:              6,
              fontFamily:          PP,
              fontWeight:          400,
              fontSize:            '12px',
              letterSpacing:       '3px',
              textTransform:       'uppercase',
              color:               'rgba(255,255,255,0.4)',
              textDecoration:      'underline',
              textUnderlineOffset: '4px',
            }}
          >
            See all projects
          </Link>

        </section>

        {/* ══════════════════════════════════════════════════════════════
            SECTION C / D — VISUAL or READING VIEW
        ══════════════════════════════════════════════════════════════ */}
        <section style={{ background: '#000', padding: '0 40px' }}>
          <div
            key={view}
            style={{ animation: 'viewEnter 500ms cubic-bezier(0.19,1,0.22,1) forwards' }}
          >

            {/* ── SECTION C — VISUAL VIEW ───────────────────────────────── */}
            {view === 'visual' && (
              <div style={{
                marginLeft:    '-40px',
                marginRight:   '-40px',
                paddingTop:    '120px',
                paddingBottom: '160px',
                background:    '#000',
              }}>
                {images.map((img, i) => (
                  <div key={i} style={{
                    position:     'relative',
                    paddingTop:   img.portrait ? '130%' : '70%',
                    marginBottom: '16px',
                    overflow:     'hidden',
                  }}>
                    <Image
                      src={img.src}
                      alt={`${project.title} — ${i + 1}`}
                      fill
                      sizes="100vw"
                      style={{ objectFit: 'cover' }}
                      loading={i < 2 ? 'eager' : 'lazy'}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* ── SECTION D — READING VIEW ──────────────────────────────── */}
            {view === 'reading' && (
              <div style={{
                display:             'grid',
                gridTemplateColumns: '1fr 1fr',
                background:          '#000',
                marginLeft:          '-40px',
                marginRight:         '-40px',
              }}>

                {/* LEFT — image column */}
                <div style={{ overflow: 'hidden' }}>
                  {images.map((img, i) => (
                    <div key={i} style={{
                      position:     'relative',
                      paddingTop:   '71%',
                      marginBottom: '16px',
                      overflow:     'hidden',
                    }}>
                      <Image
                        src={img.src}
                        alt=""
                        fill
                        sizes="50vw"
                        style={{ objectFit: 'cover' }}
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>

                {/* RIGHT — info panel */}
                <div style={{ paddingLeft: '80px', paddingRight: '60px' }}>

                  {readingSections.map((section, i) => (
                    <div key={i} style={{
                      paddingTop:    '236px',
                      paddingBottom: '260px',
                      borderTop:     i > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                    }}>

                      {/* Number + label */}
                      <div style={{
                        display:       'flex',
                        flexDirection: 'column',
                        marginBottom:  '40px',
                      }}>
                        <span style={{
                          fontFamily:    PP,
                          fontWeight:    400,
                          fontSize:      '13px',
                          letterSpacing: '2px',
                          textTransform: 'uppercase',
                          color:         'rgba(255,255,255,0.3)',
                        }}>
                          ({section.num})
                        </span>
                        <span style={{
                          fontFamily:    PP,
                          fontWeight:    400,
                          fontSize:      '13px',
                          letterSpacing: '2px',
                          textTransform: 'uppercase',
                          color:         'rgba(255,255,255,0.3)',
                          marginTop:     '20px',
                        }}>
                          {section.label}
                        </span>
                      </div>

                      {/* Headline */}
                      <h3 style={{
                        fontFamily:    PP,
                        fontWeight:    900,
                        fontSize:      'clamp(22px, 2.8vw, 36px)',
                        color:         'white',
                        lineHeight:    1.1,
                        letterSpacing: '-0.5px',
                        marginBottom:  '32px',
                        marginTop:     0,
                      }}>
                        {section.data.headline}
                      </h3>

                      {/* Body */}
                      <p style={{
                        fontFamily:  PP,
                        fontWeight:  400,
                        fontSize:    '16px',
                        color:       'rgba(255,255,255,0.5)',
                        lineHeight:  1.75,
                        margin:      0,
                      }}>
                        {section.data.body}
                      </p>

                      {/* Details grid — Brief section only */}
                      {i === 0 && (
                        <div style={{
                          marginTop:           '48px',
                          paddingTop:          '32px',
                          borderTop:           '1px solid rgba(255,255,255,0.06)',
                          display:             'grid',
                          gridTemplateColumns: '1fr 1fr',
                          gap:                 '24px',
                        }}>
                          {[
                            { label: 'Type',     val: project.details.type },
                            { label: 'Category', val: project.details.category },
                            { label: 'Year',     val: project.details.year },
                            { label: 'Scope',    val: project.details.scope },
                          ].map(d => (
                            <div key={d.label}>
                              <span style={{
                                display:       'block',
                                fontSize:      '10px',
                                letterSpacing: '3px',
                                textTransform: 'uppercase',
                                color:         'rgba(255,255,255,0.2)',
                                fontFamily:    PP,
                                marginBottom:  '6px',
                              }}>
                                {d.label}
                              </span>
                              <span style={{
                                fontSize:   '14px',
                                color:      'rgba(255,255,255,0.6)',
                                fontFamily: PP,
                              }}>
                                {d.val}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                    </div>
                  ))}

                </div>
              </div>
            )}

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            SECTION E — NEXT PROJECT
        ══════════════════════════════════════════════════════════════ */}
        <div
          style={{
            height:          '100vh',
            background:      '#000',
            position:        'relative',
            overflow:        'hidden',
            display:         'flex',
            alignItems:      'center',
            justifyContent:  'center',
            cursor:          'pointer',
          }}
          onClick={() => router.push(`/portfolio/${nextProject.id}`)}
        >
          <Image
            src={nextProject.coverImage}
            alt={nextProject.title}
            fill
            sizes="100vw"
            style={{ objectFit: 'cover', opacity: 0.35 }}
            loading="lazy"
          />

          {/* Centre content */}
          <div style={{
            position:   'relative',
            zIndex:     1,
            textAlign:  'center',
          }}>
            <p style={{
              fontFamily:    PP,
              fontWeight:    400,
              fontSize:      '11px',
              letterSpacing: '5px',
              textTransform: 'uppercase',
              color:         'rgba(255,255,255,0.35)',
              marginBottom:  '20px',
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
              fontFamily:   PP,
              fontWeight:   400,
              fontSize:     '14px',
              color:        'rgba(255,255,255,0.4)',
              marginBottom: '32px',
              margin:       '0 0 32px',
            }}>
              {nextProject.tagline}
            </p>
            <Link
              href={`/portfolio/${nextProject.id}`}
              onClick={e => e.stopPropagation()}
              style={{
                fontFamily:          PP,
                fontWeight:          400,
                fontSize:            '11px',
                letterSpacing:       '4px',
                textTransform:       'uppercase',
                color:               'white',
                textDecoration:      'underline',
                textUnderlineOffset: '6px',
              }}
            >
              Continue →
            </Link>
          </div>

          {/* Counter — bottom left */}
          <div style={{
            position:      'absolute',
            bottom:        40,
            left:          40,
            zIndex:        1,
            fontFamily:    PP,
            fontWeight:    400,
            fontSize:      '11px',
            letterSpacing: '3px',
            color:         'rgba(255,255,255,0.25)',
          }}>
            <span style={{ opacity: 0.5 }}>
              {String(currentIndex + 1).padStart(2, '0')}
            </span>
            {' / '}
            {String(totalProjects).padStart(2, '0')}
          </div>

          {/* Prev / Next arrows — bottom right */}
          <div style={{
            position: 'absolute',
            bottom:   40,
            right:    40,
            display:  'flex',
            gap:      20,
            zIndex:   1,
          }}>
            <Link
              href={`/portfolio/${prevProject.id}`}
              onClick={e => e.stopPropagation()}
              style={{
                color:          'rgba(255,255,255,0.3)',
                fontSize:       22,
                textDecoration: 'none',
              }}
            >
              ←
            </Link>
            <Link
              href={`/portfolio/${nextProject.id}`}
              onClick={e => e.stopPropagation()}
              style={{
                color:          'white',
                fontSize:       22,
                textDecoration: 'none',
              }}
            >
              →
            </Link>
          </div>

        </div>

      </div>
      {/* end scroll-resistance wrapper */}

      {/* ══════════════════════════════════════════════════════════════════
          SECTION B — FIXED TOGGLE PILL (right side, always visible)
          Rendered as sibling of the transformed wrapper so position:fixed
          is unaffected by the transform.
      ══════════════════════════════════════════════════════════════════ */}
      <div style={{
        position:       'fixed',
        bottom:         '30px',
        right:          '44px',
        zIndex:         40,
        background:     'white',
        borderRadius:   '9999px',
        width:          '60px',
        height:         '110px',
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        justifyContent: 'space-between',
        padding:        '7px',
        boxShadow:      '0 4px 24px rgba(0,0,0,0.15)',
      }}>

        {/* Eye — visual view */}
        <button
          onClick={() => setView('visual')}
          aria-label="Visual view"
          style={{
            width:          '46px',
            height:         '46px',
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

        {/* Lines — reading view */}
        <button
          onClick={() => setView('reading')}
          aria-label="Reading view"
          style={{
            width:          '46px',
            height:         '46px',
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
