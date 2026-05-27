import { useCookieConsent } from '../../context/CookieConsentContext'
import LegalPage, { Section } from './LegalPage'

export default function MentionsLegales() {
  const { reopenSettings } = useCookieConsent()

  return (
    <LegalPage
      label="Légal"
      title="Mentions légales"
      lastUpdated="27 mai 2025"
    >
      <Section title="1. Éditeur du site">
        <ul className="space-y-1 text-champagne/55">
          <li><span className="text-champagne/80 font-medium">Société :</span> Teraby SAS</li>
          <li><span className="text-champagne/80 font-medium">Forme juridique :</span> Société par actions simplifiée</li>
          <li><span className="text-champagne/80 font-medium">Capital social :</span> [Montant] €</li>
          <li><span className="text-champagne/80 font-medium">Siège social :</span> Paris, France</li>
          <li><span className="text-champagne/80 font-medium">SIRET :</span> [Numéro SIRET]</li>
          <li><span className="text-champagne/80 font-medium">TVA intracommunautaire :</span> [Numéro TVA]</li>
          <li>
            <span className="text-champagne/80 font-medium">Email :</span>{' '}
            <a href="mailto:contact@teraby.fr" className="text-orange-accent hover:text-orange-light transition-colors">
              contact@teraby.fr
            </a>
          </li>
          <li>
            <span className="text-champagne/80 font-medium">Téléphone :</span>{' '}
            <a href="tel:+33685958798" className="text-orange-accent hover:text-orange-light transition-colors">
              +33 6 85 95 87 98
            </a>
          </li>
        </ul>
      </Section>

      <Section title="2. Directeur de la publication">
        <p>Le directeur de la publication est [Nom du dirigeant], en qualité de représentant légal de Teraby SAS.</p>
      </Section>

      <Section title="3. Hébergement">
        <ul className="space-y-1 text-champagne/55">
          <li><span className="text-champagne/80 font-medium">Hébergeur :</span> [Nom de l'hébergeur]</li>
          <li><span className="text-champagne/80 font-medium">Adresse :</span> [Adresse de l'hébergeur]</li>
        </ul>
      </Section>

      <Section title="4. Propriété intellectuelle">
        <p>
          L'ensemble du contenu du site teraby.fr (textes, images, logos, vidéos) est la propriété
          exclusive de Teraby SAS et est protégé par les lois françaises et internationales relatives
          à la propriété intellectuelle. Toute reproduction, représentation ou diffusion, en tout ou
          partie, est interdite sans autorisation préalable écrite de Teraby SAS.
        </p>
      </Section>

      <Section title="5. Limitation de responsabilité">
        <p>
          Teraby SAS s'efforce d'assurer l'exactitude des informations publiées sur ce site.
          Toutefois, nous déclinons toute responsabilité quant aux éventuelles erreurs ou omissions.
          Les liens vers des sites tiers sont fournis à titre informatif uniquement.
        </p>
      </Section>

      <Section title="6. Données personnelles et cookies">
        <p>
          Pour toute information concernant la collecte et le traitement de vos données personnelles,
          veuillez consulter notre{' '}
          <a href="/confidentialite" className="text-orange-accent hover:text-orange-light transition-colors">
            Politique de confidentialité
          </a>{' '}
          et notre{' '}
          <a href="/cookies" className="text-orange-accent hover:text-orange-light transition-colors">
            Politique des cookies
          </a>.
        </p>
        <div className="mt-4">
          <button
            onClick={reopenSettings}
            className="inline-flex items-center gap-2 font-inter text-sm font-medium text-champagne/60
                       hover:text-champagne border border-white/12 hover:border-white/25
                       px-4 py-2.5 rounded-sm bg-white/3 hover:bg-white/6
                       transition-all duration-200"
          >
            Gérer mes préférences de cookies
          </button>
        </div>
      </Section>

      <Section title="7. Droit applicable">
        <p>
          Le présent site est soumis au droit français. Tout litige relatif à son utilisation
          sera soumis à la compétence exclusive des tribunaux français.
        </p>
      </Section>
    </LegalPage>
  )
}
