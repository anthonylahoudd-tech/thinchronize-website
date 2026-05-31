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
  const [view,             setView]             = useState<'visual' | 'reading'>('visual')
  const [scrollResistance, setScrollResistance] = useState(0)
  const [pillMaskX,        setPillMaskX]        = useState(0)
  const [pillMaskW,        setPillMaskW]        = useState(0)

  const pillTabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const router      = useRouter()

  const images: ProjectImage[] = project.images?.length
    ? project.images
    : [{ src: project.coverImage }]

  // Pill slider — update on view change
  useEffect(() => {
    const idx = view === 'visual' ? 0 : 1
    const el  = pillTabRefs.current[idx]
    if (!el || !el.parentElement) return
    const pRect = el.parentElement.getBoundingClientRect()
    const eRect = el.getBoundingClientRect()
    setPillMaskX(eRect.left - pRect.left)
    setPillMaskW(eRect.width)
  }, [view])

  // Pill slider — init on mount
  useEffect(() => {
    const el = pillTabRefs.current[0]
    if (!el || !el.parentElement) return
    const pRect = el.parentElement.getBoundingClientRect()
    const eRect = el.getBoundingClientRect()
    setPillMaskX(eRect.left - pRect.left)
    setPillMaskW(eRect.width)
  }, [])

  // Scroll resistance — triggers within 400px of bottom of page content
  useEffect(() => {
    const handle = () => {
      const dist = document.body.scrollHeight - window.scrollY - window.innerHeight
      setScrollResistance(Math.max(0, Math.min(1, 1 - dist / 400)))
    }
    window.addEventListener('scroll', handle, { passive: true })
    return () => window.removeEventListener('scroll', handle)
  }, [])

  const detailRows = [
    { label: 'Type',     value: project.details.type },
    { label: 'Category', value: project.details.category },
    { label: 'Year',     value: project.details.year },
    { label: 'Scope',    value: project.details.scope },
  ]

  return (
    <div style={{ background: '#000', minHeight: '100vh' }}>

      {/* ══════════════════════════════════════════════════════════════════
          SCROLL RESISTANCE WRAPPER
      ══════════════════════════════════════════════════════════════════ */}
      <div style={{
        transform:       scrollResistance > 0.3
          ? `scale(${1 - scrollResistance * 0.02}) translateY(${-scrollResistance * 12}px)`
          : 'none',
        transition:      'transform 400ms cubic-bezier(0.19,1,0.22,1)',
        transformOrigin: 'top center',
      }}>

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

          {/* Cover image */}
          <Image
            src={project.coverImage}
            alt={project.title}
            fill priority sizes="100vw"
            style={{ objectFit: 'cover', opacity: 0.6 }}
          />

          {/* Bottom gradient */}
          <div style={{
            position:      'absolute',
            inset:         0,
            background:    'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, transparent 30%, rgba(0,0,0,0.72) 100%)',
            zIndex:        1,
            pointerEvents: 'none',
          }} />

          {/* Watermark — 4× project name rows */}
          <div style={{
            position:       'absolute',
            inset:          0,
            display:        'flex',
            flexDirection:  'column',
            justifyContent: 'center',
            zIndex:         1,
            pointerEvents:  'none',
            overflow:       'hidden',
            gap:            8,
          }}>
            {[0, 1, 2, 3].map(i => (
              <div key={i} style={{
                fontFamily:    PP,
                fontWeight:    900,
                fontSize:      'clamp(60px, 10vw, 120px)',
                color:         'white',
                opacity:       0.06,
                textTransform: 'uppercase',
                letterSpacing: '-2px',
                lineHeight:    1,
                whiteSpace:    'nowrap',
                paddingLeft:   40,
              }}>
                {project.title}
              </div>
            ))}
          </div>

          {/* Bottom bar — 3-column: name | description+controls | category+link */}
          <div style={{
            position:            'absolute',
            bottom:              0,
            left:                0,
            right:               0,
            zIndex:              2,
            padding:             '0 48px 44px',
            display:             'grid',
            gridTemplateColumns: '1fr auto 1fr',
            alignItems:          'flex-end',
            gap:                 40,
          }}>

            {/* Left: project name small */}
            <span style={{
              fontFamily:    PP,
              fontWeight:    400,
              fontSize:      12,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color:         'white',
            }}>
              {project.title}
            </span>

            {/* Center: tagline + (SCROLL) + pill */}
            <div style={{
              display:        'flex',
              flexDirection:  'column',
              alignItems:     'center',
              gap:            16,
            }}>
              <p style={{
                fontFamily: PP,
                fontWeight: 400,
                fontSize:   'clamp(14px, 1.8vw, 18px)',
                color:      'rgba(255,255,255,0.6)',
                maxWidth:   600,
                textAlign:  'center',
                lineHeight: 1.55,
                margin:     0,
              }}>
                {project.tagline}
              </p>

              <span style={{
                fontFamily:    PP,
                fontWeight:    400,
                fontSize:      10,
                letterSpacing: '5px',
                textTransform: 'uppercase',
                color:         'rgba(255,255,255,0.3)',
              }}>
                (Scroll)
              </span>

              {/* Visual / Reading pill */}
              <div style={{
                position:     'relative',
                background:   'white',
                borderRadius: 9999,
                padding:      7,
                display:      'flex',
                alignItems:   'center',
              }}>
                <div style={{
                  position:      'absolute',
                  top:           7,
                  left:          pillMaskX + 7,
                  width:         pillMaskW,
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
                    ref={el => { pillTabRefs.current[i] = el }}
                    onClick={() => setView(v)}
                    style={{
                      position:     'relative',
                      zIndex:       1,
                      height:       62,
                      padding:      '0 40px',
                      background:   'transparent',
                      border:       'none',
                      borderRadius: 9999,
                      fontFamily:   PP,
                      fontWeight:   400,
                      fontSize:     19,
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
            </div>

            {/* Right: category + see all projects */}
            <div style={{
              display:        'flex',
              flexDirection:  'column',
              alignItems:     'flex-end',
              gap:            12,
            }}>
              <span style={{
                fontFamily:    PP,
                fontWeight:    400,
                fontSize:      12,
                letterSpacing: '3px',
                textTransform: 'uppercase',
                color:         'rgba(255,255,255,0.4)',
              }}>
                {project.category}
              </span>
              <Link
                href="/portfolio"
                style={{
                  fontFamily:          PP,
                  fontWeight:          400,
                  fontSize:            12,
                  letterSpacing:       '3px',
                  textTransform:       'uppercase',
                  color:               'rgba(255,255,255,0.4)',
                  textDecoration:      'underline',
                  textUnderlineOffset: '4px',
                }}
              >
                See all projects
              </Link>
            </div>

          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            CONTENT — keyed so React remounts on switch
        ════════════════════════════════════════════════════════════════ */}
        <div key={view} style={{ animation: 'viewEnter 500ms cubic-bezier(0.19,1,0.22,1) forwards' }}>

          {/* ── VISUAL VIEW: full-bleed image stack, no text ─────────────── */}
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

          {/* ── READING VIEW: 2-col, dark bg, white text ─────────────────── */}
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
            NEXT PROJECT — 100vh
        ════════════════════════════════════════════════════════════════ */}
        <div
          style={{
            height:         '100vh',
            background:     '#000',
            position:       'relative',
            overflow:       'hidden',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            cursor:         'pointer',
          }}
          onClick={() => router.push(`/portfolio/${nextProject.id}`)}
        >
          <Image
            src={nextProject.coverImage}
            alt={nextProject.title}
            fill sizes="100vw"
            style={{ objectFit: 'cover', opacity: 0.35 }}
            loading="lazy"
          />

          {/* Center content */}
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
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
              margin:     '0 0 32px',
            }}>
              {nextProject.tagline}
            </p>
            <Link
              href={`/portfolio/${nextProject.id}`}
              onClick={e => e.stopPropagation()}
              style={{
                fontFamily:          PP,
                fontWeight:          400,
                fontSize:            11,
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

          {/* Bottom left: counter */}
          <div style={{
            position:      'absolute',
            bottom:        40,
            left:          40,
            zIndex:        1,
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
            zIndex:   1,
          }}>
            <Link
              href={`/portfolio/${prevProject.id}`}
              onClick={e => e.stopPropagation()}
              style={{ color: 'rgba(255,255,255,0.3)', fontSize: 22, textDecoration: 'none' }}
            >←</Link>
            <Link
              href={`/portfolio/${nextProject.id}`}
              onClick={e => e.stopPropagation()}
              style={{ color: 'white', fontSize: 22, textDecoration: 'none' }}
            >→</Link>
          </div>
        </div>

      </div>
      {/* end scroll-resistance wrapper */}

      {/* ════════════════════════════════════════════════════════════════
          FIXED TOGGLE PILL — always visible, right side
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
