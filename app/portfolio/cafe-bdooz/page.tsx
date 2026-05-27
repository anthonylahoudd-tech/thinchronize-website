'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { PROJECTS } from '@/lib/projects'

const PP   = "'PPNeueCorp', system-ui, sans-serif"
const RED  = '#D0274B'
const BASE = '/images/work/cafe-bdooz'

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
      transform:  vis ? 'translateY(0)' : 'translateY(20px)',
      transition: `opacity 0.7s ease-out ${delay}s, transform 0.7s ease-out ${delay}s`,
    } as React.CSSProperties,
  }
}

// ─── Deliverable chip ─────────────────────────────────────────────────────────

function DeliverableChip({ label }: { label: string }) {
  const [hov, setHov] = useState(false)
  return (
    <span
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        border:       `1px solid ${hov ? RED : '#E8E8E8'}`,
        borderRadius: 24,
        padding:      '10px 20px',
        fontFamily:   PP,
        fontWeight:   400,
        fontSize:     13,
        color:        hov ? RED : '#292929',
        transition:   'border-color 0.2s, color 0.2s',
        cursor:       'default',
      }}
    >
      {label}
    </span>
  )
}

// ─── More-work card ───────────────────────────────────────────────────────────

function MoreWorkCard({ id, title, category, coverImage, market, year }: {
  id: string; title: string; category: string; coverImage: string; market: string; year: string
}) {
  const [hov, setHov] = useState(false)
  return (
    <Link
      href={`/portfolio/${id}`}
      style={{ display: 'block', textDecoration: 'none', flex: '1 1 0' }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div style={{ overflow: 'hidden', aspectRatio: '4/3', marginBottom: 16 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={coverImage}
          alt={title}
          style={{
            width: '100%', height: '100%', objectFit: 'cover', display: 'block',
            transform: hov ? 'scale(1.03)' : 'scale(1)',
            transition: 'transform 0.5s ease',
          }}
        />
      </div>
      <p style={{ fontFamily: PP, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#919191', marginBottom: 6 }}>
        {category}
      </p>
      <h3 style={{ fontFamily: PP, fontWeight: 900, fontSize: 20, color: hov ? RED : '#292929', transition: 'color 0.25s', lineHeight: 1.15, textTransform: 'uppercase' }}>
        {title}
      </h3>
      <p style={{ fontFamily: PP, fontSize: 13, color: '#919191', marginTop: 4 }}>
        {market} · {year}
      </p>
    </Link>
  )
}

// ─── Nav link ─────────────────────────────────────────────────────────────────

function NavLink({ href, label, red }: { href: string; label: string; red?: boolean }) {
  const [hov, setHov] = useState(false)
  return (
    <Link
      href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontFamily: PP, fontWeight: 400, fontSize: 14,
        color: red ? (hov ? '#b8223f' : RED) : (hov ? RED : '#292929'),
        textDecoration: 'none', transition: 'color 0.2s',
      }}
    >
      {label}
    </Link>
  )
}

// ─── Scroll indicator ─────────────────────────────────────────────────────────

function ScrollIndicator() {
  return (
    <div style={{
      position: 'absolute', bottom: 48, left: '50%', transform: 'translateX(-50%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
      color: 'rgba(255,255,255,0.5)',
    }}>
      <span style={{ fontFamily: PP, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Scroll</span>
      <svg width="16" height="24" viewBox="0 0 16 24" fill="none" style={{ animation: 'bounce 1.8s infinite' }}>
        <path d="M8 0v20M1 13l7 7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <style>{`@keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }`}</style>
    </div>
  )
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const DELIVERABLES = [
  'Logo Suite', 'Brand Guidelines', 'Colour System', 'Typography System',
  'Menu Design', 'Packaging Design', 'Signage & Environmental',
  'Social Media Templates', 'Brand Collateral', 'Brand Standards',
]

const GALLERY_IMAGES = [
  { file: 'image-1.jpg', alt: 'Cafe BDOOZ brand identity' },
  { file: 'image-2.jpg', alt: 'Cafe BDOOZ menu design' },
  { file: 'image-3.jpg', alt: 'Cafe BDOOZ packaging' },
  { file: 'image-4.jpg', alt: 'Cafe BDOOZ environmental signage' },
  { file: 'image-5.jpg', alt: 'Cafe BDOOZ brand collateral' },
]

const moreWork = PROJECTS.filter(p => p.id !== 'cafe-bdooz').slice(0, 2)

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function CafeBdoozPage() {
  const rChallenge = useReveal()
  const rDiagnosis = useReveal()
  const rBuilt     = useReveal(0.15)
  const rResult    = useReveal()
  const rGallery   = useReveal()
  const rDeliv     = useReveal()
  const rNav       = useReveal()
  const rMore      = useReveal()

  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>

      {/* ══ 1 — Hero ════════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'flex-end' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${BASE}/cover.jpg`}
          alt="Cafe BDOOZ"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.65) 100%)' }} />

        <div style={{ position: 'relative', padding: 'clamp(40px, 5vw, 80px)', maxWidth: 900 }}>
          <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: 16 }}>
            Case Study — 2025
          </p>
          <h1 style={{ fontFamily: PP, fontWeight: 900, fontSize: 'clamp(48px, 7vw, 96px)', color: '#FFFFFF', lineHeight: 1.0, letterSpacing: '-0.02em', textTransform: 'uppercase', marginBottom: 16 }}>
            Cafe BDOOZ
          </h1>
          <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 22, color: 'rgba(255,255,255,0.75)', marginBottom: 32, lineHeight: 1.4, textTransform: 'uppercase' }}>
            Brand Identity
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
            {['Brand Identity', 'Café', 'Hospitality', 'Lebanon'].map(s => (
              <span key={s} style={{ border: '1px solid rgba(255,255,255,0.4)', borderRadius: 20, padding: '6px 14px', fontFamily: PP, fontWeight: 400, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.8)' }}>
                {s}
              </span>
            ))}
          </div>
          <p style={{ fontFamily: PP, fontSize: 13, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.05em' }}>
            Lebanon · 2025
          </p>
        </div>
        <ScrollIndicator />
      </section>

      {/* ══ 2 — The Challenge ════════════════════════════════════════════ */}
      <section style={{ padding: '120px 0' }}>
        <div ref={rChallenge.ref} style={{ ...rChallenge.style, maxWidth: 800, margin: '0 auto', padding: '0 clamp(24px, 6vw, 80px)' }}>
          <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#919191', marginBottom: 24 }}>
            The Challenge
          </p>
          <p style={{ fontFamily: PP, fontWeight: 800, fontSize: 'clamp(22px, 3vw, 32px)', color: '#292929', lineHeight: 1.5, textTransform: 'uppercase' }}>
            A Lebanese café built on warmth, character, and neighbourhood culture needed an identity that could carry all of that before a single word was spoken — from the sign above the door to the cup in your hand.
          </p>
        </div>
      </section>

      {/* ══ 3 — Large image: image-1.jpg ════════════════════════════════ */}
      <section>
        <div style={{ overflow: 'hidden' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${BASE}/image-1.jpg`}
            alt="Cafe BDOOZ brand identity"
            style={{ width: '100%', height: '70vh', objectFit: 'cover', display: 'block' }}
          />
        </div>
      </section>

      {/* ══ 4 — Diagnosis + Solution ════════════════════════════════════ */}
      <section style={{ padding: 'clamp(60px, 8vw, 120px) clamp(24px, 6vw, 80px)' }}>
        <div style={{ display: 'flex', gap: 'clamp(32px, 6vw, 80px)', flexWrap: 'wrap' }}>
          <div ref={rDiagnosis.ref} style={{ ...rDiagnosis.style, flex: '1 1 280px' }}>
            <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#919191', marginBottom: 24 }}>
              The Diagnosis
            </p>
            <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 18, color: '#292929', lineHeight: 1.75 }}>
              The café had genuine personality — a name with rhythm, a space with warmth, and a product people kept coming back for. But nothing in the visual language was capturing any of that. The brand was invisible where it mattered most: on the street, in the hand, and on the wall.
            </p>
          </div>
          <div ref={rBuilt.ref} style={{ ...rBuilt.style, flex: '1 1 280px' }}>
            <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#919191', marginBottom: 24 }}>
              What We Built
            </p>
            <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 18, color: '#292929', lineHeight: 1.75 }}>
              An identity built around the feeling of return. A logotype with warmth and typographic character — crafted, not templated. A colour palette grounded in comfort and confidence. A complete brand system deployed across signage, packaging, menu, takeaway materials, and social — with a consistency that makes every touchpoint feel like the same place.
            </p>
          </div>
        </div>
      </section>

      {/* ══ 5 — Right-aligned image: image-2.jpg ════════════════════════ */}
      <section style={{ padding: '0 clamp(24px, 6vw, 80px) 120px' }}>
        <div style={{ marginLeft: 'auto', width: '65%', minWidth: 280 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${BASE}/image-2.jpg`}
            alt="Cafe BDOOZ identity detail"
            style={{ width: '100%', height: 500, objectFit: 'cover', display: 'block' }}
          />
        </div>
      </section>

      {/* ══ 6 — The Result (dark) ════════════════════════════════════════ */}
      <section style={{ background: '#000000', padding: 'clamp(60px, 8vw, 120px) clamp(24px, 6vw, 80px)' }}>
        <div ref={rResult.ref} style={rResult.style}>
          <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: RED, marginBottom: 24 }}>
            The Result
          </p>
          <p style={{ fontFamily: PP, fontWeight: 800, fontSize: 'clamp(24px, 3.5vw, 36px)', color: '#FFFFFF', lineHeight: 1.5, textTransform: 'uppercase', maxWidth: 720, marginBottom: 28 }}>
            Cafe BDOOZ launched in 2025 with a complete identity that captures the spirit of a place people return to — not just for the coffee, but for how it makes them feel.
          </p>
          <p style={{ fontFamily: PP, fontSize: 18, color: '#919191', lineHeight: 1.7, maxWidth: 640, marginBottom: 40 }}>
            The identity was delivered across 10+ production-ready formats and activated across environmental, packaging, print, and digital — all from a single Brand Engagement.
          </p>
          <p style={{ fontFamily: PP, fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>
            Lebanon · 2025
          </p>
        </div>
      </section>

      {/* ══ 7 — Brand in Action: editorial alternating layout ═══════════ */}
      <section style={{ background: '#FFFFFF' }}>
        <div ref={rGallery.ref} style={rGallery.style}>

          {/* Label */}
          <div style={{ padding: 'clamp(60px, 8vw, 100px) clamp(24px, 6vw, 80px) 0' }}>
            <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: RED }}>
              Brand in Action
            </p>
          </div>

          {/* image-3.jpg — full width */}
          <div style={{ overflow: 'hidden', marginTop: 48 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${BASE}/image-3.jpg`}
              alt="Cafe BDOOZ brand in context"
              style={{ width: '100%', height: '70vh', objectFit: 'cover', display: 'block' }}
            />
          </div>

          {/* image-4.jpg — right-aligned 65% */}
          <div style={{ padding: '80px clamp(24px, 6vw, 80px)' }}>
            <div style={{ marginLeft: 'auto', width: '65%', minWidth: 280 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${BASE}/image-4.jpg`}
                alt="Cafe BDOOZ packaging detail"
                style={{ width: '100%', height: 500, objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>

          {/* image-5.jpg — left-aligned 65% */}
          <div style={{ padding: '0 clamp(24px, 6vw, 80px) 80px' }}>
            <div style={{ marginRight: 'auto', width: '65%', minWidth: 280 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${BASE}/image-5.jpg`}
                alt="Cafe BDOOZ collateral"
                style={{ width: '100%', height: 500, objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>

        </div>
      </section>

      {/* ══ 8 — Deliverables ════════════════════════════════════════════ */}
      <section style={{ background: '#FFFFFF', padding: 'clamp(60px, 8vw, 120px) clamp(24px, 6vw, 80px)' }}>
        <div ref={rDeliv.ref} style={rDeliv.style}>
          <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#919191', marginBottom: 32 }}>
            Deliverables
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {DELIVERABLES.map(d => <DeliverableChip key={d} label={d} />)}
          </div>
        </div>
      </section>

      {/* ══ 9 — Navigation CTA ══════════════════════════════════════════ */}
      <section style={{ padding: '80px clamp(24px, 6vw, 80px)', borderTop: '1px solid #E8E8E8' }}>
        <div ref={rNav.ref} style={{ ...rNav.style, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
          <NavLink href="/portfolio" label="← Back to Portfolio" />
          <span style={{ fontFamily: PP, fontWeight: 900, fontSize: 12, color: '#292929', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Thinchronize
          </span>
          <NavLink href="/contact" label="Start a project →" red />
        </div>
      </section>

      {/* ══ 10 — More Work ══════════════════════════════════════════════ */}
      {moreWork.length > 0 && (
        <section style={{ padding: '0 clamp(24px, 6vw, 80px) 80px' }}>
          <div ref={rMore.ref} style={rMore.style}>
            <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#919191', marginBottom: 40 }}>
              More Work
            </p>
            <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
              {moreWork.map(p => (
                <MoreWorkCard key={p.id} id={p.id} title={p.title} category={p.category} coverImage={p.coverImage} market={p.market} year={p.year} />
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  )
}
