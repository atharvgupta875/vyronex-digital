/**
 * TestimonialsSection — Client review cards
 *
 * Features:
 *  - Testimonial cards grid
 *  - GSAP ScrollTrigger reveals
 *  - Star ratings
 */

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TESTIMONIALS } from '../utils'

gsap.registerPlugin(ScrollTrigger)

export default function TestimonialsSection() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const cardsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current?.children,
        { opacity: 0, y: 40, filter: 'blur(6px)' },
        {
          opacity: 1, y: 0, filter: 'blur(0px)',
          duration: 1, stagger: 0.15, ease: 'power4.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
        }
      )

      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.8, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' },
          }
        )
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      <div className="section-divider" aria-hidden="true" />
      <div className="glow-orb top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent-glow/[0.03]" aria-hidden="true" />

      <div className="container-wide section-padding relative z-10">
        <div ref={headingRef} className="flex flex-col items-center text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="inline-block px-3.5 py-1 mb-4 rounded-full border border-white/[0.08] bg-white/[0.025] text-[0.7rem] sm:text-xs font-medium text-brand-400 uppercase tracking-[0.15em]">
            Client Success
          </span>
          <h2 className="font-display font-bold tracking-tight leading-[1.1]" style={{ fontSize: 'clamp(1.75rem, 3vw + 0.5rem, 3.25rem)' }}>
            Don't just take <span className="gradient-text">our word</span> for it.
          </h2>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {TESTIMONIALS.map(({ name, role, quote, rating }) => (
            <article 
              key={name}
              className="p-6 sm:p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 mb-5">
                  {[...Array(rating)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-brand-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-[0.9rem] sm:text-base text-white/70 leading-relaxed italic mb-8">
                  "{quote}"
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500/40 to-accent-glow/40 flex items-center justify-center text-sm font-bold text-white">
                  {name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white/90">{name}</h4>
                  <p className="text-[0.7rem] text-white/40">{role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
