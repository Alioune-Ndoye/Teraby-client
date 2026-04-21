import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ThemeProvider } from './context/ThemeContext'
import { PricingProvider } from './context/PricingContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import useIntroAudio from './hooks/useIntroAudio'

// ── Lazy-loaded page chunks ───────────────────────────────────────────────────
const GalleryPage          = lazy(() => import('./pages/Gallery'))
const ArcadePage           = lazy(() => import('./pages/Arcade'))
const RegularCleaning      = lazy(() => import('./pages/services/RegularCleaning'))
const AirbnbCleaning       = lazy(() => import('./pages/services/AirbnbCleaning'))
const CommercialCleaning   = lazy(() => import('./pages/services/CommercialCleaning'))
const ChatBot              = lazy(() => import('./components/ChatBot'))

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4 } },
  exit:    { opacity: 0, transition: { duration: 0.25 } },
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Suspense fallback={null}>
          <Routes location={location}>
            <Route path="/"                            element={<Home />} />
            <Route path="/gallery"                     element={<GalleryPage />} />
            <Route path="/arcade"                      element={<ArcadePage />} />
            <Route path="/services/regular-cleaning"   element={<RegularCleaning />} />
            <Route path="/services/airbnb-cleaning"    element={<AirbnbCleaning />} />
            <Route path="/services/commercial-cleaning" element={<CommercialCleaning />} />
            <Route path="/admin"                       element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  )
}

function Layout() {
  useIntroAudio()

  return (
    <div className="min-h-screen bg-navy text-champagne">
      <Navbar />
      <ScrollToTop />
      <AnimatedRoutes />
      <Footer />
      <Suspense fallback={null}>
        <ChatBot />
      </Suspense>
    </div>
  )
}

export default function App() {
  useEffect(() => {
    const el = document.getElementById('preloader')
    if (!el) return
    el.classList.add('fade-out')
    const t = setTimeout(() => el.remove(), 400)
    return () => clearTimeout(t)
  }, [])

  return (
    <ThemeProvider>
      <PricingProvider>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </PricingProvider>
    </ThemeProvider>
  )
}
