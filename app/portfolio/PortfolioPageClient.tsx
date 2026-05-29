'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
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

// ─── Main component ───────────────────────────────────────────────────────────

export default function PortfolioPageClient() {
  const [filterOpen,   setFilterOpen]   = useState(false)
  const [activeFilter, setActiveFilter] = useState('All Projects')
  const [view,         setView]         = useState<'grid' | 'explore'>('grid')
  const [maskX,        setMaskX]        = useState(0)
  const [maskWidth,    setMaskWidth]    = useState(0)

  const tabRefs     = useRef<(HTMLButtonElement | null)[]>([])
  const dropdownRef = useRef<HTMLDivElement>(null)

  // ── Sliding pill: update position whenever view changes ───────────────────
  useEffect(() => {
    const idx = view === 'grid' ? 0 : 1
    const el = tabRefs.current[idx]
    if (!el || !el.parentElement) return
    const pRect = el.parentElement.getBoundingClientRect()
    const eRect = el.getBoundingClientRect()
    setMaskX(eRect.left - pRect.left)
    setMaskWidth(eRect.width)
  }, [view])

  // ── Sliding pill: initialise on mount ─────────────────────────────────────
  useEffect(() => {
    const el = tabRefs.current[0]
    if (!el || !el.parentElement) return
    const pRect = el.parentElement.getBoundingClientRect()
    const eRect = el.getBoundingClientRect()
    setMaskX(eRect.left - pRect.left)
    setMaskWidth(eRect.width)
  }, [])

  // ── Close dropdown on outside click ───────────────────────────────────────
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setFilterOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // ── Filter logic ──────────────────────────────────────────────────────────
  const filteredProjects = activeFilter === 'All Projects'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeFilter)

  const filteredCount = filteredProjects.length
  const totalCount    = String(PROJECTS.length).padStart(2, '0')

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div style={{ background: '#000', minHeight: '100vh', color: 'white' }}>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 1 — PAGE HEADER
          Simple label row, no hero, no marquee — straight into content.
      ══════════════════════════════════════════════════════════════════════ */}
      <div style={{
        padding:         '120px 40px 60px 40px',
        display:         'flex',
        justifyContent:  'space-between',
        alignItems:      'center',
      }}>
        <span style={{
          fontFamily:    PP,
          fontWeight:    400,
          fontSize:      11,
          letterSpacing: '4px',
          textTransform: 'uppercase',
          color:         'rgba(255,255,255,0.4)',
        }}>
          Portfolio
        </span>
        <span style={{
          fontFamily:    PP,
          fontWeight:    400,
          fontSize:      11,
          letterSpacing: '4px',
          textTransform: 'uppercase',
          color:         'rgba(255,255,255,0.4)',
        }}>
          ({totalCount})
        </span>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 2 — STICKY FILTER BAR
          Sticks at top: 96 (below the 96px fixed nav).
          LEFT:  category dropdown pill
          RIGHT: Grid / Explore sliding pill tabs
      ══════════════════════════════════════════════════════════════════════ */}
      <div style={{
        position:              'sticky',
        top:                   96,
        zIndex:                40,
        background:            'rgba(0,0,0,0.9)',
        backdropFilter:        'blur(16px)',
        WebkitBackdropFilter:  'blur(16px)',
        height:                72,
        padding:               '0 40px',
        display:               'flex',
        justifyContent:        'space-between',
        alignItems:            'center',
      }}>

        {/* ── LEFT — Category dropdown ──────────────────────────────── */}
        <div ref={dropdownRef} style={{ position: 'relative' }}>
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            style={{
              height:        42,
              borderRadius:  40,
              background:    'rgba(255,255,255,0.08)',
              border:        '1px solid rgba(255,255,255,0.12)',
              display:       'flex',
              alignItems:    'center',
              gap:           12,
              padding:       '0 20px',
              fontFamily:    PP,
              fontWeight:    400,
              fontSize:      11,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color:         'white',
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
              top:          50,
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
                    transition:    'all 200ms ease',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── RIGHT — Grid / Explore sliding pill tabs ──────────────── */}
        <nav style={{
          position:     'relative',
          padding:      6,
          background:   'rgba(255,255,255,0.08)',
          border:       '1px solid rgba(255,255,255,0.12)',
          borderRadius: 40,
          display:      'flex',
        }}>
          {/* Sliding white active indicator */}
          <div style={{
            position:      'absolute',
            top:           6,
            left:          maskX + 6,
            width:         maskWidth,
            height:        'calc(100% - 12px)',
            background:    'white',
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
                height:        42,
                padding:       '0 24px',
                background:    'transparent',
                border:        'none',
                fontFamily:    PP,
                fontWeight:    400,
                fontSize:      11,
                letterSpacing: '3px',
                textTransform: 'uppercase',
                color:         view === v ? '#000' : 'rgba(255,255,255,0.5)',
                transition:    'color 400ms cubic-bezier(0.76,0,0.24,1)',
                whiteSpace:    'nowrap',
              }}
            >
              {v === 'grid' ? 'Grid' : 'Explore'}
            </button>
          ))}
        </nav>

      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 3+5 — GRID or EXPLORE
          key={view} forces remount on switch → re-triggers viewFadeIn.
      ══════════════════════════════════════════════════════════════════════ */}
      <div
        key={view}
        style={{ animation: `viewFadeIn 400ms ${EASE} forwards` }}
      >

        {/* ── GRID VIEW ─────────────────────────────────────────────── */}
        {view === 'grid' && (
          <div style={{
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

            {/* Empty state */}
            {filteredProjects.length === 0 && (
              <div style={{
                gridColumn:  '1 / -1',
                padding:     '80px 0',
                textAlign:   'center',
                fontFamily:  PP,
                fontSize:    13,
                letterSpacing: '3px',
                textTransform: 'uppercase',
                color:       'rgba(255,255,255,0.25)',
              }}>
                No projects in this category yet.
              </div>
            )}
          </div>
        )}

        {/* ── EXPLORE VIEW ──────────────────────────────────────────── */}
        {view === 'explore' && (
          <div style={{ background: '#000', paddingBottom: 80 }}>
            {filteredProjects.map((project, i) => (
              <div key={project.id} style={{
                position: 'relative',
                height:   '100vh',
                overflow: 'hidden',
              }}>
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  sizes="100vw"
                  style={{ objectFit: 'cover' }}
                  priority={i === 0}
                />

                {/* Bottom gradient overlay */}
                <div style={{
                  position:   'absolute',
                  inset:      0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)',
                }} />

                {/* Project info — bottom left */}
                <div style={{
                  position: 'absolute',
                  bottom:   80,
                  left:     40,
                }}>
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
            ))}

            {/* Empty state */}
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

      {/* ── Responsive grid overrides ────────────────────────────────── */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 767px) {
          .portfolio-grid > * {
            grid-column: 1 / -1 !important;
          }
        }
      ` }} />

    </div>
  )
}
