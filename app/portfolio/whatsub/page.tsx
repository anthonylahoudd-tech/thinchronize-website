'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { PROJECTS } from '@/lib/projects'

const PP  = "'PPNeueCorp', system-ui, sans-serif"
const RED = '#D0274B'
const B   = '/images/work/whatsub'   // base path

// ─── Scroll-reveal hook ───────────────────────────────────────────────────────
function useReveal(delay = 0) {
  const ref  = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } },
      { threshold: 0.06 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return {
    ref,
    style: {
      opacity:    vis ? 1 : 0,
      transform:  vis ? 'translateY(0)' : 'translateY(18px)',
      transition: `opacity 0.75s ease-out ${delay}s, transform 0.75s ease-out ${delay}s`,
    } as React.CSSProperties,
  }
}

// ─── Atom: single image, no crop ─────────────────────────────────────────────
function Img({ file, alt }: { file: string; alt: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      loading="lazy"
      src={`${B}/${file}`}
      alt={alt}
      style={{ display: 'block', width: '100%', height: 'auto' }}
    />
  )
}

// ─── Reveal wrappers ─────────────────────────────────────────────────────────
function Row({ children, gap = 4, mt = 4 }: { children: React.ReactNode; gap?: number; mt?: number }) {
  const r = useReveal()
  return (
    <div ref={r.ref} style={{ ...r.style, display: 'grid', gap, marginTop: mt }}>
      {children}
    </div>
  )
}

function TwoCol({ a, b, gap = 4, mt = 4 }: {
  a: [string, string]; b: [string, string]; gap?: number; mt?: number
}) {
  const r = useReveal()
  return (
    <div ref={r.ref} style={{ ...r.style, display: 'grid', gridTemplateColumns: '1fr 1fr', gap, marginTop: mt }}>
      <Img file={a[0]} alt={a[1]} />
      <Img file={b[0]} alt={b[1]} />
    </div>
  )
}

function ThreeCol({ imgs, mt = 4 }: { imgs: [string, string][]; mt?: number }) {
  const r = useReveal()
  return (
    <div ref={r.ref} style={{ ...r.style, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4, marginTop: mt }}>
      {imgs.map(([file, alt]) => <Img key={file} file={file} alt={alt} />)}
    </div>
  )
}

function Full({ file, alt, mt = 4 }: { file: string; alt: string; mt?: number }) {
  const r = useReveal()
  return (
    <div ref={r.ref} style={{ ...r.style, marginTop: mt }}>
      <Img file={file} alt={alt} />
    </div>
  )
}

// ─── Text break ───────────────────────────────────────────────────────────────
function Text({
  label, heading, body, dark = false,
}: {
  label: string; heading?: string; body: string; dark?: boolean
}) {
  const r = useReveal()
  return (
    <div style={{ background: dark ? '#000' : '#fff', padding: '80px clamp(24px,6vw,80px)' }}>
      <div ref={r.ref} style={{ ...r.style, maxWidth: 760, margin: '0 auto' }}>
        <p style={{
          fontFamily: PP, fontSize: 11, letterSpacing: '0.18em',
          textTransform: 'uppercase', color: dark ? RED : '#aaa',
          marginBottom: 20,
        }}>
          {label}
        </p>
        {heading && (
          <p style={{
            fontFamily: PP, fontWeight: 800,
            fontSize: 'clamp(20px,3vw,30px)',
            color: dark ? '#fff' : '#292929',
            lineHeight: 1.45, textTransform: 'uppercase', marginBottom: 20,
          }}>
            {heading}
          </p>
        )}
        <p style={{
          fontFamily: PP, fontWeight: 400, fontSize: 18,
          color: dark ? '#aaa' : '#555',
          lineHeight: 1.8,
        }}>
          {body}
        </p>
      </div>
    </div>
  )
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function Chip({ label }: { label: string }) {
  const [h, setH] = useState(false)
  return (
    <span
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        border: `1px solid ${h ? RED : '#e0e0e0'}`, borderRadius: 24,
        padding: '10px 20px', fontFamily: PP, fontSize: 13,
        color: h ? RED : '#292929', transition: 'border-color 0.2s, color 0.2s', cursor: 'default',
      }}
    >
      {label}
    </span>
  )
}

