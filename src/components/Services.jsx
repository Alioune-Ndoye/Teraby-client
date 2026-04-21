import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right'
import { serviceCards } from '../data/sampleData'

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

export default function Services() {
  return (
    <section id="services" className="relative py-28 bg-navy-deeper overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] -translate-y-1/2 bg-orange-accent/[0.04] blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="section-label">Ce Que Nous Proposons</p>
          <h2 className="section-title text-white mb-6">
            Services Conçus pour les{' '}
            <span className="text-gradient">Clients Exigeants</span>
          </h2>
          <div className="luxury-divider" />
          <p className="section-subtitle mx-auto text-champagne/55">
            Choisissez votre formule et entrez dans une expérience dédiée,
            conçue pour votre type de bien.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {serviceCards.map((card, i) => (
            <motion.div
              key={card.slug}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              <Link
                to={card.href}
                className="group relative flex flex-col h-full glass-card rounded-sm overflow-hidden
                           border border-white/8 hover:border-orange-accent/30 transition-all duration-500
                           hover:shadow-[0_20px_60px_rgba(204,85,0,0.1)] hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deeper/80 via-navy-deeper/20 to-transparent" />
                  {card.popular && (
                    <span className="absolute top-3 right-3 bg-orange-accent text-white text-[10px] font-inter font-bold px-2.5 py-1 rounded-full">
                      Le Plus Populaire
                    </span>
                  )}
                  <span className="absolute bottom-3 left-4 font-inter text-xs font-semibold text-orange-accent tracking-[0.2em] uppercase">
                    {card.tag}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-6">
                  <h3 className="font-playfair text-xl font-bold text-white mb-1">{card.title}</h3>
                  <p className="font-inter text-sm text-orange-accent/80 italic mb-3">{card.subtitle}</p>
                  <p className="font-inter text-sm text-champagne/55 leading-relaxed mb-6">{card.description}</p>

                  <ul className="space-y-2 mb-8 flex-1">
                    {card.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 font-inter text-sm text-champagne/60">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-accent shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-4 border-t border-white/5">
                    <span className="inline-flex items-center gap-2 font-inter text-sm font-semibold text-champagne/70 group-hover:text-orange-accent transition-colors duration-300">
                      Découvrir ce service
                      <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="text-center mt-14"
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
