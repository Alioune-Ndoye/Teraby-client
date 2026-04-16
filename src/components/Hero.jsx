import { motion } from 'framer-motion'
import ArrowDown from 'lucide-react/dist/esm/icons/arrow-down'
import Play from 'lucide-react/dist/esm/icons/play'
import Star from 'lucide-react/dist/esm/icons/star'
import { stats } from '../data/sampleData'

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

export default function Hero() {
  const scrollToSection = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="hero-dark relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&fit=crop&q=60&auto=format"
          alt=""
          width="1920"
          height="1080"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-center"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deeper/85 via-navy/75 to-navy-deeper/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deeper/60 via-transparent to-navy-deeper/40" />
        <div className="absolute inset-0 bg-noise opacity-30" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-accent/8 blur-[120px] rounded-full" />
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
            className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-8"
          >
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} className="text-orange-accent fill-orange-accent" />
              ))}
            </div>
            <span className="text-champagne/80 text-xs font-inter font-medium tracking-wide">
              Service de Nettoyage Luxe N°1 en France
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.4}
            className="font-playfair text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] mb-6"
          >
            <span className="text-white">Nettoyage Luxe,</span>
            <br />
            <span className="text-gradient">Réinventé.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.6}
            className="font-playfair text-xl md:text-2xl text-champagne/70 italic mb-3 leading-relaxed"
          >
            Là où la précision rencontre la perfection.
          </motion.p>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.7}
            className="font-inter text-base md:text-lg text-champagne/50 max-w-xl leading-relaxed mb-10"
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
            className="flex flex-col sm:flex-row gap-4 mb-20"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollToSection('#booking')}
              className="btn-primary text-base px-10 py-4"
            >
              Réserver Maintenant
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollToSection('#services')}
              className="btn-secondary text-base px-10 py-4 flex items-center justify-center gap-2.5"
            >
              <Play size={16} className="fill-champagne/70" />
              Découvrir nos Services
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1.0}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + i * 0.1, duration: 0.6 }}
                className="group"
              >
                <div className="font-playfair text-3xl md:text-4xl font-bold text-white group-hover:text-orange-accent transition-colors duration-300">
                  {stat.value}
                </div>
                <div className="font-inter text-xs text-champagne/50 mt-1 tracking-wide uppercase">
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
        <span className="text-champagne/30 text-xs font-inter tracking-[0.2em] uppercase">
          Défiler
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={18} className="text-champagne/30" />
        </motion.div>
      </motion.div>
    </section>
  )
}
