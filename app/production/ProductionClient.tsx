'use client'

import { useEffect } from 'react'
import PageHero, { H } from '@/components/ui/PageHero'
import StackedDeck, { type DeckCardData } from '@/components/deck/StackedDeck'
import ClosingStrip from '@/components/deck/ClosingStrip'

const PP = "'PPNeueCorp', system-ui, sans-serif"

// Legacy /services#slug deep-links: some content moved pages, some cards renamed.
const HASH_REDIRECTS: Record<string, string> = {
  'brand-audit': '/research#brand-audit',
  'research': '/research#research',
  'tools': '/research',
  'diagnostics': '/research',
  'brand-engagement': '/programs#brand-engagement',
  'brand-guardianship': '/programs#brand-guardianship',
  'brand-clarity': '/programs#brand-clarity',
  'brand-refresh': '/programs#brand-identity',
  'programs': '/programs',
}
const HASH_ALIASES: Record<string, string> = {
  'digital-design': 'social-digital',
  'animation-editing': 'motion-animation',
  'motion': 'motion-animation',
  'photography-videography': 'photo-video',
  'web-ui': 'production-list',
  'production': 'production-list',
  'alumni-section': 'alumni',
}

// Production — six category cards per the 2026-07-15 dev brief (no Web/UI card;
// Photography & Videography instead). Prices from PRICING-CANON v2.1 Section B/C.

const CARDS: DeckCardData[] = [
  {
    id: 'social-digital',
    num: '01',
    title: 'Social',
    para: 'The brand, working every day across feeds and screens — designed pieces and monthly systems that keep the output coherent.',
    lists: [
      ['Posts, stories, carousels', 'Campaign key visuals', 'Monthly 12-post design systems'],
      ['From $100/piece', 'Systems from $1,500/mo', '2 revision rounds always'],
    ],
    cta: { label: 'Explore Social / Digital', href: '/production/social-digital' },
    img: { src: '/images/work/cafe-bdooz/Cover-Bdooz.jpg', alt: 'Café Bdooz — social content by Thinchronize' },
  },
  {
    id: 'print-editorial',
    num: '02',
    title: 'Print',
    para: 'Every physical touchpoint as a brand moment — from a one-pager to the annual report, print-ready and supervised to press.',
    lists: [
      ['Brochures, company profiles, annual reports', 'Menus, decks, stationery', 'Print-ready, supervised'],
      ['From $250', 'Annual reports from $3,500', 'NGO-fluent'],
    ],
    cta: { label: 'Explore Print & Editorial', href: '/production/print-editorial' },
    img: { src: '/images/work/whatsub/Whatsub-Image-1.jpg', alt: 'Whatsub — print and editorial by Thinchronize' },
  },
  {
    id: 'brand-extension',
    num: '03',
    title: 'Extension',
    para: 'The system stretched into new applications without losing itself — sub-brands, campaigns, kits, and guideline updates built inside your identity.',
    lists: [
      ['Sub-brand & campaign identities', 'Icon sets, template kits', 'Guideline updates, activation kits'],
      ['From $650', 'Campaign identity $3,500', 'Built inside your system'],
    ],
    cta: { label: 'Explore Brand Extension', href: '/production/brand-extension' },
    img: { src: '/images/work/latelier/Latelier-Image-1.jpeg', alt: "L'Atelier — brand extension by Thinchronize" },
  },
  {
    id: 'packaging',
    num: '04',
    title: 'Packaging',
    para: 'The first moment a customer physically meets the product — labels, packs, and full SKU lines, dieline-ready and supervised to print.',
    lists: [
      ['Labels & single packs', 'Full SKU lines (3–5)', 'Mockups + print supervision'],
      ['From $400/SKU adapt', 'Lines from $5,000', 'Dieline-ready'],
    ],
    cta: { label: 'Explore Packaging', href: '/production/packaging' },
    img: { src: '/images/work/lebneniyet/Lebneniyet-1.jpeg', alt: 'Lebneniyet — packaging by Thinchronize' },
  },
  {
    id: 'motion-animation',
    num: '05',
    title: 'Motion',
    para: 'The brand in motion, with strategic intent — idents, social motion, promos, and explainers, storyboarded before frame one.',
    lists: [
      ['Logo animation (simple/advanced)', 'Social motion, promos', '30–60s explainers'],
      ['From $400', 'Explainers $5,000', 'Storyboard before frame one'],
    ],
    cta: { label: 'Explore Motion / Animation', href: '/production/motion' },
    img: { src: '/images/work/don-bosco/Don-Bosco-10.jpeg', alt: 'Don Bosco — motion work by Thinchronize' },
  },
  {
    id: 'photo-video',
    num: '06',
    title: 'Photo & Film',
    para: 'Your brand, made real — shoots and films directed by thinc. against the brand strategy, produced with vetted partners. Not stock. Not generic.',
    lists: [
      ['Brand shoots, product, food', 'Video production & brand film', 'Directed by thinc., produced by vetted partners'],
      ['Partner quote + direction fee', 'One team, our quality bar', 'Art direction always in-house'],
    ],
    cta: { label: 'Explore Photography & Video', href: '/production/photo-video' },
    img: { src: '/images/work/karma-ngo/Karma-Coverr.png', alt: 'Karma NGO — photography direction by Thinchronize' },
  },
]

