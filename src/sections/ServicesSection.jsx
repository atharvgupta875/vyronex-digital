/**
 * ServicesSection — Premium glassmorphism service cards
 *
 * Features:
 *  - 6 service cards in responsive grid
 *  - Glassmorphism with hover glow
 *  - GSAP ScrollTrigger staggered reveal
 *  - SVG icon system
 *  - Responsive: 1 col → 2 col → 3 col
 */

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SERVICES } from '../utils'

gsap.registerPlugin(ScrollTrigger)

const ICONS = {
  code: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
    </svg>
  ),
  cube: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
    </svg>
  ),
  brain: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
    </svg>
  ),
  palette: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z" />
    </svg>
  ),
  fingerprint: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.864 4.243A7.5 7.5 0 0 1 19.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 0 0 4.5 10.5a48.667 48.667 0 0 0 .564 7.688M12 3.75a7.5 7.5 0 0 1 0 15M12 3.75a5.25 5.25 0 0 0-5.25 5.25c0 6.83-.18 8.94-.642 10.287M12 3.75a5.25 5.25 0 0 1 4.27 8.423M12 18.75a7.465 7.465 0 0 1-1.227-.089" />
    </svg>
  ),
  gauge: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
    </svg>
  ),
}

export default function ServicesSection() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const cardsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(
        headingRef.current?.children,
        { opacity: 0, y: 40, filter: 'blur(6px)' },
        {
          opacity: 1, y: 0, filter: 'blur(0px)',
          duration: 1, stagger: 0.15, ease: 'power4.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
        }
      )

      // Card stagger
      if (cardsRef.current) {
        const cards = cardsRef.current.children
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.8, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' },
          }
        )
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative overflow-hidden"
      aria-label="Services"
    >
      <div className="section-divider" aria-hidden="true" />

      {/* Ambient glow */}
      <div className="glow-orb top-1/4 -right-[15%] w-[500px] h-[500px] bg-brand-600/[0.04]" aria-hidden="true" />
      <div className="glow-orb bottom-0 -left-[10%] w-[400px] h-[400px] bg-accent-glow/[0.03]" aria-hidden="true" />

      <div className="container-wide section-padding relative z-10">
        {/* Heading */}
        <div ref={headingRef} className="max-w-2xl mb-12 sm:mb-16 lg:mb-20">
          <span className="inline-block px-3.5 py-1 mb-4 rounded-full border border-white/[0.08] bg-white/[0.025]
                          text-[0.7rem] sm:text-xs font-medium text-brand-400 uppercase tracking-[0.15em]">
            Our Services
          </span>
          <h2
            className="font-display font-bold tracking-tight leading-[1.1]"
            style={{ fontSize: 'clamp(1.75rem, 3vw + 0.5rem, 3.25rem)' }}
          >
            Everything you need to{' '}
            <span className="gradient-text">dominate digital</span>.
          </h2>
          <p className="mt-4 text-white/40 leading-relaxed max-w-lg"
             style={{ fontSize: 'clamp(0.85rem, 0.7vw + 0.55rem, 1.05rem)' }}>
            From concept to deployment, we deliver end-to-end digital solutions
            that drive measurable results.
          </p>
        </div>

        {/* Cards grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6"
        >
          {SERVICES.map(({ title, description, icon }) => (
            <article
              key={title}
              className="group relative p-6 sm:p-7 lg:p-8 rounded-2xl
                         border border-white/[0.06] bg-white/[0.02]
                         backdrop-blur-sm
                         hover:bg-white/[0.04] hover:border-white/[0.12]
                         transition-all duration-500
                         hover:shadow-xl hover:shadow-brand-600/[0.05]"
            >
              {/* Corner glow on hover */}
              <div className="absolute -top-px -right-px w-20 h-20
                              bg-gradient-to-bl from-brand-500/10 to-transparent
                              rounded-tr-2xl rounded-bl-[80px]
                              opacity-0 group-hover:opacity-100
                              transition-opacity duration-500" aria-hidden="true" />

              {/* Icon */}
              <div className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center
                              rounded-xl bg-brand-600/[0.1] text-brand-400
                              group-hover:bg-brand-600/[0.15] group-hover:text-brand-300
                              transition-all duration-500 mb-5 sm:mb-6">
                {ICONS[icon]}
              </div>

              <h3 className="font-display font-semibold text-base sm:text-lg text-white/90
                             group-hover:text-white transition-colors duration-300 mb-2.5">
                {title}
              </h3>
              <p className="text-[0.8rem] sm:text-sm text-white/35 leading-relaxed
                            group-hover:text-white/45 transition-colors duration-300">
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
