import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right'
import Mail      from 'lucide-react/dist/esm/icons/mail'
import Building2 from 'lucide-react/dist/esm/icons/building-2'
import Clock     from 'lucide-react/dist/esm/icons/clock'
import Shield    from 'lucide-react/dist/esm/icons/shield'
import Users     from 'lucide-react/dist/esm/icons/users'
import Stethoscope from 'lucide-react/dist/esm/icons/stethoscope'
import ShoppingBag  from 'lucide-react/dist/esm/icons/shopping-bag'
import Receipt   from 'lucide-react/dist/esm/icons/receipt'

// ─── Pricing data (from grille_tarifaire_nettoyage.xlsx) ─────────────────────

const LOCALS = [
  {
    key: 'bureaux',
    label: 'Bureaux',
    Icon: Building2,
    tiers: [
      { range: '0 – 100 m²',   min: 0,   max: 100, freq: '1×/semaine', freqPerMonth: 4,  sans: 2.5, avec: 3.2 },
      { range: '101 – 300 m²', min: 101, max: 300, freq: '2×/semaine', freqPerMonth: 8,  sans: 2.2, avec: 3.0 },
      { range: '301 – 600 m²', min: 301, max: 600, freq: '3×/semaine', freqPerMonth: 13, sans: 2.0, avec: 2.8 },
    ],
  },
  {
    key: 'medical',
    label: 'Cabinet médical',
    Icon: Stethoscope,
    tiers: [
      { range: '0 – 100 m²',   min: 0,   max: 100, freq: '3×/semaine', freqPerMonth: 13, sans: 3.0, avec: 3.8 },
      { range: '101 – 300 m²', min: 101, max: 300, freq: '5×/semaine', freqPerMonth: 22, sans: 2.7, avec: 3.5 },
    ],
  },
  {
    key: 'magasin',
    label: 'Magasin',
    Icon: ShoppingBag,
    tiers: [
      { range: '0 – 100 m²',   min: 0,   max: 100, freq: '2×/semaine', freqPerMonth: 8,  sans: 2.6, avec: 3.3 },
      { range: '101 – 300 m²', min: 101, max: 300, freq: '3×/semaine', freqPerMonth: 13, sans: 2.3, avec: 3.1 },
    ],
  },
]

const EXTRAS = [
  { key: 'canape_2',  group: 'Canapé', label: '2 places',  sans: 70,  avec: 90  },
  { key: 'canape_3',  group: 'Canapé', label: '3 places',  sans: 90,  avec: 120 },
  { key: 'canape_a',  group: 'Canapé', label: 'Angle',     sans: 120, avec: 160 },
  { key: 'tapis_s',   group: 'Tapis',  label: '< 5 m²',   sans: 30,  avec: 45  },
  { key: 'tapis_m',   group: 'Tapis',  label: '5 – 10 m²', sans: 50,  avec: 70  },
  { key: 'tapis_l',   group: 'Tapis',  label: '> 10 m²',  sans: 70,  avec: 100 },
]

// ─── Shared animation variant ─────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: d, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

// ─── Pricing calculator ───────────────────────────────────────────────────────