export default function ProductionClient() {
  useEffect(() => {
    const applyHash = () => {
      const slug = window.location.hash.replace('#', '')
      if (!slug) return
      if (HASH_REDIRECTS[slug]) {
        window.location.replace(HASH_REDIRECTS[slug])
        return
      }
      const target = HASH_ALIASES[slug] ?? slug
      requestAnimationFrame(() => {
        document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    }
    applyHash()
    window.addEventListener('hashchange', applyHash)
    return () => window.removeEventListener('hashchange', applyHash)
  }, [])

  return (
    <div style={{ backgroundColor: '#FFFFFF' }}>

      <PageHero
        title="PRODUCTION"
        lines={[
          'Open to everyone. Every piece pulling in',
          <>the <H>same direction</H>.</>,
        ]}
        bottomLabel="View all production"
        bottomHref="#production-list"
      />

      <section id="production-list" style={{ backgroundColor: '#FFFFFF' }}>
        <StackedDeck cards={CARDS} label="Make It, Properly" />
      </section>

      {/* Alumni — a status, not a service: closing banner strip, not a card */}
      <section id="alumni" style={{
        backgroundColor: '#292929',
        padding: 'clamp(48px, 6vw, 96px) 5vw',
        position: 'relative',
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: PP, fontWeight: 400, fontSize: 11, letterSpacing: '0.18em',
          textTransform: 'uppercase', color: '#D0274B', margin: 0,
        }}>
          Brand Alumni
        </p>
        <h2 style={{
          fontFamily: PP, fontWeight: 400, fontSize: 'clamp(22px, 2.8vw, 40px)',
          textTransform: 'uppercase', color: '#FFFFFF', lineHeight: 1.25,
          letterSpacing: '-0.01em', margin: '18px auto 0', maxWidth: 980, textWrap: 'balance',
        }}>
          Loyalty is recognized, not sold — $10,000 of work with us, any mix, and all production is 25–30% off. Forever.
        </h2>
        <p style={{
          fontFamily: PP, fontWeight: 400, fontSize: 13, color: 'rgba(255,255,255,0.5)',
          lineHeight: 1.6, margin: '20px auto 0', maxWidth: 720,
        }}>
          Applies to production — Social / Digital · Print & Editorial · Brand Extension · Packaging · Motion · Photography & Video. Never applies to programs or advisory.
        </p>
      </section>

      <ClosingStrip
        links={[
          { lead: 'Not sure what you need?', label: 'Try the Diagnostic', href: '/diagnostic', primary: true },
          { lead: 'Building from the ground up?', label: 'See the Programs', href: '/programs' },
        ]}
      />

    </div>
  )
}
