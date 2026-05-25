'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

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
      { threshold: 0.08 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return {
    ref,
    style: {
      opacity:    vis ? 1 : 0,
      transform:  vis ? 'translateY(0)' : 'translateY(24px)',
      transition: `opacity 0.75s ease-out ${delay}s, transform 0.75s ease-out ${delay}s`,
    } as React.CSSProperties,
  }
}

// ─── Founder card ─────────────────────────────────────────────────────────────

function FounderCard({ name, role, bio }: { name: string; role: string; bio: string }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        flex:         '1 1 280px',
        border:       `1px solid ${hov ? '#292929' : '#E5E5E5'}`,
        padding:      'clamp(32px, 4vw, 48px)',
        transition:   'border-color 0.3s',
      }}
    >
      <p style={{
        fontFamily:    PP,
        fontWeight:    400,
        fontSize:      11,
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color:         '#919191',
        marginBottom:  20,
      }}>
        {role}
      </p>
      <h3 style={{
        fontFamily:  PP,
        fontWeight:  900,
        fontSize:    'clamp(26px, 3vw, 34px)',
        color:       '#292929',
        lineHeight:  1.1,
        marginBottom: 20,
        letterSpacing: '-0.01em',
      }}>
        {name}
      </h3>
      <p style={{
        fontFamily:  PP,
        fontWeight:  400,
        fontSize:    16,
        color:       '#585858',
        lineHeight:  1.75,
      }}>
        {bio}
      </p>
    </div>
  )
}

// ─── Value row ────────────────────────────────────────────────────────────────

function ValueItem({ num, title, desc, delay }: { num: string; title: string; desc: string; delay: number }) {
  const r = useReveal(delay)
  return (
    <div ref={r.ref} style={{ ...r.style, display: 'flex', gap: 32, alignItems: 'flex-start' }}>
      <span style={{
        fontFamily:    PP,
        fontWeight:    800,
        fontSize:      12,
        letterSpacing: '0.1em',
        color:         RED,
        minWidth:      32,
        paddingTop:    3,
      }}>
        {num}
      </span>
      <div>
        <h4 style={{
          fontFamily:    PP,
          fontWeight:    900,
          fontSize:      20,
          color:         '#FFFFFF',
          marginBottom:  10,
          letterSpacing: '-0.01em',
        }}>
          {title}
        </h4>
        <p style={{
          fontFamily: PP,
          fontWeight: 400,
          fontSize:   16,
          color:      'rgba(255,255,255,0.55)',
          lineHeight: 1.7,
        }}>
          {desc}
        </p>
      </div>
    </div>
  )
}

// ─── Process step ─────────────────────────────────────────────────────────────

