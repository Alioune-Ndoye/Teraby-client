import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MessageCircle from 'lucide-react/dist/esm/icons/message-circle'
import X from 'lucide-react/dist/esm/icons/x'
import Send from 'lucide-react/dist/esm/icons/send'
import Sparkles from 'lucide-react/dist/esm/icons/sparkles'
import Minimize2 from 'lucide-react/dist/esm/icons/minimize-2'
import Bot from 'lucide-react/dist/esm/icons/bot'
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'

// ─── Quick actions shown on first open ────────────────────────────────────────
const QUICK_ACTIONS = [
  { label: '📅 Réserver un nettoyage', action: 'book' },
  { label: '💶 Voir les tarifs',        action: 'services' },
  { label: '🔒 Êtes-vous assurés ?',    action: 'insured' },
  { label: '🌿 Vos produits ?',         action: 'products' },
]

// ─── Booking step definitions ─────────────────────────────────────────────────
const STEPS = {
  name: {
    ask:      "Parfait ! Commençons votre réservation.\n\nQuel est votre **prénom et nom** ?",
    field:    'name',
    validate: (v) => v.trim().length >= 2,
    error:    "Merci d'entrer votre nom complet.",
    next:     'email',
  },
  email: {
    ask:      "Votre **adresse email** pour recevoir la confirmation ?",
    field:    'email',
    validate: (v) => /\S+@\S+\.\S+/.test(v.trim()),
    error:    "Adresse email invalide. Exemple : prenom@email.com",
    next:     'phone',
  },
  phone: {
    ask:      "Votre **numéro de téléphone** ?",
    field:    'phone',
    validate: (v) => v.replace(/[\s\-().]/g, '').length >= 8,
    error:    "Numéro invalide. Exemple : 06 12 34 56 78",
    next:     'service',
  },
  service: {
    ask:      "Quel type de **prestation** souhaitez-vous ?",
    field:    'serviceType',
    buttons:  [
      { label: '🏠 Résidentiel — dès 80 €',     value: 'residential' },
      { label: '✨ Nettoyage profond — dès 150 €', value: 'deep' },
      { label: '📦 Déménagement — dès 200 €',    value: 'move' },
      { label: '🏢 Commercial — sur devis',       value: 'commercial' },
    ],
    validate: (v) => ['residential','deep','move','commercial'].includes(v),
    next:     'date',
  },
  date: {
    ask:      "Quelle **date** vous convient ? *(JJ/MM/AAAA)*",
    field:    'date',
    validate: (v) => {
      const iso = v.includes('/') ? v.split('/').reverse().join('-') : v
      const d = new Date(iso)
      return !isNaN(d.getTime()) && d >= new Date(new Date().setHours(0,0,0,0))
    },
    error:    "Date invalide ou passée. Exemple : 25/05/2026",
    next:     'time',
  },
  time: {
    ask:      "À quelle **heure** préférez-vous ?",
    field:    'time',
    buttons:  [
      { label: '08:00', value: '08:00' },
      { label: '09:00', value: '09:00' },
      { label: '10:00', value: '10:00' },
      { label: '11:00', value: '11:00' },
      { label: '13:00', value: '13:00' },
      { label: '14:00', value: '14:00' },
      { label: '15:00', value: '15:00' },
      { label: '16:00', value: '16:00' },
    ],
    validate: (v) => /^\d{2}:\d{2}$/.test(v),
    next:     'address',
  },
  address: {
    ask:      "Quelle est l'**adresse complète** du logement à nettoyer ?\n*(rue, code postal, ville)*",
    field:    'address',
    validate: (v) => v.trim().length >= 8,
    error:    "Merci d'indiquer une adresse complète.",
    next:     'confirm',
  },
}

const SERVICE_LABELS = {
  residential: 'Résidentiel',
  deep:        'Nettoyage profond',
  move:        'Déménagement',
  commercial:  'Commercial',
}

