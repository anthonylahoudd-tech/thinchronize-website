'use client'

import { useRef, useEffect, useState } from 'react'

const EASE = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'

export default function MindfulDesignReveal() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: '#000000',
        padding:         'clamp(60px, 8vw, 100px) clamp(20px, 4vw, 60px)',
        overflow:        'hidden',
      }}
    >
      {/* Label slides up */}
      <p style={{
        color:          '#D0274B',
        fontSize:       11,
        fontWeight:     400,
        letterSpacing:  '0.2em',
        textTransform:  'uppercase',
        fontFamily:     "'PPNeueCorp', sans-serif",
        marginBottom:   32,
        opacity:        visible ? 1 : 0,
        transform:      visible ? 'translateY(0)' : 'translateY(20px)',
        transition:     `opacity 0.7s ${EASE}, transform 0.7s ${EASE}`,
      }}>
        Mindful Design
      </p>

      {/* Image: clip-path + scale + fade reveal */}
      <div style={{
        clipPath:   visible ? 'inset(0% 0%)' : 'inset(10% 5%)',
        transform:  visible ? 'scale(1)'     : 'scale(1.06)',
        opacity:    visible ? 1              : 0,
        transition: [
          `clip-path 1.4s ${EASE} 0.1s`,
          `transform 1.4s ${EASE} 0.1s`,
          `opacity 0.9s ease 0.1s`,
        ].join(', '),
        lineHeight: 0,
        willChange: 'clip-path, transform, opacity',
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          loading="lazy"
          src="/images/Thinchronize-Mindful-Design-Website.jpg"
          alt="Thinchronize — Mindful Design"
          style={{
            display:  'block',
            width:    '100%',
            height:   'auto',
            maxWidth: '100%',
          }}
        />
      </div>
    </section>
  )
}
