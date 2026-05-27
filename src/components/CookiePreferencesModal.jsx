import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useCookieConsent } from '../context/CookieConsentContext'
import X from 'lucide-react/dist/esm/icons/x'
import Shield from 'lucide-react/dist/esm/icons/shield'
import BarChart2 from 'lucide-react/dist/esm/icons/bar-chart-2'
import Target from 'lucide-react/dist/esm/icons/target'
import Check from 'lucide-react/dist/esm/icons/check'

function Toggle({ checked, onChange, disabled }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={`
        relative inline-flex h-6 w-11 flex-shrink-0 rounded-full border-2
        transition-all duration-200 ease-in-out focus:outline-none focus-visible:ring-2
        focus-visible:ring-orange-accent focus-visible:ring-offset-2 focus-visible:ring-offset-navy-deeper
        ${disabled
          ? 'cursor-not-allowed border-white/10 bg-white/10'
          : checked
            ? 'cursor-pointer border-transparent bg-orange-accent'
            : 'cursor-pointer border-white/20 bg-white/8'
        }
      `}
    >
      <span
        className={`
          pointer-events-none inline-block h-5 w-5 transform rounded-full shadow-lg
          transition-transform duration-200 ease-in-out
          ${checked ? 'translate-x-5 bg-white' : 'translate-x-0 bg-white/50'}
        `}
      />
    </button>
  )
}

const categories = [
  {
    key: 'essential',
    icon: Shield,
    label: 'Cookies essentiels',
    badge: 'Toujours actifs',
    description:
      'Nécessaires au fonctionnement du site. Ils permettent la navigation, la sécurité et l\'accès aux fonctionnalités de base. Ils ne peuvent pas être désactivés.',
    examples: 'Session, sécurité, préférences de langue',
    alwaysOn: true,
  },
  {
    key: 'analytics',
    icon: BarChart2,
    label: 'Cookies analytiques',
    badge: null,
    description:
      'Nous aident à comprendre comment vous utilisez le site — quelles pages vous visitez et comment vous naviguez. Ces données sont anonymisées.',
    examples: 'Google Analytics, mesure d\'audience',
    alwaysOn: false,
  },
  {
    key: 'marketing',
    icon: Target,
    label: 'Cookies marketing',
    badge: null,
    description:
      'Utilisés pour vous proposer des publicités personnalisées sur d\'autres sites. Ils peuvent également être utilisés pour mesurer l\'efficacité de nos campagnes.',
    examples: 'Meta Pixel, publicités ciblées',
    alwaysOn: false,
  },
]

export default function CookiePreferencesModal() {
  const { showModal, closeModal, preferences, savePreferences, acceptAll, rejectAll } =
    useCookieConsent()

  const [local, setLocal] = useState({
    essential: true,
    analytics: false,
    marketing: false,
  })

  useEffect(() => {
    if (showModal) {
      setLocal({ ...preferences })
    }
  }, [showModal, preferences])

  const toggle = (key) => {
    setLocal((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <AnimatePresence>
      {showModal && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[10000] bg-black/70"
            style={{ backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)' }}
            onClick={closeModal}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-modal-title"
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-[10001] flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="pointer-events-auto w-full max-w-lg max-h-[90vh] flex flex-col rounded-sm overflow-hidden"
              style={{
                background: 'rgba(13, 21, 37, 0.98)',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 24px 80px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.05) inset',
              }}
            >
              {/* Top accent */}
              <div className="h-px flex-shrink-0 bg-gradient-to-r from-transparent via-orange-accent/50 to-transparent" />

              {/* Header */}
              <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-5 flex-shrink-0
                              border-b border-white/6">
                <div>
                  <p className="font-inter text-xs text-orange-accent font-semibold tracking-[0.2em] uppercase mb-1">
                    Confidentialité
                  </p>
                  <h2
                    id="cookie-modal-title"
                    className="font-playfair text-xl font-bold text-white"
                  >
                    Préférences de cookies
                  </h2>
                  <p className="font-inter text-xs text-champagne/45 mt-1.5 leading-relaxed">
                    Choisissez les cookies que vous autorisez. Les cookies essentiels sont toujours actifs.
                  </p>
                </div>
                <button
                  onClick={closeModal}
                  aria-label="Fermer"
                  className="flex-shrink-0 w-8 h-8 rounded-sm border border-white/10 flex items-center justify-center
                             text-champagne/40 hover:text-champagne hover:border-white/20 hover:bg-white/5
                             transition-all duration-200 mt-0.5"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Categories */}
              <div className="overflow-y-auto flex-1 px-6 py-4 space-y-3">
                {categories.map(({ key, icon: Icon, label, badge, description, examples, alwaysOn }) => (
                  <div
                    key={key}
                    className="rounded-sm border border-white/6 bg-white/2 p-4 transition-colors duration-200
                               hover:border-white/10 hover:bg-white/3"
                  >
                    <div className="flex items-center justify-between gap-3 mb-2.5">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-sm border border-orange-accent/25 bg-orange-accent/8
                                        flex items-center justify-center flex-shrink-0">
                          <Icon size={13} className="text-orange-accent" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-inter text-sm font-semibold text-white">{label}</span>
                            {badge && (
                              <span className="inline-flex items-center gap-1 font-inter text-[10px] font-medium
                                               text-orange-accent bg-orange-accent/10 border border-orange-accent/20
                                               px-1.5 py-0.5 rounded-sm tracking-wide">
                                <Check size={8} strokeWidth={3} />
                                {badge}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <Toggle
                        checked={alwaysOn ? true : local[key]}
                        onChange={() => toggle(key)}
                        disabled={alwaysOn}
                      />
                    </div>
                    <p className="font-inter text-xs text-champagne/45 leading-relaxed mb-1.5">
                      {description}
                    </p>
                    <p className="font-inter text-[10px] text-champagne/25 italic">
                      Ex : {examples}
                    </p>
                  </div>
                ))}
              </div>

              {/* Footer actions */}
              <div className="flex-shrink-0 border-t border-white/6 px-6 py-5">
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <button
                    onClick={rejectAll}
                    className="flex-1 font-inter text-xs font-medium text-champagne/60 hover:text-champagne
                               py-3 px-4 rounded-sm border border-white/12 hover:border-white/25
                               bg-white/3 hover:bg-white/6 transition-all duration-200"
                  >
                    Tout refuser
                  </button>
                  <button
                    onClick={() => savePreferences(local)}
                    className="flex-1 font-inter text-xs font-semibold text-white
                               py-3 px-4 rounded-sm border border-orange-accent/50
                               bg-orange-accent/15 hover:bg-orange-accent/25 hover:border-orange-accent/70
                               transition-all duration-200"
                  >
                    Enregistrer mes choix
                  </button>
                  <button
                    onClick={acceptAll}
                    className="flex-1 font-inter text-xs font-semibold text-white
                               py-3 px-4 rounded-sm bg-orange-accent hover:bg-orange-hover
                               transition-all duration-200 hover:shadow-[0_0_20px_rgba(204,85,0,0.3)]"
                  >
                    Tout accepter
                  </button>
                </div>
                <p className="font-inter text-[10px] text-champagne/25 text-center mt-3 leading-relaxed">
                  Vous pouvez modifier vos préférences à tout moment depuis les mentions légales.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
