'use client'

import { memo, useEffect, useRef } from 'react'
import { transitionTo } from '@/lib/pageTransition'

const EASE_OPEN  = 'cubic-bezier(0.76, 0, 0.24, 1)'
const EASE_CLOSE = 'cubic-bezier(0.23, 1, 0.22, 1)'
const EASE_LINK  = 'cubic-bezier(0.23, 1, 0.32, 1)'

const NAV_LINKS = [
  { num: '01', label: 'Home',      href: '/'          },
  { num: '02', label: 'Services',  href: '/services'  },
  { num: '03', label: 'Method',    href: '/method'    },
  { num: '04', label: 'About',     href: '/about'     },
  { num: '05', label: 'Portfolio', href: '/portfolio' },
  { num: '06', label: 'Journal',   href: '/journal'   },
]

interface Props {
  open:    boolean
  onClose: () => void
}

function MenuOverlay({ open, onClose }: Props) {
  const panelRef   = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const scrollRef  = useRef<HTMLDivElement>(null)
  const listRef    = useRef<HTMLDivElement>(null)
  const linkRefs   = useRef<(HTMLButtonElement | null)[]>([])
  const timers     = useRef<ReturnType<typeof setTimeout>[]>([])

  // ── Infinite scroll: reset position when we pass the first full list ─────────
  useEffect(() => {
    const el   = scrollRef.current
    const list = listRef.current
    if (!el || !list) return
    const onScroll = () => {
      if (el.scrollTop >= list.offsetHeight) el.scrollTop -= list.offsetHeight
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  // ── Open / close animation ────────────────────────────────────────────────────
  useEffect(() => {
    const panel   = panelRef.current
    const content = contentRef.current
    if (!panel || !content) return

    timers.current.forEach(clearTimeout)
    timers.current = []

    if (open) {
      // Reset scroll
      if (scrollRef.current) scrollRef.current.scrollTop = 0

      // Hide original links (clone stays visible so loop looks seamless)
      linkRefs.current.forEach(el => {
        if (!el) return
        el.style.transition = 'none'
        el.style.opacity    = '0'
        el.style.transform  = 'translateY(40px)'
      })

      // Snap panel to start
      panel.style.transition   = 'none'
      content.style.transition = 'none'
      panel.style.transform    = 'translateY(-100%)'
      content.style.transform  = 'translateY(100%)'

      // Slide IN
      requestAnimationFrame(() => requestAnimationFrame(() => {
        panel.style.transition   = `transform 600ms ${EASE_OPEN}`
        content.style.transition = `transform 600ms ${EASE_OPEN}`
        panel.style.transform    = 'translateY(0%)'
        content.style.transform  = 'translateY(0%)'
      }))

      // Stagger links once panel has landed
      const tStagger = setTimeout(() => {
        linkRefs.current.forEach((el, i) => {
          if (!el) return
          el.style.transition = `opacity 600ms ${EASE_LINK} ${i * 55}ms,
                                  transform 600ms ${EASE_LINK} ${i * 55}ms`
          el.style.opacity    = '1'
          el.style.transform  = 'translateY(0px)'
        })
      }, 600)
      timers.current.push(tStagger)

      // Auto-scroll hint: nudge down then back, tells user list is scrollable
      const tHint = setTimeout(() => {
        const el = scrollRef.current
        if (!el) return
        el.scrollTo({ top: 120, behavior: 'smooth' })
        const tBack = setTimeout(() => el.scrollTo({ top: 0, behavior: 'smooth' }), 600)
        timers.current.push(tBack)
      }, 700)
      timers.current.push(tHint)

    } else {
      panel.style.transition   = `transform 500ms ${EASE_CLOSE}`
      content.style.transition = `transform 500ms ${EASE_CLOSE}`
      panel.style.transform    = 'translateY(-100%)'
      content.style.transform  = 'translateY(100%)'
    }
  }, [open])

  // Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape' && open) onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const handleNav = (href: string) => {
    onClose()
    transitionTo(href)
  }

  // ── Link list (rendered twice for infinite scroll) ────────────────────────────
  const renderLinks = (withRefs: boolean) =>
    NAV_LINKS.map((link, i) => (
      <button
        key={link.label + (withRefs ? '-a' : '-b')}
        ref={withRefs ? (el => { linkRefs.current[i] = el }) : undefined}
        onClick={() => handleNav(link.href)}
        className="menu-link"
        style={withRefs ? { opacity: 0, transform: 'translateY(40px)' } : undefined}
      >
        <span className="menu-link__num">{link.num}</span>
        <span className="menu-link__text">{link.label.toUpperCase()}</span>
      </button>
    ))

  return (
    <div
      ref={panelRef}
      style={{
        position:        'fixed',
        inset:           0,
        zIndex:          100,
        backgroundColor: '#0a0a0a',
        transform:       'translateY(-100%)',
        overflow:        'hidden',
        pointerEvents:   open ? 'auto' : 'none',
        willChange:      'transform',
      }}
    >
      <div
        ref={contentRef}
        style={{
          position:      'absolute',
          inset:         0,
          display:       'flex',
          flexDirection: 'column',
          transform:     'translateY(100%)',
          willChange:    'transform',
        }}
      >
        {/* ── Top row: CLOSE ── */}
        <div style={{
          display:        'flex',
          justifyContent: 'flex-end',
          alignItems:     'center',
          padding:        '28px 40px',
          flexShrink:     0,
        }}>
          <button
            onClick={onClose}
            style={{
              fontFamily:          "'PPNeueCorp', system-ui, sans-serif",
              fontWeight:          400,
              fontSize:            13,
              letterSpacing:       '3px',
              textTransform:       'uppercase',
              color:               'white',
              background:          'none',
              border:              'none',
              cursor:              'pointer',
              textDecoration:      'underline',
              textUnderlineOffset: '4px',
            }}
          >
            Close
          </button>
        </div>

        {/* ── Infinite-scroll nav list ── */}
        <div
          ref={scrollRef}
          className="menu-scroll"
          style={{
            flex:            1,
            overflowY:       'scroll',
            minHeight:       0,           // required for flex + overflow to work
            scrollbarWidth:  'none',
          } as React.CSSProperties}
        >
          {/* Original set — refs attached, stagger-animated on open */}
          <div ref={listRef}>
            {renderLinks(true)}
          </div>
          {/* Clone — always fully visible, makes loop seamless */}
          <div aria-hidden="true">
            {renderLinks(false)}
          </div>
        </div>

        {/* ── Bottom CTA ── */}
        <div style={{
          flexShrink:  0,
          padding:     '28px 48px',
          borderTop:   '1px solid rgba(255,255,255,0.08)',
        }}>
          <button
            onClick={() => handleNav('/contact')}
            style={{
              fontFamily:    "'PPNeueCorp', system-ui, sans-serif",
              fontWeight:    900,
              fontSize:      13,
              letterSpacing: '4px',
              textTransform: 'uppercase',
              color:         '#D0274B',
              background:    'none',
              border:        'none',
              cursor:        'pointer',
              transition:    'opacity 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Start A Project →
          </button>
        </div>
      </div>
    </div>
  )
}

export default memo(MenuOverlay)
