import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getJournalPostBySlug, getJournalPosts } from '@/lib/sanity/queries'
import { JsonLd } from '@/components/JsonLd'
import { ArrowLeft, Clock } from 'lucide-react'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const posts = await getJournalPosts()
  return posts.map((p) => ({ slug: p.slug.current }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getJournalPostBySlug(params.slug)
  if (!post) return { title: 'Journal' }
  const url = `https://thinchronize.com/journal/${params.slug}`
  return {
    title: post.title,
    description: post.excerpt ?? post.title,
    alternates: { canonical: url },
    openGraph: {
      url,
      title: `${post.title} — Thinchronize`,
      type: 'article',
      ...(post.publishedAt && { publishedTime: post.publishedAt }),
    },
  }
}

function formatDate(dateString?: string) {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function JournalPostPage({ params }: Props) {
  const post = await getJournalPostBySlug(params.slug)
  if (!post) notFound()

  const coverSrc = `https://picsum.photos/seed/${post._id}/1600/900`
  const postUrl = `https://thinchronize.com/journal/${params.slug}`

  return (
    <article className="bg-dark min-h-screen pt-32">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        ...(post.publishedAt && { datePublished: post.publishedAt }),
        author: { '@type': 'Organization', name: 'Thinchronize' },
        publisher: { '@type': 'Organization', name: 'Thinchronize', logo: 'https://thinchronize.com/images/logo-stacked.png' },
        mainEntityOfPage: postUrl,
      }} />
      <div className="container mx-auto">
        <Link
          href="/#journal"
          className="inline-flex items-center gap-2 text-neutral text-sm hover:text-white transition-colors mb-16 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Journal
        </Link>

        {/* Header */}
        <div className="max-w-3xl mb-16">
          {post.category && (
            <p className="text-red text-sm tracking-widest uppercase mb-6">
              {post.category.replace(/-/g, ' ')}
            </p>
          )}
          <h1 className="text-display-md text-white mb-8 leading-tight">{post.title}</h1>

          <div className="flex items-center gap-6 text-neutral text-sm">
            {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
            {post.readTime && (
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime} min read
              </span>
            )}
          </div>
        </div>

        {/* Cover */}
        <div className="relative w-full aspect-[16/7] mb-20 overflow-hidden">
          <Image src={coverSrc} alt={post.title} fill className="object-cover" priority />
        </div>

        {/* Body */}
        <div className="max-w-2xl mx-auto">
          {post.excerpt && (
            <p className="text-xl text-neutral leading-relaxed mb-12 pb-12 border-b border-white/10">
              {post.excerpt}
            </p>
          )}

          {/* When Sanity body is not set, show placeholder */}
          <div className="prose prose-invert prose-lg">
            <p className="text-neutral/80 leading-relaxed">
              This article is managed through Sanity CMS. Connect your Sanity project and create
              content at <code className="text-red">/studio</code> to see your full article here.
            </p>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="border-t border-white/10 mt-32">
        <div className="container mx-auto py-16">
          <Link href="/#journal" className="group flex items-center justify-between">
            <span className="text-neutral text-sm tracking-widest uppercase">More Reading</span>
            <span className="text-display-sm text-white group-hover:text-red transition-colors">
              View All Posts →
            </span>
          </Link>
        </div>
      </div>
    </article>
  )
}
