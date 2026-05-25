import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import X from 'lucide-react/dist/esm/icons/x'
import ZoomIn from 'lucide-react/dist/esm/icons/zoom-in'
import ChevronLeft from 'lucide-react/dist/esm/icons/chevron-left'
import ChevronRight from 'lucide-react/dist/esm/icons/chevron-right'
import Sparkles from 'lucide-react/dist/esm/icons/sparkles'
import Users from 'lucide-react/dist/esm/icons/users'
import ArrowLeftRight from 'lucide-react/dist/esm/icons/arrow-left-right'

const API = import.meta.env.VITE_API_URL || ''

const FALLBACK = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop'

const TABS = [
  {
    key: 'resultats-premium',
    label: 'Résultats Premium',
    sublabel: 'Espaces impeccables',
    Icon: Sparkles,
  },
  {
    key: 'equipes-action',
    label: 'Nos Équipes',
    sublabel: 'Service en action',
    Icon: Users,
  },
  {
    key: 'avant-apres',
    label: 'Avant / Après',
    sublabel: 'Transformations réelles',
    Icon: ArrowLeftRight,
  },
]

// ─── Normalise API response ───────────────────────────────────────────────────
function normalise(item) {
  return {
    id:          item._id,
    category:    item.category || 'avant-apres',
    title:       item.title,
    description: item.description || '',
    // single-image categories
    image:       item.image?.url || '',
    // avant-apres
    before:      item.beforeImage?.url || '',
    after:       item.afterImage?.url  || '',
    featured:    !!item.featured,
  }
}

