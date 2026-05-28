'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

// ─── Constants ────────────────────────────────────────────────────────────────
const PP   = "'PPNeueCorp', sans-serif"
const EASE = 'cubic-bezier(0.4, 0, 0.2, 1)'

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
  { category: 'Brand Identity', name: 'Whatsub',    desc: 'A D.C. sub sandwich brand built from scratch.',   href: '/portfolio/whatsub' },
  { category: 'Brand Identity', name: 'Al Barakeh', desc: 'Rooting heritage in contemporary form.',           href: '/work/al-barakeh'   },
  { category: 'Brand System',   name: 'Lumière',    desc: 'A hospitality brand that moves like light.',       href: '/work/lumiere'      },
  { category: 'Visual Identity',name: 'Rawaa',      desc: 'Wellness distilled into a visual language.',       href: '/work/rawaa'        },
]

// ─── Scroll-reveal hook ───────────────────────────────────────────────────────
// threshold:0 so it fires the moment any pixel enters the viewport
function useReveal(delay = 0) {
  const ref  = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVis(true); obs.disconnect() } },
      { threshold: 0 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return {
    ref,
    style: {
      opacity:    vis ? 1 : 0,
      transform:  vis ? 'translateY(0)' : 'translateY(30px)',
      transition: `opacity 0.7s ${EASE} ${delay}s, transform 0.7s ${EASE} ${delay}s`,
    } as React.CSSProperties,
  }
}

