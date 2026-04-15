import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ChatBot from './components/ChatBot'
import Home from './pages/Home'
import GalleryPage from './pages/Gallery'
import AdminPage from './pages/Admin'

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
}

function AnimatedRoutes() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

function Layout() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')

  return (
    <div className="min-h-screen bg-navy text-champagne">
      {!isAdmin && <Navbar />}
      <AnimatedRoutes />
      {!isAdmin && <Footer />}
      {!isAdmin && <ChatBot />}
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </ThemeProvider>
  )
}
