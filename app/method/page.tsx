'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

// ─── Constants ────────────────────────────────────────────────────────────────
const PP   = "'PPNeueCorp', sans-serif"
const EASE = 'cubic-bezier(0.4, 0, 0.2, 1)'
const DUR  = '0.6s'

// Per-phase accent colors
const PHASE_COLORS = ['#D0274B', '#C8A96E', '#7B9EA6', '#6B8F6B']

// ─── Data ─────────────────────────────────────────────────────────────────────
const PHRASES = [
  'Diagnosis before design.',
  'Strategy before aesthetics.',
  'Understanding before execution.',
]

const PHASES = [
  {
    num: '01', name: 'Detect', keyword: 'DETECT',
    desc: 'We begin by listening — to the market, the audience, and the brand itself. We uncover latent tensions, map the competitive landscape, and find the space where your brand can live with conviction.',
  },
  {
    num: '02', name: 'Define', keyword: 'DEFINE',
    desc: 'Strategy is the backbone of everything we build. We articulate who you are, what you stand for, and how you should speak — shaping a brand platform that acts as the compass for every creative decision.',
  },
  {
    num: '03', name: 'Design', keyword: 'DESIGN',
    desc: 'Form follows meaning. Only once the strategy is settled do we build the visual system: typography, colour, communication architecture. Everything coherent, nothing arbitrary.',
  },
  {
    num: '04', name: 'Deliver', keyword: 'DELIVER',
    desc: 'A brand only works if it works in the world. We launch, document, and guard the brand over time — ensuring it remains coherent as it meets new contexts, channels, and audiences.',
  },
]

type ClientItem = { category: string; name: string; desc: string; href: string }
const CLIENTS: ClientItem[] = [
  { category: 'Brand Identity', name: 'Whatsub',    desc: 'A D.C. sub sandwich brand built from scratch.',   href: '/portfolio/whatsub'  },
  { category: 'Brand Identity', name: 'Al Barakeh', desc: 'Rooting heritage in contemporary form.',           href: '/work/al-barakeh'    },
  { category: 'Brand System',   name: 'Lumière',    desc: 'A hospitality brand that moves like light.',       href: '/work/lumiere'       },
  { category: 'Visual Identity',name: 'Rawaa',      desc: 'Wellness distilled into a visual language.',       href: '/work/rawaa'         },
]

// ─── Reveal hook (translateY 30px for more dramatic entrance) ─────────────────
function useReveal(threshold = 0.15, delay = 0) {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVis(true); obs.disconnect() } },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  return {
    ref,
    style: {
      opacity:    vis ? 1 : 0,
      transform:  vis ? 'translateY(0px)' : 'translateY(30px)',
      transition: `opacity ${DUR} ${EASE} ${delay}s, transform ${DUR} ${EASE} ${delay}s`,
    } as React.CSSProperties,
  }
}

