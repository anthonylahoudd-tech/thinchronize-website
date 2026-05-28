import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import fs from 'fs'
import path from 'path'
import { PROJECTS, getProjectBySlug, type Project } from '@/lib/projects'
import PortfolioProjectClient from './PortfolioProjectClient'

interface Props {
  params: { slug: string }
}

// Auto-detect: if a dedicated app/portfolio/[id]/page.tsx exists, skip it here.
// You never need to touch this file again — just create the folder and it works.
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

  // Pick 2 other projects for "More Work"
  const moreWork: Project[] = PROJECTS.filter(p => p.id !== project!.id).slice(0, 2)

  return <PortfolioProjectClient project={project!} moreWork={moreWork} />
}
