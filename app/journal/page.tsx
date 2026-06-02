import type { Metadata } from 'next'
import Link from 'next/link'
import { getJournalPosts } from '@/lib/sanity/queries'
import PageHero, { H } from '@/components/ui/PageHero'

export const metadata: Metadata = {
  title: 'Journal',
  description: 'Thinking on brand strategy, identity, and the craft of building something true.',
}

const PP = "'PPNeueCorp', system-ui, sans-serif"

export default async function JournalPage() {
  const posts = await getJournalPosts()

  return (
    <div style={{ backgroundColor: '#292929', minHeight: '100vh' }}>

      <PageHero
        title="IDEAS"
        lines={[
          <>Thinking on <H>brand strategy</H>, identity,</>,
          'and the craft of building something true.',
        ]}
        bottomLabel="Read our thinking"
        bottomHref="#journal-posts"
      />

      <div
        id="journal-posts"
        className="container mx-auto"
        style={{
          paddingTop:    'clamp(80px, 10vw, 120px)',
          paddingBottom: 'clamp(80px, 10vw, 140px)',
        }}
      >
        {/* Posts */}
        {posts.length === 0 ? (
          <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 16, color: '#919191' }}>
            Posts coming soon.
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {posts.map((post, i) => (
              <Link
                key={post._id}
                href={`/journal/${post.slug.current}`}
                className="flex items-baseline justify-between transition-opacity duration-200 hover:opacity-70"
                style={{
                  gap:           24,
                  padding:       'clamp(20px, 3vw, 32px) 0',
                  borderTop:     i === 0 ? '1px solid rgba(145,145,145,0.2)' : 'none',
                  borderBottom:  '1px solid rgba(145,145,145,0.2)',
                  textDecoration:'none',
                }}
              >
                <div style={{ flex: 1 }}>
                  {post.category && (
                    <p style={{
                      fontFamily:    PP,
                      fontWeight:    800,
                      fontSize:      10,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color:         '#D0274B',
                      marginBottom:  8,
                    }}>
                      {post.category}
                    </p>
                  )}
                  <h2 style={{
                    fontFamily:    PP,
                    fontWeight:    800,
                    fontSize:      'clamp(18px, 2.5vw, 28px)',
                    textTransform: 'uppercase',
                    letterSpacing: '-0.01em',
                    color:         '#fff',
                    lineHeight:    1.1,
                  }}>
                    {post.title}
                  </h2>
                </div>
                <div style={{ flexShrink: 0, textAlign: 'right' }}>
                  {post.publishedAt && (
                    <p style={{
                      fontFamily: PP,
                      fontWeight: 400,
                      fontSize:   12,
                      color:      '#919191',
                    }}>
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric', month: 'short', day: 'numeric',
                      })}
                    </p>
                  )}
                  {post.readTime && (
                    <p style={{
                      fontFamily: PP,
                      fontWeight: 400,
                      fontSize:   11,
                      color:      '#919191',
                      marginTop:  4,
                    }}>
                      {post.readTime} min read
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
