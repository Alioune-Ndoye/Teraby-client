import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ArrowLeft from 'lucide-react/dist/esm/icons/arrow-left'

export default function LegalPage({ title, label, lastUpdated, children }) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-navy pt-32 pb-24"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-inter text-sm text-champagne/40
                     hover:text-orange-accent transition-colors duration-200 mb-10 group"
        >
          <ArrowLeft size={14} className="transition-transform duration-200 group-hover:-translate-x-1" />
          Retour à l'accueil
        </Link>

        {/* Header */}
        <div className="mb-10">
          <p className="section-label">{label}</p>
          <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-white mb-4">{title}</h1>
          {lastUpdated && (
            <p className="font-inter text-sm text-champagne/35">
              Dernière mise à jour : {lastUpdated}
            </p>
          )}
          <div className="w-12 h-0.5 bg-orange-accent mt-6" />
        </div>

        {/* Content */}
        <div className="prose-legal space-y-8">
          {children}
        </div>
      </div>
    </motion.main>
  )
}

export function Section({ title, children }) {
  return (
    <section>
      <h2 className="font-playfair text-2xl font-bold text-white mb-4">{title}</h2>
      <div className="font-inter text-sm text-champagne/60 leading-relaxed space-y-3">
        {children}
      </div>
    </section>
  )
}
