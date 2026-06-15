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
  const ogImage = `https://thinchronize.com${project.coverImage}`
  const url = `https://thinchronize.com/portfolio/${project.id}`
  return {
    title: project.title,
    description: project.tagline,
    alternates: { canonical: url },
    openGraph: {
      title: `${project.title} — Thinchronize`,
      description: project.tagline,
      url,
      type: 'article',
      images: [{ url: ogImage, width: 1200, height: 630, alt: project.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} — Thinchronize`,
      description: project.tagline,
      images: [ogImage],
    },
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
