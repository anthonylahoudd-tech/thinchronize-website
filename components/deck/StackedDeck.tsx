'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const PP   = "'PPNeueCorp', system-ui, sans-serif"
const RED  = '#D0274B'
const EASE = 'cubic-bezier(0.19, 1, 0.22, 1)' // matches PageHero

// ─── Shared stacked-card deck ─────────────────────────────────────────────────
// Layout cloned from the reference (wearemotto.com/services). Grid margins sit
// at 5vw so titles align with the logo and numbers align with the MENU. Motion
// decoded from their bundle: as the next card covers, the pinned card dims
// (black overlay 0 → 0.5) AND recedes upward (translateY 0 → −60% of its own
// height), both linear against the same one-viewport scroll window.

export interface DeckCardData {
  id: string
  num: string
  title: string
  para: string
  lists: [string[], string[]]
  note?: string
  cta: { label: string; href: string }
  img: { src: string; alt: string }
  /** Hero treatment: red top border + red number (the flagship card). */
  accent?: boolean
}

export default function StackedDeck({ cards, label }: { cards: DeckCardData[]; label?: string }) {
  const deckRef = useRef<HTMLDivElement>(null)

  // Reference mechanics: card pins with its bottom at the fold
  // (top = min(0, vh − cardHeight)); the covering element drives dim + recede.
  // Every card participates; the last is covered by the section after the deck.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const deck = deckRef.current
    if (!deck) return
    const els = Array.from(deck.querySelectorAll<HTMLElement>('.m-card'))
    const overlays = els.map(c => c.querySelector<HTMLElement>('.m-dim'))
    const afterDeck = deck.parentElement?.nextElementSibling as HTMLElement | null
    const coverOf = els.map((_, i) => els[i + 1] ?? afterDeck)
    const isDesktop = () => window.innerWidth >= 768

    const setTops = () => {
      for (const c of els) c.style.top = `${Math.min(0, window.innerHeight - c.offsetHeight)}px`
      if (!isDesktop()) {
        els.forEach(c => { c.style.transform = '' })
        overlays.forEach(o => { if (o) o.style.opacity = '0' })
      }
    }

    const onScroll = () => {
      if (!isDesktop()) return
      const vh = window.innerHeight
      els.forEach((card, i) => {
        const cover = coverOf[i]
        if (!cover) return
        const p = Math.min(1, Math.max(0, 1 - cover.getBoundingClientRect().top / vh))
        if (overlays[i]) overlays[i]!.style.opacity = (0.5 * p).toFixed(3)
        card.style.transform = p > 0 ? `translate3d(0, ${(-0.6 * card.offsetHeight * p).toFixed(1)}px, 0)` : ''
      })
    }

    setTops()
    // Re-measure once images are in and on resize — card height drives the sticky top.
    const t = window.setTimeout(setTops, 600)
    window.addEventListener('resize', setTops)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.clearTimeout(t)
      window.removeEventListener('resize', setTops)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <>
      {label && (
        <div className="m-grid" style={{ paddingTop: 'clamp(24px, 2.7vw, 48px)', paddingBottom: 'clamp(20px, 2.2vw, 40px)' }}>
          <p style={{
            gridColumn: '1 / -1', fontFamily: PP, fontWeight: 400, fontSize: 'clamp(11px, 0.9vw, 14px)',
            letterSpacing: '0.18em', textTransform: 'uppercase', color: '#919191', margin: 0,
          }}>
            {label}
          </p>
        </div>
      )}

      <div ref={deckRef}>
        {cards.map(card => (
          <article key={card.id} id={card.id} className={`m-card${card.accent ? ' m-card--accent' : ''}`}>

            {/* Dim overlay — driven by scroll as the next card covers this one */}
            <div className="m-dim" aria-hidden="true" />

            {/* Header: title left, number right — same size */}
            <div className="m-grid m-head">
              <div className="m-head-row">
                <h2 className="m-title">{card.title}</h2>
                <span className="m-title m-num" aria-hidden="true">{card.num}</span>
              </div>
            </div>

            {/* Body: divider, paragraph + lists left (9 cols), media right (3 cols) */}
            <div className="m-body">
              <div className="m-grid m-body-grid">
                <div className="m-body-left">
                  <p className="m-para">{card.para}</p>
                  <div className="m-lists">
                    <ul className="m-list">
                      {card.lists[0].map(item => <li key={item}>{item}</li>)}
                    </ul>
                    <ul className="m-list">
                      {card.lists[1].map(item => <li key={item}>{item}</li>)}
                    </ul>
                    <Link href={card.cta.href} className="m-cta">{card.cta.label}</Link>
                  </div>
                  {card.note && <p className="m-note">{card.note}</p>}
                </div>
                <div className="m-media">
                  <Image
                    src={card.img.src}
                    alt={card.img.alt}
                    fill
                    sizes="(max-width: 767px) 89vw, 21vw"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </div>
            </div>

          </article>
        ))}
      </div>

      {/* ── Deck styles ── */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* Grid aligned with the site chrome: logo left 5vw, MENU right 5vw */
        .m-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          column-gap: 1.6vw;
          margin: 0 5vw;
        }

        /* Card: page-coloured, hairline-separated, bottom-pinned sticky */
        .m-card {
          position: sticky;
          top: 0; /* corrected per card by JS: min(0, vh − cardHeight) */
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 100vh;
          background: #FFFFFF;
          border-top: 1px solid #E8E8E8;
        }
        .m-card--accent { border-top: 2px solid ${RED}; }
        .m-card--accent .m-num { color: ${RED}; }
        .m-dim {
          position: absolute;
          inset: 0;
          z-index: 4;
          background: #000000;
          opacity: 0;
          pointer-events: none;
        }

        /* Header: title left, number right — same size, generous air below */
        .m-head {
          padding-top: 2.7vw;
          padding-bottom: 10vw;
          margin-bottom: auto;
        }
        .m-head-row {
          grid-column: 1 / -1;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding-bottom: 2.7vw;
        }
        .m-title {
          font-family: ${PP};
          font-weight: 400;
          font-size: 6.9vw;
          line-height: 1;
          text-transform: uppercase;
          letter-spacing: 0;
          color: #292929;
          margin: 0;
        }
        .m-num { font-variant-numeric: tabular-nums; }

        /* Body: hairline divider, then 9/3 split */
        .m-body {
          margin-top: auto;
          position: relative;
          z-index: 3;
          border-top: 1px solid #E8E8E8;
        }
        .m-body-grid { padding-top: 2.7vw; }
        .m-body-left { grid-column: 1 / span 9; display: flex; flex-direction: column; }
        .m-para {
          font-family: ${PP};
          font-weight: 400;
          font-size: 2.6vw;
          line-height: 1.14;
          color: #292929;
          max-width: 60vw;
          margin: 0 0 7vw;
          text-wrap: pretty;
        }
        .m-lists {
          display: flex;
          justify-content: space-between;
          align-items: stretch;
          max-width: 53.3vw;
          padding-bottom: 2vw;
        }
        .m-list {
          list-style: none;
          margin: 0;
          padding: 0;
          font-family: ${PP};
          font-weight: 400;
          font-size: max(14px, 1.4vw);
          line-height: 1.38;
          color: #292929;
        }
        .m-cta {
          margin-top: auto;
          align-self: flex-start;
          font-family: ${PP};
          font-weight: 400;
          font-size: max(14px, 1.4vw);
          line-height: 1.38;
          color: #292929;
          text-decoration: none;
          border-bottom: 3px double #292929;
          padding-bottom: 2px;
          transition: color 220ms ${EASE}, border-color 220ms ${EASE};
        }
        .m-cta:hover { color: ${RED}; border-color: ${RED}; }
        .m-cta:active { opacity: 0.7; }
        .m-cta:focus-visible { outline: 2px solid ${RED}; outline-offset: 4px; }
        .m-note {
          font-family: ${PP};
          font-weight: 400;
          font-size: max(12px, 0.95vw);
          color: #919191;
          line-height: 1.5;
          margin: -4vw 0 0;
          padding-bottom: 6vw;
        }
        .m-body-left:has(.m-note) .m-lists { padding-bottom: 5vw; }
        .m-body-left:not(:has(.m-note)) .m-lists { padding-bottom: 8vw; }

        .m-media {
          grid-column: 10 / span 3;
          position: relative;
          width: 100%;
          aspect-ratio: 270 / 330;
          overflow: hidden;
        }

        /* ── Responsive ── */
        @media (max-width: 767px) {
          .m-dim { display: none; }
          .m-num { display: none; }
          .m-head { padding-top: 32px; padding-bottom: 64px; }
          .m-title { font-size: clamp(40px, 11vw, 64px); }
          .m-body-grid { padding-top: 24px; padding-bottom: 40px; }
          .m-body-left { grid-column: 1 / -1; }
          .m-para { font-size: 18px; line-height: 1.4; max-width: none; margin-bottom: 40px; }
          .m-lists { flex-direction: column; gap: 24px; max-width: none; padding-bottom: 32px !important; }
          .m-list { font-size: 14px; }
          .m-cta { margin-top: 8px; font-size: 14px; }
          .m-note { font-size: 12px; margin-top: 0 !important; padding-bottom: 32px; }
          .m-media { grid-column: 1 / -1; margin-bottom: 40px; }
        }

        /* ── Reduced motion: no pinning, no dim/parallax ── */
        @media (prefers-reduced-motion: reduce) {
          .m-card { position: static; min-height: 0; transform: none !important; }
          .m-dim { display: none; }
          .m-cta { transition: none; }
        }
      ` }} />
    </>
  )
}
