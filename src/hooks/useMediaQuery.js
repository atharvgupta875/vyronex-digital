/**
 * useMediaQuery
 * 
 * Returns true when the given CSS media query matches.
 * Useful for conditional rendering based on breakpoints.
 * 
 * Usage:
 *   const isMobile = useMediaQuery('(max-width: 767px)')
 *   const isDesktop = useMediaQuery('(min-width: 1024px)')
 */

import { useState, useEffect } from 'react'

export default function useMediaQuery(query) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia(query)
    setMatches(mql.matches)

    const handler = (e) => setMatches(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [query])

  return matches
}
