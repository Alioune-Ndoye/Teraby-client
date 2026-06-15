import { useEffect, useRef, useState } from 'react'

const PDF_URL =
  'https://filesunipros.blob.core.windows.net/public/Unipros_Depliant_avance_immediate_HD.pdf'

export default function PromoPopup() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const overlayRef = useRef(null)
  const firstFocusRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 6000)
    return () => clearTimeout(timer)
  }, [])

  // Touche Échap ferme la popup
  useEffect(() => {
    if (!visible) return
    const handleKey = (e) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [visible])

  // Piège le focus dans la modale
  useEffect(() => {
    if (visible) firstFocusRef.current?.focus()
  }, [visible])

  function close() {
    setVisible(false)
    setDismissed(true)
  }

  function handleOverlayClick(e) {
    if (e.target === overlayRef.current) close()
  }

  function handleClaim() {
    window.open(PDF_URL, '_blank', 'noopener,noreferrer')
    close()
  }

  // Removed from DOM only after user dismisses — keeps iframe preloading during 6s countdown
  if (dismissed) return null

  return (
    <div
      ref={overlayRef}
      onClick={visible ? handleOverlayClick : undefined}
      role={visible ? 'dialog' : undefined}
      aria-modal={visible ? 'true' : undefined}
      aria-labelledby={visible ? 'promo-title' : undefined}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.72)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '16px',
        // opacity+pointer-events hides overlay while keeping iframe loading in background
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        animation: visible ? 'promo-fadein 0.4s ease both' : 'none',
      }}
    >
      {/* Document card */}
      <div
        style={{
          position: 'relative',
          background: '#fff',
          borderRadius: '6px',
          border: '2px solid #1e2d4e',
          boxShadow: '0 8px 40px rgba(0,0,0,0.38), 0 2px 8px rgba(0,0,0,0.18)',
          maxWidth: '680px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          fontFamily: "'Georgia', serif",
          color: '#1a1a2e',
        }}
      >
        {/* Header stripe */}
        <div
          style={{
            background: 'linear-gradient(90deg, #1e2d4e 0%, #2c4270 100%)',
            padding: '12px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Approval badge */}
            <span
              style={{
                background: '#CC5500',
                color: '#1a1a2e',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                padding: '3px 9px',
                borderRadius: '3px',
                textTransform: 'uppercase',
                fontFamily: "'Arial', sans-serif",
              }}
            >
              APPROUVÉ 50% DE RÉDUCTION
            </span>
          </div>
          {/* Close X */}
          <button
            ref={firstFocusRef}
            onClick={close}
            aria-label="Fermer"
            style={{
              background: 'none',
              border: 'none',
              color: '#e0d6c8',
              fontSize: '22px',
              lineHeight: 1,
              cursor: 'pointer',
              padding: '0 2px',
              fontFamily: 'sans-serif',
            }}
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '24px 28px 20px' }}>
          {/* Watermark stamp effect */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '54px',
              right: '28px',
              width: '90px',
              height: '90px',
              border: '4px solid rgba(204,85,0,0.25)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: 'rotate(-18deg)',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          >
            <span
              style={{
                color: 'rgba(204,85,0,0.25)',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textAlign: 'center',
                fontFamily: "'Arial', sans-serif",
                textTransform: 'uppercase',
                lineHeight: 1.3,
              }}
            >
              OFFRE<br />OFFICIELLE
            </span>
          </div>

          {/* Title block */}
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', marginBottom: '18px' }}>
            <div
              style={{
                fontSize: '11px',
                letterSpacing: '0.18em',
                color: '#7a7a8c',
                textTransform: 'uppercase',
                fontFamily: "'Arial', sans-serif",
                marginBottom: '6px',
              }}
            >
              Document N° 2025-PROMO-001
            </div>
            <h2
              id="promo-title"
              style={{
                fontSize: 'clamp(18px, 4vw, 26px)',
                fontWeight: 700,
                letterSpacing: '0.02em',
                margin: '0 0 8px',
                color: '#1e2d4e',
              }}
            >
              Offre Exclusive à Durée Limitée
            </h2>
            <p
              style={{
                fontSize: 'clamp(13px, 2.5vw, 15px)',
                color: '#444',
                margin: 0,
                fontStyle: 'italic',
                fontFamily: "'Georgia', serif",
              }}
            >
              Vous avez été sélectionné(e) pour bénéficier d'une{' '}
              <strong style={{ color: '#1e2d4e' }}>réduction exclusive de 50%</strong>
            </p>
            <div
              style={{
                width: '60px',
                height: '2px',
                background: 'linear-gradient(90deg, #1e2d4e, #CC5500)',
                margin: '14px auto 0',
                borderRadius: '2px',
              }}
            />
          </div>

          {/* PDF iframe */}
          <div
            style={{
              border: '1px solid #ccd0d9',
              borderRadius: '4px',
              overflow: 'hidden',
              background: '#f0f0f0',
              position: 'relative',
            }}
          >
            {!iframeLoaded && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#888',
                  fontFamily: 'sans-serif',
                  fontSize: '13px',
                }}
              >
                Chargement du document…
              </div>
            )}
            <iframe
              src={PDF_URL}
              title="Offre Exclusive à Durée Limitée — PDF"
              width="100%"
              style={{
                height: 'clamp(260px, 55vw, 400px)',
                border: 'none',
                display: 'block',
              }}
              onLoad={() => setIframeLoaded(true)}
            />
          </div>

          {/* CTA row */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              marginTop: '20px',
              alignItems: 'center',
            }}
          >
            <button
              onClick={handleClaim}
              style={{
                width: '100%',
                maxWidth: '320px',
                padding: '13px 20px',
                background: 'linear-gradient(90deg, #1e2d4e 0%, #2c4270 100%)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '4px',
                fontSize: '15px',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                fontFamily: "'Arial', sans-serif",
                boxShadow: '0 3px 10px rgba(30,45,78,0.35)',
                transition: 'opacity 0.15s',
              }}
              onMouseOver={(e) => (e.currentTarget.style.opacity = '0.88')}
              onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
            >
              Profiter de ma réduction
            </button>
            <button
              onClick={close}
              style={{
                background: 'none',
                border: 'none',
                color: '#888',
                fontSize: '13px',
                cursor: 'pointer',
                textDecoration: 'underline',
                fontFamily: "'Arial', sans-serif",
                padding: '2px 6px',
              }}
            >
              Peut-être plus tard
            </button>
          </div>
        </div>

        {/* Footer stripe */}
        <div
          style={{
            borderTop: '1px solid #dde0e8',
            padding: '8px 28px',
            textAlign: 'center',
            fontSize: '10px',
            color: '#aaa',
            fontFamily: "'Arial', sans-serif",
            letterSpacing: '0.05em',
          }}
        >
          Cette offre est valable pour les nouveaux clients uniquement · Disponibilité limitée
        </div>
      </div>

      {/* Fade-in keyframe injected once */}
      <style>{`
        @keyframes promo-fadein {
          from { opacity: 0; transform: scale(0.96); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  )
}
