/**
 * Layout
 * 
 * Premium layout wrapper that composes:
 *  - Navbar (fixed, always visible)
 *  - SmoothScroll wrapper (for all scrollable content)
 *  - Footer
 * 
 * All section components are passed as children.
 */

import Navbar from './Navbar'
import Footer from './Footer'
import SmoothScroll from './SmoothScroll'

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <SmoothScroll>
        <main id="main-content" role="main">
          {children}
        </main>
        <Footer />
      </SmoothScroll>
    </>
  )
}