// ─── Premium single-image card ────────────────────────────────────────────────
function PremiumCard({ item, onClick, variant = 'results' }) {
  const src = item.image || FALLBACK

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative rounded-sm overflow-hidden cursor-pointer"
      onClick={() => onClick(item)}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={src}
          alt={item.title}
          loading="lazy"
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ${variant === 'team' ? 'object-top' : 'object-center'}`}
          onError={(e) => { e.currentTarget.src = FALLBACK }}
        />

        {/* Gradient overlay */}
        <div className={`absolute inset-0 ${
          variant === 'team'
            ? 'bg-gradient-to-t from-navy-deeper/90 via-navy/30 to-transparent'
            : 'bg-gradient-to-t from-navy-deeper/75 via-transparent to-transparent'
        }`} />

        {/* Zoom icon */}
        <div className="absolute top-3 right-3 w-8 h-8 rounded-sm bg-black/40 backdrop-blur-sm
                        flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ZoomIn size={14} className="text-white" />
        </div>

        {/* Featured badge */}
        {item.featured && (
          <div className="absolute top-3 left-3 px-2.5 py-1 bg-orange-accent text-white text-[10px] font-inter font-bold uppercase tracking-wider rounded-sm">
            Sélection
          </div>
        )}

        {/* Title */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className="font-playfair text-base font-bold text-white leading-snug">{item.title}</p>
          {item.description && (
            <p className="font-inter text-xs text-white/60 mt-1 line-clamp-1">{item.description}</p>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// ─── Gallery Carousel ─────────────────────────────────────────────────────────
function GalleryCarousel({ items, onItemClick, variant, showVideo }) {
  const [idx, setIdx] = useState(0)

  const slots = useMemo(() => {
    const video = showVideo ? [{ type: 'video' }] : []
    return [...video, ...items.map(item => ({ type: 'item', item }))]
  }, [items, showVideo])

  const total = slots.length
  const prev = useCallback(() => setIdx(i => Math.max(0, i - 1)), [])
  const next = useCallback(() => setIdx(i => Math.min(total - 1, i + 1)), [total])

  useEffect(() => { setIdx(0) }, [items])

  if (total === 0) return null

  const getThumb = (slot) => {
    if (!slot || slot.type === 'video') return null
    const { item } = slot
    if (item.category === 'avant-apres') return item.after || item.before || FALLBACK
    return item.image || FALLBACK
  }

  const featured = slots[idx]
  const t1 = idx + 1 < total ? slots[idx + 1] : null
  const t2 = idx + 2 < total ? slots[idx + 2] : null

  const renderSlot = (slot, isFeatured = false) => {
    if (!slot) return null
    if (slot.type === 'video') {
      return (
        <>
          <video className="w-full h-full object-cover" src="/team-video.mp4" autoPlay loop muted playsInline />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-deeper/60 via-transparent to-transparent pointer-events-none" />
        </>
      )
    }
    const src = getThumb(slot)
    return (
      <>
        <img
          src={src}
          alt={slot.item.title}
          className={`w-full h-full object-cover transition-transform duration-700 ${isFeatured ? 'group-hover:scale-105' : ''} ${variant === 'team' ? 'object-top' : 'object-center'}`}
          onError={(e) => { e.currentTarget.src = FALLBACK }}
        />
        {isFeatured && slot.item.featured && (
          <div className="absolute top-3 left-3 px-2.5 py-1 bg-orange-accent text-white text-[10px] font-inter font-bold uppercase tracking-wider rounded-sm">
            Sélection
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deeper/75 via-transparent to-transparent pointer-events-none" />
        {isFeatured && (
          <div className="absolute bottom-0 left-0 right-0 p-4 pointer-events-none">
            <p className="font-playfair text-base font-bold text-white leading-snug">{slot.item.title}</p>
            {slot.item.description && (
              <p className="font-inter text-xs text-white/60 mt-1 line-clamp-1">{slot.item.description}</p>
            )}
          </div>
        )}
      </>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-3 items-stretch">
        {/* Featured */}
        <motion.div
          key={idx}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
          className="w-[56%] aspect-[4/3] relative rounded-sm overflow-hidden group cursor-pointer"
          onClick={() => featured.type === 'item' && onItemClick(featured.item)}
        >
          {renderSlot(featured, true)}
        </motion.div>

        {/* Thumbnails */}
        <div className="flex-1 flex gap-3">
          {[t1, t2].map((slot, i) => (
            <div
              key={i}
              className={`flex-1 aspect-[4/3] relative rounded-sm overflow-hidden transition-opacity duration-200 ${
                slot ? 'cursor-pointer opacity-70 hover:opacity-100' : 'opacity-0 pointer-events-none'
              }`}
              onClick={() => slot && setIdx(idx + 1 + i)}
            >
              {renderSlot(slot, false)}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-end gap-4">
        <div className="flex items-center gap-1.5">
          {slots.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`block h-px rounded-full transition-all duration-300 ${
                i === idx ? 'w-8 bg-orange-accent' : 'w-4 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={prev}
            disabled={idx === 0}
            className="w-9 h-9 rounded-sm border border-white/10 flex items-center justify-center text-champagne/50 hover:text-champagne hover:border-white/30 transition-all disabled:opacity-25 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={next}
            disabled={idx === total - 1}
            className="w-9 h-9 rounded-sm border border-white/10 flex items-center justify-center text-champagne/50 hover:text-champagne hover:border-white/30 transition-all disabled:opacity-25 disabled:cursor-not-allowed"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Before / After card (preserved) ─────────────────────────────────────────
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
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            onError={(e) => { e.currentTarget.src = FALLBACK }}
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-navy-deeper/80 via-transparent to-transparent" />

        <div className="absolute top-3 right-3 w-8 h-8 rounded-sm bg-black/40 backdrop-blur-sm flex items-center justify-center
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ZoomIn size={14} className="text-white" />
        </div>

        {/* Before / After toggle */}
        <div
          className="absolute top-3 left-3 flex bg-black/50 backdrop-blur-sm rounded-sm overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {[{ key: 'before', label: 'Avant' }, { key: 'after', label: 'Après' }].map(({ key, label }) => (
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

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({ item, onClose, onPrev, onNext }) {
  const [view, setView] = useState('after')
  const isAvantApres = item.category === 'avant-apres'
  const src = isAvantApres
    ? (view === 'before' ? item.before : item.after)
    : (item.image || FALLBACK)

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft')  onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose, onPrev, onNext])

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
          <div>
            <h3 className="font-playfair text-xl font-bold text-white">{item.title}</h3>
            {item.description && (
              <p className="font-inter text-sm text-champagne/50 mt-0.5">{item.description}</p>
            )}
          </div>
          <div className="flex items-center gap-3">
            {isAvantApres && (
              <div className="flex bg-navy/80 rounded-sm overflow-hidden border border-white/10">
                {[{ key: 'before', label: 'Avant' }, { key: 'after', label: 'Après' }].map(({ key, label }) => (
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
            )}
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
              key={src}
              src={src}
              alt={item.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.src = FALLBACK }}
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

// ─── Main Gallery Page ────────────────────────────────────────────────────────
export default function GalleryPage() {
  const [allItems,    setAllItems]    = useState([])
  const [loading,     setLoading]     = useState(true)
  const [error,       setError]       = useState(null)
  const [activeTab,   setActiveTab]   = useState('resultats-premium')
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
          setAllItems((json.data || []).map(normalise))
          setLoading(false)
        }
      })
      .catch((e) => {
        if (!cancelled) { setError(e.message); setLoading(false) }
      })
    return () => { cancelled = true }
  }, [])

  const tabItems = allItems.filter((i) => i.category === activeTab)
  const lightboxIndex = tabItems.findIndex((i) => i.id === lightboxItem?.id)

  const openLightbox  = useCallback((item) => setLightboxItem(item), [])
  const closeLightbox = useCallback(() => setLightboxItem(null), [])
  const prevItem = useCallback(() =>
    setLightboxItem(tabItems[(lightboxIndex - 1 + tabItems.length) % tabItems.length]),
    [tabItems, lightboxIndex]
  )
  const nextItem = useCallback(() =>
    setLightboxItem(tabItems[(lightboxIndex + 1) % tabItems.length]),
    [tabItems, lightboxIndex]
  )

  const activeTabMeta = TABS.find((t) => t.key === activeTab)

  return (
    <div className="min-h-screen bg-navy pt-24">

      {/* ── Hero ── */}
      <section className="relative py-20 bg-navy-deeper overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(/gallery-hero.jpg)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deeper/60 via-transparent to-navy-deeper/80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="section-label">Notre Travail Parle</p>
            <h1 className="section-title text-white mb-6">
              Galerie <span className="text-gradient">Premium</span>
            </h1>
            <div className="luxury-divider" />
            <p className="section-subtitle mx-auto text-champagne/55">
              La transformation va bien au-delà du visuel — c'est le sentiment de rentrer chez soi.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Tab Navigation ── */}
      <section className="sticky top-[60px] z-30 bg-navy/95 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto scrollbar-none">
            {TABS.map(({ key, label, sublabel, Icon }) => (
              <button
                key={key}
                onClick={() => { setActiveTab(key); setLightboxItem(null) }}
                className={`flex items-center gap-2.5 px-5 py-4 border-b-2 font-inter text-sm font-medium
                            whitespace-nowrap transition-all duration-300 flex-shrink-0
                  ${activeTab === key
                    ? 'border-orange-accent text-white'
                    : 'border-transparent text-champagne/40 hover:text-champagne/70 hover:border-white/20'
                  }`}
              >
                <Icon size={15} />
                <span className="hidden sm:inline">{label}</span>
                <span className="sm:hidden">{label.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tab Content ── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Tab header */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="mb-10"
            >
              <div className="flex items-center gap-3 mb-2">
                {activeTabMeta && <activeTabMeta.Icon size={18} className="text-orange-accent" />}
                <h2 className="font-playfair text-2xl font-bold text-white">
                  {activeTabMeta?.label}
                </h2>
              </div>
              <p className="font-inter text-sm text-champagne/45">{activeTabMeta?.sublabel}</p>
            </motion.div>
          </AnimatePresence>

          {/* Loading */}
          {loading && (
            <div className="text-center py-20 text-champagne/40 font-inter text-sm">
              Chargement de la galerie…
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <div className="text-center py-20 text-red-400/70 font-inter text-sm">
              Impossible de charger la galerie. Veuillez réessayer.
            </div>
          )}

          {/* Grid */}
          {!loading && !error && (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {tabItems.length === 0 && activeTab !== 'equipes-action' ? (
                  <div className="text-center py-20 text-champagne/30 font-inter">
                    Aucun contenu dans cette section pour le moment.
                  </div>
                ) : (
                  <GalleryCarousel
                    items={tabItems}
                    onItemClick={openLightbox}
                    variant={activeTab === 'equipes-action' ? 'team' : 'results'}
                    showVideo={activeTab === 'equipes-action'}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>

      {/* ── Lightbox ── */}
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
