import { useEffect } from 'react'

const DEFAULT_TITLE = 'Teraby — Nettoyage Luxe, Réinventé'
const DEFAULT_DESC  = "Services de nettoyage résidentiel et commercial haut de gamme. Là où la précision rencontre la perfection. Réservez votre expérience Teraby dès aujourd'hui."

export default function useSEO({ title, description, schema } = {}) {
  useEffect(() => {
    const prev = {
      title: document.title,
      desc:  document.querySelector('meta[name="description"]')?.getAttribute('content'),
      ogT:   document.querySelector('meta[property="og:title"]')?.getAttribute('content'),
      ogD:   document.querySelector('meta[property="og:description"]')?.getAttribute('content'),
    }

    if (title) {
      document.title = title
      document.querySelector('meta[property="og:title"]')?.setAttribute('content', title)
    }
    if (description) {
      document.querySelector('meta[name="description"]')?.setAttribute('content', description)
      document.querySelector('meta[property="og:description"]')?.setAttribute('content', description)
    }

    let schemaTag = null
    if (schema) {
      schemaTag = document.createElement('script')
      schemaTag.type = 'application/ld+json'
      schemaTag.id = 'page-schema'
      schemaTag.textContent = JSON.stringify(schema)
      document.head.appendChild(schemaTag)
    }

    return () => {
      document.title = DEFAULT_TITLE
      document.querySelector('meta[name="description"]')?.setAttribute('content', DEFAULT_DESC)
      document.querySelector('meta[property="og:title"]')?.setAttribute('content', DEFAULT_TITLE)
      document.querySelector('meta[property="og:description"]')?.setAttribute('content', DEFAULT_DESC)
      schemaTag?.remove()
    }
  }, [title, description, schema])
}
