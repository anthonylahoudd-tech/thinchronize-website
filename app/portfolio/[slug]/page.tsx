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
    description: project.brief.body,
  }
}

export default function PortfolioProjectPage({ params }: Props) {
  const project = getProjectBySlug(params.slug)
  if (!project) redirect('/portfolio')

  const total        = PROJECTS.length
  const currentIndex = PROJECTS.findIndex(p => p.id === project!.id)
  const nextProject  = PROJECTS[(currentIndex + 1) % total]
  const prevProject  = PROJECTS[(currentIndex - 1 + total) % total]

  return (
    <PortfolioProjectClient
      project={project!}
      nextProject={nextProject}
      prevProject={prevProject}
      currentIndex={currentIndex}
    />
  )
}
