'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const PP   = "'PPNeueCorp', system-ui, sans-serif"
const RED  = '#D0274B'
const EASE = 'cubic-bezier(0.19, 1, 0.22, 1)'

// ─── Signature program page — full-anatomy clone of the reference detail page
// (wearemotto.com/services/foundation), measured at 1280px and expressed in vw:
// hero marquee 10.67vw · statements 3.33vw/1.14 · section titles 6.87vw ·
// body 1.4vw/1.38 · impact numerals 8.2vw · testimonial cards 43.4vw/8px radius ·
// grid margins 5vw, 12 cols, 1.6vw gap. White page, black type, red accent.
// CTAs are underlined text links (double rule) — never boxed buttons.

export interface SignatureDetailData {
  marqueeTitle: string
  heroSub: string
  heroMedia: { src: string; alt: string }
  about: {
    statement: string
    body: string[]
    builtForLead: string
    builtForIf: string[]
  }
  trustedBy: string[]
  strategicCase: {
    titleLines: string[]
    items: { title: string; body: string }[]
    img: { src: string; alt: string }
  }
  galleryLabel: string
  gallery: { src: string; alt: string }[]
  deliver: {
    titleLines: string[]
    processLabel: string
    statement: string
    phases: { title: string; body: string; deliverablesLead: string; deliverables: string[] }[]
  }
  words: {
    sub: string
    quotes: { name: string; company: string; quote: string }[]
  }
  glance: {
    titleLines: string[]
    inquireLabel: string
    inquireHref: string
    rows: { label: string; items: string[] }[]
  }
  impactItems: { title: string; body: string }[]
  finalCta: { titleLines: string[]; label: string; href: string }
}

// Seamless CSS marquee: content duplicated once, track animates −50%.
function MarqueeRow({ text, className }: { text: string; className: string }) {
  const repeated = Array(6).fill(text).join('')
  return (
    <div className={`sg-marquee ${className}`} aria-hidden="true">
      <div className="sg-marquee-track">
        <span>{repeated}</span>
        <span>{repeated}</span>
      </div>
    </div>
  )
}

// Click-and-drag horizontal scrolling (mouse); touch scrolls natively.
function useDragScroll() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let down = false, startX = 0, startLeft = 0, moved = false
    const onDown = (e: MouseEvent) => {
      down = true; moved = false
      startX = e.pageX; startLeft = el.scrollLeft
      el.classList.add('sg-dragging')
    }
    const onMove = (e: MouseEvent) => {
      if (!down) return
      const dx = e.pageX - startX
      if (Math.abs(dx) > 3) moved = true
      el.scrollLeft = startLeft - dx
    }
    const onUp = () => { down = false; el.classList.remove('sg-dragging') }
    const onClick = (e: MouseEvent) => { if (moved) { e.preventDefault(); e.stopPropagation() } }
    el.addEventListener('mousedown', onDown)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    el.addEventListener('click', onClick, true)
    return () => {
      el.removeEventListener('mousedown', onDown)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
      el.removeEventListener('click', onClick, true)
    }
  }, [])
  return ref
}

