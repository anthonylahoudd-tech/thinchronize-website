'use client'

import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useForm } from 'react-hook-form'
import { CheckCircle } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

interface FormData {
  name: string
  email: string
  company?: string
  message: string
  service: string
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>()

  useGSAP(
    () => {
      gsap.fromTo(
        '.contact-heading-word',
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 0.9,
          ease: 'power4.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: '.contact-heading',
            start: 'top 80%',
            once: true,
          },
        }
      )

      gsap.fromTo(
        '.contact-form',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-form',
            start: 'top 82%',
            once: true,
          },
        }
      )

      gsap.fromTo(
        '.contact-info',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-info',
            start: 'top 85%',
            once: true,
          },
        }
      )
    },
    { scope: sectionRef }
  )

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    // Simulate API call — replace with your actual form handler (Resend, Formspree, etc.)
    await new Promise((res) => setTimeout(res, 1200))
    console.log('Form data:', data)
    setLoading(false)
    setSubmitted(true)
    reset()
  }

  return (
    <section ref={sectionRef} id="contact" className="section-padding border-t border-white/10" style={{ background: '#000000' }}>
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="w-8 h-px bg-red" />
          <span className="eyebrow">Contact</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
          {/* Left — heading + info */}
          <div className="lg:col-span-5">
            <div className="contact-heading mb-10">
              <div className="flex flex-wrap gap-x-4">
                {["Let's make", "something worth keeping."].map((word) => (
                  <span key={word} className="overflow-hidden w-full">
                    <span className="contact-heading-word inline-block text-display-md text-white font-display font-black uppercase leading-tight">
                      {word}
                    </span>
                  </span>
                ))}
              </div>
            </div>

            <p className="text-neutral text-base leading-relaxed mb-12 max-w-sm">
              We take on a limited number of projects to ensure full attention. Tell us about your
              brand and we will be in touch within 48 hours.
            </p>

            <div className="contact-info opacity-0 space-y-6">
              <div>
                <p className="text-neutral text-xs tracking-widest uppercase mb-1">Email</p>
                <a
                  href="mailto:hello@thinchronize.com"
                  className="text-white text-sm hover:text-red transition-colors link-underline"
                >
                  hello@thinchronize.com
                </a>
              </div>
              <div>
                <p className="text-neutral text-xs tracking-widest uppercase mb-1">Based in</p>
                <p className="text-white text-sm">Beirut, Lebanon · Remote worldwide</p>
              </div>
              <div>
                <p className="text-neutral text-xs tracking-widest uppercase mb-3">Follow</p>
                <div className="flex gap-4">
                  {['Instagram', 'LinkedIn', 'Behance'].map((platform) => (
                    <a
                      key={platform}
                      href="#"
                      className="text-neutral text-sm hover:text-white transition-colors link-underline"
                    >
                      {platform}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-7">
            {submitted ? (
              <div className="contact-form opacity-0 flex flex-col items-start gap-6 py-16">
                <CheckCircle className="w-12 h-12 text-red" />
                <h3 className="text-white text-2xl font-medium">Message received.</h3>
                <p className="text-neutral text-base leading-relaxed max-w-md">
                  Thank you for reaching out. We review every inquiry personally and will respond
                  within 48 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-neutral text-sm hover:text-white transition-colors link-underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="contact-form opacity-0 space-y-10"
              >
                {/* Row 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                  <div>
                    <label className="block text-neutral text-xs tracking-widest uppercase mb-3">
                      Name *
                    </label>
                    <input
                      {...register('name', { required: 'Name is required' })}
                      placeholder="Your name"
                      className="form-input"
                    />
                    {errors.name && (
                      <p className="text-red text-xs mt-2">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-neutral text-xs tracking-widest uppercase mb-3">
                      Email *
                    </label>
                    <input
                      {...register('email', {
                        required: 'Email is required',
                        pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' },
                      })}
                      placeholder="your@email.com"
                      type="email"
                      className="form-input"
                    />
                    {errors.email && (
                      <p className="text-red text-xs mt-2">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                  <div>
                    <label className="block text-neutral text-xs tracking-widest uppercase mb-3">
                      Company / Brand
                    </label>
                    <input
                      {...register('company')}
                      placeholder="Your company"
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral text-xs tracking-widest uppercase mb-3">
                      Service *
                    </label>
                    <select
                      {...register('service', { required: 'Please select a service' })}
                      className="form-input appearance-none bg-transparent"
                      defaultValue=""
                    >
                      <option value="" disabled className="bg-dark">
                        Select a service
                      </option>
                      <option value="brand-engagement" className="bg-dark">
                        Brand Engagement
                      </option>
                      <option value="brand-guardianship" className="bg-dark">
                        Brand Guardianship
                      </option>
                      <option value="not-sure" className="bg-dark">
                        Not sure yet
                      </option>
                    </select>
                    {errors.service && (
                      <p className="text-red text-xs mt-2">{errors.service.message}</p>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-neutral text-xs tracking-widest uppercase mb-3">
                    Tell us about your brand *
                  </label>
                  <textarea
                    {...register('message', { required: 'Please tell us about your project' })}
                    placeholder="What are you building? What's the challenge?"
                    rows={5}
                    className="form-input resize-none"
                  />
                  {errors.message && (
                    <p className="text-red text-xs mt-2">{errors.message.message}</p>
                  )}
                </div>

                {/* Submit */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-red text-white rounded-full text-sm font-medium hover:bg-white hover:text-dark transition-all duration-300 disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Inquiry
                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                          →
                        </span>
                      </>
                    )}
                  </button>
                  <p className="text-neutral text-xs mt-4">
                    We respond to every message within 48 hours.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