function ProcessStep({ num, verb, label, desc }: { num: string; verb: string; label: string; desc: string }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        flex:      '1 1 180px',
        borderTop: `2px solid ${hov ? RED : '#292929'}`,
        paddingTop: 28,
        transition: 'border-color 0.3s',
      }}
    >
      <p style={{
        fontFamily:    PP,
        fontWeight:    400,
        fontSize:      11,
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color:         '#919191',
        marginBottom:  12,
      }}>
        {num}
      </p>
      <h4 style={{
        fontFamily:    PP,
        fontWeight:    900,
        fontSize:      28,
        color:         hov ? RED : '#292929',
        lineHeight:    1.1,
        letterSpacing: '-0.01em',
        marginBottom:  14,
        transition:    'color 0.3s',
      }}>
        {verb}
        <span style={{ color: '#292929', fontWeight: 400 }}> {label}</span>
      </h4>
      <p style={{
        fontFamily: PP,
        fontWeight: 400,
        fontSize:   14,
        color:      '#585858',
        lineHeight: 1.7,
      }}>
        {desc}
      </p>
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function AboutClient() {
  const rStudio   = useReveal()
  const rStudioR  = useReveal(0.15)
  const rVision   = useReveal()
  const rNumbers  = useReveal()
  const rFounders = useReveal()
  const rProcess  = useReveal()
  const rCTA      = useReveal()

  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>

      {/* ══ SECTION 1 — Hero ══════════════════════════════════════════ */}
      <section style={{
        position:    'relative',
        minHeight:   '100vh',
        display:     'flex',
        alignItems:  'center',
        justifyContent: 'center',
      }}>
        {/* Background */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/about-hero.jpg"
          alt="Thinchronize studio"
          style={{
            position:   'absolute',
            inset:       0,
            width:       '100%',
            height:      '100%',
            objectFit:   'cover',
            objectPosition: 'center',
          }}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = 'none'
          }}
        />
        {/* Overlay */}
        <div style={{
          position:  'absolute',
          inset:      0,
          background: 'linear-gradient(to bottom, rgba(20,20,20,0.55) 0%, rgba(20,20,20,0.82) 100%)',
          backgroundColor: '#1C1C1C',
        }} />

        {/* Content */}
        <div style={{
          position:  'relative',
          textAlign: 'center',
          padding:   'clamp(40px, 6vw, 100px)',
          maxWidth:  860,
        }}>
          <p style={{
            fontFamily:    PP,
            fontWeight:    400,
            fontSize:      11,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color:         'rgba(255,255,255,0.45)',
            marginBottom:  28,
          }}>
            The Studio
          </p>
          <h1 style={{
            fontFamily:    PP,
            fontWeight:    900,
            fontSize:      'clamp(48px, 7vw, 96px)',
            color:         '#FFFFFF',
            lineHeight:    1.0,
            letterSpacing: '-0.02em',
            marginBottom:  28,
          }}>
            Thinchronize
          </h1>
          <p style={{
            fontFamily: PP,
            fontWeight: 400,
            fontSize:   18,
            color:      '#919191',
            lineHeight: 1.6,
            maxWidth:   640,
            margin:     '0 auto',
          }}>
            A strategy-led creative studio based in Lebanon — building brands that know what they stand for.
          </p>
        </div>
      </section>

      {/* ══ SECTION 2 — The Studio ════════════════════════════════════ */}
      <section style={{ background: '#FFFFFF', padding: 'clamp(80px, 10vw, 120px) clamp(24px, 6vw, 80px)' }}>
        <div style={{ display: 'flex', gap: 'clamp(40px, 8vw, 100px)', flexWrap: 'wrap', maxWidth: 1200, margin: '0 auto' }}>

          {/* Left */}
          <div ref={rStudio.ref} style={{ ...rStudio.style, flex: '1 1 280px', maxWidth: 460 }}>
            <p style={{
              fontFamily:    PP,
              fontWeight:    400,
              fontSize:      11,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color:         '#919191',
              marginBottom:  24,
            }}>
              Our Mission
            </p>
            <h2 style={{
              fontFamily:    PP,
              fontWeight:    900,
              fontSize:      'clamp(26px, 3.5vw, 36px)',
              color:         '#292929',
              lineHeight:    1.2,
              letterSpacing: '-0.015em',
            }}>
              We build brands that earn their place in the room.
            </h2>
          </div>

          {/* Right */}
          <div ref={rStudioR.ref} style={{ ...rStudioR.style, flex: '1 1 280px' }}>
            <p style={{
              fontFamily: PP,
              fontWeight: 400,
              fontSize:   18,
              color:      '#585858',
              lineHeight: 1.8,
              marginBottom: 24,
            }}>
              The MENA market is flooded with brands that look the part but say nothing. Thinchronize was built as an answer to that. We partner with founders, marketing leads, and brand teams who are done with generic — and ready for work that means something.
            </p>
            <p style={{
              fontFamily: PP,
              fontWeight: 400,
              fontSize:   18,
              color:      '#585858',
              lineHeight: 1.8,
            }}>
              From positioning strategy to photography, every service we offer traces back to a single question: does this make the brand stronger? If the answer isn't yes, we don't ship it.
            </p>
          </div>
        </div>
      </section>

      {/* ══ SECTION 3 — Vision Statement ════════════════════════════ */}
      <section style={{ background: '#292929', padding: 'clamp(80px, 10vw, 120px) clamp(24px, 6vw, 80px)' }}>
        <div
          ref={rVision.ref}
          style={{
            ...rVision.style,
            textAlign: 'center',
            maxWidth:  820,
            margin:    '0 auto',
          }}
        >
          <p style={{
            fontFamily:    PP,
            fontWeight:    400,
            fontSize:      11,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color:         RED,
            marginBottom:  32,
          }}>
            Our Vision
          </p>
          <p style={{
            fontFamily:    PP,
            fontWeight:    800,
            fontSize:      'clamp(28px, 4vw, 44px)',
            color:         '#FFFFFF',
            lineHeight:    1.4,
            letterSpacing: '-0.01em',
          }}>
            &ldquo;A Lebanon where every serious brand has the tools, strategy, and craft to compete — not just locally, but on any stage that matters.&rdquo;
          </p>
        </div>
      </section>

      {/* ══ SECTION 4 — The Numbers ══════════════════════════════════ */}
      <section style={{ background: '#FFFFFF', padding: 'clamp(80px, 10vw, 120px) clamp(24px, 6vw, 80px)' }}>
        <div
          ref={rNumbers.ref}
          style={{
            ...rNumbers.style,
            display:       'flex',
            justifyContent: 'center',
            flexWrap:      'wrap',
            maxWidth:      900,
            margin:        '0 auto',
          }}
        >
          {[
            { stat: '10+',  label: 'Years in practice',      sub: 'Strategy + craft since 2014' },
            { stat: '150+', label: 'Brands worked with',     sub: 'Across every sector in Lebanon' },
            { stat: '20+',  label: 'Industries represented', sub: 'F&B, retail, real estate, finance & more' },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                flex:       '1 1 220px',
                textAlign:  'center',
                padding:    'clamp(32px, 4vw, 48px) 24px',
                borderRight: i < 2 ? '1px solid #E8E8E8' : 'none',
              }}
            >
              <p style={{
                fontFamily:    PP,
                fontWeight:    900,
                fontSize:      'clamp(52px, 6vw, 72px)',
                color:         '#292929',
                lineHeight:    1.0,
                letterSpacing: '-0.02em',
                marginBottom:  12,
              }}>
                {item.stat}
              </p>
              <p style={{
                fontFamily:    PP,
                fontWeight:    800,
                fontSize:      14,
                color:         '#292929',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                marginBottom:  8,
              }}>
                {item.label}
              </p>
              <p style={{
                fontFamily: PP,
                fontWeight: 400,
                fontSize:   13,
                color:      '#919191',
              }}>
                {item.sub}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ SECTION 5 — Founders ═════════════════════════════════════ */}
      <section style={{ background: '#F7F7F7', padding: 'clamp(80px, 10vw, 120px) clamp(24px, 6vw, 80px)' }}>
        <div ref={rFounders.ref} style={{ ...rFounders.style, maxWidth: 1100, margin: '0 auto' }}>
          <p style={{
            fontFamily:    PP,
            fontWeight:    400,
            fontSize:      11,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color:         '#919191',
            marginBottom:  48,
          }}>
            The Founders
          </p>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            <FounderCard
              name="Anthony Lahoud"
              role="Vision & Growth"
              bio="Anthony leads strategy, positioning, and client relationships. He built Thinchronize on the belief that Lebanese brands deserve sharper thinking — and that the gap between a local brand and a global-ready one is almost always a strategy problem, not a design problem."
            />
            <FounderCard
              name="Wassim Halabi"
              role="Craft & Production"
              bio="Wassim leads creative direction, production, and quality control. Every asset that leaves Thinchronize passes through his eye. His obsession with craft is what makes the difference between work that looks good in a deck and work that holds up in the real world."
            />
          </div>
        </div>
      </section>

      {/* ══ SECTION 6 — Values ═══════════════════════════════════════ */}
      <section style={{ background: '#292929', padding: 'clamp(80px, 10vw, 120px) clamp(24px, 6vw, 80px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={{
            fontFamily:    PP,
            fontWeight:    400,
            fontSize:      11,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color:         RED,
            marginBottom:  56,
          }}>
            What We Stand For
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '48px 80px' }}>
            <ValueItem
              num="01"
              title="Strategy before aesthetics"
              desc="Looks without logic is just noise. We start with why, then decide what it should look like."
              delay={0}
            />
            <ValueItem
              num="02"
              title="Honesty over comfort"
              desc="We'll tell you when a brief is wrong or a direction won't hold. Comfortable clients don't get great brands."
              delay={0.1}
            />
            <ValueItem
              num="03"
              title="Craft that earns its keep"
              desc="Every visual, every word, every detail has to pull its weight. Decoration that doesn't communicate gets cut."
              delay={0.2}
            />
            <ValueItem
              num="04"
              title="Local pride, global standard"
              desc="Made in Lebanon means something to us. We hold our work to the same bar as the studios we admire anywhere in the world."
              delay={0.05}
            />
            <ValueItem
              num="05"
              title="Brands built to last"
              desc="Trends age. We build identity systems flexible enough to grow and consistent enough to compound over time."
              delay={0.15}
            />
          </div>
        </div>
      </section>

      {/* ══ SECTION 7 — The Process ══════════════════════════════════ */}
      <section style={{ background: '#FFFFFF', padding: 'clamp(80px, 10vw, 120px) clamp(24px, 6vw, 80px)' }}>
        <div ref={rProcess.ref} style={{ ...rProcess.style, maxWidth: 1100, margin: '0 auto' }}>
          <p style={{
            fontFamily:    PP,
            fontWeight:    400,
            fontSize:      11,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color:         '#919191',
            marginBottom:  56,
          }}>
            How We Work
          </p>
          <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
            <ProcessStep
              num="01"
              verb="Detect"
              label="the gap"
              desc="We audit where the brand stands — positioning, visual identity, messaging — and map the distance between where you are and where you need to be."
            />
            <ProcessStep
              num="02"
              verb="Define"
              label="the direction"
              desc="Strategy, voice, and visual principles locked before a single asset is produced. This is the work most studios skip. We don't."
            />
            <ProcessStep
              num="03"
              verb="Design"
              label="the system"
              desc="Identity, collateral, digital — everything built as a system, not a collection of one-offs. Coherent across every touchpoint."
            />
            <ProcessStep
              num="04"
              verb="Deliver"
              label="and protect"
              desc="Handoff includes guidelines, asset libraries, and — for clients who stay — ongoing Brand Guardianship to keep standards high."
            />
          </div>
        </div>
      </section>

      {/* ══ SECTION 8 — CTA ══════════════════════════════════════════ */}
      <section style={{ background: '#292929', padding: 'clamp(80px, 10vw, 120px) clamp(24px, 6vw, 80px)' }}>
        <div
          ref={rCTA.ref}
          style={{
            ...rCTA.style,
            textAlign: 'center',
            maxWidth:  680,
            margin:    '0 auto',
          }}
        >
          <p style={{
            fontFamily:    PP,
            fontWeight:    400,
            fontSize:      11,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color:         'rgba(255,255,255,0.4)',
            marginBottom:  28,
          }}>
            Ready to work?
          </p>
          <h2 style={{
            fontFamily:    PP,
            fontWeight:    900,
            fontSize:      'clamp(32px, 5vw, 56px)',
            color:         '#FFFFFF',
            lineHeight:    1.1,
            letterSpacing: '-0.02em',
            marginBottom:  40,
          }}>
            Let&rsquo;s build something that matters.
          </h2>
          <CTAButton />
        </div>
      </section>

      <style>{`
        @media (max-width: 640px) {
          .numbers-grid > div { border-right: none !important; border-bottom: 1px solid #E8E8E8; }
          .numbers-grid > div:last-child { border-bottom: none; }
        }
      `}</style>
    </div>
  )
}

// ─── CTA Button with hover ────────────────────────────────────────────────────

function CTAButton() {
  const [hov, setHov] = useState(false)
  return (
    <Link
      href="/contact"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display:       'inline-block',
        fontFamily:    PP,
        fontWeight:    800,
        fontSize:      13,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        textDecoration: 'none',
        color:         '#FFFFFF',
        background:    hov ? '#b8223f' : RED,
        padding:       '16px 36px',
        borderRadius:  4,
        transition:    'background 0.25s',
      }}
    >
      Send us a Message →
    </Link>
  )
}
