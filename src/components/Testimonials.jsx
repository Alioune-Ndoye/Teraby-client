import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { testimonials } from '../data/sampleData'

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

  const next = () => {
    setDirection(1)
    setCurrent((p) => (p + 1) % testimonials.length)
  }
  const prev = () => {
    setDirection(-1)
    setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    autoRef.current = setInterval(next, 5500)
    return () => clearInterval(autoRef.current)
  }, [])

  const resetAuto = () => {
    clearInterval(autoRef.current)
    autoRef.current = setInterval(next, 5500)
  }

  const variants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 80 : -80 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -80 : 80, transition: { duration: 0.4 } }),
  }

  return (
    <section id="testimonials" className="relative py-28 bg-navy-deeper overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-orange-accent/4 blur-[150px] rounded-full pointer-events-none" />

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
            <span className="text-gradient">Clients Exigeants</span>
          </h2>
          <div className="luxury-divider" />
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative glass-card rounded-sm p-10 md:p-14 overflow-hidden min-h-[300px] flex flex-col justify-between">
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
                    onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); resetAuto() }}
                    className={`h-0.5 rounded-full transition-all duration-300 ${
                      i === current ? 'w-8 bg-orange-accent' : 'w-3 bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => { prev(); resetAuto() }}
                  className="w-10 h-10 rounded-sm border border-white/10 flex items-center justify-center
                             text-champagne/50 hover:text-champagne hover:border-white/30 hover:bg-white/5
                             transition-all duration-200"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => { next(); resetAuto() }}
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

        <div className="flex justify-center gap-4 mt-8 flex-wrap">
          {testimonials.map((t, i) => (
            <motion.button
              key={t.id}
              onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); resetAuto() }}
              whileHover={{ scale: 1.05 }}
              className={`flex items-center gap-2.5 px-4 py-2 rounded-full border transition-all duration-300
                ${i === current
                  ? 'border-orange-accent/50 bg-orange-accent/10 text-champagne'
                  : 'border-white/8 bg-white/2 text-champagne/40 hover:border-white/20 hover:text-champagne/70'
                }`}
            >
              <img src={t.avatar} alt={t.name} className="w-6 h-6 rounded-full object-cover" />
              <span className="font-inter text-xs font-medium">{t.name.split(' ')[0]}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}
