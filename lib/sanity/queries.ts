import { client, isSanityConfigured } from './client'
import { mockCaseStudies, mockJournalPosts } from '../mock-data'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CaseStudy {
  _id: string
  title: string
  slug: { current: string }
  client?: string
  category?: string
  year?: number
  tagline?: string
  coverImage?: { asset: { _ref: string }; alt?: string }
  heroImage?: { asset: { _ref: string } }
  overview?: unknown[]
  challenge?: string
  solution?: string
  gallery?: Array<{ asset: { _ref: string }; alt?: string }>
  services?: string[]
  featured?: boolean
  order?: number
}

export interface JournalPost {
  _id: string
  title: string
  slug: { current: string }
  publishedAt?: string
  category?: string
  excerpt?: string
  coverImage?: { asset: { _ref: string }; alt?: string }
  readTime?: number
  featured?: boolean
}

// ─── Queries ─────────────────────────────────────────────────────────────────

const caseStudiesQuery = `*[_type == "caseStudy"] | order(order asc, year desc) {
  _id, title, slug, client, category, year, tagline, coverImage, services, featured, order
}`

const featuredCaseStudiesQuery = `*[_type == "caseStudy" && featured == true] | order(order asc)[0...6] {
  _id, title, slug, client, category, year, tagline, coverImage, services
}`

const caseStudyBySlugQuery = `*[_type == "caseStudy" && slug.current == $slug][0] {
  _id, title, slug, client, category, year, tagline, overview, challenge, solution,
  coverImage, heroImage, gallery, services, featured
}`

const journalPostsQuery = `*[_type == "journalPost"] | order(publishedAt desc) {
  _id, title, slug, publishedAt, category, excerpt, coverImage, readTime, featured
}`

const journalPostBySlugQuery = `*[_type == "journalPost" && slug.current == $slug][0] {
  _id, title, slug, publishedAt, category, excerpt, coverImage, body, readTime
}`

// ─── Fetch helpers ────────────────────────────────────────────────────────────

export async function getCaseStudies(): Promise<CaseStudy[]> {
  if (!isSanityConfigured) return mockCaseStudies
  try {
    return await client.fetch(caseStudiesQuery)
  } catch {
    return mockCaseStudies
  }
}

export async function getFeaturedCaseStudies(): Promise<CaseStudy[]> {
  if (!isSanityConfigured) return mockCaseStudies
  try {
    return await client.fetch(featuredCaseStudiesQuery)
  } catch {
    return mockCaseStudies
  }
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  if (!isSanityConfigured) return mockCaseStudies.find((cs) => cs.slug.current === slug) ?? null
  try {
    return await client.fetch(caseStudyBySlugQuery, { slug })
  } catch {
    return null
  }
}

export async function getJournalPosts(): Promise<JournalPost[]> {
  if (!isSanityConfigured) return mockJournalPosts
  try {
    return await client.fetch(journalPostsQuery)
  } catch {
    return mockJournalPosts
  }
}

export async function getJournalPostBySlug(slug: string): Promise<JournalPost | null> {
  if (!isSanityConfigured) return mockJournalPosts.find((p) => p.slug.current === slug) ?? null
  try {
    return await client.fetch(journalPostBySlugQuery, { slug })
  } catch {
    return null
  }
}
