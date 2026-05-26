/**
 * SmoothScroll
 * 
 * Wrapper that enables smooth-scroll behavior via CSS
 * and prepares the DOM structure for GSAP ScrollTrigger
 * or Lenis integration in a later phase.
 * 
 * All page sections should be children of this component.
 */

export default function SmoothScroll({ children }) {
  return (
    <div id="smooth-wrapper" className="relative">
      <div id="smooth-content">
        {children}
      </div>
    </div>
  )
}
