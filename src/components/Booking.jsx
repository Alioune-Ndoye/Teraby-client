import { useState, forwardRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import User from 'lucide-react/dist/esm/icons/user'
import Mail from 'lucide-react/dist/esm/icons/mail'
import Phone from 'lucide-react/dist/esm/icons/phone'
import MapPin from 'lucide-react/dist/esm/icons/map-pin'
import Calendar from 'lucide-react/dist/esm/icons/calendar'
import Clock from 'lucide-react/dist/esm/icons/clock'
import FileText from 'lucide-react/dist/esm/icons/file-text'
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle'
import Loader2 from 'lucide-react/dist/esm/icons/loader-2'
import ChevronDown from 'lucide-react/dist/esm/icons/chevron-down'
import Sparkles from 'lucide-react/dist/esm/icons/sparkles'
import Zap from 'lucide-react/dist/esm/icons/zap'
import Receipt from 'lucide-react/dist/esm/icons/receipt'

// ─── Standard pricing data ────────────────────────────────────────────────────
const STD_BASE = { studio: 55, t2: 75, t3: 95, t4: 120, maison: 160 }
const STD_COEFF = { express: 0.9, standard: 1.0, premium: 1.25 }
const STD_OPTION_LIST = [
  { key: 'linge',         label: 'Linge fourni',    price: 20 },
  { key: 'gestionLinge',  label: 'Gestion linge',   price: 25 },
  { key: 'consommables',  label: 'Consommables',    price: 8  },
  { key: 'checkInTardif', label: 'Check-in tardif', price: 25 },
]
const STD_INIT = {
  logement: 'studio',
  service: 'standard',
  options: { linge: false, gestionLinge: false, consommables: false, checkInTardif: false },
  urgency: false,
}

// ─── Premium pricing data ─────────────────────────────────────────────────────
const PREMIUM_OFFERS = {
  signature: {
    label: 'Entretien Signature',
    sans: { studio: 70, t2: 90,  t3: 110, t4: 140, sqm: 3   },
    avec: { studio: 85, t2: 105, t3: 130, t4: 165, sqm: 3.5 },
    vitres: 30,
  },
  excellence: {
    label: 'Nettoyage Excellence',
    sans: { studio: 120, t2: 150, t3: 190, t4: 240, sqm: 5   },
    avec: { studio: 140, t2: 180, t3: 230, t4: 290, sqm: 5.5 },
    vitres: 50,
  },
}
const PREM_INIT = {
  offer: 'signature',
  fournitures: false,
  logement: 't2',
  surface: '',
  vitres: false,
  urgency: false,
}

// ─── Shared lookup ────────────────────────────────────────────────────────────
const LOGEMENT_STD = [
  { value: 'studio', label: 'Studio' },
  { value: 't2',     label: 'T2'     },
  { value: 't3',     label: 'T3'     },
  { value: 't4',     label: 'T4'     },
  { value: 'maison', label: 'Maison' },
]
const LOGEMENT_PREM = LOGEMENT_STD.slice(0, 4).map(o =>
  o.value === 't4' ? { value: 't4', label: 'T4+' } : o
)
const SVC_LABELS = { express: 'Express', standard: 'Standard', premium: 'Premium' }

// ─── Calculation functions ─────────────────────────────────────────────────────
function calcStandard(s) {
  const base     = STD_BASE[s.logement]
  const coeff    = STD_COEFF[s.service]
  const svcAmt   = Math.round(base * coeff)
  const logLabel = LOGEMENT_STD.find(o => o.value === s.logement)?.label ?? s.logement
  const lines    = [{ label: `${logLabel} · ${SVC_LABELS[s.service]}`, amount: svcAmt }]
  let total = svcAmt

  for (const { key, label, price } of STD_OPTION_LIST) {
    if (s.options[key]) {
      total += price
      lines.push({ label, amount: price })
    }
  }

  let urgencyAmount = 0
  if (s.urgency) {
    urgencyAmount = Math.round(total * 0.2)
    total += urgencyAmount
  }
  return { total, lines, urgencyAmount }
}

function calcPremium(p) {
  const offer = PREMIUM_OFFERS[p.offer]
  const tier  = p.fournitures ? offer.avec : offer.sans
  const surf  = parseFloat(p.surface)
  let base, baseLabel

  if (!isNaN(surf) && surf > 0) {
    base      = Math.round(surf * tier.sqm)
    baseLabel = `${surf} m² × ${tier.sqm} €/m²`
  } else {
    base      = tier[p.logement]
    const lbl = LOGEMENT_PREM.find(o => o.value === p.logement)?.label ?? p.logement
    baseLabel = `${lbl}: ${base} €`
  }

  const lines = [{ label: baseLabel, amount: base }]
  let total = base

  if (p.vitres) {
    lines.push({ label: 'Nettoyage des vitres', amount: offer.vitres })
    total += offer.vitres
  }

  let urgencyAmount = 0
  if (p.urgency) {
    urgencyAmount = Math.round(total * 0.2)
    total += urgencyAmount
  }
  return { total, lines, urgencyAmount }
}

// ─── Existing form data (API contract) ────────────────────────────────────────
const frequencyOptions = [
  { value: 'once',      label: 'Une seule fois',    multiplier: 1    },
  { value: 'monthly',   label: 'Mensuel (–10 %)',   multiplier: 0.9  },
  { value: 'biweekly',  label: 'Bimensuel (–15 %)', multiplier: 0.85 },
  { value: 'weekly',    label: 'Hebdomadaire (–20 %)', multiplier: 0.8 },
]
const timeSlots = ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00']

// ─── Sub-components ───────────────────────────────────────────────────────────
const InputField = forwardRef(function InputField({ label, icon: Icon, error, ...props }, ref) {
  return (
    <div>
      <label className="luxury-label">{label}</label>
      <div className="relative">
        {Icon && (
          <Icon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-champagne/30 pointer-events-none" />
        )}
        <input
          ref={ref}
          {...props}
          className={`luxury-input ${Icon ? 'pl-10' : ''} ${error ? 'border-red-500/50' : ''}`}
        />
      </div>
      {error && <p className="mt-1.5 text-xs text-red-400 font-inter">{error.message}</p>}
    </div>
  )
})

function ModeToggle({ mode, onChange }) {
  return (
    <div className="flex rounded-sm overflow-hidden border border-white/10">
      {[
        { value: 'standard', label: 'Service Standard', Icon: Zap      },
        { value: 'premium',  label: 'Offre Premium',    Icon: Sparkles },
      ].map(({ value, label, Icon }) => (
        <button
          key={value}
          type="button"
          onClick={() => onChange(value)}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 font-inter text-sm font-semibold
            transition-all duration-300
            ${mode === value
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

function TogglePill({ options, value, onChange }) {
  return (
    <div className="flex rounded-sm overflow-hidden border border-white/8">
      {options.map(opt => (
        <button
          key={String(opt.value)}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`flex-1 py-2 text-sm font-inter font-medium transition-all duration-200
            ${value === opt.value
              ? 'bg-orange-accent/20 text-champagne border-orange-accent/40'
              : 'text-champagne/50 hover:text-champagne/80'
            }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

function SelectGrid({ options, value, onChange, cols = 'grid-cols-3' }) {
  return (
    <div className={`grid ${cols} gap-2`}>
      {options.map(opt => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`py-2 rounded-sm border text-center font-inter text-sm font-medium transition-all duration-200
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

function CheckRow({ checked, onChange, label, sub }) {
  return (
    <label
      className={`flex items-center gap-3 p-3 rounded-sm border cursor-pointer transition-all duration-200
        ${checked ? 'border-orange-accent/40 bg-orange-accent/[0.06]' : 'border-white/8 hover:border-white/15'}`}
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

// ─── Standard pricing inputs ──────────────────────────────────────────────────
function StandardPricing({ state, onChange }) {
  const set = (patch) => onChange({ ...state, ...patch })
  const setOpt = (key, val) => onChange({ ...state, options: { ...state.options, [key]: val } })

  return (
    <motion.div
      key="standard"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <div>
        <label className="luxury-label">Type de Logement</label>
        <SelectGrid
          options={LOGEMENT_STD}
          value={state.logement}
          onChange={v => set({ logement: v })}
          cols="grid-cols-5"
        />
      </div>

      <div>
        <label className="luxury-label">Niveau de Service</label>
        <SelectGrid
          options={Object.keys(STD_COEFF).map(k => ({ value: k, label: SVC_LABELS[k] }))}
          value={state.service}
          onChange={v => set({ service: v })}
          cols="grid-cols-3"
        />
      </div>

      <div>
        <label className="luxury-label">Options</label>
        <div className="grid grid-cols-2 gap-2">
          {STD_OPTION_LIST.map(({ key, label, price }) => (
            <CheckRow
              key={key}
              checked={state.options[key]}
              onChange={v => setOpt(key, v)}
              label={label}
              sub={`+${price} €`}
            />
          ))}
        </div>
      </div>

      <CheckRow
        checked={state.urgency}
        onChange={v => set({ urgency: v })}
        label="Intervention urgente"
        sub="+20 % sur le total"
      />
    </motion.div>
  )
}

// ─── Premium pricing inputs ───────────────────────────────────────────────────
function PremiumPricing({ state, onChange }) {
  const set = (patch) => onChange({ ...state, ...patch })

  return (
    <motion.div
      key="premium"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <div>
        <label className="luxury-label">Formule</label>
        <SelectGrid
          options={Object.entries(PREMIUM_OFFERS).map(([k, v]) => ({ value: k, label: v.label }))}
          value={state.offer}
          onChange={v => set({ offer: v })}
          cols="grid-cols-2"
        />
      </div>

      <div>
        <label className="luxury-label">Fournitures</label>
        <TogglePill
          options={[
            { value: false, label: 'Sans fournitures' },
            { value: true,  label: 'Avec fournitures' },
          ]}
          value={state.fournitures}
          onChange={v => set({ fournitures: v })}
        />
      </div>

      <div>
        <label className="luxury-label">Type de Logement</label>
        <SelectGrid
          options={LOGEMENT_PREM}
          value={state.logement}
          onChange={v => set({ logement: v })}
          cols="grid-cols-4"
        />
      </div>

      <div>
        <label className="luxury-label">
          Surface (m²)
          <span className="text-champagne/30 font-normal ml-1">— optionnel</span>
        </label>
        <input
          type="number"
          min="10"
          max="999"
          placeholder="ex : 65"
          value={state.surface}
          onChange={e => set({ surface: e.target.value })}
          className="luxury-input"
        />
        <p className="mt-1 font-inter text-xs text-champagne/30">
          Si renseigné, calcul au m² plutôt que forfait logement
        </p>
      </div>

      <CheckRow
        checked={state.vitres}
        onChange={v => set({ vitres: v })}
        label="Nettoyage des vitres"
        sub={`+${PREMIUM_OFFERS[state.offer].vitres} €`}
      />
      <CheckRow
        checked={state.urgency}
        onChange={v => set({ urgency: v })}
        label="Intervention urgente"
        sub="+20 % sur le total"
      />
    </motion.div>
  )
}

// ─── Price breakdown (left panel) ─────────────────────────────────────────────
function PriceBreakdown({ mode, std, prem }) {
  const { total, lines, urgencyAmount } =
    mode === 'standard' ? calcStandard(std) : calcPremium(prem)

  const modeTag  = mode === 'standard' ? 'Service Standard' : `Premium — ${PREMIUM_OFFERS[prem.offer].label}`
  const subTag   = mode === 'premium' ? `Fournitures : ${prem.fournitures ? 'Oui' : 'Non'}` : null

  return (
    <motion.div layout className="glass-card-light rounded-sm p-6 border border-orange-accent/15">
      <div className="flex items-center gap-2 mb-4">
        <Receipt size={16} className="text-orange-accent" />
        <span className="font-inter text-xs font-semibold text-orange-accent tracking-widest uppercase">
          Détail du Prix
        </span>
      </div>

      <div className="font-inter text-xs font-semibold tracking-wide text-champagne/50 uppercase mb-1">
        {modeTag}
      </div>
      {subTag && (
        <div className="font-inter text-xs text-champagne/35 mb-3">{subTag}</div>
      )}

      <div className="space-y-2 mt-3 mb-4 border-t border-white/5 pt-3">
        {lines.map((line, i) => (
          <div key={i} className="flex justify-between items-baseline gap-4">
            <span className="font-inter text-sm text-champagne/60">{line.label}</span>
            <span className="font-inter text-sm text-champagne font-medium shrink-0">{line.amount} €</span>
          </div>
        ))}
        {urgencyAmount > 0 && (
          <div className="flex justify-between items-baseline gap-4">
            <span className="font-inter text-sm text-orange-accent/80">Urgence (+20 %)</span>
            <span className="font-inter text-sm text-orange-accent font-medium shrink-0">+{urgencyAmount} €</span>
          </div>
        )}
      </div>

      <div className="border-t border-white/8 pt-4 flex justify-between items-center">
        <span className="font-inter text-sm text-champagne/55">Total estimé</span>
        <div className="font-playfair text-4xl font-bold text-white leading-none">
          {total}<span className="text-champagne/40 text-lg ml-0.5 font-inter">€</span>
        </div>
      </div>
      <p className="font-inter text-xs text-champagne/25 mt-2 text-right">
        Prix final confirmé sur place
      </p>
    </motion.div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function Booking() {
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [selectedFrequency, setSelectedFrequency] = useState(frequencyOptions[0])

  // Dual pricing — fully isolated state per mode
  const [pricingMode, setPricingMode] = useState('standard')
  const [std, setStd] = useState(STD_INIT)
  const [prem, setPrem] = useState(PREM_INIT)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: { name: '', email: '', phone: '', address: '', date: '', time: '08:00', notes: '' },
  })

  // Switching modes resets ALL pricing state — no carry-over
  const handleModeSwitch = (mode) => {
    setPricingMode(mode)
    setStd(STD_INIT)
    setPrem(PREM_INIT)
  }

  const { total: estimatedPrice } =
    pricingMode === 'standard' ? calcStandard(std) : calcPremium(prem)

  const onSubmit = async (data) => {
    setStatus('loading')
    setErrorMsg('')

    // Derive serviceType for API contract — preserves existing field
    const serviceType =
      pricingMode === 'standard' ? `standard_${std.service}` : `premium_${prem.offer}`

    const payload = {
      name:           data.name.trim(),
      email:          data.email.trim(),
      phone:          data.phone.trim(),
      address:        data.address.trim(),
      notes:          data.notes?.trim() || undefined,
      date:           data.date,
      time:           data.time,
      serviceType,
      frequency:      selectedFrequency.value,
      // Pricing additions — do not break existing fields
      pricingMode,
      estimatedPrice,
      pricingDetails: pricingMode === 'standard' ? std : prem,
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/bookings`,
        { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }
      )
      const json = await res.json().catch(() => ({}))
      if (!res.ok) {
        const msg = json.errors?.[0]?.message || json.message || 'Erreur serveur'
        throw new Error(msg)
      }
      setStatus('success')
    } catch (e) {
      console.error('Booking error:', e.message)
      setErrorMsg(e.message)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  const handleReset = () => {
    setStatus('idle')
    reset()
    setPricingMode('standard')
    setStd(STD_INIT)
    setPrem(PREM_INIT)
    setSelectedFrequency(frequencyOptions[0])
  }

  return (
    <section id="booking" className="relative py-28 bg-navy overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-accent/30 to-transparent" />
      <div className="absolute right-0 top-1/4 w-[600px] h-[600px] bg-orange-accent/5 blur-[180px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left — Copy + price breakdown */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p className="section-label">Réservez Votre Expérience</p>
            <h2 className="section-title text-white mb-6">
              Planifiez Votre{' '}
              <span className="text-gradient">Nettoyage Luxe</span>
            </h2>
            <div className="w-12 h-0.5 bg-orange-accent mb-8" />
            <p className="section-subtitle text-champagne/55 mb-10">
              Réservez votre service en quelques minutes. Notre équipe conciergerie confirmera
              votre rendez-vous et préparera un plan de nettoyage personnalisé pour votre espace.
            </p>

            <div className="space-y-4 mb-10">
              {[
                'Spécialistes entièrement assurés et cautionnés',
                'Satisfaction garantie ou nous revenons gratuitement',
                'Réservation sécurisée — aucune carte requise',
                "Politique d'annulation 24 heures",
              ].map((text) => (
                <div key={text} className="flex items-center gap-3 font-inter text-sm text-champagne/65">
                  <span className="text-orange-accent font-bold">✓</span>
                  {text}
                </div>
              ))}
            </div>

            <PriceBreakdown mode={pricingMode} std={std} prem={prem} />
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="glass-card rounded-sm p-8 md:p-10">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center text-center py-12"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                      className="w-20 h-20 rounded-full bg-orange-accent/15 border border-orange-accent/30 flex items-center justify-center mb-6"
                    >
                      <CheckCircle size={36} className="text-orange-accent" />
                    </motion.div>
                    <h3 className="font-playfair text-3xl font-bold text-white mb-3">
                      Réservation Confirmée !
                    </h3>
                    <p className="font-inter text-champagne/60 text-sm leading-relaxed mb-8 max-w-xs">
                      Merci. Notre équipe conciergerie vous contactera dans les 30 minutes
                      pour finaliser les détails de votre rendez-vous.
                    </p>
                    <button onClick={handleReset} className="btn-secondary text-sm">
                      Réserver un Autre Service
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit(onSubmit, (validationErrors) => {
                      const firstError = Object.values(validationErrors)[0]
                      const msg = firstError?.message || 'Veuillez remplir tous les champs requis.'
                      setErrorMsg(msg)
                      setStatus('error')
                      setTimeout(() => setStatus('idle'), 5000)
                    })}
                    className="space-y-5"
                  >
                    <h3 className="font-playfair text-2xl font-bold text-white mb-2">
                      Planifier Votre Service
                    </h3>

                    {/* ── Pricing mode toggle ── */}
                    <ModeToggle mode={pricingMode} onChange={handleModeSwitch} />

                    {/* ── Pricing inputs — fully separate per mode ── */}
                    <AnimatePresence mode="wait">
                      {pricingMode === 'standard' ? (
                        <StandardPricing key="std" state={std} onChange={setStd} />
                      ) : (
                        <PremiumPricing key="prem" state={prem} onChange={setPrem} />
                      )}
                    </AnimatePresence>

                    {/* ── Frequency ── */}
                    <div>
                      <label className="luxury-label">Fréquence</label>
                      <div className="grid grid-cols-2 gap-3">
                        {frequencyOptions.map((opt) => (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => setSelectedFrequency(opt)}
                            className={`px-3 py-2.5 rounded-sm border text-left transition-all duration-200 font-inter text-xs
                              ${selectedFrequency.value === opt.value
                                ? 'border-orange-accent/60 bg-orange-accent/8 text-champagne'
                                : 'border-white/8 bg-navy-light/30 text-champagne/50 hover:border-white/20 hover:text-champagne/75'
                              }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* ── Contact fields ── */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <InputField
                        label="Nom Complet"
                        icon={User}
                        placeholder="Marie Dupont"
                        autoComplete="name"
                        error={errors.name}
                        {...register('name', {
                          required: 'Le nom est requis',
                          validate: v => v.trim().length >= 2 || "Merci d'entrer votre nom complet",
                        })}
                      />
                      <InputField
                        label="Téléphone"
                        icon={Phone}
                        placeholder="06 12 34 56 78"
                        autoComplete="tel"
                        error={errors.phone}
                        {...register('phone', {
                          required: 'Le téléphone est requis',
                          validate: v => v.replace(/[\s\-().+]/g, '').length >= 8 || 'Numéro invalide',
                        })}
                      />
                    </div>

                    <InputField
                      label="Adresse E-mail"
                      icon={Mail}
                      type="email"
                      autoComplete="email"
                      placeholder="marie@email.com"
                      error={errors.email}
                      {...register('email', {
                        required: "L'e-mail est requis",
                        pattern: { value: /^\S+@\S+$/i, message: 'Adresse e-mail invalide' },
                      })}
                    />

                    <InputField
                      label="Adresse du Bien"
                      icon={MapPin}
                      placeholder="12 Rue de la Paix, 75001 Paris"
                      autoComplete="street-address"
                      error={errors.address}
                      {...register('address', {
                        required: "L'adresse est requise",
                        validate: v => v.trim().length >= 5 || "Merci d'indiquer une adresse complète",
                      })}
                    />

                    {/* ── Date / Time ── */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="luxury-label">Date Souhaitée</label>
                        <div className="relative">
                          <Calendar size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-champagne/30 pointer-events-none" />
                          <input
                            type="date"
                            className={`luxury-input pl-10 ${errors.date ? 'border-red-500/50' : ''}`}
                            min={new Date().toISOString().split('T')[0]}
                            {...register('date', { required: 'La date est requise' })}
                          />
                        </div>
                        {errors.date && <p className="mt-1.5 text-xs text-red-400 font-inter">{errors.date.message}</p>}
                      </div>
                      <div>
                        <label className="luxury-label">Heure Souhaitée</label>
                        <div className="relative">
                          <Clock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-champagne/30 pointer-events-none z-10" />
                          <select
                            className={`luxury-input pl-10 appearance-none cursor-pointer ${errors.time ? 'border-red-500/50' : ''}`}
                            {...register('time', { required: "L'heure est requise" })}
                          >
                            {timeSlots.map((t) => (
                              <option key={t} value={t} className="bg-navy text-champagne">{t}</option>
                            ))}
                          </select>
                          <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-champagne/30 pointer-events-none" />
                        </div>
                        {errors.time && <p className="mt-1.5 text-xs text-red-400 font-inter">{errors.time.message}</p>}
                      </div>
                    </div>

                    {/* ── Notes ── */}
                    <div>
                      <label className="luxury-label">Instructions Particulières</label>
                      <div className="relative">
                        <FileText size={16} className="absolute left-3.5 top-3.5 text-champagne/30 pointer-events-none" />
                        <textarea
                          rows={3}
                          placeholder="Animaux, zones spécifiques, instructions d'accès..."
                          className="luxury-input pl-10 resize-none"
                          {...register('notes')}
                        />
                      </div>
                    </div>

                    {/* ── Error banner ── */}
                    {status === 'error' && (
                      <p className="text-sm text-red-400 font-inter text-center py-2 border border-red-400/20 rounded-sm bg-red-400/5">
                        {errorMsg || 'Une erreur est survenue. Veuillez réessayer.'}
                      </p>
                    )}

                    {/* ── Submit ── */}
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      type="submit"
                      disabled={status === 'loading'}
                      className="btn-primary w-full py-4 flex items-center justify-center gap-3 mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {status === 'loading' ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          Traitement en cours...
                        </>
                      ) : (
                        'Confirmer la Réservation'
                      )}
                    </motion.button>

                    <p className="text-center font-inter text-xs text-champagne/30">
                      En réservant, vous acceptez nos{' '}
                      <span className="text-orange-accent cursor-pointer hover:underline">
                        Conditions Générales
                      </span>
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
