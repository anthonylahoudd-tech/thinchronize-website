'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  children: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
  className?: string
  delay?: number
  splitBy?: 'words' | 'lines' | 'chars'
  stagger?: number
  triggerOffset?: string
}

export default function TextReveal({
  children,
  as: Tag = 'p',
  className = '',
  delay = 0,
  splitBy = 'words',
  stagger = 0.05,
  triggerOffset = 'top 85%',
}: Props) {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const el = containerRef.current
      if (!el) return

      const units =
        splitBy === 'words'
          ? children.split(' ').map((w) => w + ' ')
          : splitBy === 'chars'
          ? children.split('')
          : [children]

      // Build spans
      el.innerHTML = units
        .map((unit) => `<span class="clip-text"><span class="reveal-unit">${unit}</span></span>`)
        .join('')

      const revealUnits = el.querySelectorAll('.reveal-unit')

      gsap.fromTo(
        revealUnits,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power4.out',
          stagger,
          delay,
          scrollTrigger: {
            trigger: el,
            start: triggerOffset,
            once: true,
          },
        }
      )
    },
    { scope: containerRef, dependencies: [children] }
  )

  return (
    // @ts-expect-error — dynamic tag
    <Tag ref={containerRef} className={className} aria-label={children}>
      {children}
    </Tag>
  )
}
