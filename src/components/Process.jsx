import { motion } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Réservez en Ligne',
    description: 'Choisissez votre service, sélectionnez une date et remplissez votre demande en moins de 2 minutes. Aucune carte requise.',
    icon: '📅',
  },
  {
    number: '02',
    title: 'Confirmation Concierge',
    description: 'Notre équipe vous contacte dans les 30 minutes pour confirmer les détails et personnaliser votre plan de nettoyage.',
    icon: '✉️',
  },
  {
    number: '03',
    title: 'Intervention d\'Élite',
    description: 'Vos spécialistes certifiés arrivent à l\'heure avec des équipements et produits premium. Vous n\'avez rien à prévoir.',
    icon: '✨',
  },
  {
    number: '04',
    title: 'Résultat Garanti',
    description: 'Nous vous envoyons un rapport d\'intervention avec photos. Satisfaction garantie — si ce n\'est pas parfait, nous revenons.',
    icon: '🏆',
  },
]

export default function Process() {
  return (
    <section className="relative py-28 bg-navy overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] -translate-y-1/2 bg-orange-accent/4 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="section-label">Notre Méthode</p>
          <h2 className="section-title text-white mb-6">
            Une Expérience{' '}
            <span className="text-gradient">Sans Effort</span>
          </h2>
          <div className="luxury-divider" />
          <p className="section-subtitle mx-auto text-champagne/55">
            De la réservation au résultat final — chaque étape est pensée pour votre confort
            et votre tranquillité d'esprit.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting line (desktop) */}
          <div className="absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-orange-accent/20 to-transparent hidden lg:block pointer-events-none" />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className="group relative text-center"
            >
              {/* Step circle */}
              <div className="relative mx-auto w-20 h-20 mb-6">
                <div className="w-20 h-20 rounded-full glass-card border border-white/10 flex items-center justify-center
                                group-hover:border-orange-accent/40 group-hover:bg-orange-accent/8 transition-all duration-400">
                  <span className="text-3xl">{step.icon}</span>
                </div>
                {/* Number badge */}
                <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-orange-accent flex items-center justify-center">
                  <span className="text-white font-inter text-[10px] font-bold">{i + 1}</span>
                </div>
              </div>

              <div className="font-inter text-xs text-orange-accent font-semibold tracking-[0.2em] mb-2">
                {step.number}
              </div>
              <h3 className="font-playfair text-xl font-bold text-white mb-3 group-hover:text-champagne-light transition-colors">
                {step.title}
              </h3>
              <p className="font-inter text-sm text-champagne/50 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Brand promise */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 glass-card rounded-sm p-8 md:p-12 text-center border border-orange-accent/10"
        >
          <div className="max-w-2xl mx-auto">
            <p className="section-label justify-center flex">Notre Promesse</p>
            <h3 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-4">
              "Si ce n'est pas parfait,{' '}
              <span className="text-gradient">nous revenons gratuitement."</span>
            </h3>
            <p className="font-inter text-champagne/50 text-sm leading-relaxed mb-8">
              Nous sommes si confiants dans la qualité de notre travail que nous garantissons
              votre entière satisfaction — sans condition, sans frais supplémentaires.
            </p>
            <button
              onClick={() => document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary"
            >
              Réserver Maintenant
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
