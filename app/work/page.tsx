'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import {
  PROJECTS, DIAGNOSTIC_ANSWERS,
  getProjectsByAnswer, getProjectsByKeywords,
  type Project,
} from '@/lib/projects'

// ─── Tokens ───────────────────────────────────────────────────────────────────

const PP   = "'PPNeueCorp', system-ui, sans-serif"
const RED  = '#D0274B'
const DARK = '#292929'

// ─── Orbit config (angles in radians) ────────────────────────────────────────

const ORBIT_CFG = [
  { startAngle: 0,   radiusX: 440, speed: 0.004  },  // don-bosco
  { startAngle: 0.9, radiusX: 500, speed: 0.003  },  // latelier
  { startAngle: 1.8, radiusX: 400, speed: 0.005  },  // tryo
  { startAngle: 2.7, radiusX: 470, speed: 0.0035 },  // nft-motivated
  { startAngle: 3.6, radiusX: 520, speed: 0.0028 },  // equisoft
  { startAngle: 4.5, radiusX: 420, speed: 0.0045 },  // societe-jabra
  { startAngle: 5.4, radiusX: 490, speed: 0.0032 },  // conundrum
]

function lerp(a: number, b: number, t: number) { return a + (b - a) * t }

type Stage      = 0 | 1 | 2
type ViewSize   = 'mobile' | 'tablet' | 'desktop'

// ─── Component ────────────────────────────────────────────────────────────────

