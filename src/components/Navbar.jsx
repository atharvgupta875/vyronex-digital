/**
 * Navbar — Premium glassmorphism navigation with GSAP entrance
 *
 * Animations:
 *  - Cinematic slide-down entrance on page load
 *  - Glass backdrop materializes on scroll
 *  - Subtle top-edge light accent
 *  - Animated hamburger → X morph
 *  - Staggered mobile menu link reveals
 */

import { useState, useEffect, useCallback, useRef } from 'react'
import gsap from 'gsap'
import { NAV_LINKS } from '../utils'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef(null)
  const logoRef = useRef(null)
  const linksRef = useRef(null)
  const ctaRef = useRef(null)

  /* ── Cinematic entrance ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(navRef.current, { y: -100, opacity: 0 })

      gsap.to(navRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power4.out',
        delay: 0.1,
      })

      // Stagger desktop links appearance
      if (linksRef.current) {
        const links = linksRef.current.querySelectorAll('li')
        gsap.set(links, { y: -20, opacity: 0 })
        gsap.to(links, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          delay: 0.6,
        })
      }

      if (ctaRef.current) {
        gsap.set(ctaRef.current, { y: -20, opacity: 0, scale: 0.9 })
        gsap.to(ctaRef.current, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: 'power3.out',
          delay: 1,
        })
      }
    }, navRef)

    return () => ctx.revert()
  }, [])

  /* ── Track scroll to toggle glass bg ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ── Lock body scroll when mobile menu is open ── */
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.left = '0'
      document.body.style.right = '0'
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.left = ''
        document.body.style.right = ''
        document.body.style.overflow = ''
        window.scrollTo(0, scrollY)
      }
    }
  }, [isOpen])

  const closeMenu = useCallback(() => setIsOpen(false), [])

  return (
    <nav
      ref={navRef}
      id="navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled || isOpen
          ? 'glass shadow-lg shadow-black/10'
          : 'bg-transparent border-b border-transparent'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Top-edge light accent */}
      <div
        className={`absolute top-0 left-0 w-full h-px transition-opacity duration-500 ${
          scrolled ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(107,130,252,0.15) 50%, transparent)',
        }}
        aria-hidden="true"
      />

      <div className="container-wide flex items-center justify-between h-14 sm:h-16 lg:h-[72px]">
        {/* Logo */}
        <a
          ref={logoRef}
          href="#home"
          className="relative z-50 font-display font-bold tracking-tight select-none
                     text-lg sm:text-xl lg:text-2xl
                     hover:opacity-80 transition-opacity duration-300"
          onClick={closeMenu}
        >
          Vyronex Digital
          <span className="gradient-text">.</span>
        </a>

        {/* Desktop links */}
        <ul ref={linksRef} className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className="relative px-4 py-2 text-[0.85rem] font-medium text-white/55
                           hover:text-white transition-colors duration-300 group"
              >
                {label}
                <span
                  className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-0 h-[2px]
                             bg-gradient-to-r from-brand-400 to-accent rounded-full
                             transition-all duration-300 group-hover:w-3/4"
                />
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          ref={ctaRef}
          href="#contact"
          className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5
                     text-[0.85rem] font-semibold rounded-full
                     bg-brand-600 hover:bg-brand-500 text-white
                     hover:shadow-lg hover:shadow-brand-600/25
                     active:scale-95 touch-target
                     transition-all duration-300"
        >
          Let&apos;s Talk
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>

        {/* Hamburger (mobile / tablet) */}
        <button
          id="mobile-menu-btn"
          className="relative z-50 lg:hidden flex flex-col justify-center items-center
                     w-11 h-11 rounded-xl hover:bg-white/5 touch-target"
          onClick={() => setIsOpen((v) => !v)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          <span
            className={`block h-[2px] w-5 bg-white rounded-full transition-all duration-300 origin-center ${
              isOpen ? 'rotate-45 translate-y-[3px]' : ''
            }`}
          />
          <span
            className={`block h-[2px] w-5 bg-white rounded-full transition-all duration-200 mt-[5px] ${
              isOpen ? 'opacity-0 scale-x-0' : ''
            }`}
          />
          <span
            className={`block h-[2px] bg-white rounded-full transition-all duration-300 origin-center mt-[5px] ${
              isOpen ? '-rotate-45 -translate-y-[10px] w-5' : 'w-3.5'
            }`}
          />
        </button>
      </div>

      {/* Mobile overlay menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ease-out ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-surface-950/[0.97] backdrop-blur-3xl"
          onClick={closeMenu}
        />
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2
                     w-[300px] h-[300px] sm:w-[400px] sm:h-[400px]
                     rounded-full bg-brand-600/[0.06] blur-[100px] pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2
                     w-[350px] h-[250px]
                     rounded-full bg-accent-glow/[0.04] blur-[80px] pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 gap-8">
          <ul className="flex flex-col items-center gap-1 sm:gap-2">
            {NAV_LINKS.map(({ label, href }, i) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={closeMenu}
                  className="block px-6 py-3 sm:py-4 text-[1.65rem] sm:text-3xl
                             font-display font-semibold
                             text-white/60 hover:text-white
                             transition-all duration-300 hover:tracking-wide touch-target"
                  style={{
                    transitionDelay: isOpen ? `${100 + i * 70}ms` : '0ms',
                    transform: isOpen ? 'translateY(0)' : 'translateY(24px)',
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            onClick={closeMenu}
            className="px-8 py-3.5 sm:py-4 text-base font-semibold rounded-full
                       bg-brand-600 hover:bg-brand-500 text-white
                       hover:shadow-lg hover:shadow-brand-600/25
                       active:scale-95 touch-target"
            style={{
              transitionDelay: isOpen ? `${100 + NAV_LINKS.length * 70}ms` : '0ms',
              transform: isOpen ? 'translateY(0)' : 'translateY(24px)',
              opacity: isOpen ? 1 : 0,
            }}
          >
            Let&apos;s Talk
          </a>
        </div>
      </div>
    </nav>
  )
}
