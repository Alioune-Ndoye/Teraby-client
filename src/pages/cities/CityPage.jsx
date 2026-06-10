import { useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import MapPin from 'lucide-react/dist/esm/icons/map-pin'
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right'
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle'
import Phone from 'lucide-react/dist/esm/icons/phone'
import Shield from 'lucide-react/dist/esm/icons/shield'
import Leaf from 'lucide-react/dist/esm/icons/leaf'
import Clock from 'lucide-react/dist/esm/icons/clock'
import Star from 'lucide-react/dist/esm/icons/star'
import ChevronDown from 'lucide-react/dist/esm/icons/chevron-down'
import { useState } from 'react'
import { getCityBySlug, cities } from '../../data/citiesData'
import useSEO from '../../hooks/useSEO'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay: d, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

const services = [
  {
    title: 'Nettoyage Résidentiel',
    desc: 'Appartements, maisons, studios. Nettoyage régulier ou ponctuel. Produits écologiques premium.',
    href: '/services/regular-cleaning',
    icon: CheckCircle,
  },
  {
    title: 'Nettoyage Commercial',
    desc: 'Bureaux, commerces, showrooms. Contrats d\'entretien hebdomadaires ou mensuels.',
    href: '/services/commercial-cleaning',
    icon: Shield,
  },
  {
    title: 'Airbnb & Location',
    desc: 'Remise en état express entre deux séjours. Disponible 7j/7, tôt le matin ou en soirée.',
    href: '/services/airbnb-cleaning',
    icon: Clock,
  },
]

const differentiators = [
  { icon: Shield, title: 'Assurés & Certifiés', desc: 'Responsabilité civile professionnelle. Vos biens sont protégés.' },
  { icon: Leaf, title: 'Produits Écologiques', desc: 'Certifiés éco-label, efficaces et sans danger pour votre famille.' },
  { icon: Clock, title: '7j/7 & Horaires Flexibles', desc: 'Créneaux tôt le matin, en soirée et le week-end.' },
  { icon: Star, title: 'Satisfaction Garantie', desc: 'Intervention gratuite si le résultat ne vous satisfait pas.' },
]

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-white/10 rounded-sm overflow-hidden">
      <button
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-white/5 transition-colors"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        <span className="font-playfair text-base font-semibold text-white pr-4">{q}</span>
        <ChevronDown
          size={16}
          className={`text-orange-accent shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="px-6 pb-5">
          <p className="font-inter text-sm text-champagne/60 leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  )
}

export default function CityPage() {
  const { citySlug } = useParams()
  const navigate = useNavigate()
  const city = getCityBySlug(citySlug)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [citySlug])

  const schema = city ? {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Teraby',
    description: city.seoDescription,
    telephone: '+33685958798',
    url: `https://teraby.fr/nettoyage/${city.slug}`,
    areaServed: {
      '@type': 'City',
      name: city.displayName,
      postalCode: city.zipCode,
    },
    serviceType: ['Nettoyage résidentiel', 'Nettoyage commercial', 'Nettoyage Airbnb'],
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      addressLocality: city.displayName,
      postalCode: city.zipCode,
      addressCountry: 'FR',
    },
  } : undefined

  useSEO(city ? {
    title: city.seoTitle,
    description: city.seoDescription,
    schema,
  } : {})

  if (!city) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-center px-4">
        <p className="font-playfair text-3xl text-white">Ville introuvable</p>
        <p className="font-inter text-champagne/50">Cette page n'existe pas ou a été déplacée.</p>
        <Link to="/" className="btn-primary px-8 py-3 inline-flex items-center gap-2">
          Retour à l'accueil <ArrowRight size={15} />
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen">

      {/* ── Hero ── */}
      <section className="relative min-h-[52vh] flex items-end overflow-hidden bg-navy-deeper">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&fit=crop&q=60&auto=format)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deeper via-navy/70 to-navy/30" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/40 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-36">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.05}>
            <p className="section-label mb-4 flex items-center gap-1.5">
              <MapPin size={12} />
              {city.neighborhood}
            </p>
          </motion.div>
          <motion.h1
            variants={fadeUp} initial="hidden" animate="visible" custom={0.15}
            className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4"
          >
            {city.h1}
          </motion.h1>
          <motion.p
            variants={fadeUp} initial="hidden" animate="visible" custom={0.28}
            className="font-playfair text-lg md:text-xl text-white/65 italic max-w-xl mb-8"
          >
            {city.subtitle}
          </motion.p>
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.42} className="flex gap-3 flex-wrap">
            <motion.a
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              href="tel:+33685958798"
              className="btn-primary text-sm px-8 py-3.5 inline-flex items-center gap-2"
            >
              <Phone size={14} /> Demander un Devis Gratuit
            </motion.a>
            <motion.button
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/', { state: { scrollTo: '#booking' } })}
              className="btn-outline text-sm px-8 py-3.5 inline-flex items-center gap-2"
            >
              Réserver en ligne <ArrowRight size={14} />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ── Intro locale ── */}
      <section className="py-20 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <p className="section-label mb-3">Nous intervenons à {city.name}</p>
              <h2 className="section-title text-white mb-5">
                Nettoyage professionnel à{' '}
                <span className="text-gradient">{city.name}</span>
              </h2>
              <p className="font-inter text-champagne/60 text-base leading-relaxed mb-4">
                {city.intro}
              </p>
              <p className="font-inter text-champagne/45 text-sm leading-relaxed">
                {city.context}
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              {differentiators.map((d, i) => (
                <motion.div
                  key={d.title}
                  variants={fadeUp} initial="hidden" whileInView="visible"
                  custom={i * 0.1} viewport={{ once: true }}
                  className="glass-card p-5 rounded-sm"
                >
                  <d.icon size={17} className="text-orange-accent mb-3" />
                  <div className="font-playfair text-sm font-bold text-white mb-1">{d.title}</div>
                  <div className="font-inter text-xs text-champagne/45 leading-relaxed">{d.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="py-20 bg-navy-light/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="section-label mb-3">Nos prestations à {city.name}</p>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white">
              Un service sur mesure,<br />quelle que soit votre situation.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                variants={fadeUp} initial="hidden" whileInView="visible"
                custom={i * 0.12} viewport={{ once: true }}
              >
                <Link
                  to={s.href}
                  className="glass-card block p-7 rounded-sm group hover:border-orange-accent/30 transition-colors"
                >
                  <s.icon size={20} className="text-orange-accent mb-4" />
                  <h3 className="font-playfair text-lg font-bold text-white mb-2 group-hover:text-orange-accent transition-colors">
                    {s.title}
                  </h3>
                  <p className="font-inter text-sm text-champagne/50 leading-relaxed mb-4">{s.desc}</p>
                  <span className="font-inter text-xs text-orange-accent/70 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    En savoir plus <ArrowRight size={11} />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 bg-navy-deeper">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-center mb-10"
          >
            <p className="section-label mb-3">FAQ — {city.name}</p>
            <h2 className="font-playfair text-3xl font-bold text-white">
              Questions fréquentes
            </h2>
          </motion.div>

          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible"
            custom={0.1} viewport={{ once: true }}
            className="space-y-3"
          >
            {city.faq.map((item) => (
              <FAQItem key={item.q} q={item.q} a={item.a} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-navy text-center">
        <div className="max-w-2xl mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-4">
              Besoin d'un nettoyage à {city.name} ?
            </h2>
            <p className="font-inter text-champagne/50 mb-8">
              Devis gratuit sous 24h · Intervention possible dès demain.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <motion.a
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                href="tel:+33685958798"
                className="btn-primary text-sm px-10 py-4 inline-flex items-center gap-2"
              >
                <Phone size={14} /> Appeler maintenant
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/', { state: { scrollTo: '#booking' } })}
                className="btn-outline text-sm px-10 py-4 inline-flex items-center gap-2"
              >
                Réserver en ligne <ArrowRight size={14} />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Autres villes ── */}
      <section className="py-14 bg-navy-deeper/60 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-inter text-xs text-champagne/30 uppercase tracking-widest mb-5 text-center">
            Autres zones d'intervention
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {cities
              .filter(c => c.slug !== city.slug)
              .slice(0, 20)
              .map(c => (
                <Link
                  key={c.slug}
                  to={`/nettoyage/${c.slug}`}
                  className="font-inter text-xs text-champagne/40 hover:text-orange-accent border border-white/10 hover:border-orange-accent/30 px-3 py-1.5 rounded-sm transition-colors"
                >
                  {c.name}
                </Link>
              ))}
          </div>
        </div>
      </section>

    </div>
  )
}
