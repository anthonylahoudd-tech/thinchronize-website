import type { Metadata } from 'next'
import './globals.css'
import SmoothScroll from '@/components/layout/SmoothScroll'
import Header from '@/components/layout/Header'
import ConditionalFooter from '@/components/layout/ConditionalFooter'
import CustomCursor from '@/components/ui/CustomCursor'
import PageTransition from '@/components/layout/PageTransition'

export const metadata: Metadata = {
  title: {
    default: 'Thinchronize — Brand Strategy Studio, Beirut Lebanon',
    template: '%s — Thinchronize',
  },
  description:
    'Thinchronize is a brand strategy and visual identity studio based in Beirut, Lebanon. We build brands through precise, intentional design — from strategy to execution.',
  keywords: [
    'branding agency Lebanon', 'branding agency Beirut', 'brand strategy studio Beirut',
    'brand identity Lebanon', 'visual identity Lebanon', 'rebranding Lebanon',
    'creative studio Beirut', 'brand design Lebanon',
  ],
  openGraph: {
    title: 'Thinchronize — Brand Strategy Studio, Beirut Lebanon',
    description: 'A brand strategy and visual identity studio based in Beirut, Lebanon. We build brands through precision and intentional design.',
    url: 'https://thinchronize.com',
    siteName: 'Thinchronize',
    locale: 'en_US',
    type: 'website',
    images: [{ url: 'https://thinchronize.com/og-image.jpg', width: 1200, height: 630, alt: 'Thinchronize — Brand Strategy Studio, Beirut Lebanon' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thinchronize — Brand Strategy Studio, Beirut Lebanon',
    description: 'A brand strategy and visual identity studio based in Beirut, Lebanon.',
    images: ['https://thinchronize.com/og-image.jpg'],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Preload critical fonts (WOFF2 — ~48% smaller than OTF) */}
        <link rel="preload" href="/fonts/PPNeueCorp-NormalUltrabold.woff2"  as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/PPNeueCorp-ExtendedUltrabold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/PPNeueCorp-NormalMedium.woff2"      as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Thinchronize',
            url: 'https://thinchronize.com',
            logo: 'https://thinchronize.com/logo-wordmark-white.png',
            description: 'Brand strategy and visual identity studio based in Beirut, Lebanon.',
            address: { '@type': 'PostalAddress', addressLocality: 'Beirut', addressCountry: 'LB' },
            sameAs: [
              'https://www.instagram.com/thinchronize/',
              'https://lb.linkedin.com/company/thinchronize',
              'https://www.behance.net/thinchronize',
            ],
          })}}
        />
      </head>
      <body className="bg-dark text-white">
        <PageTransition />
        <CustomCursor />
        <SmoothScroll>
          <Header />
          {/* z-index: 1 keeps page content on top of the sticky footer,
              which sits at bottom: 0 and is revealed as content scrolls away */}
          <main style={{ position: 'relative', zIndex: 1 }}>{children}</main>
          <ConditionalFooter />
        </SmoothScroll>
      </body>
    </html>
  )
}
