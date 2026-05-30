'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import {
  SERVICES, DIAGNOSTIC_ANSWERS_SERVICES,
  getServicesByAnswer, getServicesByKeywords,
  type Service,
} from '@/lib/services-data'
import { PROJECTS, type Project } from '@/lib/projects'

// ─── Tokens ───────────────────────────────────────────────────────────────────

const PP   = "'PPNeueCorp', system-ui, sans-serif"
const RED  = '#D0274B'
const DARK = '#292929'

function lerp(a: number, b: number, t: number) { return a + (b - a) * t }

// ─── Stage types ──────────────────────────────────────────────────────────────

type Stage = 'orbit' | 'question' | 'matched' | 'project' | 'service-detail'

interface NavEntry {
  stage: Stage
  serviceId?: string
  projectId?: string
  matchedIds?: string[]
}

// ─── Orbit circle ─────────────────────────────────────────────────────────────

interface OrbCircleProps {
  service: Service
  x: number
  y: number
  scale: number
  opacity: number
  onClick: () => void
  isMobile: boolean
}

function OrbCircle({ service, x, y, scale, opacity, onClick, isMobile }: OrbCircleProps) {
  const [hovered, setHovered] = useState(false)
  if (isMobile) return null

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position:      'absolute',
        left:          x - 48,
        top:           y - 48,
        width:         96,
        height:        96,
        borderRadius:  '50%',
        background:    'radial-gradient(circle at 40% 40%, rgba(208,39,75,0.15), rgba(41,41,41,0.9))',
        border:        `1.5px solid ${hovered ? 'rgba(208,39,75,0.7)' : 'rgba(208,39,75,0.3)'}`,
        boxShadow:     hovered ? '0 0 30px rgba(208,39,75,0.25)' : '0 0 20px rgba(208,39,75,0.1)',
        display:       'flex',
        flexDirection: 'column',
        alignItems:    'center',
        justifyContent:'center',
        cursor:        'pointer',
        opacity,
        transform:     `scale(${scale * (hovered ? 1.08 : 1)})`,
        transition:    'border-color 0.25s, box-shadow 0.25s, transform 0.25s',
        userSelect:    'none',
        zIndex:        Math.round(scale * 10),
      }}
    >
      <div style={{
        width: 4, height: 4, borderRadius: '50%',
        background: RED, marginBottom: 6, flexShrink: 0,
      }} />
      <span style={{
        fontFamily:    PP,
        fontWeight:    500,
        fontSize:      11,
        color:         '#FFFFFF',
        letterSpacing: '0.06em',
        textAlign:     'center',
        lineHeight:    1.3,
        padding:       '0 8px',
      }}>
        {service.shortName}
      </span>
    </div>
  )
}

// ─── Service detail card (Stage 1) ────────────────────────────────────────────

interface ServiceCardProps {
  service: Service
  onProjectClick: (projectId: string) => void
}