function NavLink({ href, label, red }: { href: string; label: string; red?: boolean }) {
  const [h, setH] = useState(false)
  return (
    <Link href={href} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        fontFamily: PP, fontWeight: 400, fontSize: 14,
        color: red ? (h ? '#b8223f' : RED) : (h ? RED : '#292929'),
        textDecoration: 'none', transition: 'color 0.2s',
      }}
    >
      {label}
    </Link>
  )
}

function MoreCard({ p }: { p: (typeof PROJECTS)[0] }) {
  const [h, setH] = useState(false)
  return (
    <Link href={`/portfolio/${p.id}`} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display: 'block', textDecoration: 'none', flex: '1 1 0' }}
    >
      <div style={{ overflow: 'hidden', aspectRatio: '4/3', marginBottom: 16 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img loading="lazy" src={p.coverImage} alt={p.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block',
            transform: h ? 'scale(1.03)' : 'scale(1)', transition: 'transform 0.5s ease' }}
        />
      </div>
      <p style={{ fontFamily: PP, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#919191', marginBottom: 6 }}>{p.category}</p>
      <h3 style={{ fontFamily: PP, fontWeight: 900, fontSize: 20, color: h ? RED : '#292929', transition: 'color 0.25s', lineHeight: 1.15, textTransform: 'uppercase' }}>{p.title}</h3>
      <p style={{ fontFamily: PP, fontSize: 13, color: '#919191', marginTop: 4 }}>{p.market} · {p.year}</p>
    </Link>
  )
}

const DELIVERABLES = [
  'Logo Suite', 'Brand Guidelines', 'Menu Design', 'Packaging System',
  'Food Truck Wrap', 'Restaurant Mural', 'Sticker Set', 'Takeaway Bags',
  'Cup Design', 'Outdoor Advertising', 'Color System', 'Icon Marks',
]

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function WhatsubPage() {
  const rResult = useReveal()
  const rDeliv  = useReveal()
  const rNav    = useReveal()
  const rMore   = useReveal()

  const moreWork = PROJECTS.filter(p => p.id !== 'whatsub').slice(0, 2)

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>

      {/* ══ HERO ══════════════════════════════════════════════════════════
          Whatsub-Image-1.jpg (landscape 3:2) — fills screen, text bottom-left
      ════════════════════════════════════════════════════════════════════ */}
      <section style={{ position: 'relative' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${B}/Whatsub-Image-1.jpg`}
          alt="Whatsub food truck"
          style={{ display: 'block', width: '100%', height: 'auto', minHeight: '70vh', objectFit: 'cover' }}
          fetchPriority="high"
          loading="eager"
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, transparent 35%, rgba(0,0,0,0.72) 100%)',
        }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, padding: 'clamp(32px,5vw,72px)', maxWidth: 860 }}>
          <p style={{ fontFamily: PP, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', marginBottom: 14 }}>
            Case Study — Washington D.C., USA · 2025
          </p>
          <h1 style={{ fontFamily: PP, fontWeight: 900, fontSize: 'clamp(44px,7vw,92px)', color: '#fff', lineHeight: 0.95, letterSpacing: '-0.02em', textTransform: 'uppercase', marginBottom: 14 }}>
            Whatsub
          </h1>
          <p style={{ fontFamily: PP, fontSize: 18, color: 'rgba(255,255,255,0.7)', marginBottom: 28, lineHeight: 1.4, textTransform: 'uppercase' }}>
            Brand Identity &amp; Visual System
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {['Brand Identity', 'Print Design', 'Environmental', 'Packaging'].map(s => (
              <span key={s} style={{ border: '1px solid rgba(255,255,255,0.38)', borderRadius: 20, padding: '5px 14px', fontFamily: PP, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.8)' }}>{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROW A: 2 landscape side-by-side ─── */}
      <TwoCol
        a={['Whatsub-image-2.jpg', 'Whatsub brand photography']}
        b={['Whatsub-Image-3.jpg',  'Whatsub brand photography']}
        mt={4}
      />

      {/* ── TEXT: Challenge ─── */}
      <Text
        label="The Challenge"
        heading="A new sub brand entering D.C.'s saturated fast casual market needed more than a logo."
        body="They needed a street-ready identity that could carry the brand from a food truck window to a restaurant wall to a takeaway bag — without losing its character."
      />

      {/* ── ROW B: full-width mural ─── */}
      <Full file="mural.jpg" alt="Whatsub restaurant mural" mt={0} />

      {/* ── ROW C: 3 portrait shots ─── */}
      <ThreeCol
        imgs={[
          ['Whatsub-Image-15.jpg', 'Whatsub brand application'],
          ['Whatsub-Image-16.jpg', 'Whatsub brand application'],
          ['Whatsub-Image-11.jpg', 'Whatsub brand application'],
        ]}
      />

      {/* ── TEXT: Diagnosis ─── */}
      <Text
        label="The Diagnosis"
        body="Fast casual visual language in D.C. was converging on the same clean minimal aesthetic. The gap was personality. The target audience expected brands that felt crafted and confident — not templated. Generic would be invisible here."
      />

      {/* ── ROW D: 2 landscape — concept sketches ─── */}
      <TwoCol
        a={['sketch-1.jpg', 'Whatsub concept sketches']}
        b={['sketch-2.jpg', 'Whatsub logo construction']}
        mt={0}
      />

      {/* ── ROW E: logo full width ─── */}
      <Full file="logo-final.jpg" alt="Whatsub final logotype" />

      {/* ── ROW F: logo colors + palette ─── */}
      <TwoCol
        a={['logo-colors.jpg', 'Whatsub logo color applications']}
        b={['palette.jpg',     'Whatsub color palette']}
      />

      {/* ── TEXT: Color System ─── */}
      <Text
        label="Color System"
        body="A warm yellow-to-orange-to-red gradient palette with strong contrast ratios — built to work outdoors, on packaging, and at speed. Every hue chosen for legibility at distance and appetite appeal up close."
      />

      {/* ── ROW G: icons full width ─── */}
      <Full file="icons.jpg" alt="Whatsub icon and mark system" mt={0} />

      {/* ── ROW H: 2 landscape application shots ─── */}
      <TwoCol
        a={['Whatsub-Image-4.jpg', 'Whatsub brand in action']}
        b={['Whatsub-Image-5.jpg', 'Whatsub brand in action']}
      />

      {/* ── ROW I: 3 portrait packaging ─── */}
      <ThreeCol
        imgs={[
          ['Whatsub-Image-9.jpg',  'Whatsub packaging detail'],
          ['Whatsub-Image-10.jpg', 'Whatsub packaging detail'],
          ['Whatsub-Image-14.jpg', 'Whatsub packaging detail'],
        ]}
      />

      {/* ── TEXT: What We Built ─── */}
      <Text
        label="What We Built"
        body="A custom scripted logotype with typographic attitude, paired with an illustrated mascot built to scale. A complete system covering logo suite, menu, packaging, food truck wrap, mural, stickers, cups, and outdoor advertising — all delivered within a single Brand Engagement."
      />

      {/* ── ROW J: packaging full width (very wide panoramic) ─── */}
      <Full file="packaging.jpg" alt="Whatsub packaging system" mt={0} />

      {/* ── ROW K: 2 landscape brand-in-action ─── */}
      <TwoCol
        a={['Whatsub-Image-6.jpg', 'Whatsub brand application']}
        b={['Whatsub-Image-7.jpg', 'Whatsub brand application']}
      />

      {/* ── ROW L: full-width ─── */}
      <Full file="Whatsub-Image-12.jpg" alt="Whatsub brand environment" />

      {/* ── TEXT: Print & Outdoor ─── */}
      <Text
        label="Print & Outdoor"
        body="Every print application extended the brand with the same conviction as the core identity. The poster campaign was built for the street — high contrast, bold type, unmissable at any distance."
      />

      {/* ── ROW M: 2 portrait posters ─── */}
      <TwoCol
        a={['poster-1.jpg', 'Whatsub outdoor poster']}
        b={['poster-2.jpg', 'Whatsub outdoor poster']}
        mt={0}
      />

      {/* ── ROW N: 2 landscape ─── */}
      <TwoCol
        a={['Whatsub-Image-8.jpg',  'Whatsub brand photography']}
        b={['Whatsub-Image-13.jpg', 'Whatsub brand photography']}
      />

      {/* ── ROW O: 3 portrait — final brand shots ─── */}
      <ThreeCol
        imgs={[
          ['Whatsub-Image-17.jpg', 'Whatsub brand photography'],
          ['Whatsub-Image-18.jpg', 'Whatsub brand photography'],
          ['Whatsub-Image-19.jpg', 'Whatsub brand photography'],
        ]}
      />

      {/* ══ RESULT (dark) ════════════════════════════════════════════════ */}
      <section style={{ background: '#000', padding: 'clamp(60px,8vw,120px) clamp(24px,6vw,80px)' }}>
        <div ref={rResult.ref} style={rResult.style}>
          <p style={{ fontFamily: PP, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: RED, marginBottom: 24 }}>
            The Result
          </p>
          <p style={{ fontFamily: PP, fontWeight: 800, fontSize: 'clamp(22px,3.5vw,34px)', color: '#fff', lineHeight: 1.45, textTransform: 'uppercase', maxWidth: 720, marginBottom: 28 }}>
            Whatsub launched in early 2025 with a complete visual system that translated across every touchpoint — from the 20-foot truck wrap to the condiment packet — without losing consistency or character.
          </p>
          <p style={{ fontFamily: PP, fontSize: 17, color: '#666', lineHeight: 1.8, maxWidth: 640, marginBottom: 40 }}>
            Delivered across 12+ production-ready formats and activated across environmental, print, packaging, and outdoor within a single Brand Engagement.
          </p>
          <p style={{ fontFamily: PP, fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>Washington D.C., USA · 2025</p>
        </div>
      </section>

      {/* ══ DELIVERABLES ═════════════════════════════════════════════════ */}
      <section style={{ background: '#fff', padding: 'clamp(60px,8vw,120px) clamp(24px,6vw,80px)' }}>
        <div ref={rDeliv.ref} style={rDeliv.style}>
          <p style={{ fontFamily: PP, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#aaa', marginBottom: 32 }}>
            Deliverables
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {DELIVERABLES.map(d => <Chip key={d} label={d} />)}
          </div>
        </div>
      </section>

      {/* ══ NAV ══════════════════════════════════════════════════════════ */}
      <section style={{ padding: '72px clamp(24px,6vw,80px)', borderTop: '1px solid #e8e8e8' }}>
        <div ref={rNav.ref} style={{ ...rNav.style, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
          <NavLink href="/portfolio" label="← Back to Portfolio" />
          <span style={{ fontFamily: PP, fontWeight: 900, fontSize: 12, color: '#292929', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Thinchronize
          </span>
          <NavLink href="/contact" label="Start a project →" red />
        </div>
      </section>

      {/* ══ MORE WORK ════════════════════════════════════════════════════ */}
      {moreWork.length > 0 && (
        <section style={{ padding: '0 clamp(24px,6vw,80px) 80px' }}>
          <div ref={rMore.ref} style={rMore.style}>
            <p style={{ fontFamily: PP, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#aaa', marginBottom: 40 }}>
              More Work
            </p>
            <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
              {moreWork.map(p => <MoreCard key={p.id} p={p} />)}
            </div>
          </div>
        </section>
      )}

      {/* ── Responsive overrides ─── */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 600px) {
          .ws-two   { grid-template-columns: 1fr !important; }
          .ws-three { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 601px) and (max-width: 860px) {
          .ws-three { grid-template-columns: repeat(2, 1fr) !important; }
        }
      ` }} />

    </div>
  )
}
