import { useEffect, useRef } from 'react'
import { useCookieConsent } from '../context/CookieConsentContext'

// Loads analytics / marketing scripts only when the user has given consent.
// Each script is injected once and never removed (removing mid-session can break
// in-flight requests). If consent is later revoked the change takes effect on
// the next page load, which is standard GDPR practice.
export default function useConditionalScripts() {
  const { preferences, hasConsented } = useCookieConsent()
  const analyticsLoaded = useRef(false)
  const marketingLoaded = useRef(false)

  useEffect(() => {
    if (!hasConsented) return

    // ── Google Analytics ────────────────────────────────────────────────────
    // Replace GA_MEASUREMENT_ID with your real ID when ready.
    if (preferences.analytics && !analyticsLoaded.current) {
      analyticsLoaded.current = true
      const GA_ID = import.meta.env.VITE_GA_ID
      if (GA_ID) {
        const s = document.createElement('script')
        s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
        s.async = true
        document.head.appendChild(s)

        window.dataLayer = window.dataLayer || []
        function gtag() { window.dataLayer.push(arguments) }
        window.gtag = gtag
        gtag('js', new Date())
        gtag('config', GA_ID, { anonymize_ip: true })
      }
    }

    // ── Meta Pixel ──────────────────────────────────────────────────────────
    // Replace META_PIXEL_ID with your real pixel ID when ready.
    if (preferences.marketing && !marketingLoaded.current) {
      marketingLoaded.current = true
      const PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID
      if (PIXEL_ID && !window.fbq) {
        ;(function (f, b, e, v, n, t, s) {
          if (f.fbq) return
          n = f.fbq = function () {
            n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
          }
          if (!f._fbq) f._fbq = n
          n.push = n
          n.loaded = !0
          n.version = '2.0'
          n.queue = []
          t = b.createElement(e)
          t.async = !0
          t.src = v
          s = b.getElementsByTagName(e)[0]
          s.parentNode.insertBefore(t, s)
        })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')
        window.fbq('init', PIXEL_ID)
        window.fbq('track', 'PageView')
      }
    }
  }, [preferences.analytics, preferences.marketing, hasConsented])
}
