import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { faqItems } from '../data/sampleData'

function FAQItem({ item, index }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className={`border rounded-sm overflow-hidden transition-all duration-300
        ${open ? 'border-orange-accent/30 bg-orange-accent/4' : 'border-white/6 bg-white/2 hover:border-white/15'}`}
    >
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
      >
        <span className="font-inter font-medium text-sm md:text-base text-white/90 leading-relaxed">
          {item.q}
        </span>
        <div className={`flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300
          ${open ? 'border-orange-accent bg-orange-accent text-white' : 'border-white/20 text-champagne/40'}`}>
          {open ? <Minus size={12} /> : <Plus size={12} />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="px-6 pb-5 border-t border-white/5">
              <p className="font-inter text-sm text-champagne/60 leading-relaxed pt-4">
                {item.a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  return (
    <section className="relative py-24 bg-navy-deeper overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-accent/4 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p className="section-label">Questions Fréquentes</p>
          <h2 className="section-title text-white mb-6">
            Tout Ce Que Vous{' '}
            <span className="text-gradient">Devez Savoir</span>
          </h2>
          <div className="luxury-divider" />
        </motion.div>

        <div className="space-y-3">
          {faqItems.map((item, i) => (
            <FAQItem key={i} item={item} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="font-inter text-champagne/40 text-sm mb-5">
            Vous avez d'autres questions ? Notre équipe est là pour vous.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="tel:+33155550188"
              className="btn-primary text-sm py-3 px-8"
            >
              Appelez-Nous
            </a>
            <a
              href="mailto:bonjour@teraby.fr"
              className="btn-secondary text-sm py-3 px-8"
            >
              Envoyer un E-mail
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
