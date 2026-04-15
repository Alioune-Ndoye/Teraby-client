import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Home, Sparkles, Truck, Building2, Clock, DollarSign, ChevronRight } from 'lucide-react'
import { services } from '../data/sampleData'

const iconMap = { Home, Sparkles, Truck, Building2 }

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
}

function ServiceCard({ service }) {
  const Icon = iconMap[service.icon] || Sparkles

  return (
    <motion.div
      variants={cardVariants}
      className="group relative glass-card rounded-sm p-8 cursor-pointer overflow-hidden
                 hover:border-orange-accent/30 transition-all duration-500
                 hover:shadow-[0_20px_60px_rgba(204,85,0,0.12),0_8px_20px_rgba(0,0,0,0.3)]"
    >
      {service.popular && (
        <div className="absolute top-4 right-4 bg-orange-accent text-white text-xs font-inter font-semibold px-3 py-1 rounded-full tracking-wide">
          Le Plus Demandé
        </div>
      )}

      <div className="absolute inset-0 bg-orange-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative mb-6">
        <div className="w-14 h-14 rounded-sm bg-navy-light border border-white/8 flex items-center justify-center
                        group-hover:bg-orange-accent/10 group-hover:border-orange-accent/30 transition-all duration-300">
          <Icon size={24} className="text-orange-accent" />
        </div>
      </div>

      <p className="section-label text-left mb-1">{service.subtitle}</p>
      <h3 className="font-playfair text-2xl font-bold text-white mb-3 group-hover:text-champagne-light transition-colors">
        {service.title}
      </h3>
      <p className="font-inter text-champagne/55 text-sm leading-relaxed mb-6">
        {service.description}
      </p>

      <ul className="space-y-2 mb-8">
        {service.features.map((f) => (
          <li key={f} className="flex items-center gap-2 font-inter text-sm text-champagne/70">
            <ChevronRight size={14} className="text-orange-accent flex-shrink-0" />
            {f}
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between pt-6 border-t border-white/6">
        <div className="flex items-center gap-1.5 text-champagne/60">
          <DollarSign size={14} />
          <span className="font-inter text-sm font-semibold text-champagne">{service.price}</span>
        </div>
        <div className="flex items-center gap-1.5 text-champagne/50">
          <Clock size={14} />
          <span className="font-inter text-xs">{service.duration}</span>
        </div>
      </div>

      <motion.button
        whileHover={{ x: 4 }}
        onClick={() => document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' })}
        className="mt-5 flex items-center gap-2 text-orange-accent font-inter text-sm font-semibold
                   opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        Réserver ce Service <ChevronRight size={14} />
      </motion.button>
    </motion.div>
  )
}

export default function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="services" className="relative py-28 bg-navy-deeper overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] -translate-y-1/2 bg-orange-accent/4 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            De l'entretien régulier aux grands nettoyages transformateurs — chaque service est
            réalisé avec la même attention obsessionnelle aux détails.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="text-center mt-14"
        >
          <p className="font-inter text-champagne/40 text-sm mb-5">
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
