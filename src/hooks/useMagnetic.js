/**
 * useMagnetic — Magnetic hover effect for buttons
 *
 * Creates a subtle pull-toward-cursor effect on hover.
 * Returns a ref to attach to the element and handlers.
 *
 * Usage:
 *   const magnetic = useMagnetic(0.3)
 *   <button ref={magnetic.ref} onMouseMove={magnetic.onMouseMove} ...>
 */

import { useRef, useCallback } from 'react'
import gsap from 'gsap'

export default function useMagnetic(strength = 0.35) {
  const ref = useRef(null)

  const onMouseMove = useCallback((e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    gsap.to(el, {
      x: x * strength,
      y: y * strength,
      duration: 0.4,
      ease: 'power2.out',
    })
  }, [strength])

  const onMouseLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.4)',
    })
  }, [])

  return { ref, onMouseMove, onMouseLeave }
}
