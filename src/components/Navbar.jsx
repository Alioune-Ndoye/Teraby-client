import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Moon, Sun } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { navLinks } from '../data/sampleData'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { isDark, toggleTheme } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on every route change
  useEffect(() => { setMobileOpen(false) }, [location.pathname])

  const scrollToHash = (hash) => {
    // Small delay so page has time to render after navigation
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
      })
    })
  }

  const handleNavClick = (href) => {
    setMobileOpen(false)

    if (!href.startsWith('#')) return

    if (location.pathname === '/') {
      // Already on home — just scroll
      scrollToHash(href)
    } else {
      // On another page — navigate home first, then scroll after render
      navigate('/', { state: { scrollTo: href } })
    }
  }

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-navy-dark/90 backdrop-blur-xl border-b border-white/5 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center group"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <img
                src="/logo.png"
                alt="Teraby"
                className="h-10 w-auto transition-all duration-300 group-hover:opacity-90"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                  e.currentTarget.nextSibling.style.display = 'flex'
                }}
              />
              <span
                className="font-playfair text-xl font-bold tracking-tight hidden items-center gap-2"
                style={{ display: 'none' }}
              >
                Tera<span className="text-orange-accent">by</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) =>
                link.href.startsWith('/') ? (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="px-4 py-2 text-sm font-inter font-medium text-champagne/70 hover:text-champagne transition-colors duration-200 relative group"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-4 right-4 h-px bg-orange-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </Link>
                ) : (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link.href)}
                    className="px-4 py-2 text-sm font-inter font-medium text-champagne/70 hover:text-champagne transition-colors duration-200 relative group"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-4 right-4 h-px bg-orange-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </button>
                )
              )}
            </nav>

            {/* Right side */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-sm text-champagne/50 hover:text-champagne hover:bg-white/5 transition-all duration-200"
                aria-label={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button
                onClick={() => handleNavClick('#booking')}
                className="btn-primary text-sm py-2.5 px-6"
              >
                Réserver
              </button>
            </div>

            {/* Mobile menu toggle */}
            <div className="lg:hidden flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className="p-2 text-champagne/60 hover:text-champagne"
                aria-label={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button
                onClick={() => setMobileOpen((p) => !p)}
                className="p-2 text-champagne/80 hover:text-champagne"
                aria-label="Ouvrir le menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[60px] left-0 right-0 z-40 bg-navy-dark/95 backdrop-blur-xl border-b border-white/5 lg:hidden"
          >
            <nav className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {link.href.startsWith('/') ? (
                    <Link
                      to={link.href}
                      className="block py-3 px-4 text-champagne/80 hover:text-champagne hover:bg-white/5 rounded-sm font-inter font-medium transition-all"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className="w-full text-left py-3 px-4 text-champagne/80 hover:text-champagne hover:bg-white/5 rounded-sm font-inter font-medium transition-all"
                    >
                      {link.label}
                    </button>
                  )}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="pt-4 border-t border-white/5"
              >
                <button
                  onClick={() => handleNavClick('#booking')}
                  className="btn-primary w-full text-center"
                >
                  Réserver
                </button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
