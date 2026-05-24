/**
 * Embedded Sanity Studio — available at /studio
 *
 * To enable: copy .env.local.example to .env.local and fill in your
 * NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET values.
 */
export const dynamic = 'force-dynamic'
export const metadata = { title: 'Sanity Studio — Thinchronize' }

import StudioClient from './StudioClient'

export default function StudioPage() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID

  if (!projectId || projectId === 'placeholder') {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center p-8">
        <div className="max-w-md text-center space-y-6">
          <span className="inline-block w-3 h-3 rounded-full bg-red mx-auto" />
          <h1 className="text-white text-2xl font-medium">Sanity Studio not configured</h1>
          <p className="text-neutral text-base leading-relaxed">
            To access the CMS, create a{' '}
            <a
              href="https://sanity.io/manage"
              className="text-red underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Sanity project
            </a>
            {' '}and add your credentials to{' '}
            <code className="text-white bg-white/10 px-1.5 py-0.5 rounded text-sm">.env.local</code>.
          </p>
          <pre className="text-left text-sm bg-white/5 rounded-xl p-4 text-neutral">
            {`NEXT_PUBLIC_SANITY_PROJECT_ID=your_id\nNEXT_PUBLIC_SANITY_DATASET=production`}
          </pre>
          <p className="text-neutral text-sm">Then restart the dev server and visit /studio.</p>
        </div>
      </div>
    )
  }

  return <StudioClient />
}
