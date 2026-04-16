import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../components/Hero'
import Services from '../components/Services'
import Process from '../components/Process'
import Booking from '../components/Booking'
import Testimonials from '../components/Testimonials'
import Team from '../components/Team'
import FAQ from '../components/FAQ'
import useScrollObserver from '../hooks/useScrollObserver'

export default function Home() {
  const location = useLocation()

  // body.scrolled added when hero exits viewport — activates light mode on content below
  useScrollObserver('home')

  // Scroll to section when navigated here from another page (e.g. Gallery → #services)
  useEffect(() => {
    const hash = location.state?.scrollTo
    if (!hash) return

    // Double rAF ensures the DOM is fully painted before scrolling
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
      })
    )
    return () => cancelAnimationFrame(id)
  }, [location.state])

  return (
    <>
      <Hero />
      <Services />
      <Process />
      <Booking />
      <Testimonials />
      <Team />
      <FAQ />
    </>
  )
}
