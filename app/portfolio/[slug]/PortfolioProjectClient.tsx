'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Project } from '@/lib/projects'

const PP  = "'PPNeueCorp', system-ui, sans-serif"
const RED = '#D0274B'

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 20 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const, delay },
})

export default function PortfolioProjectClient({ project }: { project: Project }) {
  const heroRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const img = heroRef.current
    if (!img) return
    img.style.opacity = '0'
    const onLoad = () => {
      img.style.transition = 'opacity 0.8s ease'
      img.style.opacity    = '1'
    }
    if (img.complete) { onLoad() } else { img.addEventListener('load', onLoad) }
    return () => img.removeEventListener('load', onLoad)
  }, [])

  return (
    <div style={{ backgroundColor: '#292929', minHeight: '100vh', paddingBottom: 0 }}>

      {/* ── Top navigation ────────────────────────────────────────────── */}
      <div style={{ paddingTop: 90, paddingLeft: 48, paddingRight: 48, maxWidth: 860, margin: '0 auto' }}>
        <Link
          href="/portfolio"
          style={{
            display:        'inline-block',
            fontFamily:     PP,
            fontWeight:     400,
            fontSize:       13,
            color:          '#919191',
            textDecoration: 'none',
            marginBottom:   0,
            transition:     'color 0.2s',
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#fff')}
          onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#919191')}
        >
          ← All Projects
        </Link>
      </div>

      {/* ── Hero section ──────────────────────────────────────────────── */}
      <div style={{ position: 'relative', marginTop: 20 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={heroRef}
          src={project.coverImage}
          alt={project.title}
          style={{
            width:      '100%',
            height:     500,
            objectFit:  'cover',
            display:    'block',
          }}
        />
        {/* Fade gradient into page background */}
        <div style={{
          position:   'absolute',
          bottom:     0,
          left:       0,
          right:      0,
          height:     200,
          background: 'linear-gradient(to bottom, transparent 0%, #292929 100%)',
          pointerEvents: 'none',
        }} />
      </div>

      {/* ── Content area ──────────────────────────────────────────────── */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 48px 120px' }}>

        {/* Meta row — overlaps hero bottom */}
        <motion.div {...fadeUp(0)} style={{ marginTop: -40, marginBottom: 0, display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <span style={{
            background:   'rgba(208,39,75,0.9)',
            color:        '#fff',
            borderRadius: 6,
            padding:      '5px 12px',
            fontSize:     11,
            fontFamily:   PP,
            fontWeight:   700,
          }}>
            {project.category}
          </span>
          <span style={{ fontFamily: PP, fontSize: 14, color: 'rgba(255,255,255,0.8)', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
            · {project.market} · {project.year}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          {...fadeUp(0.05)}
          style={{
            fontFamily:    PP,
            fontWeight:    900,
            fontSize:      'clamp(34px, 6vw, 56px)',
            color:         '#fff',
            lineHeight:    1.05,
            letterSpacing: '-0.01em',
            marginTop:     20,
            marginBottom:  0,
          }}
        >
          {project.title}
        </motion.h1>

        {/* Divider */}
        <motion.div
          {...fadeUp(0.1)}
          style={{ height: 1, background: 'rgba(255,255,255,0.1)', margin: '40px 0' }}
        />

        {/* Four content sections */}
        {[
          { label: 'The Brief',     body: project.brief,     large: false, delay: 0.12 },
          { label: 'The Diagnosis', body: project.diagnosis, large: false, delay: 0.2 },
          { label: 'What We Built', body: project.built,     large: false, delay: 0.28 },
          { label: 'The Result',    body: project.result,    large: true,  delay: 0.36 },
        ].map(({ label, body, large, delay }) => (
          <motion.div key={label} {...fadeUp(delay)} style={{ marginBottom: 48 }}>
            <p style={{
              fontFamily:    PP,
              fontWeight:    800,
              fontSize:      10,
              color:         RED,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom:  10,
            }}>
              {label}
            </p>
            <p style={{
              fontFamily:  PP,
              fontWeight:  large ? 600 : 400,
              fontSize:    large ? 22 : 17,
              color:       '#FFFFFF',
              lineHeight:  1.85,
              maxWidth:    680,
            }}>
              {body}
            </p>
          </motion.div>
        ))}

        {/* Services row */}
        <motion.div {...fadeUp(0.44)} style={{ marginBottom: 72 }}>
          <p style={{
            fontFamily:    PP,
            fontWeight:    800,
            fontSize:      10,
            color:         RED,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom:  12,
          }}>
            Services
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {project.services.map(s => (
              <span key={s} style={{
                background:   'rgba(255,255,255,0.06)',
                border:       '1px solid rgba(255,255,255,0.1)',
                borderRadius: 20,
                padding:      '6px 14px',
                color:        '#999',
                fontSize:     12,
                fontFamily:   PP,
              }}>{s}</span>
            ))}
          </div>
        </motion.div>

        {/* Placeholder for additional project images */}
        {/* Additional project images — add to public/images/portfolio/[slug]/ when available */}

        {/* CTA */}
        <motion.div
          {...fadeUp(0.5)}
          style={{
            borderTop:   '1px solid rgba(255,255,255,0.1)',
            paddingTop:  48,
            marginBottom: 80,
          }}
        >
          <h2 style={{
            fontFamily:   PP,
            fontWeight:   900,
            fontSize:     32,
            color:        '#fff',
            marginBottom: 12,
            lineHeight:   1.2,
          }}>
            Start your own engagement.
          </h2>
          <p style={{
            fontFamily:  PP,
            fontWeight:  400,
            fontSize:    16,
            color:       '#919191',
            margin:      '0 0 28px',
            lineHeight:  1.6,
          }}>
            Every project begins with a diagnosis.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <Link
              href="/contact"
              style={{
                display:       'inline-block',
                padding:       '14px 28px',
                background:    RED,
                color:         '#fff',
                fontFamily:    PP,
                fontWeight:    800,
                fontSize:      12,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                textDecoration:'none',
                borderRadius:  10,
                transition:    'background 0.2s',
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.background = '#b8223f')}
              onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.background = RED)}
            >
              Start the conversation →
            </Link>
            <Link
              href="/portfolio"
              style={{
                display:       'inline-block',
                padding:       '14px 28px',
                background:    'transparent',
                color:         '#fff',
                fontFamily:    PP,
                fontWeight:    800,
                fontSize:      12,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                textDecoration:'none',
                borderRadius:  10,
                border:        '1px solid rgba(255,255,255,0.2)',
                transition:    'border-color 0.2s',
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.borderColor = RED)}
              onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.2)')}
            >
              ← Back to portfolio
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  )
}
