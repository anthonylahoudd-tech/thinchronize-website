'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import PageHero from '@/components/ui/PageHero'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

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
const BANNER_TEXT = 'STRATEGY * IDENTITY * CRAFT * BEIRUT * BRAND * PURPOSE * '

function DoubleBanner() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const row1Ref    = useRef<HTMLDivElement>(null)
  const row2Ref    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handle = () => {
      if (!sectionRef.current) return
      const rect   = sectionRef.current.getBoundingClientRect()
      const center = rect.top + rect.height / 2 - window.innerHeight / 2
      const offset = center * 0.12
      if (row1Ref.current) row1Ref.current.style.transform = `translateX(${offset}px)`
      if (row2Ref.current) row2Ref.current.style.transform = `translateX(${-offset}px)`
    }
    window.addEventListener('scroll', handle, { passive: true })
    handle()
    return () => window.removeEventListener('scroll', handle)
  }, [])

  const spanStyle: React.CSSProperties = {
    fontFamily:    PP,
    fontWeight:    900,
    fontSize:      'clamp(52px, 8vw, 120px)',
    color:         '#111',
    textTransform: 'uppercase',
    letterSpacing: '-3px',
    lineHeight:    0.9,
    whiteSpace:    'nowrap',
  }

  return (
    <div
      ref={sectionRef}
      style={{ background: '#f5f4f0', overflow: 'hidden', padding: 'clamp(8px, 1vw, 14px) 0', display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      {/* Row 1 — scrolls left */}
      <div style={{ overflow: 'hidden' }}>
        <div ref={row1Ref} style={{ willChange: 'transform' }}>
          <div className="page-marquee-track">
            <span style={spanStyle}>{BANNER_TEXT}{BANNER_TEXT}</span>
          </div>
        </div>
      </div>
      {/* Row 2 — scrolls right */}
      <div style={{ overflow: 'hidden' }}>
        <div ref={row2Ref} style={{ willChange: 'transform' }}>
          <div className="page-marquee-track-reverse">
            <span style={spanStyle}>{BANNER_TEXT}{BANNER_TEXT}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function AboutClient() {

  const numbersRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = numbersRef.current
    if (!el) return
    const lines = el.querySelectorAll('.stat-line')
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lines,
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1,
          ease: 'power4.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            once: true,
          },
        }
      )
    }, el)
    return () => ctx.revert()
  }, [])

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
              fontWeight:    400,
              fontSize:      'clamp(28px, 3.2vw, 52px)',
              color:         '#111',
              lineHeight:    1.2,
              letterSpacing: '-0.01em',
              textTransform: 'none',
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
          Meet the<br /><span style={{ color: '#111', fontWeight: 900 }}>Founders</span>
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
              fontWeight:    400,
              fontSize:      'clamp(28px, 3.2vw, 52px)',
              color:         '#111',
              lineHeight:    1.2,
              letterSpacing: '-0.01em',
              textTransform: 'none',
              margin:        '0 0 clamp(28px, 3.5vw, 48px)',
            }}>
              Two strategists. One obsession.<br />Built from Beirut.
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

      {/* ══ DOUBLE PARALLAX BANNER ════════════════════════════════════ */}
      <DoubleBanner />

      {/* ══ WHAT WE STAND FOR — Motto numbered grid ═══════════════════ */}
      <section style={{
        background: '#f5f4f0',
        padding:    'clamp(80px, 10vw, 130px) 5vw',
      }}>

        {/* Small section label */}
        <p style={{
          fontFamily:    PP,
          fontWeight:    400,
          fontSize:      12,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color:         'rgba(0,0,0,0.4)',
          margin:        '0 0 clamp(48px, 6vw, 80px)',
        }}>
          What we stand for
        </p>

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

      {/* ══ NUMBERS + VISION/MISSION — single black section ══════════ */}
      <section
        ref={numbersRef}
        style={{
          background: '#000',
          padding:    'clamp(72px, 9vw, 120px) 5vw',
          overflow:   'hidden',
        }}
      >

        {/* Label */}
        <p style={{
          fontFamily:    PP,
          fontWeight:    400,
          fontSize:      11,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color:         'rgba(255,255,255,0.35)',
          margin:        '0 0 clamp(40px, 5vw, 72px)',
        }}>
          THE NUMBERS
        </p>

        {/* Stacked stats — clip-reveal on scroll */}
        {[
          { num: '10+',   label: 'YEARS IN BRAND', align: 'left'  as const },
          { num: '150+',  label: 'BRANDS BUILT',   align: 'right' as const },
          { num: '20+',   label: 'INDUSTRIES',     align: 'left'  as const },
          { num: '100%',  label: 'STRATEGY-LED',   align: 'right' as const },
        ].map(item => (
          <div
            key={item.num}
            style={{ overflow: 'hidden', lineHeight: 1.0 }}
          >
            <p
              className="stat-line"
              style={{
                fontFamily:    PP,
                fontWeight:    800,
                fontSize:      'clamp(64px, 11vw, 160px)',
                textTransform: 'uppercase',
                letterSpacing: '-2px',
                lineHeight:    0.95,
                margin:        0,
                textAlign:     item.align,
              }}
            >
              <span style={{ color: '#fff' }}>{item.num} </span>
              <span style={{ color: 'rgba(255,255,255,0.25)' }}>{item.label}</span>
            </p>
          </div>
        ))}

        {/* Vision & Mission */}
        <div style={{
          display:             'grid',
          gridTemplateColumns: '1fr 1fr',
          gap:                 'clamp(40px, 6vw, 100px)',
          marginTop:           'clamp(72px, 9vw, 120px)',
          paddingTop:          'clamp(48px, 6vw, 80px)',
          borderTop:           '1px solid rgba(255,255,255,0.1)',
        }}>
          {[
            { label: 'Vision',  text: 'A Lebanon where every serious brand has the tools, strategy, and craft to compete — not just locally, but on any stage that matters.' },
            { label: 'Mission', text: 'To build brands that know exactly what they stand for, and give them everything they need to prove it — in the market, over time, and under pressure.' },
          ].map(item => (
            <div key={item.label}>
              <p style={{
                fontFamily:    PP,
                fontWeight:    400,
                fontSize:      11,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color:         'rgba(255,255,255,0.35)',
                margin:        '0 0 20px',
              }}>
                {item.label}
              </p>
              <p style={{
                fontFamily: PP,
                fontWeight: 400,
                fontSize:   'clamp(18px, 1.8vw, 26px)',
                color:      'rgba(255,255,255,0.85)',
                lineHeight: 1.6,
                margin:     0,
              }}>
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ BOTTOM PARALLAX IMAGE ═════════════════════════════════════ */}
      <ParallaxImage src="/images/about-signage.jpg" />


      {/* ══ JOIN THINCHRONIZE — last section before footer ════════════
          Left: headline + 2 paragraphs + CTA
          Right: full-height image (placeholder until photo arrives)
      ════════════════════════════════════════════════════════════════ */}
      <section style={{
        background:          '#f5f4f0',
        display:             'grid',
        gridTemplateColumns: '1fr 1fr',
        minHeight:           '80vh',
      }}>
        {/* Left — text */}
        <div style={{
          padding:       'clamp(72px, 9vw, 120px) 5vw clamp(72px, 9vw, 120px) 5vw',
          display:       'flex',
          flexDirection: 'column',
          justifyContent:'flex-start',
        }}>
          <h2 style={{
            fontFamily:  PP,
            fontWeight:  400,
            fontSize:    'clamp(32px, 4vw, 58px)',
            color:       '#111',
            lineHeight:  1.15,
            letterSpacing: '-0.02em',
            margin:      '0 0 clamp(28px, 3.5vw, 48px)',
          }}>
            Join Thinchronize and build brands that matter.
          </h2>

          <p style={{
            fontFamily: PP,
            fontWeight: 400,
            fontSize:   'clamp(15px, 1.2vw, 18px)',
            color:      'rgba(0,0,0,0.55)',
            lineHeight: 1.8,
            margin:     '0 0 clamp(16px, 2vw, 28px)',
            maxWidth:   460,
          }}>
            We are a strategy-led creative studio that takes its work seriously — and its people even more so. We look for thinkers and makers who believe a brand has to mean something before it can look like anything.
          </p>

          <p style={{
            fontFamily: PP,
            fontWeight: 400,
            fontSize:   'clamp(15px, 1.2vw, 18px)',
            color:      'rgba(0,0,0,0.55)',
            lineHeight: 1.8,
            margin:     '0 0 clamp(40px, 5vw, 64px)',
            maxWidth:   460,
          }}>
            If you want to do the best work of your career on brands that challenge you, we would love to hear from you.
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
              alignSelf:           'flex-start',
            }}
          >
            Get in touch →
          </Link>
        </div>

        {/* Right — image */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/work/whatsub/Whatsub-Sign.jpg"
            alt="Join Thinchronize"
            style={{
              position:   'absolute',
              inset:      0,
              width:      '100%',
              height:     '100%',
              objectFit:  'cover',
              filter:     'grayscale(100%)',
              display:    'block',
            }}
          />
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
