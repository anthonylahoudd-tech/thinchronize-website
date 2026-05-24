'use client'

import { useState } from 'react'
import Link from 'next/link'
import { SERVICES, type Service } from '@/lib/services-data'

const PP  = "'PPNeueCorp', system-ui, sans-serif"
const RED = '#D0274B'

// ─── Service accordion row ────────────────────────────────────────────────────

function ServiceRow({ service, isOpen, onToggle }: {
  service: Service
  isOpen: boolean
  onToggle: () => void
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <div>
      {/* Horizontal rule */}
      <div style={{ height: 1, background: '#E8E8E8' }} />

      {/* Clickable row */}
      <div
        onClick={onToggle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display:        'flex',
          justifyContent: 'space-between',
          alignItems:     'center',
          padding:        '28px 0',
          cursor:         'pointer',
          gap:            40,
        }}
      >
        <span style={{
          fontFamily:  PP,
          fontWeight:  900,
          fontSize:    'clamp(28px, 4vw, 48px)',
          color:       hovered ? RED : '#292929',
          transition:  'color 0.3s ease',
          lineHeight:  1.1,
          flexShrink:  0,
        }}>
          {service.name}
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexShrink: 0, maxWidth: 400 }}>
          <span style={{
            fontFamily: PP,
            fontWeight: 400,
            fontSize:   16,
            color:      '#919191',
            textAlign:  'right',
            lineHeight: 1.4,
          }}>
            {service.tagline}
          </span>
          {/* +/– indicator */}
          <span style={{
            fontFamily:  PP,
            fontWeight:  400,
            fontSize:    24,
            color:       isOpen ? RED : '#292929',
            transition:  'color 0.3s, transform 0.3s',
            transform:   isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
            lineHeight:  1,
            userSelect:  'none',
            flexShrink:  0,
          }}>
            +
          </span>
        </div>
      </div>

      {/* Accordion content */}
      <div style={{
        maxHeight:  isOpen ? '800px' : '0',
        overflow:   'hidden',
        transition: 'max-height 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
      }}>
        <div style={{
          display:       'flex',
          gap:           'clamp(24px, 4vw, 60px)',
          paddingBottom: 80,
          flexWrap:      'wrap',
        }}>
          {/* Left col — description (60%) */}
          <div style={{ flex: '1 1 55%', minWidth: 260 }}>
            <p style={{
              fontFamily: PP,
              fontWeight: 400,
              fontSize:   18,
              color:      '#292929',
              lineHeight: 1.7,
              marginBottom: 0,
            }}>
              {service.description}
            </p>
          </div>

          {/* Right col — deliverables (40%) */}
          <div style={{ flex: '1 1 35%', minWidth: 220 }}>
            <p style={{
              fontFamily:    PP,
              fontWeight:    800,
              fontSize:      11,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color:         '#919191',
              marginBottom:  16,
            }}>
              Deliverables
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
              {service.deliverables.map(d => (
                <span key={d} style={{
                  border:       '1px solid #E8E8E8',
                  borderRadius: 20,
                  padding:      '6px 14px',
                  fontFamily:   PP,
                  fontWeight:   400,
                  fontSize:     12,
                  color:        '#292929',
                }}>
                  {d}
                </span>
              ))}
            </div>
            <Link
              href="/diagnostic"
              style={{
                fontFamily:    PP,
                fontWeight:    700,
                fontSize:      14,
                color:         RED,
                textDecoration:'none',
                transition:    'opacity 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              Diagnose my brand →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function ServicesEditorialClient() {
  const [openId, setOpenId] = useState<string | null>(null)

  const toggle = (id: string) => setOpenId(prev => prev === id ? null : id)

  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>

      {/* ── Header ────────────────────────────────────────────────── */}
      <div style={{ padding: 'clamp(100px, 12vw, 140px) clamp(24px, 6vw, 80px) 80px' }}>
        <p style={{
          fontFamily:    PP,
          fontWeight:    400,
          fontSize:      11,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color:         '#919191',
          marginBottom:  20,
        }}>
          What We Do
        </p>
        <h1 style={{
          fontFamily:    PP,
          fontWeight:    900,
          fontSize:      'clamp(48px, 8vw, 72px)',
          color:         '#292929',
          lineHeight:    1.0,
          marginBottom:  24,
          letterSpacing: '-0.02em',
        }}>
          Services
        </h1>
        <p style={{
          fontFamily:  PP,
          fontWeight:  400,
          fontSize:    18,
          color:       '#919191',
          maxWidth:    480,
          lineHeight:  1.6,
        }}>
          Every engagement is built around what your brand actually needs — not a fixed package.
        </p>
      </div>

      {/* ── Services accordion list ───────────────────────────────── */}
      <div style={{ padding: '0 clamp(24px, 6vw, 80px)' }}>
        {SERVICES.map(service => (
          <ServiceRow
            key={service.id}
            service={service}
            isOpen={openId === service.id}
            onToggle={() => toggle(service.id)}
          />
        ))}
        {/* Final bottom rule */}
        <div style={{ height: 1, background: '#E8E8E8' }} />
      </div>

      {/* ── Bottom CTA ────────────────────────────────────────────── */}
      <div style={{
        padding:   '120px clamp(24px, 6vw, 80px)',
        textAlign: 'center',
      }}>
        <h2 style={{
          fontFamily:    PP,
          fontWeight:    900,
          fontSize:      'clamp(24px, 4vw, 32px)',
          color:         '#292929',
          marginBottom:  16,
          lineHeight:    1.2,
        }}>
          Not sure which service fits?
        </h2>
        <p style={{
          fontFamily:   PP,
          fontWeight:   400,
          fontSize:     16,
          color:        '#919191',
          marginBottom: 40,
          lineHeight:   1.5,
        }}>
          Answer three questions and we'll point you to the right one.
        </p>
        <Link
          href="/diagnostic"
          style={{
            display:       'inline-block',
            padding:       '16px 40px',
            background:    RED,
            color:         '#fff',
            fontFamily:    PP,
            fontWeight:    800,
            fontSize:      14,
            letterSpacing: '0.06em',
            textDecoration:'none',
            borderRadius:  0,
            transition:    'background 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = '#b8223f')}
          onMouseLeave={e => (e.currentTarget.style.background = RED)}
        >
          Try the Diagnostic →
        </Link>
      </div>

    </div>
  )
}
