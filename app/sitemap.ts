import { MetadataRoute } from 'next'
import { PROJECTS } from '@/lib/projects'
import { getJournalPosts } from '@/lib/sanity/queries'

const BASE = 'https://thinchronize.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE,                  lastModified: new Date(), changeFrequency: 'monthly', priority: 1.0 },
    { url: `${BASE}/services`,    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/portfolio`,   lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/about`,       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/journal`,     lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE}/contact`,     lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/diagnostic`,  lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ]

  const projectRoutes: MetadataRoute.Sitemap = PROJECTS.map(p => ({
    url:             `${BASE}/portfolio/${p.id}`,
    lastModified:    new Date(),
    changeFrequency: 'yearly',
    priority:        0.7,
  }))

  let journalRoutes: MetadataRoute.Sitemap = []
  try {
    const posts = await getJournalPosts()
    journalRoutes = posts.map(p => ({
      url:             `${BASE}/journal/${p.slug.current}`,
      lastModified:    p.publishedAt ? new Date(p.publishedAt) : new Date(),
      changeFrequency: 'yearly',
      priority:        0.6,
    }))
  } catch {
    // Sanity not configured yet — journal routes skipped
  }

  return [...staticRoutes, ...projectRoutes, ...journalRoutes]
}
