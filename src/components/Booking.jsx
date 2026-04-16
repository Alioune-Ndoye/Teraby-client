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
import DollarSign from 'lucide-react/dist/esm/icons/dollar-sign'

const serviceOptions = [
  { value: 'residential', label: 'Nettoyage Résidentiel', price: 149 },
  { value: 'deep', label: 'Nettoyage en Profondeur', price: 299 },
  { value: 'move', label: 'Emménagement / Déménagement', price: 249 },
  { value: 'commercial', label: 'Nettoyage Commercial', price: 0 },
]

const frequencyOptions = [
  { value: 'once', label: 'Une seule fois', multiplier: 1 },
  { value: 'monthly', label: 'Mensuel (–10 %)', multiplier: 0.9 },
  { value: 'biweekly', label: 'Bimensuel (–15 %)', multiplier: 0.85 },
  { value: 'weekly', label: 'Hebdomadaire (–20 %)', multiplier: 0.8 },
]

const timeSlots = [
  '08:00', '09:00', '10:00', '11:00',
  '12:00', '13:00', '14:00', '15:00', '16:00',
]

const InputField = forwardRef(function InputField({ label, icon: Icon, error, ...props }, ref) {
  return (
    <div>
      <label className="luxury-label">{label}</label>
      <div className="relative">
        {Icon && (
          <Icon
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-champagne/30 pointer-events-none"
          />
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

export default function Booking() {
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [selectedService, setSelectedService] = useState(serviceOptions[0])
  const [selectedFrequency, setSelectedFrequency] = useState(frequencyOptions[0])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',          // show errors as soon as a field is left
    defaultValues: {
      name:    '',
      email:   '',
      phone:   '',
      address: '',
      date:    '',
      time:    '08:00',      // pre-select first slot so the field is never empty
      notes:   '',
    },
  })

  const estimatedPrice =
    selectedService.price > 0
      ? Math.round(selectedService.price * selectedFrequency.multiplier)
      : null

  const onSubmit = async (data) => {
    setStatus('loading')
    setErrorMsg('')
    const payload = {
      name:        data.name.trim(),
      email:       data.email.trim(),
      phone:       data.phone.trim(),
      address:     data.address.trim(),
      notes:       data.notes?.trim() || undefined,
      date:        data.date,
      time:        data.time,
      serviceType: selectedService.value,
      frequency:   selectedFrequency.value,
    }
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) {
        // Show first validation error if available, otherwise generic message
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
    setSelectedService(serviceOptions[0])
    setSelectedFrequency(frequencyOptions[0])
  }

  return (
    <section id="booking" className="relative py-28 bg-navy overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-accent/30 to-transparent" />
      <div className="absolute right-0 top-1/4 w-[600px] h-[600px] bg-orange-accent/5 blur-[180px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left — Copy */}
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

            <div className="space-y-4">
              {[
                { icon: '✓', text: 'Spécialistes entièrement assurés et cautionnés' },
                { icon: '✓', text: 'Satisfaction garantie ou nous revenons gratuitement' },
                { icon: '✓', text: 'Réservation sécurisée — aucune carte requise' },
                { icon: '✓', text: 'Politique d\'annulation 24 heures' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3 font-inter text-sm text-champagne/65">
                  <span className="text-orange-accent font-bold">{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>

            {estimatedPrice && (
              <motion.div
                layout
                className="mt-10 glass-card-light rounded-sm p-6 border border-orange-accent/15"
              >
                <div className="flex items-center gap-2 mb-3">
                  <DollarSign size={16} className="text-orange-accent" />
                  <span className="font-inter text-xs font-semibold text-orange-accent tracking-widest uppercase">
                    Prix Estimé
                  </span>
                </div>
                <div className="font-playfair text-5xl font-bold text-white">
                  {estimatedPrice} €
                  <span className="text-champagne/40 text-lg ml-1 font-inter">/ visite</span>
                </div>
                {selectedFrequency.value !== 'once' && (
                  <p className="font-inter text-xs text-champagne/40 mt-2">
                    Remise récurrente appliquée · Prix final confirmé sur place
                  </p>
                )}
              </motion.div>
            )}
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
                      // Surface the first failing field so it's visible in the UI
                      const firstError = Object.values(validationErrors)[0]
                      const msg = firstError?.message || 'Veuillez remplir tous les champs requis.'
                      setErrorMsg(msg)
                      setStatus('error')
                      setTimeout(() => setStatus('idle'), 5000)
                    })}
                    className="space-y-5"
                  >
                    <h3 className="font-playfair text-2xl font-bold text-white mb-6">
                      Planifier Votre Service
                    </h3>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <InputField
                        label="Nom Complet"
                        icon={User}
                        placeholder="Marie Dupont"
                        autoComplete="name"
                        error={errors.name}
                        {...register('name', {
                          required: 'Le nom est requis',
                          validate: v => v.trim().length >= 2 || 'Merci d\'entrer votre nom complet',
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
                        required: 'L\'e-mail est requis',
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
                        required: 'L\'adresse est requise',
                        validate: v => v.trim().length >= 5 || 'Merci d\'indiquer une adresse complète',
                      })}
                    />

                    <div>
                      <label className="luxury-label">Type de Service</label>
                      <div className="grid grid-cols-2 gap-3">
                        {serviceOptions.map((opt) => (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => setSelectedService(opt)}
                            className={`px-3 py-2.5 rounded-sm border text-left transition-all duration-200 font-inter text-sm
                              ${selectedService.value === opt.value
                                ? 'border-orange-accent/60 bg-orange-accent/8 text-champagne'
                                : 'border-white/8 bg-navy-light/30 text-champagne/50 hover:border-white/20 hover:text-champagne/75'
                              }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

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
                            {...register('time', { required: 'L\'heure est requise' })}
                          >
                            {timeSlots.map((t) => (
                              <option key={t} value={t} className="bg-navy text-champagne">
                                {t}
                              </option>
                            ))}
                          </select>
                          <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-champagne/30 pointer-events-none" />
                        </div>
                        {errors.time && <p className="mt-1.5 text-xs text-red-400 font-inter">{errors.time.message}</p>}
                      </div>
                    </div>

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

                    {status === 'error' && (
                      <p className="text-sm text-red-400 font-inter text-center py-2 border border-red-400/20 rounded-sm bg-red-400/5">
                        {errorMsg || 'Une erreur est survenue. Veuillez réessayer.'}
                      </p>
                    )}

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
