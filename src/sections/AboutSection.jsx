/**
 * AboutSection — Premium agency introduction
 *
 * Features:
 *  - 2-column layout (Text + Stats/Process)
 *  - GSAP ScrollTrigger reveals
 *  - Cinematic spacing
 */

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BRAND, STATS, PROCESS } from '../utils'

gsap.registerPlugin(ScrollTrigger)

export default function AboutSection() {
  const sectionRef = useRef(null)
  const leftColRef = useRef(null)
  const rightColRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left column reveal
      gsap.fromTo(
        leftColRef.current?.children,
        { opacity: 0, x: -40, filter: 'blur(6px)' },
        {
          opacity: 1, x: 0, filter: 'blur(0px)',
          duration: 1, stagger: 0.15, ease: 'power4.out',
          scrollTrigger: { trigger: leftColRef.current, start: 'top 85%' },
        }
      )

      // Right column (Stats & Process) stagger
      if (rightColRef.current) {
        gsap.fromTo(
          rightColRef.current.children,
          { opacity: 0, x: 40, filter: 'blur(6px)' },
          {
            opacity: 1, x: 0, filter: 'blur(0px)',
            duration: 1, stagger: 0.15, ease: 'power4.out',
            scrollTrigger: { trigger: rightColRef.current, start: 'top 85%' },
          }
        )
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden"
      aria-label="About Us"
    >
      <div className="section-divider" aria-hidden="true" />
      <div className="glow-orb top-1/4 -right-[10%] w-[600px] h-[600px] bg-brand-600/[0.03]" aria-hidden="true" />

      <div className="container-wide section-padding relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 xl:gap-32 items-start">
          
          {/* Left Column: Text */}
          <div ref={leftColRef} className="flex flex-col items-start lg:sticky lg:top-32">
            <span className="inline-block px-3.5 py-1 mb-4 rounded-full border border-white/[0.08] bg-white/[0.025] text-[0.7rem] sm:text-xs font-medium text-brand-400 uppercase tracking-[0.15em]">
              About {BRAND.name}
            </span>
            <h2 className="font-display font-bold tracking-tight leading-[1.1]" style={{ fontSize: 'clamp(1.75rem, 3vw + 0.5rem, 3.25rem)' }}>
              Redefining the <span className="gradient-text">digital frontier</span>.
            </h2>
            <p className="mt-6 text-white/45 leading-relaxed" style={{ fontSize: 'clamp(0.9rem, 1vw + 0.5rem, 1.15rem)' }}>
              {BRAND.description}
            </p>
            <p className="mt-4 text-white/40 leading-relaxed text-sm sm:text-base">
              We don't just build websites; we engineer scalable digital ecosystems. By combining cutting-edge WebGL, AI integrations, and psychological design principles, we create platforms that don't just look beautiful—they convert.
            </p>

            {/* Stats Grid inside left col for desktop, or below text */}
            <div className="grid grid-cols-2 gap-6 sm:gap-8 mt-10 sm:mt-12 w-full">
              {STATS.map(({ value, label }) => (
                <div key={label} className="flex flex-col border-l border-brand-500/30 pl-4 sm:pl-5">
                  <span className="font-display font-bold text-white/90" style={{ fontSize: 'clamp(1.5rem, 2vw + 1rem, 2.5rem)' }}>
                    {value}
                  </span>
                  <span className="text-[0.7rem] sm:text-xs text-white/40 font-medium uppercase tracking-[0.1em] mt-1">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Process */}
          <div ref={rightColRef} className="flex flex-col gap-6 sm:gap-8">
            <h3 className="font-display text-xl sm:text-2xl font-semibold text-white/90 mb-2">Our Process</h3>
            {PROCESS.map(({ step, title, description }) => (
              <div 
                key={step} 
                className="group relative p-6 sm:p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-500"
              >
                <div className="absolute top-6 right-6 font-display font-bold text-5xl text-white/[0.04] group-hover:text-brand-500/[0.1] transition-colors duration-500 pointer-events-none select-none">
                  {step}
                </div>
                <h4 className="font-display text-lg sm:text-xl font-semibold text-white/90 group-hover:text-brand-300 transition-colors duration-300 mb-3">
                  {title}
                </h4>
                <p className="text-[0.85rem] sm:text-sm text-white/40 leading-relaxed group-hover:text-white/50 transition-colors duration-300 relative z-10 max-w-[85%]">
                  {description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
