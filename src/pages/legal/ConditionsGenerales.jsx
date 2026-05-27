import LegalPage, { Section } from './LegalPage'

export default function ConditionsGenerales() {
  return (
    <LegalPage
      label="Légal"
      title="Conditions générales de vente"
      lastUpdated="27 mai 2025"
    >
      <Section title="1. Objet">
        <p>
          Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles
          entre Teraby SAS et ses clients dans le cadre de la prestation de services de nettoyage
          professionnel.
        </p>
      </Section>

      <Section title="2. Services proposés">
        <p>Teraby propose les services suivants :</p>
        <ul className="list-disc pl-5 space-y-1 text-champagne/55">
          <li>Nettoyage résidentiel régulier</li>
          <li>Nettoyage en profondeur</li>
          <li>Nettoyage Airbnb et locations de courte durée</li>
          <li>Nettoyage commercial</li>
          <li>Nettoyage emménagement / déménagement</li>
        </ul>
      </Section>

      <Section title="3. Devis et réservation">
        <p>
          Toute prestation fait l'objet d'un devis préalable gratuit. La réservation est confirmée
          à réception du devis signé et, le cas échéant, d'un acompte. Teraby se réserve le droit
          de refuser toute demande ne correspondant pas à ses domaines d'intervention.
        </p>
      </Section>

      <Section title="4. Tarifs et paiement">
        <p>
          Les tarifs sont indiqués en euros TTC. Le paiement s'effectue par virement bancaire,
          carte bancaire ou espèces selon les modalités convenues. Tout retard de paiement
          entraîne des pénalités conformément à la législation en vigueur.
        </p>
      </Section>

      <Section title="5. Annulation et report">
        <p>
          Toute annulation doit être signalée au minimum 48 heures avant la prestation.
          En cas d'annulation tardive, un forfait d'annulation pourra être facturé.
          Un report gratuit est possible sous réserve de disponibilité.
        </p>
      </Section>

      <Section title="6. Responsabilité">
        <p>
          Teraby s'engage à exécuter ses prestations avec soin et professionnalisme.
          En cas de dommage causé lors d'une intervention, notre responsabilité est couverte
          par notre assurance professionnelle. Le client doit signaler tout dommage dans les
          24 heures suivant la prestation.
        </p>
      </Section>

      <Section title="7. Droit applicable">
        <p>
          Les présentes CGV sont soumises au droit français. Tout litige sera soumis
          à la compétence des tribunaux compétents de Paris, après tentative de résolution
          amiable.
        </p>
      </Section>

      <Section title="8. Médiation">
        <p>
          Conformément à l'article L.612-1 du Code de la consommation, vous avez la possibilité
          de recourir gratuitement à un médiateur de la consommation en cas de litige.
        </p>
      </Section>
    </LegalPage>
  )
}
