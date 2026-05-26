/**
 * useScrollProgress
 * 
 * Tracks the normalized scroll progress (0 → 1) of the page.
 * Useful for parallax effects, progress indicators, and
 * scroll-driven animations.
 * 
 * Usage:
 *   const progress = useScrollProgress()  // 0.0 to 1.0
 */

import { useState, useEffect } from 'react'

export default function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight > 0) {
        setProgress(Math.min(scrollTop / docHeight, 1))
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return progress
}
