import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'teraby-cookie-consent'

const defaultPreferences = {
  essential: true,
  analytics: false,
  marketing: false,
}

const CookieConsentContext = createContext(null)

export function CookieConsentProvider({ children }) {
  const [hasConsented, setHasConsented] = useState(false)
  const [showBanner, setShowBanner] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [preferences, setPreferences] = useState(defaultPreferences)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        setPreferences({ ...defaultPreferences, ...parsed.preferences })
        setHasConsented(true)
        setShowBanner(false)
      } else {
        // Small delay so banner doesn't flash before page loads
        const t = setTimeout(() => setShowBanner(true), 1200)
        return () => clearTimeout(t)
      }
    } catch {
      setShowBanner(true)
    }
  }, [])

  const persist = useCallback((prefs) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      preferences: prefs,
      consentDate: new Date().toISOString(),
    }))
  }, [])

  const acceptAll = useCallback(() => {
    const prefs = { essential: true, analytics: true, marketing: true }
    setPreferences(prefs)
    setHasConsented(true)
    setShowBanner(false)
    setShowModal(false)
    persist(prefs)
  }, [persist])

  const rejectAll = useCallback(() => {
    const prefs = { essential: true, analytics: false, marketing: false }
    setPreferences(prefs)
    setHasConsented(true)
    setShowBanner(false)
    setShowModal(false)
    persist(prefs)
  }, [persist])

  const savePreferences = useCallback((prefs) => {
    const merged = { ...defaultPreferences, ...prefs, essential: true }
    setPreferences(merged)
    setHasConsented(true)
    setShowBanner(false)
    setShowModal(false)
    persist(merged)
  }, [persist])

  const openModal = useCallback(() => setShowModal(true), [])
  const closeModal = useCallback(() => setShowModal(false), [])

  // Re-opens settings from footer/legal links
  const reopenSettings = useCallback(() => {
    setShowModal(true)
  }, [])

  return (
    <CookieConsentContext.Provider value={{
      hasConsented,
      showBanner,
      showModal,
      preferences,
      acceptAll,
      rejectAll,
      savePreferences,
      openModal,
      closeModal,
      reopenSettings,
    }}>
      {children}
    </CookieConsentContext.Provider>
  )
}

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext)
  if (!ctx) throw new Error('useCookieConsent must be used inside CookieConsentProvider')
  return ctx
}