export default function WorkPage() {

  // ── Viewport ──────────────────────────────────────────────────────────────
  const [viewSize, setViewSize] = useState<ViewSize>('desktop')

  useEffect(() => {
    const check = () => {
      const w = window.innerWidth
      setViewSize(w < 768 ? 'mobile' : w < 1024 ? 'tablet' : 'desktop')
    }
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // ── Stage state ───────────────────────────────────────────────────────────
  const [stage,           setStage]           = useState<Stage>(0)
  const [showQuestion,    setShowQuestion]     = useState(false)
  const [focusedIds,      setFocusedIds]       = useState<string[]>([])
  const [activeProject,   setActiveProject]    = useState<Project | null>(null)
  const [highlightAns,    setHighlightAns]     = useState<number | null>(null)

  // prevStage: what to return to when closing stage 2
  const prevStage       = useRef<Stage>(0)

  // ── Orbit refs (never cause re-renders) ───────────────────────────────────
  const orbitAngles     = useRef<number[]>(ORBIT_CFG.map(c => c.startAngle))
  const circleRefs      = useRef<(HTMLDivElement | null)[]>([])
  const orbitWrap       = useRef<HTMLDivElement>(null)
  const centerBoxRef    = useRef<HTMLDivElement>(null)
  const questionRef     = useRef<HTMLDivElement>(null)
  const stage1Ref       = useRef<HTMLDivElement>(null)
  const stage2Ref       = useRef<HTMLDivElement>(null)
  const mouseTarget     = useRef({ x: 0, y: 0 })
  const mouseCurrent    = useRef({ x: 0, y: 0 })
  const debounceRef     = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Mirror state into refs so GSAP ticker can read without stale closures
  const stageRef        = useRef<Stage>(0)
  const focusedIdsRef   = useRef<string[]>([])
  useEffect(() => { stageRef.current      = stage      }, [stage])
  useEffect(() => { focusedIdsRef.current = focusedIds }, [focusedIds])

  // ── GSAP ticker ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (viewSize === 'mobile') return

    gsap.ticker.lagSmoothing(0)

    const rm = viewSize === 'tablet' ? 0.65 : 1.0   // radius multiplier

    const tick = (_t: number, dt: number) => {
      // Lerp parallax on orbit wrapper
      mouseCurrent.current.x = lerp(mouseCurrent.current.x, mouseTarget.current.x, 0.06)
      mouseCurrent.current.y = lerp(mouseCurrent.current.y, mouseTarget.current.y, 0.06)

      if (orbitWrap.current) {
        orbitWrap.current.style.transform =
          `translate(-50%, -50%) translate(${mouseCurrent.current.x}px, ${mouseCurrent.current.y}px)`
      }

      const s1 = stageRef.current === 1

      ORBIT_CFG.forEach((cfg, i) => {
        const el = circleRefs.current[i]
        if (!el) return

        // In stage 1: matched circles stopped, non-matched slowed
        const isFocused = s1 && focusedIdsRef.current.includes(PROJECTS[i].id)
        const spd = isFocused ? 0 : s1 ? cfg.speed * 0.05 : cfg.speed

        orbitAngles.current[i] += spd * (dt / 16.67)

        const rx     = cfg.radiusX * rm
        const ry     = rx * 0.42
        const x      = Math.cos(orbitAngles.current[i]) * rx
        const y      = Math.sin(orbitAngles.current[i]) * ry
        const sinV   = Math.sin(orbitAngles.current[i])
        const depthT = (sinV + 1) / 2
        const ds     = 0.78 + depthT * 0.22

        el.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${ds})`
        el.style.zIndex    = String(Math.round(depthT * 10))
      })
    }

    gsap.ticker.add(tick)
    return () => gsap.ticker.remove(tick)
  }, [viewSize])

  // ── Mouse parallax ────────────────────────────────────────────────────────
  useEffect(() => {
    if (viewSize === 'mobile') return
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth  / 2
      const cy = window.innerHeight / 2
      mouseTarget.current.x = ((e.clientX - cx) / cx) * 40
      mouseTarget.current.y = ((e.clientY - cy) / cy) * 30
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [viewSize])

  // ── Body scroll lock in stage 2 ───────────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = stage === 2 ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [stage])

  // ── Escape key ────────────────────────────────────────────────────────────
  const goBackRef = useRef<() => void>(() => {})   // forward-ref pattern

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      if (stage === 2) goBackRef.current()
      else if (showQuestion) closeQuestion()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [stage, showQuestion])   // eslint-disable-line react-hooks/exhaustive-deps

  // ── Question overlay open / close ─────────────────────────────────────────
  const openQuestion = useCallback(() => {
    setShowQuestion(true)
    if (centerBoxRef.current) {
      gsap.to(centerBoxRef.current, { opacity: 0, scale: 0.9, duration: 0.2, ease: 'power2.in' })
    }
  }, [])

  const closeQuestion = useCallback(() => {
    if (questionRef.current) {
      gsap.to(questionRef.current, {
        opacity: 0, scale: 0.94, y: 8, duration: 0.25, ease: 'power2.in',
        onComplete: () => {
          setShowQuestion(false)
          setHighlightAns(null)
          // Only restore center box if we're back in stage 0
          if (stageRef.current === 0 && centerBoxRef.current) {
            gsap.to(centerBoxRef.current, { opacity: 1, scale: 1, duration: 0.3, ease: 'power3.out' })
          }
        },
      })
    } else {
      setShowQuestion(false)
      setHighlightAns(null)
    }
  }, [])

  // Animate question overlay in when it mounts
  useEffect(() => {
    if (showQuestion && questionRef.current) {
      gsap.fromTo(questionRef.current,
        { opacity: 0, scale: 0.94, y: 8 },
        { opacity: 1, scale: 1,    y: 0, duration: 0.4, ease: 'power3.out' }
      )
    }
  }, [showQuestion])

  // ── Go to Stage 1 ─────────────────────────────────────────────────────────
  const goToStage1 = useCallback((matched: string[]) => {
    // Animate question out, then set state
    const doTransition = () => {
      setFocusedIds(matched)
      setShowQuestion(false)
      setHighlightAns(null)
      setStage(1)

      // Dim/hide circles
      PROJECTS.forEach((p, i) => {
        const el = circleRefs.current[i]
        if (!el) return
        if (matched.includes(p.id)) {
          gsap.to(el, { opacity: 0, duration: 0.35, ease: 'power2.out' })
          el.style.pointerEvents = 'none'
        } else {
          gsap.to(el, { opacity: 0.1, duration: 0.45, ease: 'power2.out' })
        }
      })

      if (centerBoxRef.current) {
        gsap.to(centerBoxRef.current, { opacity: 0, scale: 0.9, duration: 0.25 })
      }
    }

    if (questionRef.current) {
      gsap.to(questionRef.current, {
        opacity: 0, scale: 0.94, y: 8, duration: 0.25, ease: 'power2.in',
        onComplete: doTransition,
      })
    } else {
      doTransition()
    }
  }, [])

  // Animate stage 1 cards in after mount
  useEffect(() => {
    if (stage === 1 && stage1Ref.current) {
      gsap.fromTo(stage1Ref.current,
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0,  duration: 0.5, ease: 'power3.out', delay: 0.1 }
      )
    }
  }, [stage, focusedIds])

  // ── "Answer differently" ──────────────────────────────────────────────────
  const reAnswer = useCallback(() => {
    setFocusedIds([])
    setStage(0)
    setHighlightAns(null)

    PROJECTS.forEach((_, i) => {
      const el = circleRefs.current[i]
      if (el) {
        el.style.pointerEvents = 'auto'
        gsap.to(el, { opacity: 1, duration: 0.4, ease: 'power3.out', delay: i * 0.025 })
      }
    })
    if (centerBoxRef.current) {
      gsap.set(centerBoxRef.current, { opacity: 1, scale: 1 })
    }
    // Open question after tiny delay so state settles
    setTimeout(() => openQuestion(), 60)
  }, [openQuestion])

  // ── Open Stage 2 ──────────────────────────────────────────────────────────
  const openStage2 = useCallback((project: Project, from: Stage) => {
    prevStage.current = from
    setActiveProject(project)
    setStage(2)
  }, [])

  // Animate stage 2 in after mount
  useEffect(() => {
    if (activeProject && stage2Ref.current) {
      gsap.fromTo(stage2Ref.current,
        { opacity: 0, y: 60, scale: 0.97 },
        { opacity: 1, y: 0,  scale: 1,  duration: 0.5, ease: 'power3.out' }
      )
    }
  }, [activeProject])

  // ── Go back ───────────────────────────────────────────────────────────────
  const goBack = useCallback(() => {
    const back = prevStage.current

    const doBack = () => {
      setActiveProject(null)
      setStage(back)

      if (back === 0) {
        setFocusedIds([])
        PROJECTS.forEach((_, i) => {
          const el = circleRefs.current[i]
          if (el) {
            el.style.pointerEvents = 'auto'
            gsap.to(el, { opacity: 1, duration: 0.5, ease: 'power3.out', delay: i * 0.03 })
          }
        })
        if (centerBoxRef.current) {
          gsap.to(centerBoxRef.current, { opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out', delay: 0.2 })
        }
      }
      // stage 1 will re-render with existing focusedIds — stage1Ref animates in via useEffect
    }

    if (stage2Ref.current) {
      gsap.to(stage2Ref.current, {
        opacity: 0, y: 40, duration: 0.3, ease: 'power3.in',
        onComplete: doBack,
      })
    } else {
      doBack()
    }
  }, [])

  // Wire goBack into forward-ref for Escape key
  useEffect(() => { goBackRef.current = goBack }, [goBack])

  // ── Text input handler ────────────────────────────────────────────────────
  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.trim()
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      if (!val) { setHighlightAns(null); return }
      const lower = val.toLowerCase()
      for (const ans of DIAGNOSTIC_ANSWERS) {
        if (ans.keywords.some(k => lower.includes(k) || k.includes(lower))) {
          setHighlightAns(ans.id); return
        }
      }
      setHighlightAns(null)
      const kp = getProjectsByKeywords(val)
      if (kp.length > 0) goToStage1(kp.map(p => p.id))
    }, 400)
  }, [goToStage1])

  // ── Mobile ────────────────────────────────────────────────────────────────
  if (viewSize === 'mobile') {
    return <MobileView />
  }

  // ── Sizing helpers ────────────────────────────────────────────────────────
  const circleSize = viewSize === 'tablet' ? 72 : 90
  const cardW      = viewSize === 'tablet' ? 190 : 220
  const cardH      = viewSize === 'tablet' ? 260 : 300
  const imgH       = viewSize === 'tablet' ? 130 : 160

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div style={{
      backgroundColor: DARK,
      width:           '100vw',
      height:          '100vh',
      overflow:        'hidden',
      position:        'relative',
    }}>

      {/* ── ORBIT LAYER ─────────────────────────────────────────────────────── */}
      <div
        ref={orbitWrap}
        style={{
          position:  'absolute',
          left:      '50%',
          top:       '50%',
          transform: 'translate(-50%, -50%)',
          width:     0,
          height:    0,
          zIndex:    1,
        }}
      >
        {/* Center box */}
        <div
          ref={centerBoxRef}
          onClick={() => { if (stage === 0 && !showQuestion) openQuestion() }}
          style={{
            position:            'absolute',
            left:                '50%',
            top:                 '50%',
            transform:           'translate(-50%, -50%)',
            width:               viewSize === 'tablet' ? 180 : 220,
            height:              viewSize === 'tablet' ?  90 : 100,
            background:          'rgba(255,255,255,0.07)',
            backdropFilter:      'blur(12px)',
            WebkitBackdropFilter:'blur(12px)',
            borderRadius:        16,
            boxShadow:           '0 0 40px rgba(208,39,75,0.3), 0 0 80px rgba(208,39,75,0.12)',
            display:             'flex',
            flexDirection:       'column',
            alignItems:          'center',
            justifyContent:      'center',
            gap:                 6,
            padding:             '0 18px',
            textAlign:           'center',
            cursor:              stage === 0 && !showQuestion ? 'pointer' : 'default',
            zIndex:              20,
          }}
        >
          <p style={{
            fontFamily:    PP,
            fontWeight:    400,
            fontSize:      viewSize === 'tablet' ? 12 : 14,
            color:         RED,
            letterSpacing: '0.05em',
            lineHeight:    1.35,
          }}>
            WHAT&apos;S WRONG WITH YOUR BRAND?
          </p>
          <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 11, color: '#919191' }}>
            Click to diagnose
          </p>
        </div>

        {/* Orbiting circles */}
        {PROJECTS.map((project, i) => (
          <div
            key={project.id}
            ref={el => { circleRefs.current[i] = el }}
            onClick={() => openStage2(project, stageRef.current as Stage)}
            style={{
              position:   'absolute',
              left:       '50%',
              top:        '50%',
              width:      circleSize,
              cursor:     'pointer',
              willChange: 'transform',
            }}
          >
            {/* Visual circle — hover effects here, ticker controls outer div transform */}
            <div
              onMouseEnter={e => {
                e.currentTarget.style.transform  = 'scale(1.1)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform  = 'scale(1.0)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'
              }}
              style={{
                width:        circleSize,
                height:       circleSize,
                borderRadius: '50%',
                overflow:     'hidden',
                border:       '1.5px solid rgba(255,255,255,0.18)',
                boxShadow:    '0 4px 20px rgba(0,0,0,0.4)',
                transition:   'transform 0.2s ease, border-color 0.2s',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.coverImage}
                alt={project.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
            {/* Label below circle */}
            <p style={{
              fontFamily:   PP,
              fontWeight:   400,
              fontSize:     11,
              color:        '#919191',
              textAlign:    'center',
              marginTop:    8,
              letterSpacing:'0.04em',
              whiteSpace:   'nowrap',
              overflow:     'hidden',
              textOverflow: 'ellipsis',
              maxWidth:     circleSize,
              pointerEvents:'none',
            }}>
              {project.title}
            </p>
          </div>
        ))}
      </div>

      {/* ── QUESTION OVERLAY (fixed center, outside parallax) ─────────────── */}
      {showQuestion && (
        <div
          ref={questionRef}
          style={{
            position:            'fixed',
            left:                '50%',
            top:                 '50%',
            transform:           'translate(-50%, -50%)',
            width:               420,
            background:          'rgba(255,255,255,0.07)',
            backdropFilter:      'blur(16px)',
            WebkitBackdropFilter:'blur(16px)',
            borderRadius:        20,
            boxShadow:           '0 0 60px rgba(208,39,75,0.3), 0 0 120px rgba(208,39,75,0.1)',
            padding:             28,
            zIndex:              50,
          }}
        >
          <button
            onClick={closeQuestion}
            style={{
              position: 'absolute', top: 14, right: 16,
              background: 'none', border: 'none',
              color: '#919191', fontSize: 18, cursor: 'pointer',
              lineHeight: 1, fontFamily: PP,
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = '#919191')}
          >×</button>

          <p style={{
            fontFamily:    PP,
            fontWeight:    400,
            fontSize:      15,
            color:         '#FFFFFF',
            letterSpacing: '0.04em',
            lineHeight:    1.4,
            marginBottom:  20,
            paddingRight:  24,
          }}>
            WHAT&apos;S THE MAIN THING WRONG WITH YOUR BRAND?
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {DIAGNOSTIC_ANSWERS.map(ans => {
              const isHighlighted = highlightAns === ans.id
              return (
                <button
                  key={ans.id}
                  onClick={() => goToStage1(getProjectsByAnswer(ans.id).map(p => p.id))}
                  style={{
                    width:        '100%',
                    padding:      '12px 16px',
                    background:   isHighlighted ? 'rgba(208,39,75,0.15)' : 'rgba(255,255,255,0.06)',
                    border:       `1px solid ${isHighlighted ? 'rgba(208,39,75,0.4)' : 'rgba(255,255,255,0.12)'}`,
                    borderRadius: 10,
                    color:        '#FFFFFF',
                    fontFamily:   PP,
                    fontWeight:   400,
                    fontSize:     13,
                    textAlign:    'left',
                    cursor:       'pointer',
                    transition:   'background 0.2s, border-color 0.2s',
                    lineHeight:   1.4,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background    = 'rgba(208,39,75,0.15)'
                    e.currentTarget.style.borderColor   = 'rgba(208,39,75,0.4)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background    = isHighlighted ? 'rgba(208,39,75,0.15)' : 'rgba(255,255,255,0.06)'
                    e.currentTarget.style.borderColor   = isHighlighted ? 'rgba(208,39,75,0.4)'  : 'rgba(255,255,255,0.12)'
                  }}
                >
                  {ans.label}
                </button>
              )
            })}
          </div>

          <input
            type="text"
            placeholder="Or describe it in your own words..."
            onChange={handleInput}
            style={{
              marginTop:    12,
              width:        '100%',
              padding:      '10px 14px',
              background:   'rgba(255,255,255,0.05)',
              border:       '1px solid rgba(255,255,255,0.1)',
              borderRadius: 10,
              color:        '#FFFFFF',
              fontFamily:   PP,
              fontWeight:   400,
              fontSize:     13,
              outline:      'none',
              boxSizing:    'border-box',
            }}
          />
        </div>
      )}

      {/* ── STAGE 1 — matched project cards ───────────────────────────────── */}
      {stage === 1 && (
        <>
          <div
            ref={stage1Ref}
            style={{
              position:        'absolute',
              inset:           0,
              display:         'flex',
              alignItems:      'center',
              justifyContent:  'center',
              flexWrap:        'wrap',
              gap:             20,
              zIndex:          10,
              pointerEvents:   'none',
              padding:         '0 40px',
            }}
          >
            {focusedIds.map(id => {
              const p = PROJECTS.find(pr => pr.id === id)
              if (!p) return null
              const excerpt = p.brief.length > 88 ? p.brief.slice(0, 88) + '…' : p.brief
              return (
                <div
                  key={id}
                  onClick={() => openStage2(p, 1)}
                  style={{
                    width:           cardW,
                    height:          cardH,
                    borderRadius:    16,
                    background:      'rgba(255,255,255,0.06)',
                    backdropFilter:  'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    border:          '1px solid rgba(255,255,255,0.1)',
                    boxShadow:       '0 8px 32px rgba(0,0,0,0.4)',
                    cursor:          'pointer',
                    pointerEvents:   'auto',
                    display:         'flex',
                    flexDirection:   'column',
                    overflow:        'hidden',
                    flexShrink:      0,
                    transition:      'transform 0.2s ease, box-shadow 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform  = 'scale(1.02)'
                    e.currentTarget.style.boxShadow  = '0 16px 48px rgba(0,0,0,0.6)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform  = 'scale(1.0)'
                    e.currentTarget.style.boxShadow  = '0 8px 32px rgba(0,0,0,0.4)'
                  }}
                >
                  {/* Image */}
                  <div style={{ height: imgH, overflow: 'hidden', flexShrink: 0 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.coverImage}
                      alt={p.title}
                      style={{
                        width: '100%', height: '100%', objectFit: 'cover',
                        display: 'block', borderRadius: '12px 12px 0 0',
                      }}
                    />
                  </div>
                  {/* Text */}
                  <div style={{
                    padding:        16,
                    flex:           1,
                    display:        'flex',
                    flexDirection:  'column',
                    justifyContent: 'space-between',
                  }}>
                    <div>
                      <p style={{
                        fontFamily:    PP, fontWeight: 800, fontSize: 10,
                        color:         RED, letterSpacing: '0.12em',
                        textTransform: 'uppercase', marginBottom: 6,
                      }}>
                        {p.category}
                      </p>
                      <h3 style={{
                        fontFamily: PP, fontWeight: 800, fontSize: 16,
                        color:      '#fff', lineHeight: 1.2, marginBottom: 8,
                      }}>
                        {p.title}
                      </h3>
                      <p style={{
                        fontFamily: PP, fontWeight: 400, fontSize: 12,
                        color:      '#919191', lineHeight: 1.5,
                      }}>
                        {excerpt}
                      </p>
                    </div>
                    <p style={{
                      fontFamily: PP, fontWeight: 400, fontSize: 12,
                      color:      RED, marginTop: 12,
                    }}>
                      View project →
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* "Answer differently" */}
          <button
            onClick={reAnswer}
            style={{
              position:      'fixed',
              bottom:        40,
              left:          '50%',
              transform:     'translateX(-50%)',
              background:    'none',
              border:        'none',
              fontFamily:    PP,
              fontWeight:    400,
              fontSize:      12,
              color:         '#919191',
              cursor:        'pointer',
              letterSpacing: '0.04em',
              transition:    'color 0.2s',
              zIndex:        15,
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = '#919191')}
          >
            ← Answer differently
          </button>
        </>
      )}

      {/* ── STAGE 2 — project detail window ───────────────────────────────── */}
      {activeProject && (
        <div style={{
          position:       'fixed',
          inset:          0,
          zIndex:         100,
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
        }}>
          <div
            ref={stage2Ref}
            style={{
              width:        'min(860px, 92vw)',
              height:       '88vh',
              background:   '#FFFFFF',
              borderRadius: 20,
              boxShadow:    '0 24px 80px rgba(0,0,0,0.6)',
              overflow:     'hidden',
              display:      'flex',
              flexDirection:'column',
              position:     'relative',
            }}
          >
            {/* Sticky header */}
            <div style={{
              height:         52,
              background:     '#FFFFFF',
              borderBottom:   '1px solid #EEEEEE',
              borderRadius:   '20px 20px 0 0',
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'space-between',
              padding:        '0 24px',
              flexShrink:     0,
            }}>
              <button
                onClick={goBack}
                style={{
                  background: 'none', border: 'none',
                  color: '#292929', fontFamily: PP, fontWeight: 400,
                  fontSize: 13, cursor: 'pointer', transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = RED)}
                onMouseLeave={e => (e.currentTarget.style.color = '#292929')}
              >
                ← Back
              </button>
              <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 14, color: '#292929' }}>
                {activeProject.title}
              </p>
              <button
                onClick={goBack}
                style={{
                  background: 'none', border: 'none',
                  color: '#292929', fontFamily: PP,
                  fontSize: 18, cursor: 'pointer',
                  lineHeight: 1, transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = RED)}
                onMouseLeave={e => (e.currentTarget.style.color = '#292929')}
              >×</button>
            </div>

            {/* Scrollable body */}
            <div style={{ overflowY: 'auto', flex: 1 }}>
              {/* Hero */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeProject.coverImage}
                alt={activeProject.title}
                style={{
                  width:     '100%',
                  height:    viewSize === 'tablet' ? 240 : 340,
                  objectFit: 'cover',
                  display:   'block',
                }}
              />

              {/* Content */}
              <div style={{
                padding:  viewSize === 'tablet' ? '28px 32px' : '40px 48px',
                maxWidth: 720,
                margin:   '0 auto',
              }}>
                {/* Category + meta */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <span style={{
                    background:    '#FFF0F3',
                    color:         RED,
                    borderRadius:  6,
                    padding:       '4px 10px',
                    fontFamily:    PP,
                    fontWeight:    800,
                    fontSize:      11,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}>
                    {activeProject.category}
                  </span>
                  <span style={{ fontFamily: PP, fontWeight: 400, fontSize: 13, color: '#999' }}>
                    {activeProject.market} · {activeProject.year}
                  </span>
                </div>

                {/* Title */}
                <h2 style={{
                  fontFamily:    PP,
                  fontWeight:    900,
                  fontSize:      viewSize === 'tablet' ? 34 : 44,
                  color:         '#292929',
                  lineHeight:    1.1,
                  letterSpacing: '-0.01em',
                }}>
                  {activeProject.title}
                </h2>

                {/* Divider */}
                <div style={{ height: 1, background: '#EEEEEE', margin: '32px 0' }} />

                {/* Content sections */}
                {[
                  { label: 'THE BRIEF',     body: activeProject.brief,     large: false },
                  { label: 'THE DIAGNOSIS', body: activeProject.diagnosis, large: false },
                  { label: 'WHAT WE BUILT', body: activeProject.built,     large: false },
                  { label: 'THE RESULT',    body: activeProject.result,    large: true  },
                ].map(s => (
                  <div key={s.label} style={{ marginBottom: 40 }}>
                    <p style={{
                      fontFamily:    PP, fontWeight: 800, fontSize: 10,
                      color:         RED, letterSpacing: '0.18em',
                      textTransform: 'uppercase', marginBottom: 10,
                    }}>
                      {s.label}
                    </p>
                    <p style={{
                      fontFamily:  PP,
                      fontWeight:  s.large ? 600 : 400,
                      fontSize:    s.large ? 20  : 16,
                      color:       '#292929',
                      lineHeight:  1.85,
                    }}>
                      {s.body}
                    </p>
                  </div>
                ))}

                {/* Services */}
                <div style={{ marginBottom: 40 }}>
                  <p style={{
                    fontFamily:    PP, fontWeight: 800, fontSize: 10,
                    color:         RED, letterSpacing: '0.18em',
                    textTransform: 'uppercase', marginBottom: 12,
                  }}>
                    SERVICES
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {activeProject.services.map(s => (
                      <span key={s} style={{
                        fontFamily:   PP, fontWeight: 400, fontSize: 12,
                        color:        '#555', background: '#F5F5F5',
                        borderRadius: 20, padding: '5px 14px',
                      }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div style={{
                  marginTop:   64,
                  paddingTop:  40,
                  borderTop:   '1px solid #EEEEEE',
                  marginBottom: 80,
                }}>
                  <h3 style={{
                    fontFamily: PP, fontWeight: 900, fontSize: 26,
                    color:      '#292929', marginBottom: 10,
                  }}>
                    Ready to diagnose your brand?
                  </h3>
                  <p style={{
                    fontFamily:  PP, fontWeight: 400, fontSize: 15,
                    color:       '#888', lineHeight: 1.6,
                    margin:      '10px 0 24px',
                  }}>
                    Every engagement starts with a question, not a quote.
                  </p>
                  <Link
                    href="/contact"
                    style={{
                      display:        'inline-block',
                      background:     RED,
                      color:          '#fff',
                      borderRadius:   10,
                      padding:        '14px 28px',
                      fontFamily:     PP,
                      fontWeight:     800,
                      fontSize:       14,
                      textDecoration: 'none',
                      transition:     'background 0.2s',
                    }}
                    onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.background = '#b8223f')}
                    onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.background = RED)}
                  >
                    Start the conversation →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom scrollbar for stage 2 */}
      <style>{`
        *            { box-sizing: border-box; }
        ::-webkit-scrollbar          { width: 5px; }
        ::-webkit-scrollbar-track    { background: #ddd; }
        ::-webkit-scrollbar-thumb    { background: ${RED}; border-radius: 3px; }
        input::placeholder           { color: #666; }
      `}</style>
    </div>
  )
}

// ─── Mobile View ──────────────────────────────────────────────────────────────

function MobileView() {
  const [mStage,        setMStage]        = useState<0 | 1 | 2>(0)
  const [focusedIds,    setFocusedIds]    = useState<string[]>([])
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const [showQ,         setShowQ]         = useState(false)
  const prevMStage      = useRef<0 | 1>(0)

  const handleAnswer = (answerId: number) => {
    setFocusedIds(getProjectsByAnswer(answerId).map(p => p.id))
    setMStage(1)
    setShowQ(false)
  }

  const openProject = (p: Project, from: 0 | 1) => {
    prevMStage.current = from
    setActiveProject(p)
    setMStage(2)
    document.body.style.overflow = 'hidden'
  }

  const goBack = () => {
    document.body.style.overflow = ''
    setActiveProject(null)
    setMStage(prevMStage.current)
  }

  return (
    <div style={{ backgroundColor: DARK, minHeight: '100vh' }}>
      <div style={{ padding: '100px 16px 32px' }}>

        {/* Center box */}
        <div
          onClick={() => setShowQ(true)}
          style={{
            padding:             '20px 24px',
            background:          'rgba(255,255,255,0.07)',
            backdropFilter:      'blur(12px)',
            WebkitBackdropFilter:'blur(12px)',
            borderRadius:        16,
            boxShadow:           '0 0 40px rgba(208,39,75,0.3)',
            textAlign:           'center',
            cursor:              'pointer',
            marginBottom:        28,
          }}
        >
          <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 14, color: RED, letterSpacing: '0.05em', marginBottom: 6 }}>
            WHAT&apos;S WRONG WITH YOUR BRAND?
          </p>
          <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 11, color: '#919191' }}>
            Tap to diagnose
          </p>
        </div>

        {/* Question */}
        {showQ && (
          <div style={{
            background:          'rgba(255,255,255,0.07)',
            backdropFilter:      'blur(16px)',
            WebkitBackdropFilter:'blur(16px)',
            borderRadius:        20,
            boxShadow:           '0 0 60px rgba(208,39,75,0.3)',
            padding:             24,
            marginBottom:        24,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 14, color: '#fff', lineHeight: 1.35, flex: 1, paddingRight: 12 }}>
                WHAT&apos;S THE MAIN THING WRONG WITH YOUR BRAND?
              </p>
              <button onClick={() => setShowQ(false)} style={{ background: 'none', border: 'none', color: '#919191', fontSize: 18, cursor: 'pointer', flexShrink: 0 }}>×</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {DIAGNOSTIC_ANSWERS.map(ans => (
                <button key={ans.id} onClick={() => handleAnswer(ans.id)} style={{
                  width: '100%', padding: '12px 16px',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 10, color: '#fff',
                  fontFamily: PP, fontWeight: 400, fontSize: 13,
                  textAlign: 'left', cursor: 'pointer', lineHeight: 1.4,
                }}>
                  {ans.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Stage 1 matched cards */}
        {mStage === 1 && focusedIds.length > 0 && (
          <div style={{ marginBottom: 32 }}>
            <p style={{ fontFamily: PP, fontWeight: 800, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#919191', marginBottom: 12 }}>
              Matched Projects
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {focusedIds.map(id => {
                const p = PROJECTS.find(pr => pr.id === id)
                if (!p) return null
                return (
                  <div key={id} onClick={() => openProject(p, 1)} style={{
                    borderRadius: 16, background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden', cursor: 'pointer',
                  }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.coverImage} alt={p.title} style={{ width: '100%', height: 160, objectFit: 'cover', display: 'block' }} />
                    <div style={{ padding: 16 }}>
                      <p style={{ fontFamily: PP, fontWeight: 800, fontSize: 10, color: RED, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6 }}>{p.category}</p>
                      <h3 style={{ fontFamily: PP, fontWeight: 800, fontSize: 16, color: '#fff', marginBottom: 6 }}>{p.title}</h3>
                      <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 12, color: '#919191', lineHeight: 1.5 }}>{p.brief.slice(0, 80)}…</p>
                      <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 12, color: RED, marginTop: 10 }}>View project →</p>
                    </div>
                  </div>
                )
              })}
            </div>
            <button onClick={() => { setMStage(0); setShowQ(true) }} style={{
              display: 'block', marginTop: 16, background: 'none', border: 'none',
              fontFamily: PP, fontSize: 12, color: '#919191', cursor: 'pointer', padding: 0,
            }}>
              ← Answer differently
            </button>
          </div>
        )}

        {/* All project circles */}
        <p style={{ fontFamily: PP, fontWeight: 800, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#919191', marginBottom: 16 }}>
          All Projects
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, justifyItems: 'center' }}>
          {PROJECTS.map(p => (
            <div key={p.id} onClick={() => openProject(p, 0)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
              <div style={{ width: 70, height: 70, borderRadius: '50%', overflow: 'hidden', border: '1.5px solid rgba(255,255,255,0.18)', marginBottom: 8 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.coverImage} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 10, color: '#919191', textAlign: 'center', maxWidth: 80, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {p.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Stage 2 fullscreen */}
      {activeProject && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: '#fff', overflowY: 'auto' }}>
          {/* Header */}
          <div style={{
            position: 'sticky', top: 0, zIndex: 2, height: 52,
            background: '#fff', borderBottom: '1px solid #eee',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px',
          }}>
            <button onClick={goBack} style={{ background: 'none', border: 'none', fontFamily: PP, fontSize: 13, color: '#292929', cursor: 'pointer' }}>← Back</button>
            <p style={{ fontFamily: PP, fontSize: 13, color: '#292929', fontWeight: 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '55%' }}>{activeProject.title}</p>
            <button onClick={goBack} style={{ background: 'none', border: 'none', fontFamily: PP, fontSize: 18, color: '#292929', cursor: 'pointer' }}>×</button>
          </div>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={activeProject.coverImage} alt={activeProject.title} style={{ width: '100%', height: 200, objectFit: 'cover', display: 'block' }} />

          <div style={{ padding: '28px 20px 80px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <span style={{ background: '#FFF0F3', color: RED, borderRadius: 6, padding: '4px 10px', fontFamily: PP, fontWeight: 800, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {activeProject.category}
              </span>
              <span style={{ fontFamily: PP, fontSize: 12, color: '#999' }}>{activeProject.market} · {activeProject.year}</span>
            </div>
            <h2 style={{ fontFamily: PP, fontWeight: 900, fontSize: 28, color: '#292929', lineHeight: 1.1, marginBottom: 24 }}>
              {activeProject.title}
            </h2>
            <div style={{ height: 1, background: '#eee', marginBottom: 28 }} />
            {[
              { label: 'THE BRIEF',     body: activeProject.brief,     large: false },
              { label: 'THE DIAGNOSIS', body: activeProject.diagnosis, large: false },
              { label: 'WHAT WE BUILT', body: activeProject.built,     large: false },
              { label: 'THE RESULT',    body: activeProject.result,    large: true  },
            ].map(s => (
              <div key={s.label} style={{ marginBottom: 32 }}>
                <p style={{ fontFamily: PP, fontWeight: 800, fontSize: 10, color: RED, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 8 }}>{s.label}</p>
                <p style={{ fontFamily: PP, fontWeight: s.large ? 600 : 400, fontSize: s.large ? 18 : 15, color: '#292929', lineHeight: 1.8 }}>{s.body}</p>
              </div>
            ))}
            <div style={{ marginBottom: 32 }}>
              <p style={{ fontFamily: PP, fontWeight: 800, fontSize: 10, color: RED, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 10 }}>SERVICES</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {activeProject.services.map(s => (
                  <span key={s} style={{ fontFamily: PP, fontSize: 12, color: '#555', background: '#F5F5F5', borderRadius: 20, padding: '5px 14px' }}>{s}</span>
                ))}
              </div>
            </div>
            <div style={{ borderTop: '1px solid #eee', paddingTop: 32 }}>
              <h3 style={{ fontFamily: PP, fontWeight: 900, fontSize: 22, color: '#292929', marginBottom: 8 }}>Ready to diagnose your brand?</h3>
              <p style={{ fontFamily: PP, fontSize: 14, color: '#888', marginBottom: 20, lineHeight: 1.6 }}>Every engagement starts with a question, not a quote.</p>
              <Link href="/contact" style={{ display: 'inline-block', background: RED, color: '#fff', borderRadius: 10, padding: '14px 24px', fontFamily: PP, fontWeight: 800, fontSize: 14, textDecoration: 'none' }}>
                Start the conversation →
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
