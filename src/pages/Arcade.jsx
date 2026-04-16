import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Gamepad2 from 'lucide-react/dist/esm/icons/gamepad-2'
import Zap from 'lucide-react/dist/esm/icons/zap'
import Trophy from 'lucide-react/dist/esm/icons/trophy'
import Star from 'lucide-react/dist/esm/icons/star'

/**
 * Arcade page — always forced dark mode, regardless of the global theme toggle.
 * Adds `force-dark` to <html> on mount and restores the user's saved theme on unmount.
 */
export default function Arcade() {
  useEffect(() => {
    const root = document.documentElement
    const body = document.body

    // Snapshot the current theme so we can restore it on leave
    const wasDark = root.classList.contains('dark')

    // Force dark
    root.classList.add('dark')
    root.classList.remove('light')
    body.classList.add('theme-dark', 'force-dark')
    body.classList.remove('theme-light')

    return () => {
      // Restore previous theme on unmount
      body.classList.remove('force-dark')
      if (wasDark) {
        root.classList.add('dark')
        root.classList.remove('light')
        body.classList.add('theme-dark')
        body.classList.remove('theme-light')
      } else {
        root.classList.remove('dark')
        root.classList.add('light')
        body.classList.add('theme-light')
        body.classList.remove('theme-dark')
      }
    }
  }, [])

  return (
    <section className="min-h-screen bg-navy-deeper flex flex-col items-center justify-center px-6 py-24">
      {/* Glow bg */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-orange-accent/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-2xl w-full text-center space-y-8">
        {/* Icon badge */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 18 }}
          className="inline-flex items-center gap-3 glass-card px-6 py-3 rounded-full mx-auto"
        >
          <Gamepad2 size={18} className="text-orange-accent" />
          <span className="text-champagne/70 font-inter text-sm tracking-widest uppercase">
            Mode Arcade
          </span>
          <Zap size={14} className="text-orange-accent" />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-playfair text-5xl md:text-6xl font-bold text-white leading-tight"
        >
          Teraby
          <span className="block text-orange-accent">Arcade</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.7 }}
          className="font-inter text-champagne/55 text-lg leading-relaxed"
        >
          Espace de jeu interactif — bientôt disponible.
          <br />
          Restez à l'écoute pour une expérience immersive.
        </motion.p>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="grid grid-cols-3 gap-4 pt-4"
        >
          {[
            { icon: Trophy, label: 'Défis',     value: 'Bientôt' },
            { icon: Star,    label: 'Récompenses', value: 'Bientôt' },
            { icon: Zap,     label: 'Niveaux',   value: 'Bientôt' },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="glass-card p-4 rounded-sm text-center">
              <Icon size={20} className="text-orange-accent mx-auto mb-2" />
              <p className="font-inter text-xs text-champagne/40 uppercase tracking-wider">{label}</p>
              <p className="font-playfair text-white font-semibold mt-1">{value}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
