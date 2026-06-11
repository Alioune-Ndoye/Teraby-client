import { useEffect } from 'react'

const DEFAULT_TITLE = 'Teraby — Nettoyage Luxe, Réinventé'
const DEFAULT_DESC  = "Services de nettoyage résidentiel et commercial haut de gamme. Là où la précision rencontre la perfection. Réservez votre expérience Teraby dès aujourd'hui."
const BASE_URL      = 'https://teraby.fr'

function setMeta(selector, attr, value) {
  document.querySelector(selector)?.setAttribute(attr, value)
}

function ensureMeta(name, content) {
  let el = document.querySelector(`meta[name="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('name', name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
  return el
}

function ensureLink(rel, href) {
  let el = document.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
  return el
}

export default function useSEO({ title, description, schema, canonical, geoRegion, geoPlacename } = {}) {
  useEffect(() => {
    if (title) {
      document.title = title
      setMeta('meta[property="og:title"]', 'content', title)
    }
    if (description) {
      setMeta('meta[name="description"]', 'content', description)
      setMeta('meta[property="og:description"]', 'content', description)
    }

    // Canonical — prevents duplicate-content penalty
    const canonicalEl = canonical ? ensureLink('canonical', `${BASE_URL}${canonical}`) : null
    setMeta('meta[property="og:url"]', 'content', canonical ? `${BASE_URL}${canonical}` : BASE_URL)

    // Geo meta tags — pins geographic targeting for local search
    const geoRegionEl    = geoRegion    ? ensureMeta('geo.region',    geoRegion)    : null
    const geoPlacenameEl = geoPlacename ? ensureMeta('geo.placename', geoPlacename) : null
    const geoPositionEl  = geoRegion    ? ensureMeta('geo.position',  '')           : null

    // JSON-LD schema — accepts a single object or an array of objects
    let schemaTag = null
    if (schema) {
      schemaTag = document.createElement('script')
      schemaTag.type = 'application/ld+json'
      schemaTag.id = 'page-schema'
      schemaTag.textContent = JSON.stringify(Array.isArray(schema) ? schema : schema)
      document.head.appendChild(schemaTag)
    }

    return () => {
      document.title = DEFAULT_TITLE
      setMeta('meta[name="description"]',          'content', DEFAULT_DESC)
      setMeta('meta[property="og:title"]',         'content', DEFAULT_TITLE)
      setMeta('meta[property="og:description"]',   'content', DEFAULT_DESC)
      setMeta('meta[property="og:url"]',           'content', BASE_URL)
      canonicalEl?.remove()
      geoRegionEl?.remove()
      geoPlacenameEl?.remove()
      geoPositionEl?.remove()
      schemaTag?.remove()
    }
  }, [title, description, schema, canonical, geoRegion, geoPlacename])
}
