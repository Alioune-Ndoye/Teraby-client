import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import useIntroAudio from './hooks/useIntroAudio'

// ── Lazy-loaded: not needed on initial paint ──────────────────────────────────
// Each gets its own JS chunk — only downloaded when the user navigates there.
const GalleryPage = lazy(() => import('./pages/Gallery'))
const ArcadePage  = lazy(() => import('./pages/Arcade'))
// ChatBot starts hidden (FAB button) — safe to defer until after first paint
const ChatBot     = lazy(() => import('./components/ChatBot'))

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4 } },
  exit:    { opacity: 0, transition: { duration: 0.25 } },
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
        {/* Suspense here covers page-level lazy chunks */}
        <Suspense fallback={null}>
          <Routes location={location}>
            <Route path="/"        element={<Home />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/arcade"  element={<ArcadePage />} />
            <Route path="/admin"   element={<Navigate to="/dashboard" replace />} />
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
      <AnimatedRoutes />
      <Footer />
      {/* ChatBot deferred — loads after initial paint, starts hidden */}
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
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </ThemeProvider>
  )
}
