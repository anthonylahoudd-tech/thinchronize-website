import { redirect } from 'next/navigation'
import { PROJECTS } from '@/lib/projects'

export async function generateStaticParams() {
  return PROJECTS.map(p => ({ slug: p.id }))
}

export default function WorkProjectPage({ params }: { params: { slug: string } }) {
  redirect(`/portfolio/${params.slug}`)
}
