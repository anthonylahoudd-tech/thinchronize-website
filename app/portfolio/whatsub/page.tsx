'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { PROJECTS } from '@/lib/projects'

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
      <h3 style={{ fontFamily: PP, fontWeight: 900, fontSize: 20, color: hov ? RED : '#292929', transition: 'color 0.25s', lineHeight: 1.15 }}>
        {title}
      </h3>
      <p style={{ fontFamily: PP, fontSize: 13, color: '#919191', marginTop: 4 }}>
        {market} · {year}
      </p>
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
      <span style={{ fontFamily: PP, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
        Scroll
      </span>
      <svg width="16" height="24" viewBox="0 0 16 24" fill="none" style={{ animation: 'bounce 1.8s infinite' }}>
        <path d="M8 0v20M1 13l7 7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <style>{`@keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }`}</style>
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const DELIVERABLES = [
  'Logo Suite', 'Brand Guidelines', 'Menu Design', 'Packaging System',
  'Food Truck Wrap', 'Restaurant Mural', 'Sticker Set', 'Takeaway Bags',
  'Cup Design', 'Outdoor Advertising', 'Color System', 'Icon Marks',
]

const moreWork = PROJECTS.filter(p => p.id !== 'whatsub').slice(0, 2)

export default function WhatsubPage() {
  const rChallenge = useReveal()
  const rDiagnosis = useReveal()
  const rBuilt     = useReveal(0.15)
  const rResult    = useReveal()
  const rProcess   = useReveal()
  const rGallery   = useReveal()
  const rDeliv     = useReveal()
  const rNav       = useReveal()
  const rMore      = useReveal()

  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>

      {/* ══ SECTION 1 — Hero ══════════════════════════════════════════ */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'flex-end' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/work/whatsub/cover.jpg"
          alt="Whatsub"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.65) 100%)',
        }} />

        <div style={{ position: 'relative', padding: 'clamp(40px, 5vw, 80px)', maxWidth: 900 }}>
          <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: 16 }}>
            Case Study — 2025
          </p>
          <h1 style={{ fontFamily: PP, fontWeight: 900, fontSize: 'clamp(48px, 7vw, 96px)', color: '#FFFFFF', lineHeight: 1.0, letterSpacing: '-0.02em', marginBottom: 16 }}>
            Whatsub
          </h1>
          <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 22, color: 'rgba(255,255,255,0.75)', marginBottom: 32, lineHeight: 1.4 }}>
            Brand Identity &amp; Visual System
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
            {['Brand Identity', 'Print Design', 'Environmental', 'Packaging'].map(s => (
              <span key={s} style={{ border: '1px solid rgba(255,255,255,0.4)', borderRadius: 20, padding: '6px 14px', fontFamily: PP, fontWeight: 400, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.8)' }}>
                {s}
              </span>
            ))}
          </div>
          <p style={{ fontFamily: PP, fontSize: 13, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.05em' }}>
            Washington D.C., USA · 2025
          </p>
        </div>

        <ScrollIndicator />
      </section>

      {/* ══ SECTION 2 — The Challenge ════════════════════════════════ */}
      <section style={{ padding: '120px 0' }}>
        <div
          ref={rChallenge.ref}
          style={{ ...rChallenge.style, maxWidth: 800, margin: '0 auto', padding: '0 clamp(24px, 6vw, 80px)' }}
        >
          <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#919191', marginBottom: 24 }}>
            The Challenge
          </p>
          <p style={{ fontFamily: PP, fontWeight: 800, fontSize: 'clamp(22px, 3vw, 32px)', color: '#292929', lineHeight: 1.5 }}>
            A new sub brand entering Washington D.C.&rsquo;s saturated fast casual market needed more than a logo. They needed a street-ready identity that could carry the brand from a food truck window to a restaurant wall to a takeaway bag — without losing its character.
          </p>
        </div>
      </section>

      {/* ══ SECTION 3 — First large image ════════════════════════════ */}
      <section>
        <div style={{ overflow: 'hidden' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/work/whatsub/mural.jpg"
            alt="Whatsub mural"
            style={{ width: '100%', height: '70vh', objectFit: 'cover', display: 'block' }}
          />
        </div>
      </section>

      {/* ══ SECTION 4 — Diagnosis + Solution ════════════════════════ */}
      <section style={{ padding: 'clamp(60px, 8vw, 120px) clamp(24px, 6vw, 80px)' }}>
        <div style={{ display: 'flex', gap: 'clamp(32px, 6vw, 80px)', flexWrap: 'wrap' }}>
          <div ref={rDiagnosis.ref} style={{ ...rDiagnosis.style, flex: '1 1 280px' }}>
            <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#919191', marginBottom: 24 }}>
              The Diagnosis
            </p>
            <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 18, color: '#292929', lineHeight: 1.75 }}>
              Fast casual visual language in D.C. was converging on the same clean, minimal aesthetic. The gap was personality. The target audience — urban, street food-native, 18–35 — expected brands that felt crafted and confident, not templated. Generic would be invisible here.
            </p>
          </div>

          <div ref={rBuilt.ref} style={{ ...rBuilt.style, flex: '1 1 280px' }}>
            <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#919191', marginBottom: 24 }}>
              What We Built
            </p>
            <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 18, color: '#292929', lineHeight: 1.75 }}>
              A custom scripted logotype with deep typographic character, paired with an illustrated submarine sandwich mascot with motion and attitude. A warm yellow-to-orange-to-red color palette with strong contrast ratios. A complete brand system covering logo suite, menu, packaging, food truck wrap, mural, stickers, and outdoor advertising.
            </p>
          </div>
        </div>
      </section>

      {/* ══ SECTION 5 — Second image (right-aligned, 65%) ════════════ */}
      <section style={{ padding: '0 clamp(24px, 6vw, 80px) 120px' }}>
        <div style={{ marginLeft: 'auto', width: '65%', minWidth: 280 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/work/whatsub/collateral.jpg"
            alt="Whatsub collateral"
            style={{ width: '100%', height: 500, objectFit: 'cover', display: 'block' }}
          />
        </div>
      </section>

      {/* ══ SECTION 6 — The Result (dark) ════════════════════════════ */}
      <section style={{ background: '#292929', padding: 'clamp(60px, 8vw, 120px) clamp(24px, 6vw, 80px)' }}>
        <div ref={rResult.ref} style={rResult.style}>
          <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: RED, marginBottom: 24 }}>
            The Result
          </p>
          <p style={{ fontFamily: PP, fontWeight: 800, fontSize: 'clamp(24px, 3.5vw, 36px)', color: '#FFFFFF', lineHeight: 1.5, maxWidth: 720, marginBottom: 28 }}>
            Whatsub launched in early 2025 with a complete visual system that translated across every touchpoint — from the 20-foot truck wrap to the condiment packet — without losing consistency or character.
          </p>
          <p style={{ fontFamily: PP, fontSize: 18, color: '#919191', lineHeight: 1.7, maxWidth: 640, marginBottom: 40 }}>
            The brand identity was delivered across 12+ production-ready formats and activated across environmental, print, packaging, and outdoor within a single Brand Engagement.
          </p>
          <p style={{ fontFamily: PP, fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>
            Washington D.C., USA · 2025
          </p>
        </div>
      </section>

      {/* ══ SECTION 7 — The Process ══════════════════════════════════ */}
      <section style={{ background: '#FFFFFF', padding: 'clamp(60px, 8vw, 100px) clamp(24px, 6vw, 80px)' }}>
        <div ref={rProcess.ref} style={{ ...rProcess.style, maxWidth: 1200, margin: '0 auto' }}>
          <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: RED, marginBottom: 16 }}>
            The Process
          </p>
          <h2 style={{ fontFamily: PP, fontWeight: 800, fontSize: 40, color: '#292929', letterSpacing: '-0.015em', marginBottom: 48 }}>
            From Sketch to Street.
          </h2>
          <div className="process-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              { src: '/images/work/whatsub/sketch-1.jpg',   caption: '01 — Initial Concept Sketches' },
              { src: '/images/work/whatsub/sketch-2.jpg',   caption: '02 — Logo Construction' },
              { src: '/images/work/whatsub/logo-colors.jpg', caption: '03 — Color System Development' },
            ].map(({ src, caption }) => (
              <div key={caption}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={caption}
                  style={{ aspectRatio: '16/9', objectFit: 'cover', width: '100%', display: 'block' }}
                />
                <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 12, color: '#919191', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: 12 }}>
                  {caption}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 8 — Brand Gallery ════════════════════════════════ */}
      <section style={{ background: '#FFFFFF', padding: '0 clamp(24px, 6vw, 80px) 80px' }}>
        <div ref={rGallery.ref} style={{ ...rGallery.style, maxWidth: 1400, margin: '0 auto' }}>
          <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: RED, marginBottom: 48 }}>
            Brand in Action
          </p>
          <div className="gallery-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
            {[
              '/images/work/whatsub/poster-1.jpg',
              '/images/work/whatsub/poster-2.jpg',
              '/images/work/whatsub/packaging.jpg',
              '/images/work/whatsub/menu.jpg',
            ].map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={src}
                alt={`Whatsub brand ${i + 1}`}
                style={{ aspectRatio: '4/3', objectFit: 'cover', width: '100%', display: 'block' }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 9 — Deliverables ═════════════════════════════════ */}
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

      {/* ══ SECTION 10 — Navigation CTA ══════════════════════════════ */}
      <section style={{ padding: '80px clamp(24px, 6vw, 80px)', borderTop: '1px solid #E8E8E8' }}>
        <div
          ref={rNav.ref}
          style={{ ...rNav.style, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}
        >
          <NavLink href="/portfolio" label="← Back to Portfolio" />
          <span style={{ fontFamily: PP, fontWeight: 900, fontSize: 12, color: '#292929', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Thinchronize
          </span>
          <NavLink href="/contact" label="Start a project →" red />
        </div>
      </section>

      {/* ══ SECTION 11 — More Work ════════════════════════════════════ */}
      {moreWork.length > 0 && (
        <section style={{ padding: '0 clamp(24px, 6vw, 80px) 80px' }}>
          <div ref={rMore.ref} style={rMore.style}>
            <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#919191', marginBottom: 40 }}>
              More Work
            </p>
            <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
              {moreWork.map(p => (
                <MoreWorkCard
                  key={p.id}
                  id={p.id}
                  title={p.title}
                  category={p.category}
                  coverImage={p.coverImage}
                  market={p.market}
                  year={p.year}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <style>{`
        @media (max-width: 640px) {
          .process-grid { grid-template-columns: 1fr !important; }
          .gallery-grid  { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}

// ─── Nav link with hover ──────────────────────────────────────────────────────

function NavLink({ href, label, red }: { href: string; label: string; red?: boolean }) {
  const [hov, setHov] = useState(false)
  const base = red ? RED : '#292929'
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
