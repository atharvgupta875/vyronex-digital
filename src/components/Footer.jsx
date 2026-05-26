/**
 * Footer — Premium minimal footer with scroll-triggered reveal
 *
 * Animations:
 *  - GSAP ScrollTrigger fade-in + slide-up
 *  - Staggered link reveals
 */

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BRAND, NAV_LINKS, SOCIALS } from '../utils'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const year = new Date().getFullYear()
  const footerRef = useRef(null)
  const brandRef = useRef(null)
  const linksRef = useRef(null)
  const socialsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Brand section
      gsap.fromTo(
        brandRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: footerRef.current, start: 'top 90%' },
        }
      )

      // Nav links stagger
      if (linksRef.current) {
        gsap.fromTo(
          linksRef.current.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0, duration: 0.6, stagger: 0.06, ease: 'power3.out',
            scrollTrigger: { trigger: footerRef.current, start: 'top 90%' },
          }
        )
      }

      // Socials stagger
      if (socialsRef.current) {
        gsap.fromTo(
          socialsRef.current.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0, duration: 0.6, stagger: 0.06, delay: 0.2, ease: 'power3.out',
            scrollTrigger: { trigger: footerRef.current, start: 'top 90%' },
          }
        )
      }
    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer ref={footerRef} id="footer" className="relative overflow-hidden" role="contentinfo">
      <div className="section-divider" aria-hidden="true" />
      <div className="glow-orb -bottom-24 left-1/2 -translate-x-1/2 w-[300px] h-[200px] sm:w-[500px] sm:h-[300px] bg-brand-600/[0.04]" aria-hidden="true" />

      <div className="container-wide relative z-10 py-10 sm:py-14 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-4 items-center">
          
          <div ref={brandRef} className="flex flex-col items-center sm:items-start gap-1.5 lg:justify-self-start">
            <a href="#home" className="font-display text-lg font-bold tracking-tight hover:opacity-80 transition-opacity">
              Vyronex Digital<span className="gradient-text">.</span>
            </a>
            <p className="text-[0.7rem] sm:text-xs text-white/30 font-medium">
              &copy; {year} {BRAND.name}. All rights reserved.
            </p>
          </div>

          <nav aria-label="Footer navigation" className="lg:justify-self-center">
            <ul ref={linksRef} className="flex flex-wrap justify-center items-center gap-4 sm:gap-6">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <a href={href} className="text-xs sm:text-[0.8rem] text-white/35 hover:text-white/70 font-medium transition-colors duration-300">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:justify-self-end">
            <ul ref={socialsRef} className="flex flex-wrap justify-center sm:justify-end items-center gap-4">
              {SOCIALS.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className="text-xs sm:text-[0.8rem] text-white/35 hover:text-brand-400 font-medium transition-colors duration-300">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