export default function SignatureDetail({ data }: { data: SignatureDetailData }) {
  const [openPhase, setOpenPhase] = useState(0)
  const [slide, setSlide] = useState(0)
  const [quoteSlide, setQuoteSlide] = useState(0)
  const galleryRef = useDragScroll()
  const wordsRef = useDragScroll()

  // Scroll-reveal: fade-and-rise once on first enter.
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('[data-reveal]'))
    const io = new IntersectionObserver(
      entries => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('reveal-in')
            io.unobserve(e.target)
          }
        }
      },
      { threshold: 0.12 },
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  const onGalleryScroll = useCallback(() => {
    const el = galleryRef.current
    if (!el) return
    const slideW = el.scrollWidth / data.gallery.length
    setSlide(Math.min(data.gallery.length - 1, Math.round(el.scrollLeft / slideW)))
  }, [data.gallery.length, galleryRef])

  const onWordsScroll = useCallback(() => {
    const el = wordsRef.current
    if (!el) return
    const slideW = el.scrollWidth / data.words.quotes.length
    setQuoteSlide(Math.min(data.words.quotes.length - 1, Math.round(el.scrollLeft / slideW)))
  }, [data.words.quotes.length, wordsRef])

  const pad2 = (n: number) => String(n).padStart(2, '0')

  return (
    <div className="sg-root" style={{ backgroundColor: '#FFFFFF', color: '#292929' }}>

      {/* ════════════════════════════════════════════════════════════
          1 · HERO — white, black marquee, sub + CTAs
      ════════════════════════════════════════════════════════════ */}
      <section className="sg-hero">
        <MarqueeRow text={`${data.marqueeTitle} * `} className="sg-marquee--hero" />
        <div className="sg-hero-body">
          <p className="sg-hero-sub">{data.heroSub}</p>
          <div className="sg-hero-ctas">
            <Link href="/diagnostic" className="sg-ulink">Book the diagnostic call</Link>
            <a href="#sg-about" className="sg-ulink">Explore ↓</a>
          </div>
        </div>
        <div className="sg-hero-foot">
          <span className="sg-scroll-label">(Scroll)</span>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          2 · FULL-BLEED MEDIA (image for now — video slot later)
      ════════════════════════════════════════════════════════════ */}
      <section className="sg-media">
        <Image src={data.heroMedia.src} alt={data.heroMedia.alt} fill sizes="100vw" style={{ objectFit: 'cover' }} priority />
      </section>

      {/* ════════════════════════════════════════════════════════════
          3 · ABOUT
      ════════════════════════════════════════════════════════════ */}
      <section id="sg-about" className="sg-section" data-reveal>
        <div className="sg-grid">
          <p className="sg-small-label sg-col-label">(About)</p>
          <div className="sg-about-col">
            <h2 className="sg-statement">{data.about.statement}</h2>
            {data.about.body.map((para, i) => (
              <p key={i} className="sg-body sg-about-body" style={i > 0 ? { marginTop: '1.6vw' } : undefined}>{para}</p>
            ))}
            <p className="sg-body sg-built-lead">{data.about.builtForLead}</p>
            <ul className="sg-dot-list">
              {data.about.builtForIf.map(b => <li key={b}>{b}</li>)}
            </ul>
            <p style={{ margin: '3.2vw 0 0' }}>
              <Link href="/contact" className="sg-ulink">Work with us</Link>
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          4 · TRUSTED BY — client wordmark marquee
      ════════════════════════════════════════════════════════════ */}
      <section className="sg-trusted" data-reveal>
        <p className="sg-small-label" style={{ textAlign: 'center' }}>(Trusted By)</p>
        <MarqueeRow text={data.trustedBy.join('  ·  ') + '  ·  '} className="sg-marquee--trusted" />
      </section>

      {/* ════════════════════════════════════════════════════════════
          5 · THE STRATEGIC CASE
      ════════════════════════════════════════════════════════════ */}
      <section className="sg-section" data-reveal>
        <h2 className="sg-title">
          {data.strategicCase.titleLines.map(l => <span key={l} style={{ display: 'block' }}>{l}</span>)}
        </h2>
        <div className="sg-grid" style={{ marginTop: 'clamp(32px, 4vw, 64px)' }}>
          <div className="sg-case-items">
            {data.strategicCase.items.map((item, i) => (
              <div key={item.title} className="sg-case-item">
                <p className="sg-paren-num">({pad2(i + 1)})</p>
                <h3 className="sg-case-title">{item.title}</h3>
                <p className="sg-body">{item.body}</p>
              </div>
            ))}
            <p style={{ margin: '2vw 0 0' }}>
              <Link href="/diagnostic" className="sg-ulink">Book the diagnostic call</Link>
            </p>
          </div>
          <div className="sg-case-media">
            <Image src={data.strategicCase.img.src} alt={data.strategicCase.img.alt} fill sizes="(max-width: 767px) 89vw, 38vw" style={{ objectFit: 'cover' }} />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          6 · CLIENT GALLERY — drag to slide, counter bottom-left
      ════════════════════════════════════════════════════════════ */}
      <section className="sg-gallery-section" data-reveal>
        <div className="sg-gallery-head">
          <p className="sg-small-label">{data.galleryLabel}</p>
        </div>
        <div className="sg-gallery sg-drag" ref={galleryRef} onScroll={onGalleryScroll}>
          {data.gallery.map(g => (
            <div key={g.src} className="sg-slide">
              <Image src={g.src} alt={g.alt} fill sizes="(max-width: 767px) 89vw, 65vw" style={{ objectFit: 'cover' }} draggable={false} />
            </div>
          ))}
        </div>
        <p className="sg-counter sg-gallery-counter">{pad2(slide + 1)} — {pad2(data.gallery.length)}</p>
      </section>

      {/* ════════════════════════════════════════════════════════════
          7 · WHAT WE'LL DELIVER — process + phases accordion
      ════════════════════════════════════════════════════════════ */}
      <section className="sg-section" data-reveal>
        <h2 className="sg-title sg-title--huge">
          {data.deliver.titleLines.map(l => <span key={l} style={{ display: 'block' }}>{l}</span>)}
        </h2>
        <div className="sg-grid" style={{ marginTop: 'clamp(40px, 5vw, 80px)' }}>
          <p className="sg-small-label sg-col-label">({data.deliver.processLabel})</p>
          <div className="sg-about-col">
            <h3 className="sg-statement" style={{ marginBottom: 'clamp(32px, 4vw, 64px)' }}>{data.deliver.statement}</h3>
            <p className="sg-small-label" style={{ marginBottom: '1.5vw' }}>Phases of work</p>
            <div>
              {data.deliver.phases.map((ph, i) => {
                const open = openPhase === i
                return (
                  <div key={ph.title} className={`sg-phase${open ? ' sg-phase--open' : ''}`}>
                    <button
                      type="button"
                      className="sg-phase-head"
                      aria-expanded={open}
                      onClick={() => setOpenPhase(open ? -1 : i)}
                    >
                      <span className="sg-paren-num">({pad2(i + 1)})</span>
                      <span className="sg-phase-title">{ph.title}</span>
                      <span className="sg-phase-toggle" aria-hidden="true">+</span>
                    </button>
                    <div className="sg-phase-reveal">
                      <div className="sg-phase-clip">
                        <div className="sg-phase-body">
                          <p className="sg-body">{ph.body}</p>
                          <p className="sg-body sg-built-lead">{ph.deliverablesLead}</p>
                          <ul className="sg-dot-list">
                            {ph.deliverables.map(d => <li key={d}>{d}</li>)}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          8 · IN THEIR OWN WORDS — draggable cards
      ════════════════════════════════════════════════════════════ */}
      <section className="sg-words-section" data-reveal>
        <div className="sg-grid" style={{ padding: '0 var(--sg-r) 0 var(--sg-l)' }}>
          <h2 className="sg-title" style={{ gridColumn: '1 / span 7', margin: 0 }}>
            In their<br />own words
          </h2>
          <p className="sg-body sg-words-sub">{data.words.sub}</p>
        </div>
        <div className="sg-words-row sg-drag" ref={wordsRef} onScroll={onWordsScroll}>
          {data.words.quotes.map(q => (
            <div key={q.name + q.company} className="sg-word-card">
              <div>
                <p className="sg-word-name">{q.name}</p>
                <p className="sg-word-company">{q.company}</p>
              </div>
              <blockquote className="sg-quote">“{q.quote}”</blockquote>
            </div>
          ))}
        </div>
        <p className="sg-counter sg-gallery-counter">{quoteSlide + 1} — {data.words.quotes.length}</p>
      </section>

      {/* ════════════════════════════════════════════════════════════
          9 · AT A GLANCE
      ════════════════════════════════════════════════════════════ */}
      <section className="sg-section" data-reveal>
        <div className="sg-glance-head">
          <h2 className="sg-title" style={{ margin: 0 }}>
            {data.glance.titleLines.map(l => <span key={l} style={{ display: 'block' }}>{l}</span>)}
          </h2>
          <Link href={data.glance.inquireHref} className="sg-ulink">{data.glance.inquireLabel}</Link>
        </div>
        <div style={{ marginTop: 'clamp(32px, 4vw, 64px)' }}>
          {data.glance.rows.map((row, i) => (
            <div key={row.label} className="sg-glance-row">
              <p className="sg-paren-num" style={{ margin: 0 }}>({pad2(i + 1)})</p>
              <h3 className="sg-glance-label">{row.label}</h3>
              <ul className="sg-dot-list sg-glance-list">
                {row.items.map(item => <li key={item}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          10 · IMPACT MARQUEE
      ════════════════════════════════════════════════════════════ */}
      <section className="sg-impact-marquee" data-reveal>
        <MarqueeRow text="IMPACT * " className="sg-marquee--impact" />
      </section>

      {/* ════════════════════════════════════════════════════════════
          11 · IMPACT ITEMS — big numerals
      ════════════════════════════════════════════════════════════ */}
      <section className="sg-section" data-reveal>
        <div className="sg-impact-grid">
          {data.impactItems.map((item, i) => (
            <div key={item.title} className="sg-impact-item">
              <p className="sg-impact-num">{pad2(i + 1)}.</p>
              <h3 className="sg-case-title">{item.title}</h3>
              <p className="sg-body">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          12 · FINAL CTA
      ════════════════════════════════════════════════════════════ */}
      <section className="sg-section sg-final" data-reveal>
        <h2 className="sg-title sg-final-title">
          {data.finalCta.titleLines.map(l => <span key={l} style={{ display: 'block' }}>{l}</span>)}
        </h2>
        <p style={{ margin: 'clamp(28px, 3vw, 48px) 0 0' }}>
          <Link href={data.finalCta.href} className="sg-ulink sg-ulink--big">{data.finalCta.label}</Link>
        </p>
        <p style={{ marginTop: 24 }}>
          <Link href="/diagnostic" className="sg-ulink" style={{ fontSize: 'max(13px, 1vw)' }}>
            Or book the free diagnostic call →
          </Link>
        </p>
      </section>

      {/* ── Styles ────────────────────────────────────────────────── */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* Side gutters. Left is pushed past the fixed header's stacked logo
           (which overhangs to ~5vw + 44px) so titles/body never collide with it.
           Right stays at 5vw so it lines up with the header's LET'S SYNC / MENU. */
        .sg-root { --sg-l: 5vw; --sg-r: 5vw; }
        @media (min-width: 768px) { .sg-root { --sg-l: calc(5vw + 3.75rem); } }

        /* Shared voice */
        .sg-grid {
          display: grid; grid-template-columns: repeat(12, 1fr);
          column-gap: 1.6vw; row-gap: 32px; align-items: start;
        }
        .sg-section { padding: clamp(56px, 7vw, 130px) var(--sg-r) clamp(56px, 7vw, 130px) var(--sg-l); background: #FFFFFF; }
        .sg-small-label {
          font-family: ${PP}; font-weight: 400; font-size: max(12px, 1.4vw); line-height: 1.38;
          color: #292929; text-transform: uppercase; letter-spacing: 0.04em; margin: 0;
        }
        .sg-scroll-label {
          font-family: ${PP}; font-weight: 400; font-size: 12px; letter-spacing: 0.18em;
          text-transform: uppercase; color: #919191;
        }
        .sg-col-label { grid-column: 1 / span 3; }
        .sg-about-col { grid-column: 6 / span 7; }
        .sg-statement {
          font-family: ${PP}; font-weight: 400; font-size: 3.33vw; line-height: 1.14;
          color: #292929; letter-spacing: -0.01em; margin: 0 0 3.3vw; text-wrap: pretty; max-width: 44vw;
          text-transform: none;
        }
        .sg-body {
          font-family: ${PP}; font-weight: 400; font-size: max(14px, 1.4vw); line-height: 1.38;
          color: #919191; margin: 0; text-wrap: pretty;
        }
        .sg-built-lead { color: #919191; margin: 3vw 0 1.4vw; }
        .sg-about-body { max-width: 37vw; }
        .sg-title {
          font-family: ${PP}; font-weight: 400; font-size: 6.9vw; line-height: 1;
          text-transform: uppercase; color: #292929; letter-spacing: 0; margin: 0;
        }
        .sg-title--huge { font-size: 10.67vw; line-height: 1.1; }
        .sg-paren-num {
          font-family: ${PP}; font-weight: 400; font-size: max(13px, 1.4vw); line-height: 1.38;
          color: ${RED}; font-variant-numeric: tabular-nums; margin: 0 0 10px;
        }
        .sg-counter {
          font-family: ${PP}; font-weight: 400; font-size: max(13px, 1.4vw);
          color: #292929; font-variant-numeric: tabular-nums; margin: 0;
        }

        /* CTA = underlined text link, sentence case — never a boxed button */
        .sg-ulink {
          font-family: ${PP}; font-weight: 400; font-size: max(14px, 1.4vw); color: #292929;
          text-decoration: none; border-bottom: 3px double #292929; padding-bottom: 2px;
          transition: color 220ms ${EASE}, border-color 220ms ${EASE};
        }
        .sg-ulink--big { font-size: max(17px, 1.7vw); }
        .sg-ulink:hover { color: ${RED}; border-color: ${RED}; }
        .sg-ulink:focus-visible { outline: 2px solid ${RED}; outline-offset: 4px; }

        /* Dot lists — big black markers, reference spacing */
        .sg-dot-list { list-style: none; margin: 0; padding: 0; }
        .sg-dot-list li {
          position: relative;
          font-family: ${PP}; font-weight: 400; font-size: max(14px, 1.4vw); line-height: 1.4;
          color: #292929; padding: 0.5vw 0 0.5vw 1.85vw;
        }
        .sg-dot-list li::before {
          content: ''; position: absolute; left: 0; top: calc(0.5vw + 0.42em);
          width: 0.55em; height: 0.55em; border-radius: 50%; background: #292929;
        }

        /* Marquees */
        .sg-marquee { overflow: hidden; width: 100%; }
        .sg-marquee-track { display: flex; width: max-content; animation: sg-scroll 60s linear infinite; }
        .sg-marquee-track span {
          font-family: ${PP}; font-weight: 400; text-transform: uppercase;
          color: #292929; white-space: nowrap; display: block;
        }
        @keyframes sg-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        /* Big marquees use the Extended Ultrabold face (900) — the same one every page hero uses */
        .sg-marquee--hero .sg-marquee-track span { font-weight: 900; font-size: clamp(88px, 13vw, 185px); letter-spacing: -0.03em; line-height: 0.9; }
        .sg-marquee--trusted .sg-marquee-track { animation-duration: 45s; }
        .sg-marquee--trusted .sg-marquee-track span { font-size: 2.6vw; line-height: 1.2; color: #919191; }
        .sg-marquee--impact .sg-marquee-track span { font-weight: 900; font-size: clamp(88px, 13vw, 185px); letter-spacing: -0.03em; line-height: 0.9; }

        /* 1 · Hero */
        .sg-hero {
          min-height: 100svh; background: #FFFFFF;
          display: flex; flex-direction: column;
          padding-top: clamp(96px, 12vh, 150px);
        }
        .sg-hero-body { padding: clamp(32px, 4vw, 64px) var(--sg-r) 0 var(--sg-l); }
        .sg-hero-sub {
          font-family: ${PP}; font-weight: 400; font-size: 3.33vw; line-height: 1.14;
          color: #292929; letter-spacing: -0.01em; margin: 0; max-width: 70vw; text-wrap: pretty;
        }
        .sg-hero-ctas { display: flex; align-items: center; gap: clamp(24px, 3vw, 48px); margin-top: clamp(28px, 3.2vw, 52px); flex-wrap: wrap; }
        .sg-hero-foot {
          margin-top: auto; display: flex; justify-content: flex-end;
          padding: 0 var(--sg-r) clamp(24px, 3vh, 40px) var(--sg-l);
        }

        /* 2 · Media */
        .sg-media {
          position: relative; width: 100%; height: 100vh; overflow: hidden;
          margin-bottom: clamp(48px, 10vw, 190px);
        }

        /* 4 · Trusted by */
        .sg-trusted { padding: clamp(40px, 5vw, 80px) 0 clamp(48px, 6vw, 100px); background: #FFFFFF; }
        .sg-trusted .sg-small-label { margin-bottom: clamp(24px, 3vw, 48px); }

        /* 5 · Strategic case */
        .sg-case-items { grid-column: 1 / span 5; display: flex; flex-direction: column; gap: clamp(28px, 3vw, 48px); align-items: flex-start; }
        .sg-case-item { max-width: 26vw; }
        .sg-case-title {
          font-family: ${PP}; font-weight: 400; font-size: max(15px, 1.4vw); line-height: 1.38;
          color: #292929; margin: 0 0 8px; text-transform: none;
        }
        .sg-case-media {
          grid-column: 7 / span 6; position: relative; width: 100%;
          aspect-ratio: 4 / 5; overflow: hidden;
        }

        /* 6 · Gallery — drag to slide */
        .sg-gallery-section { padding: clamp(56px, 7vw, 130px) 0; background: #FFFFFF; }
        .sg-gallery-head { padding: 0 var(--sg-r) 0 var(--sg-l); margin-bottom: clamp(24px, 2.6vw, 44px); }
        .sg-gallery {
          display: flex; gap: 1.6vw; overflow-x: auto; scroll-snap-type: x proximity;
          padding: 0 var(--sg-r) 0 var(--sg-l); scrollbar-width: none;
        }
        .sg-gallery::-webkit-scrollbar { display: none; }
        .sg-slide {
          flex: 0 0 65vw; position: relative; aspect-ratio: 3 / 2;
          scroll-snap-align: start; overflow: hidden;
        }
        .sg-drag { cursor: grab; user-select: none; }
        .sg-drag.sg-dragging { cursor: grabbing; scroll-snap-type: none; scroll-behavior: auto; }
        .sg-gallery-counter { padding: clamp(20px, 2.2vw, 36px) var(--sg-r) 0 var(--sg-l); }

        /* 7 · Phases accordion */
        .sg-phase { border-top: 1px solid #E8E8E8; }
        .sg-phase-head {
          display: grid; grid-template-columns: 5rem 1fr auto; column-gap: 1.6vw; align-items: baseline;
          width: 100%; background: none; border: none; cursor: pointer; text-align: left;
          padding: clamp(18px, 2vw, 32px) 0;
        }
        .sg-phase-head:focus-visible { outline: 2px solid ${RED}; outline-offset: 4px; }
        .sg-phase-title {
          font-family: ${PP}; font-weight: 400; font-size: 3.33vw; line-height: 1.14;
          color: #292929; letter-spacing: -0.01em;
        }
        .sg-phase-toggle {
          font-family: ${PP}; font-weight: 400; font-size: max(22px, 2.2vw); line-height: 1;
          color: ${RED}; transition: transform 300ms ${EASE};
        }
        .sg-phase--open .sg-phase-toggle { transform: rotate(45deg); }
        .sg-phase-reveal { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 480ms ${EASE}; }
        .sg-phase-clip { overflow: hidden; visibility: hidden; transition: visibility 0s 480ms; }
        .sg-phase--open .sg-phase-reveal { grid-template-rows: 1fr; }
        .sg-phase--open .sg-phase-clip { visibility: visible; transition: visibility 0s; }
        .sg-phase-body { padding: 0.5vw 0 clamp(28px, 3vw, 48px) calc(5rem + 1.6vw); max-width: 640px; }

        /* 8 · Words — draggable cards (light surface so they read on white) */
        .sg-words-section { padding: clamp(56px, 7vw, 130px) 0; background: #FFFFFF; }
        .sg-words-sub { grid-column: 9 / span 4; padding-top: 1vw; }
        .sg-words-row {
          display: flex; gap: clamp(12px, 1.9vw, 24px); overflow-x: auto;
          scroll-snap-type: x proximity; padding: clamp(40px, 5vw, 90px) var(--sg-r) 0 var(--sg-l);
          scrollbar-width: none;
        }
        .sg-words-row::-webkit-scrollbar { display: none; }
        .sg-word-card {
          flex: 0 0 43.4vw; min-height: 28vw;
          background: #F7F7F7; border-radius: 8px;
          padding: clamp(28px, 5.3vw, 96px);
          display: flex; flex-direction: column; justify-content: space-between; gap: 32px;
          scroll-snap-align: start;
        }
        .sg-word-name { font-family: ${PP}; font-weight: 400; font-size: max(14px, 1.4vw); color: #292929; margin: 0; }
        .sg-word-company { font-family: ${PP}; font-weight: 400; font-size: max(14px, 1.4vw); color: #919191; margin: 4px 0 0; }
        .sg-quote {
          font-family: ${PP}; font-weight: 400; font-size: max(16px, 1.73vw); line-height: 1.38;
          color: #292929; margin: 0; text-wrap: pretty;
        }

        /* 9 · Glance */
        .sg-glance-head { display: flex; justify-content: space-between; align-items: flex-end; gap: 24px; flex-wrap: wrap; }
        .sg-glance-row {
          display: grid; grid-template-columns: 5rem 1fr 1.4fr; column-gap: 1.6vw;
          padding: clamp(24px, 2.6vw, 44px) 0; border-top: 1px solid #E8E8E8; align-items: start;
        }
        .sg-glance-row:first-of-type { border-top: none; }
        .sg-glance-label {
          font-family: ${PP}; font-weight: 400; font-size: 3.33vw; line-height: 1.14;
          color: #292929; letter-spacing: -0.01em; margin: 0; text-transform: none;
          width: min-content;
        }
        .sg-glance-list li { border-bottom: none; }

        /* 10 · Impact marquee */
        .sg-impact-marquee { padding: clamp(32px, 4vw, 64px) 0; border-top: 1px solid #E8E8E8; border-bottom: 1px solid #E8E8E8; background: #FFFFFF; }

        /* 11 · Impact items */
        .sg-impact-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: clamp(32px, 4vw, 64px) 1.6vw; }
        .sg-impact-num {
          font-family: ${PP}; font-weight: 400; font-size: 8.2vw; line-height: 1;
          color: #292929; margin: 0 0 clamp(12px, 1.6vw, 28px); font-variant-numeric: tabular-nums;
        }
        .sg-impact-item .sg-case-title { margin-bottom: 8px; }
        .sg-impact-item .sg-body { max-width: 24vw; }

        /* 12 · Final CTA */
        .sg-final { padding-left: calc(var(--sg-l) + 7.6vw); padding-bottom: clamp(96px, 12vw, 200px); }
        .sg-final-title { max-width: 60vw; }

        /* Reveal */
        [data-reveal] { opacity: 0; transform: translateY(12px); transition: opacity 600ms ${EASE}, transform 600ms ${EASE}; }
        [data-reveal].reveal-in { opacity: 1; transform: none; }

        /* Responsive */
        @media (max-width: 1023px) {
          .sg-col-label, .sg-about-col { grid-column: 1 / -1; }
          .sg-about-body { max-width: none; }
          .sg-statement { max-width: none; font-size: clamp(24px, 4.6vw, 40px); }
          .sg-hero-sub { font-size: clamp(20px, 4.6vw, 40px); max-width: none; }
          .sg-case-items { grid-column: 1 / -1; }
          .sg-case-item { max-width: none; }
          .sg-case-media { grid-column: 1 / -1; aspect-ratio: 4 / 5; }
          .sg-words-sub { grid-column: 1 / -1; padding-top: 0; }
          .sg-word-card { flex: 0 0 70vw; min-height: 0; }
          .sg-impact-grid { grid-template-columns: 1fr 1fr; }
          .sg-impact-item .sg-body { max-width: none; }
          .sg-final { padding-left: 5vw; }
          .sg-final-title { max-width: none; }
        }
        @media (max-width: 767px) {
          .sg-body, .sg-dot-list li, .sg-case-title, .sg-word-name, .sg-word-company { font-size: 14px; }
          .sg-small-label { font-size: 12px; }
          .sg-ulink { font-size: 14px; }
          .sg-ulink--big { font-size: 17px; }
          .sg-title { font-size: clamp(34px, 9vw, 56px); }
          .sg-title--huge { font-size: clamp(40px, 12vw, 72px); }
          .sg-phase-title { font-size: clamp(22px, 6vw, 34px); }
          .sg-phase-head { grid-template-columns: 3rem 1fr auto; }
          .sg-phase-body { padding-left: 0; }
          .sg-dot-list li { padding-left: 24px; }
          .sg-dot-list li::before { top: calc(0.5vw + 0.42em); }
          .sg-glance-row { grid-template-columns: 3rem 1fr; row-gap: 16px; }
          .sg-glance-list { grid-column: 2; }
          .sg-glance-label { font-size: clamp(22px, 6vw, 34px); width: auto; }
          .sg-slide { flex: 0 0 86vw; }
          .sg-word-card { flex: 0 0 86vw; padding: 28px; }
          .sg-quote { font-size: 16px; }
          .sg-media { height: 60vh; }
          .sg-impact-grid { grid-template-columns: 1fr; }
          .sg-impact-num { font-size: clamp(48px, 14vw, 72px); }
          .sg-marquee--trusted .sg-marquee-track span { font-size: 18px; }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .sg-marquee-track { animation: none; }
          .sg-phase-reveal, .sg-phase-toggle, .sg-ulink { transition: none; }
          [data-reveal] { opacity: 1; transform: none; transition: none; }
        }
      ` }} />

    </div>
  )
}
