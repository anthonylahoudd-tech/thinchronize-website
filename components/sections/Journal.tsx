'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'
import type { JournalPost } from '@/lib/sanity/queries'

gsap.registerPlugin(ScrollTrigger)

function formatDate(dateString?: string) {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
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
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.journal-header',
            start: 'top 82%',
            once: true,
          },
        }
      )

      gsap.fromTo(
        '.journal-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: '.journal-grid',
            start: 'top 78%',
            once: true,
          },
        }
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
          <Link
            href="/journal"
            className="hidden md:inline-flex items-center gap-2 text-neutral text-sm hover:text-white transition-colors group"
          >
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
                className="grid grid-cols-1 md:grid-cols-12 gap-8 p-8 md:p-12 rounded-2xl border border-white/10 hover:border-red/30 transition-colors duration-500"
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
              >
                <div className="md:col-span-7">
                  {featured.category && (
                    <p className="text-red text-xs tracking-widest uppercase mb-4">
                      {featured.category.replace(/-/g, ' ')}
                    </p>
                  )}
                  <h3 className="text-white font-display font-black text-display-sm uppercase leading-tight mb-4 group-hover:text-red" style={{ transition: 'color 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}>
                    {featured.title}
                  </h3>
                  {featured.excerpt && (
                    <p className="text-neutral text-base leading-relaxed max-w-lg">
                      {featured.excerpt}
                    </p>
                  )}
                </div>
                <div className="md:col-span-5 flex flex-col justify-end items-end">
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
              </motion.div>
            </Link>
          )}

          {/* Remaining posts — 3 column */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post) => (
              <Link
                key={post._id}
                href={`/journal/${post.slug.current}`}
                className="journal-card group block opacity-0"
              >
                <motion.div
                  className="h-full p-8 rounded-2xl border border-white/10 hover:border-red/30 transition-colors duration-500 flex flex-col gap-6"
                  whileHover={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
                >
                  {post.category && (
                    <p className="text-red text-xs tracking-widest uppercase">
                      {post.category.replace(/-/g, ' ')}
                    </p>
                  )}
                  <h3 className="text-white font-display font-black text-xl uppercase leading-tight flex-1 group-hover:text-red" style={{ transition: 'color 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}>
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="text-neutral text-sm leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
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
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile CTA */}
        <div className="mt-10 flex justify-center md:hidden">
          <Link
            href="/journal"
            className="inline-flex items-center gap-2 text-neutral text-sm hover:text-white transition-colors"
          >
            View all articles →
          </Link>
        </div>
      </div>
    </section>
  )
}
