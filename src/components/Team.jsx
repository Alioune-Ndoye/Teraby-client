import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Linkedin from 'lucide-react/dist/esm/icons/linkedin'
import Mail from 'lucide-react/dist/esm/icons/mail'
import Award from 'lucide-react/dist/esm/icons/award'
import Plus from 'lucide-react/dist/esm/icons/plus'
import Minus from 'lucide-react/dist/esm/icons/minus'

const API = import.meta.env.VITE_API_URL || ''
const CONTACT_EMAIL = 'contact@teraby.fr'
const FALLBACK_IMG = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop&crop=face'

// Card bg used for the bio panel — must match the fade gradient below
const BIO_CARD_BG = 'rgba(26, 34, 56, 0.05)'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
}

const cardVariants = {
  hidden:  { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] } },
}

const COLLAPSED_HEIGHT = '4.5rem'
const EXPANDED_HEIGHT  = '32rem'

// ── Bio paragraphs (shared markup) ────────────────────────────────────────────
function BioParagraphs({ paragraphs }) {
  return (
    <div className="space-y-3">
      {paragraphs.map((p, i) => (
        <p key={i} className="font-inter text-sm leading-relaxed text-champagne/90">{p}</p>
      ))}
    </div>
  )
}

// ── ExpandableBio ─────────────────────────────────────────────────────────────
// Desktop: always shows full bio, no toggle.
// Mobile:  collapsed by default with +/− toggle.
function ExpandableBio({ bio }) {
  const [expanded, setExpanded] = useState(false)
  const paragraphs = bio.split('\n').filter(Boolean)
  const isLong = bio.length > 160

  return (
    <>
      {/* ── Desktop: full bio, no toggle ──────────────── */}
      <div className="hidden sm:block">
        <BioParagraphs paragraphs={paragraphs} />
      </div>

      {/* ── Mobile: collapsible bio ───────────────────── */}
      <div className="sm:hidden">
        <div
          className="relative overflow-hidden"
          style={{
            maxHeight: expanded ? EXPANDED_HEIGHT : COLLAPSED_HEIGHT,
            transition: 'max-height 0.52s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        >
          <BioParagraphs paragraphs={paragraphs} />

          <AnimatePresence>
            {isLong && !expanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute bottom-0 inset-x-0 h-10 pointer-events-none"
                style={{ background: `linear-gradient(to bottom, transparent, ${BIO_CARD_BG})` }}
              />
            )}
          </AnimatePresence>
        </div>

        {isLong && (
          <motion.button
            onClick={() => setExpanded((v) => !v)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="mt-3 flex items-center gap-2 font-inter text-xs font-semibold
                       px-3 py-1.5 rounded-sm
                       border border-orange-accent/30 bg-orange-accent/8
                       text-orange-accent hover:border-orange-accent/60
                       hover:bg-orange-accent/15 transition-colors duration-200"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={expanded ? 'minus' : 'plus'}
                initial={{ opacity: 0, rotate: -45, scale: 0.6 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 45, scale: 0.6 }}
                transition={{ duration: 0.18 }}
                className="inline-flex"
              >
                {expanded ? <Minus size={11} /> : <Plus size={11} />}
              </motion.span>
            </AnimatePresence>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={expanded ? 'reduire' : 'lireplus'}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 4 }}
                transition={{ duration: 0.18 }}
              >
                {expanded ? 'Réduire' : 'Lire plus'}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        )}
      </div>
    </>
  )
}

