import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Menu from 'lucide-react/dist/esm/icons/menu'
import X from 'lucide-react/dist/esm/icons/x'
import Moon from 'lucide-react/dist/esm/icons/moon'
import Sun from 'lucide-react/dist/esm/icons/sun'
import ChevronDown from 'lucide-react/dist/esm/icons/chevron-down'
import { useTheme } from '../context/ThemeContext'
import { navLinks } from '../data/sampleData'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { isDark, toggleTheme } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'
  const dropdownRef = useRef(null)

  const overHero = !scrolled && isHome
  const heroTextStyle = overHero
    ? { color: '#ffffff', textShadow: '0 1px 4px rgba(0,0,0,0.6)' }
    : {}

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [location.pathname])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const scrollToHash = (hash) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
      })
    })
  }

  const handleNavClick = (href) => {
    setMobileOpen(false)
    setDropdownOpen(false)
    if (!href.startsWith('#')) return
    if (location.pathname === '/') {
      scrollToHash(href)
    } else {
      navigate('/', { state: { scrollTo: href } })
    }
  }

  const navTextClass = !overHero ? 'text-navy/70 hover:text-navy' : ''

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || !isHome
            ? 'bg-white/95 backdrop-blur-xl border-b border-black/8 py-3 shadow-sm'
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
              <div className={`transition-all duration-300 rounded-md px-2 py-1 ${!scrolled && isHome ? 'bg-white shadow-sm' : ''}`}>
                <img
                  src="/logo.webp"
                  alt="Teraby"
                  width="190"
                  height="80"
                  loading="eager"
                  className="h-8 w-auto transition-all duration-300 group-hover:opacity-90"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                    e.currentTarget.nextSibling.style.display = 'flex'
                  }}
                />
              </div>
              <span
                className="font-playfair text-xl font-bold tracking-tight hidden items-center gap-2"
                style={{ display: 'none' }}
              >
                Tera<span className="text-orange-accent">by</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                if (link.children) {
                  return (
                    <div key={link.label} className="relative" ref={dropdownRef}>
                      <button
                        style={heroTextStyle}
                        onClick={() => setDropdownOpen((o) => !o)}
                        className={`px-4 py-2 text-sm font-inter font-medium transition-colors duration-300 relative group flex items-center gap-1 ${navTextClass}`}
                      >
                        {link.label}
                        <ChevronDown
                          size={13}
                          className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                        />
                      </button>

                      <AnimatePresence>
                        {dropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.97 }}
                            transition={{ duration: 0.18, ease: 'easeOut' }}
                            className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-sm shadow-xl overflow-hidden z-50"
                          >
                            {link.children.map((child, i) => (
                              <Link
                                key={child.label}
                                to={child.href}
                                onClick={() => setDropdownOpen(false)}
                                className={`flex flex-col px-4 py-3.5 hover:bg-gray-50 transition-colors duration-150 ${
                                  i < link.children.length - 1 ? 'border-b border-gray-100' : ''
                                } ${location.pathname === child.href ? 'bg-orange-accent/8' : ''}`}
                              >
                                <span className={`font-inter text-sm font-semibold ${location.pathname === child.href ? 'text-orange-accent' : 'text-navy'}`}>
                                  {child.label}
                                </span>
                                <span className="font-inter text-xs text-gray-500 mt-0.5">{child.desc}</span>
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                }

                return link.href.startsWith('/') ? (
                  <Link
                    key={link.label}
                    to={link.href}
                    style={heroTextStyle}
                    className={`px-4 py-2 text-sm font-inter font-medium transition-colors duration-300 relative group ${navTextClass}`}
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-4 right-4 h-px bg-orange-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </Link>
                ) : (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link.href)}
                    style={heroTextStyle}
                    className={`px-4 py-2 text-sm font-inter font-medium transition-colors duration-300 relative group ${navTextClass}`}
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-4 right-4 h-px bg-orange-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </button>
                )
              })}
            </nav>

            {/* Right side */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={toggleTheme}
                style={heroTextStyle}
                className={`p-2 rounded-sm transition-all duration-300 ${
                  !overHero ? 'text-navy/50 hover:text-navy hover:bg-black/5' : 'hover:bg-white/10'
                }`}
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
                style={heroTextStyle}
                className={`p-2 transition-colors duration-300 ${!overHero ? 'text-navy/60 hover:text-navy' : ''}`}
                aria-label={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button
                onClick={() => setMobileOpen((p) => !p)}
                style={heroTextStyle}
                className={`p-2 transition-colors duration-300 ${!overHero ? 'text-navy/80 hover:text-navy' : ''}`}
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
            id="mobile-nav"
            className="fixed top-[60px] left-0 right-0 z-40 bg-navy-dark/95 backdrop-blur-xl border-b border-white/5 lg:hidden"
          >
            <nav className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {link.children ? (
                    <div>
                      <button
                        onClick={() => setMobileServicesOpen((o) => !o)}
                        className="w-full text-left py-3 px-4 text-champagne/80 hover:text-champagne hover:bg-white/5 rounded-sm font-inter font-medium transition-all flex items-center justify-between"
                      >
                        {link.label}
                        <ChevronDown
                          size={14}
                          className={`transition-transform duration-200 text-champagne/40 ${mobileServicesOpen ? 'rotate-180' : ''}`}
                        />
                      </button>
                      <AnimatePresence>
                        {mobileServicesOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden ml-4 border-l border-white/8 pl-4 mb-1"
                          >
                            {link.children.map((child) => (
                              <Link
                                key={child.label}
                                to={child.href}
                                onClick={() => setMobileOpen(false)}
                                className="block py-2.5 px-2 text-sm text-champagne/65 hover:text-orange-accent transition-colors font-inter"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : link.href.startsWith('/') ? (
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
                className="pt-4 border-t border-white/5 mt-2"
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
