'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Project } from '@/lib/projects'

// ─── Tokens ───────────────────────────────────────────────────────────────────

const PP  = "'PPNeueCorp', system-ui, sans-serif"
const RED = '#D0274B'

// ─── Fade-up variant factory ──────────────────────────────────────────────────

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 20 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const, delay },
})

// ─── Component ────────────────────────────────────────────────────────────────

export default function ProjectPageClient({ project }: { project: Project }) {
  const heroRef = useRef<HTMLImageElement>(null)

  // Hero fade-in on load
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
    <div style={{ backgroundColor: '#292929', minHeight: '100vh', paddingBottom: 120 }}>
      <div
        style={{
          maxWidth:    900,
          margin:      '0 auto',
          padding:     '0 24px',
          paddingTop:  100,
        }}
      >
        {/* ── Back link ──────────────────────────────────────────────────── */}
        <Link
          href="/work"
          style={{
            display:        'inline-block',
            fontFamily:     PP,
            fontWeight:     400,
            fontSize:       14,
            color:          '#919191',
            textDecoration: 'none',
            marginBottom:   32,
            transition:     'color 0.2s',
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#fff')}
          onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#919191')}
        >
          ← Work
        </Link>

        {/* ── Hero image ─────────────────────────────────────────────────── */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={heroRef}
          src={project.coverImage}
          alt={project.title}
          style={{
            width:      '100%',
            maxHeight:  480,
            objectFit:  'cover',
            display:    'block',
            marginBottom: 0,
          }}
        />

        {/* ── Category ───────────────────────────────────────────────────── */}
        <motion.p
          {...fadeUp(0)}
          style={{
            fontFamily:    PP,
            fontWeight:    800,
            fontSize:      11,
            color:         RED,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginTop:     40,
            marginBottom:  14,
          }}
        >
          {project.category}
        </motion.p>

        {/* ── Title ──────────────────────────────────────────────────────── */}
        <motion.h1
          {...fadeUp(0.05)}
          style={{
            fontFamily:    PP,
            fontWeight:    900,
            fontSize:      52,
            color:         '#fff',
            lineHeight:    1.1,
            letterSpacing: '-0.01em',
            marginBottom:  10,
          }}
        >
          {project.title}
        </motion.h1>

        {/* ── Subtitle ───────────────────────────────────────────────────── */}
        <motion.p
          {...fadeUp(0.1)}
          style={{
            fontFamily:  PP,
            fontWeight:  400,
            fontSize:    18,
            color:       '#919191',
            marginBottom: 20,
          }}
        >
          {project.subtitle}
        </motion.p>

        {/* ── Meta row ───────────────────────────────────────────────────── */}
        <motion.p
          {...fadeUp(0.15)}
          style={{
            fontFamily:  PP,
            fontWeight:  400,
            fontSize:    14,
            color:       '#919191',
            marginBottom: 40,
          }}
        >
          {project.market} · {project.year} · {project.services.join(', ')}
        </motion.p>

        {/* ── Divider ────────────────────────────────────────────────────── */}
        <motion.div
          {...fadeUp(0.18)}
          style={{ height: 1, background: '#333', marginBottom: 48 }}
        />

        {/* ── Content sections ───────────────────────────────────────────── */}

        {/* The Brief */}
        <motion.div {...fadeUp(0.2)} style={{ marginBottom: 48 }}>
          <p style={{ fontFamily: PP, fontWeight: 800, fontSize: 11, color: RED, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>
            The Brief
          </p>
          <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 17, color: '#fff', lineHeight: 1.8, maxWidth: 680 }}>
            {project.brief}
          </p>
        </motion.div>

        {/* The Diagnosis */}
        <motion.div {...fadeUp(0.3)} style={{ marginBottom: 48 }}>
          <p style={{ fontFamily: PP, fontWeight: 800, fontSize: 11, color: RED, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>
            The Diagnosis
          </p>
          <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 17, color: '#fff', lineHeight: 1.8, maxWidth: 680 }}>
            {project.diagnosis}
          </p>
        </motion.div>

        {/* What We Built */}
        <motion.div {...fadeUp(0.4)} style={{ marginBottom: 48 }}>
          <p style={{ fontFamily: PP, fontWeight: 800, fontSize: 11, color: RED, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>
            What We Built
          </p>
          <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 17, color: '#fff', lineHeight: 1.8, maxWidth: 680 }}>
            {project.built}
          </p>
        </motion.div>

        {/* The Result — larger emphasis */}
        <motion.div {...fadeUp(0.5)} style={{ marginBottom: 48 }}>
          <p style={{ fontFamily: PP, fontWeight: 800, fontSize: 11, color: RED, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>
            The Result
          </p>
          <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 22, color: '#fff', lineHeight: 1.7, maxWidth: 680, opacity: 0.95 }}>
            {project.result}
          </p>
        </motion.div>

        {/* ── Services chips ──────────────────────────────────────────────── */}
        <motion.div {...fadeUp(0.55)} style={{ marginBottom: 80 }}>
          <p style={{ fontFamily: PP, fontWeight: 800, fontSize: 11, color: RED, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 14 }}>
            Services
          </p>
          <div style={{ display: 'inline-flex', flexWrap: 'wrap', gap: 8 }}>
            {project.services.map(s => (
              <span
                key={s}
                style={{
                  fontFamily:  PP,
                  fontWeight:  400,
                  fontSize:    13,
                  color:       '#919191',
                  background:  '#1a1a1a',
                  border:      '1px solid #333',
                  borderRadius: 4,
                  padding:     '6px 14px',
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </motion.div>

        {/* ── CTA ─────────────────────────────────────────────────────────── */}
        <motion.div
          {...fadeUp(0.6)}
          style={{
            borderTop:   '1px solid #333',
            paddingTop:  40,
          }}
        >
          <h2 style={{
            fontFamily:   PP,
            fontWeight:   900,
            fontSize:     28,
            color:        '#fff',
            marginBottom: 10,
            lineHeight:   1.2,
          }}>
            Ready to diagnose your brand?
          </h2>
          <p style={{
            fontFamily:  PP,
            fontWeight:  400,
            fontSize:    16,
            color:       '#919191',
            marginBottom: 28,
            lineHeight:  1.6,
          }}>
            Every engagement starts with a question, not a quote.
          </p>
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
              borderRadius:  40,
              transition:    'background 0.2s',
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.background = '#b8223f')}
            onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.background = RED)}
          >
            Start the conversation →
          </Link>
        </motion.div>

      </div>
    </div>
  )
}
