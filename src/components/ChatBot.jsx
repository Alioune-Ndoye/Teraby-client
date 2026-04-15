import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Sparkles, Minimize2, Bot } from 'lucide-react'
import { faqItems } from '../data/sampleData'

const INITIAL_MESSAGES = [
  {
    id: 1,
    role: 'bot',
    text: "Bonjour ! Je suis Luna, votre concierge de nettoyage personnel. Comment puis-je vous aider aujourd'hui ?",
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  },
]

const QUICK_ACTIONS = [
  { label: 'Réserver un nettoyage', action: 'book' },
  { label: 'Voir les services & tarifs', action: 'services' },
  { label: 'Êtes-vous assurés ?', action: 'insured' },
  { label: 'Quels produits utilisez-vous ?', action: 'products' },
]

const botResponses = {
  book: "Je serais ravie de vous aider à planifier un nettoyage ! Vous pouvez réserver directement sur notre site en faisant défiler jusqu'à la section **Réservation**, ou nous appeler au **01 55 55 01 88**. Puis-je vous guider dans le processus ?",
  services:
    'Nous proposons quatre services premium :\n\n• **Nettoyage Résidentiel** – À partir de 149 €\n• **Nettoyage en Profondeur** – À partir de 299 €\n• **Emménagement/Déménagement** – À partir de 249 €\n• **Nettoyage Commercial** – Devis personnalisé\n\nLequel vous intéresse ?',
  insured:
    'Absolument. Chaque spécialiste Teraby est **entièrement contrôlé, cautionné et assuré**. Nous disposons également d\'une assurance responsabilité civile pour votre totale tranquillité d\'esprit.',
  products:
    'Nous utilisons exclusivement des **produits de nettoyage premium certifiés écologiques** — sûrs pour les enfants, les animaux et l\'environnement, tout en offrant des résultats de niveau professionnel.',
  default: (msg) => {
    const matched = faqItems.find((f) =>
      f.q.toLowerCase().includes(msg.toLowerCase().split(' ')[0])
    )
    return matched
      ? matched.a
      : "Excellente question ! Pour des demandes spécifiques, notre équipe est disponible au **01 55 55 01 88** ou à **bonjour@teraby.fr**. Puis-je vous aider avec autre chose ?"
  },
}

