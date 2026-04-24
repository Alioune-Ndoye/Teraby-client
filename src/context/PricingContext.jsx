import { createContext, useContext, useState } from 'react'

// ─── All pricing data — single source of truth ───────────────────────────────
export const STD_BASE = { studio: 55, t2: 75, t3: 95, t4: 120, maison: 160 }

// ─── Commercial pricing data ──────────────────────────────────────────────────
export const COMM_LOCALS = [
  {
    key: 'bureaux', label: 'Bureaux',
    tiers: [
      { range: '0 – 100 m²',   min: 0,   max: 100, freq: '1×/semaine', freqPerMonth: 4,  sans: 2.5, avec: 3.2 },
      { range: '101 – 300 m²', min: 101, max: 300, freq: '2×/semaine', freqPerMonth: 8,  sans: 2.2, avec: 3.0 },
      { range: '301 – 600 m²', min: 301, max: 600, freq: '3×/semaine', freqPerMonth: 13, sans: 2.0, avec: 2.8 },
    ],
  },
  {
    key: 'medical', label: 'Cabinet médical',
    tiers: [
      { range: '0 – 100 m²',   min: 0,   max: 100, freq: '3×/semaine', freqPerMonth: 13, sans: 3.0, avec: 3.8 },
      { range: '101 – 300 m²', min: 101, max: 300, freq: '5×/semaine', freqPerMonth: 22, sans: 2.7, avec: 3.5 },
    ],
  },
  {
    key: 'magasin', label: 'Magasin',
    tiers: [
      { range: '0 – 100 m²',   min: 0,   max: 100, freq: '2×/semaine', freqPerMonth: 8,  sans: 2.6, avec: 3.3 },
      { range: '101 – 300 m²', min: 101, max: 300, freq: '3×/semaine', freqPerMonth: 13, sans: 2.3, avec: 3.1 },
    ],
  },
]

export const REG_EXTRAS = [
  { key: 'canape_2', group: 'Canapé', label: '2 places',   price: 70  },
  { key: 'canape_3', group: 'Canapé', label: '3 places',   price: 90  },
  { key: 'canape_a', group: 'Canapé', label: 'Angle',      price: 120 },
  { key: 'tapis_s',  group: 'Tapis',  label: '< 5 m²',    price: 30  },
  { key: 'tapis_m',  group: 'Tapis',  label: '5 – 10 m²', price: 50  },
  { key: 'tapis_l',  group: 'Tapis',  label: '> 10 m²',   price: 70  },
]

export const COMM_EXTRAS = [
  { key: 'canape_2', group: 'Canapé', label: '2 places',   sans: 70,  avec: 90  },
  { key: 'canape_3', group: 'Canapé', label: '3 places',   sans: 90,  avec: 120 },
  { key: 'canape_a', group: 'Canapé', label: 'Angle',      sans: 120, avec: 160 },
  { key: 'tapis_s',  group: 'Tapis',  label: '< 5 m²',    sans: 30,  avec: 45  },
  { key: 'tapis_m',  group: 'Tapis',  label: '5 – 10 m²', sans: 50,  avec: 70  },
  { key: 'tapis_l',  group: 'Tapis',  label: '> 10 m²',   sans: 70,  avec: 100 },
]
export const STD_COEFF = { express: 0.9, standard: 1.0, premium: 1.25 }
export const STD_OPTION_LIST = [
  { key: 'linge',         label: 'Linge fourni',    price: 20 },
  { key: 'gestionLinge',  label: 'Gestion linge',   price: 25 },
  { key: 'consommables',  label: 'Consommables',    price: 8  },
  { key: 'checkInTardif', label: 'Check-in tardif', price: 25 },
]
export const SVC_LABELS = { express: 'Express', standard: 'Standard', premium: 'Premium' }
export const SVC_DESCS  = {
  express:  "Rapide, efficace, sans compromis sur le résultat.",
  standard: "Notre formule phare. Nettoyage complet et soigné.",
  premium:  "Le grand luxe. Chaque détail traité avec une attention absolue.",
}

export const PREMIUM_OFFERS = {
  signature: {
    label:  'Entretien Signature',
    desc:   'Nettoyage régulier soigné pour un intérieur impeccable.',
    sans:   { studio: 70,  t2: 90,  t3: 110, t4: 140, sqm: 3   },
    avec:   { studio: 85,  t2: 105, t3: 130, t4: 165, sqm: 3.5 },
    vitres: 30,
  },
  excellence: {
    label:  'Nettoyage Excellence',
    desc:   'Nettoyage en profondeur pour un résultat irréprochable.',
    sans:   { studio: 120, t2: 150, t3: 190, t4: 240, sqm: 5   },
    avec:   { studio: 140, t2: 180, t3: 230, t4: 290, sqm: 5.5 },
    vitres: 50,
  },
}

