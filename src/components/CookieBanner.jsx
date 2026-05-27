import { AnimatePresence, motion } from 'framer-motion'
import { useCookieConsent } from '../context/CookieConsentContext'
import Shield from 'lucide-react/dist/esm/icons/shield'

export default function CookieBanner() {
  const { showBanner, acceptAll, rejectAll, openModal } = useCookieConsent()

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          id="cookie-banner"
          role="dialog"
          aria-modal="false"
          aria-label="Gestion des cookies"
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 28, duration: 0.45 }}
          className="fixed bottom-0 left-0 right-0 z-[9999]"
        >
          {/* Top accent line */}
          <div className="h-px bg-gradient-to-r from-transparent via-orange-accent/60 to-transparent" />

          <div
            className="relative overflow-hidden"
            style={{
              background: 'rgba(13, 21, 37, 0.97)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              boxShadow: '0 -8px 40px rgba(0,0,0,0.5), 0 -1px 0 rgba(255,255,255,0.04)',
            }}
          >
            {/* Subtle ambient glow */}
            <div className="pointer-events-none absolute bottom-0 right-1/4 w-[400px] h-[200px] bg-orange-accent/5 blur-[60px] rounded-full" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">

                {/* Icon + Text */}
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="w-9 h-9 rounded-sm border border-orange-accent/30 bg-orange-accent/10
                                    flex items-center justify-center">
                      <Shield size={16} className="text-orange-accent" />
                    </div>
                  </div>
                  <div className="min-w-0">
                    <p className="font-inter text-sm font-semibold text-white mb-1 tracking-wide">
                      Vos préférences de confidentialité
                    </p>
                    <p className="font-inter text-xs text-champagne/50 leading-relaxed">
                      Nous utilisons des cookies pour améliorer votre expérience et analyser notre trafic.
                      Aucun cookie non-essentiel ne sera déposé sans votre consentement.{' '}
                      <button
                        onClick={openModal}
                        className="text-orange-accent/80 hover:text-orange-accent underline underline-offset-2 transition-colors"
                      >
                        En savoir plus
                      </button>
                    </p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-2.5 flex-shrink-0 flex-wrap sm:flex-nowrap">
                  <button
                    onClick={openModal}
                    aria-label="Gérer les préférences de cookies"
                    className="font-inter text-xs font-medium text-champagne/50 hover:text-champagne/80
                               px-4 py-2.5 rounded-sm border border-white/10 hover:border-white/20
                               bg-white/3 hover:bg-white/6 transition-all duration-200 whitespace-nowrap"
                  >
                    Préférences
                  </button>
                  <button
                    onClick={rejectAll}
                    aria-label="Refuser tous les cookies non-essentiels"
                    className="font-inter text-xs font-medium text-champagne/70 hover:text-champagne
                               px-4 py-2.5 rounded-sm border border-white/15 hover:border-white/30
                               bg-white/4 hover:bg-white/8 transition-all duration-200 whitespace-nowrap"
                  >
                    Refuser
                  </button>
                  <button
                    onClick={acceptAll}
                    aria-label="Accepter tous les cookies"
                    className="font-inter text-xs font-semibold text-white
                               px-5 py-2.5 rounded-sm bg-orange-accent hover:bg-orange-hover
                               transition-all duration-200 hover:shadow-[0_0_20px_rgba(204,85,0,0.3)]
                               hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
                  >
                    Accepter tout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
