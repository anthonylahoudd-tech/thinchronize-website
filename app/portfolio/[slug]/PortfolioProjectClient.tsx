'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { PROJECTS, type Project, type ProjectImage } from '@/lib/projects'

const PP = "'PPNeueCorp', system-ui, sans-serif"

interface Props {
  project: Project
  nextProject: Project
  prevProject: Project
  currentIndex: number
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function EyeIcon({ color }: { color: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function LinesIcon({ color }: { color: string }) {
  return (
    <svg width="18" height="14" viewBox="0 0 24 18" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round">
      <line x1="2" y1="2"  x2="22" y2="2" />
      <line x1="2" y1="9"  x2="17" y2="9" />
      <line x1="2" y1="16" x2="13" y2="16" />
    </svg>
  )
}

// ─── Reading section block ────────────────────────────────────────────────────

function ReadingSection({
  num, label, headline, body, children,
}: {
  num: string
  label: string
  headline: string
  body: string
  children?: React.ReactNode
}) {
  return (
    <div style={{ marginBottom: '80px' }}>
      <span style={{
        fontFamily: PP, fontWeight: 400, fontSize: '10px',
        letterSpacing: '3px', textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '10px',
      }}>
        {num}
      </span>
      <span style={{
        fontFamily: PP, fontWeight: 400, fontSize: '10px',
        letterSpacing: '3px', textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '24px',
      }}>
        {label}
      </span>
      <h3 style={{
        fontFamily: PP, fontWeight: 900, fontSize: 'clamp(18px, 2.5vw, 26px)',
        color: '#fff', lineHeight: 1.15, letterSpacing: '-0.5px',
        marginBottom: '20px', textTransform: 'uppercase',
      }}>
        {headline}
      </h3>
      <p style={{
        fontFamily: PP, fontWeight: 400, fontSize: '15px',
        color: 'rgba(255,255,255,0.55)', lineHeight: 1.75,
        marginBottom: children ? '40px' : '0',
      }}>
        {body}
      </p>
      {children}
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function PortfolioProjectClient({
  project, nextProject, prevProject, currentIndex,
}: Props) {
  const [view, setView]         = useState<'visual' | 'reading'>('visual')
  const [nearEnd, setNearEnd]   = useState(false)
  const router                  = useRouter()

  const images: ProjectImage[] = project.images?.length
    ? project.images
    : [{ src: project.coverImage }]

  // Scroll resistance
  useEffect(() => {
    const handle = () => {
      const dist = document.body.scrollHeight - window.scrollY - window.innerHeight
      setNearEnd(dist < 200)
    }
    window.addEventListener('scroll', handle, { passive: true })
    return () => window.removeEventListener('scroll', handle)
  }, [])

  return (
    <div style={{ background: '#000', minHeight: '100vh' }}>

      {/* ── SCROLL RESISTANCE WRAPPER ─────────────────────────────────────── */}
      {/* NOTE: position:fixed pill is a sibling of this div, not inside it,  */}
      {/* so the transform does not affect the pill's viewport anchoring.      */}
      <div style={{
        transform:       nearEnd ? 'scale(0.98) translateY(-8px)' : 'scale(1)',
        transition:      'transform 600ms cubic-bezier(0.19,1,0.22,1)',
        transformOrigin: 'top center',
      }}>

        {/* ── HERO ──────────────────────────────────────────────────────────── */}
        <section style={{
          position: 'relative',
          width:    '100%',
          height:   '100vh',
          background: '#000',
          overflow: 'hidden',
        }}>
          {/* Cover image */}
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover', opacity: 0.75 }}
          />

          {/* Gradient */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%)',
            pointerEvents: 'none',
          }} />

          {/* Watermark title — faint, large, behind info bar */}
          <div style={{
            position: 'absolute', bottom: '80px', left: '48px', right: '200px',
            zIndex: 2, pointerEvents: 'none',
          }}>
            <p style={{
              fontFamily: PP, fontWeight: 900,
              fontSize: 'clamp(48px, 8vw, 100px)',
              color: '#fff', opacity: 0.08,
              textTransform: 'uppercase',
              letterSpacing: '-3px', lineHeight: 0.88,
              margin: 0,
            }}>
              {project.title}
            </p>
          </div>

          {/* Info bar — bottom, above watermark visually */}
          <div style={{
            position: 'absolute', bottom: '48px',
            left: '48px', right: '48px',
            zIndex: 3,
            display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          }}>
            {/* Left: title + scroll */}
            <div>
              <p style={{
                fontFamily: PP, fontWeight: 400, fontSize: '10px',
                letterSpacing: '4px', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.35)', marginBottom: '12px',
              }}>
                (Scroll)
              </p>
              <h1 style={{
                fontFamily: PP, fontWeight: 900,
                fontSize: 'clamp(28px, 3.5vw, 48px)',
                color: '#fff', textTransform: 'uppercase',
                letterSpacing: '-1px', lineHeight: 1, margin: 0,
              }}>
                {project.title}
              </h1>
            </div>

            {/* Right: category + year */}
            <div style={{ textAlign: 'right' }}>
              <p style={{
                fontFamily: PP, fontWeight: 400, fontSize: '11px',
                letterSpacing: '3px', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.5)', margin: '0 0 4px',
              }}>
                {project.category}
              </p>
              <p style={{
                fontFamily: PP, fontWeight: 400, fontSize: '11px',
                letterSpacing: '3px', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.3)', margin: 0,
              }}>
                {project.year}
              </p>
            </div>
          </div>
        </section>

        {/* ── VIEW CONTENT ──────────────────────────────────────────────────── */}
        <section style={{ background: '#000', padding: '0 40px' }}>
          <div
            key={view}
            style={{ animation: 'viewEnter 500ms cubic-bezier(0.19,1,0.22,1) forwards' }}
          >

            {view === 'visual' ? (
              /* ── VISUAL VIEW ──────────────────────────────────────────────── */
              <div style={{
                paddingTop:    '120px',
                paddingBottom: '160px',
                marginLeft:    '-40px',
                marginRight:   '-40px',
              }}>
                {images.map((img, i) => (
                  <div key={i} style={{
                    position:    'relative',
                    paddingTop:  img.portrait ? '140%' : '71.05%',
                    marginBottom: '16px',
                    overflow:    'hidden',
                  }}>
                    <Image
                      src={img.src}
                      alt={`${project.title} — ${i + 1}`}
                      fill
                      sizes="100vw"
                      style={{ objectFit: 'cover' }}
                      loading={i < 2 ? 'eager' : 'lazy'}
                    />
                  </div>
                ))}
              </div>
            ) : (
              /* ── READING VIEW ─────────────────────────────────────────────── */
              <div style={{
                display:             'grid',
                gridTemplateColumns: '1fr 1fr',
                gap:                 '0',
                minHeight:           '100vh',
                paddingTop:          '120px',
                paddingBottom:       '120px',
              }}>
                {/* LEFT — images */}
                <div style={{ paddingRight: '24px' }}>
                  {images.map((img, i) => (
                    <div key={i} style={{
                      position:    'relative',
                      paddingTop:  '71.05%',
                      marginBottom: '24px',
                      overflow:    'hidden',
                    }}>
                      <Image
                        src={img.src}
                        alt=""
                        fill
                        sizes="50vw"
                        style={{ objectFit: 'cover' }}
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>

                {/* RIGHT — text panel */}
                <div style={{ paddingLeft: '60px' }}>

                  <ReadingSection
                    num="(01)" label="The Brief"
                    headline={project.brief.headline}
                    body={project.brief.body}
                  >
                    {/* Details grid */}
                    <div style={{
                      borderTop: '1px solid rgba(255,255,255,0.08)',
                      paddingTop: '24px',
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '16px',
                    }}>
                      {([
                        { label: 'Type',     value: project.details.type },
                        { label: 'Category', value: project.details.category },
                        { label: 'Year',     value: project.details.year },
                        { label: 'Scope',    value: project.details.scope },
                      ] as { label: string; value: string }[]).map(item => (
                        <div key={item.label}>
                          <span style={{
                            fontFamily: PP, fontWeight: 400, fontSize: '10px',
                            letterSpacing: '3px', textTransform: 'uppercase',
                            color: 'rgba(255,255,255,0.25)',
                            display: 'block', marginBottom: '4px',
                          }}>
                            {item.label}
                          </span>
                          <span style={{
                            fontFamily: PP, fontWeight: 400, fontSize: '13px',
                            color: 'rgba(255,255,255,0.7)',
                          }}>
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </ReadingSection>

                  <ReadingSection
                    num="(02)" label="The Diagnosis"
                    headline={project.diagnosis.headline}
                    body={project.diagnosis.body}
                  />

                  <ReadingSection
                    num="(03)" label="What We Built"
                    headline={project.built.headline}
                    body={project.built.body}
                  />

                  <ReadingSection
                    num="(04)" label="The Result"
                    headline={project.result.headline}
                    body={project.result.body}
                  />

                </div>
              </div>
            )}
          </div>
        </section>

        {/* ── NEXT PROJECT ──────────────────────────────────────────────────── */}
        <div
          style={{
            height:          '100vh',
            display:         'flex',
            alignItems:      'center',
            justifyContent:  'center',
            background:      '#000',
            position:        'relative',
            overflow:        'hidden',
            cursor:          'pointer',
          }}
          onClick={() => router.push(`/portfolio/${nextProject.id}`)}
        >
          <Image
            src={nextProject.coverImage}
            alt={nextProject.title}
            fill
            sizes="100vw"
            style={{ objectFit: 'cover', opacity: 0.4 }}
            loading="lazy"
          />

          {/* Counter */}
          <div style={{
            position: 'absolute', bottom: '60px', left: '40px',
            fontFamily: PP, fontWeight: 400,
            fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.4)', zIndex: 1,
          }}>
            {String(currentIndex + 1).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')}
          </div>

          {/* Centre */}
          <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <p style={{
              fontFamily: PP, fontWeight: 400, fontSize: '10px',
              letterSpacing: '4px', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)', marginBottom: '16px',
            }}>
              Next Project
            </p>
            <h2 style={{
              fontFamily: PP, fontWeight: 900,
              fontSize: 'clamp(32px, 5vw, 64px)',
              color: '#fff', textTransform: 'uppercase',
              letterSpacing: '-1px', margin: '0 0 32px',
            }}>
              {nextProject.title}
            </h2>
            <Link
              href={`/portfolio/${nextProject.id}`}
              onClick={e => e.stopPropagation()}
              style={{
                fontFamily: PP, fontWeight: 400, fontSize: '11px',
                letterSpacing: '3px', textTransform: 'uppercase',
                color: '#fff', textDecoration: 'underline',
                textUnderlineOffset: '5px',
              }}
            >
              View Project →
            </Link>
          </div>

          {/* Prev / Next arrows */}
          <div style={{
            position: 'absolute', bottom: '60px', right: '40px',
            display: 'flex', gap: '16px', zIndex: 1,
          }}>
            <Link
              href={`/portfolio/${prevProject.id}`}
              onClick={e => e.stopPropagation()}
              style={{ color: 'rgba(255,255,255,0.35)', fontSize: '20px', textDecoration: 'none' }}
            >←</Link>
            <Link
              href={`/portfolio/${nextProject.id}`}
              onClick={e => e.stopPropagation()}
              style={{ color: '#fff', fontSize: '20px', textDecoration: 'none' }}
            >→</Link>
          </div>
        </div>

      </div>
      {/* end scroll-resistance wrapper */}

      {/* ── VIEW TOGGLE PILL ──────────────────────────────────────────────── */}
      {/* Rendered as sibling of the transformed wrapper so position:fixed    */}
      {/* anchors to viewport and is unaffected by the transform above.       */}
      <div style={{
        position:      'fixed',
        bottom:        '48px',
        right:         '44px',
        zIndex:        40,
        background:    '#fff',
        borderRadius:  '9999px',
        width:         '60px',
        height:        '110px',
        display:       'flex',
        flexDirection: 'column',
        alignItems:    'center',
        justifyContent:'space-around',
        padding:       '8px',
        boxShadow:     '0 4px 24px rgba(0,0,0,0.2)',
        mixBlendMode:  'difference',
      }}>
        <button
          onClick={() => setView('visual')}
          aria-label="Visual view"
          style={{
            width: '44px', height: '44px', borderRadius: '50%',
            background: view === 'visual' ? '#000' : 'transparent',
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 300ms ease', flexShrink: 0,
          }}
        >
          <EyeIcon color={view === 'visual' ? '#fff' : '#888'} />
        </button>

        <button
          onClick={() => setView('reading')}
          aria-label="Reading view"
          style={{
            width: '44px', height: '44px', borderRadius: '50%',
            background: view === 'reading' ? '#000' : 'transparent',
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 300ms ease', flexShrink: 0,
          }}
        >
          <LinesIcon color={view === 'reading' ? '#fff' : '#888'} />
        </button>
      </div>

    </div>
  )
}
