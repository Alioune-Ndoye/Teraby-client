import { motion } from 'framer-motion'
import ArrowDown from 'lucide-react/dist/esm/icons/arrow-down'
import Play from 'lucide-react/dist/esm/icons/play'
import Star from 'lucide-react/dist/esm/icons/star'
import { stats } from '../data/sampleData'

const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

const fadeUp = {
  hidden: { opacity: 0, y: isMobile ? 20 : 60 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: isMobile ? 0.5 : 0.9,
      delay: isMobile ? delay * 0.5 : delay,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
}

export default function Hero() {
  const scrollToSection = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <picture>
          <source srcSet="/hero.webp" type="image/webp" />
          <img
            src="/hero.jpg"
            alt=""
            width="1536"
            height="1024"
            loading="eager"
            fetchpriority="high"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover object-center hero-bg-img"
            aria-hidden="true"
          />
        </picture>
        {/* Base overlay — slightly stronger on mobile for readability */}
        <div className="absolute inset-0 bg-white/52 md:bg-white/38" />
        {/* Left-to-right gradient — pulls text side lighter on mobile */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/75 via-white/40 to-white/5 md:from-white/55 md:via-white/20 md:to-transparent" />
        {/* Top fade */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/25 to-transparent" />
        {/* Mobile-only bottom fade — keeps lower content clean */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white/30 to-transparent md:hidden" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.2}
            className="inline-flex items-center gap-2 bg-white/90 border border-black/10 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full mb-6 sm:mb-8"
          >
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} className="text-orange-accent fill-orange-accent" />
              ))}
            </div>
            <span className="text-gray-800 text-xs font-inter font-medium tracking-wide">
              Service de Nettoyage Premium N°1 en France
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.4}
            className="font-playfair text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.08] sm:leading-[1.05] mb-5 sm:mb-6"
            style={{ textShadow: '0 2px 20px rgba(255,255,255,0.85), 0 1px 6px rgba(0,0,0,0.12)' }}
          >
            <span className="text-gray-900">Nettoyage Premium,</span>
            <br />
            <span className="text-white">Réinventé.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.6}
            className="font-playfair text-base sm:text-xl md:text-2xl text-gray-800 italic mb-3 leading-relaxed"
            style={{ textShadow: '0 1px 14px rgba(255,255,255,0.9)' }}
          >
            Là où la précision rencontre la perfection.
          </motion.p>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.7}
            className="font-inter text-sm sm:text-base md:text-lg text-gray-700 max-w-sm sm:max-w-xl leading-relaxed mb-8 sm:mb-10"
            style={{ textShadow: '0 1px 10px rgba(255,255,255,0.85)' }}
          >
            Nous ne nettoyons pas seulement — nous restaurons, élevons et transformons.
            Chaque surface, chaque recoin, chaque détail traité avec le soin qu'il mérite.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.85}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-12 sm:mb-20"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollToSection('#booking')}
              className="btn-primary text-sm sm:text-base px-8 sm:px-10 py-3.5 sm:py-4"
            >
              Réserver Maintenant
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollToSection('#services')}
              className="font-inter font-semibold tracking-wide text-sm sm:text-base px-8 sm:px-10 py-3.5 sm:py-4 rounded-sm transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2.5"
              style={{ backgroundColor: '#1A2238', color: '#ffffff' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#243251'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#1A2238'}
            >
              <Play size={16} className="fill-white/70" />
              Découvrir nos Services
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1.0}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + i * 0.1, duration: 0.6 }}
                className="group"
              >
                <div
                  className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 group-hover:text-orange-accent transition-colors duration-300"
                  style={{ textShadow: '0 1px 8px rgba(255,255,255,0.7)' }}
                >
                  {stat.value}
                </div>
                <div className="font-inter text-xs text-gray-500 mt-1 tracking-wide uppercase">
                  {stat.label}
                </div>
                <div className="w-8 h-0.5 bg-orange-accent/40 mt-2 group-hover:w-12 transition-all duration-300" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => scrollToSection('#services')}
      >
        <span className="text-gray-400 text-xs font-inter tracking-[0.2em] uppercase">
          Défiler
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={18} className="text-gray-400" />
        </motion.div>
      </motion.div>
    </section>
  )
}
