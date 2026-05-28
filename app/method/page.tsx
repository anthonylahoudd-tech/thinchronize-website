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
    num: '01', keyword: 'DETECT',
    desc: 'We begin by listening — to the market, the audience, and the brand itself. We uncover latent tensions, map the competitive landscape, and find the space where your brand can live with conviction.',
  },
  {
    num: '02', keyword: 'DEFINE',
    desc: 'Strategy is the backbone of everything we build. We articulate who you are, what you stand for, and how you should speak — shaping a brand platform that acts as the compass for every creative decision.',
  },
  {
    num: '03', keyword: 'DESIGN',
    desc: 'Form follows meaning. Only once the strategy is settled do we build the visual system: typography, colour, communication architecture. Everything coherent, nothing arbitrary.',
  },
  {
    num: '04', keyword: 'DELIVER',
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

// ─── SVGCircle ────────────────────────────────────────────────────────────────
// ONE circle. Outer ring + 4 dots + labels ALL orbit together as a <g> group
// (CSS @keyframes orbit, CW 18s). transform-origin: 250px 250px = SVG centre.
// Inner ring orbits CCW 30s via CSS (orbit-reverse). Centre shows "4D", fixed.
// Active dot/label → #D0274B; others → #444444.
function SVGCircle({ activePhase }: { activePhase: number }) {
  const c = (i: number) => activePhase === i ? '#D0274B' : '#444444'

  return (
    <svg
      viewBox="0 0 500 500"
      width="100%"
      height="100%"
      style={{ display: 'block', overflow: 'visible' }}
      aria-hidden="true"
    >
      {/* ── Inner ring CCW via CSS ── */}
      <circle
        cx="250" cy="250" r="140"
        fill="none" stroke="#ffffff" strokeWidth={0.5} opacity={0.08}
        style={{ transformOrigin: '250px 250px', animation: 'orbit-reverse 30s linear infinite' }}
      />

      {/* ── Rotating group: outer ring + 4 dots + labels — CW 18s ── */}
      <g style={{ transformOrigin: '250px 250px', animation: 'orbit 18s linear infinite' }}>
        <circle cx="250" cy="250" r="200" fill="none" stroke="#D0274B" strokeWidth={1} opacity={0.25} />

        {/* DETECT — top */}
        <circle cx="250" cy="50" r="6" fill={c(0)} />
        <text x="250" y="25" textAnchor="middle" fill={c(0)} fontSize={11} fontFamily={PP}>DETECT</text>

        {/* DEFINE — right */}
        <circle cx="450" cy="250" r="6" fill={c(1)} />
        <text x="490" y="255" textAnchor="middle" fill={c(1)} fontSize={11} fontFamily={PP}>DEFINE</text>

        {/* DESIGN — bottom */}
        <circle cx="250" cy="450" r="6" fill={c(2)} />
        <text x="250" y="490" textAnchor="middle" fill={c(2)} fontSize={11} fontFamily={PP}>DESIGN</text>

        {/* DELIVER — left */}
        <circle cx="50" cy="250" r="6" fill={c(3)} />
        <text x="10" y="255" textAnchor="middle" fill={c(3)} fontSize={11} fontFamily={PP}>DELIVER</text>
      </g>

      {/* ── Centre: fixed ── */}
      <circle cx="250" cy="250" r="55" fill="#D0274B" />
      <text
        x="250" y="250"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="white" fontSize={13} fontFamily={PP} fontWeight={900}
      >
        4D
      </text>
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

      <circle cx={cx} cy={cy} r={220} fill="none" stroke={RED} strokeWidth={1} opacity={0.3} />
      <circle cx={cx + 220} cy={cy} r={4} fill={RED} opacity={0.6}>
        <animateTransform attributeName="transform" type="rotate"
          from={`0 ${cx} ${cy}`} to={`360 ${cx} ${cy}`} dur="30s" repeatCount="indefinite" />
      </circle>

      <circle cx={cx} cy={cy} r={r2} fill="none" stroke="white" strokeWidth={0.5} opacity={0.1} />
      <circle cx={cx + r2} cy={cy} r={3} fill="white" opacity={0.25}>
        <animateTransform attributeName="transform" type="rotate"
          from={`0 ${cx} ${cy}`} to={`-360 ${cx} ${cy}`} dur="45s" repeatCount="indefinite" />
      </circle>

      <circle cx={cx} cy={cy} r={70} fill={RED} />
      <text x={cx} y={cy - 8}  textAnchor="middle" fill="white" fontSize={15} fontFamily={PP} fontWeight={900}>Brand</text>
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

  // ── Hydration guard ───────────────────────────────────────────────────────
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  // ── Hero cycling text ──────────────────────────────────────────────────────
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [leaving,   setLeaving]   = useState(false)
  const [cycled,    setCycled]    = useState(false)

  // ── Hero scroll ───────────────────────────────────────────────────────────
  const [showScroll, setShowScroll] = useState(true)
  const [heroOffset, setHeroOffset] = useState(0)

  // ── Phases state ──────────────────────────────────────────────────────────
  // activePhase: which phase dot is lit (driven by IO)
  // revealedPhases: Set of phase indices whose left-side content has faded in
  const [activePhase,    setActivePhase]    = useState(0)
  const [revealedPhases, setRevealedPhases] = useState<Set<number>>(new Set([0]))

  // ── Refs ──────────────────────────────────────────────────────────────────
  // sectionRef: the phases section — used to compute scroll progress
  // circleRef:  the circle container — styles set directly, no re-render
  // phaseEls:   the 4 phase content divs — IO targets
  const sectionRef = useRef<HTMLElement>(null)
  const circleRef  = useRef<HTMLDivElement>(null)
  const phaseEls   = useRef<(HTMLDivElement | null)[]>([null, null, null, null])

  // ── Reveal hooks for non-phase sections ───────────────────────────────────
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

  // ── Phrase cycling ────────────────────────────────────────────────────────
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
    }, 4200)
    timers.push(t1)
    return () => timers.forEach(clearTimeout)
  }, [phraseIdx, mounted])

  // ── Hero scroll: indicator + parallax ─────────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      setShowScroll(window.scrollY < 80)
      setHeroOffset(window.scrollY)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ── Circle scroll driver (direct DOM, no re-renders) ─────────────────────
  // progress = clamp(1 - sectionTop/windowH, 0, 1)
  // 0 → position:relative centered (before section enters viewport)
  // 0→1 → position:fixed right:80px, width shrinks 480→380px
  // after section → back to relative, opacity 0
  useEffect(() => {
    const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi)

    const drive = () => {
      if (!sectionRef.current || !circleRef.current) return

      const el   = circleRef.current
      const vw   = window.innerWidth
      const wh   = window.innerHeight

      // Suppress on mobile
      if (vw < 768) { el.style.opacity = '0'; return }

      const rect       = sectionRef.current.getBoundingClientRect()
      const sectionTop = rect.top
      const sectionBot = rect.bottom
      const progress   = clamp(1 - sectionTop / wh, 0, 1)

      if (progress === 0) {
        // Section below viewport — circle in flow, centered
        el.style.position  = 'relative'
        el.style.right     = ''
        el.style.top       = ''
        el.style.left      = ''
        el.style.transform = ''
        el.style.width     = '480px'
        el.style.margin    = '80px auto'
        el.style.opacity   = '1'
        el.style.transition = 'none'
        return
      }

      if (sectionBot < 0) {
        // Section fully above viewport — circle hidden, back in flow
        el.style.position  = 'relative'
        el.style.right     = ''
        el.style.top       = ''
        el.style.left      = ''
        el.style.transform = ''
        el.style.width     = '480px'
        el.style.margin    = '80px auto'
        el.style.opacity   = '0'
        el.style.transition = 'none'
        return
      }

      // Active — fixed right, width shrinks 480→380px
      el.style.position  = 'fixed'
      el.style.right     = '80px'
      el.style.top       = '50%'
      el.style.transform = 'translateY(-50%)'
      el.style.width     = `${480 - progress * 100}px`
      el.style.left      = ''
      el.style.margin    = ''
      el.style.opacity   = '1'
      el.style.transition = 'none'
    }

    window.addEventListener('scroll', drive, { passive: true })
    window.addEventListener('resize', drive, { passive: true })
    drive()
    return () => {
      window.removeEventListener('scroll', drive)
      window.removeEventListener('resize', drive)
    }
  }, [])

  // ── Phase IO: dot activation + content reveal ─────────────────────────────
  useEffect(() => {
    const observers: IntersectionObserver[] = []
    phaseEls.current.forEach((el, i) => {
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActivePhase(i)
            setRevealedPhases(prev => {
              const next = new Set(prev)
              next.add(i)
              return next
            })
          }
        },
        { threshold: 0.6 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])

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

        <div style={{
          textAlign: 'center',
          padding: '0 clamp(36px, 7.5vw, 120px)',
          maxWidth: 960, width: '100%',
          transform: `translateY(${heroOffset * 0.3}px)`,
          willChange: 'transform',
        }}>
          <div style={{
            display: 'inline-block', background: '#D0274B', color: 'white',
            fontSize: 11, fontWeight: 400, letterSpacing: '0.15em',
            textTransform: 'uppercase', padding: '6px 14px', fontFamily: PP,
            marginBottom: 56,
            animation: mounted ? `methodFadeUp 0.6s ${EASE} 0.5s both` : 'none',
          }}>
            The 4D Method
          </div>

          <div style={{ overflow: 'hidden', marginBottom: 48 }}>
            <h1
              key={phraseIdx}
              style={{
                fontSize: 'clamp(44px, 6.5vw, 80px)', fontWeight: 900, color: 'white',
                lineHeight: 1.1, margin: 0, fontFamily: PP,
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

          <p style={{
            fontSize: 22, color: '#919191', maxWidth: 580, margin: '0 auto',
            lineHeight: 1.7, fontWeight: 400, fontFamily: PP,
            animation: mounted ? `methodFadeUp 0.6s ${EASE} 1s both` : 'none',
          }}>
            A four-phase method built on one belief — we don&apos;t design until we understand.
          </p>
        </div>

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

      {/* ══ 3 — 4D PHASES — SCROLL-DRIVEN SINGLE CIRCLE ════════════════════════
          ONE circle. Starts centered (large, 500px). As user scrolls into the
          section it moves right and shrinks (scroll-driven, direct DOM style).
          At progress=1 it stays fixed on the right for all 4 phases.

          Left side (max-width 50%): 4 stacked phase sections, min-height 100vh.
          Right side: black space + the floating/fixed circle (position: fixed).

          No background text. No duplicate circles. No phase numbers as
          standalone elements — only "01 / 04" label above phase name.
      ══════════════════════════════════════════════════════════════════════════ */}
      <section ref={sectionRef} style={{ position: 'relative', background: '#000' }}>

        {/* Circle — starts position:relative centered in flow.
            Scroll handler switches to position:fixed right when progress > 0. */}
        <div
          id="method-circle"
          ref={circleRef}
          style={{
            position: 'relative',
            width: 480,
            aspectRatio: '1 / 1',
            margin: '80px auto',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        >
          <SVGCircle activePhase={activePhase} />
        </div>

        {/* Phase content — left side only, inline width 50% */}
        <div className="method-phases-left" style={{ width: '50%', marginLeft: 0 }}>
          {PHASES.map((phase, i) => (
            <div
              key={phase.num}
              ref={el => { phaseEls.current[i] = el }}
              style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '80px clamp(40px, 6vw, 80px)',
              }}
            >
              {/* Content fades in when IO fires at threshold 0.5 */}
              <div style={{
                opacity:    revealedPhases.has(i) ? 1 : 0,
                transform:  revealedPhases.has(i) ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.5s ease, transform 0.5s ease',
                maxWidth: 520,
              }}>
                {/* Phase counter: "01 / 04" */}
                <p style={{
                  color: '#919191', fontSize: 12, letterSpacing: '0.2em',
                  textTransform: 'uppercase', fontWeight: 400,
                  marginBottom: 24, fontFamily: PP,
                }}>
                  {phase.num} / 04
                </p>

                {/* Phase name — 96px, white, PP Extended Ultra Bold */}
                <h2 style={{
                  fontSize: 'clamp(56px, 7vw, 96px)',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  lineHeight: 0.95,
                  color: 'white',
                  fontFamily: PP,
                  marginBottom: 36,
                }}>
                  {phase.keyword}
                </h2>

                {/* Divider — each phase its own colour */}
                <div style={{
                  width: 60, height: 2,
                  background: PHASE_COLORS[i],
                  marginBottom: 36,
                }} />

                {/* Description */}
                <p style={{
                  fontSize: 18, color: '#919191', lineHeight: 1.8,
                  fontWeight: 400, fontFamily: PP, maxWidth: 480,
                }}>
                  {phase.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: override inline width to full */}
        <style>{`
          @media (max-width: 768px) {
            .method-phases-left {
              width: 100% !important;
            }
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
                key={i} ref={r.ref}
                style={{ ...r.style, borderLeft: '3px solid #D0274B', paddingLeft: 28, marginBottom: i < 2 ? 64 : 0 }}
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

        <div ref={rClients.ref} style={{ ...rClients.style, overflowX: 'auto', scrollbarWidth: 'none' }}>
          <div style={{ display: 'flex', gap: 2, padding: '0 clamp(36px, 6vw, 80px)', width: 'max-content' }}>
            {CLIENTS.map((c, i) => <ClientCard key={i} {...c} />)}
          </div>
        </div>

        <div style={{ padding: '40px clamp(36px, 6vw, 80px) 0', textAlign: 'right' }}>
          <Link
            href="/portfolio"
            style={{ color: 'white', fontSize: 14, fontWeight: 400, fontFamily: PP, letterSpacing: '0.1em', textDecoration: 'none', transition: `color 0.2s ${EASE}` }}
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
          <p style={{ color: '#919191', fontSize: 18, fontWeight: 400, maxWidth: 440, margin: '0 auto', lineHeight: 1.7, fontFamily: PP }}>
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
