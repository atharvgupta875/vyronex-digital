/**
 * WorkSection — Cinematic portfolio showcase
 */
import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PROJECTS } from '../utils'

gsap.registerPlugin(ScrollTrigger)

export default function WorkSection() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const gridRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current?.children,
        { opacity: 0, y: 40, filter: 'blur(6px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, stagger: 0.15, ease: 'power4.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%' } })
      if (gridRef.current) {
        gsap.fromTo(gridRef.current.children,
          { opacity: 0, y: 60, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.9, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: gridRef.current, start: 'top 80%' } })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="work" className="relative overflow-hidden" aria-label="Our Work">
      <div className="section-divider" aria-hidden="true" />
      <div className="glow-orb top-1/3 -left-[15%] w-[500px] h-[500px] bg-accent-glow/[0.04]" aria-hidden="true" />
      <div className="container-wide section-padding relative z-10">
        <div ref={headingRef} className="max-w-2xl mb-12 sm:mb-16 lg:mb-20">
          <span className="inline-block px-3.5 py-1 mb-4 rounded-full border border-white/[0.08] bg-white/[0.025] text-[0.7rem] sm:text-xs font-medium text-brand-400 uppercase tracking-[0.15em]">Selected Work</span>
          <h2 className="font-display font-bold tracking-tight leading-[1.1]" style={{ fontSize: 'clamp(1.75rem, 3vw + 0.5rem, 3.25rem)' }}>
            Projects that <span className="gradient-text">speak volumes</span>.
          </h2>
          <p className="mt-4 text-white/40 leading-relaxed max-w-lg" style={{ fontSize: 'clamp(0.85rem, 0.7vw + 0.55rem, 1.05rem)' }}>
            A curated selection of work that showcases our expertise in creating immersive digital experiences.
          </p>
        </div>
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
          {PROJECTS.map(({ title, category, description, image, tags, year }) => (
            <article key={title} className="group relative rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] transition-all duration-500 hover:shadow-2xl hover:shadow-brand-600/[0.06]">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={image} alt={`${title} — ${category}`} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-950 via-surface-950/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-[0.65rem] font-medium text-white/70 bg-white/[0.08] backdrop-blur-md border border-white/[0.08]">{year}</span>
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                  <span className="text-[0.7rem] font-medium text-brand-400 uppercase tracking-[0.1em]">{category}</span>
                  <h3 className="font-display font-bold text-lg sm:text-xl text-white mt-1">{title}</h3>
                  <p className="text-[0.78rem] sm:text-sm text-white/45 leading-relaxed mt-2 max-h-0 group-hover:max-h-20 overflow-hidden transition-all duration-500 ease-out">{description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-5 sm:px-6 py-3.5 border-t border-white/[0.05]">
                {tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-0.5 rounded-full text-[0.65rem] font-medium text-white/40 bg-white/[0.04] border border-white/[0.06]">{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
