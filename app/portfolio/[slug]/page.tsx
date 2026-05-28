import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { PROJECTS, getProjectBySlug, type Project } from '@/lib/projects'
import PortfolioProjectClient from './PortfolioProjectClient'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  // Exclude 'whatsub' and 'cafe-bdooz' — they have dedicated pages
  return PROJECTS.filter(p => p.id !== 'whatsub' && p.id !== 'cafe-bdooz').map(p => ({ slug: p.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProjectBySlug(params.slug)
  if (!project) return { title: 'Project' }
  return {
    title: project.title,
    description: project.brief,
  }
}

export default function PortfolioProjectPage({ params }: Props) {
  const project = getProjectBySlug(params.slug)
  if (!project) redirect('/portfolio')

  // Pick 2 other projects for "More Work"
  const moreWork: Project[] = PROJECTS.filter(p => p.id !== project!.id).slice(0, 2)

  return <PortfolioProjectClient project={project!} moreWork={moreWork} />
}
