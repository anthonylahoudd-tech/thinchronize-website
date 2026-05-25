'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'
import type { JournalPost } from '@/lib/sanity/queries'
import { urlForImage } from '@/lib/sanity/image'

gsap.registerPlugin(ScrollTrigger)

const categoryColors: Record<string, string> = {
  'brand-strategy':   'linear-gradient(135deg, #1a0a10 0%, #3d1020 100%)',
  'visual-identity':  'linear-gradient(135deg, #0a0a1a 0%, #12122e 100%)',
  'design-thinking':  'linear-gradient(135deg, #0a1410 0%, #102418 100%)',
  'culture':          'linear-gradient(135deg, #1a100a 0%, #2e1c0c 100%)',
}
const defaultGradient = 'linear-gradient(135deg, #111111 0%, #1e1e1e 100%)'

function getCoverUrl(post: JournalPost) {
  if (post.coverImage?.asset?._ref) {
    try { return urlForImage(post.coverImage).width(800).height(500).url() } catch { return null }
  }
  return null
}

function formatDate(dateString?: string) {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  })
}

interface Props {
  posts: JournalPost[]
}

export default function Journal({ posts }: Props) {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.fromTo(
        '.journal-header',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.journal-header', start: 'top 82%', once: true } }
      )
      gsap.fromTo(
        '.journal-card',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.12,
          scrollTrigger: { trigger: '.journal-grid', start: 'top 78%', once: true } }
      )
    },
    { scope: sectionRef }
  )

  const [featured, ...rest] = posts

  return (
    <section ref={sectionRef} id="journal" className="bg-dark section-padding">
      <div className="container mx-auto">
        {/* Header */}
        <div className="journal-header flex items-center justify-between mb-16 opacity-0">
          <div className="flex items-center gap-4">
            <span className="w-8 h-px bg-red" />
            <span className="eyebrow">Journal</span>
          </div>
          <Link href="/journal" className="hidden md:inline-flex items-center gap-2 text-neutral text-sm hover:text-white transition-colors group">
            All articles
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* Journal grid */}
        <div className="journal-grid">

          {/* Featured post — full width */}
          {featured && (
            <Link href={`/journal/${featured.slug.current}`} className="journal-card group block mb-8 opacity-0">
              <motion.div
                className="rounded-2xl border border-white/10 hover:border-red/30 overflow-hidden"
                style={{ transition: 'border-color 0.5s ease' }}
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
              >
                {/* Cover image */}
                <div style={{
                  width: '100%',
                  height: 'clamp(200px, 28vw, 380px)',
                  position: 'relative',
                  overflow: 'hidden',
                  background: categoryColors[featured.category ?? ''] ?? defaultGradient,
                }}>
                  {getCoverUrl(featured) ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={getCoverUrl(featured)!}
                      alt={featured.title}
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    /* Decorative placeholder */
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{
                        fontFamily: "'PPNeueCorp', system-ui, sans-serif",
                        fontWeight: 900,
                        fontSize: 'clamp(40px, 6vw, 80px)',
                        color: 'rgba(208,39,75,0.15)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        userSelect: 'none',
                      }}>
                        {featured.category?.replace(/-/g, ' ') ?? 'Journal'}
                      </span>
                    </div>
                  )}
                  {/* Gradient overlay */}
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.6) 100%)' }} />
                  {/* Category pill */}
                  {featured.category && (
                    <div style={{ position: 'absolute', top: 20, left: 24 }}>
                      <span style={{
                        fontFamily: "'PPNeueCorp', system-ui, sans-serif",
                        fontWeight: 800, fontSize: 10, letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: '#D0274B', background: 'rgba(0,0,0,0.6)',
                        padding: '5px 10px', backdropFilter: 'blur(8px)',
                      }}>
                        {featured.category.replace(/-/g, ' ')}
                      </span>
                    </div>
                  )}
                </div>

                {/* Text content */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-8 md:p-10">
                  <div className="md:col-span-8">
                    <h3 className="text-white font-display font-black text-display-sm uppercase leading-tight mb-4 group-hover:text-red"
                      style={{ transition: 'color 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}>
                      {featured.title}
                    </h3>
                    {featured.excerpt && (
                      <p className="text-neutral text-base leading-relaxed max-w-lg">{featured.excerpt}</p>
                    )}
                  </div>
                  <div className="md:col-span-4 flex flex-col justify-end items-start md:items-end">
                    <div className="flex items-center gap-4 text-neutral text-sm">
                      {featured.readTime && (
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {featured.readTime} min
                        </span>
                      )}
                      {featured.publishedAt && <span>{formatDate(featured.publishedAt)}</span>}
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          )}

          {/* Remaining posts — 3 column */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post) => (
              <Link key={post._id} href={`/journal/${post.slug.current}`} className="journal-card group block opacity-0">
                <motion.div
                  className="h-full rounded-2xl border border-white/10 hover:border-red/30 overflow-hidden flex flex-col"
                  style={{ transition: 'border-color 0.5s ease' }}
                  whileHover={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
                >
                  {/* Cover image */}
                  <div style={{
                    width: '100%',
                    height: 180,
                    position: 'relative',
                    overflow: 'hidden',
                    background: categoryColors[post.category ?? ''] ?? defaultGradient,
                    flexShrink: 0,
                  }}>
                    {getCoverUrl(post) ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={getCoverUrl(post)!}
                        alt={post.title}
                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{
                          fontFamily: "'PPNeueCorp', system-ui, sans-serif",
                          fontWeight: 900, fontSize: 28,
                          color: 'rgba(208,39,75,0.2)',
                          textTransform: 'uppercase', letterSpacing: '0.08em',
                          userSelect: 'none',
                        }}>
                          {post.category?.replace(/-/g, ' ') ?? 'Journal'}
                        </span>
                      </div>
                    )}
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.5) 100%)' }} />
                    {post.category && (
                      <div style={{ position: 'absolute', top: 14, left: 16 }}>
                        <span style={{
                          fontFamily: "'PPNeueCorp', system-ui, sans-serif",
                          fontWeight: 800, fontSize: 9, letterSpacing: '0.2em',
                          textTransform: 'uppercase',
                          color: '#D0274B', background: 'rgba(0,0,0,0.55)',
                          padding: '4px 8px', backdropFilter: 'blur(8px)',
                        }}>
                          {post.category.replace(/-/g, ' ')}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Text content */}
                  <div className="p-6 flex flex-col gap-4 flex-1">
                    <h3 className="text-white font-display font-black text-xl uppercase leading-tight flex-1 group-hover:text-red"
                      style={{ transition: 'color 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}>
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="text-neutral text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>
                    )}
                    <div className="flex items-center justify-between text-neutral text-xs pt-2 border-t border-white/10">
                      {post.readTime && (
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3 h-3" />
                          {post.readTime} min
                        </span>
                      )}
                      {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile CTA */}
        <div className="mt-10 flex justify-center md:hidden">
          <Link href="/journal" className="inline-flex items-center gap-2 text-neutral text-sm hover:text-white transition-colors">
            View all articles →
          </Link>
        </div>
      </div>
    </section>
  )
}
