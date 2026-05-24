import { redirect } from 'next/navigation'
import { PROJECTS, getProjectBySlug } from '@/lib/projects'
import type { Metadata } from 'next'
import ProjectPageClient from './ProjectPageClient'

// ─── Static generation ────────────────────────────────────────────────────────

export async function generateStaticParams() {
  return PROJECTS.map(p => ({ slug: p.id }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = getProjectBySlug(params.slug)
  if (!project) return {}
  return {
    title:       project.title,
    description: project.brief,
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug)
  if (!project) redirect('/work')

  return <ProjectPageClient project={project} />
}
