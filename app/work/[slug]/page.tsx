import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getCaseStudyBySlug, getCaseStudies } from '@/lib/sanity/queries'
import { ArrowLeft } from 'lucide-react'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const cases = await getCaseStudies()
  return cases.map((c) => ({ slug: c.slug.current }))
}

export default async function CaseStudyPage({ params }: Props) {
  const caseStudy = await getCaseStudyBySlug(params.slug)
  if (!caseStudy) notFound()

  const coverSrc = `https://picsum.photos/seed/${caseStudy._id}/1600/900`

  return (
    <article className="bg-dark min-h-screen pt-32">
      {/* Hero */}
      <div className="container mx-auto">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-neutral text-sm hover:text-white transition-colors mb-16 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          All Work
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div>
            <p className="text-neutral text-sm tracking-widest uppercase mb-4">
              {caseStudy.category?.replace(/-/g, ' ')}
            </p>
            <h1 className="text-display-lg text-white mb-6">{caseStudy.title}</h1>
            {caseStudy.tagline && (
              <p className="text-xl text-neutral leading-relaxed">{caseStudy.tagline}</p>
            )}
          </div>

          <div className="lg:pt-16 space-y-6">
            {caseStudy.client && (
              <div>
                <p className="text-neutral text-xs tracking-widest uppercase mb-1">Client</p>
                <p className="text-white">{caseStudy.client}</p>
              </div>
            )}
            {caseStudy.year && (
              <div>
                <p className="text-neutral text-xs tracking-widest uppercase mb-1">Year</p>
                <p className="text-white">{caseStudy.year}</p>
              </div>
            )}
            {caseStudy.services && caseStudy.services.length > 0 && (
              <div>
                <p className="text-neutral text-xs tracking-widest uppercase mb-2">Services</p>
                <div className="flex flex-wrap gap-2">
                  {caseStudy.services.map((s) => (
                    <span
                      key={s}
                      className="text-sm text-neutral border border-neutral/30 rounded-full px-3 py-1"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Cover image */}
        <div className="relative w-full aspect-[16/9] mb-32 overflow-hidden">
          <Image src={coverSrc} alt={caseStudy.title} fill className="object-cover" priority />
        </div>

        {/* Body */}
        {(caseStudy.challenge || caseStudy.solution) && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32">
            {caseStudy.challenge && (
              <div>
                <p className="text-red text-sm tracking-widest uppercase mb-6">The Challenge</p>
                <p className="text-neutral text-lg leading-relaxed">{caseStudy.challenge}</p>
              </div>
            )}
            {caseStudy.solution && (
              <div>
                <p className="text-red text-sm tracking-widest uppercase mb-6">The Solution</p>
                <p className="text-neutral text-lg leading-relaxed">{caseStudy.solution}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Next project CTA */}
      <div className="border-t border-white/10 mt-20">
        <div className="container mx-auto py-16">
          <Link href="/#work" className="group flex items-center justify-between">
            <span className="text-neutral text-sm tracking-widest uppercase">Next Project</span>
            <span className="text-display-sm text-white group-hover:text-red transition-colors">
              View All Work →
            </span>
          </Link>
        </div>
      </div>
    </article>
  )
}