// ─── Local FAQ fallback (used when AI API is unavailable) ─────────────────────
function localReply(text) {
  const t = text.toLowerCase()
  if (t.includes('réserv') || t.includes('book') || t.includes('rendez') || t.includes('planif'))
    return '__start_booking__'
  if (t.includes('tarif') || t.includes('prix') || t.includes('coût') || t.includes('service'))
    return "Nos prestations :\n\n• **Résidentiel** – dès 80 €\n• **Nettoyage profond** – dès 150 €\n• **Déménagement** – dès 200 €\n• **Commercial** – sur devis\n\nSouhaitez-vous **réserver** ?"
  if (t.includes('assur') || t.includes('sécur') || t.includes('vérifié') || t.includes('confian'))
    return "Absolument. Chaque spécialiste Teraby est **contrôlé, cautionné et assuré**. Nous couvrons toute responsabilité civile pour votre tranquillité."
  if (t.includes('produit') || t.includes('écolog') || t.includes('chimique') || t.includes('enfant') || t.includes('animal'))
    return "Nous utilisons exclusivement des **produits certifiés éco-responsables** — sûrs pour les enfants et animaux, efficaces au niveau professionnel."
  if (t.includes('délai') || t.includes('combien') || t.includes('durée') || t.includes('temps'))
    return "La durée varie selon la prestation :\n\n• Résidentiel : **2–3h**\n• Nettoyage profond : **4–6h**\n• Déménagement : **3–5h**\n\nNous vous confirmons l'heure exacte lors de la réservation."
  if (t.includes('horaire') || t.includes('disponible') || t.includes('heure'))
    return "Nous intervenons **7j/7 de 8h à 18h**, y compris les jours fériés. Réservez dès maintenant pour bloquer votre créneau."
  if (t.includes('zone') || t.includes('paris') || t.includes('secteur') || t.includes('quartier'))
    return "Nous couvrons **tout Paris intra-muros** et la proche banlieue (92, 93, 94). Indiquez votre adresse lors de la réservation."
  return "Excellente question ! Notre équipe est disponible au **01 55 55 01 88** ou à **bonjour@teraby.fr**.\n\nPuis-je vous aider à **réserver** ou à autre chose ?"
}

// ─── Message bubble component ─────────────────────────────────────────────────
function Message({ msg, onButtonClick }) {
  const isBot = msg.role === 'bot'
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.28 }}
      className={`flex gap-2.5 ${isBot ? '' : 'flex-row-reverse'}`}
    >
      {isBot && (
        <div className="flex-shrink-0 w-7 h-7 rounded-full bg-orange-accent/15 border border-orange-accent/25 flex items-center justify-center mt-1">
          {msg.success
            ? <CheckCircle size={13} className="text-green-400" />
            : <Bot size={13} className="text-orange-accent" />
          }
        </div>
      )}
      <div className="max-w-[85%] space-y-2">
        <div
          className={`rounded-sm px-3.5 py-2.5 text-sm font-inter leading-relaxed
            ${isBot
              ? msg.success
                ? 'bg-green-500/10 text-champagne border border-green-500/20'
                : 'bg-navy-light/80 text-champagne border border-white/6'
              : 'bg-orange-accent text-white'
            }`}
          dangerouslySetInnerHTML={{
            __html: msg.text
              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              .replace(/\*(.*?)\*/g, '<em style="font-style:italic;opacity:0.7">$1</em>')
              .replace(/\n/g, '<br/>'),
          }}
        />
        {/* Inline selection buttons */}
        {msg.buttons?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {msg.buttons.map((btn) => (
              <button
                key={btn.value}
                onClick={() => onButtonClick(btn.label, btn.value)}
                className="px-3 py-1.5 rounded-full text-xs font-inter border border-orange-accent/30
                           text-orange-accent hover:bg-orange-accent hover:text-white hover:border-orange-accent
                           transition-all duration-200"
              >
                {btn.label}
              </button>
            ))}
          </div>
        )}
        <p className={`text-[10px] text-champagne/25 font-inter ${isBot ? '' : 'text-right'}`}>
          {msg.time}
        </p>
      </div>
    </motion.div>
  )
}

