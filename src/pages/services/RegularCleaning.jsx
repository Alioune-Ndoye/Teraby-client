import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AnimatePresence } from 'framer-motion'
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle'
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right'
import Shield from 'lucide-react/dist/esm/icons/shield'
import Clock from 'lucide-react/dist/esm/icons/clock'
import Leaf from 'lucide-react/dist/esm/icons/leaf'
import { usePricing, REG_EXTRAS } from '../../context/PricingContext'
import { PremiumPricingInputs, PriceStrip, CheckRow } from '../../components/PricingWidgets'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: d, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

const features = [
  { icon: CheckCircle, title: 'Nettoyage Complet', desc: 'Cuisine, salles de bain, chambres et séjour — chaque pièce traitée méthodiquement.' },
  { icon: Shield, title: 'Surfaces Premium', desc: 'Marbre, parquet, inox — nos spécialistes connaissent chaque matériau et son entretien.' },
  { icon: Leaf, title: 'Produits Certifiés', desc: 'Produits écologiques premium, sûrs pour votre famille, vos animaux et l\'environnement.' },
  { icon: Clock, title: 'Satisfaction Garantie', desc: 'Nous repassons gratuitement si vous n\'êtes pas entièrement satisfait de notre prestation.' },
]

const included = [
  'Cuisine — plans de travail, appareils, évier, robinetterie',
  'Salles de bain & WC — carrelage, joints, miroirs',
  'Chambres — poussières, sols, surfaces, literie',
  'Séjour & couloirs — mobilier, sols, vitres accessibles',
  'Sols aspirés et lavés dans toutes les pièces',
  'Plinthes, interrupteurs & prises électriques',
]

export default function RegularCleaning() {
  const navigate = useNavigate()
  const { switchMode, prem, setPrem } = usePricing()
  const toggleExtra = (key) =>
    setPrem({ ...prem, extras: { ...prem.extras, [key]: !prem.extras[key] } })

  useEffect(() => {
    window.scrollTo(0, 0)
    switchMode('premium')
  }, []) // eslint-disable-line

  const goToBooking = () => navigate('/', { state: { scrollTo: '#booking' } })

  return (
    <div className="min-h-screen">

      {/* ── Hero ── */}
      <section className="hero-dark relative min-h-[58vh] flex items-end overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&fit=crop&q=60"
          alt=""
          loading="eager"
          className="absolute inset-0 w-full h-full object-cover object-center"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deeper via-navy/55 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/50 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-36">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1}>
            <p className="section-label mb-4">Résidentiel</p>
          </motion.div>
          <motion.h1
            variants={fadeUp} initial="hidden" animate="visible" custom={0.2}
            className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-5"
          >
            Nettoyage Régulier
          </motion.h1>
          <motion.p
            variants={fadeUp} initial="hidden" animate="visible" custom={0.35}
            className="font-playfair text-xl text-white/70 italic max-w-lg mb-10"
          >
            Votre intérieur, toujours impeccable.
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

      {/* ── Overview ── */}
      <section className="py-24 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            >
              <p className="section-label">Notre Approche</p>
              <h2 className="section-title text-white mb-6">
                Plus qu'un nettoyage.{' '}
                <span className="text-gradient">Une restauration.</span>
              </h2>
              <p className="font-inter text-champagne/60 text-lg leading-relaxed mb-5">
                Nous ne nous contentons pas de nettoyer la surface. Chaque intervention est une remise à niveau méticuleuse de votre espace de vie — des angles les plus visibles aux recoins les plus discrets.
              </p>
              <p className="font-inter text-champagne/45 leading-relaxed">
                Nos spécialistes sont formés aux surfaces premium et utilisent exclusivement des produits certifiés écologiques. Résultat : un intérieur qui respire la fraîcheur et le soin.
              </p>
            </motion.div>

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
          </div>
        </div>
      </section>

      {/* ── What's included ── */}
      <section className="py-20 bg-navy-light/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="section-label">Systématiquement inclus</p>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white">
              Ce que nous faisons, à chaque fois.
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {included.map((item, i) => (
              <motion.div
                key={item}
                variants={fadeUp} initial="hidden" whileInView="visible"
                custom={i * 0.07} viewport={{ once: true }}
                className="flex items-start gap-3"
              >
                <div className="w-5 h-5 rounded-full border border-orange-accent/40 flex items-center justify-center shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-orange-accent" />
                </div>
                <span className="font-inter text-sm text-champagne/65 leading-relaxed">{item}</span>
              </motion.div>
            ))}
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
              Configurez votre prestation
            </h2>
            <p className="font-inter text-champagne/50">
              Choisissez votre formule. Le prix se calcule en temps réel.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible"
            custom={0.1} viewport={{ once: true }}
          >
            <PremiumPricingInputs />
          </motion.div>

          <AnimatePresence>
            {prem.fournitures && (
              <motion.div
                key="extras"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden mt-6"
              >
                <p className="font-inter text-xs text-champagne/30 uppercase tracking-[0.18em] mb-3">
                  Options — Canapé &amp; Tapis
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {REG_EXTRAS.map(e => (
                    <CheckRow
                      key={e.key}
                      checked={!!prem.extras[e.key]}
                      onChange={() => toggleExtra(e.key)}
                      label={`${e.group} · ${e.label}`}
                      sub={`+${e.price} €`}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

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
              Prêt à retrouver un intérieur impeccable ?
            </h2>
            <p className="font-inter text-champagne/50 mb-8">
              Réservez en ligne en quelques secondes. Confirmation sous 30 minutes.
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
