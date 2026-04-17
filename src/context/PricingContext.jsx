import { createContext, useContext, useState } from 'react'

// ─── All pricing data — single source of truth ───────────────────────────────
export const STD_BASE = { studio: 55, t2: 75, t3: 95, t4: 120, maison: 160 }
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
}

// ─── Pure calculation functions ───────────────────────────────────────────────
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

  // Switching modes resets all pricing state — no carry-over between modes
  const switchMode = (mode) => {
    setPricingMode(mode)
    setStd(STD_INIT)
    setPrem(PREM_INIT)
  }

  const pricing = pricingMode === 'standard' ? calcStandard(std) : calcPremium(prem)

  return (
    <PricingContext.Provider value={{ pricingMode, std, setStd, prem, setPrem, switchMode, pricing }}>
      {children}
    </PricingContext.Provider>
  )
}

export const usePricing = () => useContext(PricingContext)