// ── TeamCard ──────────────────────────────────────────────────────────────────
function TeamCard({ member }) {
  const hasBio = Boolean(member.bio?.trim())

  return (
    <motion.div
      variants={cardVariants}
      className="group flex flex-col sm:flex-row gap-6"
    >
      {/* ── Photo ───────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-sm flex-shrink-0 w-full sm:w-64 aspect-[4/5]">
        <img
          src={member.image || FALLBACK_IMG}
          alt={member.name}
          width="400"
          height="500"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => { e.currentTarget.src = FALLBACK_IMG }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/25 to-transparent" />
        <div className="absolute inset-0 bg-orange-accent/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute inset-0 rounded-sm border border-orange-accent/0 group-hover:border-orange-accent/25 transition-all duration-500 pointer-events-none" />

        <div className="absolute bottom-0 left-0 right-0 p-5">
          <p
            className="section-label text-left mb-1"
            style={{ textShadow: '0 1px 6px rgba(0,0,0,0.9)' }}
          >
            {member.role}
          </p>
          <h3
            className="font-playfair text-2xl font-bold text-white"
            style={{ textShadow: '0 2px 16px rgba(0,0,0,0.98), 0 1px 4px rgba(0,0,0,0.9)' }}
          >
            {member.name}
          </h3>
        </div>
      </div>

      {/* ── Bio panel ────────────────────────────────────────────── */}
      <div
        className="flex flex-col gap-4 flex-1 min-w-0 rounded-sm border border-black/8 p-5 sm:p-6"
        style={{ backgroundColor: BIO_CARD_BG }}
      >
        {/* Name + role on mobile (already on photo on desktop) */}
        <div className="sm:hidden">
          <p className="section-label text-left mb-0.5">{member.role}</p>
          <h3 className="font-playfair text-xl font-bold text-navy">{member.name}</h3>
        </div>

        {hasBio && <ExpandableBio bio={member.bio} />}

        {member.specialties?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {member.specialties.map((s) => (
              <span
                key={s}
                className="text-xs font-inter px-2.5 py-1 rounded-full bg-orange-accent/15 text-orange-accent border border-orange-accent/25"
              >
                {s}
              </span>
            ))}
          </div>
        )}

        {/* Social icons */}
        <div className="flex gap-2 mt-auto pt-2 border-t border-black/8">
          {member.linkedin ? (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`LinkedIn de ${member.name}`}
              className="w-8 h-8 rounded-sm border border-navy/20 flex items-center justify-center
                         text-navy/70 hover:text-[#0A66C2] hover:border-[#0A66C2]/40
                         hover:bg-[#0A66C2]/10 hover:shadow-[0_0_12px_rgba(10,102,194,0.2)]
                         transition-all duration-200"
            >
              <Linkedin size={14} />
            </a>
          ) : (
            <div
              className="w-8 h-8 rounded-sm border border-navy/10 flex items-center justify-center
                         text-navy/25"
              aria-hidden="true"
            >
              <Linkedin size={14} />
            </div>
          )}

          <a
            href={`mailto:${CONTACT_EMAIL}`}
            aria-label="Contacter Teraby par email"
            className="w-8 h-8 rounded-sm border border-navy/20 flex items-center justify-center
                       text-navy/70 hover:text-orange-accent hover:border-orange-accent/40
                       hover:bg-orange-accent/10 hover:shadow-[0_0_12px_rgba(204,85,0,0.2)]
                       transition-all duration-200"
          >
            <Mail size={14} />
          </a>
        </div>
      </div>
    </motion.div>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function Team() {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    let cancelled = false
    fetch(`${API}/api/team`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then((json) => {
        if (!cancelled) {
          const LINKEDIN_OVERRIDES = {
            'Babacar Siby': 'https://www.linkedin.com/in/babacar-siby/',
          }

          const normalised = (json.data || [])
            .filter((m) => m.active !== false)
            .map((m) => ({
              id:          m._id,
              name:        m.name,
              role:        m.role,
              bio:         m.bio || '',
              image:       m.photo?.url || '',
              specialties: m.specialties || [],
              linkedin:    m.linkedin || LINKEDIN_OVERRIDES[m.name] || '',
            }))
          setMembers(normalised)
          setLoading(false)
        }
      })
      .catch((e) => {
        if (!cancelled) {
          setError(e.message)
          setLoading(false)
        }
      })
    return () => { cancelled = true }
  }, [])

  return (
    <section id="team" className="relative py-28 bg-navy overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div className="hidden sm:block absolute top-0 right-0 w-[350px] h-[350px] bg-orange-accent/4 blur-[80px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="section-label">Les Artisans du Propre</p>
          <h2 className="section-title text-white mb-6">
            Notre <span className="text-gradient">Équipe d'Élite</span>
          </h2>
          <div className="luxury-divider" />
          <p className="section-subtitle mx-auto text-champagne/55">
            Des spécialistes triés sur le volet qui partagent une obsession pour la perfection.
            Chaque membre est contrôlé, formé et entièrement assuré.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="flex items-center gap-3 glass-card px-6 py-3 rounded-full">
            <Award size={16} className="text-orange-accent" />
            <span className="font-inter text-sm text-champagne/70">
              Tous les spécialistes sont certifiés, cautionnés et assurés
            </span>
          </div>
        </motion.div>

        {loading && (
          <div className="text-center py-20 text-champagne/40 font-inter text-sm">
            Chargement de l'équipe...
          </div>
        )}

        {error && !loading && (
          <div className="text-center py-20 text-red-400/70 font-inter text-sm">
            Impossible de charger l'équipe. Veuillez réessayer.
          </div>
        )}

        {!loading && !error && members.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-1 gap-8"
          >
            {members.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </motion.div>
        )}

        {!loading && !error && members.length === 0 && (
          <div className="text-center py-20 text-champagne/30 font-inter text-sm">
            Aucun membre de l'équipe pour le moment.
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-center mt-14"
        >
          <p className="font-inter text-champagne/40 text-sm mb-5">
            Passionné par la précision ? Nous recherchons toujours des talents exceptionnels.
          </p>
          <button className="btn-secondary">
            Rejoindre Notre Équipe →
          </button>
        </motion.div>
      </div>
    </section>
  )
}