// ─── Main component ────────────────────────────────────────────────────────────
export default function ChatBot() {
  const now = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  const [open,      setOpen]      = useState(false)
  const [minimized, setMinimized] = useState(false)
  const [messages,  setMessages]  = useState([{
    id: 1, role: 'bot',
    text: "Bonjour ! Je suis **Luna**, votre concierge Teraby.\nComment puis-je vous aider aujourd'hui ?",
    time: now(),
  }])
  const [input,    setInput]    = useState('')
  const [typing,   setTyping]   = useState(false)
  const [unread,   setUnread]   = useState(0)
  const [submitting, setSubmitting] = useState(false)

  // Booking state machine
  const [bookingStep, setBookingStep] = useState(null)   // null = idle
  const bookingData = useRef({})
  const sessionId   = useRef(null)
  const bottomRef   = useRef(null)
  const inputRef    = useRef(null)

  useEffect(() => {
    if (open) { setUnread(0); setTimeout(() => inputRef.current?.focus(), 300) }
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const addMsg = (text, role = 'bot', extras = {}) => {
    const msg = { id: Date.now() + Math.random(), role, text, time: now(), ...extras }
    setMessages((p) => [...p, msg])
    return msg
  }

  // ── Start booking flow ──────────────────────────────────────────────────────
  const startBooking = () => {
    bookingData.current = {}
    setBookingStep('name')
    addMsg(STEPS.name.ask)
  }

  // ── Advance booking step ────────────────────────────────────────────────────
  const processBookingInput = async (rawText, buttonValue = null) => {
    const step = STEPS[bookingStep]
    if (!step) return false

    const value = buttonValue ?? rawText.trim()

    if (!step.validate(value)) {
      addMsg(step.error || "Valeur invalide. Veuillez réessayer.")
      return true
    }

    // Store field
    bookingData.current[step.field] = value

    // Show user's selection nicely for button steps
    if (buttonValue && step.buttons) {
      const btn = step.buttons.find((b) => b.value === buttonValue)
      if (btn) addMsg(btn.label, 'user')
    }

    if (step.next === 'confirm') {
      // Show summary
      setBookingStep('confirm')
      const d = bookingData.current
      const dateDisplay = d.date.includes('/')
        ? d.date
        : new Date(d.date).toLocaleDateString('fr-FR')
      addMsg(
        `✅ **Récapitulatif de votre réservation :**\n\n` +
        `👤 **Nom :** ${d.name}\n` +
        `📧 **Email :** ${d.email}\n` +
        `📱 **Tél :** ${d.phone}\n` +
        `🧹 **Prestation :** ${SERVICE_LABELS[d.serviceType]}\n` +
        `📅 **Date :** ${dateDisplay}\n` +
        `🕐 **Heure :** ${d.time}\n` +
        `📍 **Adresse :** ${d.address}\n\n` +
        `Confirmez-vous cette réservation ?`,
        'bot',
        {
          buttons: [
            { label: '✅ Confirmer', value: 'confirm' },
            { label: '✏️ Recommencer', value: 'restart' },
          ],
        }
      )
    } else {
      const next = STEPS[step.next]
      setBookingStep(step.next)
      addMsg(next.ask, 'bot', next.buttons ? { buttons: next.buttons } : {})
    }
    return true
  }

  // ── Submit booking to backend ───────────────────────────────────────────────
  const submitBooking = async () => {
    setSubmitting(true)
    setBookingStep(null)

    const d = bookingData.current
    const isoDate = d.date.includes('/')
      ? d.date.split('/').reverse().join('-')
      : d.date

    try {
      const res = await fetch(`${API}/api/bookings`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:        d.name,
          email:       d.email,
          phone:       d.phone,
          serviceType: d.serviceType,
          date:        isoDate,
          time:        d.time,
          address:     d.address,
          frequency:   'once',
        }),
      })
      const json = await res.json()
      if (json.success) {
        addMsg(
          `🎉 **Réservation confirmée !**\n\nVotre demande a bien été enregistrée. Notre équipe vous contactera sous **2h** pour confirmer le créneau.\n\nMerci de faire confiance à Teraby ! ✨`,
          'bot',
          { success: true }
        )
      } else {
        throw new Error(json.message || 'Erreur serveur')
      }
    } catch (e) {
      addMsg(`Désolé, une erreur est survenue : *${e.message}*\n\nVeuillez réessayer ou appeler le **01 55 55 01 88**.`)
    } finally {
      setSubmitting(false)
      bookingData.current = {}
    }
  }

  // ── Main send handler ───────────────────────────────────────────────────────
  const sendMessage = async (text, buttonValue = null) => {
    const trimmed = (text ?? input).trim()
    if (!trimmed && !buttonValue) return
    setInput('')

    // Add user message (unless it's a silent button trigger)
    if (!buttonValue) addMsg(trimmed, 'user')

    // ── Confirm / restart from summary ──
    if (bookingStep === 'confirm') {
      const val = buttonValue ?? trimmed.toLowerCase()
      if (val === 'confirm' || val.includes('confirm') || val.includes('oui') || val.includes('ok')) {
        await submitBooking()
      } else if (val === 'restart' || val.includes('recom') || val.includes('non')) {
        bookingData.current = {}
        setBookingStep('name')
        addMsg("Pas de problème, reprenons depuis le début.\n\n" + STEPS.name.ask)
      } else {
        addMsg("Répondez **Confirmer** pour valider ou **Recommencer** pour modifier.")
      }
      return
    }

    // ── Active booking step ──
    if (bookingStep && bookingStep !== 'confirm') {
      await processBookingInput(trimmed, buttonValue)
      return
    }

    // ── Idle: start booking if keyword matches ──
    const lower = trimmed.toLowerCase()
    const localAnswer = localReply(lower)
    if (localAnswer === '__start_booking__') {
      startBooking()
      return
    }

    // ── Try AI, fallback to local ──
    setTyping(true)
    try {
      const res = await fetch(`${API}/api/ai/chat`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed, sessionId: sessionId.current }),
      })
      const data = await res.json()
      if (data.data?.sessionId) sessionId.current = data.data.sessionId
      setTyping(false)
      const reply = data.data?.reply || localAnswer
      if (reply.includes('réserv') || reply.includes('formulaire')) {
        addMsg(reply)
      } else {
        addMsg(reply)
      }
    } catch {
      setTyping(false)
      addMsg(localAnswer)
    }

    if (!open) setUnread((p) => p + 1)
  }

  const handleButton = (label, value) => {
    if (value === 'book') { startBooking(); return }
    if (value === 'services') { addMsg(label, 'user'); addMsg(localReply('service')); return }
    if (value === 'insured')  { addMsg(label, 'user'); addMsg(localReply('assur')); return }
    if (value === 'products') { addMsg(label, 'user'); addMsg(localReply('produit')); return }
    sendMessage(label, value)
  }

  const showQuickActions = messages.length <= 2 && !bookingStep

  return (
    <>
      {/* Floating button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: 'spring', stiffness: 200 }}
        onClick={() => { setOpen(true); setMinimized(false) }}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-orange-accent shadow-orange-glow
                    flex items-center justify-center transition-all duration-300 hover:bg-orange-hover hover:scale-110
                    ${open ? 'scale-0 opacity-0 pointer-events-none' : ''}`}
      >
        <MessageCircle size={24} className="text-white" />
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-[10px] text-white font-bold flex items-center justify-center">
            {unread}
          </span>
        )}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="chatbot-panel"
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 40 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-24px)] rounded-sm overflow-hidden shadow-luxury flex flex-col"
            style={{ maxHeight: minimized ? 'auto' : '560px' }}
          >
            {/* Header */}
            <div className="bg-navy-light border-b border-white/8 px-4 py-3.5 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-orange-accent/15 border border-orange-accent/30 flex items-center justify-center">
                  <Sparkles size={15} className="text-orange-accent" />
                </div>
                <div>
                  <p className="font-inter font-semibold text-sm text-white">Luna</p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-[10px] text-champagne/40 font-inter">
                      {bookingStep
                        ? `Réservation — étape ${Object.keys(STEPS).indexOf(bookingStep) + 1}/${Object.keys(STEPS).length}`
                        : 'En ligne · Répond instantanément'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setMinimized((p) => !p)}
                  className="p-1.5 rounded-sm text-champagne/40 hover:text-champagne hover:bg-white/5 transition-all"
                >
                  <Minimize2 size={15} />
                </button>
                <button
                  onClick={() => { setOpen(false); setBookingStep(null); bookingData.current = {} }}
                  className="p-1.5 rounded-sm text-champagne/40 hover:text-champagne hover:bg-white/5 transition-all"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {!minimized && (
              <>
                {/* Booking progress bar */}
                {bookingStep && bookingStep !== 'confirm' && (
                  <div className="flex-shrink-0 bg-navy-dark/60 px-4 py-1.5">
                    <div className="flex gap-1">
                      {Object.keys(STEPS).map((s, i) => (
                        <div
                          key={s}
                          className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                            i <= Object.keys(STEPS).indexOf(bookingStep)
                              ? 'bg-orange-accent'
                              : 'bg-white/10'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-navy-deeper/95 min-h-[300px] max-h-[400px]">
                  {messages.map((msg) => (
                    <Message key={msg.id} msg={msg} onButtonClick={handleButton} />
                  ))}

                  {(typing || submitting) && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-2.5"
                    >
                      <div className="w-7 h-7 rounded-full bg-orange-accent/15 border border-orange-accent/25 flex items-center justify-center">
                        <Bot size={13} className="text-orange-accent" />
                      </div>
                      <div className="bg-navy-light/80 border border-white/6 rounded-sm px-4 py-3 flex gap-1.5 items-center">
                        {[0,1,2].map((i) => (
                          <motion.span
                            key={i}
                            className="w-1.5 h-1.5 rounded-full bg-champagne/40"
                            animate={{ opacity: [0.3,1,0.3], y: [0,-4,0] }}
                            transition={{ duration: 0.9, delay: i * 0.15, repeat: Infinity }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Quick actions on first open */}
                  {showQuickActions && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="flex flex-wrap gap-2 pt-1"
                    >
                      {QUICK_ACTIONS.map((a) => (
                        <button
                          key={a.action}
                          onClick={() => handleButton(a.label, a.action)}
                          className="px-3 py-1.5 rounded-full border border-orange-accent/25 text-orange-accent
                                     text-xs font-inter hover:bg-orange-accent hover:text-white hover:border-orange-accent
                                     transition-all duration-200"
                        >
                          {a.label}
                        </button>
                      ))}
                    </motion.div>
                  )}

                  <div ref={bottomRef} />
                </div>

                {/* Input */}
                <div className="bg-navy-light/90 border-t border-white/8 p-3 flex gap-2 flex-shrink-0">
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                    placeholder={
                      bookingStep && bookingStep !== 'confirm'
                        ? STEPS[bookingStep]?.buttons
                          ? 'Cliquez un bouton ci-dessus...'
                          : 'Votre réponse...'
                        : 'Posez votre question...'
                    }
                    disabled={submitting || (bookingStep && STEPS[bookingStep]?.buttons && bookingStep !== 'confirm')}
                    className="flex-1 bg-navy-deeper/50 border border-white/8 rounded-sm px-3.5 py-2 text-sm
                               font-inter text-champagne placeholder-champagne/25 outline-none
                               focus:border-orange-accent/40 transition-colors
                               disabled:opacity-40 disabled:cursor-not-allowed"
                  />
                  <button
                    onClick={() => sendMessage()}
                    disabled={!input.trim() || submitting || (bookingStep && STEPS[bookingStep]?.buttons && bookingStep !== 'confirm')}
                    className="w-9 h-9 flex items-center justify-center rounded-sm bg-orange-accent text-white
                               hover:bg-orange-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Send size={15} />
                  </button>
                </div>

                <div className="bg-navy-light/90 pb-2 text-center flex-shrink-0">
                  <p className="text-[10px] text-champagne/20 font-inter">Teraby IA · Urgences : 01 55 55 01 88</p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