function Message({ msg }) {
  const isBot = msg.role === 'bot'
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-2.5 ${isBot ? '' : 'flex-row-reverse'}`}
    >
      {isBot && (
        <div className="flex-shrink-0 w-7 h-7 rounded-full bg-orange-accent/15 border border-orange-accent/25 flex items-center justify-center mt-1">
          <Bot size={13} className="text-orange-accent" />
        </div>
      )}
      <div className={`max-w-[80%]`}>
        <div
          className={`rounded-sm px-3.5 py-2.5 text-sm font-inter leading-relaxed
            ${isBot
              ? 'bg-navy-light/80 text-champagne border border-white/6'
              : 'bg-orange-accent text-white'
            }`}
          dangerouslySetInnerHTML={{
            __html: msg.text
              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              .replace(/\*(.*?)\*/g, '<em>$1</em>')
              .replace(/\n/g, '<br/>'),
          }}
        />
        <p className={`text-[10px] text-champagne/30 mt-1 font-inter ${isBot ? '' : 'text-right'}`}>
          {msg.time}
        </p>
      </div>
    </motion.div>
  )
}

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [minimized, setMinimized] = useState(false)
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [unread, setUnread] = useState(0)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (open) {
      setUnread(0)
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const addMessage = (text, role = 'user') => {
    const msg = {
      id: Date.now(),
      role,
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
    setMessages((p) => [...p, msg])
    return msg
  }

  const getBotResponse = (userText) => {
    const lower = userText.toLowerCase()
    if (lower.includes('réserv') || lower.includes('book') || lower.includes('planif') || lower.includes('rendez'))
      return botResponses.book
    if (lower.includes('service') || lower.includes('prix') || lower.includes('tarif') || lower.includes('coût'))
      return botResponses.services
    if (lower.includes('assur') || lower.includes('vérifié') || lower.includes('sécur'))
      return botResponses.insured
    if (lower.includes('produit') || lower.includes('chimique') || lower.includes('écolog') || lower.includes('vert'))
      return botResponses.products
    return botResponses.default(userText)
  }

  const sessionIdRef = useRef(null)

  const sendMessage = async (text) => {
    const trimmed = (text || input).trim()
    if (!trimmed) return
    setInput('')
    addMessage(trimmed, 'user')
    setTyping(true)
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed, sessionId: sessionIdRef.current }),
      })
      const data = await res.json()
      if (data.data?.sessionId) sessionIdRef.current = data.data.sessionId
      setTyping(false)
      addMessage(data.data?.reply || getBotResponse(trimmed), 'bot')
    } catch {
      setTyping(false)
      addMessage(getBotResponse(trimmed), 'bot')
    }
    if (!open) setUnread((p) => p + 1)
  }

  const handleQuickAction = (action) => {
    sendMessage(QUICK_ACTIONS.find((a) => a.action === action)?.label || action)
  }

  const showQuickActions = messages.length <= 2

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
            initial={{ opacity: 0, scale: 0.8, y: 40, originX: 1, originY: 1 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 40 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-24px)] rounded-sm overflow-hidden shadow-luxury flex flex-col"
            style={{ maxHeight: minimized ? 'auto' : '520px' }}
          >
            {/* Header */}
            <div className="bg-navy-light border-b border-white/8 px-4 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-orange-accent/15 border border-orange-accent/30 flex items-center justify-center">
                  <Sparkles size={15} className="text-orange-accent" />
                </div>
                <div>
                  <p className="font-inter font-semibold text-sm text-white">Luna</p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-[10px] text-champagne/40 font-inter">En ligne · Répond instantanément</span>
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
                  onClick={() => setOpen(false)}
                  className="p-1.5 rounded-sm text-champagne/40 hover:text-champagne hover:bg-white/5 transition-all"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {!minimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-navy-deeper/95 min-h-[280px] max-h-[340px]">
                  {messages.map((msg) => (
                    <Message key={msg.id} msg={msg} />
                  ))}

                  {typing && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-2.5"
                    >
                      <div className="w-7 h-7 rounded-full bg-orange-accent/15 border border-orange-accent/25 flex items-center justify-center">
                        <Bot size={13} className="text-orange-accent" />
                      </div>
                      <div className="bg-navy-light/80 border border-white/6 rounded-sm px-4 py-3 flex gap-1.5 items-center">
                        {[0, 1, 2].map((i) => (
                          <motion.span
                            key={i}
                            className="w-1.5 h-1.5 rounded-full bg-champagne/40"
                            animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }}
                            transition={{ duration: 0.9, delay: i * 0.15, repeat: Infinity }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {showQuickActions && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="flex flex-wrap gap-2 pt-2"
                    >
                      {QUICK_ACTIONS.map((action) => (
                        <button
                          key={action.action}
                          onClick={() => handleQuickAction(action.action)}
                          className="px-3 py-1.5 rounded-full border border-orange-accent/25 text-orange-accent text-xs font-inter
                                     hover:bg-orange-accent hover:text-white hover:border-orange-accent transition-all duration-200"
                        >
                          {action.label}
                        </button>
                      ))}
                    </motion.div>
                  )}

                  <div ref={bottomRef} />
                </div>

                {/* Input */}
                <div className="bg-navy-light/90 border-t border-white/8 p-3 flex gap-2">
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                    placeholder="Posez votre question..."
                    className="flex-1 bg-navy-deeper/50 border border-white/8 rounded-sm px-3.5 py-2 text-sm
                               font-inter text-champagne placeholder-champagne/25 outline-none
                               focus:border-orange-accent/40 transition-colors"
                  />
                  <button
                    onClick={() => sendMessage()}
                    disabled={!input.trim()}
                    className="w-9 h-9 flex items-center justify-center rounded-sm bg-orange-accent text-white
                               hover:bg-orange-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Send size={15} />
                  </button>
                </div>

                <div className="bg-navy-light/90 pb-2 text-center">
                  <p className="text-[10px] text-champagne/20 font-inter">Propulsé par Teraby IA · Urgences : 01 55 55 01 88</p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
