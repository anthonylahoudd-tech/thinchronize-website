'use client'

import Link from 'next/link'
import Image from 'next/image'

const PP   = "'PPNeueCorp', system-ui, sans-serif"
const year = new Date().getFullYear()

interface FooterLink {
  label: string
  href: string
  external?: boolean
}

const footerLinks: Record<string, FooterLink[]> = {
  Studio: [
    { label: 'Home',      href: '/' },
    { label: 'Services',  href: '/services' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Journal',   href: '/journal' },
  ],
  Connect: [
    { label: 'Contact',   href: '/contact' },
    { label: 'Instagram', href: 'https://www.instagram.com/thinchronize/', external: true },
    { label: 'Facebook',  href: 'https://www.facebook.com/thinchronize/',  external: true },
    { label: 'YouTube',   href: 'https://www.youtube.com/@thinchronize',   external: true },
    { label: 'LinkedIn',  href: 'https://lb.linkedin.com/company/thinchronize', external: true },
  ],
}

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: '#D0274B',
      position:        'sticky',
      bottom:          0,
      zIndex:          0,
    }}>
      <div className="container mx-auto py-20">

        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">

          {/* Brand */}
          <div className="md:col-span-4">
            <Link href="/" className="flex items-center mb-6">
              <Image
                src="/logo-wordmark-white.png"
                alt="Thinchronize"
                width={200}
                height={32}
                style={{ height: 30, width: 'auto' }}
              />
            </Link>
            <p
              style={{
                fontFamily: PP,
                fontWeight: 400,
                fontSize:   14,
                lineHeight: 1.7,
                color:      'rgba(255,255,255,0.7)',
                maxWidth:   280,
              }}
            >
              A strategic creative studio based in Lebanon. We build brands through precision,
              intention, and mindful design.
            </p>
          </div>

          {/* Nav columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section} className="md:col-span-2">
              <p
                className="mb-5"
                style={{
                  fontFamily:    PP,
                  fontWeight:    800,
                  fontSize:      10,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color:         'rgba(255,255,255,0.5)',
                }}
              >
                {section}
              </p>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      className="link-underline"
                      style={{
                        fontFamily: PP,
                        fontWeight: 400,
                        fontSize:   14,
                        color:      'rgba(255,255,255,0.8)',
                        transition: 'color 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#fff')}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.8)')}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Stacked logo — right column */}
          <div className="md:col-span-4 flex items-center justify-center md:justify-end">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img loading="lazy"
              src="/images/logo-stacked.png"
              alt="Thinchronize"
              style={{
                height:    '180px',
                width:     'auto',
                objectFit: 'contain',
                opacity:   0.9,
                display:   'block',
              }}
              className="footer-stacked-logo"
            />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 border-t border-white/20">
          <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>
            © {year} Thinchronize. All rights reserved.
          </p>
          <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>
            Mindful Design · Beirut, Lebanon
          </p>
        </div>

      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 767px) {
          .footer-stacked-logo { height: 100px !important; }
        }
      ` }} />
    </footer>
  )
}
