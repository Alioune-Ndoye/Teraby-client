import { useCookieConsent } from '../../context/CookieConsentContext'
import LegalPage, { Section } from './LegalPage'

export default function PolitiqueCookies() {
  const { reopenSettings } = useCookieConsent()

  return (
    <LegalPage
      label="Légal"
      title="Politique des cookies"
      lastUpdated="27 mai 2025"
    >
      <Section title="1. Qu'est-ce qu'un cookie ?">
        <p>
          Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, tablette,
          smartphone) lors de la visite d'un site internet. Il permet au site de mémoriser
          vos actions et préférences pendant une période déterminée.
        </p>
      </Section>

      <Section title="2. Les cookies que nous utilisons">
        <div className="space-y-4">
          <div className="rounded-sm border border-white/8 bg-white/2 p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-semibold text-white text-sm">Cookies essentiels</span>
              <span className="text-[10px] font-medium text-orange-accent bg-orange-accent/10
                               border border-orange-accent/20 px-1.5 py-0.5 rounded-sm">
                Toujours actifs
              </span>
            </div>
            <p>
              Ces cookies sont indispensables au fonctionnement du site. Ils ne peuvent pas être
              désactivés. Ils incluent notamment les cookies de session et de sécurité.
            </p>
          </div>

          <div className="rounded-sm border border-white/8 bg-white/2 p-4">
            <p className="font-semibold text-white text-sm mb-2">Cookies analytiques</p>
            <p>
              Avec votre consentement, nous utilisons des outils comme Google Analytics pour
              mesurer l'audience du site et améliorer nos contenus. Ces données sont anonymisées.
            </p>
          </div>

          <div className="rounded-sm border border-white/8 bg-white/2 p-4">
            <p className="font-semibold text-white text-sm mb-2">Cookies marketing</p>
            <p>
              Avec votre consentement, des cookies tiers (Meta Pixel, etc.) peuvent être déposés
              pour vous proposer des publicités pertinentes sur d'autres plateformes.
            </p>
          </div>
        </div>
      </Section>

      <Section title="3. Durée de conservation">
        <p>
          Les cookies analytiques et marketing sont conservés pour une durée maximale de 13 mois,
          conformément aux recommandations de la CNIL. Les cookies essentiels sont supprimés
          à la fermeture de votre session.
        </p>
      </Section>

      <Section title="4. Gérer vos préférences">
        <p>
          Vous pouvez à tout moment modifier vos préférences de cookies en cliquant sur le bouton
          ci-dessous. Vous pouvez également configurer votre navigateur pour refuser les cookies.
        </p>
        <div className="mt-4">
          <button
            onClick={reopenSettings}
            className="inline-flex items-center gap-2 font-inter text-sm font-semibold text-white
                       bg-orange-accent hover:bg-orange-hover px-6 py-3 rounded-sm
                       transition-all duration-200 hover:shadow-[0_0_20px_rgba(204,85,0,0.3)]"
          >
            Gérer mes préférences de cookies
          </button>
        </div>
      </Section>

      <Section title="5. Pour en savoir plus">
        <p>
          Pour plus d'informations sur les cookies et votre vie privée, vous pouvez consulter
          le site de la Commission Nationale de l'Informatique et des Libertés (CNIL) :
          <span className="text-champagne/40"> www.cnil.fr</span>
        </p>
      </Section>
    </LegalPage>
  )
}
