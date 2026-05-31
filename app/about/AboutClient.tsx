'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import PageHero from '@/components/ui/PageHero'

function ParallaxImage({ src }: { src: string }) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imgRef     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handle = () => {
      if (!sectionRef.current || !imgRef.current) return
      const rect     = sectionRef.current.getBoundingClientRect()
      const progress = -rect.top / (rect.height + window.innerHeight)
      imgRef.current.style.transform = `translateY(${progress * 18}%)`
    }
    window.addEventListener('scroll', handle, { passive: true })
    handle()
    return () => window.removeEventListener('scroll', handle)
  }, [])

  return (
    <div
      ref={sectionRef}
      style={{ position: 'relative', height: '70vh', overflow: 'hidden' }}
    >
      <div
        ref={imgRef}
        style={{
          position:   'absolute',
          inset:      '-15% 0',
          willChange: 'transform',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt="Thinchronize studio"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>
    </div>
  )
}

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
        textTransform: 'uppercase',
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
          fontWeight:    400,
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
        textTransform: 'uppercase',
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

      {/* ══ HERO ══════════════════════════════════════════════════════ */}
      <PageHero
        title="ABOUT"
        lines={[
          'A strategy-led creative studio based in Lebanon —',
          'building brands that know exactly what they stand for.',
        ]}
        bottomLabel="Learn more about us"
        bottomHref="#about-studio"
      />

      {/* ══ PARALLAX IMAGE ════════════════════════════════════════════ */}
      <ParallaxImage src="/images/about-signage.jpg" />

      {/* ══ OUR STORY — Motto-exact layout ════════════════════════════
          Left col  (~40%): "About Thinchronize" label
          Right col (~60%): headline · body · CTA
      ════════════════════════════════════════════════════════════════ */}
      <section style={{
        background: '#f5f4f0',
        padding:    'clamp(80px, 10vw, 130px) 5vw',
      }}>
        <div style={{
          display:             'grid',
          gridTemplateColumns: '40% 60%',
          gap:                 0,
          maxWidth:            1400,
          margin:              '0 auto',
        }}>

          {/* Left — label */}
          <div style={{ paddingTop: 8 }}>
            <span style={{
              fontFamily:    PP,
              fontWeight:    400,
              fontSize:      12,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color:         'rgba(0,0,0,0.4)',
            }}>
              About Thinchronize
            </span>
          </div>

          {/* Right — story */}
          <div>
            <h2 style={{
              fontFamily:    PP,
              fontWeight:    900,
              fontSize:      'clamp(28px, 3.2vw, 52px)',
              color:         '#111',
              lineHeight:    1.15,
              letterSpacing: '-0.02em',
              margin:        '0 0 clamp(28px, 3.5vw, 48px)',
            }}>
              Thinchronize started because we kept seeing the same problem.
            </h2>

            <p style={{
              fontFamily:  PP,
              fontWeight:  400,
              fontSize:    'clamp(16px, 1.3vw, 20px)',
              color:       'rgba(0,0,0,0.55)',
              lineHeight:  1.8,
              margin:      '0 0 clamp(24px, 3vw, 40px)',
              maxWidth:    640,
            }}>
              Anthony and Wassim built this studio after years of watching Lebanese brands underperform their potential — not because of lack of talent or vision, but because of a missing layer: strategy. Together they combine brand thinking with craft, producing work that holds up in the market, compounds over time, and gives every brand something true to stand on.
            </p>

            <p style={{
              fontFamily:  PP,
              fontWeight:  400,
              fontSize:    'clamp(16px, 1.3vw, 20px)',
              color:       'rgba(0,0,0,0.55)',
              lineHeight:  1.8,
              margin:      '0 0 clamp(48px, 6vw, 80px)',
              maxWidth:    640,
            }}>
              The name says it all: Thinchronize — strategic thinking, synchronised. Every project begins with a diagnosis, because a brand you understand is a brand you can build.
            </p>

            <Link
              href="/contact"
              style={{
                fontFamily:          PP,
                fontWeight:          400,
                fontSize:            16,
                color:               '#111',
                textDecoration:      'underline',
                textUnderlineOffset: '6px',
                textDecorationColor: 'rgba(0,0,0,0.35)',
              }}
            >
              Work with us →
            </Link>
          </div>

        </div>
      </section>

      {/* ══ MEET THE FOUNDERS ══════════════════════════════════════════ */}
      <section style={{
        background:  '#f5f4f0',
        padding:     '0 5vw clamp(80px, 10vw, 130px)',
        overflow:    'hidden',
      }}>

        {/* Big headline — full bleed, original size −10% */}
        <h2 style={{
          fontFamily:    PP,
          fontWeight:    900,
          fontSize:      'clamp(65px, 11.7vw, 180px)',
          color:         '#111',
          textTransform: 'uppercase',
          letterSpacing: '-3px',
          lineHeight:    0.88,
          margin:        '0 0 clamp(56px, 7vw, 110px)',
        }}>
          Meet the<br /><span style={{ color: RED }}>Founders</span>
        </h2>

        {/* 40 / 60 grid — label left, story right */}
        <div style={{
          display:             'grid',
          gridTemplateColumns: '40% 60%',
          gap:                 0,
          maxWidth:            1400,
          margin:              '0 auto',
        }}>

          {/* Left — label */}
          <div style={{ paddingTop: 6 }}>
            <span style={{
              fontFamily:    PP,
              fontWeight:    400,
              fontSize:      12,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color:         'rgba(0,0,0,0.4)',
            }}>
              Forged in Lebanon
            </span>
          </div>

          {/* Right — subheadline + bios */}
          <div>
            <h3 style={{
              fontFamily:    PP,
              fontWeight:    900,
              fontSize:      'clamp(28px, 3.2vw, 52px)',
              color:         '#111',
              lineHeight:    1.15,
              letterSpacing: '-0.02em',
              margin:        '0 0 clamp(28px, 3.5vw, 48px)',
            }}>
              Two strategists.<br />One obsession.<br />Built from Beirut.
            </h3>

            <p style={{
              fontFamily: PP,
              fontWeight: 400,
              fontSize:   'clamp(16px, 1.3vw, 20px)',
              color:      'rgba(0,0,0,0.55)',
              lineHeight: 1.8,
              margin:     0,
              maxWidth:   640,
            }}>
              <strong style={{ color: '#111', fontWeight: 800 }}>Anthony Lahoud</strong> leads strategy, positioning, and client relationships. He built Thinchronize on the belief that Lebanese brands deserve sharper thinking — and that the gap between a local brand and a global-ready one is almost always a strategy problem, not a design problem. <strong style={{ color: '#111', fontWeight: 800 }}>Wassim Halabi</strong> leads creative direction, production, and quality control. Every asset that leaves Thinchronize passes through his eye — his obsession with craft is what makes the difference between work that looks good in a deck and work that holds up in the real world.
            </p>
          </div>

        </div>
      </section>

      {/* ══ FOUNDERS PORTRAITS ════════════════════════════════════════ */}
      <section style={{
        background: '#f5f4f0',
        padding:    '0 5vw clamp(80px, 10vw, 120px)',
      }}>
        <div style={{
          display:             'grid',
          gridTemplateColumns: '1fr 1fr',
          gap:                 10,
        }}>
          {[
            { name: 'Anthony Lahoud',  role: 'Co-founder & Strategy',  img: '/images/work/whatsub/Whatsub-Sign.jpg'    },
            { name: 'Wassim Halabi',   role: 'Co-founder & Creative',  img: '/images/work/cafe-bdooz/Cover-Bdooz.png'  },
          ].map(f => (
            <div key={f.name}>
              {/* Photo */}
              <div style={{
                position:   'relative',
                paddingTop: '100%',
                overflow:   'hidden',
                marginBottom: 20,
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={f.img}
                  alt={f.name}
                  style={{
                    position:   'absolute',
                    inset:      0,
                    width:      '100%',
                    height:     '100%',
                    objectFit:  'cover',
                    filter:     'grayscale(100%)',
                    display:    'block',
                  }}
                  onError={e => {
                    (e.currentTarget as HTMLImageElement).style.background = '#d0ceca'
                    ;(e.currentTarget as HTMLImageElement).style.visibility = 'hidden'
                  }}
                />
              </div>
              {/* Name + role */}
              <p style={{
                fontFamily: PP,
                fontWeight: 400,
                fontSize:   16,
                color:      '#111',
                lineHeight: 1.5,
                margin:     0,
              }}>
                {f.name}
              </p>
              <p style={{
                fontFamily: PP,
                fontWeight: 400,
                fontSize:   16,
                color:      'rgba(0,0,0,0.45)',
                lineHeight: 1.5,
                margin:     0,
              }}>
                {f.role}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ WHAT WE STAND FOR — Motto numbered grid ═══════════════════ */}
      <section style={{
        background: '#f5f4f0',
        padding:    'clamp(80px, 10vw, 130px) 5vw',
      }}>
        <div style={{
          display:             'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap:                 'clamp(48px, 6vw, 80px) clamp(32px, 4vw, 60px)',
        }}>
          {[
            { num: '01.', title: 'Strategy before aesthetics',  desc: 'Looks without logic is just noise. We start with why, then decide what it should look like.' },
            { num: '02.', title: 'Honesty over comfort',        desc: 'We\'ll tell you when a brief is wrong or a direction won\'t hold. Comfortable clients don\'t get great brands.' },
            { num: '03.', title: 'Craft that earns its keep',   desc: 'Every visual, every word, every detail has to pull its weight. Decoration that doesn\'t communicate gets cut.' },
            { num: '04.', title: 'Local pride, global standard',desc: 'Made in Lebanon means something to us. We hold our work to the same bar as the studios we admire anywhere in the world.' },
            { num: '05.', title: 'Brands built to last',        desc: 'Trends age. We build identity systems flexible enough to grow and consistent enough to compound over time.' },
            { num: '06.', title: 'Diagnosis before design',     desc: 'We never pick up a pen before we understand the problem. A brand you understand is a brand you can build.' },
          ].map(item => (
            <div key={item.num}>
              <p style={{
                fontFamily:    PP,
                fontWeight:    900,
                fontSize:      'clamp(56px, 7vw, 100px)',
                color:         '#111',
                lineHeight:    1,
                letterSpacing: '-2px',
                margin:        '0 0 clamp(20px, 2.5vw, 32px)',
              }}>
                {item.num}
              </p>
              <p style={{
                fontFamily:  PP,
                fontWeight:  400,
                fontSize:    'clamp(17px, 1.4vw, 22px)',
                color:       '#111',
                lineHeight:  1.3,
                margin:      '0 0 16px',
              }}>
                {item.title}
              </p>
              <p style={{
                fontFamily: PP,
                fontWeight: 400,
                fontSize:   'clamp(14px, 1.1vw, 17px)',
                color:      'rgba(0,0,0,0.5)',
                lineHeight: 1.7,
                margin:     0,
              }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ SECTION 2 — The Studio ════════════════════════════════════ */}
      <section id="about-studio" style={{ background: '#FFFFFF', padding: 'clamp(80px, 10vw, 120px) clamp(24px, 6vw, 80px)' }}>
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
              textTransform: 'uppercase',
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
              The MENA market is flooded with brands that look the part but say nothing. Thinchronize was built as an answer to that. We partner with founders, marketing leads, and brand teams who are done with generic, ready for work that means something.
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
      <section style={{ background: '#000000', padding: 'clamp(80px, 10vw, 120px) clamp(24px, 6vw, 80px)' }}>
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
            textTransform: 'uppercase',
          }}>
            &ldquo;A Lebanon where every serious brand has the tools, strategy, and craft to compete, not just locally, but on any stage that matters.&rdquo;
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
              bio="Anthony leads strategy, positioning, and client relationships. He built Thinchronize on the belief that Lebanese brands deserve sharper thinking, and that the gap between a local brand and a global-ready one is almost always a strategy problem, not a design problem."
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
      <section style={{ background: '#000000', padding: 'clamp(80px, 10vw, 120px) clamp(24px, 6vw, 80px)' }}>
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

          {/* "LIVE FROM BEIRUT!" label */}
          <div style={{ textAlign: 'center', padding: '64px 0 0' }}>
            <span style={{
              fontFamily:    PP,
              fontWeight:    900,
              fontSize:      11,
              color:         '#D0274B',
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
            }}>
              ✦ LIVE FROM BEIRUT! ✦
            </span>
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
              desc="We audit where the brand stands: positioning, visual identity, messaging. We map the distance between where you are and where you need to be."
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
              desc="Identity, collateral, digital: everything built as a system, not a collection of one-offs. Coherent across every touchpoint."
            />
            <ProcessStep
              num="04"
              verb="Deliver"
              label="and protect"
              desc="Handoff includes guidelines, asset libraries, and ongoing Brand Guardianship to keep standards high."
            />
          </div>
        </div>
      </section>

      {/* ══ SECTION 8 — CTA ══════════════════════════════════════════ */}
      <section style={{ background: '#000000', padding: 'clamp(80px, 10vw, 120px) clamp(24px, 6vw, 80px)' }}>
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
            textTransform: 'uppercase',
            marginBottom:  40,
          }}>
            Let&rsquo;s build something that matters.
          </h2>
          <CTAButton />
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 640px) {
          .numbers-grid > div { border-right: none !important; border-bottom: 1px solid #E8E8E8; }
          .numbers-grid > div:last-child { border-bottom: none; }
        }
      ` }} />
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
