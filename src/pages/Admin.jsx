import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  LayoutDashboard, Calendar, ImagePlus, Users, Settings,
  DollarSign, Star, Clock, ChevronRight,
  Upload, Trash2, Eye, CheckCircle, XCircle, AlertCircle, X
} from 'lucide-react'

const adminStats = [
  { label: 'Réservations Totales', value: '142', change: '+12 %', icon: Calendar, color: 'text-blue-400' },
  { label: 'Chiffre d\'Affaires', value: '24 800 €', change: '+8 %', icon: DollarSign, color: 'text-green-400' },
  { label: 'Note Moyenne', value: '4,97', change: '+0,02', icon: Star, color: 'text-orange-accent' },
  { label: 'Réservations en Attente', value: '7', change: '-2', icon: Clock, color: 'text-yellow-400' },
]

const recentBookings = [
  { id: 'RES-001', client: 'Sarah Mitchell', service: 'Nettoyage en Profondeur', date: '15/04/2025', time: '10h00', status: 'confirmed', amount: '299 €' },
  { id: 'RES-002', client: 'Robert Huang', service: 'Résidentiel', date: '15/04/2025', time: '14h00', status: 'pending', amount: '149 €' },
  { id: 'RES-003', client: 'Amanda Foster', service: 'Déménagement', date: '16/04/2025', time: '9h00', status: 'confirmed', amount: '249 €' },
  { id: 'RES-004', client: 'Carlos Rivera', service: 'Commercial', date: '16/04/2025', time: '18h00', status: 'confirmed', amount: '580 €' },
  { id: 'RES-005', client: 'Diana Lee', service: 'Nettoyage en Profondeur', date: '17/04/2025', time: '11h00', status: 'cancelled', amount: '299 €' },
]

const galleryUploads = [
  { id: 1, title: 'Appartement Quai de Seine', service: 'Nettoyage Profond', date: '10/04/2025', status: 'published' },
  { id: 2, title: 'Complexe de Bureaux', service: 'Commercial', date: '11/04/2025', status: 'published' },
  { id: 3, title: 'Maison Familiale', service: 'Résidentiel', date: '12/04/2025', status: 'draft' },
]

const statusBadge = {
  confirmed: { label: 'Confirmé', color: 'text-green-400 bg-green-400/10 border-green-400/20' },
  pending: { label: 'En Attente', color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20' },
  cancelled: { label: 'Annulé', color: 'text-red-400 bg-red-400/10 border-red-400/20' },
  published: { label: 'Publié', color: 'text-green-400 bg-green-400/10 border-green-400/20' },
  draft: { label: 'Brouillon', color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20' },
}

function StatusBadge({ status }) {
  const { label, color } = statusBadge[status] || {}
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-inter font-semibold border ${color}`}>
      {label}
    </span>
  )
}

const navItems = [
  { id: 'overview', label: 'Vue d\'ensemble', icon: LayoutDashboard },
  { id: 'bookings', label: 'Réservations', icon: Calendar },
  { id: 'gallery', label: 'Galerie', icon: ImagePlus },
  { id: 'team', label: 'Équipe', icon: Users },
  { id: 'settings', label: 'Paramètres', icon: Settings },
]

function Sidebar({ active, setActive, collapsed, setCollapsed }) {
  return (
    <div
      className={`fixed left-0 top-0 h-full bg-navy-deeper border-r border-white/5 z-30 transition-all duration-300
        ${collapsed ? 'w-16' : 'w-56'}`}
    >
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/5">
        <img
          src="/logo.png"
          alt="Teraby"
          className={`h-8 w-auto flex-shrink-0 transition-all duration-300 ${collapsed ? 'mx-auto' : ''}`}
        />
        {!collapsed && (
          <span className="font-playfair text-base font-bold text-white whitespace-nowrap">
            Admin
          </span>
        )}
        <button
          onClick={() => setCollapsed((p) => !p)}
          className="ml-auto text-champagne/30 hover:text-champagne transition-colors"
        >
          {collapsed ? <ChevronRight size={16} /> : <X size={16} />}
        </button>
      </div>

      <nav className="p-3 space-y-1">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActive(id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm font-inter font-medium
              transition-all duration-200
              ${active === id
                ? 'bg-orange-accent/10 text-orange-accent border border-orange-accent/20'
                : 'text-champagne/50 hover:text-champagne hover:bg-white/5'
              }`}
          >
            <Icon size={16} className="flex-shrink-0" />
            {!collapsed && <span>{label}</span>}
          </button>
        ))}
      </nav>
    </div>
  )
}

