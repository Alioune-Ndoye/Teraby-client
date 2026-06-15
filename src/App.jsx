import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, MotionConfig } from 'framer-motion'
import { ThemeProvider } from './context/ThemeContext'
import { PricingProvider } from './context/PricingContext'
import { CookieConsentProvider } from './context/CookieConsentContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CookieBanner from './components/CookieBanner'
import CookiePreferencesModal from './components/CookiePreferencesModal'
import Home from './pages/Home'
import useIntroAudio from './hooks/useIntroAudio'
import useConditionalScripts from './hooks/useConditionalScripts'

// ── Lazy-loaded page chunks ───────────────────────────────────────────────────
const GalleryPage                = lazy(() => import('./pages/Gallery'))
const ArcadePage                 = lazy(() => import('./pages/Arcade'))
const RegularCleaning            = lazy(() => import('./pages/services/RegularCleaning'))
const AirbnbCleaning             = lazy(() => import('./pages/services/AirbnbCleaning'))
const CommercialCleaning         = lazy(() => import('./pages/services/CommercialCleaning'))
const ChatBot                    = lazy(() => import('./components/ChatBot'))
const PolitiqueConfidentialite   = lazy(() => import('./pages/legal/PolitiqueConfidentialite'))
const PolitiqueCookies           = lazy(() => import('./pages/legal/PolitiqueCookies'))
const ConditionsGenerales        = lazy(() => import('./pages/legal/ConditionsGenerales'))
const MentionsLegales            = lazy(() => import('./pages/legal/MentionsLegales'))
const CityPage                   = lazy(() => import('./pages/cities/CityPage'))
const NettoyageHub               = lazy(() => import('./pages/NettoyageHub'))

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4 } },
  exit:    { opacity: 0, transition: { duration: 0.25 } },
}

function ScrollToTop() {
  const { pathname, state } = useLocation()
  useEffect(() => {
    const target = state?.scrollTo
    if (target) {
      const timer = setTimeout(() => {
        const el = document.querySelector(target)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
        else window.scrollTo(0, 0)
      }, 350)
      return () => clearTimeout(timer)
    }
    window.scrollTo(0, 0)
  }, [pathname, state])
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
            <Route path="/"                             element={<Home />} />
            <Route path="/gallery"                      element={<GalleryPage />} />
            <Route path="/arcade"                       element={<ArcadePage />} />
            <Route path="/services/regular-cleaning"    element={<RegularCleaning />} />
            <Route path="/services/airbnb-cleaning"     element={<AirbnbCleaning />} />
            <Route path="/services/commercial-cleaning" element={<CommercialCleaning />} />
            <Route path="/nettoyage"                    element={<NettoyageHub />} />
            <Route path="/nettoyage/:citySlug"          element={<CityPage />} />
            <Route path="/confidentialite"              element={<PolitiqueConfidentialite />} />
            <Route path="/cookies"                      element={<PolitiqueCookies />} />
            <Route path="/cgv"                          element={<ConditionsGenerales />} />
            <Route path="/mentions-legales"             element={<MentionsLegales />} />
            <Route path="/admin"                        element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  )
}

function Layout() {
  useIntroAudio()
  useConditionalScripts()

  return (
    <div className="min-h-screen bg-navy text-champagne">
      <Navbar />
      <ScrollToTop />
      <AnimatedRoutes />
      <Footer />
      <Suspense fallback={null}>
        <ChatBot />
      </Suspense>
      <CookieBanner />
      <CookiePreferencesModal />
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
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <PricingProvider>
          <CookieConsentProvider>
            <BrowserRouter>
              <Layout />
            </BrowserRouter>
          </CookieConsentProvider>
        </PricingProvider>
      </ThemeProvider>
    </MotionConfig>
  )
}
