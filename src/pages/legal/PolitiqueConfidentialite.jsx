import LegalPage, { Section } from './LegalPage'

export default function PolitiqueConfidentialite() {
  return (
    <LegalPage
      label="Légal"
      title="Politique de confidentialité"
      lastUpdated="27 mai 2025"
    >
      <Section title="1. Responsable du traitement">
        <p>
          Teraby SAS, société par actions simplifiée au capital de [montant] euros,
          immatriculée au RCS de Paris sous le numéro [numéro SIRET], dont le siège social est
          situé à Paris, France, est responsable du traitement de vos données personnelles.
        </p>
        <p>
          Contact : <a href="mailto:contact@teraby.fr" className="text-orange-accent hover:text-orange-light transition-colors">contact@teraby.fr</a>
        </p>
      </Section>

      <Section title="2. Données collectées">
        <p>Nous collectons les données suivantes :</p>
        <ul className="list-disc pl-5 space-y-1 text-champagne/55">
          <li>Informations de contact (nom, email, téléphone) lors de la prise de rendez-vous</li>
          <li>Données de navigation et d'utilisation du site (avec votre consentement)</li>
          <li>Adresse postale pour la réalisation de nos services</li>
        </ul>
      </Section>

      <Section title="3. Finalités du traitement">
        <p>Vos données sont utilisées pour :</p>
        <ul className="list-disc pl-5 space-y-1 text-champagne/55">
          <li>La gestion de vos réservations et la prestation de nos services</li>
          <li>La communication commerciale (avec votre consentement)</li>
          <li>L'amélioration de notre site et de nos services</li>
          <li>Le respect de nos obligations légales</li>
        </ul>
      </Section>

      <Section title="4. Base légale">
        <p>
          Les traitements reposent sur : l'exécution d'un contrat (réservations),
          votre consentement (cookies analytiques et marketing), et nos intérêts légitimes
          (amélioration de nos services).
        </p>
      </Section>

      <Section title="5. Durée de conservation">
        <p>
          Vos données sont conservées pour la durée nécessaire à la réalisation des finalités
          pour lesquelles elles ont été collectées, dans le respect des obligations légales
          (3 ans pour les données prospects, durée contractuelle pour les clients).
        </p>
      </Section>

      <Section title="6. Vos droits">
        <p>Conformément au RGPD, vous disposez des droits suivants :</p>
        <ul className="list-disc pl-5 space-y-1 text-champagne/55">
          <li>Droit d'accès à vos données</li>
          <li>Droit de rectification</li>
          <li>Droit à l'effacement (« droit à l'oubli »)</li>
          <li>Droit à la limitation du traitement</li>
          <li>Droit à la portabilité</li>
          <li>Droit d'opposition</li>
        </ul>
        <p className="mt-3">
          Pour exercer ces droits, contactez-nous à{' '}
          <a href="mailto:contact@teraby.fr" className="text-orange-accent hover:text-orange-light transition-colors">
            contact@teraby.fr
          </a>
          . Vous pouvez également introduire une réclamation auprès de la CNIL (
          <span className="text-champagne/40">www.cnil.fr</span>).
        </p>
      </Section>

      <Section title="7. Transferts de données">
        <p>
          Vos données ne sont pas transférées hors de l'Union européenne sans garanties appropriées.
          Certains prestataires tiers (hébergement, analytics) peuvent avoir accès à vos données
          dans le cadre de leurs missions.
        </p>
      </Section>
    </LegalPage>
  )
}
