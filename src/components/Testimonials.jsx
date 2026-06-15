import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Star from 'lucide-react/dist/esm/icons/star'
import ChevronLeft from 'lucide-react/dist/esm/icons/chevron-left'
import ChevronRight from 'lucide-react/dist/esm/icons/chevron-right'
import Quote from 'lucide-react/dist/esm/icons/quote'
import { testimonials, GOOGLE_REVIEWS_URL } from '../data/sampleData'

function StarRating({ rating }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < rating ? 'text-orange-accent fill-orange-accent' : 'text-champagne/20'}
        />
      ))}
    </div>
  )
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const autoRef = useRef(null)
  const sectionRef = useRef(null)
  const visibleRef = useRef(false)

  const next = useCallback(() => {
    setDirection(1)
    setCurrent((p) => (p + 1) % testimonials.length)
  }, [])

  const prev = useCallback(() => {
    setDirection(-1)
    setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length)
  }, [])

  // Only run the interval when section is visible — saves CPU on mobile
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting
        if (entry.isIntersecting) {
          autoRef.current = setInterval(next, 5500)
        } else {
          clearInterval(autoRef.current)
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(section)
    return () => { observer.disconnect(); clearInterval(autoRef.current) }
  }, [next])

  const resetAuto = useCallback(() => {
    if (!visibleRef.current) return
    clearInterval(autoRef.current)
    autoRef.current = setInterval(next, 5500)
  }, [next])

  const variants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 80 : -80 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -80 : 80, transition: { duration: 0.4 } }),
  }

  return (
    <section ref={sectionRef} id="testimonials" className="relative py-28 bg-navy-deeper overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="hidden sm:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-orange-accent/4 blur-[70px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="section-label">Témoignages Clients</p>
          <h2 className="section-title text-white mb-6">
            La Confiance de nos{' '}
            <span className="text-white">Clients Exigeants</span>
          </h2>
          <div className="luxury-divider" />
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div
            onClick={() => window.open(GOOGLE_REVIEWS_URL, '_blank', 'noopener,noreferrer')}
            role="link"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && window.open(GOOGLE_REVIEWS_URL, '_blank', 'noopener,noreferrer')}
            className="relative glass-card rounded-sm p-10 md:p-14 overflow-hidden min-h-[300px] flex flex-col justify-between
                       hover:border-orange-accent/30 transition-all duration-300 group cursor-pointer"
          >
            {/* Google Reviews badge */}
            <div className="absolute top-5 left-8 flex items-center gap-2 opacity-50 group-hover:opacity-80 transition-opacity duration-200">
              <svg width="14" height="14" viewBox="0 0 48 48" className="shrink-0">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
              <span className="font-inter text-xs text-champagne/50">Avis Google vérifié</span>
            </div>
            <Quote size={60} className="absolute top-8 right-8 text-orange-accent/10 rotate-180" />

            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="relative z-10"
              >
                <div className="mb-6">
                  <StarRating rating={testimonials[current].rating} />
                </div>
                <blockquote className="font-playfair text-xl md:text-2xl text-white leading-relaxed mb-8 italic">
                  "{testimonials[current].text}"
                </blockquote>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonials[current].avatar}
                    alt={testimonials[current].name}
                    width="56"
                    height="56"
                    loading="lazy"
                    decoding="async"
                    className="w-14 h-14 rounded-full object-cover border-2 border-orange-accent/30"
                  />
                  <div>
                    <p className="font-inter font-semibold text-white text-sm">
                      {testimonials[current].name}
                    </p>
                    <p className="font-inter text-xs text-champagne/50 mt-0.5">
                      {testimonials[current].role}
                    </p>
                    <p className="font-inter text-xs text-orange-accent mt-1">
                      {testimonials[current].service}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-between mt-10">
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setDirection(i > current ? 1 : -1); setCurrent(i); resetAuto() }}
                    className={`h-0.5 rounded-full transition-all duration-300 ${
                      i === current ? 'w-8 bg-orange-accent' : 'w-3 bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={(e) => { e.stopPropagation(); prev(); resetAuto() }}
                  className="w-10 h-10 rounded-sm border border-white/10 flex items-center justify-center
                             text-champagne/50 hover:text-champagne hover:border-white/30 hover:bg-white/5
                             transition-all duration-200"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); next(); resetAuto() }}
                  className="w-10 h-10 rounded-sm border border-white/10 flex items-center justify-center
                             text-champagne/50 hover:text-champagne hover:border-white/30 hover:bg-white/5
                             transition-all duration-200"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
