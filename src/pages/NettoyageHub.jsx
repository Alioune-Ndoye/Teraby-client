import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import MapPin from 'lucide-react/dist/esm/icons/map-pin'
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right'
import Phone from 'lucide-react/dist/esm/icons/phone'
import { cities } from '../data/citiesData'
import useSEO from '../hooks/useSEO'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: d, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

// ── Logical groups ──────────────────────────────────────────────────────────
const parisIntramuros = cities.filter(c => c.zipCode.startsWith('75'))
const hautsDeSeine    = cities.filter(c => c.zipCode.startsWith('92'))
const seineSaintDenis = cities.filter(c => c.zipCode.startsWith('93'))

const groups = [
  {
    id: 'paris',
    label: 'Paris intramuros',
    sublabel: 'Les 20 arrondissements',
    department: '75',
    cities: parisIntramuros,
    description: 'Nous couvrons la totalité de Paris, du 1er au 20ème arrondissement. Intervention sous 24–48h dans chaque arrondissement.',
  },
  {
    id: 'hauts-de-seine',
    label: 'Hauts-de-Seine',
    sublabel: 'Département 92',
    department: '92',
    cities: hautsDeSeine,
    description: 'De Neuilly-sur-Seine à Boulogne-Billancourt, nous intervenons dans toutes les communes des Hauts-de-Seine.',
  },
  {
    id: 'seine-saint-denis',
    label: 'Seine-Saint-Denis',
    sublabel: 'Département 93',
    department: '93',
    cities: seineSaintDenis,
    description: 'Saint-Denis, Montreuil, Saint-Ouen et leurs voisines : notre zone d\'intervention couvre l\'ensemble du 93 proche de Paris.',
  },
]

const schema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Teraby',
  description: 'Service de nettoyage professionnel couvrant Paris et toute l\'Île-de-France. 35 zones d\'intervention.',
  telephone: '+33685958798',
  url: 'https://teraby.fr/nettoyage',
  areaServed: cities.map(c => ({
    '@type': 'City',
    name: c.displayName,
    postalCode: c.zipCode,
  })),
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    reviewCount: '8',
    bestRating: '5',
  },
}

function CityCard({ city, index }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      custom={index * 0.04}
      viewport={{ once: true }}
    >
      <Link
        to={`/nettoyage/${city.slug}`}
        className="group flex flex-col gap-2 glass-card p-5 rounded-sm
                   hover:border-orange-accent/40 hover:bg-white/[0.04] transition-all duration-200"
      >
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="font-playfair text-base font-bold text-white group-hover:text-orange-accent transition-colors leading-tight">
              {city.name}
            </p>
            <p className="font-inter text-xs text-champagne/35 mt-0.5">{city.zipCode}</p>
          </div>
          <ArrowRight
            size={14}
            className="text-orange-accent/40 group-hover:text-orange-accent group-hover:translate-x-0.5
                       transition-all duration-200 shrink-0 mt-1"
          />
        </div>
        <p className="font-inter text-xs text-champagne/40 leading-relaxed line-clamp-2">
          {city.neighborhood}
        </p>
      </Link>
    </motion.div>
  )
}

