import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right'
import Star from 'lucide-react/dist/esm/icons/star'
import Zap from 'lucide-react/dist/esm/icons/zap'
import RefreshCw from 'lucide-react/dist/esm/icons/refresh-cw'
import Camera from 'lucide-react/dist/esm/icons/camera'
import { usePricing } from '../../context/PricingContext'
import { StandardPricingInputs, PriceStrip } from '../../components/PricingWidgets'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: d, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

const features = [
  { icon: Zap, title: 'Rotation Ultra-Rapide', desc: 'Intervention coordonnée entre check-out et check-in. Votre bien prêt à temps, à chaque fois.' },
  { icon: Star, title: 'Résultat 5 Étoiles', desc: 'Nos hôtes maintiennent en moyenne une note de 4,9/5 sur la propreté après nos interventions.' },
  { icon: RefreshCw, title: 'Linge & Consommables', desc: 'Option linge fourni et rechargement des consommables (savon, papier, gel) à chaque passage.' },
  { icon: Camera, title: 'Rapport Photo', desc: 'Compte-rendu photo envoyé après chaque intervention. Visibilité totale sur votre bien à distance.' },
]

const included = [
  'Nettoyage complet de toutes les pièces',
  'Changement et mise en place du linge de lit',
  'Remplacement des serviettes de bain',
  'Vérification et rechargement des consommables',
  'Vaisselle et rangement cuisine',
  'Rapport photo avant/après envoyé',
]

const levels = [
  { label: 'Express', desc: 'Rotation ultra-rapide entre deux réservations.', time: '1–2h' },
  { label: 'Standard', desc: 'Notre formule phare. Nettoyage complet et soigné.', time: '2–3h' },
  { label: 'Premium', desc: 'Attention absolue aux détails. Le grand luxe.', time: '3–5h' },
]

export default function AirbnbCleaning() {
  const navigate = useNavigate()
  const { switchMode } = usePricing()

  useEffect(() => {
    window.scrollTo(0, 0)
    switchMode('standard')
  }, []) // eslint-disable-line

  const goToBooking = () => navigate('/', { state: { scrollTo: '#booking' } })

  return (
    <div className="min-h-screen">

      {/* ── Hero ── */}
      <section className="hero-dark relative min-h-[58vh] flex items-end overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1600&fit=crop&q=60"
          alt=""
          loading="eager"
          className="absolute inset-0 w-full h-full object-cover object-center"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deeper via-navy/55 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/50 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-36">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1}>
            <p className="section-label mb-4">Short-Term Rental</p>
          </motion.div>
          <motion.h1
            variants={fadeUp} initial="hidden" animate="visible" custom={0.2}
            className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-5"
          >
            Airbnb & Location<br />Courte Durée
          </motion.h1>
          <motion.p
            variants={fadeUp} initial="hidden" animate="visible" custom={0.35}
            className="font-playfair text-xl text-white/70 italic max-w-lg mb-10"
          >
            5 étoiles à chaque check-out.
          </motion.p>
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.5} className="flex gap-4 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={goToBooking}
              className="btn-primary text-base px-10 py-4 inline-flex items-center gap-2"
            >
              Réserver Maintenant <ArrowRight size={16} />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ── Service levels ── */}
      <section className="py-24 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="section-label">Nos Formules</p>
            <h2 className="section-title text-white mb-4">
              Conçu pour les hôtes{' '}
              <span className="text-gradient">qui ne font pas de compromis.</span>
            </h2>
            <p className="font-inter text-champagne/50 max-w-xl mx-auto">
              Chaque formule garantit un bien prêt à accueillir vos voyageurs dans les meilleures conditions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {levels.map((lvl, i) => (
              <motion.div
                key={lvl.label}
                variants={fadeUp} initial="hidden" whileInView="visible"
                custom={i * 0.12} viewport={{ once: true }}
                className="glass-card p-6 rounded-sm border border-white/8 text-center"
              >
                <div className="font-inter text-xs text-orange-accent font-semibold tracking-widest uppercase mb-3">
                  {lvl.time}
                </div>
                <div className="font-playfair text-2xl font-bold text-white mb-3">{lvl.label}</div>
                <div className="font-inter text-sm text-champagne/55 leading-relaxed">{lvl.desc}</div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  variants={fadeUp} initial="hidden" whileInView="visible"
                  custom={i * 0.1} viewport={{ once: true }}
                  className="glass-card p-5 rounded-sm"
                >
                  <f.icon size={18} className="text-orange-accent mb-3" />
                  <div className="font-playfair text-base font-bold text-white mb-1">{f.title}</div>
                  <div className="font-inter text-sm text-champagne/50 leading-relaxed">{f.desc}</div>
                </motion.div>
              ))}
            </div>

            <motion.div
              variants={fadeUp} initial="hidden" whileInView="visible"
              custom={0.2} viewport={{ once: true }}
            >
              <p className="section-label mb-6">Toujours inclus</p>
              <div className="space-y-3">
                {included.map((item, i) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full border border-orange-accent/40 flex items-center justify-center shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-orange-accent" />
                    </div>
                    <span className="font-inter text-sm text-champagne/65 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="py-24 bg-navy-deeper">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="section-label">Tarification</p>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-4">
              Calculez votre prestation
            </h2>
            <p className="font-inter text-champagne/50">
              Configurez votre logement et vos options. Prix instantané.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible"
            custom={0.1} viewport={{ once: true }}
          >
            <StandardPricingInputs />
          </motion.div>

          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible"
            custom={0.2} viewport={{ once: true }}
            className="mt-8"
          >
            <PriceStrip />
          </motion.div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-20 bg-navy text-center">
        <div className="max-w-2xl mx-auto px-4">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-4">
              Prêt à décrocher plus de 5 étoiles ?
            </h2>
            <p className="font-inter text-champagne/50 mb-8">
              Rejoignez les hôtes Teraby. Réservation en ligne, confirmation en 30 minutes.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={goToBooking}
              className="btn-primary text-base px-10 py-4 inline-flex items-center gap-2"
            >
              Réserver Maintenant <ArrowRight size={16} />
            </motion.button>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
