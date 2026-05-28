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
// TWO layers:
//   Layer 1 (rotating <g>, CW 18s): outer ring + 4 dots ONLY
//   Layer 2 (static): 4 text labels at fixed compass positions — always readable
// Inner ring orbits CCW 30s via CSS. Centre "4D" is always static.
// Dot: active=#D0274B, inactive=#444444. Label: active=#D0274B, inactive=#666666.
function SVGCircle({ activePhase }: { activePhase: number }) {
  const dot   = (i: number) => activePhase === i ? '#D0274B' : '#444444'
  const lbl   = (i: number) => activePhase === i ? '#D0274B' : '#666666'

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
        fill="none" stroke="#999999" strokeWidth={0.5} opacity={0.18}
        style={{ transformOrigin: '250px 250px', animation: 'orbit-reverse 30s linear infinite' }}
      />

      {/* ── Layer 1 (rotating): outer ring + 4 dots ONLY — CW 18s ── */}
      <g style={{ transformOrigin: '250px 250px', animation: 'orbit 18s linear infinite' }}>
        <circle cx="250" cy="250" r="200" fill="none" stroke="#D0274B" strokeWidth={1} opacity={0.25} />
        <circle cx="250" cy="50"  r="6" fill={dot(0)} />
        <circle cx="450" cy="250" r="6" fill={dot(1)} />
        <circle cx="250" cy="450" r="6" fill={dot(2)} />
        <circle cx="50"  cy="250" r="6" fill={dot(3)} />
      </g>

      {/* ── Layer 2 (static): labels at fixed compass positions — never rotate ── */}
      <text x="250" y="30"  textAnchor="middle" fill={lbl(0)} fontSize={11} letterSpacing={2} fontFamily={PP}>DETECT</text>
      <text x="490" y="258" textAnchor="start"  fill={lbl(1)} fontSize={11} letterSpacing={2} fontFamily={PP}>DEFINE</text>
      <text x="250" y="490" textAnchor="middle" fill={lbl(2)} fontSize={11} letterSpacing={2} fontFamily={PP}>DESIGN</text>
      <text x="10"  y="258" textAnchor="end"    fill={lbl(3)} fontSize={11} letterSpacing={2} fontFamily={PP}>DELIVER</text>

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
  // circleIntroRef: circle-intro section — circle first appears here (centered)
  // sectionRef:     phases section — scroll trigger for circle to move right
  // circleRef:      the circle container — styles set directly, no re-render
  // phaseEls:       the 4 phase content divs — IO targets
  const circleIntroRef = useRef<HTMLElement>(null)
  const sectionRef     = useRef<HTMLElement>(null)
  const circleRef      = useRef<HTMLDivElement>(null)
  const phaseEls       = useRef<(HTMLDivElement | null)[]>([null, null, null, null])

  // ── Reveal hooks for non-phase sections ───────────────────────────────────
  const rWhyLeft       = useReveal(0)
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
  // Circle is ALWAYS position:fixed — one element, transform: translate(-50%,-50%).
  //
  // Visibility: binary snap (no fade-in animation):
  //   • opacity=0 before circle-intro section enters viewport
  //   • opacity=1 the moment it's visible — full size, no reveal transition
  //   • opacity=0 after phases section passes the viewport
  //
  // Size + position lerp driven by phases section entry:
  //   progress = clamp((scrollY - phasesOffsetTop) / 400, 0, 1)
  //   progress=0 → centered, width=min(80vh,80vw)   (big, commanding)
  //   progress=1 → left=75%vw, width=min(45vw,500px) (fills right half)
  useEffect(() => {
    const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi)
    const lerp  = (a: number, b: number, t: number)   => a + (b - a) * t

    const drive = () => {
      if (!sectionRef.current || !circleRef.current) return
      const el = circleRef.current
      const vw = window.innerWidth
      const vh = window.innerHeight

      // Suppress on mobile
      if (vw < 768) { el.style.opacity = '0'; return }

      const phasesBot = sectionRef.current.getBoundingClientRect().bottom

      // Hide while the hero is still on screen (hero = height 100vh, so
      // scrollY < innerHeight means its content is still in the viewport).
      // Hide again once phases have fully scrolled past.
      // Using scrollY avoids sub-pixel getBoundingClientRect rounding issues.
      if (window.scrollY < window.innerHeight || phasesBot < 0) { el.style.opacity = '0'; return }

      // Lerp starts the instant circle-intro begins (right after hero ends).
      // Over 400px of scroll the circle moves from centered+big → right+small,
      // so it is already in phases position BEFORE the first phase arrives.
      const introStart = window.innerHeight
      const progress   = clamp((window.scrollY - introStart) / 400, 0, 1)

      // Intro: big and commanding. Phases: fills right half.
      const wIntro  = Math.min(0.80 * vh, 0.80 * vw)
      const wPhases = Math.min(0.45 * vw, 500)
      const w       = lerp(wIntro, wPhases, progress)

      // Center X: viewport center (intro) → 75% of viewport (phases)
      const cx = lerp(0.5 * vw, 0.75 * vw, progress)

      el.style.position  = 'fixed'
      el.style.top       = '50%'
      el.style.left      = `${cx}px`
      el.style.right     = ''
      el.style.transform = 'translate(-50%, -50%)'
      el.style.width     = `${w}px`
      el.style.height    = `${w}px`
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

      {/* ── Single fixed circle — always position:fixed, scroll-driven lerp ──
          Starts centered at 480px (progress=0), moves right and shrinks to
          360px at right:60px (progress=1). One DOM element, no duplication.  */}
      <div
        id="method-circle"
        ref={circleRef}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80vmin',
          height: '80vmin',
          zIndex: 10,
          pointerEvents: 'none',
          opacity: 0,               /* hidden until scroll handler fires */
        }}
      >
        <SVGCircle activePhase={activePhase} />
      </div>

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
            fontSize: 13, color: '#D0274B', maxWidth: 580, margin: '0 auto 20px',
            lineHeight: 1.6, fontWeight: 400, fontFamily: PP,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            animation: mounted ? `methodFadeUp 0.6s ${EASE} 0.9s both` : 'none',
          }}>
            Detect. Define. Design. Deliver. In that order. Always.
          </p>

          <p style={{
            fontSize: 22, color: '#919191', maxWidth: 580, margin: '0 auto',
            lineHeight: 1.7, fontWeight: 400, fontFamily: PP,
            animation: mounted ? `methodFadeUp 0.6s ${EASE} 1.1s both` : 'none',
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

      {/* ══ 2 — CIRCLE INTRO ════════════════════════════════════════════════════
          The circle first appears HERE, centered on screen. The circle itself
          is position:fixed so it overlays this 100vh section naturally.
          The tagline sits at the bottom of the section below the circle.
      ══════════════════════════════════════════════════════════════════════════ */}
      <section
        ref={circleIntroRef}
        style={{
          height: '100vh', background: '#000',
          position: 'relative',
        }}
      />

      {/* ══ 3 — 4D PHASES — SCROLL-DRIVEN SINGLE CIRCLE ════════════════════════
          ONE circle. Starts centered (large, 500px). As user scrolls into the
          section it moves right and shrinks (scroll-driven, direct DOM style).
          At progress=1 it stays fixed on the right for all 4 phases.

          Left side (max-width 50%): 4 stacked phase sections, min-height 100vh.
          Right side: black space + the floating/fixed circle (position: fixed).

          No background text. No duplicate circles. No phase numbers as
          standalone elements — only "01 / 04" label above phase name.
      ══════════════════════════════════════════════════════════════════════════ */}
      <section ref={sectionRef} style={{ position: 'relative', background: '#FFFFFF' }}>

        {/* Phase content — left side only, inline width 50% */}
        <div className="method-phases-left" style={{ width: '50%', marginLeft: 0, position: 'relative', zIndex: 20 }}>
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
                  color: '#999999', fontSize: 12, letterSpacing: '0.2em',
                  textTransform: 'uppercase', fontWeight: 400,
                  marginBottom: 24, fontFamily: PP,
                }}>
                  {phase.num} / 04
                </p>

                {/* Phase name — red when active, dark otherwise */}
                <h2 style={{
                  fontSize: 'clamp(56px, 7vw, 96px)',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  lineHeight: 0.95,
                  color: activePhase === i ? '#D0274B' : '#292929',
                  transition: `color 0.4s ${EASE}`,
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
                  fontSize: 18, color: '#555555', lineHeight: 1.8,
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
