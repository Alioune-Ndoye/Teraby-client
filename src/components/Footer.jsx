import { Link } from 'react-router-dom'
import Camera from 'lucide-react/dist/esm/icons/camera'
import Share2 from 'lucide-react/dist/esm/icons/share-2'
import AtSign from 'lucide-react/dist/esm/icons/at-sign'
import Linkedin from 'lucide-react/dist/esm/icons/linkedin'
import Phone from 'lucide-react/dist/esm/icons/phone'
import Mail from 'lucide-react/dist/esm/icons/mail'
import MapPin from 'lucide-react/dist/esm/icons/map-pin'
import ArrowUpRight from 'lucide-react/dist/esm/icons/arrow-up-right'

const footerLinks = {
  Services: [
    { label: 'Nettoyage Résidentiel', href: '#services' },
    { label: 'Nettoyage en Profondeur', href: '#services' },
    { label: 'Emménagement / Déménagement', href: '#services' },
    { label: 'Nettoyage Commercial', href: '#services' },
  ],
  Entreprise: [
    { label: 'À Propos', href: '#' },
    { label: 'Notre Équipe', href: '#team' },
    { label: 'Galerie', href: '/gallery' },
    { label: 'Recrutement', href: '#' },
  ],
  Assistance: [
    { label: 'Réserver un Service', href: '#booking' },
    { label: 'Avis Clients', href: '#testimonials' },
    { label: 'FAQ', href: '#' },
    { label: 'Contact', href: '#contact' },
  ],
}

const socials = [
  { icon: Camera, href: '#', label: 'Instagram' },
  { icon: Share2, href: 'https://www.facebook.com/profile.php?id=61576591912817&sk=photos', label: 'Facebook' },
  { icon: AtSign, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/babacar-siby/', label: 'LinkedIn' },
]

export default function Footer() {
  const scrollTo = (href) => {
    if (href.startsWith('#')) {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer id="contact" className="relative bg-navy-deeper overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-accent/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-accent/3 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              to="/"
              className="flex items-center mb-5 group w-fit"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <img
                src="/logo.webp"
                alt="Teraby"
                width="190"
                height="80"
                loading="eager"
                className="h-10 w-auto transition-opacity duration-300 group-hover:opacity-80"
                style={{ filter: 'grayscale(1) sepia(1) saturate(4) hue-rotate(-10deg) brightness(0.82)' }}
              />
            </Link>

            <p className="font-inter text-sm text-champagne/50 leading-relaxed max-w-xs mb-7">
              Services de nettoyage haut de gamme pour les clients exigeants.
              Nous traitons votre espace avec le même soin et la même attention que vous.
            </p>

            <div className="space-y-3">
              <a href="tel:+33685958798" className="flex items-center gap-3 text-champagne/50 hover:text-champagne transition-colors group">
                <Phone size={15} className="text-orange-accent" />
                <span className="font-inter text-sm">+33 6 85 95 87 98</span>
                <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a href="mailto:contact@teraby.fr" className="flex items-center gap-3 text-champagne/50 hover:text-champagne transition-colors group">
                <Mail size={15} className="text-orange-accent" />
                <span className="font-inter text-sm">contact@teraby.fr</span>
                <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <div className="flex items-center gap-3 text-champagne/50">
                <MapPin size={15} className="text-orange-accent flex-shrink-0" />
                <span className="font-inter text-sm">Paris, France · Île-de-France & environs</span>
              </div>
            </div>

            <div className="flex gap-3 mt-7">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-sm border border-white/8 flex items-center justify-center
                             text-champagne/40 hover:text-champagne hover:border-orange-accent/40 hover:bg-orange-accent/8
                             transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="font-inter text-xs font-semibold text-champagne/40 tracking-[0.2em] uppercase mb-5">
                {section}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith('/') ? (
                      <Link
                        to={link.href}
                        className="font-inter text-sm text-champagne/55 hover:text-champagne transition-colors duration-200 group flex items-center gap-1.5"
                      >
                        {link.label}
                        <ArrowUpRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    ) : (
                      <button
                        onClick={() => scrollTo(link.href)}
                        className="font-inter text-sm text-champagne/55 hover:text-champagne transition-colors duration-200 group flex items-center gap-1.5"
                      >
                        {link.label}
                        <ArrowUpRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="glass-card rounded-sm p-6 md:p-8 mb-12">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1">
              <h4 className="font-playfair text-xl font-bold text-white mb-1">Restez Informé</h4>
              <p className="font-inter text-sm text-champagne/50">
                Offres exclusives, conseils entretien et promotions saisonnières pour notre communauté.
              </p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="votre@email.fr"
                className="luxury-input flex-1 md:w-64 text-sm py-3"
              />
              <button className="btn-primary py-3 px-6 text-sm whitespace-nowrap">
                S'inscrire
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-inter text-xs text-champagne/30">
            © 2025 Teraby SAS. Tous droits réservés. Paris, France.
          </p>
          <div className="flex items-center gap-6">
            {['Politique de Confidentialité', 'Conditions Générales', 'Mentions Légales'].map((item) => (
              <button
                key={item}
                className="font-inter text-xs text-champagne/30 hover:text-champagne/60 transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
