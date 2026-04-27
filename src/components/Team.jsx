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
      className="group relative overflow-hidden rounded-sm"
    >
      <div className="relative overflow-hidden aspect-[4/5]">
        <img
          src={member.image || FALLBACK_IMG}
          alt={member.name}
          width="400"
          height="500"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700"
          onError={(e) => { e.currentTarget.src = FALLBACK_IMG }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deeper/95 via-navy/40 to-transparent" />
        <div className="absolute inset-0 bg-orange-accent/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <p className="section-label text-left mb-1">{member.role}</p>
          <h3 className="font-playfair text-2xl font-bold text-white mb-2">{member.name}</h3>

          <div className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
            {member.bio && (
              <p className="font-inter text-sm text-champagne/65 leading-relaxed mb-4">
                {member.bio}
              </p>
            )}
            {member.specialties?.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
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
            <div className="flex gap-2">
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
        </div>
      </div>

      <div className="absolute inset-0 rounded-sm border border-orange-accent/0 group-hover:border-orange-accent/25 transition-all duration-500 pointer-events-none" />
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
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-accent/4 blur-[180px] rounded-full pointer-events-none" />

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
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
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
