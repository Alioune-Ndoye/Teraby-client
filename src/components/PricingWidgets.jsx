/**
 * PricingWidgets — shared UI for both Services and Booking sections.
 *
 * All components that read/write pricing state use `usePricing()` directly.
 * This ensures Services and Booking are always in sync — one state, two UIs.
 */

import { motion } from 'framer-motion'
import Zap          from 'lucide-react/dist/esm/icons/zap'
import Sparkles     from 'lucide-react/dist/esm/icons/sparkles'
import CheckCircle  from 'lucide-react/dist/esm/icons/check-circle'
import Crown        from 'lucide-react/dist/esm/icons/crown'
import Star         from 'lucide-react/dist/esm/icons/star'
import Award        from 'lucide-react/dist/esm/icons/award'
import Receipt      from 'lucide-react/dist/esm/icons/receipt'
import {
  usePricing,
  STD_COEFF, STD_OPTION_LIST, PREMIUM_OFFERS,
  LOGEMENT_STD, LOGEMENT_PREM, SVC_LABELS, SVC_DESCS,
} from '../context/PricingContext'

// ─── Generic primitives ───────────────────────────────────────────────────────

export function SelectGrid({ options, value, onChange, cols = 'grid-cols-3' }) {
  return (
    <div className={`grid ${cols} gap-2`}>
      {options.map(opt => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`py-2 rounded-sm border text-center font-inter text-sm font-medium
            transition-all duration-200
            ${value === opt.value
              ? 'border-orange-accent/60 bg-orange-accent/10 text-champagne'
              : 'border-white/8 text-champagne/50 hover:border-white/20 hover:text-champagne/75'
            }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

export function CheckRow({ checked, onChange, label, sub }) {
  return (
    <label
      className={`flex items-center gap-3 p-3 rounded-sm border cursor-pointer
        transition-all duration-200
        ${checked
          ? 'border-orange-accent/40 bg-orange-accent/[0.06]'
          : 'border-white/8 hover:border-white/15'
        }`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        className="accent-orange-500 w-3.5 h-3.5 shrink-0"
      />
      <div>
        <div className="font-inter text-sm text-champagne/80 leading-tight">{label}</div>
        {sub && <div className="font-inter text-xs text-orange-accent/70 mt-0.5">{sub}</div>}
      </div>
    </label>
  )
}

export function TogglePill({ options, value, onChange }) {
  return (
    <div className="flex rounded-sm overflow-hidden border border-white/8">
      {options.map(opt => (
        <button
          key={String(opt.value)}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`flex-1 py-2.5 text-sm font-inter font-medium transition-all duration-200
            ${value === opt.value
              ? 'bg-orange-accent/20 text-champagne'
              : 'text-champagne/50 hover:text-champagne/80'
            }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

// ─── Internal helpers ─────────────────────────────────────────────────────────

function SectionDiv({ label }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className="font-inter text-xs text-champagne/30 uppercase tracking-[0.18em] whitespace-nowrap">
        {label}
      </span>
      <div className="flex-1 h-px bg-white/5" />
    </div>
  )
}

// ─── Mode toggle ──────────────────────────────────────────────────────────────

export function ModeToggle() {
  const { pricingMode, switchMode } = usePricing()
  return (
    <div className="flex rounded-sm overflow-hidden border border-white/10">
      {[
        { value: 'standard', label: 'Service Standard', Icon: Zap      },
        { value: 'premium',  label: 'Offre Premium',    Icon: Sparkles },
      ].map(({ value, label, Icon }) => (
        <button
          key={value}
          type="button"
          onClick={() => switchMode(value)}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4
            font-inter text-sm font-semibold transition-all duration-300
            ${pricingMode === value
              ? 'bg-orange-accent text-white'
              : 'text-champagne/50 hover:text-champagne hover:bg-white/5'
            }`}
        >
          <Icon size={15} />
          {label}
        </button>
      ))}
    </div>
  )
}

// ─── Standard: service level cards ───────────────────────────────────────────

const SVC_ICONS   = { express: Zap, standard: CheckCircle, premium: Crown }
const SVC_BADGE   = { standard: 'Le plus populaire', premium: 'Expérience luxe' }

function ServiceLevelCard({ serviceKey }) {
  const { std, setStd } = usePricing()
  const selected = std.service === serviceKey
  const Icon = SVC_ICONS[serviceKey]

  return (
    <button
      type="button"
      onClick={() => setStd({ ...std, service: serviceKey })}
      className={`relative p-5 rounded-sm border text-left transition-all duration-300 overflow-hidden
        ${selected
          ? 'border-orange-accent/60 bg-orange-accent/[0.08] shadow-[0_0_30px_rgba(204,85,0,0.1)]'
          : 'border-white/8 hover:border-white/20 hover:bg-white/[0.02]'
        }`}
    >
      {SVC_BADGE[serviceKey] && (
        <span className="absolute top-2.5 right-2.5 bg-orange-accent/15 text-orange-accent text-[9px] font-inter font-semibold px-2 py-0.5 rounded-full border border-orange-accent/25">
          {SVC_BADGE[serviceKey]}
        </span>
      )}
      <Icon
        size={18}
        className={`mb-3 transition-colors duration-200 ${selected ? 'text-orange-accent' : 'text-champagne/30'}`}
      />
      <div className="font-playfair text-base font-bold text-white mb-2">
        {SVC_LABELS[serviceKey]}
      </div>
      <div className="font-inter text-xs text-champagne/40 leading-relaxed">
        {SVC_DESCS[serviceKey]}
      </div>
    </button>
  )
}

// ─── Premium: offer cards ─────────────────────────────────────────────────────

const OFFER_ICONS = { signature: Star, excellence: Award }

function OfferCard({ offerKey }) {
  const { prem, setPrem } = usePricing()
  const selected = prem.offer === offerKey
  const offer    = PREMIUM_OFFERS[offerKey]
  const Icon     = OFFER_ICONS[offerKey]

  return (
    <button
      type="button"
      onClick={() => setPrem({ ...prem, offer: offerKey })}
      className={`relative p-6 rounded-sm border text-left transition-all duration-300 overflow-hidden
        ${selected
          ? 'border-orange-accent/60 bg-orange-accent/[0.08] shadow-[0_0_40px_rgba(204,85,0,0.12)]'
          : 'border-white/8 hover:border-white/20 hover:bg-white/[0.02]'
        }`}
    >
      {offerKey === 'excellence' && (
        <span className="absolute top-3 right-3 bg-orange-accent text-white text-[10px] font-inter font-bold px-2 py-0.5 rounded-full">
          Excellence
        </span>
      )}
      <div
        className={`w-10 h-10 rounded-sm border flex items-center justify-center mb-4 transition-all duration-300
          ${selected ? 'border-orange-accent/40 bg-orange-accent/10' : 'border-white/8 bg-white/[0.02]'}`}
      >
        <Icon size={18} className={selected ? 'text-orange-accent' : 'text-champagne/35'} />
      </div>
      <div className="font-playfair text-lg font-bold text-white mb-2">{offer.label}</div>
      <div className="font-inter text-sm text-champagne/50 leading-relaxed mb-3">{offer.desc}</div>
      <div className="font-inter text-[11px] text-champagne/25">
        Sans fournitures — Studio {offer.sans.studio} € · T2 {offer.sans.t2} € · T3 {offer.sans.t3} €
      </div>
    </button>
  )
}

// ─── Standard pricing inputs ──────────────────────────────────────────────────

export function StandardPricingInputs() {
  const { std, setStd } = usePricing()
  const set    = patch => setStd({ ...std, ...patch })
  const setOpt = (key, val) => setStd({ ...std, options: { ...std.options, [key]: val } })

  return (
    <div className="space-y-6">
      <div>
        <SectionDiv label="Niveau de service" />
        <div className="grid grid-cols-3 gap-3">
          {Object.keys(STD_COEFF).map(k => (
            <ServiceLevelCard key={k} serviceKey={k} />
          ))}
        </div>
      </div>

      <div>
        <SectionDiv label="Votre logement" />
        <SelectGrid
          options={LOGEMENT_STD}
          value={std.logement}
          onChange={v => set({ logement: v })}
          cols="grid-cols-5"
        />
      </div>

      <div>
        <SectionDiv label="Options" />
        <div className="grid grid-cols-2 gap-2">
          {STD_OPTION_LIST.map(({ key, label, price }) => (
            <CheckRow
              key={key}
              checked={std.options[key]}
              onChange={v => setOpt(key, v)}
              label={label}
              sub={`+${price} €`}
            />
          ))}
        </div>
      </div>

      <CheckRow
        checked={std.urgency}
        onChange={v => set({ urgency: v })}
        label="Intervention urgente"
        sub="+20 % sur le total"
      />
    </div>
  )
}

// ─── Premium pricing inputs ───────────────────────────────────────────────────

export function PremiumPricingInputs() {
  const { prem, setPrem } = usePricing()
  const set = patch => setPrem({ ...prem, ...patch })

  return (
    <div className="space-y-6">
      <div>
        <SectionDiv label="Choisissez votre formule" />
        <div className="grid grid-cols-2 gap-4">
          {Object.keys(PREMIUM_OFFERS).map(k => (
            <OfferCard key={k} offerKey={k} />
          ))}
        </div>
      </div>

      <div>
        <SectionDiv label="Fournitures" />
        <TogglePill
          options={[
            { value: false, label: 'Sans fournitures' },
            { value: true,  label: 'Avec fournitures' },
          ]}
          value={prem.fournitures}
          onChange={v => set({ fournitures: v })}
        />
      </div>

      <div>
        <SectionDiv label="Type de logement" />
        <SelectGrid
          options={LOGEMENT_PREM}
          value={prem.logement}
          onChange={v => set({ logement: v })}
          cols="grid-cols-4"
        />
      </div>

      <div>
        <SectionDiv label="Surface — optionnel" />
        <input
          type="number"
          min="10"
          max="999"
          placeholder="ex : 65 m²"
          value={prem.surface}
          onChange={e => set({ surface: e.target.value })}
          className="luxury-input"
        />
        <p className="mt-1 font-inter text-xs text-champagne/30">
          Si renseigné, calcul au m² plutôt que forfait logement
        </p>
      </div>

      <div className="space-y-2">
        <CheckRow
          checked={prem.vitres}
          onChange={v => set({ vitres: v })}
          label="Nettoyage des vitres"
          sub={`+${PREMIUM_OFFERS[prem.offer].vitres} €`}
        />
        <CheckRow
          checked={prem.urgency}
          onChange={v => set({ urgency: v })}
          label="Intervention urgente"
          sub="+20 % sur le total"
        />
      </div>
    </div>
  )
}

// ─── Full price breakdown (Booking left panel) ────────────────────────────────

export function PriceBreakdown() {
  const { pricingMode, pricing, prem } = usePricing()
  const { total, lines, urgencyAmount } = pricing

  const modeTag = pricingMode === 'standard'
    ? 'Service Standard'
    : `Premium — ${PREMIUM_OFFERS[prem.offer].label}`
  const subTag = pricingMode === 'premium'
    ? `Fournitures : ${prem.fournitures ? 'Oui' : 'Non'}`
    : null

  return (
    <motion.div layout className="glass-card-light rounded-sm p-6 border border-orange-accent/15">
      <div className="flex items-center gap-2 mb-4">
        <Receipt size={16} className="text-orange-accent" />
        <span className="font-inter text-xs font-semibold text-orange-accent tracking-widest uppercase">
          Détail du Prix
        </span>
      </div>

      <div className="font-inter text-xs font-semibold tracking-wide text-champagne/40 uppercase mb-1">
        {modeTag}
      </div>
      {subTag && (
        <div className="font-inter text-xs text-champagne/30 mb-3">{subTag}</div>
      )}

      <div className="space-y-2 mt-3 mb-4 border-t border-white/5 pt-3">
        {lines.map((line, i) => (
          <div key={i} className="flex justify-between items-baseline gap-4">
            <span className="font-inter text-sm text-champagne/55">{line.label}</span>
            <span className="font-inter text-sm text-champagne font-medium shrink-0">
              {line.amount} €
            </span>
          </div>
        ))}
        {urgencyAmount > 0 && (
          <div className="flex justify-between items-baseline gap-4">
            <span className="font-inter text-sm text-orange-accent/75">Urgence (+20 %)</span>
            <span className="font-inter text-sm text-orange-accent font-medium shrink-0">
              +{urgencyAmount} €
            </span>
          </div>
        )}
      </div>

      <div className="border-t border-white/8 pt-4 flex justify-between items-center">
        <span className="font-inter text-sm text-champagne/50">Total estimé</span>
        <div className="font-playfair text-4xl font-bold text-white leading-none">
          {total}
          <span className="text-champagne/35 text-lg ml-0.5 font-inter">€</span>
        </div>
      </div>
      <p className="font-inter text-xs text-champagne/20 mt-2 text-right">
        Prix final confirmé sur place
      </p>
    </motion.div>
  )
}

// ─── Compact price strip (Services section) ───────────────────────────────────

export function PriceStrip() {
  const { pricing, pricingMode, prem } = usePricing()
  const { total, lines, urgencyAmount } = pricing

  const modeLabel = pricingMode === 'standard'
    ? 'Service Standard'
    : PREMIUM_OFFERS[prem.offer].label

  return (
    <motion.div
      layout
      className="glass-card rounded-sm px-6 py-5 flex flex-wrap items-center justify-between gap-4
                 border border-orange-accent/10"
    >
      <div>
        <div className="font-inter text-xs text-orange-accent font-semibold tracking-widest uppercase mb-2">
          Estimation instantanée · {modeLabel}
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          {lines.map((line, i) => (
            <span key={i} className="font-inter text-sm text-champagne/50">
              {line.label}
              <span className="text-champagne ml-1">{line.amount} €</span>
            </span>
          ))}
          {urgencyAmount > 0 && (
            <span className="font-inter text-sm text-orange-accent/65">
              Urgence +{urgencyAmount} €
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4 shrink-0">
        <div className="font-playfair text-3xl font-bold text-white leading-none">
          {total}
          <span className="font-inter text-lg text-champagne/35 ml-0.5">€</span>
        </div>
        <button
          type="button"
          onClick={() => document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' })}
          className="btn-primary"
        >
          Réserver ce Service
        </button>
      </div>
    </motion.div>
  )
}
