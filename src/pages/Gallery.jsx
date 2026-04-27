import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import X from 'lucide-react/dist/esm/icons/x'
import ZoomIn from 'lucide-react/dist/esm/icons/zoom-in'
import ChevronLeft from 'lucide-react/dist/esm/icons/chevron-left'
import ChevronRight from 'lucide-react/dist/esm/icons/chevron-right'

const API = import.meta.env.VITE_API_URL || ''

const categories = [
  { value: 'all',         label: 'Tous les Projets' },
  { value: 'residential', label: 'Résidentiel' },
  { value: 'commercial',  label: 'Commercial' },
  { value: 'move',        label: 'Emménagement / Déménagement' },
]

function normalise(item) {
  return {
    id:       item._id,
    category: item.serviceType || '',
    title:    item.title,
    before:   item.beforeImage?.url || '',
    after:    item.afterImage?.url  || '',
  }
}

function BeforeAfterCard({ item, onClick }) {
  const [view, setView] = useState('after')

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative rounded-sm overflow-hidden cursor-pointer"
      onClick={() => onClick(item)}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={view}
            src={view === 'before' ? item.before : item.after}
            alt={`${item.title} — ${view === 'before' ? 'avant' : 'après'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop' }}
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-navy-deeper/80 via-transparent to-transparent" />

        <div className="absolute top-3 right-3 w-8 h-8 rounded-sm bg-black/40 backdrop-blur-sm flex items-center justify-center
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ZoomIn size={14} className="text-white" />
        </div>

        <div
          className="absolute top-3 left-3 flex bg-black/50 backdrop-blur-sm rounded-sm overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {[
            { key: 'before', label: 'Avant' },
            { key: 'after',  label: 'Après' },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setView(key)}
              className={`px-3 py-1.5 text-xs font-inter font-semibold tracking-wide transition-all duration-200
                ${view === key ? 'bg-orange-accent text-white' : 'text-white/60 hover:text-white'}`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className="font-playfair text-base font-bold text-white">{item.title}</p>
        </div>
      </div>
    </motion.div>
  )
}

function Lightbox({ item, onClose, onPrev, onNext }) {
  const [view, setView] = useState('after')

  if (!item) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative max-w-5xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4 px-2">
          <h3 className="font-playfair text-xl font-bold text-white">{item.title}</h3>
          <div className="flex items-center gap-3">
            <div className="flex bg-navy/80 rounded-sm overflow-hidden border border-white/10">
              {[
                { key: 'before', label: 'Avant' },
                { key: 'after',  label: 'Après' },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setView(key)}
                  className={`px-4 py-2 text-sm font-inter font-semibold transition-all duration-200
                    ${view === key ? 'bg-orange-accent text-white' : 'text-champagne/50 hover:text-champagne'}`}
                >
                  {label}
                </button>
              ))}
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-sm border border-white/10 text-champagne/50 hover:text-champagne hover:border-white/30 transition-all"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="relative aspect-video rounded-sm overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={view}
              src={view === 'before' ? item.before : item.after}
              alt={`${item.title} — ${view === 'before' ? 'avant' : 'après'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop' }}
            />
          </AnimatePresence>

          <button
            onClick={onPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-sm bg-black/50 backdrop-blur-sm
                       border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-sm bg-black/50 backdrop-blur-sm
                       border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function GalleryPage() {
  const [items, setItems]               = useState([])
  const [loading, setLoading]           = useState(true)
  const [error, setError]               = useState(null)
  const [activeCategory, setActiveCategory] = useState('all')
  const [lightboxItem, setLightboxItem] = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    fetch(`${API}/api/gallery`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then((json) => {
        if (!cancelled) {
          setItems((json.data || []).map(normalise))
          setLoading(false)
        }
      })
      .catch((e) => {
        if (!cancelled) {
          setError(e.message)
          setLoading(false)
        }
      })
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    return () => setLightboxItem(null)
  }, [])

  const filtered =
    activeCategory === 'all'
      ? items
      : items.filter((i) => i.category === activeCategory)

  const lightboxIndex = filtered.findIndex((i) => i.id === lightboxItem?.id)

  const openLightbox  = (item) => setLightboxItem(item)
  const closeLightbox = () => setLightboxItem(null)
  const prevItem = () => setLightboxItem(filtered[(lightboxIndex - 1 + filtered.length) % filtered.length])
  const nextItem = () => setLightboxItem(filtered[(lightboxIndex + 1) % filtered.length])

  return (
    <div className="min-h-screen bg-navy pt-24">
      {/* Hero */}
      <section className="relative py-20 bg-navy-deeper overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=600&fit=crop)' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="section-label">Notre Travail Parle</p>
            <h1 className="section-title text-white mb-6">
              Galerie <span className="text-gradient">Avant & Après</span>
            </h1>
            <div className="luxury-divider" />
            <p className="section-subtitle mx-auto text-champagne/55">
              La transformation va bien au-delà du visuel — c'est le sentiment de rentrer chez soi.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-6 py-2.5 rounded-sm font-inter text-sm font-medium transition-all duration-300
                  ${activeCategory === cat.value
                    ? 'bg-orange-accent text-white shadow-orange-glow'
                    : 'border border-white/10 text-champagne/60 hover:text-champagne hover:border-white/30'
                  }`}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>

          {/* States */}
          {loading && (
            <div className="text-center py-20 text-champagne/40 font-inter">
              Chargement de la galerie...
            </div>
          )}

          {error && !loading && (
            <div className="text-center py-20 text-red-400/70 font-inter text-sm">
              Impossible de charger la galerie. Veuillez réessayer.
            </div>
          )}

          {!loading && !error && (
            <>
              <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                  {filtered.map((item) => (
                    <BeforeAfterCard
                      key={item.id}
                      item={item}
                      onClick={openLightbox}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>

              {filtered.length === 0 && (
                <div className="text-center py-20 text-champagne/30 font-inter">
                  Aucun élément dans cette catégorie pour le moment.
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <AnimatePresence>
        {lightboxItem && (
          <Lightbox
            item={lightboxItem}
            onClose={closeLightbox}
            onPrev={prevItem}
            onNext={nextItem}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
