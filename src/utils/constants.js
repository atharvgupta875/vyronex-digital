/**
 * constants.js
 *
 * Single source of truth for brand constants, navigation links,
 * services, portfolio projects, testimonials, and reusable config values.
 */

export const BRAND = {
  name: 'Vyronex Digital',
  tagline: 'Building Intelligent Digital Experiences',
  email: 'hellovyronexdigital.online@gmail.com',
  phone: '+91 9431608318',
  whatsapp: 'https://wa.me/919431608318',
  location: 'Global',
  founded: '2023',
  description:
    'Vyronex Digital is a premium digital agency specializing in immersive web development, AI automation, and conversion-driven design for ambitious brands worldwide.',
}

export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export const SERVICES = [
  {
    title: 'Premium Web Development',
    description:
      'We architect and build high-performance websites with React, Next.js, and modern frameworks — engineered for speed, scalability, and conversion.',
    icon: 'code',
  },
  {
    title: '3D Interactive Websites',
    description:
      'Cinematic web experiences powered by Three.js and WebGL. We create immersive 3D environments that captivate visitors and elevate brands.',
    icon: 'cube',
  },
  {
    title: 'AI Automation Systems',
    description:
      'Intelligent automation solutions that streamline workflows, from AI chatbots and lead scoring to content generation and predictive analytics.',
    icon: 'brain',
  },
  {
    title: 'UI/UX Design',
    description:
      'Research-driven interface design that balances beauty with usability. Every pixel is intentional, every interaction is purposeful.',
    icon: 'palette',
  },
  {
    title: 'Branding Systems',
    description:
      'Complete brand identity systems — from logo design and typography to color palettes and comprehensive brand guidelines.',
    icon: 'fingerprint',
  },
  {
    title: 'Performance Optimization',
    description:
      'We optimize Core Web Vitals, implement lazy loading, and fine-tune server configurations to achieve sub-second load times.',
    icon: 'gauge',
  },
]

export const PROJECTS = [
  {
    title: 'Luxury Restaurant Website',
    category: 'Premium Dining',
    description:
      'A cinematic digital experience for a premier fine dining restaurant, featuring 3D menu interactions and reservation system.',
    image: '/projects/restaurant.png',
    tags: ['React', 'Three.js', 'GSAP'],
    year: '2024',
  },
  {
    title: 'AI SaaS Dashboard',
    category: 'Analytics Platform',
    description:
      'A real-time analytics platform with AI-powered insights, interactive data visualizations, and predictive forecasting.',
    image: '/projects/saas.png',
    tags: ['Next.js', 'AI/ML', 'D3.js'],
    year: '2024',
  },
  {
    title: '3D Product Experience',
    category: 'E-Commerce',
    description:
      'An immersive 3D product showcase for a luxury brand, featuring interactive product configurator and spatial preview.',
    image: '/projects/3d-product.png',
    tags: ['R3F', 'WebGL', 'Framer Motion'],
    year: '2025',
  },
  {
    title: 'Real Estate Platform',
    category: 'Property Listings',
    description:
      'A premium property platform with virtual tours, AI-powered property matching, and cinematic listing presentations.',
    image: '/projects/realestate.png',
    tags: ['Next.js', 'Mapbox', 'Prisma'],
    year: '2025',
  },
]

export const TESTIMONIALS = [
  {
    name: 'Michael Carter',
    role: 'NovaTech Solutions',
    quote:
      'Vyronex Digital transformed our online presence entirely. The immersive experience they delivered increased our conversions significantly. Absolutely world-class work.',
    rating: 5,
  },
  {
    name: 'Sophia Williams',
    role: 'Luxury Estates',
    quote:
      'The platform they built is the most beautiful real estate interface our clients have ever seen. The attention to detail is unlike any agency we\'ve worked with.',
    rating: 5,
  },
  {
    name: 'Daniel Brooks',
    role: 'Vision AI Labs',
    quote:
      'Our new web platform has become the benchmark in our industry. Vyronex Digital delivered something we didn\'t think was possible on the web.',
    rating: 5,
  },
]

export const STATS = [
  { value: '50+', label: 'Projects Delivered' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '35+', label: 'Global Clients' },
  { value: '3x', label: 'Avg. ROI Increase' },
]

export const PROCESS = [
  {
    step: '01',
    title: 'Discovery',
    description:
      'We dive deep into your brand, audience, and goals to create a strategic foundation for your digital experience.',
  },
  {
    step: '02',
    title: 'Design',
    description:
      'Our team crafts pixel-perfect interfaces with cinematic aesthetics, ensuring every element serves a purpose.',
  },
  {
    step: '03',
    title: 'Develop',
    description:
      'We engineer your vision into reality using cutting-edge technologies, with obsessive attention to performance.',
  },
  {
    step: '04',
    title: 'Deploy & Scale',
    description:
      'Launch with confidence. We provide ongoing optimization, analytics, and support to maximize your digital impact.',
  },
]

export const SOCIALS = [
  { label: 'Twitter', href: 'https://twitter.com/vyronex', icon: 'twitter' },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/vyronex', icon: 'linkedin' },
  { label: 'Instagram', href: 'https://instagram.com/vyronex', icon: 'instagram' },
  { label: 'GitHub', href: 'https://github.com/vyronex', icon: 'github' },
]

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}
