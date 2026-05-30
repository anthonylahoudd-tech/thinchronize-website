'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { PROJECTS, type Project } from '@/lib/projects'

const PP = "'PPNeueCorp', system-ui, sans-serif"

interface Props {
  project: Project
  nextProject: Project
  currentIndex: number
}

export default function PortfolioProjectClient({ project, nextProject, currentIndex }: Props) {
  const [view, setView] = useState<'visual' | 'reading'>('visual')
  const [pillHovered, setPillHovered] = useState(false)
  const nextProjectRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const el = nextProjectRef.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
        setTimeout(() => {
          router.push(`/portfolio/${nextProject.id}`)
        }, 800)
      }
    }, { threshold: 0.6 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [nextProject.id, router])

  const images = project.images?.length ? project.images : [project.coverImage]

  return (
    <div>

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        background: '#000',
        overflow: 'hidden',
      }}>
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', opacity: 0.7 }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%)',
          pointerEvents: 'none',
        }} />

        <div style={{
          position: 'absolute',
          bottom: '60px', left: '48px', right: '80px',
          zIndex: 2,
        }}>
          <p style={{
            fontFamily: PP,
            fontWeight: 400,
            fontSize: '10px',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.5)',
            marginBottom: '16px',
          }}>
            {project.category} — {project.year}
          </p>
          <h1 style={{
            fontFamily: PP,
            fontWeight: 900,
            fontSize: 'clamp(48px, 8vw, 110px)',
            color: '#fff',
            letterSpacing: '-2px',
            lineHeight: 0.92,
            margin: 0,
            textTransform: 'uppercase',
          }}>
            {project.title}
          </h1>
        </div>

        <div style={{
          position: 'absolute',
          bottom: '60px', right: '48px',
          fontFamily: PP,
          fontWeight: 400,
          fontSize: '10px',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.4)',
          writingMode: 'vertical-rl',
          zIndex: 2,
        }}>
          (SCROLL)
        </div>
      </section>

      {/* ── VIEW SWITCHER PILL ──────────────────────────────────────────────── */}
      <div
        style={{
          position: 'fixed',
          bottom: '40px',
          right: '40px',
          zIndex: 50,
          background: 'white',
          borderRadius: '999px',
          padding: '6px',
          width: '56px',
          height: '100px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-around',
          cursor: 'pointer',
          transition: 'width 500ms cubic-bezier(0.19,1,0.22,1), height 500ms cubic-bezier(0.19,1,0.22,1)',
          overflow: 'hidden',
          boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
        }}
        onMouseEnter={() => setPillHovered(true)}
        onMouseLeave={() => setPillHovered(false)}
      >
        {/* Grid icon — visual view */}
        <button
          onClick={() => setView('visual')}
          style={{
            width: '44px', height: '44px',
            borderRadius: '50%',
            background: view === 'visual' ? '#000' : 'transparent',
            border: 'none',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 300ms ease',
            flexShrink: 0,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="0" y="0" width="6" height="6" fill={view === 'visual' ? 'white' : '#000'} rx="1"/>
            <rect x="10" y="0" width="6" height="6" fill={view === 'visual' ? 'white' : '#000'} rx="1"/>
            <rect x="0" y="10" width="6" height="6" fill={view === 'visual' ? 'white' : '#000'} rx="1"/>
            <rect x="10" y="10" width="6" height="6" fill={view === 'visual' ? 'white' : '#000'} rx="1"/>
          </svg>
        </button>

        {/* Lines icon — reading view */}
        <button
          onClick={() => setView('reading')}
          style={{
            width: '44px', height: '44px',
            borderRadius: '50%',
            background: view === 'reading' ? '#000' : 'transparent',
            border: 'none',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 300ms ease',
            flexShrink: 0,
          }}
        >
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
            <rect y="0" width="16" height="2" fill={view === 'reading' ? 'white' : '#000'} rx="1"/>
            <rect y="5" width="12" height="2" fill={view === 'reading' ? 'white' : '#000'} rx="1"/>
            <rect y="10" width="10" height="2" fill={view === 'reading' ? 'white' : '#000'} rx="1"/>
          </svg>
        </button>
      </div>

      {/* ── CONTENT (animated on view switch) ──────────────────────────────── */}
      <div key={view} style={{ animation: 'viewFade 500ms cubic-bezier(0.19,1,0.22,1) forwards' }}>

        {view === 'visual' ? (

          /* ── VISUAL VIEW ─────────────────────────────────────────────────── */
          <div style={{ background: '#000' }}>
            {images.map((img, i) => (
              <div key={i} style={{
                width: '100%',
                aspectRatio: i % 3 === 2 ? '3/4' : '16/9',
                position: 'relative',
                overflow: 'hidden',
              }}>
                <Image
                  src={img}
                  alt={`${project.title} ${i + 1}`}
                  fill
                  sizes="100vw"
                  style={{ objectFit: 'cover' }}
                  loading={i < 2 ? 'eager' : 'lazy'}
                />
              </div>
            ))}
          </div>

        ) : (

          /* ── READING VIEW ────────────────────────────────────────────────── */
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            background: '#fff',
            minHeight: '100vh',
          }}>
            {/* Left — images column */}
            <div style={{ padding: '80px 24px 80px 48px' }}>
              {images.map((img, i) => (
                <div key={i} style={{
                  width: '100%',
                  aspectRatio: '4/3',
                  position: 'relative',
                  overflow: 'hidden',
                  marginBottom: '16px',
                  background: '#f0f0f0',
                }}>
                  <Image
                    src={img}
                    alt=""
                    fill
                    sizes="50vw"
                    style={{ objectFit: 'cover' }}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            {/* Right — project info, sticky */}
            <div style={{
              padding: '80px 48px 80px 24px',
              borderLeft: '1px solid rgba(0,0,0,0.06)',
            }}>
              <div style={{ position: 'sticky', top: '120px' }}>

                <p style={{
                  fontFamily: PP,
                  fontWeight: 400,
                  fontSize: '10px',
                  letterSpacing: '4px',
                  textTransform: 'uppercase',
                  color: 'rgba(0,0,0,0.3)',
                  marginBottom: '24px',
                }}>
                  (01) Project Overview
                </p>

                <h2 style={{
                  fontFamily: PP,
                  fontWeight: 900,
                  fontSize: 'clamp(22px, 2.5vw, 34px)',
                  color: '#000',
                  letterSpacing: '-0.5px',
                  lineHeight: 1.1,
                  marginBottom: '24px',
                  textTransform: 'uppercase',
                }}>
                  {project.subtitle}
                </h2>

                <p style={{
                  fontFamily: PP,
                  fontWeight: 400,
                  fontSize: '15px',
                  lineHeight: 1.75,
                  color: 'rgba(0,0,0,0.6)',
                  marginBottom: '40px',
                }}>
                  {project.brief}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '48px' }}>
                  {project.services.map(tag => (
                    <span key={tag} style={{
                      fontFamily: PP,
                      fontWeight: 400,
                      fontSize: '10px',
                      letterSpacing: '2px',
                      textTransform: 'uppercase',
                      color: 'rgba(0,0,0,0.4)',
                      border: '1px solid rgba(0,0,0,0.12)',
                      padding: '6px 14px',
                      borderRadius: '40px',
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>

                <p style={{
                  fontFamily: PP,
                  fontWeight: 400,
                  fontSize: '11px',
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  color: 'rgba(0,0,0,0.25)',
                }}>
                  {project.category} — {project.year}
                </p>

              </div>
            </div>
          </div>

        )}
      </div>

      {/* ── NEXT PROJECT ────────────────────────────────────────────────────── */}
      <div
        ref={nextProjectRef}
        style={{
          width: '100%',
          height: '100vh',
          background: '#000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          cursor: 'pointer',
          overflow: 'hidden',
        }}
        onClick={() => router.push(`/portfolio/${nextProject.id}`)}
      >
        <Image
          src={nextProject.coverImage}
          alt={nextProject.title}
          fill
          sizes="100vw"
          style={{ objectFit: 'cover', opacity: 0.3 }}
          loading="lazy"
        />

        <div style={{
          position: 'absolute',
          top: '48px', left: '48px',
          fontFamily: PP,
          fontWeight: 400,
          fontSize: '11px',
          letterSpacing: '4px',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.3)',
          zIndex: 2,
        }}>
          <span>{String(currentIndex + 1).padStart(2, '0')}</span>
          {' / '}
          <span>{String(PROJECTS.length).padStart(2, '0')}</span>
        </div>

        <div style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <p style={{
            fontFamily: PP,
            fontWeight: 400,
            fontSize: '10px',
            letterSpacing: '5px',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.4)',
            marginBottom: '20px',
          }}>
            Next project
          </p>
          <h2 style={{
            fontFamily: PP,
            fontWeight: 900,
            fontSize: 'clamp(40px, 7vw, 96px)',
            color: '#fff',
            letterSpacing: '-2px',
            lineHeight: 0.92,
            textTransform: 'uppercase',
          }}>
            {nextProject.title}
          </h2>
        </div>

        <div style={{
          position: 'absolute',
          bottom: '48px', right: '48px',
          color: 'rgba(255,255,255,0.4)',
          fontSize: '24px',
          zIndex: 2,
        }}>
          ↓
        </div>
      </div>

    </div>
  )
}
