'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { PROJECTS } from '@/lib/projects'
import { gsap } from 'gsap'

const PP   = "'PPNeueCorp', system-ui, sans-serif"
const RED  = '#D0274B'
const EASE = 'cubic-bezier(0.19, 1, 0.22, 1)'

// ─── Parallax image (reused from About) ──────────────────────────────────────

function ParallaxImage({ src, height = '65vh' }: { src: string; height?: string }) {
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
    <div ref={sectionRef} style={{ position: 'relative', height, overflow: 'hidden' }}>
      <div ref={imgRef} style={{ position: 'absolute', inset: '-15% 0', willChange: 'transform' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>
    </div>
  )
}

// ─── Hero text entrance ───────────────────────────────────────────────────────


export default function HomePage() {
  const heroLinesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = heroLinesRef.current
    if (!el) return
    const spans = el.querySelectorAll('.hero-line-inner')
    const ctx = gsap.context(() => {
      gsap.fromTo(
        spans,
        { yPercent: 110 },
        {
          yPercent:  0,
          duration:  1,
          ease:      'power4.out',
          stagger:   0.08,
          delay:     0.3,
        }
      )
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <div style={{ background: '#000' }}>

      {/* ══════════════════════════════════════════════════════════════════
          1. HERO — 100vh, pure typographic statement
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{
        height:        '100vh',
        background:    '#000',
        display:       'flex',
        flexDirection: 'column',
        justifyContent:'space-between',
        padding:       'calc(96px + 3vh) 5vw 52px',
        overflow:      'hidden',
      }}>

        {/* Main statement */}
        <div ref={heroLinesRef}>

          {/* Row 1 — full width: MINDFUL BY */}
          <div style={{ overflow: 'hidden' }}>
            <span className="hero-line-inner" style={{ fontFamily: PP, fontWeight: 400, fontSize: 'clamp(52px, 11vw, 160px)', color: 'white', textTransform: 'uppercase', letterSpacing: '-3px', lineHeight: 1.0, display: 'block', width: '100%', textAlign: 'left' }}>
              Mindful by
            </span>
          </div>

          {/* Row 2 — left: strategy-led label · right: DESIGN */}
          <div className="hero-line-inner" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2vw' }}>
            <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', margin: 0, flexShrink: 0 }}>
              Strategy-led creative studio · Beirut, Lebanon
            </p>
            <div style={{ overflow: 'hidden' }}>
              <span className="hero-line-inner" style={{ fontFamily: PP, fontWeight: 400, fontSize: 'clamp(52px, 11vw, 160px)', color: RED, textTransform: 'uppercase', letterSpacing: '-3px', lineHeight: 1.0, display: 'block', whiteSpace: 'nowrap' }}>
                design
              </span>
            </div>
          </div>

          {/* Row 3 — full width: STRATEGIC */}
          <div style={{ overflow: 'hidden' }}>
            <span className="hero-line-inner" style={{ fontFamily: PP, fontWeight: 400, fontSize: 'clamp(52px, 11vw, 160px)', color: RED, textTransform: 'uppercase', letterSpacing: '-3px', lineHeight: 1.0, display: 'block', width: '100%', textAlign: 'left' }}>
              Strategic
            </span>
          </div>

          {/* Row 4 — left: every project phrase · right: BY NATURE */}
          <div className="hero-line-inner" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2vw' }}>
            <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 'clamp(13px, 1.2vw, 16px)', color: 'rgba(255,255,255,0.5)', margin: 0, lineHeight: 1.6, flexShrink: 0, maxWidth: '30%' }}>
              Every project starts with a diagnosis,<br />not a brief.
            </p>
            <div style={{ overflow: 'hidden' }}>
              <span className="hero-line-inner" style={{ fontFamily: PP, fontWeight: 400, fontSize: 'clamp(52px, 11vw, 160px)', color: 'white', textTransform: 'uppercase', letterSpacing: '-3px', lineHeight: 1.0, display: 'block', whiteSpace: 'nowrap' }}>
                by nature
              </span>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div style={{
          display:        'flex',
          justifyContent: 'flex-end',
          alignItems:     'flex-end',
          opacity:        1,
        }}>
          <p style={{ display: 'none' }}></p>
          <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            <Link href="/portfolio" style={{
              fontFamily:          PP,
              fontWeight:          400,
              fontSize:            13,
              letterSpacing:       '2px',
              textTransform:       'uppercase',
              color:               'rgba(255,255,255,0.5)',
              textDecoration:      'underline',
              textUnderlineOffset: '5px',
            }}>
              View our work ↓
            </Link>
            <Link href="/contact" style={{
              fontFamily:    PP,
              fontWeight:    400,
              fontSize:      13,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color:         'white',
              background:    RED,
              padding:       '12px 28px',
              textDecoration:'none',
            }}>
              Let&apos;s Sync.
            </Link>
          </div>
        </div>

      </section>

      {/* ══════════════════════════════════════════════════════════════════
          2. MARQUEE — thin strip
      ══════════════════════════════════════════════════════════════════ */}
      <div style={{
        background:   '#111',
        overflow:     'hidden',
        borderTop:    '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding:      '18px 0',
      }}>
        <div className="page-marquee-track">
          <span style={{
            fontFamily:    PP,
            fontWeight:    400,
            fontSize:      12,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color:         'rgba(255,255,255,0.35)',
            whiteSpace:    'nowrap',
          }}>
            BRAND STRATEGY &nbsp;·&nbsp; VISUAL IDENTITY &nbsp;·&nbsp; DIAGNOSIS &nbsp;·&nbsp; CRAFT &nbsp;·&nbsp; BEIRUT, LEBANON &nbsp;·&nbsp; EST. 2016 &nbsp;·&nbsp;&nbsp;
            BRAND STRATEGY &nbsp;·&nbsp; VISUAL IDENTITY &nbsp;·&nbsp; DIAGNOSIS &nbsp;·&nbsp; CRAFT &nbsp;·&nbsp; BEIRUT, LEBANON &nbsp;·&nbsp; EST. 2016 &nbsp;·&nbsp;&nbsp;
          </span>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          3. SELECTED WORK — 3 featured projects, full-width stack
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ background: '#000', padding: '80px 5vw' }}>
        <div style={{
          display:        'flex',
          justifyContent: 'space-between',
          alignItems:     'baseline',
          marginBottom:   48,
        }}>
          <p style={{
            fontFamily:    PP,
            fontWeight:    400,
            fontSize:      12,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color:         'rgba(255,255,255,0.35)',
          }}>
            Selected work
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {PROJECTS.slice(0, 3).map((project, i) => (
            <Link
              key={project.id}
              href={`/portfolio/${project.id}`}
              style={{ textDecoration: 'none', display: 'block', position: 'relative', overflow: 'hidden' }}
            >
              <div style={{ position: 'relative', paddingTop: '52%' }}>
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill sizes="90vw"
                  style={{ objectFit: 'cover', transition: 'transform 600ms cubic-bezier(0.25,0.46,0.45,0.94)' }}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  className="work-cover"
                />
                <div style={{
                  position:   'absolute',
                  inset:      0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 50%)',
                }} />
                <div style={{
                  position: 'absolute',
                  bottom:   32,
                  left:     40,
                  right:    40,
                  display:  'flex',
                  justifyContent: 'space-between',
                  alignItems:     'flex-end',
                }}>
                  <div>
                    <p style={{
                      fontFamily:    PP,
                      fontWeight:    400,
                      fontSize:      11,
                      letterSpacing: '3px',
                      textTransform: 'uppercase',
                      color:         'rgba(255,255,255,0.5)',
                      margin:        '0 0 8px',
                    }}>
                      {String(i + 1).padStart(2, '0')} — {project.category}
                    </p>
                    <h2 style={{
                      fontFamily:    PP,
                      fontWeight:    900,
                      fontSize:      'clamp(28px, 4vw, 56px)',
                      color:         'white',
                      textTransform: 'uppercase',
                      letterSpacing: '-1px',
                      lineHeight:    1,
                      margin:        0,
                    }}>
                      {project.title}
                    </h2>
                  </div>
                  <span style={{
                    fontFamily:    PP,
                    fontWeight:    400,
                    fontSize:      12,
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    color:         'rgba(255,255,255,0.5)',
                  }}>
                    View →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          4. MANIFESTO — dark, full-width quote
      ══════════════════════════════════════════════════════════════════ */}
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
          <div style={{ paddingTop: 6 }}>
            <span style={{
              fontFamily:    PP,
              fontWeight:    400,
              fontSize:      12,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color:         'rgba(0,0,0,0.4)',
            }}>
              Our approach
            </span>
          </div>
          <div>
            <h2 style={{
              fontFamily:    PP,
              fontWeight:    400,
              fontSize:      'clamp(28px, 3.5vw, 54px)',
              color:         '#111',
              lineHeight:    1.2,
              letterSpacing: '-0.01em',
              margin:        '0 0 clamp(32px, 4vw, 52px)',
            }}>
              We don&apos;t design until we understand. Strategy before aesthetics — always.
            </h2>
            <p style={{
              fontFamily:  PP,
              fontWeight:  400,
              fontSize:    'clamp(15px, 1.2vw, 18px)',
              color:       'rgba(0,0,0,0.55)',
              lineHeight:  1.8,
              margin:      '0 0 clamp(32px, 4vw, 48px)',
              maxWidth:    560,
            }}>
              The MENA market is flooded with brands that look the part but say nothing. Every project we take on starts with a diagnosis — an honest audit of where the brand stands and what it actually needs to say.
            </p>
            <Link href="/method" style={{
              fontFamily:          PP,
              fontWeight:          400,
              fontSize:            14,
              color:               '#111',
              textDecoration:      'underline',
              textUnderlineOffset: '5px',
              textDecorationColor: 'rgba(0,0,0,0.3)',
            }}>
              See our method →
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          5. PARALLAX IMAGE
      ══════════════════════════════════════════════════════════════════ */}
      <ParallaxImage src="/images/Thinchronize-Mindful-Design-Website.jpg" height="60vh" />

      {/* ══════════════════════════════════════════════════════════════════
          6. SERVICES — simple list, white
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ background: '#fff', padding: 'clamp(80px, 10vw, 120px) 5vw' }}>
        <div style={{
          display:        'flex',
          justifyContent: 'space-between',
          alignItems:     'baseline',
          marginBottom:   'clamp(48px, 6vw, 72px)',
        }}>
          <p style={{
            fontFamily:    PP,
            fontWeight:    400,
            fontSize:      12,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color:         'rgba(0,0,0,0.4)',
          }}>
            What we do
          </p>
          <Link href="/services" style={{
            fontFamily:          PP,
            fontWeight:          400,
            fontSize:            12,
            letterSpacing:       '2px',
            textTransform:       'uppercase',
            color:               'rgba(0,0,0,0.4)',
            textDecoration:      'underline',
            textUnderlineOffset: '4px',
          }}>
            All services →
          </Link>
        </div>

        {[
          { name: 'Brand Engagement',   tagline: 'Strategy before anything else.' },
          { name: 'Print Design',        tagline: 'Every touchpoint is a brand moment.' },
          { name: 'Digital Design',      tagline: 'Built for screens. Built for the brand.' },
          { name: 'Animation & Motion',  tagline: 'The brand, in time.' },
          { name: 'Photography & Video', tagline: 'Your brand, made real.' },
          { name: 'Brand Guardianship',  tagline: 'After the brand is built.' },
        ].map((svc, i) => (
          <Link
            key={svc.name}
            href="/services"
            style={{
              display:        'flex',
              justifyContent: 'space-between',
              alignItems:     'center',
              borderTop:      '1px solid rgba(0,0,0,0.08)',
              padding:        'clamp(20px, 2.5vw, 32px) 0',
              borderBottom:   i === 5 ? '1px solid rgba(0,0,0,0.08)' : 'none',
              textDecoration: 'none',
              gap:            24,
            }}
            onMouseEnter={e => {
              const title = e.currentTarget.querySelector('.svc-title') as HTMLElement
              if (title) title.style.color = RED
            }}
            onMouseLeave={e => {
              const title = e.currentTarget.querySelector('.svc-title') as HTMLElement
              if (title) title.style.color = '#111'
            }}
          >
            <span className="svc-title" style={{
              fontFamily:    PP,
              fontWeight:    400,
              fontSize:      'clamp(22px, 3vw, 40px)',
              textTransform: 'uppercase',
              color:         '#111',
              transition:    'color 0.3s',
              lineHeight:    1.1,
            }}>
              {svc.name}
            </span>
            <span style={{
              fontFamily: PP,
              fontWeight: 400,
              fontSize:   14,
              color:      'rgba(0,0,0,0.4)',
              textAlign:  'right',
              flex:       1,
            }}>
              {svc.tagline}
            </span>
          </Link>
        ))}
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          7. DOUBLE MARQUEE — before CTA
      ══════════════════════════════════════════════════════════════════ */}
      <div style={{ background: '#000', overflow: 'hidden', padding: 'clamp(8px, 1vw, 14px) 0', display: 'flex', flexDirection: 'column', gap: 2 }}>
        <div style={{ overflow: 'hidden' }}>
          <div className="page-marquee-track">
            <span style={{ fontFamily: PP, fontWeight: 900, fontSize: 'clamp(52px, 8vw, 110px)', color: 'white', textTransform: 'uppercase', letterSpacing: '-3px', lineHeight: 0.9, whiteSpace: 'nowrap' }}>
              THINCHRONIZE * BRAND STUDIO * BEIRUT * STRATEGY * IDENTITY * CRAFT * THINCHRONIZE * BRAND STUDIO * BEIRUT * STRATEGY * IDENTITY * CRAFT *&nbsp;
            </span>
          </div>
        </div>
        <div style={{ overflow: 'hidden' }}>
          <div className="page-marquee-track-reverse">
            <span style={{ fontFamily: PP, fontWeight: 900, fontSize: 'clamp(52px, 8vw, 110px)', color: 'white', textTransform: 'uppercase', letterSpacing: '-3px', lineHeight: 0.9, whiteSpace: 'nowrap' }}>
              THINCHRONIZE * BRAND STUDIO * BEIRUT * STRATEGY * IDENTITY * CRAFT * THINCHRONIZE * BRAND STUDIO * BEIRUT * STRATEGY * IDENTITY * CRAFT *&nbsp;
            </span>
          </div>
        </div>
      </div>


      <style dangerouslySetInnerHTML={{ __html: `
        .work-cover:hover { transform: scale(1.03) !important; }
      ` }} />

    </div>
  )
}
