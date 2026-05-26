/**
 * ContactSection — Premium contact form
 *
 * Features:
 *  - Glassmorphism form
 *  - GSAP ScrollTrigger reveals
 *  - Contact info (Email, Phone, WhatsApp)
 */

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BRAND, SOCIALS } from '../utils'
import MagneticButton from '../components/MagneticButton'

gsap.registerPlugin(ScrollTrigger)

export default function ContactSection() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const formRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current?.children,
        { opacity: 0, x: -40, filter: 'blur(6px)' },
        {
          opacity: 1, x: 0, filter: 'blur(0px)',
          duration: 1, stagger: 0.15, ease: 'power4.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      )

      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 50, filter: 'blur(6px)' },
        {
          opacity: 1, y: 0, filter: 'blur(0px)',
          duration: 1, delay: 0.3, ease: 'power4.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Placeholder for EmailJS integration
    alert('Thank you for reaching out! We will get back to you shortly.')
  }

  return (
    <section ref={sectionRef} id="contact" className="relative overflow-hidden" aria-label="Contact Us">
      <div className="section-divider" aria-hidden="true" />
      <div className="glow-orb top-0 right-0 w-[600px] h-[600px] bg-brand-600/[0.04]" aria-hidden="true" />

      <div className="container-wide section-padding relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Left Column: Info */}
          <div ref={contentRef} className="flex flex-col items-start">
            <span className="inline-block px-3.5 py-1 mb-4 rounded-full border border-white/[0.08] bg-white/[0.025] text-[0.7rem] sm:text-xs font-medium text-brand-400 uppercase tracking-[0.15em]">
              Start a Project
            </span>
            <h2 className="font-display font-bold tracking-tight leading-[1.1]" style={{ fontSize: 'clamp(2rem, 4vw + 0.5rem, 4rem)' }}>
              Let's build something <span className="gradient-text">extraordinary</span>.
            </h2>
            <p className="mt-6 text-white/45 leading-relaxed max-w-md" style={{ fontSize: 'clamp(0.9rem, 1vw + 0.5rem, 1.1rem)' }}>
              Ready to elevate your digital presence? Reach out to us, and let's discuss how we can bring your vision to life.
            </p>

            <div className="mt-10 sm:mt-14 flex flex-col gap-6">
              <div>
                <p className="text-[0.75rem] font-medium text-white/30 uppercase tracking-[0.1em] mb-1">Email Us</p>
                <a href={`mailto:${BRAND.email}`} className="text-lg sm:text-xl font-display font-medium text-white/90 hover:text-brand-400 transition-colors">
                  {BRAND.email}
                </a>
              </div>
              <div>
                <p className="text-[0.75rem] font-medium text-white/30 uppercase tracking-[0.1em] mb-1">Call Us</p>
                <a href={`tel:${BRAND.phone}`} className="text-lg sm:text-xl font-display font-medium text-white/90 hover:text-brand-400 transition-colors">
                  {BRAND.phone}
                </a>
              </div>
              <div>
                <p className="text-[0.75rem] font-medium text-white/30 uppercase tracking-[0.1em] mb-1">Location</p>
                <p className="text-lg sm:text-xl font-display font-medium text-white/90">
                  {BRAND.location}
                </p>
              </div>
            </div>

            <div className="mt-12 flex items-center gap-4">
              <MagneticButton
                as="a"
                href={BRAND.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                strength={0.2}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-full bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 border border-[#25D366]/20 transition-all touch-target"
              >
                Chat on WhatsApp
              </MagneticButton>
            </div>
          </div>

          {/* Right Column: Form */}
          <div ref={formRef}>
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 lg:p-10 rounded-2xl border border-white/[0.08] bg-surface-950/50 backdrop-blur-md shadow-2xl flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-[0.75rem] font-medium text-white/50 px-1">Full Name</label>
                  <input type="text" id="name" required className="bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-brand-500/50 focus:bg-white/[0.05] transition-all" placeholder="John Doe" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-[0.75rem] font-medium text-white/50 px-1">Email Address</label>
                  <input type="email" id="email" required className="bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-brand-500/50 focus:bg-white/[0.05] transition-all" placeholder="john@example.com" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="project" className="text-[0.75rem] font-medium text-white/50 px-1">Project Type</label>
                <select id="project" required className="bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3.5 text-sm text-white/70 focus:outline-none focus:border-brand-500/50 focus:bg-white/[0.05] transition-all appearance-none">
                  <option value="" disabled selected className="bg-surface-900 text-white/50">Select a project type</option>
                  <option value="Website Development" className="bg-surface-900 text-white">Website Development</option>
                  <option value="3D Interactive Website" className="bg-surface-900 text-white">3D Interactive Website</option>
                  <option value="AI Automation" className="bg-surface-900 text-white">AI Automation</option>
                  <option value="Branding" className="bg-surface-900 text-white">Branding</option>
                  <option value="UI/UX Design" className="bg-surface-900 text-white">UI/UX Design</option>
                  <option value="Performance Optimization" className="bg-surface-900 text-white">Performance Optimization</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-[0.75rem] font-medium text-white/50 px-1">Message</label>
                <textarea id="message" required rows={4} className="bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-brand-500/50 focus:bg-white/[0.05] transition-all resize-none" placeholder="Tell us about your goals..."></textarea>
              </div>

              <MagneticButton
                as="button"
                type="submit"
                strength={0.15}
                className="mt-2 w-full flex items-center justify-center gap-2 px-6 py-4 text-sm font-semibold rounded-xl bg-brand-600 hover:bg-brand-500 text-white hover:shadow-xl hover:shadow-brand-600/25 active:scale-[0.98] transition-all touch-target"
              >
                Send Message
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                </svg>
              </MagneticButton>
            </form>
          </div>

        </div>
      </div>
    </section>
  )
}
