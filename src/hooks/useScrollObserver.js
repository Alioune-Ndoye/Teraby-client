import { useEffect } from 'react'

/**
 * Observes a section by ID using IntersectionObserver.
 * Adds `scrolled` to document.body when the section leaves the viewport,
 * removes it when the section re-enters.
 *
 * Used to activate the selected theme AFTER the hero is out of view.
 * The hero itself is always dark via `.hero-dark` class — this hook
 * only drives the `body.scrolled` flag that CSS transitions listen to.
 *
 * @param {string} sectionId — the `id` attribute of the section to observe
 */
export default function useScrollObserver(sectionId) {
  useEffect(() => {
    const el = document.getElementById(sectionId)
    if (!el || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          document.body.classList.remove('scrolled')
        } else {
          document.body.classList.add('scrolled')
        }
      },
      {
        // Negative top margin equal to the navbar height
        // so "scrolled" fires when the hero bottom exits below the nav
        rootMargin: '-72px 0px 0px 0px',
        threshold: 0,
      }
    )

    observer.observe(el)

    return () => {
      observer.disconnect()
      document.body.classList.remove('scrolled')
    }
  }, [sectionId])
}
