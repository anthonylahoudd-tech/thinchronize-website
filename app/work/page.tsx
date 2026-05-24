'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { gsap } from 'gsap'
import { PROJECTS, DIAGNOSTIC_ANSWERS, getProjectsByAnswer, getProjectsByKeywords, type Project } from '@/lib/projects'

// ─── Constants ────────────────────────────────────────────────────────────────

const PP   = "'PPNeueCorp', system-ui, sans-serif"
const RED  = '#D0274B'
const DARK = '#292929'

const ORBIT_CONFIG = [
  { angle: 0,   radius: 320, speed: 0.15 },
  { angle: 51,  radius: 380, speed: 0.12 },
  { angle: 103, radius: 290, speed: 0.18 },
  { angle: 154, radius: 350, speed: 0.10 },
  { angle: 205, radius: 400, speed: 0.14 },
  { angle: 257, radius: 310, speed: 0.16 },
  { angle: 308, radius: 360, speed: 0.11 },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function degToRad(deg: number) { return (deg * Math.PI) / 180 }
function lerp(a: number, b: number, t: number) { return a + (b - a) * t }

// ─── Types ────────────────────────────────────────────────────────────────────

type Phase = 'orbit' | 'question' | 'focused' | 'detail'

// ─── Main Component ───────────────────────────────────────────────────────────

export default function WorkPage() {
  const router = useRouter()

  // DOM refs
  const orbitRef      = useRef<HTMLDivElement>(null)
  const cardRefs      = useRef<(HTMLDivElement | null)[]>([])
  const centerRef     = useRef<HTMLDivElement>(null)
  const questionRef   = useRef<HTMLDivElement>(null)
  const detailRef     = useRef<HTMLDivElement>(null)
  const inputRef      = useRef<HTMLInputElement>(null)

  // Orbit animation state in refs (no re-renders)
  const anglesRef     = useRef<number[]>(ORBIT_CONFIG.map(c => c.angle))
  const orbitRunning  = useRef(true)
  const mouseTarget   = useRef({ x: 0, y: 0 })
  const mouseCurrent  = useRef({ x: 0, y: 0 })
  const debounceRef   = useRef<ReturnType<typeof setTimeout> | null>(null)

  // React state for UI toggling only
  const [phase,             setPhase]           = useState<Phase>('orbit')
  const [focusedIds,        setFocusedIds]      = useState<string[]>([])
  const [activeProject,     setActiveProject]   = useState<Project | null>(null)
  const [highlightAnswer,   setHighlightAnswer] = useState<number | null>(null)
  const [isMobile,          setIsMobile]        = useState(false)

  // ── Mobile detection ────────────────────────────────────────────────────────
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // ── GSAP orbit ticker ───────────────────────────────────────────────────────
  useEffect(() => {
    if (isMobile) return

    gsap.ticker.lagSmoothing(0)

    const tick = () => {
      if (!orbitRunning.current) return

      // Lerp mouse parallax
      mouseCurrent.current.x = lerp(mouseCurrent.current.x, mouseTarget.current.x, 0.05)
      mouseCurrent.current.y = lerp(mouseCurrent.current.y, mouseTarget.current.y, 0.05)

      if (orbitRef.current) {
        orbitRef.current.style.transform =
          `translate(calc(-50% + ${mouseCurrent.current.x}px), calc(-50% + ${mouseCurrent.current.y}px))`
      }

      // Advance each card
      ORBIT_CONFIG.forEach((cfg, i) => {
        anglesRef.current[i] += cfg.speed * 0.016
        const rad  = degToRad(anglesRef.current[i])
        const x    = Math.cos(rad) * cfg.radius
        const y    = Math.sin(rad) * (cfg.radius * 0.45)
        // Depth scale: bottom = 1.0, top = 0.75
        const depthT = (Math.sin(rad) + 1) / 2
        const scale  = 0.75 + depthT * 0.25

        const el = cardRefs.current[i]
        if (el) {
          el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${scale})`
          el.style.zIndex    = String(Math.round(depthT * 10))
        }
      })
    }

    gsap.ticker.add(tick)
    return () => gsap.ticker.remove(tick)
  }, [isMobile])

  // ── Mouse parallax ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (isMobile) return
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth  / 2
      const cy = window.innerHeight / 2
      mouseTarget.current.x = ((e.clientX - cx) / cx) * 30
      mouseTarget.current.y = ((e.clientY - cy) / cy) * 20
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [isMobile])

  // ── Escape key ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      if (activeProject) closeDetail()
      else if (phase === 'focused' || phase === 'question') resetToOrbit()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }) // intentionally runs each render so phase/activeProject are fresh

  // ── Open question overlay ────────────────────────────────────────────────────
  const openQuestion = useCallback(() => {
    setPhase('question')
    if (centerRef.current) {
      gsap.to(centerRef.current, { opacity: 0, scale: 0.9, duration: 0.25, ease: 'power2.in' })
    }
    if (questionRef.current) {
      const el = questionRef.current
      el.style.display = 'flex'
      gsap.fromTo(el, { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out', delay: 0.2 })
    }
  }, [])

  // ── Apply focused state ──────────────────────────────────────────────────────
  const applyFocus = useCallback((matchedIds: string[]) => {
    setFocusedIds(matchedIds)
    setPhase('focused')

    if (questionRef.current) {
      gsap.to(questionRef.current, {
        opacity: 0, scale: 0.9, duration: 0.3, ease: 'power2.in',
        onComplete: () => { if (questionRef.current) questionRef.current.style.display = 'none' }
      })
    }
    if (centerRef.current) {
      gsap.to(centerRef.current, { opacity: 0, duration: 0.2 })
    }

    orbitRunning.current = false

    PROJECTS.forEach((project, i) => {
      const el = cardRefs.current[i]
      if (!el) return

      if (matchedIds.includes(project.id)) {
        const count   = matchedIds.length
        const idx     = matchedIds.indexOf(project.id)
        const offsetX = count > 1 ? (idx - (count - 1) / 2) * 220 : 0

        gsap.to(el, {
          duration:  0.8,
          ease:      'power3.out',
          delay:     idx * 0.08,
          opacity:   1,
          onUpdate:  function() {
            if (el) {
              el.style.transform = `translate(calc(-50% + ${offsetX}px), -50%) scale(1.0)`
              el.style.left = '50%'
              el.style.top  = '50%'
            }
          }
        })
        el.dataset.focused = 'true'
      } else {
        gsap.to(el, { opacity: 0.12, scale: 0.7, duration: 0.5, ease: 'power2.out' })
        el.dataset.focused = 'false'
      }
    })
  }, [])

  // ── Select answer ────────────────────────────────────────────────────────────
  const selectAnswer = useCallback((answerId: number) => {
    applyFocus(getProjectsByAnswer(answerId).map(p => p.id))
  }, [applyFocus])

  // ── Reset to orbit ───────────────────────────────────────────────────────────
  const resetToOrbit = useCallback(() => {
    setPhase('orbit')
    setFocusedIds([])
    setHighlightAnswer(null)
    orbitRunning.current = true

    PROJECTS.forEach((_, i) => {
      const el = cardRefs.current[i]
      if (!el) return
      delete el.dataset.focused
      gsap.to(el, { opacity: 1, duration: 0.6, ease: 'power3.out', delay: i * 0.03 })
    })

    if (centerRef.current) {
      gsap.to(centerRef.current, { opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out', delay: 0.2 })
    }
    if (questionRef.current) {
      gsap.set(questionRef.current, { display: 'none', opacity: 0 })
    }
  }, [])

  // ── Open detail ──────────────────────────────────────────────────────────────
  const openDetail = useCallback((project: Project) => {
    setActiveProject(project)
    setPhase('detail')
  }, [])

  // ── Close detail ─────────────────────────────────────────────────────────────
  const closeDetail = useCallback(() => {
    if (detailRef.current) {
      gsap.to(detailRef.current, {
        opacity: 0, y: 16, scale: 0.97, duration: 0.3, ease: 'power2.in',
        onComplete: () => { setActiveProject(null); setPhase('focused') }
      })
    } else {
      setActiveProject(null)
      setPhase('focused')
    }
  }, [])

  // ── Animate detail in when mounted ──────────────────────────────────────────
  useEffect(() => {
    if (activeProject && detailRef.current) {
      gsap.fromTo(detailRef.current,
        { opacity: 0, y: 24, scale: 0.97 },
        { opacity: 1, y: 0,  scale: 1, duration: 0.45, ease: 'power3.out' }
      )
    }
  }, [activeProject])

  // ── Text input keyword matching ──────────────────────────────────────────────
  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.trim()
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      if (!val) { setHighlightAnswer(null); return }
      const lower = val.toLowerCase()
      for (const ans of DIAGNOSTIC_ANSWERS) {
        if (ans.keywords.some(k => lower.includes(k) || k.includes(lower))) {
          setHighlightAnswer(ans.id)
          return
        }
      }
      setHighlightAnswer(null)
      const kp = getProjectsByKeywords(val)
      if (kp.length > 0) applyFocus(kp.map(p => p.id))
    }, 400)
  }, [applyFocus])

  // ── Mobile ───────────────────────────────────────────────────────────────────
  if (isMobile) {
    return <MobileWorkGrid onOpen={(p) => router.push(`/work/${p.id}`)} />
  }

  // ─── Desktop orbital view ─────────────────────────────────────────────────────
  return (
    <div
      style={{
        backgroundColor: DARK,
        minHeight:        '100vh',
        width:            '100%',
        position:         'relative',
        overflow:         'hidden',
        display:          'flex',
        alignItems:       'center',
        justifyContent:   'center',
      }}
    >
      {/* Orbit container */}
      <div
        ref={orbitRef}
        style={{
          position:  'absolute',
          left:      '50%',
          top:       '50%',
          transform: 'translate(-50%, -50%)',
          width:     0,
          height:    0,
        }}
      >
        {/* ── Orbiting cards ─────────────────────────────────────────────── */}
        {PROJECTS.map((project, i) => (
          <div
            key={project.id}
            ref={el => { cardRefs.current[i] = el }}
            onClick={() => {
              if (phase === 'focused' && focusedIds.includes(project.id)) {
                openDetail(project)
              }
            }}
            style={{
              position:   'absolute',
              left:       '50%',
              top:        '50%',
              width:      160,
              height:     108,
              willChange: 'transform, opacity',
              cursor:     phase === 'focused' && focusedIds.includes(project.id)
                            ? 'pointer' : 'default',
            }}
          >
            {/* Image container */}
            <div
              style={{
                width:       '100%',
                height:      '100%',
                overflow:    'hidden',
                border:      '1px solid rgba(255,255,255,0.18)',
                boxShadow:   '0 4px 20px rgba(0,0,0,0.4)',
                position:    'relative',
                transition:  'box-shadow 0.25s',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.coverImage}
                alt={project.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              {/* "View Project" overlay when focused */}
              {phase === 'focused' && focusedIds.includes(project.id) && (
                <div style={{
                  position:      'absolute',
                  inset:         0,
                  background:    'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)',
                  display:       'flex',
                  alignItems:    'flex-end',
                  padding:       '10px 12px',
                  pointerEvents: 'none',
                }}>
                  <span style={{
                    fontFamily:    PP,
                    fontWeight:    800,
                    fontSize:      11,
                    color:         '#fff',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}>
                    View Project →
                  </span>
                </div>
              )}
            </div>
            {/* Title */}
            <p style={{
              fontFamily:   PP,
              fontWeight:   400,
              fontSize:     11,
              color:        '#919191',
              textAlign:    'center',
              marginTop:    6,
              letterSpacing:'0.04em',
              whiteSpace:   'nowrap',
              overflow:     'hidden',
              textOverflow: 'ellipsis',
              maxWidth:     160,
              pointerEvents:'none',
            }}>
              {project.title}
            </p>
          </div>
        ))}

        {/* ── Center box ─────────────────────────────────────────────────── */}
        <div
          ref={centerRef}
          onClick={openQuestion}
          style={{
            position:       'absolute',
            left:           '50%',
            top:            '50%',
            transform:      'translate(-50%, -50%)',
            width:          240,
            height:         120,
            border:         `1px solid ${RED}`,
            animation:      'glowPulse 2.5s ease-in-out infinite',
            cursor:         'pointer',
            display:        'flex',
            flexDirection:  'column',
            alignItems:     'center',
            justifyContent: 'center',
            gap:            6,
            padding:        '0 20px',
            textAlign:      'center',
            zIndex:         20,
            background:     'transparent',
          }}
        >
          <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 10, color: '#919191', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            Strategy-Led Creative Studio
          </p>
          <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 16, color: '#fff', lineHeight: 1.3 }}>
            What&apos;s wrong with your brand?
          </p>
          <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 10, color: '#919191', letterSpacing: '0.1em' }}>
            Click to diagnose
          </p>
        </div>

        {/* ── Question overlay ───────────────────────────────────────────── */}
        <div
          ref={questionRef}
          style={{
            position:      'absolute',
            left:          '50%',
            top:           '50%',
            transform:     'translate(-50%, -50%)',
            width:         480,
            background:    '#1a1a1a',
            border:        `1px solid ${RED}`,
            boxShadow:     `0 0 40px rgba(208,39,75,0.3)`,
            padding:       '28px 28px 24px',
            display:       'none',
            flexDirection: 'column',
            gap:           16,
            zIndex:        30,
          }}
        >
          {/* Close button */}
          <button
            onClick={e => { e.stopPropagation(); resetToOrbit() }}
            style={{
              position:   'absolute', top: 12, right: 14,
              background: 'none', border: 'none',
              color: '#919191', fontSize: 20, cursor: 'pointer',
              lineHeight: 1, fontFamily: PP,
            }}
          >×</button>

          <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 18, color: '#fff', lineHeight: 1.3, paddingRight: 24 }}>
            What&apos;s the main thing wrong with your brand?
          </p>

          {/* Answer buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {DIAGNOSTIC_ANSWERS.map(ans => (
              <button
                key={ans.id}
                onClick={() => selectAnswer(ans.id)}
                style={{
                  width:       '100%',
                  padding:     '12px 16px',
                  background:  DARK,
                  border:      `1px solid ${highlightAnswer === ans.id ? RED : '#444'}`,
                  color:       highlightAnswer === ans.id ? RED : '#fff',
                  fontFamily:  PP, fontWeight: 400, fontSize: 14,
                  textAlign:   'left', cursor: 'pointer',
                  transition:  'border-color 0.2s, color 0.2s',
                  lineHeight:  1.4,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = RED
                  e.currentTarget.style.color = RED
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = highlightAnswer === ans.id ? RED : '#444'
                  e.currentTarget.style.color = highlightAnswer === ans.id ? RED : '#fff'
                }}
              >
                {ans.label}
              </button>
            ))}
          </div>

          {/* Free-text input */}
          <input
            ref={inputRef}
            type="text"
            placeholder="Or describe it in your own words..."
            onChange={handleInput}
            style={{
              width:      '100%', padding: '11px 14px',
              background: '#1a1a1a', border: '1px solid #444',
              color:      '#fff', fontFamily: PP, fontWeight: 400,
              fontSize:   13, outline: 'none', boxSizing: 'border-box',
            }}
          />
        </div>
      </div>

      {/* ── "Answer differently" reset ─────────────────────────────────────── */}
      {phase === 'focused' && (
        <button
          onClick={resetToOrbit}
          style={{
            position:   'fixed', bottom: 40, left: '50%',
            transform:  'translateX(-50%)',
            background: 'none', border: 'none',
            fontFamily: PP, fontWeight: 400, fontSize: 13,
            color:      '#919191', cursor: 'pointer',
            letterSpacing: '0.04em', transition: 'color 0.2s',
            zIndex:     50,
          }}
          onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
          onMouseLeave={e => (e.currentTarget.style.color = '#919191')}
        >
          Answer differently →
        </button>
      )}

      {/* ── Project detail overlay ────────────────────────────────────────── */}
      {activeProject && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 100,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(41,41,41,0.7)',
            backdropFilter: 'blur(6px)',
          }}
          onClick={closeDetail}
        >
          <div
            ref={detailRef}
            onClick={e => e.stopPropagation()}
            style={{
              background:  '#1a1a1a',
              borderTop:   `4px solid ${RED}`,
              border:      `1px solid rgba(208,39,75,0.3)`,
              width:       '75vw',
              maxWidth:    960,
              maxHeight:   '85vh',
              overflowY:   'auto',
              position:    'relative',
            }}
          >
            {/* Close */}
            <button
              onClick={closeDetail}
              style={{
                position: 'absolute', top: 16, right: 18, zIndex: 10,
                background: 'none', border: 'none',
                color: '#fff', fontSize: 24, cursor: 'pointer',
                lineHeight: 1, fontFamily: PP,
              }}
            >×</button>

            {/* Cover image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activeProject.coverImage}
              alt={activeProject.title}
              style={{ width: '100%', maxHeight: 320, objectFit: 'cover', display: 'block' }}
            />

            <div style={{ padding: '32px 40px 48px' }}>
              <p style={{ fontFamily: PP, fontWeight: 800, fontSize: 11, color: RED, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 10 }}>
                {activeProject.category}
              </p>
              <h2 style={{ fontFamily: PP, fontWeight: 900, fontSize: 32, color: '#fff', lineHeight: 1.1, marginBottom: 6 }}>
                {activeProject.title}
              </h2>
              <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 14, color: '#919191', marginBottom: 24 }}>
                {activeProject.market} · {activeProject.year}
              </p>
              <div style={{ height: 1, background: '#333', marginBottom: 28 }} />

              {[
                { label: 'The Brief',     text: activeProject.brief },
                { label: 'The Diagnosis', text: activeProject.diagnosis },
                { label: 'What We Built', text: activeProject.built },
              ].map(s => (
                <div key={s.label} style={{ marginBottom: 28 }}>
                  <p style={{ fontFamily: PP, fontWeight: 800, fontSize: 11, color: RED, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 8 }}>
                    {s.label}
                  </p>
                  <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 16, color: '#fff', lineHeight: 1.7 }}>
                    {s.text}
                  </p>
                </div>
              ))}

              <div style={{ marginBottom: 28 }}>
                <p style={{ fontFamily: PP, fontWeight: 800, fontSize: 11, color: RED, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 8 }}>
                  The Result
                </p>
                <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 20, color: '#fff', lineHeight: 1.6 }}>
                  {activeProject.result}
                </p>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
                {activeProject.services.map(s => (
                  <span key={s} style={{ fontFamily: PP, fontWeight: 400, fontSize: 13, color: '#919191', background: '#333', border: '1px solid #444', borderRadius: 4, padding: '6px 14px' }}>
                    {s}
                  </span>
                ))}
              </div>

              <Link
                href="/contact"
                style={{
                  display: 'block', width: '100%', padding: '16px',
                  background: RED, color: '#fff',
                  fontFamily: PP, fontWeight: 800, fontSize: 13,
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  textAlign: 'center', textDecoration: 'none',
                  transition: 'background 0.2s', boxSizing: 'border-box',
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.background = '#b8223f')}
                onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.background = RED)}
              >
                Start your own diagnosis →
              </Link>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 20px rgba(208,39,75,0.2); }
          50%       { box-shadow: 0 0 50px rgba(208,39,75,0.5); }
        }
      `}</style>
    </div>
  )
}

// ─── Mobile Grid ──────────────────────────────────────────────────────────────

function MobileWorkGrid({ onOpen }: { onOpen: (p: Project) => void }) {
  return (
    <div style={{ backgroundColor: DARK, minHeight: '100vh', paddingTop: 100, paddingBottom: 80 }}>
      <div style={{ maxWidth: 600, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>
        <p style={{ fontFamily: PP, fontWeight: 800, fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: RED, marginBottom: 16 }}>
          Selected Work
        </p>
        <h1 style={{ fontFamily: PP, fontWeight: 900, fontSize: 'clamp(40px, 10vw, 72px)', lineHeight: 0.92, letterSpacing: '-0.02em', textTransform: 'uppercase', color: '#fff', marginBottom: 48 }}>
          Brands built<br />to last.
        </h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {PROJECTS.map(p => (
            <button
              key={p.id}
              onClick={() => onOpen(p)}
              style={{
                background:   '#1a1a1a', border: 'none',
                borderBottom: '1px solid rgba(145,145,145,0.15)',
                padding:      '20px 0', textAlign: 'left',
                cursor:       'pointer', width: '100%',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.coverImage} alt={p.title}
                style={{ width: '100%', height: 180, objectFit: 'cover', display: 'block', marginBottom: 14 }}
              />
              <p style={{ fontFamily: PP, fontWeight: 800, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: RED, marginBottom: 6 }}>
                {p.category}
              </p>
              <h2 style={{ fontFamily: PP, fontWeight: 800, fontSize: 20, textTransform: 'uppercase', color: '#fff', marginBottom: 4 }}>
                {p.title}
              </h2>
              <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 13, color: '#919191' }}>
                {p.market} · {p.year}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
