'use client'

import Link from 'next/link'
import { PROJECTS, type Project } from '@/lib/projects'

const PP = "'PPNeueCorp', system-ui, sans-serif"

export default function PortfolioGrid() {
  return (
    <div style={{
      maxWidth: 1200,
      margin:   '0 auto',
      padding:  '0 48px 120px',
    }}>
      <div style={{
        display:             'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
        gap:                 28,
      }}>
        {PROJECTS.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const teaser = project.brief.length > 80
    ? project.brief.slice(0, 80) + '…'
    : project.brief

  return (
    <Link
      href={`/portfolio/${project.id}`}
      style={{
        display:        'block',
        textDecoration: 'none',
        background:     '#1a1a1a',
        borderRadius:   16,
        overflow:       'hidden',
        border:         '1px solid rgba(255,255,255,0.06)',
        cursor:         'pointer',
        transition:     'transform 0.3s, box-shadow 0.3s, border-color 0.3s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform   = 'translateY(-6px)'
        e.currentTarget.style.boxShadow   = '0 20px 60px rgba(0,0,0,0.5)'
        e.currentTarget.style.borderColor = 'rgba(208,39,75,0.2)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform   = 'translateY(0)'
        e.currentTarget.style.boxShadow   = 'none'
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
      }}
    >
      {/* Cover image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={project.coverImage}
        alt={project.title}
        style={{ width: '100%', height: 220, objectFit: 'cover', display: 'block' }}
      />

      {/* Content */}
      <div style={{ padding: '20px 24px 24px' }}>
        <p style={{
          fontFamily:    PP,
          fontWeight:    800,
          fontSize:      10,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color:         '#D0274B',
          marginBottom:  6,
        }}>
          {project.category}
        </p>
        <h2 style={{
          fontFamily: PP,
          fontWeight: 800,
          fontSize:   20,
          color:      '#fff',
          margin:     '0 0 4px',
          lineHeight: 1.2,
        }}>
          {project.title}
        </h2>
        <p style={{
          fontFamily:   PP,
          fontWeight:   400,
          fontSize:     13,
          color:        '#919191',
          marginBottom: 8,
        }}>
          {project.market} · {project.year}
        </p>
        <p style={{
          fontFamily:   PP,
          fontWeight:   400,
          fontSize:     13,
          color:        '#666',
          lineHeight:   1.5,
          marginBottom: 16,
        }}>
          {teaser}
        </p>
        <span style={{
          fontFamily:    PP,
          fontWeight:    800,
          fontSize:      12,
          color:         '#D0274B',
          letterSpacing: '0.04em',
        }}>
          View project →
        </span>
      </div>
    </Link>
  )
}
