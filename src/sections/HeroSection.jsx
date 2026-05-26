/**
 * HeroSection — Cinematic animated split-screen hero
 *
 * Animations:
 *  - GSAP timeline entrance: staggered badge → headline → subtitle → CTAs → stats
 *  - Blur + fade reveal with luxury easing
 *  - R3F floating orb replaces placeholder (desktop only)
 *  - Magnetic hover on CTA buttons
 *  - Scroll indicator fade-out on scroll
 *
 * Layout:
 *  - Mobile: stacked vertically
 *  - lg+: 55/45 split-screen
 */

import { useRef, useEffect, lazy, Suspense } from 'react'
import gsap from 'gsap'
import { BRAND } from '../utils'
import { useMediaQuery } from '../hooks'
import MagneticButton from '../components/MagneticButton'

// Lazy-load 3D to avoid blocking initial render
const SceneContainer = lazy(() => import('../three/SceneContainer'))
const HeroOrb = lazy(() => import('../three/HeroOrb'))

export default function HeroSection() {
  const sectionRef = useRef(null)
  const badgeRef = useRef(null)
  const headlineRef = useRef(null)
  const subtitleRef = useRef(null)
  const ctaRef = useRef(null)
  const statsRef = useRef(null)
  const canvasColRef = useRef(null)
  const scrollIndicatorRef = useRef(null)

  const isDesktop = useMediaQuery('(min-width: 1024px)')

  /* ── Cinematic entrance timeline ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial state — hidden + blurred
      gsap.set(
        [badgeRef.current, headlineRef.current, subtitleRef.current, ctaRef.current, statsRef.current],
        { opacity: 0, y: 40, filter: 'blur(8px)' }
      )
      if (canvasColRef.current) {
        gsap.set(canvasColRef.current, { opacity: 0, scale: 0.9 })
      }
      if (scrollIndicatorRef.current) {
        gsap.set(scrollIndicatorRef.current, { opacity: 0, y: 10 })
      }

      const tl = gsap.timeline({
        defaults: {
          ease: 'power4.out',
          duration: 1.2,
        },
        delay: 0.3,
      })

      tl.to(badgeRef.current, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8,
      })
        .to(
          headlineRef.current,
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.4,
          },
          '-=0.5'
        )
        .to(
          subtitleRef.current,
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1,
          },
          '-=0.9'
        )
        .to(
          ctaRef.current,
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1,
          },
          '-=0.7'
        )
        .to(
          statsRef.current,
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.9,
          },
          '-=0.6'
        )

      // 3D column fades in slightly after text
      if (canvasColRef.current) {
        tl.to(
          canvasColRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 1.6,
            ease: 'power3.out',
          },
          '-=1.8'
        )
      }

      // Scroll indicator appears last
      if (scrollIndicatorRef.current) {
        tl.to(
          scrollIndicatorRef.current,
          {
            opacity: 0.4,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
          },
          '-=0.5'
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  /* ── Scroll indicator fade-out ── */
  useEffect(() => {
    const indicator = scrollIndicatorRef.current
    if (!indicator) return

    const onScroll = () => {
      const progress = Math.min(window.scrollY / 300, 1)
      gsap.set(indicator, { opacity: 0.4 * (1 - progress) })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-[100svh] flex items-center overflow-hidden"
      aria-label="Hero"
    >
      {/* ── Ambient background layers ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="glow-orb -top-[15%] -left-[10%]"
          style={{
            width: 'clamp(280px, 50vw, 700px)',
            height: 'clamp(280px, 50vw, 700px)',
            background: 'radial-gradient(circle, rgba(63,60,232,0.09) 0%, transparent 70%)',
          }}
        />
        <div
          className="glow-orb -bottom-[15%] -right-[10%]"
          style={{
            width: 'clamp(240px, 40vw, 600px)',
            height: 'clamp(240px, 40vw, 600px)',
            background: 'radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)',
          }}
        />
        <div
          className="glow-orb top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 hidden lg:block"
          style={{
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(107,130,252,0.04) 0%, transparent 65%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: 'clamp(40px, 5vw, 64px) clamp(40px, 5vw, 64px)',
          }}
        />
        <div className="absolute bottom-0 left-0 w-full h-32 md:h-48 bg-gradient-to-t from-surface-950 to-transparent" />
      </div>

      {/* ── Content grid ── */}
      <div
        className="container-wide relative z-10
                   grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]
                   gap-6 sm:gap-8 lg:gap-16 xl:gap-20
                   items-center
                   pt-24 sm:pt-28 pb-20 sm:pb-24
                   lg:pt-24 lg:pb-12 lg:min-h-[100svh]"
      >
        {/* ── Left column — Text ── */}
        <div className="flex flex-col items-start">
          {/* Status badge */}
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-5 sm:mb-6 lg:mb-8
                       rounded-full border border-white/[0.08] bg-white/[0.025]
                       text-[0.7rem] sm:text-xs font-medium text-white/50
                       backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Available for new projects
          </div>

          {/* Headline */}
          <h1
            ref={headlineRef}
            className="font-display font-bold tracking-tight leading-[1.06] max-w-[18ch] lg:max-w-none"
            style={{ fontSize: 'clamp(2rem, 4.5vw + 0.75rem, 4.75rem)' }}
          >
            Building{' '}
            <span className="gradient-text">intelligent digital</span>
            {' '}experiences.
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="mt-4 sm:mt-5 lg:mt-6 text-white/45 leading-relaxed max-w-[52ch]"
            style={{ fontSize: 'clamp(0.875rem, 0.8vw + 0.55rem, 1.15rem)' }}
          >
            {BRAND.name} is a premium digital agency specializing in immersive
            web development, AI automation, and conversion-driven design for
            ambitious brands.
          </p>

          {/* CTA Buttons — magnetic hover */}
          <div
            ref={ctaRef}
            className="flex flex-wrap items-center gap-3 sm:gap-4 mt-7 sm:mt-8 lg:mt-10"
          >
            <MagneticButton
              href="#work"
              strength={0.25}
              className="group inline-flex items-center justify-center gap-2.5
                         px-5 sm:px-7 py-3 sm:py-3.5
                         text-[0.825rem] sm:text-sm font-semibold rounded-full
                         bg-brand-600 hover:bg-brand-500 text-white
                         hover:shadow-xl hover:shadow-brand-600/25
                         active:scale-[0.97] touch-target"
            >
              View Our Work
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
                fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </MagneticButton>
            <MagneticButton
              href="#contact"
              strength={0.25}
              className="inline-flex items-center justify-center gap-2
                         px-5 sm:px-7 py-3 sm:py-3.5
                         text-[0.825rem] sm:text-sm font-semibold rounded-full
                         border border-white/[0.1] bg-white/[0.025]
                         text-white/75 hover:text-white hover:bg-white/[0.06]
                         hover:border-white/[0.18]
                         active:scale-[0.97] touch-target"
            >
              Get in Touch
            </MagneticButton>
          </div>

          {/* Trust stats */}
          <div
            ref={statsRef}
            className="mt-8 sm:mt-10 lg:mt-14 flex items-center gap-5 sm:gap-0"
          >
            {[
              { value: '50+', label: 'Projects' },
              { value: '98%', label: 'Satisfaction' },
              { value: '5★', label: 'Reviews' },
            ].map(({ value, label }, i) => (
              <div
                key={label}
                className={`flex flex-col ${
                  i > 0
                    ? 'sm:pl-6 md:pl-8 sm:ml-6 md:ml-8 sm:border-l sm:border-white/[0.08]'
                    : ''
                }`}
              >
                <span
                  className="font-display font-bold text-white/90"
                  style={{ fontSize: 'clamp(1.1rem, 1.2vw + 0.5rem, 1.35rem)' }}
                >
                  {value}
                </span>
                <span className="text-[0.625rem] sm:text-[0.7rem] text-white/30 font-medium uppercase tracking-[0.12em]">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right column — 3D Canvas or CSS fallback ── */}
        <div
          ref={canvasColRef}
          className="relative flex items-center justify-center
                     min-h-[200px] sm:min-h-[280px] md:min-h-[340px] lg:min-h-[480px]
                     mt-2 sm:mt-0"
        >
          {isDesktop ? (
            /* R3F Scene — only on desktop for performance */
            <Suspense fallback={<OrbFallback />}>
              <div className="absolute inset-0">
                <SceneContainer camera={{ position: [0, 0, 5], fov: 40 }}>
                  <HeroOrb />
                </SceneContainer>
              </div>
            </Suspense>
          ) : (
            /* CSS orb fallback — lightweight for mobile */
            <OrbFallback />
          )}
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-5 sm:bottom-7 md:bottom-9 left-1/2 -translate-x-1/2 z-10
                   hidden sm:flex flex-col items-center gap-1.5"
        aria-hidden="true"
      >
        <span className="text-[0.6rem] uppercase tracking-[0.2em] font-medium text-white/40">
          Scroll
        </span>
        <div className="w-[18px] h-[28px] rounded-full border border-white/15 flex justify-center pt-1.5">
          <div
            className="w-[3px] h-[6px] rounded-full bg-white/40 animate-bounce"
            style={{ animationDuration: '2s' }}
          />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full section-divider" aria-hidden="true" />
    </section>
  )
}

/* ── CSS orb fallback (used on mobile & as Suspense fallback) ── */
function OrbFallback() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative animate-float">
        <div
          className="rounded-full bg-gradient-to-br from-brand-500/20 via-accent/12 to-brand-700/8"
          style={{
            width: 'clamp(160px, 25vw + 60px, 320px)',
            height: 'clamp(160px, 25vw + 60px, 320px)',
            filter: 'blur(1px)',
          }}
        />
        <div
          className="absolute rounded-full border border-white/[0.05]
                     bg-gradient-to-br from-brand-600/[0.04] to-transparent"
          style={{ inset: 'clamp(16px, 3vw, 40px)' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                     w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-brand-400/50
                     shadow-[0_0_20px_rgba(107,130,252,0.3)]"
        />
      </div>
      <div
        className="absolute rounded-full border border-white/[0.035]"
        style={{
          width: 'clamp(200px, 30vw + 80px, 420px)',
          height: 'clamp(200px, 30vw + 80px, 420px)',
          top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute rounded-full border border-white/[0.02]"
        style={{
          width: 'clamp(260px, 38vw + 100px, 540px)',
          height: 'clamp(260px, 38vw + 100px, 540px)',
          top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        }}
        aria-hidden="true"
      />
    </div>
  )
}
