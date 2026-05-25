'use client'

import { useState } from 'react'
import Link from 'next/link'
import { PROJECTS, type Project } from '@/lib/projects'
import { SERVICES } from '@/lib/services-data'

const PP  = "'PPNeueCorp', system-ui, sans-serif"
const RED = '#D0274B'

// ─── Grid config: 8 projects, 12-column alternating layout ───────────────────

const GRID_CONFIG = [
  { gridColumn: '1 / 8',  aspectRatio: '4/3'  }, // [0] Pattern A — large left
  { gridColumn: '8 / 13', aspectRatio: '3/4'  }, // [1] Pattern A — small right
  { gridColumn: '1 / 5',  aspectRatio: '1/1'  }, // [2] Pattern B — equal third
  { gridColumn: '5 / 9',  aspectRatio: '1/1'  }, // [3] Pattern B — equal third
  { gridColumn: '9 / 13', aspectRatio: '1/1'  }, // [4] Pattern B — equal third
  { gridColumn: '1 / 6',  aspectRatio: '3/4'  }, // [5] Pattern C — small left
  { gridColumn: '6 / 13', aspectRatio: '4/3'  }, // [6] Pattern C — large right
  { gridColumn: '1 / 13', aspectRatio: '21/9' }, // [7] Pattern D — full-width hero
]

// ─── Filter bar ───────────────────────────────────────────────────────────────

const FILTERS = [
  { id: 'all', label: 'All' },
  ...SERVICES.map(s => ({ id: s.id, label: s.name })),
]

function isProjectVisible(project: Project, filterId: string): boolean {
  if (filterId === 'all') return true
  const svc = SERVICES.find(s => s.id === filterId)
  return svc ? svc.projectIds.includes(project.id) : false
}

// ─── Project card ─────────────────────────────────────────────────────────────

function ProjectCard({
  project,
  gridColumn,
  aspectRatio,
  visible,
}: {
  project: Project
  gridColumn: string
  aspectRatio: string
  visible: boolean
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <div style={{
      gridColumn,
      opacity:       visible ? 1 : 0,
      pointerEvents: visible ? 'auto' : 'none',
      transition:    'opacity 0.35s ease',
    }}>
      <Link
        href={`/portfolio/${project.id}`}
        style={{ display: 'block', textDecoration: 'none' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image container */}
        <div style={{
          aspectRatio,
          overflow: 'hidden',
          display:  'block',
          width:    '100%',
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.coverImage}
            alt={project.title}
            style={{
              width:      '100%',
              height:     '100%',
              objectFit:  'cover',
              display:    'block',
              transform:  hovered ? 'scale(1.03)' : 'scale(1)',
              transition: 'transform 0.5s ease',
            }}
          />
        </div>

        {/* Caption */}
        <div style={{ marginTop: 20 }}>
          <p style={{
            fontFamily:    PP,
            fontWeight:    400,
            fontSize:      11,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color:         '#919191',
            marginBottom:  6,
          }}>
            {project.category}
          </p>
          <h2 style={{
            fontFamily:   PP,
            fontWeight:   900,
            fontSize:     22,
            color:        hovered ? RED : '#292929',
            marginBottom: 4,
            lineHeight:   1.15,
            transition:   'color 0.25s',
          }}>
            {project.title}
          </h2>
          <p style={{ fontFamily: PP, fontSize: 14, color: '#919191', marginBottom: 4, lineHeight: 1.4 }}>
            {project.subtitle}
          </p>
          <p style={{ fontFamily: PP, fontSize: 12, color: '#919191' }}>
            {project.market} · {project.year}
          </p>
        </div>
      </Link>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function PortfolioPageClient() {
  const [activeFilter, setActiveFilter] = useState('all')

  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>

      {/* ── Header ──────────────────────────────────────────────────── */}
      <div style={{ padding: 'clamp(100px, 12vw, 140px) clamp(24px, 6vw, 80px) 60px' }}>
        <p style={{
          fontFamily:    PP,
          fontWeight:    400,
          fontSize:      11,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color:         '#919191',
          marginBottom:  16,
        }}>
          Our Work
        </p>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 20, flexWrap: 'wrap' }}>
          <h1 style={{
            fontFamily:    PP,
            fontWeight:    900,
            fontSize:      'clamp(48px, 8vw, 72px)',
            color:         '#292929',
            lineHeight:    1.0,
            letterSpacing: '-0.02em',
          }}>
            Portfolio
          </h1>
          <span style={{ fontFamily: PP, fontSize: 14, color: '#919191' }}>
            ({PROJECTS.length} projects)
          </span>
        </div>
      </div>

      {/* ── Filter bar ──────────────────────────────────────────────── */}
      <div style={{
        position:     'sticky',
        top:          72,
        zIndex:       40,
        background:   '#FFFFFF',
        borderBottom: '1px solid #E8E8E8',
        padding:      '0 clamp(24px, 6vw, 80px)',
        display:      'flex',
        gap:          'clamp(16px, 2vw, 32px)',
        overflowX:    'auto',
        scrollbarWidth: 'none',
      }}>
        {FILTERS.map(f => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id)}
            style={{
              fontFamily:    PP,
              fontWeight:    800,
              fontSize:      12,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color:         activeFilter === f.id ? '#292929' : '#919191',
              background:    'none',
              border:        'none',
              borderBottom:  activeFilter === f.id ? `2px solid ${RED}` : '2px solid transparent',
              padding:       '14px 0',
              cursor:        'pointer',
              transition:    'color 0.2s, border-color 0.2s',
              whiteSpace:    'nowrap',
              flexShrink:    0,
            }}
            onMouseEnter={e => { if (activeFilter !== f.id) e.currentTarget.style.color = '#292929' }}
            onMouseLeave={e => { if (activeFilter !== f.id) e.currentTarget.style.color = '#919191' }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* ── Projects grid ───────────────────────────────────────────── */}
      <div style={{
        padding: '60px clamp(24px, 6vw, 80px) 120px',
      }}>
        {/* Desktop 12-col layout */}
        <div
          className="portfolio-grid-desktop"
          style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            columnGap:           32,
            rowGap:              80,
          }}
        >
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              gridColumn={GRID_CONFIG[i]?.gridColumn ?? '1 / -1'}
              aspectRatio={GRID_CONFIG[i]?.aspectRatio ?? '4/3'}
              visible={isProjectVisible(project, activeFilter)}
            />
          ))}
        </div>

        {/* Mobile / tablet fallback handled via CSS in globals */}
      </div>

      <style>{`
        @media (max-width: 767px) {
          .portfolio-grid-desktop > * {
            grid-column: 1 / -1 !important;
          }
          .portfolio-grid-desktop > * > a > div:first-child {
            aspect-ratio: 3/2 !important;
          }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .portfolio-grid-desktop > *:nth-child(odd)  { grid-column: 1 / 7 !important; }
          .portfolio-grid-desktop > *:nth-child(even) { grid-column: 7 / 13 !important; }
          .portfolio-grid-desktop > * > a > div:first-child {
            aspect-ratio: 4/3 !important;
          }
        }
      `}</style>
    </div>
  )
}
