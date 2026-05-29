'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Project } from '@/lib/projects'

const PP = "'PPNeueCorp', system-ui, sans-serif"

export default function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered]   = useState(false)
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLAnchorElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <Link
      href={`/portfolio/${project.id}`}
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      style={{ display: 'block', textDecoration: 'none' }}
    >
      {/* 1:1 image with zoom + circular cursor */}
      <div style={{
        position:   'relative',
        width:      '100%',
        paddingTop: '100%',
        overflow:   'hidden',
        background: '#1a1a1a',
      }}>
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{
            objectFit:  'cover',
            transform:  hovered ? 'scale(1.04)' : 'scale(1)',
            transition: 'transform 700ms cubic-bezier(0.19,1,0.22,1)',
          }}
        />

        {/* Custom circular "View" cursor — follows mouse inside card */}
        <div style={{
          position:        'absolute',
          top:             cursorPos.y - 55,
          left:            cursorPos.x - 55,
          width:           110,
          height:          110,
          borderRadius:    '50%',
          background:      'rgba(255,255,255,0.92)',
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'center',
          opacity:         hovered ? 1 : 0,
          transform:       hovered ? 'scale(1)' : 'scale(0.4)',
          transition:      'opacity 350ms cubic-bezier(0.19,1,0.22,1), transform 350ms cubic-bezier(0.19,1,0.22,1)',
          pointerEvents:   'none',
          zIndex:          3,
          fontFamily:      PP,
          fontWeight:      400,
          fontSize:        22,
          color:           '#000',
        }}>
          →
        </div>
      </div>

      {/* Card info row */}
      <div style={{
        display:         'flex',
        justifyContent:  'space-between',
        alignItems:      'flex-start',
        paddingTop:      20,
      }}>
        <div>
          <span style={{
            display:     'block',
            fontFamily:  PP,
            fontWeight:  400,
            fontSize:    16,
            color:       'white',
            marginBottom: 3,
          }}>
            {project.title}
          </span>
          {project.subtitle && (
            <span style={{
              display:    'block',
              fontFamily: PP,
              fontWeight: 400,
              fontSize:   13,
              color:      'rgba(255,255,255,0.4)',
            }}>
              {project.subtitle}
            </span>
          )}
        </div>

        <span style={{
          fontFamily:    PP,
          fontWeight:    400,
          fontSize:      11,
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color:         'rgba(255,255,255,0.35)',
          paddingTop:    3,
          whiteSpace:    'nowrap',
          marginLeft:    16,
        }}>
          ({project.category})
        </span>
      </div>
    </Link>
  )
}