// ─── Live Circle ──────────────────────────────────────────────────────────────
// Solid rings + orbiting marker dots for visible rotation.
// animateTransform on the marker dots (not the rings themselves).
// Nodes are OUTSIDE any rotating group.
function LiveCircle({ activePhase, phaseChanging }: { activePhase: number; phaseChanging: boolean }) {
  const cx = 250, cy = 250
  const rOuter  = 210
  const rInner  = 155
  const rNode   = 172
  const rCenter = 68

  const toRad = (deg: number) => (deg * Math.PI) / 180
  const pt    = (deg: number, r: number) => ({
    x: cx + r * Math.cos(toRad(deg)),
    y: cy + r * Math.sin(toRad(deg)),
  })

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
      style={{ width: '100%', maxWidth: 'min(260px, 28vh)', display: 'block', overflow: 'visible', margin: '0 auto' }}
      aria-hidden="true"
    >
      {/* ── Solid outer ring ── */}
      <circle cx={cx} cy={cy} r={rOuter} fill="none" stroke={accent} strokeWidth={1.5} opacity={0.35} />

      {/* ── Orbiting dot on outer ring — CW 20s — makes rotation visible ── */}
      <circle cx={cx + rOuter} cy={cy} r={4} fill={accent} opacity={0.8}>
        <animateTransform
          attributeName="transform" type="rotate"
          from={`0 ${cx} ${cy}`} to={`360 ${cx} ${cy}`}
          dur="20s" repeatCount="indefinite"
        />
      </circle>

      {/* ── Solid inner ring ── */}
      <circle cx={cx} cy={cy} r={rInner} fill="none" stroke="white" strokeWidth={0.75} opacity={0.1} />

      {/* ── Orbiting dot on inner ring — CCW 35s ── */}
      <circle cx={cx + rInner} cy={cy} r={3} fill="white" opacity={0.3}>
        <animateTransform
          attributeName="transform" type="rotate"
          from={`0 ${cx} ${cy}`} to={`-360 ${cx} ${cy}`}
          dur="35s" repeatCount="indefinite"
        />
      </circle>

      {/* ── Center circle — accent fill ── */}
      <circle cx={cx} cy={cy} r={rCenter} fill={accent}
        style={{ transition: `fill 0.6s ${EASE}` }} />

      {/* ── Center text — fades during phase change ── */}
      <text
        x={cx} y={cy + 6}
        textAnchor="middle"
        fill="white" fontSize={13} fontFamily={PP} fontWeight={900} letterSpacing="0.1em"
        style={{ opacity: phaseChanging ? 0 : 1, transition: `opacity 0.35s ${EASE}` }}
      >
        {PHASES[activePhase].keyword}
      </text>

      {/* ── Fixed nodes at N/E/S/W ── */}
      {nodes.map(({ angle, idx, label }) => {
        const p        = pt(angle, rNode)
        const isActive = idx === activePhase
        const fill     = isActive ? PHASE_COLORS[idx] : '#2a2a2a'
        const txtColor = isActive ? '#ffffff' : '#555555'

        let lx = p.x, ly = p.y
        let anchor: 'start' | 'middle' | 'end' = 'middle'
        if (angle === -90) { ly = p.y - 26; anchor = 'middle' }
        if (angle ===   0) { lx = p.x + 26; ly = p.y + 4; anchor = 'start' }
        if (angle ===  90) { ly = p.y + 30; anchor = 'middle' }
        if (angle === 180) { lx = p.x - 26; ly = p.y + 4; anchor = 'end'   }

        return (
          <g key={label}>
            {isActive && (
              <circle cx={p.x} cy={p.y} r={18} fill={fill} opacity={0.18}
                style={{ transition: `fill 0.5s ${EASE}` }} />
            )}
            <circle cx={p.x} cy={p.y} r={10} fill={fill}
              style={{
                transformBox: 'fill-box', transformOrigin: 'center',
                transform:  isActive ? 'scale(1.5)' : 'scale(1)',
                transition: `transform 0.5s ${EASE}, fill 0.5s ${EASE}`,
                filter:     isActive ? `drop-shadow(0 0 5px ${fill})` : 'none',
              }} />
            <text
              x={lx} y={ly} textAnchor={anchor}
              fill={txtColor} fontSize={11} fontFamily={PP}
              fontWeight={isActive ? 900 : 400} letterSpacing="0.06em"
              style={{ transition: `fill 0.5s ${EASE}` }}
            >
              {label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

// ─── Static diagram — section 2 ───────────────────────────────────────────────
function MethodDiagram() {
  const cx = 250, cy = 250, r2 = 180
  const toRad = (deg: number) => (deg * Math.PI) / 180
  const pt    = (deg: number, r: number) => ({
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

      {/* Solid outer ring */}
      <circle cx={cx} cy={cy} r={220} fill="none" stroke={RED} strokeWidth={1} opacity={0.3} />
      {/* Orbiting dot CW */}
      <circle cx={cx + 220} cy={cy} r={4} fill={RED} opacity={0.6}>
        <animateTransform attributeName="transform" type="rotate"
          from={`0 ${cx} ${cy}`} to={`360 ${cx} ${cy}`} dur="30s" repeatCount="indefinite" />
      </circle>

      {/* Solid inner ring */}
      <circle cx={cx} cy={cy} r={r2} fill="none" stroke="white" strokeWidth={0.5} opacity={0.1} />
      {/* Orbiting dot CCW */}
      <circle cx={cx + r2} cy={cy} r={3} fill="white" opacity={0.25}>
        <animateTransform attributeName="transform" type="rotate"
          from={`0 ${cx} ${cy}`} to={`-360 ${cx} ${cy}`} dur="45s" repeatCount="indefinite" />
      </circle>

      {/* Center */}
      <circle cx={cx} cy={cy} r={70} fill={RED} />
      <text x={cx} y={cy - 8} textAnchor="middle" fill="white" fontSize={15} fontFamily={PP} fontWeight={900}>Brand</text>
      <text x={cx} y={cy + 12} textAnchor="middle" fill="white" fontSize={15} fontFamily={PP} fontWeight={900}>Truth</text>

      {nodes.map(({ angle, name }) => {
        const p = pt(angle, r2)
        return <circle key={name} cx={p.x} cy={p.y} r={6} fill="white" />
      })}

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

// ─── Client card ──────────────────────────────────────────────────────────────
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
          transition: `color 0.2s ${EASE}`,
        }}
        onMouseEnter={e => (e.currentTarget.style.color = '#D0274B')}
        onMouseLeave={e => (e.currentTarget.style.color = 'white')}
      >
        View Project →
      </Link>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function MethodPage() {

  // ── Hydration guard — prevents SSR/client animation mismatch ──────────────
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  // ── Hero cycling text ──────────────────────────────────────────────────────
  // phraseIdx drives content; cycled tracks whether a transition has happened
  // so we only apply the enter animation after the first phrase leaves
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [leaving,   setLeaving]   = useState(false)
  const [cycled,    setCycled]    = useState(false) // true after first phrase swap

  // ── Scroll + parallax ─────────────────────────────────────────────────────
  const [showScroll, setShowScroll] = useState(true)
  const [heroOffset, setHeroOffset] = useState(0)

  // ── Click-based phase state ────────────────────────────────────────────────
  const [activePhase,   setActivePhase]   = useState(0)
  const [phaseChanging, setPhaseChanging] = useState(false)

  // ── Reveal hooks ──────────────────────────────────────────────────────────
  const rDiagramHead = useReveal(0)
  const rDiagram     = useReveal(0.1)
  const rDiagramSub  = useReveal(0.2)
  const rWhyLeft     = useReveal(0)
  const rWhy1        = useReveal(0)
  const rWhy2        = useReveal(0.15)
  const rWhy3        = useReveal(0.3)
  const rClientsHead = useReveal(0)
  const rClients     = useReveal(0.1)
  const rHook        = useReveal(0)
  const rCTA         = useReveal(0)

  // ── Phrase cycling (runs only after mount) ─────────────────────────────────
  useEffect(() => {
    if (!mounted) return
    const timers: ReturnType<typeof setTimeout>[] = []
    const t1 = setTimeout(() => {
      setLeaving(true)
      const t2 = setTimeout(() => {
        setCycled(true)
        setPhraseIdx(i => (i + 1) % PHRASES.length)
        setLeaving(false)
      }, 900)
      timers.push(t2)
    }, 4200) // hold duration
    timers.push(t1)
    return () => timers.forEach(clearTimeout)
  }, [phraseIdx, mounted])

  // ── Scroll: indicator + parallax ──────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      setShowScroll(window.scrollY < 80)
      setHeroOffset(window.scrollY)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ── Click-based phase advance ─────────────────────────────────────────────
  const advancePhase = () => {
    if (activePhase >= 3 || phaseChanging) return
    setPhaseChanging(true)
    setTimeout(() => {
      setActivePhase(p => p + 1)
      setPhaseChanging(false)
    }, 380)
  }

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
        <p style={{
          position: 'absolute',
          top: 'clamp(120px, 14vh, 160px)',
          left: 'clamp(36px, 7.5vw, 120px)',
          color: '#919191', fontSize: 12, letterSpacing: '0.2em',
          textTransform: 'uppercase', fontWeight: 400, fontFamily: PP,
          animation: mounted ? `methodFadeUp 0.6s ${EASE} 0.3s both` : 'none',
        }}>
          Our Process
        </p>

        {/* Hero content — parallax 0.3× on scroll */}
        <div style={{
          textAlign: 'center',
          padding: '0 clamp(36px, 7.5vw, 120px)',
          maxWidth: 960, width: '100%',
          transform: `translateY(${heroOffset * 0.3}px)`,
          willChange: 'transform',
        }}>
          {/* Red badge */}
          <div style={{
            display: 'inline-block', background: '#D0274B', color: 'white',
            fontSize: 11, fontWeight: 400, letterSpacing: '0.15em',
            textTransform: 'uppercase', padding: '6px 14px', fontFamily: PP,
            marginBottom: 56,
            animation: mounted ? `methodFadeUp 0.6s ${EASE} 0.5s both` : 'none',
          }}>
            The 4D Method
          </div>

          {/* ── Cycling headline ──
              FIX: keyframes live in globals.css so they're always loaded.
              FIX: mounted guard — no animation on SSR (text visible by default).
              FIX: cycled guard — first phrase has no enter animation (avoids flash).
          */}
          <div style={{ overflow: 'hidden', marginBottom: 48 }}>
            <h1
              key={phraseIdx}
              style={{
                fontSize: 'clamp(44px, 6.5vw, 80px)', fontWeight: 900, color: 'white',
                lineHeight: 1.1, margin: 0, fontFamily: PP,
                // Before mount: fully visible, no animation
                // After mount + leaving: slide out
                // After mount + new phrase entered (cycled=true): slide in
                // After mount + first phrase (cycled=false): just visible
                animation: !mounted
                  ? 'none'
                  : leaving
                    ? `methodPhraseOut 0.9s ${EASE} forwards`
                    : cycled
                      ? `methodPhraseIn 0.9s ${EASE} forwards`
                      : 'none',
              }}
            >
              {PHRASES[phraseIdx]}
            </h1>
          </div>

          {/* Static subline */}
          <p style={{
            fontSize: 22, color: '#919191', maxWidth: 580, margin: '0 auto',
            lineHeight: 1.7, fontWeight: 400, fontFamily: PP,
            animation: mounted ? `methodFadeUp 0.6s ${EASE} 1s both` : 'none',
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
          <span>Scroll</span>
          <span style={{ animation: mounted ? 'methodBounce 2s ease-in-out infinite' : 'none', display: 'inline-block' }}>↓</span>
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

      {/* ── Breath divider ────────────────────────────────────────────────────── */}
      <div style={{ padding: '80px clamp(36px, 6vw, 80px)' }}>
        <div style={{ width: '100%', height: 1, background: '#1a1a1a' }} />
      </div>

      {/* ══ 3 — 4D PHASES — CLICK-BASED ════════════════════════════════════════
          Replaces scroll IO with click-driven state.
          Left panel: circle + content (updates on click).
          Right panel: faint keyword text only, no phase numbers.
      ══════════════════════════════════════════════════════════════════════════ */}
      <section style={{ background: '#000' }}>
        <div style={{ display: 'flex', alignItems: 'stretch', minHeight: '100vh' }}>

          {/* LEFT — circle + content */}
          <div
            className="method-phase-left"
            style={{
              width: '50%', flexShrink: 0,
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
              padding: 'clamp(60px, 8vh, 100px) clamp(40px, 5vw, 80px)',
              borderRight: '1px solid rgba(255,255,255,0.06)',
              position: 'relative', overflow: 'hidden',
            }}
          >
            {/* Subtle accent background tint */}
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              background: accent, opacity: 0.04,
              transition: `background 0.8s ${EASE}`,
            }} />

            <div style={{ position: 'relative', zIndex: 1, maxWidth: 440 }}>

              {/* Live circle */}
              <div style={{ marginBottom: 36, overflow: 'visible' }}>
                <LiveCircle activePhase={activePhase} phaseChanging={phaseChanging} />
              </div>

              {/* Phase counter */}
              <p style={{
                color: '#444', fontSize: 12, letterSpacing: '0.2em',
                textTransform: 'uppercase', fontWeight: 400,
                marginBottom: 16, fontFamily: PP,
              }}>
                Phase {phase.num} / 04
              </p>

              {/* Phase name — accent color, blur+fade on change */}
              <h2 style={{
                fontSize: 'clamp(40px, 5vw, 72px)', fontWeight: 900,
                textTransform: 'uppercase', lineHeight: 1, fontFamily: PP,
                color: accent,
                opacity:    phaseChanging ? 0 : 1,
                transform:  phaseChanging ? 'translateY(8px)' : 'translateY(0)',
                filter:     phaseChanging ? 'blur(6px)' : 'blur(0)',
                transition: `opacity 0.38s ${EASE}, transform 0.38s ${EASE}, filter 0.38s ${EASE}, color 0.5s ${EASE}`,
              }}>
                {phase.name}
              </h2>

              {/* Accent divider */}
              <div style={{
                width: 60, height: 2, marginTop: 24, marginBottom: 24,
                background: accent,
                transition: `background 0.5s ${EASE}`,
              }} />

              {/* Description body copy — always rendered, #919191, 16px, lh 1.8 */}
              <p style={{
                fontSize: 16, color: '#919191', lineHeight: 1.8,
                fontWeight: 400, maxWidth: 440, fontFamily: PP,
                opacity:    phaseChanging ? 0 : 1,
                filter:     phaseChanging ? 'blur(4px)' : 'blur(0)',
                transition: `opacity 0.4s ${EASE}, filter 0.4s ${EASE}`,
              }}>
                {phase.desc}
              </p>

              {/* Action button */}
              <div style={{ marginTop: 36 }}>
                {activePhase < 3 ? (
                  <button
                    onClick={advancePhase}
                    disabled={phaseChanging}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                      color: accent, fontSize: 12, fontWeight: 400,
                      letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: PP,
                      background: 'transparent', border: `1px solid ${accent}`,
                      padding: '12px 24px', cursor: phaseChanging ? 'default' : 'pointer',
                      transition: `color 0.3s ${EASE}, border-color 0.3s ${EASE}, background 0.3s ${EASE}, opacity 0.3s`,
                      opacity: phaseChanging ? 0.4 : 1,
                    }}
                    onMouseEnter={e => { if (!phaseChanging) { e.currentTarget.style.background = accent; e.currentTarget.style.color = '#fff' } }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = accent }}
                  >
                    Next Phase ↓
                  </button>
                ) : (
                  <Link
                    href="/contact"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                      color: 'white', fontSize: 12, fontWeight: 900,
                      letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: PP,
                      background: '#D0274B', border: '1px solid #D0274B',
                      padding: '12px 24px', textDecoration: 'none',
                      transition: `background 0.3s ${EASE}, color 0.3s ${EASE}`,
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#b8223f'; e.currentTarget.style.borderColor = '#b8223f' }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#D0274B'; e.currentTarget.style.borderColor = '#D0274B' }}
                  >
                    Start Your Diagnosis →
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT — faint keyword only. NO phase numbers. */}
          <div
            className="method-phase-right"
            style={{
              width: '50%', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative', overflow: 'hidden',
            }}
          >
            <span style={{
              fontSize: 'clamp(72px, 14vw, 200px)', fontWeight: 900,
              color: 'white',
              opacity: phaseChanging ? 0 : 0.04,
              letterSpacing: '-0.04em', whiteSpace: 'nowrap', fontFamily: PP,
              transition: `opacity 0.4s ${EASE}`,
              userSelect: 'none', pointerEvents: 'none',
            }}>
              {PHASES[activePhase].keyword}
            </span>
          </div>
        </div>

        {/* Mobile: full width, no right panel */}
        <style>{`
          @media (max-width: 768px) {
            .method-phase-left  { width: 100% !important; border-right: none !important; }
            .method-phase-right { display: none !important; }
          }
        `}</style>
      </section>

      {/* ══ 4 — WHY DIAGNOSIS FIRST? ════════════════════════════════════════════ */}
      <section style={{ background: '#141414', padding: '160px clamp(36px, 6vw, 80px)' }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          display: 'flex', gap: 'clamp(40px, 6vw, 100px)', flexWrap: 'wrap',
        }}>
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
        <div style={{ padding: '0 clamp(36px, 6vw, 80px)', marginBottom: 64 }}>
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

      {/* ══ 6 — COULD THIS BE YOUR BRAND? ══════════════════════════════════════ */}
      <section style={{ background: '#000', padding: '140px clamp(36px, 6vw, 80px)', textAlign: 'center' }}>
        <div ref={rHook.ref} style={rHook.style}>
          <h2 style={{
            fontSize: 'clamp(44px, 7vw, 96px)', fontWeight: 900, color: 'white',
            lineHeight: 1.1, marginBottom: 24, fontFamily: PP,
          }}>
            Could this be<br />
            <span style={{ color: '#D0274B' }}>your brand?</span>
          </h2>
          <p style={{
            color: '#919191', fontSize: 18, fontWeight: 400,
            maxWidth: 440, margin: '0 auto', lineHeight: 1.7, fontFamily: PP,
          }}>
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
          <Link
            href="/contact"
            style={{
              display: 'inline-block', padding: '20px 56px',
              fontSize: 16, fontWeight: 900, letterSpacing: '0.05em',
              textDecoration: 'none', fontFamily: PP,
              background: 'white', color: '#D0274B',
              transition: `background 0.3s ${EASE}, color 0.3s ${EASE}`,
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#292929'; e.currentTarget.style.color = 'white' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'white';   e.currentTarget.style.color = '#D0274B' }}
          >
            Start Your Diagnosis →
          </Link>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 400, marginTop: 24, fontFamily: PP }}>
            We respond within 48 hours.
          </p>
        </div>
      </section>

    </div>
  )
}
