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

function ReadingSection({
  num, label, headline, body, children,
}: {
  num: string
  label: string
  headline: string
  body: string
  children?: React.ReactNode
}) {
  return (
    <div style={{ marginBottom: '80px' }}>
      <span style={{
        fontFamily: PP, fontWeight: 400, fontSize: '10px',
        letterSpacing: '3px', textTransform: 'uppercase',
        color: 'rgba(0,0,0,0.35)', display: 'block', marginBottom: '10px',
      }}>
        {num}
      </span>
      <span style={{
        fontFamily: PP, fontWeight: 400, fontSize: '10px',
        letterSpacing: '3px', textTransform: 'uppercase',
        color: 'rgba(0,0,0,0.35)', display: 'block', marginBottom: '24px',
      }}>
        {label}
      </span>
      <h3 style={{
        fontFamily: PP, fontWeight: 900, fontSize: 'clamp(18px, 2.5vw, 26px)',
        color: '#000', lineHeight: 1.15, letterSpacing: '-0.5px',
        marginBottom: '20px', textTransform: 'uppercase',
      }}>
        {headline}
      </h3>
      <p style={{
        fontFamily: PP, fontWeight: 400, fontSize: '15px',
        color: 'rgba(0,0,0,0.55)', lineHeight: 1.75,
        marginBottom: children ? '40px' : '0',
      }}>
        {body}
      </p>
      {children}
    </div>
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

  // Scroll resistance
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
    <div style={{ background: '#fff', minHeight: '100vh' }}>

      {/* ── Scroll resistance wrapper ─────────────────────────────────────── */}
      <div style={{
        transform:       scrollResistance > 0.3
          ? `scale(${1 - scrollResistance * 0.025}) translateY(${-scrollResistance * 12}px)`
          : 'none',
        transition:      'transform 400ms cubic-bezier(0.19,1,0.22,1)',
        transformOrigin: 'top center',
      }}>

        {/* ════════════════════════════════════════════════════════════════
            HERO — 100vh
        ════════════════════════════════════════════════════════════════ */}
        <section style={{
          position:        'relative',
          height:          '100vh',
          overflow:        'hidden',
          background:      '#000',
          display:         'flex',
          flexDirection:   'column',
          justifyContent:  'space-between',
          padding:         '104px 48px 44px',
        }}>

          <Image
            src={project.coverImage}
            alt={project.title}
            fill priority sizes="100vw"
            style={{ objectFit: 'cover', opacity: 0.55 }}
          />

          <div style={{
            position:      'absolute',
            inset:         0,
            background:    'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 28%, transparent 58%, rgba(0,0,0,0.72) 100%)',
            zIndex:        1,
            pointerEvents: 'none',
          }} />

          {/* TOP: project name + tagline */}
          <div style={{ position: 'relative', zIndex: 2 }}>
            <h1 style={{
              fontFamily:    PP,
              fontWeight:    900,
              fontSize:      'clamp(64px, 20vw, 300px)',
              color:         'white',
              textTransform: 'uppercase',
              letterSpacing: '-3px',
              lineHeight:    0.88,
              margin:        0,
              whiteSpace:    'nowrap',
            }}>
              {project.title}
            </h1>
            <p style={{
              fontFamily:  PP,
              fontWeight:  400,
              fontSize:    'clamp(15px, 1.5vw, 20px)',
              color:       'rgba(255,255,255,0.7)',
              lineHeight:  1.45,
              margin:      '20px 0 0',
              maxWidth:    '520px',
            }}>
              {project.tagline}
            </p>
          </div>

          {/* BOTTOM: (Scroll) | pill | See all */}
          <div style={{
            position:            'relative',
            zIndex:              2,
            display:             'grid',
            gridTemplateColumns: '1fr auto 1fr',
            alignItems:          'center',
          }}>
            <span style={{
              fontFamily:    PP,
              fontWeight:    400,
              fontSize:      '11px',
              letterSpacing: '4px',
              textTransform: 'uppercase',
              color:         'rgba(255,255,255,0.4)',
            }}>
              (Scroll)
            </span>

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

            <div style={{ textAlign: 'right' }}>
              <Link
                href="/portfolio"
                style={{
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
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            CONTENT
        ════════════════════════════════════════════════════════════════ */}
        <div key={view} style={{ animation: 'viewEnter 500ms cubic-bezier(0.19,1,0.22,1) forwards' }}>

          {/* ── VISUAL VIEW ─────────────────────────────────────────────── */}
          {view === 'visual' && (
            <>
              {/* Overview section — warm off-white, right after hero */}
              <section style={{
                background: '#f5f4f0',
                padding:    '100px 48px 140px',
              }}>
                <div style={{
                  display:             'grid',
                  gridTemplateColumns: '200px 1fr',
                  gap:                 '80px',
                }}>
                  <div style={{ paddingTop: '6px' }}>
                    <span style={{
                      fontFamily:    PP,
                      fontWeight:    400,
                      fontSize:      '11px',
                      letterSpacing: '3px',
                      textTransform: 'uppercase',
                      color:         'rgba(0,0,0,0.4)',
                      lineHeight:    1.8,
                    }}>
                      Project<br />Overview
                    </span>
                  </div>

                  <div>
                    <h2 style={{
                      fontFamily:    PP,
                      fontWeight:    900,
                      fontSize:      'clamp(28px, 3.5vw, 52px)',
                      color:         '#000',
                      lineHeight:    1.1,
                      letterSpacing: '-0.5px',
                      margin:        '0 0 36px',
                    }}>
                      {project.brief.headline}
                    </h2>

                    <p style={{
                      fontFamily:  PP,
                      fontWeight:  400,
                      fontSize:    '18px',
                      color:       'rgba(0,0,0,0.55)',
                      lineHeight:  1.75,
                      maxWidth:    '640px',
                      margin:      '0 0 80px',
                    }}>
                      {project.brief.body}
                    </p>

                    <p style={{
                      fontFamily:    PP,
                      fontWeight:    400,
                      fontSize:      '11px',
                      letterSpacing: '3px',
                      textTransform: 'uppercase',
                      color:         'rgba(0,0,0,0.35)',
                      margin:        '0 0 24px',
                    }}>
                      (Details)
                    </p>

                    {detailRows.map(row => (
                      <div key={row.label} style={{
                        display:        'flex',
                        justifyContent: 'space-between',
                        alignItems:     'center',
                        padding:        '20px 0',
                        borderTop:      '1px solid rgba(0,0,0,0.1)',
                      }}>
                        <span style={{
                          fontFamily:    PP,
                          fontWeight:    400,
                          fontSize:      '12px',
                          letterSpacing: '2px',
                          textTransform: 'uppercase',
                          color:         'rgba(0,0,0,0.4)',
                        }}>
                          {row.label}
                        </span>
                        <span style={{
                          fontFamily: PP,
                          fontWeight: 400,
                          fontSize:   '15px',
                          color:      'rgba(0,0,0,0.7)',
                        }}>
                          {row.value}
                        </span>
                      </div>
                    ))}
                    <div style={{ borderTop: '1px solid rgba(0,0,0,0.1)' }} />
                  </div>
                </div>
              </section>

              {/* Full-bleed image stack */}
              <div style={{ background: '#fff', paddingBottom: '160px' }}>
                {images.map((img, i) => (
                  <div key={i} style={{
                    position:     'relative',
                    paddingTop:   img.portrait ? '130%' : '70%',
                    marginBottom: '8px',
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
            </>
          )}

          {/* ── READING VIEW: 2-column (images left, text right) ────────── */}
          {view === 'reading' && (
            <section style={{ background: '#fff', padding: '0 40px' }}>
              <div style={{
                display:             'grid',
                gridTemplateColumns: '1fr 1fr',
                gap:                 '0',
                minHeight:           '100vh',
                paddingTop:          '120px',
                paddingBottom:       '120px',
              }}>
                {/* LEFT — image stack */}
                <div style={{ paddingRight: '24px' }}>
                  {images.map((img, i) => (
                    <div key={i} style={{
                      position:     'relative',
                      paddingTop:   '71.05%',
                      marginBottom: '24px',
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

                {/* RIGHT — 4 text sections */}
                <div style={{ paddingLeft: '60px' }}>
                  <ReadingSection
                    num="(01)" label="The Brief"
                    headline={project.brief.headline}
                    body={project.brief.body}
                  >
                    <div style={{
                      borderTop:           '1px solid rgba(0,0,0,0.08)',
                      paddingTop:          '24px',
                      display:             'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap:                 '16px',
                    }}>
                      {([
                        { label: 'Type',     value: project.details.type },
                        { label: 'Category', value: project.details.category },
                        { label: 'Year',     value: project.details.year },
                        { label: 'Scope',    value: project.details.scope },
                      ] as { label: string; value: string }[]).map(item => (
                        <div key={item.label}>
                          <span style={{
                            fontFamily:    PP,
                            fontWeight:    400,
                            fontSize:      '10px',
                            letterSpacing: '3px',
                            textTransform: 'uppercase',
                            color:         'rgba(0,0,0,0.3)',
                            display:       'block',
                            marginBottom:  '4px',
                          }}>
                            {item.label}
                          </span>
                          <span style={{
                            fontFamily: PP,
                            fontWeight: 400,
                            fontSize:   '13px',
                            color:      'rgba(0,0,0,0.7)',
                          }}>
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </ReadingSection>

                  <ReadingSection
                    num="(02)" label="The Diagnosis"
                    headline={project.diagnosis.headline}
                    body={project.diagnosis.body}
                  />

                  <ReadingSection
                    num="(03)" label="What We Built"
                    headline={project.built.headline}
                    body={project.built.body}
                  />

                  <ReadingSection
                    num="(04)" label="The Result"
                    headline={project.result.headline}
                    body={project.result.body}
                  />
                </div>
              </div>
            </section>
          )}

        </div>

        {/* ════════════════════════════════════════════════════════════════
            NEXT PROJECT
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

          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
            <p style={{
              fontFamily:    PP,
              fontWeight:    400,
              fontSize:      '11px',
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
              fontSize:   '14px',
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
            <span style={{ opacity: 0.5 }}>{String(currentIndex + 1).padStart(2, '0')}</span>
            {' / '}
            {String(PROJECTS.length).padStart(2, '0')}
          </div>

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

      {/* ── Fixed toggle pill ────────────────────────────────────────────── */}
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
