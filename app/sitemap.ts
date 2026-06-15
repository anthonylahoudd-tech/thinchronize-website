import { MetadataRoute } from 'next'
import { PROJECTS } from '@/lib/projects'

const BASE = 'https://thinchronize.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE,               lastModified: new Date(), changeFrequency: 'monthly', priority: 1.0 },
    { url: `${BASE}/about`,    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/portfolio`,lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/journal`,  lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE}/contact`,  lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/diagnostic`,lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ]

  const projectRoutes: MetadataRoute.Sitemap = PROJECTS.map(p => ({
    url:             `${BASE}/portfolio/${p.id}`,
    lastModified:    new Date(),
    changeFrequency: 'monthly',
    priority:        0.7,
  }))

  return [...staticRoutes, ...projectRoutes]
}
