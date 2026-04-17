import { motion, AnimatePresence } from 'framer-motion'
import { usePricing } from '../context/PricingContext'
import {
  ModeToggle,
  StandardPricingInputs,
  PremiumPricingInputs,
  PriceStrip,
} from './PricingWidgets'

const slideVariants = {
  enter:  { opacity: 0, y: 14  },
  center: { opacity: 1, y: 0,  transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit:   { opacity: 0, y: -10, transition: { duration: 0.25 } },
}

export default function Services() {
  const { pricingMode } = usePricing()

  return (
    <section id="services" className="relative py-28 bg-navy-deeper overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] -translate-y-1/2 bg-orange-accent/[0.04] blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="section-label">Ce Que Nous Proposons</p>
          <h2 className="section-title text-white mb-6">
            Services Conçus pour les{' '}
            <span className="text-gradient">Clients Exigeants</span>
          </h2>
          <div className="luxury-divider" />
          <p className="section-subtitle mx-auto text-champagne/55">
            Choisissez votre formule et configurez votre service en quelques secondes.
            Le prix se calcule en temps réel.
          </p>
        </motion.div>

        {/* ── Mode toggle ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="max-w-md mx-auto mb-10"
        >
          <ModeToggle />
        </motion.div>

        {/* ── Pricing inputs — animated transition between modes ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={pricingMode}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            {pricingMode === 'standard'
              ? <StandardPricingInputs />
              : <PremiumPricingInputs />
            }
          </motion.div>
        </AnimatePresence>

        {/* ── Live price strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mt-10"
        >
          <PriceStrip />
        </motion.div>

        {/* ── Secondary CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-center mt-8"
        >
          <p className="font-inter text-champagne/35 text-sm mb-5">
            Vous ne savez pas quel service vous convient ?
          </p>
          <button
            onClick={() => document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-secondary"
          >
            Obtenir une Consultation Gratuite
          </button>
        </motion.div>

      </div>
    </section>
  )
}
