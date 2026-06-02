'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { PROJECTS } from '@/lib/projects'
import ProjectCard from '@/components/ProjectCard'

const PP   = "'PPNeueCorp', system-ui, sans-serif"
const EASE = 'cubic-bezier(0.19, 1, 0.22, 1)'

const CATEGORIES = [
  'All Projects',
  'Brand Identity',
  'Brand Strategy',
  'Motion',
  'Packaging',
  'Web Design',
]

export default function PortfolioPageClient() {
  const [filterOpen,   setFilterOpen]   = useState(false)
  const [activeFilter, setActiveFilter] = useState('All Projects')
  const [view,         setView]         = useState<'grid' | 'explore'>('grid')
  const [maskX,        setMaskX]        = useState(0)
  const [maskWidth,    setMaskWidth]    = useState(0)
  const [heroReady,    setHeroReady]    = useState(false)

  const tabRefs     = useRef<(HTMLButtonElement | null)[]>([])
  const dropdownRef = useRef<HTMLDivElement>(null)
  const sepRefs     = useRef<(HTMLDivElement | null)[]>([])
  const [sepProgress, setSepProgress] = useState<number[]>([])

  // Sliding pill — update on view change
  useEffect(() => {
    const idx = view === 'grid' ? 0 : 1
    const el = tabRefs.current[idx]
    if (!el || !el.parentElement) return
    const pRect = el.parentElement.getBoundingClientRect()
    const eRect = el.getBoundingClientRect()
    setMaskX(eRect.left - pRect.left)
    setMaskWidth(eRect.width)
  }, [view])

  // Sliding pill — initialise on mount
  useEffect(() => {
    const el = tabRefs.current[0]
    if (!el || !el.parentElement) return
    const pRect = el.parentElement.getBoundingClientRect()
    const eRect = el.getBoundingClientRect()
    setMaskX(eRect.left - pRect.left)
    setMaskWidth(eRect.width)
  }, [])

  // Hero text entrance — fires after page transition curtain lifts (~420ms)
  useEffect(() => {
    const t = setTimeout(() => setHeroReady(true), 420)
    return () => clearTimeout(t)
  }, [])

  // Separator progress — position-based, updates on scroll in explore view
  useEffect(() => {
    if (view !== 'explore') return
    const handle = () => {
      const vh = window.innerHeight
      setSepProgress(sepRefs.current.map(ref => {
        if (!ref) return 0
        const rect = ref.getBoundingClientRect()
        return Math.max(0, Math.min(1, (vh - rect.top) / ref.offsetHeight))
      }))
    }
    handle()
    window.addEventListener('scroll', handle, { passive: true })
    return () => window.removeEventListener('scroll', handle)
  }, [view, activeFilter])

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setFilterOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const filteredProjects = activeFilter === 'All Projects'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeFilter)

  const filteredCount = filteredProjects.length

  return (
    <div style={{ background: '#000', minHeight: '100vh', color: 'white' }}>

      {/* ══════════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════════ */}
      <div style={{
        height:        '100vh',
        background:    '#000',
        display:       'flex',
        flexDirection: 'column',
        paddingTop:    'calc(96px + 3vh)',
        overflow:      'hidden',
      }}>

        <div style={{ overflow: 'hidden', flexShrink: 0 }}>
          <div className="work-marquee-track">
            {[0, 1].map(i => (
              <span key={i} style={{
                fontFamily:    PP,
                fontWeight:    900,
                fontSize:      'clamp(88px, 13vw, 185px)',
                color:         'white',
                textTransform: 'uppercase',
                letterSpacing: '-4px',
                lineHeight:    0.9,
                whiteSpace:    'nowrap',
              }}>
                WORK&nbsp;*&nbsp;WORK&nbsp;*&nbsp;WORK&nbsp;*&nbsp;WORK&nbsp;*&nbsp;WORK&nbsp;*&nbsp;
              </span>
            ))}
          </div>
        </div>

        <div style={{ padding: '44px 5vw 0', flexShrink: 0 }}>
          {([
            <>We build brands with <span style={{ background: '#D0274B', color: '#fff', padding: '0 8px 2px' }}>precision</span>,</>,
            'intention, and something true to say —',
            'every project starts with a diagnosis.',
          ] as React.ReactNode[]).map((line, i) => (
            <div key={i} style={{ overflow: 'hidden' }}>
              <p style={{
                fontFamily:      PP,
                fontWeight:      400,
                fontSize:        'clamp(22px, 3vw, 42px)',
                color:           'white',
                lineHeight:      1.25,
                letterSpacing:   '-0.5px',
                margin:          0,
                opacity:         heroReady ? 1 : 0,
                transform:       heroReady ? 'translateY(0)' : 'translateY(32px)',
                transition:      `opacity 750ms ${EASE}, transform 750ms ${EASE}`,
                transitionDelay: `${i * 110}ms`,
              }}>
                {line}
              </p>
            </div>
          ))}
        </div>

        <div style={{ flex: 1 }} />

        <div style={{
          display:        'flex',
          justifyContent: 'space-between',
          alignItems:     'center',
          padding:        '0 5vw 48px',
          flexShrink:     0,
        }}>

          {/* Filter dropdown */}
          <div ref={dropdownRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              style={{
                height:        62,
                borderRadius:  40,
                background:    'white',
                border:        'none',
                display:       'flex',
                alignItems:    'center',
                gap:           12,
                padding:       '0 32px',
                fontFamily:    PP,
                fontWeight:    400,
                fontSize:      11,
                letterSpacing: '3px',
                textTransform: 'uppercase',
                color:         'black',
                cursor:        'pointer',
                whiteSpace:    'nowrap',
              }}
            >
              <span>{activeFilter} ({filteredCount})</span>
              <span style={{
                display:    'inline-block',
                transform:  filterOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: `transform 300ms ${EASE}`,
                fontSize:   10,
              }}>↓</span>
            </button>

            {filterOpen && (
              <div style={{
                position:     'absolute',
                bottom:       70,
                left:         0,
                minWidth:     220,
                background:   '#111',
                border:       '1px solid rgba(255,255,255,0.1)',
                borderRadius: 16,
                overflow:     'hidden',
                zIndex:       50,
              }}>
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => { setActiveFilter(cat); setFilterOpen(false) }}
                    style={{
                      width:         '100%',
                      height:        48,
                      display:       'flex',
                      alignItems:    'center',
                      padding:       '0 24px',
                      background:    activeFilter === cat ? 'rgba(255,255,255,0.06)' : 'transparent',
                      border:        'none',
                      borderTop:     '1px solid rgba(255,255,255,0.06)',
                      fontFamily:    PP,
                      fontWeight:    400,
                      fontSize:      11,
                      letterSpacing: '2px',
                      textTransform: 'uppercase',
                      color:         activeFilter === cat ? 'white' : 'rgba(255,255,255,0.5)',
                      textAlign:     'left',
                      cursor:        'pointer',
                      transition:    'all 200ms ease',
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Grid / Explore sliding pill */}
          <nav style={{
            position:     'relative',
            padding:      7,
            background:   'white',
            borderRadius: 40,
            display:      'flex',
            alignItems:   'center',
            height:       62,
          }}>
            <div style={{
              position:      'absolute',
              top:           7,
              left:          maskX + 7,
              width:         maskWidth,
              height:        'calc(100% - 14px)',
              background:    'black',
              borderRadius:  32,
              transition:    'left 400ms cubic-bezier(0.76,0,0.24,1), width 400ms cubic-bezier(0.76,0,0.24,1)',
              pointerEvents: 'none',
              zIndex:        0,
            }} />

            {(['grid', 'explore'] as const).map((v, i) => (
              <button
                key={v}
                ref={el => { tabRefs.current[i] = el }}
                onClick={() => setView(v)}
                style={{
                  position:      'relative',
                  zIndex:        1,
                  height:        48,
                  padding:       '0 32px',
                  background:    'transparent',
                  border:        'none',
                  fontFamily:    PP,
                  fontWeight:    400,
                  fontSize:      11,
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  color:         view === v ? 'white' : 'black',
                  transition:    'color 400ms cubic-bezier(0.76,0,0.24,1)',
                  whiteSpace:    'nowrap',
                  cursor:        'pointer',
                }}
              >
                {v === 'grid' ? 'Grid' : 'Explore'}
              </button>
            ))}
          </nav>

        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          GRID or EXPLORE
      ══════════════════════════════════════════════════════════════════ */}
      <div
        key={view}
        style={{ animation: `viewFadeIn 400ms ${EASE} forwards` }}
      >

        {/* ── GRID VIEW ─────────────────────────────────────────────── */}
        {view === 'grid' && (
          <div className="portfolio-grid" style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            columnGap:           24,
            rowGap:              70,
            padding:             '40px 40px 160px 40px',
            background:          '#000',
          }}>
            {filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}

            {filteredProjects.length === 0 && (
              <div style={{
                gridColumn:    '1 / -1',
                padding:       '80px 0',
                textAlign:     'center',
                fontFamily:    PP,
                fontSize:      13,
                letterSpacing: '3px',
                textTransform: 'uppercase',
                color:         'rgba(255,255,255,0.25)',
              }}>
                No projects in this category yet.
              </div>
            )}
          </div>
        )}

        {/* ── EXPLORE VIEW ──────────────────────────────────────────── */}
        {view === 'explore' && (
          <div style={{ background: '#000' }}>
            {filteredProjects.map((project, i) => {
              const next = filteredProjects[i + 1]
              const prog = sepProgress[i] ?? 0

              return (
                <div key={project.id}>

                  {/* ── Project card ── */}
                  <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      loading={i === 0 ? 'eager' : 'lazy'}
                      style={{
                        position:  'absolute',
                        inset:     0,
                        width:     '100%',
                        height:    '100%',
                        objectFit: 'cover',
                        display:   'block',
                      }}
                    />
                    <div style={{
                      position:   'absolute',
                      inset:      0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)',
                    }} />
                    <div style={{ position: 'absolute', bottom: 80, left: 40 }}>
                      <p style={{
                        fontFamily:    PP,
                        fontWeight:    400,
                        fontSize:      11,
                        letterSpacing: '3px',
                        textTransform: 'uppercase',
                        color:         'rgba(255,255,255,0.45)',
                        margin:        '0 0 16px 0',
                      }}>
                        {String(i + 1).padStart(2, '0')} / {String(filteredProjects.length).padStart(2, '0')} — {project.category}
                      </p>
                      <h2 style={{
                        fontFamily:    PP,
                        fontWeight:    900,
                        fontSize:      'clamp(40px, 6vw, 88px)',
                        color:         'white',
                        margin:        '0 0 28px 0',
                        lineHeight:    0.95,
                        textTransform: 'uppercase',
                        letterSpacing: '-0.01em',
                      }}>
                        {project.title}
                      </h2>
                      <Link
                        href={`/portfolio/${project.id}`}
                        style={{
                          fontFamily:          PP,
                          fontWeight:          400,
                          fontSize:            11,
                          letterSpacing:       '3px',
                          textTransform:       'uppercase',
                          color:               'white',
                          textDecoration:      'underline',
                          textUnderlineOffset: '5px',
                        }}
                      >
                        View Project →
                      </Link>
                    </div>
                  </div>

                  {/* ── Between-project separator (not after last) ── */}
                  {next && (
                    <div
                      ref={el => { sepRefs.current[i] = el }}
                      style={{
                        position:            'relative',
                        height:              '100vh',
                        background:          '#0a0a0a',
                        display:             'grid',
                        gridTemplateColumns: '1fr 1fr',
                        alignItems:          'center',
                        padding:             '0 5vw',
                        borderTop:           '1px solid rgba(255,255,255,0.06)',
                        overflow:            'hidden',
                      }}
                    >
                      <div>
                        <p style={{
                          fontFamily:    PP,
                          fontWeight:    400,
                          fontSize:      11,
                          letterSpacing: '3px',
                          textTransform: 'uppercase',
                          color:         'rgba(255,255,255,0.3)',
                          margin:        '0 0 20px 0',
                        }}>
                          Keep scrolling for the next case study.
                        </p>
                        <p style={{
                          fontFamily:    PP,
                          fontWeight:    900,
                          fontSize:      'clamp(40px, 5.5vw, 80px)',
                          color:         'white',
                          margin:        0,
                          lineHeight:    0.95,
                          textTransform: 'uppercase',
                          letterSpacing: '-0.02em',
                        }}>
                          {next.title}
                        </p>
                      </div>

                      <div style={{ position: 'relative', height: 1 }}>
                        <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.12)' }} />
                        <div style={{
                          position:   'absolute',
                          left:        0,
                          top:         0,
                          height:      1,
                          width:       `${prog * 100}%`,
                          background:  'white',
                          transition:  'width 80ms linear',
                        }} />
                      </div>

                      <div style={{
                        position:  'absolute',
                        bottom:    0,
                        left:      0,
                        right:     0,
                        height:    '42vh',
                        overflow:  'hidden',
                      }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={next.coverImage}
                          alt={next.title}
                          loading="lazy"
                          style={{
                            width:      '100%',
                            height:     '100%',
                            objectFit:  'cover',
                            display:    'block',
                            opacity:    Math.min(1, Math.max(0, prog * 2 - 0.4)),
                            transform:  `scale(${1 + (1 - prog) * 0.04})`,
                            transition: 'opacity 80ms linear, transform 80ms linear',
                          }}
                        />
                        <div style={{
                          position:      'absolute',
                          inset:          0,
                          background:    'linear-gradient(to bottom, #0a0a0a 0%, transparent 40%)',
                          pointerEvents: 'none',
                        }} />
                      </div>
                    </div>
                  )}

                </div>
              )
            })}

            {filteredProjects.length === 0 && (
              <div style={{
                padding:       '160px 40px',
                textAlign:     'center',
                fontFamily:    PP,
                fontSize:      13,
                letterSpacing: '3px',
                textTransform: 'uppercase',
                color:         'rgba(255,255,255,0.25)',
              }}>
                No projects in this category yet.
              </div>
            )}
          </div>
        )}

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .work-marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 22s linear infinite;
        }
        @keyframes viewFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 767px) {
          .portfolio-grid > * {
            grid-column: 1 / -1 !important;
          }
        }
      ` }} />

    </div>
  )
}
