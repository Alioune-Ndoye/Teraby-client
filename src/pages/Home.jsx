import { lazy, Suspense, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../components/Hero'
import useScrollObserver from '../hooks/useScrollObserver'
import PromoPopup from '../components/PromoPopup'

// Lazy-load all below-fold sections — they're not needed until the user scrolls
const Services     = lazy(() => import('../components/Services'))
const Process      = lazy(() => import('../components/Process'))
const Booking      = lazy(() => import('../components/Booking'))
const Testimonials = lazy(() => import('../components/Testimonials'))
const Team         = lazy(() => import('../components/Team'))
const FAQ          = lazy(() => import('../components/FAQ'))

export default function Home() {
  const location = useLocation()

  useScrollObserver('home')

  useEffect(() => {
    const hash = location.state?.scrollTo
    if (!hash) return
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
      })
    )
    return () => cancelAnimationFrame(id)
  }, [location.state])

  return (
    <>
      <PromoPopup />
      <Hero />
      <Suspense fallback={null}>
        <Services />
        <Process />
        <Booking />
        <Testimonials />
        <Team />
        <FAQ />
      </Suspense>
    </>
  )
}
