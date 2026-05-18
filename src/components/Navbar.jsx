import { useState, useEffect, useRef, useCallback } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Menu from 'lucide-react/dist/esm/icons/menu'
import X from 'lucide-react/dist/esm/icons/x'
import ChevronDown from 'lucide-react/dist/esm/icons/chevron-down'
import { navLinks } from '../data/sampleData'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'
  const dropdownRef = useRef(null)

  const overHero = !scrolled && isHome
  const heroTextStyle = overHero
    ? { color: '#ffffff', textShadow: '0 1px 4px rgba(0,0,0,0.6)' }
    : {}

  useEffect(() => {
    let rafId = null
    const handleScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        setScrolled(prev => {
          const next = window.scrollY > 60
          return prev === next ? prev : next
        })
        rafId = null
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setMobileServicesOpen(false)
  }, [location.pathname])

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
        className={`fixed top-0 left-0 right-0 z-50 ${
          scrolled || !isHome
            ? 'bg-white/95 backdrop-blur-md border-b border-black/8 py-3 shadow-sm'
            : 'bg-transparent py-5'
        }`}
        style={{ transition: 'background-color 0.4s ease, padding 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease' }}
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
                src="/logo_transparent.png"
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
                onClick={() => handleNavClick('#booking')}
                className="btn-primary text-sm py-2.5 px-6"
              >
                Réserver
              </button>
            </div>

            {/* Mobile menu toggle */}
            <div className="lg:hidden flex items-center gap-3">
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
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28 }}
            id="mobile-nav"
            className={`fixed left-0 right-0 z-40 lg:hidden overflow-y-auto ${
              scrolled || !isHome ? 'top-14' : 'top-[72px]'
            }`}
            style={{
              maxHeight: 'calc(100vh - 4rem)',
              backgroundColor: '#0D1525',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <nav className="max-w-7xl mx-auto px-4 py-5 flex flex-col gap-0.5">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  {link.children ? (
                    <div>
                      <button
                        onClick={() => setMobileServicesOpen((o) => !o)}
                        className="w-full text-left py-3.5 px-4 rounded-sm font-inter font-semibold text-base transition-all flex items-center justify-between"
                        style={{ color: '#ffffff' }}
                      >
                        {link.label}
                        <ChevronDown
                          size={15}
                          className={`transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`}
                          style={{ color: 'rgba(255,255,255,0.5)' }}
                        />
                      </button>
                      {mobileServicesOpen && (
                        <div
                          className="mx-2 mb-2 rounded-sm overflow-hidden"
                          style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                        >
                          {link.children.map((child, ci) => (
                            <Link
                              key={child.label}
                              to={child.href}
                              onClick={() => { setMobileOpen(false); setMobileServicesOpen(false) }}
                              className="flex flex-col px-4 py-3.5 transition-all"
                              style={{
                                borderBottom: ci < link.children.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                              }}
                            >
                              <span
                                className="text-sm font-inter font-semibold"
                                style={{ color: '#ffffff' }}
                              >
                                {child.label}
                              </span>
                              {child.desc && (
                                <span
                                  className="text-xs font-inter mt-0.5"
                                  style={{ color: 'rgba(247,231,206,0.55)' }}
                                >
                                  {child.desc}
                                </span>
                              )}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : link.href.startsWith('/') ? (
                    <Link
                      to={link.href}
                      className="block py-3.5 px-4 rounded-sm font-inter font-semibold text-base transition-all"
                      style={{ color: '#ffffff' }}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className="w-full text-left py-3.5 px-4 rounded-sm font-inter font-semibold text-base transition-all"
                      style={{ color: '#ffffff' }}
                    >
                      {link.label}
                    </button>
                  )}
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.28 }}
                className="pt-4 mt-2"
                style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
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
