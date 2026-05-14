import { useState, useEffect } from 'react'

const API = import.meta.env.VITE_API_URL || ''

const cache = {}

export default function useServiceBackground(serviceType, fallbackUrl) {
  const [url, setUrl] = useState(fallbackUrl)

  useEffect(() => {
    if (cache[serviceType]) {
      setUrl(cache[serviceType])
      return
    }

    fetch(`${API}/api/service-backgrounds/${serviceType}`)
      .then((r) => {
        if (!r.ok) throw new Error('not found')
        return r.json()
      })
      .then((json) => {
        const imgUrl = json.data?.backgroundImage?.url
        if (imgUrl) {
          cache[serviceType] = imgUrl
          setUrl(imgUrl)
        }
      })
      .catch(() => {
        // silently fall back to the default image
      })
  }, [serviceType])

  return url
}
