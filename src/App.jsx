/**
 * App.jsx — Root application component
 * 
 * Composes the Layout wrapper with all page sections.
 * Sections are rendered in visual order, top to bottom.
 * 
 * Architecture:
 *   <Layout>              ← Navbar + SmoothScroll + Footer
 *     <HeroSection />     ← #home
 *     <ServicesSection />  ← #services  (future)
 *     <WorkSection />     ← #work      (future)
 *     <AboutSection />    ← #about     (future)
 *     <ContactSection />  ← #contact   (future)
 *   </Layout>
 */

import { Layout } from './components'
import {
  HeroSection,
  ServicesSection,
  WorkSection,
  AboutSection,
  TestimonialsSection,
  ContactSection,
} from './sections'

export default function App() {
  return (
    <Layout>
      <HeroSection />
      <ServicesSection />
      <WorkSection />
      <AboutSection />
      <TestimonialsSection />
      <ContactSection />
    </Layout>
  )
}