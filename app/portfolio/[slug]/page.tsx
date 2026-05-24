import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { PROJECTS, getProjectBySlug } from '@/lib/projects'
import PortfolioProjectClient from './PortfolioProjectClient'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return PROJECTS.map(p => ({ slug: p.id }))
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
  return <PortfolioProjectClient project={project} />
}