export const LOGEMENT_STD = [
  { value: 'studio', label: 'Studio' },
  { value: 't2',     label: 'T2'     },
  { value: 't3',     label: 'T3'     },
  { value: 't4',     label: 'T4'     },
  { value: 'maison', label: 'Maison' },
]
export const LOGEMENT_PREM = [
  { value: 'studio', label: 'Studio' },
  { value: 't2',     label: 'T2'     },
  { value: 't3',     label: 'T3'     },
  { value: 't4',     label: 'T4+'    },
]

export const STD_INIT = {
  logement: 'studio',
  service:  'standard',
  options:  { linge: false, gestionLinge: false, consommables: false, checkInTardif: false },
  urgency:  false,
}
export const PREM_INIT = {
  offer:       'signature',
  fournitures: false,
  logement:    't2',
  surface:     '',
  vitres:      false,
  urgency:     false,
  extras: { canape_2: false, canape_3: false, canape_a: false, tapis_s: false, tapis_m: false, tapis_l: false },
}
export const COMM_INIT = {
  localKey:       'bureaux',
  surface:        '',
  fournitures:    false,
  selectedExtras: {},
}

// ─── Pure calculation functions ───────────────────────────────────────────────
export function calcCommercial(c) {
  const local = COMM_LOCALS.find(l => l.key === c.localKey)
  const surf  = parseFloat(c.surface)
  const tier  = isNaN(surf) || surf <= 0
    ? null
    : local.tiers.find(t => surf >= t.min && surf <= t.max)

  if (!tier) return { total: 0, lines: [], urgencyAmount: 0 }

  const pricePerM2      = c.fournitures ? tier.avec : tier.sans
  const perIntervention = Math.round(pricePerM2 * surf)
  const perMonth        = Math.round(perIntervention * tier.freqPerMonth)

  const extrasTotal = COMM_EXTRAS
    .filter(e => c.selectedExtras[e.key])
    .reduce((sum, e) => sum + (c.fournitures ? e.avec : e.sans), 0)

  const lines = [
    { label: `${surf} m² × ${pricePerM2} €/m² · ${tier.freq}`, amount: perIntervention },
  ]
  if (extrasTotal > 0) {
    lines.push({ label: 'Options canapé & tapis', amount: extrasTotal })
  }
  return { total: perMonth + extrasTotal, lines, urgencyAmount: 0 }
}


export function calcStandard(s) {
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

export function calcPremium(p) {
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
    baseLabel = `${lbl} : ${base} €`
  }

  const lines = [{ label: baseLabel, amount: base }]
  let total = base

  if (p.vitres) {
    lines.push({ label: 'Nettoyage des vitres', amount: offer.vitres })
    total += offer.vitres
  }

  if (p.fournitures && p.extras) {
    const extrasTotal = REG_EXTRAS
      .filter(e => p.extras[e.key])
      .reduce((sum, e) => sum + e.price, 0)
    if (extrasTotal > 0) {
      lines.push({ label: 'Options canapé & tapis', amount: extrasTotal })
      total += extrasTotal
    }
  }

  let urgencyAmount = 0
  if (p.urgency) {
    urgencyAmount = Math.round(total * 0.2)
    total += urgencyAmount
  }
  return { total, lines, urgencyAmount }
}

// ─── Context ──────────────────────────────────────────────────────────────────
const PricingContext = createContext(null)

export function PricingProvider({ children }) {
  const [pricingMode, setPricingMode] = useState('standard')
  const [std,  setStd]  = useState(STD_INIT)
  const [prem, setPrem] = useState(PREM_INIT)
  const [comm, setComm] = useState(COMM_INIT)

  // Switching modes resets all pricing state — no carry-over between modes
  const switchMode = (mode, commOverride = null) => {
    setPricingMode(mode)
    setStd(STD_INIT)
    setPrem(PREM_INIT)
    setComm(commOverride !== null ? commOverride : COMM_INIT)
  }

  const pricing =
    pricingMode === 'standard'   ? calcStandard(std)   :
    pricingMode === 'premium'    ? calcPremium(prem)    :
                                   calcCommercial(comm)

  return (
    <PricingContext.Provider value={{ pricingMode, std, setStd, prem, setPrem, comm, setComm, switchMode, pricing }}>
      {children}
    </PricingContext.Provider>
  )
}

export const usePricing = () => useContext(PricingContext)
