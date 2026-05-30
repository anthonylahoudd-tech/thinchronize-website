import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import fs from 'fs'
import path from 'path'
import { PROJECTS, getProjectBySlug } from '@/lib/projects'
import PortfolioProjectClient from './PortfolioProjectClient'

interface Props {
  params: { slug: string }
}

function hasDedicatedPage(id: string): boolean {
  const p = path.join(process.cwd(), 'app', 'portfolio', id, 'page.tsx')
  return fs.existsSync(p)
}

export async function generateStaticParams() {
  return PROJECTS.filter(p => !hasDedicatedPage(p.id)).map(p => ({ slug: p.id }))
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

  const currentIndex = PROJECTS.findIndex(p => p.id === project!.id)
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length]

  return (
    <PortfolioProjectClient
      project={project!}
      nextProject={nextProject}
      currentIndex={currentIndex}
    />
  )
}