// ─── Live Circle — sticky panel indicator ────────────────────────────────────
// Uses SVG native animateTransform (not CSS) for reliable ring rotation.
// Nodes are OUTSIDE any rotating group — they stay fixed.
function LiveCircle({
  activePhase,
  phaseChanging,
}: {
  activePhase: number
  phaseChanging: boolean
}) {
  const cx = 250, cy = 250
  const rOuter  = 210   // outer dashed ring
  const rInner  = 155   // inner dashed ring
  const rNode   = 172   // node orbit radius
  const rCenter = 68    // center circle

  const toRad = (deg: number) => (deg * Math.PI) / 180
  const pt = (deg: number, r: number) => ({
    x: cx + r * Math.cos(toRad(deg)),
    y: cy + r * Math.sin(toRad(deg)),
  })

  // 12/3/6/9 o'clock: standard angles −90/0/90/180
  const nodes = [
    { angle: -90, idx: 0, label: 'DETECT'  },
    { angle:   0, idx: 1, label: 'DEFINE'  },
    { angle:  90, idx: 2, label: 'DESIGN'  },
    { angle: 180, idx: 3, label: 'DELIVER' },
  ]

  const accent = PHASE_COLORS[activePhase]

  return (
    <svg
      viewBox="0 0 500 500"
      style={{ width: '100%', maxWidth: 'min(280px, 30vh)', display: 'block', overflow: 'visible', margin: '0 auto' }}
      aria-hidden="true"
    >
      {/* ── Outer dashed ring — CW, accent-colored ── */}
      <circle cx={cx} cy={cy} r={rOuter}
        fill="none" stroke={accent} strokeWidth={1.5} strokeDasharray="8 12" opacity={0.5}>
        {/* SVG native animateTransform — reliable across all browsers */}
        <animateTransform
          attributeName="transform" type="rotate"
          from={`0 ${cx} ${cy}`} to={`360 ${cx} ${cy}`}
          dur="20s" repeatCount="indefinite"
        />
      </circle>

      {/* ── Inner dashed ring — CCW, white ── */}
      <circle cx={cx} cy={cy} r={rInner}
        fill="none" stroke="white" strokeWidth={0.75} strokeDasharray="4 10" opacity={0.12}>
        <animateTransform
          attributeName="transform" type="rotate"
          from={`0 ${cx} ${cy}`} to={`-360 ${cx} ${cy}`}
          dur="35s" repeatCount="indefinite"
        />
      </circle>

      {/* ── Center circle — fills with accent color ── */}
      <circle cx={cx} cy={cy} r={rCenter} fill={accent}
        style={{ transition: `fill 0.6s ${EASE}` }} />

      {/* ── Center text — current phase keyword ── */}
      <text
        x={cx} y={cy + 6}
        textAnchor="middle"
        fill="white" fontSize={13} fontFamily={PP} fontWeight={900} letterSpacing="0.1em"
        style={{
          opacity:    phaseChanging ? 0 : 1,
          transition: `opacity 0.4s ${EASE}`,
        }}
      >
        {PHASES[activePhase].keyword}
      </text>

      {/* ── Fixed nodes at N/E/S/W — NOT inside any rotating group ── */}
      {nodes.map(({ angle, idx, label }) => {
        const p       = pt(angle, rNode)
        const isActive = idx === activePhase
        const fill     = isActive ? PHASE_COLORS[idx] : '#333333'
        const txtColor = isActive ? 'white' : '#555555'

        // Label offset outside the node
        let lx = p.x, ly = p.y
        let anchor: 'start' | 'middle' | 'end' = 'middle'
        if (angle === -90) { ly = p.y - 28;  anchor = 'middle' }       // top
        if (angle ===   0) { lx = p.x + 28;  ly = p.y + 4; anchor = 'start'  } // right
        if (angle ===  90) { ly = p.y + 32;  anchor = 'middle' }       // bottom
        if (angle === 180) { lx = p.x - 28;  ly = p.y + 4; anchor = 'end'    } // left

        return (
          <g key={label}>
            {/* Glow halo for active node */}
            {isActive && (
              <circle cx={p.x} cy={p.y} r={20}
                fill={fill} opacity={0.2}
                style={{ transition: `fill 0.6s ${EASE}` }} />
            )}

            {/* Node circle — CSS scale for size transition */}
            <circle cx={p.x} cy={p.y} r={10} fill={fill}
              style={{
                transformBox:   'fill-box',
                transformOrigin: 'center',
                transform:  isActive ? 'scale(1.5)' : 'scale(1)',
                transition: `transform 0.6s ${EASE}, fill 0.6s ${EASE}`,
                filter:     isActive ? `drop-shadow(0 0 6px ${fill})` : 'none',
              }} />

            {/* Phase label */}
            <text
              x={lx} y={ly} textAnchor={anchor}
              fill={txtColor} fontSize={11} fontFamily={PP}
              fontWeight={isActive ? 900 : 400} letterSpacing="0.06em"
              style={{ transition: `fill 0.6s ${EASE}` }}
            >
              {label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

// ─── Static diagram — section 2 ──────────────────────────────────────────────
function MethodDiagram() {
  const cx = 250, cy = 250, r2 = 180
  const toRad = (deg: number) => (deg * Math.PI) / 180
  const pt = (deg: number, r: number) => ({
    x: cx + r * Math.cos(toRad(deg)),
    y: cy + r * Math.sin(toRad(deg)),
  })
  const RED = '#D0274B'

  const nodes = [
    { angle: -90, num: '01', name: 'DETECT'  },
    { angle:   0, num: '02', name: 'DEFINE'  },
    { angle:  90, num: '03', name: 'DESIGN'  },
    { angle: 180, num: '04', name: 'DELIVER' },
  ]

  return (
    <svg viewBox="0 0 500 500"
      style={{ width: '100%', maxWidth: 500, display: 'block', overflow: 'visible' }}
      aria-hidden="true">

      {/* Outer ring CW — dashed so rotation is visible */}
      <circle cx={cx} cy={cy} r={220} fill="none" stroke={RED}
        strokeWidth={1} strokeDasharray="6 10" opacity={0.3}>
        <animateTransform attributeName="transform" type="rotate"
          from={`0 ${cx} ${cy}`} to={`360 ${cx} ${cy}`} dur="30s" repeatCount="indefinite" />
      </circle>

      {/* Inner ring CCW */}
      <circle cx={cx} cy={cy} r={r2} fill="none" stroke="white"
        strokeWidth={0.5} strokeDasharray="3 8" opacity={0.1}>
        <animateTransform attributeName="transform" type="rotate"
          from={`0 ${cx} ${cy}`} to={`-360 ${cx} ${cy}`} dur="45s" repeatCount="indefinite" />
      </circle>

      {/* Center */}
      <circle cx={cx} cy={cy} r={70} fill={RED} />
      <text x={cx} y={cy - 8} textAnchor="middle" fill="white"
        fontSize={15} fontFamily={PP} fontWeight={900}>Brand</text>
      <text x={cx} y={cy + 12} textAnchor="middle" fill="white"
        fontSize={15} fontFamily={PP} fontWeight={900}>Truth</text>

      {/* Fixed node dots */}
      {nodes.map(({ angle, name }) => {
        const p = pt(angle, r2)
        return <circle key={name} cx={p.x} cy={p.y} r={6} fill="white" />
      })}

      {/* Fixed labels */}
      {nodes.map(({ angle, num, name }) => {
        const p = pt(angle, r2)
        let lx = p.x, ly = p.y
        let anchor: 'start' | 'middle' | 'end' = 'middle'
        let dy1 = 0, dy2 = 0

        if      (angle === -90) { ly -= 22; dy1 = -16; dy2 = 0;  anchor = 'middle' }
        else if (angle ===   0) { lx += 22; dy1 = -6;  dy2 = 10; anchor = 'start'  }
        else if (angle ===  90) { ly += 22; dy1 = 16;  dy2 = 30; anchor = 'middle' }
        else                    { lx -= 22; dy1 = -6;  dy2 = 10; anchor = 'end'    }

        return (
          <g key={name}>
            <text x={lx} y={ly + dy1} textAnchor={anchor} fill={RED}
              fontSize={11} fontFamily={PP} fontWeight={400} letterSpacing="0.15em">{num}</text>
            <text x={lx} y={ly + dy2} textAnchor={anchor} fill="white"
              fontSize={13} fontFamily={PP} fontWeight={900} letterSpacing="0.04em">{name}</text>
          </g>
        )
      })}
    </svg>
  )
}

// ─── Client card ─────────────────────────────────────────────────────────────
function ClientCard({ category, name, desc, href }: ClientItem) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: 'clamp(260px, 28vw, 340px)', flexShrink: 0,
        background:  hov ? '#1a1a1a' : '#111111',
        padding:     40,
        borderTop:   `2px solid ${hov ? '#D0274B' : 'transparent'}`,
        transform:   hov ? 'translateY(-4px)' : 'translateY(0)',
        transition:  `background 0.3s ${EASE}, border-color 0.3s ${EASE}, transform 0.3s ${EASE}`,
      }}
    >
      <p style={{ color: '#D0274B', fontSize: 11, fontWeight: 400, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: PP }}>
        {category}
      </p>
      <h3 style={{ color: 'white', fontSize: 36, fontWeight: 900, marginTop: 12, lineHeight: 1.1, fontFamily: PP }}>
        {name}
      </h3>
      <p style={{ color: '#919191', fontSize: 14, fontWeight: 400, marginTop: 8, lineHeight: 1.6, fontFamily: PP }}>
        {desc}
      </p>
      <Link
        href={href}
        style={{
          display: 'block', color: 'white', fontSize: 13, fontWeight: 400,
          marginTop: 24, textDecoration: 'none', letterSpacing: '0.1em', fontFamily: PP,
          transition: `color 0.2s ${EASE}`, cursor: 'pointer',
        }}
        onMouseEnter={e => (e.currentTarget.style.color = '#D0274B')}
        onMouseLeave={e => (e.currentTarget.style.color = 'white')}
      >
        View Project →
      </Link>
    </div>
  )
}

// ─── CTA button ───────────────────────────────────────────────────────────────
function CTAButton() {
  const [hov, setHov] = useState(false)
  return (
    <Link
      href="/contact"
      style={{
        display: 'inline-block', padding: '20px 56px',
        fontSize: 16, fontWeight: 900, letterSpacing: '0.05em',
        textDecoration: 'none', fontFamily: PP,
        background: hov ? '#292929' : 'white',
        color:      hov ? 'white'   : '#D0274B',
        transition: `background 0.3s ${EASE}, color 0.3s ${EASE}`,
        cursor: 'pointer',
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      Start Your Diagnosis →
    </Link>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function MethodPage() {
  // Hero cycling text
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [leaving,   setLeaving]   = useState(false)

  // UI state
  const [showScroll,    setShowScroll]    = useState(true)
  const [activePhase,   setActivePhase]   = useState(0)
  const [phaseChanging, setPhaseChanging] = useState(false)
  const [heroOffset,    setHeroOffset]    = useState(0)

  const panelRefs = useRef<(HTMLDivElement | null)[]>([])

  // ── Reveal hooks ────────────────────────────────────────────────────────────
  const rDiagramHead = useReveal()
  const rDiagram     = useReveal(0.1)
  const rDiagramSub  = useReveal()
  const rWhyLeft     = useReveal()
  const rWhy1        = useReveal(0.15, 0)
  const rWhy2        = useReveal(0.15, 0.2)
  const rWhy3        = useReveal(0.15, 0.4)
  const rClientsHead = useReveal()
  const rClients     = useReveal(0.1)
  const rHook        = useReveal()
  const rCTA         = useReveal()

  // ── Phrase cycling — 1s enter · 3.5s hold · 1s leave ─────────────────────
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []
    const t1 = setTimeout(() => {
      setLeaving(true)
      const t2 = setTimeout(() => {
        setPhraseIdx(i => (i + 1) % PHRASES.length)
        setLeaving(false)
      }, 1000)
      timers.push(t2)
    }, 4500) // 1s enter + 3.5s hold
    timers.push(t1)
    return () => timers.forEach(clearTimeout)
  }, [phraseIdx])

  // ── Scroll indicator + hero parallax ──────────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setShowScroll(y < 100)
      setHeroOffset(y)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ── Phase IntersectionObserver ─────────────────────────────────────────────
  useEffect(() => {
    const observers: IntersectionObserver[] = []
    panelRefs.current.forEach((panel, i) => {
      if (!panel) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setPhaseChanging(true)
            // Wait for full fade-out before swapping content
            setTimeout(() => { setActivePhase(i); setPhaseChanging(false) }, 400)
          }
        },
        { threshold: 0.4 }
      )
      obs.observe(panel)
      observers.push(obs)
    })
    return () => observers.forEach(obs => obs.disconnect())
  }, [])

  const phase  = PHASES[activePhase]
  const accent = PHASE_COLORS[activePhase]

  return (
    <div style={{ background: '#000', minHeight: '100vh', fontFamily: PP, color: 'white' }}>

      {/* ══ 1 — HERO ════════════════════════════════════════════════════════════ */}
      <section style={{
        height: '100vh', background: '#000', overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative',
      }}>
        {/* Top-left label */}
        <p style={{
          position: 'absolute',
          top: 'clamp(120px, 14vh, 160px)',
          left: 'clamp(36px, 7.5vw, 120px)',
          color: '#919191', fontSize: 12, letterSpacing: '0.2em',
          textTransform: 'uppercase', fontWeight: 400, fontFamily: PP,
          animation: `methodFadeUp 0.6s ${EASE} 0.3s both`,
        }}>
          Our Process
        </p>

        {/* Center content — parallax on scroll at 0.3× speed */}
        <div style={{
          textAlign: 'center',
          padding: '0 clamp(36px, 7.5vw, 120px)',
          maxWidth: 960, width: '100%',
          transform: `translateY(${heroOffset * 0.3}px)`,
          willChange: 'transform',
        }}>
          {/* Red pill badge */}
          <div style={{
            display: 'inline-block', background: '#D0274B', color: 'white',
            fontSize: 11, fontWeight: 400, letterSpacing: '0.15em',
            textTransform: 'uppercase', padding: '6px 14px', fontFamily: PP,
            marginBottom: 56,
            animation: `methodFadeUp 0.6s ${EASE} 0.5s both`,
          }}>
            The 4D Method
          </div>

          {/* Cycling heading */}
          <div style={{ overflow: 'hidden', marginBottom: 48 }}>
            <h1
              key={phraseIdx}
              style={{
                fontSize: 'clamp(44px, 6.5vw, 80px)', fontWeight: 900, color: 'white',
                lineHeight: 1.1, margin: 0, fontFamily: PP,
                animation: leaving
                  ? `methodPhraseOut 1s ${EASE} forwards`
                  : `methodPhraseIn  1s ${EASE} forwards`,
              }}
            >
              {PHRASES[phraseIdx]}
            </h1>
          </div>

          {/* Static subline */}
          <p style={{
            fontSize: 22, color: '#919191', maxWidth: 580, margin: '0 auto',
            lineHeight: 1.7, fontWeight: 400, fontFamily: PP,
            animation: `methodFadeUp 0.6s ${EASE} 1s both`,
          }}>
            A four-phase method built on one belief — we don&apos;t design until we understand.
          </p>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute', bottom: 56, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          color: '#919191', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase',
          fontFamily: PP, userSelect: 'none',
          opacity: showScroll ? 1 : 0,
          transition: `opacity 0.4s ${EASE}`,
        }}>
          <span style={{ fontWeight: 400 }}>Scroll</span>
          <span style={{ animation: 'methodBounce 2s ease-in-out infinite', display: 'inline-block' }}>↓</span>
        </div>
      </section>

      {/* ══ 2 — METHOD DIAGRAM ══════════════════════════════════════════════════ */}
      <section style={{ background: '#000', padding: '160px 0', textAlign: 'center' }}>
        <div ref={rDiagramHead.ref}
          style={{ ...rDiagramHead.style, padding: '0 clamp(36px, 6vw, 80px)', marginBottom: 80 }}>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 72px)', fontWeight: 900, color: 'white', fontFamily: PP }}>
            Four phases. One destination.
          </h2>
        </div>

        <div ref={rDiagram.ref}
          style={{ ...rDiagram.style, maxWidth: 500, margin: '0 auto', padding: '0 40px' }}>
          <MethodDiagram />
        </div>

        <div ref={rDiagramSub.ref}
          style={{ ...rDiagramSub.style, marginTop: 60, padding: '0 clamp(36px, 6vw, 80px)' }}>
          <p style={{ color: '#919191', fontSize: 14, fontWeight: 400, letterSpacing: '0.1em', fontFamily: PP }}>
            Detect. Define. Design. Deliver. In that order. Always.
          </p>
        </div>
      </section>

      {/* ── Breath divider — 80px air above and below ─────────────────────────── */}
      <div style={{ padding: '80px clamp(36px, 6vw, 80px)' }}>
        <div style={{ width: '100%', height: 1, background: '#1a1a1a' }} />
      </div>

      {/* ══ 3 — INTERACTIVE 4D STEPS ════════════════════════════════════════════ */}
      <section style={{ background: '#000' }}>

        {/* ── Desktop: sticky left + scrollable right ──────────────────────────── */}
        <div className="method-steps-desktop" style={{ display: 'flex', alignItems: 'flex-start' }}>

          {/* LEFT STICKY PANEL */}
          <div style={{
            width: '50%', flexShrink: 0,
            position: 'sticky', top: 0, height: '100vh',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 'clamp(40px, 6vh, 80px) clamp(40px, 5vw, 80px)',
            borderRight: '1px solid rgba(255,255,255,0.06)',
            overflow: 'hidden',
          } as React.CSSProperties}>

            {/* Accent tint — subtle background wash per phase */}
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              background: accent, opacity: 0.04,
              transition: `background 0.8s ${EASE}`,
            }} />

            <div style={{ position: 'relative', width: '100%', maxWidth: 440, zIndex: 1 }}>

              {/* ── Live circle (replaces ghost number) ── */}
              <div style={{ marginBottom: 32, overflow: 'visible' }}>
                <LiveCircle activePhase={activePhase} phaseChanging={phaseChanging} />
              </div>

              {/* Phase counter */}
              <p style={{
                color: '#555', fontSize: 12, letterSpacing: '0.2em',
                textTransform: 'uppercase', fontWeight: 400,
                marginBottom: 16, fontFamily: PP,
              }}>
                Phase {phase.num} / 04
              </p>

              {/* Phase name — accent color, blur transition */}
              <h2 style={{
                fontSize: 'clamp(40px, 5.5vw, 80px)', fontWeight: 900,
                textTransform: 'uppercase', lineHeight: 1, fontFamily: PP,
                color: accent,
                opacity:    phaseChanging ? 0 : 1,
                transform:  phaseChanging ? 'translateY(10px)' : 'translateY(0px)',
                filter:     phaseChanging ? 'blur(4px)' : 'blur(0px)',
                transition: `opacity 0.4s ${EASE}, transform 0.4s ${EASE}, filter 0.4s ${EASE}, color 0.6s ${EASE}`,
              }}>
                {phase.name}
              </h2>

              {/* Divider — accent color */}
              <div style={{
                width: 60, height: 2,
                marginTop: 24, marginBottom: 28,
                background: accent,
                transition: `background 0.6s ${EASE}`,
              }} />

              {/* Description — more generous line height + max-width */}
              <p style={{
                fontSize: 16, color: '#919191', lineHeight: 1.9,
                fontWeight: 400, maxWidth: 480, fontFamily: PP,
                opacity:    phaseChanging ? 0 : 1,
                filter:     phaseChanging ? 'blur(4px)' : 'blur(0px)',
                transition: `opacity 0.5s ${EASE}, filter 0.5s ${EASE}`,
              }}>
                {phase.desc}
              </p>

              {/* Next Phase button — accent border/text */}
              {activePhase < 3 && (
                <button
                  onClick={() => {
                    const next = panelRefs.current[activePhase + 1]
                    if (!next) return
                    const lenis = (window as typeof window & { lenis?: { scrollTo: (el: Element, opts?: object) => void } }).lenis
                    lenis ? lenis.scrollTo(next, { offset: -80, duration: 1.2 }) : next.scrollIntoView({ behavior: 'smooth' })
                  }}
                  style={{
                    marginTop: 36, display: 'inline-flex', alignItems: 'center', gap: 8,
                    color: accent, fontSize: 12, fontWeight: 400, letterSpacing: '0.15em',
                    textTransform: 'uppercase', fontFamily: PP,
                    background: 'transparent', border: `1px solid ${accent}`,
                    padding: '10px 20px', cursor: 'pointer',
                    transition: `color 0.3s ${EASE}, border-color 0.3s ${EASE}, background 0.3s ${EASE}`,
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget
                    el.style.background = accent
                    el.style.color = '#fff'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget
                    el.style.background = 'transparent'
                    el.style.color = accent
                  }}
                >
                  Next Phase ↓
                </button>
              )}
            </div>
          </div>

          {/* RIGHT SCROLLABLE PANELS */}
          <div style={{ width: '50%', flexShrink: 0 }}>
            {PHASES.map((p, i) => (
              <div
                key={p.num}
                ref={el => { panelRefs.current[i] = el }}
                style={{
                  height: '100vh', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', position: 'relative', overflow: 'hidden',
                  borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                }}
              >
                {/* Ghost keyword texture */}
                <div style={{
                  position: 'absolute', inset: 0, display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  pointerEvents: 'none', userSelect: 'none', overflow: 'hidden',
                }}>
                  <span style={{
                    fontSize: 'clamp(80px, 16vw, 200px)', fontWeight: 900,
                    color: 'white', opacity: 0.03,
                    letterSpacing: '-0.04em', whiteSpace: 'nowrap', fontFamily: PP,
                  }}>
                    {p.keyword}
                  </span>
                </div>
                {/* Large phase number in phase accent color */}
                <p style={{
                  position: 'relative',
                  fontSize: 'clamp(80px, 12vw, 160px)', fontWeight: 900,
                  color: PHASE_COLORS[i], lineHeight: 1, opacity: 0.5, fontFamily: PP,
                }}>
                  {p.num}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Mobile: vertical stack ───────────────────────────────────────────── */}
        <div className="method-steps-mobile" style={{ display: 'none' }}>
          {PHASES.map((p, i) => (
            <div key={p.num} style={{
              padding: '80px 24px',
              borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.07)' : 'none',
            }}>
              <p style={{ color: '#555', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16, fontFamily: PP }}>
                Phase {p.num} / 04
              </p>
              <h3 style={{
                fontSize: 40, fontWeight: 900, textTransform: 'uppercase', marginBottom: 20, fontFamily: PP,
                color: PHASE_COLORS[i],
              }}>
                {p.name}
              </h3>
              <div style={{ width: 60, height: 2, background: PHASE_COLORS[i], marginBottom: 24 }} />
              <p style={{ fontSize: 16, color: '#919191', lineHeight: 1.9, fontWeight: 400, fontFamily: PP }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ 4 — WHY DIAGNOSIS FIRST? ════════════════════════════════════════════ */}
      <section style={{ background: '#292929', padding: '160px clamp(36px, 6vw, 80px)' }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          display: 'flex', gap: 'clamp(40px, 6vw, 100px)', flexWrap: 'wrap',
        }}>
          {/* Left */}
          <div ref={rWhyLeft.ref} style={{ ...rWhyLeft.style, flex: '0 0 clamp(240px, 36%, 380px)' }}>
            <h2 style={{
              fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 900, color: 'white',
              lineHeight: 1.1, marginBottom: 20, fontFamily: PP,
            }}>
              Why diagnosis first?
            </h2>
            <p style={{ color: '#D0274B', fontSize: 12, fontWeight: 400, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: PP }}>
              Our Differentiator
            </p>
          </div>

          {/* Right — staggered statements, 64px spacing, 3px border */}
          <div style={{ flex: '1 1 300px' }}>
            {[
              { r: rWhy1, text: 'Most agencies design to impress. We design to solve. The difference starts before any creative work begins.' },
              { r: rWhy2, text: 'A beautiful brand built on the wrong foundation is just expensive confusion.' },
              { r: rWhy3, text: 'Every engagement at Thinchronize starts with a diagnosis — not a brief, not a mood board, not a budget conversation. We listen first. We build after.' },
            ].map(({ r, text }, i) => (
              <div
                key={i}
                ref={r.ref}
                style={{
                  ...r.style,
                  borderLeft: '3px solid #D0274B',
                  paddingLeft: 28,
                  marginBottom: i < 2 ? 64 : 0,
                }}
              >
                <p style={{ color: 'white', fontSize: 18, lineHeight: 1.75, fontWeight: 400, fontFamily: PP }}>
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 5 — SELECTED CLIENTS ════════════════════════════════════════════════ */}
      <section style={{ background: '#000', padding: '160px 0' }}>
        <div style={{ padding: '0 clamp(36px, 6vw, 80px)', marginBottom: 60 }}>
          <div ref={rClientsHead.ref} style={rClientsHead.style}>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 72px)', fontWeight: 900, color: 'white', marginBottom: 16, fontFamily: PP }}>
              Work shaped by this method
            </h2>
            <p style={{ color: '#919191', fontSize: 16, fontWeight: 400, fontFamily: PP }}>
              Every project below went through all four phases.
            </p>
          </div>
        </div>

        <div ref={rClients.ref}
          style={{ ...rClients.style, overflowX: 'auto', scrollbarWidth: 'none' }}>
          <div style={{
            display: 'flex', gap: 2,
            padding: '0 clamp(36px, 6vw, 80px)',
            width: 'max-content',
          }}>
            {CLIENTS.map((c, i) => <ClientCard key={i} {...c} />)}
          </div>
        </div>

        <div style={{ padding: '40px clamp(36px, 6vw, 80px) 0', textAlign: 'right' }}>
          <Link
            href="/portfolio"
            style={{
              color: 'white', fontSize: 14, fontWeight: 400, fontFamily: PP,
              letterSpacing: '0.1em', textDecoration: 'none',
              transition: `color 0.2s ${EASE}`,
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#D0274B')}
            onMouseLeave={e => (e.currentTarget.style.color = 'white')}
          >
            View all projects →
          </Link>
        </div>
      </section>

      {/* ══ 6 — CURIOSITY HOOK ══════════════════════════════════════════════════ */}
      <section style={{ background: '#000', padding: '120px clamp(36px, 6vw, 80px)', textAlign: 'center' }}>
        <div ref={rHook.ref} style={rHook.style}>
          <h2 style={{
            fontSize: 'clamp(44px, 7vw, 96px)', fontWeight: 900, color: 'white',
            lineHeight: 1.1, marginBottom: 24, fontFamily: PP,
          }}>
            Could this be<br />
            <span style={{ color: '#D0274B' }}>your brand?</span>
          </h2>
          <p style={{ color: '#919191', fontSize: 16, fontWeight: 400, maxWidth: 400, margin: '0 auto', lineHeight: 1.6, fontFamily: PP }}>
            We&apos;re selective. We work with brands that are ready to do the work.
          </p>
        </div>
      </section>

      {/* ══ 7 — CTA ═════════════════════════════════════════════════════════════ */}
      <section style={{ background: '#D0274B', padding: '160px clamp(36px, 6vw, 80px)', textAlign: 'center' }}>
        <div ref={rCTA.ref} style={rCTA.style}>
          <h2 style={{
            fontSize: 'clamp(40px, 6.5vw, 96px)', fontWeight: 900, color: 'white',
            lineHeight: 1.05, marginBottom: 24, fontFamily: PP,
          }}>
            Every great brand starts<br />with a diagnosis.
          </h2>
          <p style={{
            color: 'rgba(255,255,255,0.75)', fontSize: 18, fontWeight: 400,
            maxWidth: 480, margin: '0 auto 56px', lineHeight: 1.6, fontFamily: PP,
          }}>
            We take on a limited number of projects each quarter to ensure every client gets our full attention.
          </p>
          <CTAButton />
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 400, marginTop: 24, fontFamily: PP }}>
            We respond within 48 hours.
          </p>
        </div>
      </section>

      {/* ── Global keyframes ─────────────────────────────────────────────────── */}
      <style>{`
        @keyframes methodFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes methodPhraseIn {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes methodPhraseOut {
          from { opacity: 1; transform: translateY(0); }
          to   { opacity: 0; transform: translateY(-28px); }
        }
        @keyframes methodBounce {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(8px); }
        }

        .method-steps-desktop { display: flex;  }
        .method-steps-mobile  { display: none;  }

        @media (max-width: 768px) {
          .method-steps-desktop { display: none  !important; }
          .method-steps-mobile  { display: block !important; }
        }
      `}</style>
    </div>
  )
}
