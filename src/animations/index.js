/**
 * animations/index.js
 * 
 * Centralized GSAP animation presets.
 * Import gsap lazily to keep bundle size small
 * until animations are actually triggered.
 * 
 * These are factory functions — call them with a target
 * element or ref to apply the animation.
 * 
 * Usage:
 *   import { fadeInUp } from '@/animations'
 *   useEffect(() => { fadeInUp(ref.current) }, [])
 */

import gsap from 'gsap'

/**
 * Fade in + slide up. Great for section titles and cards.
 */
export function fadeInUp(target, options = {}) {
  return gsap.fromTo(
    target,
    { opacity: 0, y: 60 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
      ...options,
    }
  )
}

/**
 * Fade in with scale. Good for feature cards.
 */
export function fadeInScale(target, options = {}) {
  return gsap.fromTo(
    target,
    { opacity: 0, scale: 0.92 },
    {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: 'power2.out',
      ...options,
    }
  )
}

/**
 * Stagger children in. Pass a parent element
 * and it will animate its direct children.
 */
export function staggerIn(parent, options = {}) {
  const children = parent?.children
  if (!children?.length) return

  return gsap.fromTo(
    children,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power3.out',
      ...options,
    }
  )
}
