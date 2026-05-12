import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Linkedin from 'lucide-react/dist/esm/icons/linkedin'
import Mail from 'lucide-react/dist/esm/icons/mail'
import Award from 'lucide-react/dist/esm/icons/award'

const API = import.meta.env.VITE_API_URL || ''

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop&crop=face'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
}

const cardVariants = {
  hidden:   { opacity: 0, y: 50 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] } },
}

function TeamCard({ member }) {
  return (
    <motion.div
      variants={cardVariants}
      className="group relative flex overflow-hidden rounded-sm border border-white/5 bg-navy-deeper/90 hover:border-orange-accent/25 transition-colors duration-300"
    >
      {/* Image — fixed width column */}
      <div className="relative w-36 flex-shrink-0 overflow-hidden">
        <img
          src={member.image || FALLBACK_IMG}
          alt={member.name}
          width="144"
          height="192"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => { e.currentTarget.src = FALLBACK_IMG }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-navy-deeper/60" />
        <div className="absolute inset-0 bg-orange-accent/0 group-hover:bg-orange-accent/6 transition-colors duration-500" />
      </div>

      {/* Text — beside the image */}
      <div className="flex flex-col justify-between flex-1 p-5">
        <div>
          <p className="section-label text-left mb-1">{member.role}</p>
          <h3 className="font-playfair text-lg font-bold text-white mb-2 leading-snug">{member.name}</h3>
          {member.bio && (
            <p className="font-inter text-xs text-champagne/60 leading-relaxed mb-3">
              {member.bio}
            </p>
          )}
          {member.specialties?.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {member.specialties.map((s) => (
                <span
                  key={s}
                  className="text-xs font-inter px-2.5 py-1 rounded-full bg-orange-accent/15 text-orange-accent border border-orange-accent/20"
                >
                  {s}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-2 mt-4">
          <button className="w-8 h-8 rounded-sm border border-white/15 flex items-center justify-center
                             text-champagne/50 hover:text-champagne hover:border-white/30 transition-all duration-200">
            <Linkedin size={14} />
          </button>
          <button className="w-8 h-8 rounded-sm border border-white/15 flex items-center justify-center
                             text-champagne/50 hover:text-champagne hover:border-white/30 transition-all duration-200">
            <Mail size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

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
          const normalised = (json.data || [])
            .filter((m) => m.active !== false)
            .map((m) => ({
              id:          m._id,
              name:        m.name,
              role:        m.role,
              bio:         m.bio || '',
              image:       m.photo?.url || '',
              specialties: m.specialties || [],
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
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
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