function ServiceCard({ service, onProjectClick }: ServiceCardProps) {
  const relatedProjects = PROJECTS.filter(p => service.projectIds.includes(p.id))

  return (
    <div style={{
      width:          260,
      minHeight:      320,
      background:     'rgba(255,255,255,0.07)',
      backdropFilter: 'blur(8px)',
      border:         '1px solid rgba(255,255,255,0.12)',
      borderRadius:   20,
      boxShadow:      '0 8px 40px rgba(0,0,0,0.4)',
      padding:        28,
      display:        'flex',
      flexDirection:  'column',
    }}>
      <p style={{ fontFamily: PP, fontWeight: 800, fontSize: 10, color: RED, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8 }}>
        {service.id.replace(/-/g, ' ')}
      </p>
      <p style={{ fontFamily: PP, fontWeight: 700, fontSize: 22, color: '#fff', margin: '8px 0 4px', lineHeight: 1.2 }}>
        {service.name}
      </p>
      <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 14, color: '#919191', fontStyle: 'italic', marginBottom: 16 }}>
        {service.tagline}
      </p>
      <div style={{ height: 1, background: 'rgba(255,255,255,0.1)', marginBottom: 16 }} />
      <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 13, color: '#CCCCCC', lineHeight: 1.7, marginBottom: 16, flex: 1 }}>
        {service.description}
      </p>
      <p style={{ fontFamily: PP, fontWeight: 800, fontSize: 10, color: RED, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8 }}>
        Includes
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: relatedProjects.length > 0 ? 20 : 0 }}>
        {service.deliverables.map(d => (
          <span key={d} style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 20,
            padding: '4px 12px',
            color: '#999',
            fontSize: 11,
            fontFamily: PP,
          }}>{d}</span>
        ))}
      </div>
      {relatedProjects.length > 0 && (
        <>
          <p style={{ fontFamily: PP, fontWeight: 800, fontSize: 10, color: RED, letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: 4, marginBottom: 12 }}>
            Related Work
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {relatedProjects.map(proj => (
              <div key={proj.id} style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => onProjectClick(proj.id)}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img loading="lazy"
                  src={proj.coverImage}
                  alt={proj.title}
                  style={{
                    width: 80, height: 54,
                    borderRadius: 8,
                    objectFit: 'cover',
                    border: '1px solid rgba(255,255,255,0.15)',
                    display: 'block',
                    transition: 'transform 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                />
                <p style={{ fontFamily: PP, fontSize: 10, color: '#919191', marginTop: 4, maxWidth: 80, lineHeight: 1.2 }}>
                  {proj.title}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

// ─── Project window (Stage 2B) ────────────────────────────────────────────────

interface ProjectWindowProps {
  project: Project
  onBack: () => void
  onClose: () => void
}

function ProjectWindow({ project, onBack, onClose }: ProjectWindowProps) {
  const windowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    if (windowRef.current) {
      gsap.fromTo(windowRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
      )
    }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onBack() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onBack])

  return (
    <div style={{
      position:   'fixed',
      inset:      0,
      zIndex:     1000,
      display:    'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(0,0,0,0.75)',
      backdropFilter: 'blur(4px)',
      padding:    '20px 16px',
    }}>
      <div
        ref={windowRef}
        style={{
          width:        'min(880px, 92vw)',
          height:       '88vh',
          overflowY:    'auto',
          background:   '#FFFFFF',
          borderRadius: 20,
          boxShadow:    '0 24px 80px rgba(0,0,0,0.7)',
          position:     'relative',
        }}
      >
        {/* Sticky header */}
        <div style={{
          position:     'sticky',
          top:          0,
          height:       52,
          background:   '#FFFFFF',
          borderBottom: '1px solid #EEEEEE',
          borderRadius: '20px 20px 0 0',
          padding:      '0 24px',
          display:      'flex',
          alignItems:   'center',
          justifyContent: 'space-between',
          zIndex:       10,
        }}>
          <button onClick={onBack} style={{ fontFamily: PP, fontSize: 13, color: '#555', cursor: 'pointer', background: 'none', border: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = RED)}
            onMouseLeave={e => (e.currentTarget.style.color = '#555')}
          >← Back</button>
          <span style={{ fontFamily: PP, fontSize: 14, color: '#292929', fontWeight: 600 }}>{project.title}</span>
          <button onClick={onClose} style={{ fontFamily: PP, fontSize: 18, color: '#555', cursor: 'pointer', background: 'none', border: 'none', transition: 'color 0.2s', lineHeight: 1 }}
            onMouseEnter={e => (e.currentTarget.style.color = RED)}
            onMouseLeave={e => (e.currentTarget.style.color = '#555')}
          >×</button>
        </div>

        {/* Hero image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img loading="lazy"
          src={project.coverImage}
          alt={project.title}
          style={{ width: '100%', height: 360, objectFit: 'cover', display: 'block' }}
        />

        {/* Content */}
        <div style={{ padding: '44px 52px', maxWidth: 740, margin: '0 auto' }}>
          {/* Meta */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <span style={{
              background: '#FFF0F3', color: RED,
              borderRadius: 6, padding: '4px 10px', fontSize: 11, fontFamily: PP,
            }}>{project.category}</span>
            <span style={{ fontSize: 13, color: '#999', fontFamily: PP }}>
              · {project.market} · {project.year}
            </span>
          </div>

          {/* Title */}
          <h1 style={{ fontFamily: PP, fontWeight: 900, fontSize: 46, textTransform: 'uppercase', color: '#292929', lineHeight: 1.1, marginBottom: 0 }}>
            {project.title}
          </h1>

          <div style={{ height: 1, background: '#EEEEEE', margin: '32px 0' }} />

          {/* Sections */}
          {[
            { label: 'The Brief',     body: project.brief.body,     large: false },
            { label: 'The Diagnosis', body: project.diagnosis.body, large: false },
            { label: 'What We Built', body: project.built.body,     large: false },
            { label: 'The Result',    body: project.result.body,    large: true },
          ].map(({ label, body, large }) => (
            <div key={label} style={{ marginBottom: 44 }}>
              <p style={{ fontFamily: PP, fontWeight: 800, fontSize: 10, color: RED, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 10 }}>
                {label}
              </p>
              <p style={{ fontFamily: PP, fontWeight: large ? 600 : 400, fontSize: large ? 21 : 16, color: '#292929', lineHeight: 1.85 }}>
                {body}
              </p>
            </div>
          ))}

          {/* Services chips */}
          <div style={{ marginBottom: 64 }}>
            <p style={{ fontFamily: PP, fontWeight: 800, fontSize: 10, color: RED, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 10 }}>
              Services
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {project.services.map(s => (
                <span key={s} style={{
                  background: 'rgba(41,41,41,0.06)', border: '1px solid rgba(41,41,41,0.12)',
                  borderRadius: 20, padding: '6px 14px', color: '#555', fontSize: 12, fontFamily: PP,
                }}>{s}</span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{ borderTop: '1px solid #EEEEEE', paddingTop: 40, marginBottom: 80 }}>
            <h2 style={{ fontFamily: PP, fontWeight: 900, fontSize: 26, textTransform: 'uppercase', color: '#292929', marginBottom: 10, lineHeight: 1.2 }}>
              Ready to diagnose your brand?
            </h2>
            <p style={{ fontFamily: PP, fontSize: 15, color: '#888', marginBottom: 28, lineHeight: 1.6 }}>
              Every engagement starts with a question, not a quote.
            </p>
            <Link href="/contact" style={{
              display: 'inline-block', padding: '14px 28px',
              background: RED, color: '#fff', fontFamily: PP, fontWeight: 800,
              fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase',
              textDecoration: 'none', borderRadius: 10, transition: 'background 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.background = '#b8223f')}
              onMouseLeave={e => (e.currentTarget.style.background = RED)}
            >
              Start the conversation →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Service detail window (Stage 2A) ─────────────────────────────────────────

interface ServiceWindowProps {
  service: Service
  onProjectClick: (projectId: string) => void
  onBack: () => void
  onClose: () => void
}

function ServiceWindow({ service, onProjectClick, onBack, onClose }: ServiceWindowProps) {
  const windowRef = useRef<HTMLDivElement>(null)
  const relatedProjects = PROJECTS.filter(p => service.projectIds.includes(p.id))

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    if (windowRef.current) {
      gsap.fromTo(windowRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
      )
    }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onBack() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onBack])

  return (
    <div style={{
      position:   'fixed',
      inset:      0,
      zIndex:     1000,
      display:    'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(0,0,0,0.75)',
      backdropFilter: 'blur(4px)',
      padding:    '20px 16px',
    }}>
      <div
        ref={windowRef}
        style={{
          width:        'min(880px, 92vw)',
          height:       '88vh',
          overflowY:    'auto',
          background:   '#FFFFFF',
          borderRadius: 20,
          boxShadow:    '0 24px 80px rgba(0,0,0,0.7)',
        }}
      >
        {/* Sticky header */}
        <div style={{
          position:     'sticky',
          top:          0,
          height:       52,
          background:   '#FFFFFF',
          borderBottom: '1px solid #EEEEEE',
          borderRadius: '20px 20px 0 0',
          padding:      '0 24px',
          display:      'flex',
          alignItems:   'center',
          justifyContent: 'space-between',
          zIndex:       10,
        }}>
          <button onClick={onBack} style={{ fontFamily: PP, fontSize: 13, color: '#555', cursor: 'pointer', background: 'none', border: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = RED)}
            onMouseLeave={e => (e.currentTarget.style.color = '#555')}
          >← Back</button>
          <span style={{ fontFamily: PP, fontSize: 14, color: '#292929', fontWeight: 600 }}>{service.name}</span>
          <button onClick={onClose} style={{ fontFamily: PP, fontSize: 18, color: '#555', cursor: 'pointer', background: 'none', border: 'none', transition: 'color 0.2s', lineHeight: 1 }}
            onMouseEnter={e => (e.currentTarget.style.color = RED)}
            onMouseLeave={e => (e.currentTarget.style.color = '#555')}
          >×</button>
        </div>

        {/* Content */}
        <div style={{ padding: '52px 60px', maxWidth: 720, margin: '0 auto' }}>
          <p style={{ fontFamily: PP, fontSize: 64, fontWeight: 900, color: RED, lineHeight: 1, marginBottom: 16 }}>
            {service.name}
          </p>
          <p style={{ fontFamily: PP, fontSize: 24, color: '#292929', marginBottom: 32, lineHeight: 1.3 }}>
            {service.tagline}
          </p>
          <p style={{ fontFamily: PP, fontSize: 17, color: '#444', lineHeight: 1.8, marginBottom: 40 }}>
            {service.description}
          </p>

          <p style={{ fontFamily: PP, fontWeight: 800, fontSize: 10, color: RED, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 16 }}>
            Includes
          </p>
          <ul style={{ listStyle: 'none', padding: 0, marginBottom: 48 }}>
            {service.deliverables.map(d => (
              <li key={d} style={{
                fontFamily: PP, fontSize: 15, color: '#444', lineHeight: 1.7,
                paddingLeft: 20, position: 'relative',
              }}>
                <span style={{ position: 'absolute', left: 0, color: RED }}>—</span>
                {d}
              </li>
            ))}
          </ul>

          {relatedProjects.length > 0 && (
            <>
              <p style={{ fontFamily: PP, fontWeight: 800, fontSize: 10, color: RED, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 16 }}>
                Related Work
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 48 }}>
                {relatedProjects.map(proj => (
                  <div key={proj.id} style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => onProjectClick(proj.id)}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img loading="lazy"
                      src={proj.coverImage}
                      alt={proj.title}
                      style={{
                        width: 120, height: 80, borderRadius: 10,
                        objectFit: 'cover', border: '1px solid #EEE', display: 'block',
                        transition: 'transform 0.2s',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                      onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                    />
                    <p style={{ fontFamily: PP, fontSize: 11, color: '#888', marginTop: 6 }}>{proj.title}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* CTA */}
          <div style={{ borderTop: '1px solid #EEEEEE', paddingTop: 40, marginBottom: 80 }}>
            <h2 style={{ fontFamily: PP, fontWeight: 900, fontSize: 26, textTransform: 'uppercase', color: '#292929', marginBottom: 10 }}>
              Ready to diagnose your brand?
            </h2>
            <p style={{ fontFamily: PP, fontSize: 15, color: '#888', marginBottom: 28 }}>
              Every engagement starts with a question, not a quote.
            </p>
            <Link href="/contact" style={{
              display: 'inline-block', padding: '14px 28px',
              background: RED, color: '#fff', fontFamily: PP, fontWeight: 800,
              fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase',
              textDecoration: 'none', borderRadius: 10, transition: 'background 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.background = '#b8223f')}
              onMouseLeave={e => (e.currentTarget.style.background = RED)}
            >
              Start the conversation →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function DiagnosticClient() {
  const containerRef  = useRef<HTMLDivElement>(null)
  const wrapperRef    = useRef<HTMLDivElement>(null)
  const anglesRef     = useRef<number[]>(SERVICES.map(s => s.orbitAngle))
  const mouseRef      = useRef({ x: 0, y: 0 })
  const parallaxRef   = useRef({ x: 0, y: 0 })
  const rafRef        = useRef<number>(0)
  const inputTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const tickerRef     = useRef<ReturnType<typeof gsap.ticker.add> | null>(null)

  const [isMobile, setIsMobile]     = useState(false)
  const [positions, setPositions]   = useState<{ x: number; y: number; scale: number }[]>([])
  const [stage, setStage]           = useState<Stage>('orbit')
  const [matchedIds, setMatchedIds] = useState<string[]>([])
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null)
  const [inputVal, setInputVal]     = useState('')
  const [navStack, setNavStack]     = useState<NavEntry[]>([{ stage: 'orbit' }])

  // ── Orbit sizes ─────────────────────────────────────────────────────────────

  const getOrbitDims = useCallback((containerW: number, containerH: number, mobile: boolean) => {
    const tablet = containerW >= 768 && containerW < 1024
    const baseX  = tablet ? containerW * 0.38 : Math.min(containerW * 0.42, 520)
    return { radiusX: baseX, radiusY: baseX * 0.42, cx: containerW / 2, cy: containerH / 2 }
  }, [])

  // ── Compute positions ────────────────────────────────────────────────────────

  const computePositions = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    const { radiusX, radiusY, cx, cy } = getOrbitDims(el.offsetWidth, el.offsetHeight, isMobile)
    const angles = anglesRef.current
    const pos = angles.map(angle => {
      const x     = cx + Math.cos(angle) * radiusX + parallaxRef.current.x
      const y     = cy + Math.sin(angle) * radiusY + parallaxRef.current.y
      const sinA  = Math.sin(angle)
      const scale = 0.78 + (sinA + 1) / 2 * 0.22
      return { x, y, scale }
    })
    setPositions(pos)
  }, [isMobile, getOrbitDims])

  // ── GSAP orbit tick ──────────────────────────────────────────────────────────

  useEffect(() => {
    const mobile = window.innerWidth < 768
    setIsMobile(mobile)

    if (mobile) return

    gsap.ticker.lagSmoothing(0)
    let lastTime = performance.now()

    const tick = () => {
      const now   = performance.now()
      const delta = (now - lastTime) / 16.67
      lastTime    = now

      const slowFactor = stage === 'matched' ? 0.15 : 1

      anglesRef.current = anglesRef.current.map((a, i) =>
        a + SERVICES[i].orbitSpeed * delta * slowFactor
      )

      // Parallax lerp
      parallaxRef.current.x = lerp(parallaxRef.current.x, mouseRef.current.x * 0.06, 0.04)
      parallaxRef.current.y = lerp(parallaxRef.current.y, mouseRef.current.y * 0.06, 0.04)

      computePositions()
    }

    gsap.ticker.add(tick)
    return () => gsap.ticker.remove(tick)
  }, [stage, computePositions])

  // ── Mouse parallax ───────────────────────────────────────────────────────────

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      mouseRef.current = { x: e.clientX - cx, y: e.clientY - cy }
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  // ── Resize ───────────────────────────────────────────────────────────────────

  useEffect(() => {
    const onResize = () => {
      setIsMobile(window.innerWidth < 768)
      computePositions()
    }
    window.addEventListener('resize', onResize)
    computePositions()
    return () => window.removeEventListener('resize', onResize)
  }, [computePositions])

  // ── Navigation helpers ───────────────────────────────────────────────────────

  const pushNav  = (entry: NavEntry) => setNavStack(s => [...s, entry])
  const popNav   = useCallback(() => {
    setNavStack(s => {
      if (s.length <= 1) return s
      const newStack = s.slice(0, -1)
      const top = newStack[newStack.length - 1]
      setStage(top.stage)
      if (top.matchedIds) setMatchedIds(top.matchedIds)
      setSelectedProjectId(top.projectId ?? null)
      setSelectedServiceId(top.serviceId ?? null)
      return newStack
    })
  }, [])

  const closeAll = useCallback(() => {
    setNavStack([{ stage: 'orbit' }])
    setStage('orbit')
    setMatchedIds([])
    setSelectedProjectId(null)
    setSelectedServiceId(null)
    setInputVal('')
  }, [])

  // ── Diagnostic flow ──────────────────────────────────────────────────────────

  const selectAnswer = (answerId: number) => {
    const matched = getServicesByAnswer(answerId).map(s => s.id)
    setMatchedIds(matched)
    pushNav({ stage: 'matched', matchedIds: matched })
    setStage('matched')
  }

  const handleInput = (val: string) => {
    setInputVal(val)
    if (inputTimerRef.current) clearTimeout(inputTimerRef.current)
    inputTimerRef.current = setTimeout(() => {
      if (val.trim().length < 2) return
      const matched = getServicesByKeywords(val).map(s => s.id)
      if (matched.length > 0) {
        setMatchedIds(matched)
        pushNav({ stage: 'matched', matchedIds: matched })
        setStage('matched')
      }
    }, 600)
  }

  const openOrbitCircle = (serviceId: string) => {
    setSelectedServiceId(serviceId)
    pushNav({ stage: 'service-detail', serviceId })
    setStage('service-detail')
  }

  const openProject = (projectId: string) => {
    setSelectedProjectId(projectId)
    pushNav({ stage: 'project', projectId })
    setStage('project')
  }

  // ── Derived ──────────────────────────────────────────────────────────────────

  const selectedProject = selectedProjectId ? PROJECTS.find(p => p.id === selectedProjectId) : null
  const selectedService = selectedServiceId ? SERVICES.find(s => s.id === selectedServiceId) : null
  const matchedServices = SERVICES.filter(s => matchedIds.includes(s.id))

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <div
      ref={containerRef}
      style={{
        position:        'fixed',
        inset:           0,
        backgroundColor: DARK,
        overflow:        'hidden',
      }}
    >
      {/* ── MOBILE LAYOUT ────────────────────────────────────────────── */}
      {isMobile && (
        <div style={{
          position: 'absolute', inset: 0, overflowY: 'auto',
          padding: '100px 16px 60px',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
        }}>
          {/* Question center box */}
          {stage === 'orbit' && (
            <div
              onClick={() => { pushNav({ stage: 'question' }); setStage('question') }}
              style={{
                width: '100%', maxWidth: 360,
                background: 'rgba(255,255,255,0.07)',
                backdropFilter: 'blur(12px)',
                borderRadius: 16,
                boxShadow: '0 0 40px rgba(208,39,75,0.3)',
                padding: '28px 24px',
                cursor: 'pointer',
                marginBottom: 40,
                textAlign: 'center',
              }}
            >
              <p style={{ fontFamily: PP, fontWeight: 800, fontSize: 14, color: RED, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>
                What does your brand need?
              </p>
              <p style={{ fontFamily: PP, fontSize: 11, color: '#919191' }}>Tap to find the right service</p>
            </div>
          )}

          {/* Mobile service grid */}
          {stage === 'orbit' && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 16, width: '100%', maxWidth: 360,
            }}>
              {SERVICES.map(svc => (
                <div
                  key={svc.id}
                  onClick={() => openOrbitCircle(svc.id)}
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    padding: '20px 12px', cursor: 'pointer',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: 16,
                    border: '1px solid rgba(208,39,75,0.2)',
                  }}
                >
                  <div style={{
                    width: 80, height: 80, borderRadius: '50%',
                    background: 'radial-gradient(circle at 40% 40%, rgba(208,39,75,0.15), rgba(41,41,41,0.9))',
                    border: '1.5px solid rgba(208,39,75,0.3)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 10,
                  }}>
                    <div style={{ width: 4, height: 4, borderRadius: '50%', background: RED, marginBottom: 4 }} />
                    <span style={{ fontFamily: PP, fontSize: 10, color: '#fff', letterSpacing: '0.06em', textAlign: 'center', padding: '0 4px' }}>
                      {svc.shortName}
                    </span>
                  </div>
                  <span style={{ fontFamily: PP, fontSize: 11, color: '#919191', textAlign: 'center' }}>
                    {svc.name}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Question overlay mobile */}
          {stage === 'question' && (
            <div style={{ width: '100%', maxWidth: 400 }}>
              <button onClick={popNav} style={{ fontFamily: PP, fontSize: 13, color: '#919191', background: 'none', border: 'none', cursor: 'pointer', marginBottom: 24 }}>
                ← Back
              </button>
              <p style={{ fontFamily: PP, fontWeight: 800, fontSize: 13, color: RED, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20, textAlign: 'center' }}>
                What does your brand need?
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
                {DIAGNOSTIC_ANSWERS_SERVICES.map(ans => (
                  <button
                    key={ans.id}
                    onClick={() => selectAnswer(ans.id)}
                    style={{
                      fontFamily: PP, fontSize: 14, color: '#fff',
                      background: 'rgba(255,255,255,0.07)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: 12, padding: '14px 18px',
                      cursor: 'pointer', textAlign: 'left',
                    }}
                  >{ans.label}</button>
                ))}
              </div>
              <input
                type="text"
                placeholder="Or describe your situation…"
                value={inputVal}
                onChange={e => handleInput(e.target.value)}
                style={{
                  width: '100%', padding: '12px 16px', borderRadius: 12,
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)',
                  color: '#fff', fontFamily: PP, fontSize: 14,
                  outline: 'none', boxSizing: 'border-box',
                }}
              />
            </div>
          )}

          {/* Matched services mobile */}
          {stage === 'matched' && (
            <div style={{ width: '100%', maxWidth: 400, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <button onClick={popNav} style={{ fontFamily: PP, fontSize: 13, color: '#919191', background: 'none', border: 'none', cursor: 'pointer', marginBottom: 8, textAlign: 'left' }}>
                ← Answer differently
              </button>
              {matchedServices.map(svc => (
                <ServiceCard key={svc.id} service={svc} onProjectClick={openProject} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── DESKTOP ORBIT LAYOUT ─────────────────────────────────────── */}
      {!isMobile && (
        <>
          {/* Orbiting circles */}
          {(stage === 'orbit' || stage === 'matched') && positions.length > 0 && (
            <div ref={wrapperRef} style={{ position: 'absolute', inset: 0 }}>
              {SERVICES.map((svc, i) => {
                const pos = positions[i]
                if (!pos) return null
                const isMatched = stage === 'orbit' || matchedIds.includes(svc.id)
                return (
                  <OrbCircle
                    key={svc.id}
                    service={svc}
                    x={pos.x}
                    y={pos.y}
                    scale={pos.scale}
                    opacity={isMatched ? 1 : 0.1}
                    onClick={() => openOrbitCircle(svc.id)}
                    isMobile={false}
                  />
                )
              })}
            </div>
          )}

          {/* Center box — Stage 0 */}
          {stage === 'orbit' && (
            <div style={{
              position:       'absolute',
              top:            '50%',
              left:           '50%',
              transform:      'translate(-50%, -50%)',
              background:     'rgba(255,255,255,0.07)',
              backdropFilter: 'blur(12px)',
              borderRadius:   16,
              boxShadow:      '0 0 40px rgba(208,39,75,0.3), 0 0 80px rgba(208,39,75,0.12)',
              padding:        '28px 36px',
              cursor:         'pointer',
              textAlign:      'center',
              minWidth:       220,
              zIndex:         50,
              transition:     'box-shadow 0.3s',
            }}
              onClick={() => { pushNav({ stage: 'question' }); setStage('question') }}
            >
              <p style={{ fontFamily: PP, fontWeight: 800, fontSize: 14, color: RED, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>
                What does your brand need?
              </p>
              <p style={{ fontFamily: PP, fontSize: 11, color: '#919191' }}>Answer to find the right service</p>
            </div>
          )}

          {/* Question overlay */}
          {stage === 'question' && (
            <div style={{
              position:       'absolute',
              top:            '50%',
              left:           '50%',
              transform:      'translate(-50%, -50%)',
              background:     'rgba(255,255,255,0.07)',
              backdropFilter: 'blur(16px)',
              borderRadius:   20,
              boxShadow:      '0 0 60px rgba(208,39,75,0.3)',
              padding:        '36px 40px',
              minWidth:       340,
              maxWidth:       480,
              zIndex:         50,
              width:          'min(480px, 90vw)',
            }}>
              <p style={{ fontFamily: PP, fontWeight: 800, fontSize: 13, color: RED, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 24, textAlign: 'center' }}>
                What does your brand need?
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
                {DIAGNOSTIC_ANSWERS_SERVICES.map(ans => (
                  <button
                    key={ans.id}
                    onClick={() => selectAnswer(ans.id)}
                    style={{
                      fontFamily: PP, fontSize: 14, color: '#fff',
                      background:  'rgba(255,255,255,0.06)',
                      border:      '1px solid rgba(255,255,255,0.12)',
                      borderRadius: 12, padding: '12px 18px',
                      cursor: 'pointer', textAlign: 'left',
                      transition: 'background 0.2s, border-color 0.2s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'rgba(208,39,75,0.12)'
                      e.currentTarget.style.borderColor = 'rgba(208,39,75,0.4)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
                    }}
                  >{ans.label}</button>
                ))}
              </div>
              <input
                type="text"
                placeholder="Or describe your situation…"
                value={inputVal}
                onChange={e => handleInput(e.target.value)}
                style={{
                  width: '100%', padding: '11px 16px', borderRadius: 12,
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)',
                  color: '#fff', fontFamily: PP, fontSize: 13,
                  outline: 'none', boxSizing: 'border-box',
                }}
              />
              <button
                onClick={popNav}
                style={{ marginTop: 18, fontFamily: PP, fontSize: 12, color: '#919191', background: 'none', border: 'none', cursor: 'pointer', display: 'block', margin: '16px auto 0' }}
              >← Back</button>
            </div>
          )}

          {/* Matched services cards — Stage 1 */}
          {stage === 'matched' && matchedServices.length > 0 && (
            <div style={{
              position:        'absolute',
              top:             '50%',
              left:            '50%',
              transform:       'translate(-50%, -50%)',
              display:         'flex',
              gap:             20,
              justifyContent:  'center',
              alignItems:      'flex-start',
              zIndex:          50,
              maxWidth:        '90vw',
            }}>
              {matchedServices.slice(0, 2).map(svc => (
                <ServiceCard key={svc.id} service={svc} onProjectClick={openProject} />
              ))}
              <button
                onClick={popNav}
                style={{
                  position:   'absolute',
                  bottom:     -40,
                  left:       '50%',
                  transform:  'translateX(-50%)',
                  fontFamily: PP, fontSize: 13, color: '#919191',
                  background: 'none', border: 'none', cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >← Answer differently</button>
            </div>
          )}
        </>
      )}

      {/* ── Stage 2B — Project window ─────────────────────────────── */}
      {stage === 'project' && selectedProject && (
        <ProjectWindow
          project={selectedProject}
          onBack={popNav}
          onClose={closeAll}
        />
      )}

      {/* ── Stage 2A — Service detail window ─────────────────────── */}
      {stage === 'service-detail' && selectedService && (
        <ServiceWindow
          service={selectedService}
          onProjectClick={openProject}
          onBack={popNav}
          onClose={closeAll}
        />
      )}
    </div>
  )
}
