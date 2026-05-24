'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const PP = "'PPNeueCorp', system-ui, sans-serif"

const process = [
  {
    number: '01',
    title: 'Detect',
    description:
      'We begin by listening — to the market, the audience, and the brand itself. Uncovering latent tensions, mapping the competitive landscape, and finding the space where your brand can live with conviction.',
  },
  {
    number: '02',
    title: 'Define',
    description:
      'Strategy is the backbone of everything we build. We articulate who you are, what you stand for, and how you should speak — shaping a brand platform that acts as the compass for every creative decision.',
  },
  {
    number: '03',
    title: 'Design',
    description:
      'Form follows meaning. Only once the strategy is settled do we build the visual system — typography, colour, communication architecture — everything coherent, nothing arbitrary.',
  },
  {
    number: '04',
    title: 'Deliver',
    description:
      'A brand only works if it works in the world. We launch, document, and guard the brand over time — ensuring it remains coherent as it meets new contexts, channels, and audiences.',
  },
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.fromTo(
        '.about-heading-word',
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1,
          ease: 'power4.out',
          stagger: 0.06,
          scrollTrigger: { trigger: '.about-heading', start: 'top 80%', once: true },
        }
      )
      gsap.fromTo(
        '.about-body',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.about-body', start: 'top 82%', once: true },
        }
      )
      gsap.fromTo(
        '.process-item',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: { trigger: '.process-grid', start: 'top 78%', once: true },
        }
      )
      gsap.fromTo(
        '.about-red-line',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: 'power4.inOut',
          transformOrigin: 'left center',
          scrollTrigger: { trigger: '.about-red-line', start: 'top 85%', once: true },
        }
      )
    },
    { scope: sectionRef }
  )

  return (
    <section ref={sectionRef} id="about" className="bg-dark section-padding">
      <div className="container mx-auto">

        {/* Section eyebrow */}
        <div className="flex items-center gap-4 mb-12">
          <span className="w-8 h-px bg-red" />
          <span className="eyebrow">About</span>
        </div>

        {/* Editorial statement */}
        <p
          className="mb-8"
          style={{
            fontFamily:    PP,
            fontWeight:    800,
            fontSize:      11,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color:         '#D0274B',
          }}
        >
          Diagnosis before design. Always.
        </p>

        {/* Main heading */}
        <div className="about-heading mb-10 md:mb-16">
          <div className="overflow-hidden">
            <div className="flex flex-wrap gap-x-4">
              {['We build brands', 'that outlast', 'the moment.'].map((word) => (
                <span key={word} className="overflow-hidden">
                  <span
                    className="about-heading-word inline-block text-display-md text-white uppercase"
                    style={{ fontFamily: PP, fontWeight: 900 }}
                  >
                    {word}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Body + stat */}
        <div className="about-body grid grid-cols-1 md:grid-cols-12 gap-12 mb-20 md:mb-32">
          <div className="md:col-span-6">
            <p style={{
              fontFamily: PP,
              fontWeight: 400,
              fontSize:   18,
              lineHeight: 1.7,
              color:      '#919191',
            }}>
              Thinchronize is a strategy-led creative studio. We are not here to make your brand
              look better. We are here to make it true. Every engagement starts with a diagnosis —
              not a brief — because we don&apos;t design until we understand.
            </p>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <div className="border border-white/10 rounded-2xl p-8">
              <p
                className="text-display-sm text-white mb-2 uppercase"
                style={{ fontFamily: PP, fontWeight: 900 }}
              >
                150+
              </p>
              <p style={{
                fontFamily: PP,
                fontWeight: 400,
                fontSize:   14,
                color:      '#919191',
              }}>
                clients built on referral — across Lebanon, the Gulf, and Europe.
              </p>
            </div>
          </div>
        </div>

        {/* Red divider */}
        <div className="about-red-line h-px bg-red mb-16 md:mb-24" />

        {/* Process header */}
        <div className="flex items-center justify-between mb-16">
          <h3
            className="text-white uppercase"
            style={{ fontFamily: PP, fontWeight: 800, fontSize: 20 }}
          >
            Our Process
          </h3>
          <span className="eyebrow">The 4D Framework</span>
        </div>

        {/* 4D grid */}
        <div className="process-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {process.map((step) => (
            <div key={step.number} className="process-item will-change-transform">
              <p
                className="mb-4"
                style={{
                  fontFamily:    PP,
                  fontWeight:    900,
                  fontSize:      'clamp(56px, 6vw, 96px)',
                  lineHeight:    1,
                  letterSpacing: '-0.02em',
                  color:         '#D0274B',
                }}
              >
                {step.number}
              </p>
              <h4
                className="text-white uppercase mb-4"
                style={{
                  fontFamily:    PP,
                  fontWeight:    800,
                  fontSize:      'clamp(24px, 2.2vw, 32px)',
                  letterSpacing: '0.02em',
                  lineHeight:    1,
                }}
              >
                {step.title}
              </h4>
              <p style={{
                fontFamily: PP,
                fontWeight: 400,
                fontSize:   14,
                lineHeight: 1.7,
                color:      '#919191',
              }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
