'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import type { Project } from '@/lib/projects'

const PP  = "'PPNeueCorp', system-ui, sans-serif"
const RED = '#D0274B'

// ─── Scroll-reveal hook ───────────────────────────────────────────────────────

function useReveal(delay = 0) {
  const ref  = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)

  useEffect(() => {
    const el  = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVis(true); obs.disconnect() } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return {
    ref,
    style: {
      opacity:    vis ? 1 : 0,
      transform:  vis ? 'translateY(0)' : 'translateY(20px)',
      transition: `opacity 0.7s ease-out ${delay}s, transform 0.7s ease-out ${delay}s`,
    } as React.CSSProperties,
  }
}

// ─── More-work card ───────────────────────────────────────────────────────────

function MoreWorkCard({ project }: { project: Project }) {
  const [hov, setHov] = useState(false)
  return (
    <Link
      href={`/portfolio/${project.id}`}
      style={{ display: 'block', textDecoration: 'none', flex: '1 1 0' }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div style={{ overflow: 'hidden', aspectRatio: '4/3', marginBottom: 16 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img loading="lazy"
          src={project.coverImage}
          alt={project.title}
          style={{
            width: '100%', height: '100%', objectFit: 'cover', display: 'block',
            transform: hov ? 'scale(1.03)' : 'scale(1)',
            transition: 'transform 0.5s ease',
          }}
        />
      </div>
      <p style={{ fontFamily: PP, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#919191', marginBottom: 6 }}>
        {project.category}
      </p>
      <h3 style={{ fontFamily: PP, fontWeight: 900, fontSize: 20, color: hov ? RED : '#292929', transition: 'color 0.25s', lineHeight: 1.15, textTransform: 'uppercase' }}>
        {project.title}
      </h3>
      <p style={{ fontFamily: PP, fontSize: 13, color: '#919191', marginTop: 4 }}>
        {project.market} · {project.year}
      </p>
    </Link>
  )
}

// ─── Scroll indicator ─────────────────────────────────────────────────────────

function ScrollIndicator() {
  return (
    <div style={{
      position:   'absolute',
      bottom:     48,
      left:       '50%',
      transform:  'translateX(-50%)',
      display:    'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap:        8,
      color:      'rgba(255,255,255,0.5)',
    }}>
      <span style={{ fontFamily: PP, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
        Scroll
      </span>
      <svg width="16" height="24" viewBox="0 0 16 24" fill="none" style={{ animation: 'bounce 1.8s infinite' }}>
        <path d="M8 0v20M1 13l7 7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <style>{`@keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }`}</style>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

interface Props {
  project: Project
  moreWork: Project[]
}

export default function PortfolioProjectClient({ project, moreWork }: Props) {
  const rChallenge   = useReveal()
  const rImage1      = useReveal(0.1)
  const rDiagnosis   = useReveal()
  const rBuilt       = useReveal(0.15)
  const rImage2      = useReveal()
  const rResult      = useReveal()
  const rDeliv       = useReveal()
  const rNav         = useReveal()
  const rMore        = useReveal()

  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>

      {/* ══ SECTION 1 — Hero ══════════════════════════════════════════ */}
      <section style={{
        position:   'relative',
        minHeight:  '100vh',
        display:    'flex',
        alignItems: 'flex-end',
      }}>
        {/* Background image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img loading="lazy"
          src={project.coverImage}
          alt={project.title}
          style={{
            position:    'absolute',
            inset:       0,
            width:       '100%',
            height:      '100%',
            objectFit:   'cover',
            objectPosition: 'center',
          }}
        />
        {/* Dark overlay */}
        <div style={{
          position:   'absolute',
          inset:       0,
          background:  'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.6) 100%)',
        }} />

        {/* Content — bottom left */}
        <div style={{
          position: 'relative',
          padding:  'clamp(40px, 5vw, 80px)',
          maxWidth: 900,
        }}>
          <p style={{
            fontFamily:    PP,
            fontWeight:    400,
            fontSize:      12,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color:         'rgba(255,255,255,0.7)',
            marginBottom:  16,
          }}>
            Case Study
          </p>
          <h1 style={{
            fontFamily:    PP,
            fontWeight:    900,
            fontSize:      'clamp(48px, 7vw, 96px)',
            color:         '#FFFFFF',
            lineHeight:    1.0,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            marginBottom:  16,
          }}>
            {project.title}
          </h1>
          <p style={{
            fontFamily:  PP,
            fontWeight:  400,
            fontSize:    22,
            color:       'rgba(255,255,255,0.75)',
            marginBottom: 32,
            lineHeight:  1.4,
            textTransform: 'uppercase',
          }}>
            {project.subtitle}
          </p>
          {/* Services chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {project.services.map(s => (
              <span key={s} style={{
                border:        '1px solid rgba(255,255,255,0.4)',
                borderRadius:  20,
                padding:       '6px 14px',
                fontFamily:    PP,
                fontWeight:    400,
                fontSize:      11,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color:         'rgba(255,255,255,0.8)',
              }}>
                {s}
              </span>
            ))}
          </div>
        </div>

        <ScrollIndicator />
      </section>

      {/* ══ SECTION 2 — The Challenge ═════════════════════════════════ */}
      <section style={{ padding: '120px 0' }}>
        <div
          ref={rChallenge.ref}
          style={{ ...rChallenge.style, maxWidth: 800, margin: '0 auto', padding: '0 clamp(24px, 6vw, 80px)' }}
        >
          <p style={{
            fontFamily:    PP,
            fontWeight:    400,
            fontSize:      11,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color:         '#919191',
            marginBottom:  24,
          }}>
            The Challenge
          </p>
          <p style={{
            fontFamily:  PP,
            fontWeight:  800,
            fontSize:    'clamp(22px, 3vw, 32px)',
            color:       '#292929',
            lineHeight:  1.5,
            textTransform: 'uppercase',
          }}>
            {project.brief}
          </p>
        </div>
      </section>

      {/* ══ SECTION 3 — First large image ════════════════════════════ */}
      <section>
        <div ref={rImage1.ref} style={{ ...rImage1.style, overflow: 'hidden' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img loading="lazy"
            src={project.coverImage}
            alt={`${project.title} — detail`}
            style={{
              width:     '100%',
              height:    '70vh',
              objectFit: 'cover',
              display:   'block',
            }}
          />
        </div>
      </section>

      {/* ══ SECTION 4 — Diagnosis + Solution ════════════════════════ */}
      <section style={{ padding: 'clamp(60px, 8vw, 120px) clamp(24px, 6vw, 80px)' }}>
        <div style={{ display: 'flex', gap: 'clamp(32px, 6vw, 80px)', flexWrap: 'wrap' }}>
          {/* Left — Diagnosis */}
          <div ref={rDiagnosis.ref} style={{ ...rDiagnosis.style, flex: '1 1 280px' }}>
            <p style={{
              fontFamily:    PP,
              fontWeight:    400,
              fontSize:      11,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color:         '#919191',
              marginBottom:  24,
            }}>
              The Diagnosis
            </p>
            <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 18, color: '#292929', lineHeight: 1.75 }}>
              {project.diagnosis}
            </p>
          </div>

          {/* Right — What We Built */}
          <div ref={rBuilt.ref} style={{ ...rBuilt.style, flex: '1 1 280px' }}>
            <p style={{
              fontFamily:    PP,
              fontWeight:    400,
              fontSize:      11,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color:         '#919191',
              marginBottom:  24,
            }}>
              What We Built
            </p>
            <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 18, color: '#292929', lineHeight: 1.75 }}>
              {project.built}
            </p>
          </div>
        </div>
      </section>

      {/* ══ SECTION 5 — Second image (right-aligned, 65%) ═══════════ */}
      <section style={{ padding: '0 clamp(24px, 6vw, 80px) 120px' }}>
        <div ref={rImage2.ref} style={{ ...rImage2.style, marginLeft: 'auto', width: '65%', minWidth: 280 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img loading="lazy"
            src={project.coverImage}
            alt={`${project.title} — work`}
            style={{
              width:     '100%',
              height:    500,
              objectFit: 'cover',
              display:   'block',
            }}
          />
        </div>
      </section>

      {/* ══ SECTION 6 — The Result (dark) ════════════════════════════ */}
      <section style={{ background: '#000000', padding: 'clamp(60px, 8vw, 120px) clamp(24px, 6vw, 80px)' }}>
        <div ref={rResult.ref} style={rResult.style}>
          <p style={{
            fontFamily:    PP,
            fontWeight:    400,
            fontSize:      11,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color:         RED,
            marginBottom:  24,
          }}>
            The Result
          </p>
          <p style={{
            fontFamily:  PP,
            fontWeight:  800,
            fontSize:    'clamp(24px, 3.5vw, 36px)',
            color:       '#FFFFFF',
            lineHeight:  1.5,
            textTransform: 'uppercase',
            maxWidth:    720,
            marginBottom: 40,
          }}>
            {project.result}
          </p>
          <p style={{ fontFamily: PP, fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>
            {project.market} · {project.year}
          </p>
        </div>
      </section>

      {/* ══ SECTION 7 — Deliverables ═════════════════════════════════ */}
      <section style={{ background: '#FFFFFF', padding: 'clamp(60px, 8vw, 120px) clamp(24px, 6vw, 80px)' }}>
        <div ref={rDeliv.ref} style={rDeliv.style}>
          <p style={{
            fontFamily:    PP,
            fontWeight:    400,
            fontSize:      11,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color:         '#919191',
            marginBottom:  32,
          }}>
            Deliverables
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {project.services.map(s => (
              <DeliverableChip key={s} label={s} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 8 — Navigation CTA ═══════════════════════════════ */}
      <section style={{ padding: '80px clamp(24px, 6vw, 80px)', borderTop: '1px solid #E8E8E8' }}>
        <div
          ref={rNav.ref}
          style={{
            ...rNav.style,
            display:       'flex',
            alignItems:    'center',
            justifyContent:'space-between',
            flexWrap:      'wrap',
            gap:           24,
          }}
        >
          <Link
            href="/portfolio"
            style={{ fontFamily: PP, fontWeight: 400, fontSize: 14, color: '#292929', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = RED)}
            onMouseLeave={e => (e.currentTarget.style.color = '#292929')}
          >
            ← Back to Portfolio
          </Link>

          <span style={{ fontFamily: PP, fontWeight: 900, fontSize: 12, color: '#292929', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Thinchronize
          </span>

          <Link
            href="/contact"
            style={{ fontFamily: PP, fontWeight: 400, fontSize: 14, color: RED, textDecoration: 'none', transition: 'opacity 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Start a project →
          </Link>
        </div>
      </section>

      {/* ══ SECTION 9 — More Work ════════════════════════════════════ */}
      {moreWork.length > 0 && (
        <section style={{ padding: '0 clamp(24px, 6vw, 80px) 80px' }}>
          <div ref={rMore.ref} style={rMore.style}>
            <p style={{
              fontFamily:    PP,
              fontWeight:    400,
              fontSize:      11,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color:         '#919191',
              marginBottom:  40,
            }}>
              More Work
            </p>
            <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
              {moreWork.map(p => <MoreWorkCard key={p.id} project={p} />)}
            </div>
          </div>
        </section>
      )}

    </div>
  )
}

// ─── Deliverable chip with hover ──────────────────────────────────────────────

function DeliverableChip({ label }: { label: string }) {
  const [hov, setHov] = useState(false)
  return (
    <span
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        border:       `1px solid ${hov ? RED : '#E8E8E8'}`,
        borderRadius: 24,
        padding:      '10px 20px',
        fontFamily:   PP,
        fontWeight:   400,
        fontSize:     13,
        color:        hov ? RED : '#292929',
        transition:   'border-color 0.2s, color 0.2s',
        cursor:       'default',
      }}
    >
      {label}
    </span>
  )
}