function Overview() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-playfair text-2xl font-bold text-white mb-1">Vue d'Ensemble</h2>
        <p className="font-inter text-sm text-champagne/40">Bienvenue, Elena. Voici ce qui se passe.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {adminStats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass-card rounded-sm p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <stat.icon size={20} className={stat.color} />
              <span className={`font-inter text-xs font-semibold ${
                stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
              }`}>
                {stat.change}
              </span>
            </div>
            <p className="font-playfair text-3xl font-bold text-white">{stat.value}</p>
            <p className="font-inter text-xs text-champagne/40 mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="glass-card rounded-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-white/6 flex items-center justify-between">
          <h3 className="font-inter font-semibold text-white text-sm">Réservations Récentes</h3>
          <button className="text-orange-accent text-xs font-inter hover:underline">Voir Tout →</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                {['ID', 'Client', 'Service', 'Date & Heure', 'Montant', 'Statut', 'Actions'].map((h) => (
                  <th key={h} className="text-left px-6 py-3 font-inter text-xs font-semibold text-champagne/30 tracking-wide uppercase">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((booking, i) => (
                <motion.tr
                  key={booking.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.06 }}
                  className="border-b border-white/3 hover:bg-white/2 transition-colors"
                >
                  <td className="px-6 py-4 font-mono text-xs text-champagne/40">{booking.id}</td>
                  <td className="px-6 py-4 font-inter text-sm text-white font-medium">{booking.client}</td>
                  <td className="px-6 py-4 font-inter text-sm text-champagne/60">{booking.service}</td>
                  <td className="px-6 py-4 font-inter text-xs text-champagne/50">{booking.date}<br />{booking.time}</td>
                  <td className="px-6 py-4 font-inter text-sm text-green-400 font-semibold">{booking.amount}</td>
                  <td className="px-6 py-4"><StatusBadge status={booking.status} /></td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="text-champagne/30 hover:text-champagne transition-colors"><Eye size={14} /></button>
                      {booking.status === 'pending' && (
                        <>
                          <button className="text-green-400/60 hover:text-green-400 transition-colors"><CheckCircle size={14} /></button>
                          <button className="text-red-400/60 hover:text-red-400 transition-colors"><XCircle size={14} /></button>
                        </>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function GalleryManager() {
  const [dragging, setDragging] = useState(false)

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-playfair text-2xl font-bold text-white mb-1">Gestionnaire de Galerie</h2>
        <p className="font-inter text-sm text-champagne/40">Importez et gérez vos contenus avant/après.</p>
      </div>

      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false) }}
        className={`border-2 border-dashed rounded-sm p-12 text-center transition-all duration-300 cursor-pointer
          ${dragging ? 'border-orange-accent/60 bg-orange-accent/5' : 'border-white/10 hover:border-white/20 hover:bg-white/2'}`}
      >
        <Upload size={32} className="text-champagne/30 mx-auto mb-4" />
        <p className="font-inter font-medium text-champagne/60 mb-1">Déposez vos images ou vidéos ici</p>
        <p className="font-inter text-xs text-champagne/30">PNG, JPG, MP4 jusqu'à 50 Mo</p>
        <button className="btn-primary text-sm mt-5 py-2.5 px-6">Parcourir les Fichiers</button>
      </div>

      <div className="glass-card rounded-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-white/6">
          <h3 className="font-inter font-semibold text-white text-sm">Éléments de la Galerie</h3>
        </div>
        <div className="divide-y divide-white/4">
          {galleryUploads.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center justify-between px-6 py-4 hover:bg-white/2 transition-colors"
            >
              <div>
                <p className="font-inter text-sm text-white font-medium">{item.title}</p>
                <p className="font-inter text-xs text-champagne/40 mt-0.5">{item.service} · {item.date}</p>
              </div>
              <div className="flex items-center gap-4">
                <StatusBadge status={item.status} />
                <div className="flex gap-2">
                  <button className="text-champagne/30 hover:text-champagne transition-colors"><Eye size={14} /></button>
                  <button className="text-red-400/40 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

function PlaceholderPanel({ title, description }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <AlertCircle size={48} className="text-champagne/15 mb-5" />
      <h2 className="font-playfair text-2xl font-bold text-white mb-3">{title}</h2>
      <p className="font-inter text-champagne/40 text-sm max-w-sm">{description}</p>
      <div className="mt-8 glass-card px-6 py-3 rounded-sm">
        <p className="font-inter text-xs text-orange-accent">🔒 Disponible en v2.0 — Intégration backend requise</p>
      </div>
    </div>
  )
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [collapsed, setCollapsed] = useState(false)

  const sidebarWidth = collapsed ? 64 : 224

  const panels = {
    overview: <Overview />,
    bookings: <PlaceholderPanel title="Gestion des Réservations" description="CRUD complet des réservations, vue calendrier et système de notifications. Connectez votre API backend pour activer." />,
    gallery: <GalleryManager />,
    team: <PlaceholderPanel title="Gestion de l'Équipe" description="Ajouter, modifier et planifier les membres de l'équipe. Connectez votre API backend pour activer." />,
    settings: <PlaceholderPanel title="Paramètres" description="Configuration du site, préférences de notification et intégrations. Connectez votre backend pour activer." />,
  }

  return (
    <div className="min-h-screen bg-navy flex">
      <Sidebar active={activeTab} setActive={setActiveTab} collapsed={collapsed} setCollapsed={setCollapsed} />

      <main
        className="flex-1 overflow-auto transition-all duration-300"
        style={{ marginLeft: sidebarWidth }}
      >
        <div className="max-w-6xl mx-auto p-6 md:p-8 pt-8">
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/5">
            <div />
            <div className="flex items-center gap-3">
              <span className="font-inter text-xs text-champagne/30">v1.0 — Prototype</span>
              <div className="w-8 h-8 rounded-full bg-orange-accent/20 border border-orange-accent/30 flex items-center justify-center">
                <span className="text-orange-accent text-xs font-bold">EV</span>
              </div>
            </div>
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {panels[activeTab]}
          </motion.div>
        </div>
      </main>
    </div>
  )
}