export default function NettoyageHub() {
  const navigate = useNavigate()

  useEffect(() => { window.scrollTo(0, 0) }, [])

  useSEO({
    title: 'Nettoyage Paris & Île-de-France | Toutes nos zones — Teraby',
    description: 'Teraby intervient dans les 20 arrondissements de Paris, les Hauts-de-Seine (92) et la Seine-Saint-Denis (93). 35 zones couvertes. Devis gratuit sous 24h.',
    canonical: '/nettoyage',
    geoRegion: 'FR-75',
    geoPlacename: 'Paris, Île-de-France',
    schema,
  })

  return (
    <div className="min-h-screen">

      {/* ── Hero ── */}
      <section className="relative min-h-[48vh] flex items-end overflow-hidden bg-navy-deeper">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1400&fit=crop&q=60&auto=format)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deeper via-navy/80 to-navy/40" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/40 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 pt-36">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.05}>
            <p className="section-label mb-4 flex items-center gap-1.5">
              <MapPin size={12} /> Paris &amp; Île-de-France
            </p>
          </motion.div>
          <motion.h1
            variants={fadeUp} initial="hidden" animate="visible" custom={0.15}
            className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4"
          >
            Nos zones d'intervention
          </motion.h1>
          <motion.p
            variants={fadeUp} initial="hidden" animate="visible" custom={0.28}
            className="font-inter text-lg text-white/55 max-w-xl mb-8"
          >
            35 villes couvertes — Paris intramuros, Hauts-de-Seine et Seine-Saint-Denis.
            Intervention sous 24–48h, 7j/7.
          </motion.p>
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.4} className="flex gap-3 flex-wrap">
            <motion.a
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              href="tel:+33685958798"
              className="btn-primary text-sm px-8 py-3.5 inline-flex items-center gap-2"
            >
              <Phone size={14} /> Devis gratuit
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

      {/* ── Stats bar ── */}
      <div className="bg-navy border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-wrap gap-x-10 gap-y-3 justify-center sm:justify-start">
            {[
              { value: '35', label: 'villes couvertes' },
              { value: '20', label: 'arrondissements Paris' },
              { value: '24h', label: 'délai d\'intervention' },
              { value: '7j/7', label: 'disponibilité' },
            ].map(s => (
              <div key={s.label} className="flex items-baseline gap-1.5">
                <span className="font-playfair text-xl font-bold text-orange-accent">{s.value}</span>
                <span className="font-inter text-xs text-champagne/40">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── City groups ── */}
      <div className="bg-navy">
        {groups.map((group, gi) => (
          <section
            key={group.id}
            id={group.id}
            className={`py-20 ${gi % 2 === 1 ? 'bg-navy-light/10' : ''}`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

              {/* Group header */}
              <motion.div
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10"
              >
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-inter text-xs text-orange-accent/70 border border-orange-accent/30
                                     px-2.5 py-0.5 rounded-sm uppercase tracking-widest">
                      {group.department}
                    </span>
                    <p className="section-label">{group.sublabel}</p>
                  </div>
                  <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white">
                    {group.label}
                  </h2>
                  <p className="font-inter text-sm text-champagne/45 mt-2 max-w-lg leading-relaxed">
                    {group.description}
                  </p>
                </div>
                <p className="font-inter text-xs text-champagne/30 shrink-0">
                  {group.cities.length} zone{group.cities.length > 1 ? 's' : ''}
                </p>
              </motion.div>

              {/* City grid */}
              <div className={`grid gap-3 ${
                group.id === 'paris'
                  ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'
                  : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4'
              }`}>
                {group.cities.map((city, i) => (
                  <CityCard key={city.slug} city={city} index={i} />
                ))}
              </div>

            </div>
          </section>
        ))}
      </div>

      {/* ── Why Teraby in all these zones ── */}
      <section className="py-20 bg-navy-deeper">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <p className="section-label mb-3">Notre engagement</p>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-5">
              Le même niveau d'exigence<br />
              <span className="text-white">dans chaque ville</span>
            </h2>
            <p className="font-inter text-champagne/50 text-base leading-relaxed mb-10 max-w-2xl mx-auto">
              Que vous soyez à Neuilly-sur-Seine, dans le 7ème arrondissement ou à Montreuil,
              nos équipes appliquent les mêmes protocoles, les mêmes produits écologiques
              et la même exigence de résultat. Pas de zone de confort, pas de service au rabais en banlieue.
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

      {/* ── Full index list (semantic HTML for crawlers) ── */}
      <section className="py-14 bg-navy border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-inter text-xs text-champagne/25 uppercase tracking-widest mb-6">
            Index complet — toutes nos zones
          </p>
          <nav aria-label="Toutes nos zones d'intervention">
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {cities.map(c => (
                <Link
                  key={c.slug}
                  to={`/nettoyage/${c.slug}`}
                  className="font-inter text-xs text-champagne/35 hover:text-orange-accent transition-colors"
                >
                  Nettoyage {c.name}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </section>

    </div>
  )
}