function CommercialCalculator() {
  const [localKey,    setLocalKey]    = useState('bureaux')
  const [surface,     setSurface]     = useState('')
  const [fournitures, setFournitures] = useState(false)
  const [selectedExtras, setSelectedExtras] = useState({})

  const local = LOCALS.find(l => l.key === localKey)
  const surf  = parseFloat(surface)
  const tier  = isNaN(surf) || surf <= 0
    ? null
    : local.tiers.find(t => surf >= t.min && surf <= t.max)

  const pricePerM2   = tier ? (fournitures ? tier.avec : tier.sans) : null
  const perIntervention = tier && pricePerM2 ? Math.round(pricePerM2 * surf) : null
  const perMonth        = perIntervention ? Math.round(perIntervention * tier.freqPerMonth) : null

  const extrasTotal = EXTRAS
    .filter(e => selectedExtras[e.key])
    .reduce((sum, e) => sum + (fournitures ? e.avec : e.sans), 0)

  const toggleExtra = (key) =>
    setSelectedExtras(prev => ({ ...prev, [key]: !prev[key] }))

  const outOfRange = !isNaN(surf) && surf > 0 && !tier

  return (
    <div className="space-y-8">

      {/* ── Type de local ── */}
      <div>
        <p className="font-inter text-xs text-champagne/30 uppercase tracking-[0.18em] mb-3">
          Type de local
        </p>
        <div className="grid grid-cols-3 gap-3">
          {LOCALS.map(({ key, label, Icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => { setLocalKey(key); setSurface('') }}
              className={`flex flex-col items-center gap-2 py-4 px-3 rounded-sm border text-center
                transition-all duration-200
                ${localKey === key
                  ? 'border-orange-accent/60 bg-orange-accent/[0.08] shadow-[0_0_24px_rgba(204,85,0,0.1)]'
                  : 'border-white/8 hover:border-white/20 hover:bg-white/[0.02]'
                }`}
            >
              <Icon size={18} className={localKey === key ? 'text-orange-accent' : 'text-champagne/30'} />
              <span className={`font-inter text-xs font-medium leading-tight ${localKey === key ? 'text-champagne' : 'text-champagne/50'}`}>
                {label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Surface ── */}
      <div>
        <p className="font-inter text-xs text-champagne/30 uppercase tracking-[0.18em] mb-3">
          Surface (m²)
        </p>
        <input
          type="number"
          min="1"
          max="600"
          placeholder="ex : 120 m²"
          value={surface}
          onChange={e => setSurface(e.target.value)}
          className="luxury-input"
        />
        {outOfRange && (
          <p className="mt-2 font-inter text-xs text-orange-accent/70">
            Surface hors grille tarifaire. Contactez-nous pour un devis personnalisé.
          </p>
        )}
        {tier && (
          <p className="mt-2 font-inter text-xs text-champagne/30">
            Tranche tarifaire : {tier.range} · Fréquence recommandée : {tier.freq}
          </p>
        )}
      </div>

      {/* ── Fournitures ── */}
      <div>
        <p className="font-inter text-xs text-champagne/30 uppercase tracking-[0.18em] mb-3">
          Fournitures
        </p>
        <div className="flex rounded-sm overflow-hidden border border-white/8">
          {[
            { value: false, label: 'Sans fournitures' },
            { value: true,  label: 'Avec fournitures' },
          ].map(opt => (
            <button
              key={String(opt.value)}
              type="button"
              onClick={() => setFournitures(opt.value)}
              className={`flex-1 py-2.5 text-sm font-inter font-medium transition-all duration-200
                ${fournitures === opt.value
                  ? 'bg-orange-accent/20 text-champagne'
                  : 'text-champagne/50 hover:text-champagne/80'
                }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Extras (Canapé & Tapis) ── */}
      <div>
        <p className="font-inter text-xs text-champagne/30 uppercase tracking-[0.18em] mb-3">
          Options — Canapé & Tapis
        </p>
        <div className="grid grid-cols-2 gap-2">
          {EXTRAS.map(e => {
            const checked = !!selectedExtras[e.key]
            const price   = fournitures ? e.avec : e.sans
            return (
              <label
                key={e.key}
                className={`flex items-center gap-3 p-3 rounded-sm border cursor-pointer
                  transition-all duration-200
                  ${checked
                    ? 'border-orange-accent/40 bg-orange-accent/[0.06]'
                    : 'border-white/8 hover:border-white/15'
                  }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleExtra(e.key)}
                  className="accent-orange-500 w-3.5 h-3.5 shrink-0"
                />
                <div>
                  <div className="font-inter text-sm text-champagne/80 leading-tight">
                    {e.group} · {e.label}
                  </div>
                  <div className="font-inter text-xs text-orange-accent/70 mt-0.5">+{price} €</div>
                </div>
              </label>
            )
          })}
        </div>
      </div>

      {/* ── Result strip ── */}
      <AnimatePresence mode="wait">
        {perMonth !== null && (
          <motion.div
            key={`${localKey}-${surface}-${fournitures}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="glass-card rounded-sm px-6 py-5 border border-orange-accent/15"
          >
            <div className="flex items-center gap-2 mb-4">
              <Receipt size={15} className="text-orange-accent" />
              <span className="font-inter text-xs font-semibold text-orange-accent tracking-widest uppercase">
                Estimation instantanée · HT
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between items-baseline">
                <span className="font-inter text-sm text-champagne/55">
                  {surf} m² × {pricePerM2} €/m² · {tier.freq}
                </span>
                <span className="font-inter text-sm text-champagne font-medium">{perIntervention} € / passage</span>
              </div>
              {extrasTotal > 0 && (
                <div className="flex justify-between items-baseline">
                  <span className="font-inter text-sm text-champagne/55">Options canapé & tapis</span>
                  <span className="font-inter text-sm text-champagne font-medium">+{extrasTotal} €</span>
                </div>
              )}
            </div>

            <div className="border-t border-white/8 pt-4 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="font-inter text-xs text-champagne/35 mb-1">Estimation mensuelle</div>
                <div className="font-playfair text-4xl font-bold text-white leading-none">
                  {perMonth + extrasTotal}
                  <span className="font-inter text-lg text-champagne/35 ml-1">€</span>
                </div>
              </div>
              <div className="text-right">
                <div className="font-inter text-xs text-champagne/30">
                  {tier.freqPerMonth} interventions / mois
                </div>
                <div className="font-inter text-xs text-champagne/30 mt-0.5">
                  {fournitures ? 'Avec' : 'Sans'} fournitures · Prix HT
                </div>
              </div>
            </div>

            <p className="font-inter text-xs text-champagne/20 mt-3">
              Prix final confirmé après visite technique
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

const features = [
  { icon: Building2,   title: 'Bureaux & Coworking',        desc: 'Espaces de travail maintenus impeccables pour une équipe productive.' },
  { icon: Clock,       title: 'Hors des heures d\'ouverture', desc: 'Interventions la nuit ou le week-end sans perturber votre activité.' },
  { icon: Shield,      title: 'Contrats Récurrents',         desc: 'Programmes hebdomadaires avec garantie de continuité de service.' },
  { icon: Users,       title: 'Équipe Dédiée',               desc: 'Une équipe fixe formée à vos locaux et à vos exigences spécifiques.' },
]

export default function CommercialCleaning() {
  const navigate = useNavigate()

  useEffect(() => { window.scrollTo(0, 0) }, [])

  const goToBooking = () => navigate('/', { state: { scrollTo: '#booking' } })

  return (
    <div className="min-h-screen">

      {/* ── Hero ── */}
      <section className="hero-dark relative min-h-[58vh] flex items-end overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&fit=crop&q=60"
          alt=""
          loading="eager"
          className="absolute inset-0 w-full h-full object-cover object-center"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deeper via-navy/55 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/50 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-36">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1}>
            <p className="section-label mb-4">Commercial</p>
          </motion.div>
          <motion.h1
            variants={fadeUp} initial="hidden" animate="visible" custom={0.2}
            className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-5"
          >
            Nettoyage Commercial
          </motion.h1>
          <motion.p
            variants={fadeUp} initial="hidden" animate="visible" custom={0.35}
            className="font-playfair text-xl text-champagne/70 italic max-w-lg mb-10"
          >
            Des standards cinq étoiles pour vos locaux professionnels.
          </motion.p>
          <motion.button
            variants={fadeUp} initial="hidden" animate="visible" custom={0.5}
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={goToBooking}
            className="btn-primary text-base px-10 py-4 inline-flex items-center gap-2"
          >
            Demander un Devis <ArrowRight size={16} />
          </motion.button>
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
                L'excellence professionnelle,{' '}
                <span className="text-gradient">sans compromis.</span>
              </h2>
              <p className="font-inter text-champagne/60 text-lg leading-relaxed mb-5">
                Les environnements professionnels exigent des standards professionnels. Nos équipes s'adaptent à vos contraintes horaires, vos surfaces spécifiques et vos exigences contractuelles.
              </p>
              <p className="font-inter text-champagne/45 leading-relaxed">
                Que vous gériez un plateau de bureaux, un cabinet médical ou un commerce, Teraby garantit une présence irréprochable à chaque visite.
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

      {/* ── Pricing calculator ── */}
      <section className="py-24 bg-navy-deeper">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="section-label">Tarification</p>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-4">
              Estimez votre prestation
            </h2>
            <p className="font-inter text-champagne/50">
              Sélectionnez votre type de local, saisissez votre surface. Le prix HT s'affiche instantanément.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible"
            custom={0.1} viewport={{ once: true }}
          >
            <CommercialCalculator />
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
              Discutons de vos besoins
            </h2>
            <p className="font-inter text-champagne/50 mb-8">
              Obtenez un devis personnalisé adapté à vos locaux, vos horaires et vos exigences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                onClick={goToBooking}
                className="btn-primary text-base px-10 py-4 inline-flex items-center justify-center gap-2"
              >
                Demander un Devis <ArrowRight size={16} />
              </motion.button>
              <motion.a
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                href="mailto:contact@teraby.fr"
                className="btn-secondary text-base px-10 py-4 inline-flex items-center justify-center gap-2"
              >
                <Mail size={16} /> contact@teraby.fr
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
