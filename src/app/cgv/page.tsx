import type { Metadata } from "next";
import Link from "next/link";
import PageLegale, { ARemplir, Article } from "@/components/legal/PageLegale";
import { entreprise } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Conditions générales de vente",
  description:
    "Commande, paiement, livraison, rétractation et garanties applicables aux montres My Dial.",
};

export default function CgvPage() {
  return (
    <PageLegale
      eyebrow="Conditions générales"
      titre="Conditions générales de vente"
      chapeau="Les présentes conditions régissent toute vente conclue sur ce site. Passer commande vaut acceptation sans réserve."
    >
      <Article id="article-1" titre="Article 1 — Vendeur">
        <p>
          Les montres sont vendues par <strong>{entreprise.denomination}</strong>,{" "}
          <ARemplir valeur={entreprise.formeJuridique} quoi="forme juridique" />,
          dont le siège est situé{" "}
          <ARemplir valeur={entreprise.adresse} quoi="adresse du siège" />, SIRET{" "}
          <ARemplir valeur={entreprise.siret} quoi="numéro SIRET" />. Contact :{" "}
          <a href={`mailto:${entreprise.email}`}>{entreprise.email}</a>.
        </p>
      </Article>

      <Article id="article-2" titre="Article 2 — Produits">
        <p>
          {entreprise.denomination} propose des montres mécaniques assemblées à
          la main, à partir de composants sélectionnés par ses soins. Deux modes
          d&apos;achat coexistent :
        </p>
        <ul>
          <li>
            <strong>Les modèles de la collection</strong>, proposés dans une
            configuration définie par le vendeur ;
          </li>
          <li>
            <strong>Les montres personnalisées</strong>, assemblées d&apos;après
            la combinaison de composants choisie par le client dans le
            configurateur.
          </li>
        </ul>
        <p>
          Chaque montre est une pièce modifiée, assemblée et réglée par{" "}
          {entreprise.denomination}. Elle n&apos;est ni fabriquée ni garantie par
          les titulaires des marques mentionnées à titre descriptif.
        </p>
        <p>
          Les photographies et les rendus du configurateur sont les plus fidèles
          possible. De légères variations de teinte ou de finition peuvent
          subsister, sans constituer un défaut de conformité.
        </p>
      </Article>

      <Article id="article-3" titre="Article 3 — Prix">
        <p>
          Les prix sont indiqués en euros, toutes taxes comprises.{" "}
          {entreprise.tvaIntracommunautaire
            ? "La TVA applicable est celle en vigueur au jour de la commande."
            : "TVA non applicable, article 293 B du code général des impôts."}
        </p>
        <p>
          La livraison est offerte en France métropolitaine. Le prix affiché lors
          de la validation du panier est le prix définitivement dû.
        </p>
        <p>
          {entreprise.denomination} se réserve le droit de modifier ses prix à
          tout moment ; les commandes déjà passées restent au prix en vigueur au
          moment de leur validation.
        </p>
      </Article>

      <Article id="article-4" titre="Article 4 — Commande">
        <p>
          Le client sélectionne un modèle ou compose sa montre, vérifie le
          récapitulatif détaillé, puis valide sa commande en procédant au
          paiement. Cette validation constitue une acceptation ferme des
          présentes conditions et forme le contrat de vente.
        </p>
        <p>
          Un accusé de réception est adressé par e-mail. Un horloger recontacte
          ensuite le client sous 24 heures ouvrées pour confirmer chaque
          composant avant le lancement de l&apos;assemblage.
        </p>
        <p>
          {entreprise.denomination} se réserve le droit de refuser une commande
          en cas de litige antérieur, de demande manifestement anormale ou
          d&apos;indisponibilité d&apos;un composant. Le cas échéant, la commande
          est intégralement remboursée.
        </p>
      </Article>

      <Article id="article-5" titre="Article 5 — Paiement">
        <p>
          Le paiement s&apos;effectue en ligne, au comptant, lors de la commande.
          Il est opéré par <strong>Stripe Payments Europe, Ltd.</strong> sur une
          page sécurisée hébergée par ce prestataire.{" "}
          {entreprise.denomination} n&apos;a à aucun moment connaissance des
          données bancaires du client et n&apos;en conserve aucune.
        </p>
        <p>
          Les moyens de paiement acceptés sont ceux proposés par Stripe au moment
          de la commande (carte bancaire et portefeuilles électroniques
          notamment).
        </p>
        <p>
          L&apos;assemblage n&apos;est engagé qu&apos;après encaissement effectif
          du paiement.
        </p>
      </Article>

      <Article id="article-6" titre="Article 6 — Livraison">
        <p>
          Les montres sont expédiées à l&apos;adresse indiquée par le client lors
          de la commande, dans un délai de <strong>15 à 20 jours</strong> à
          compter de la confirmation de la configuration. Ce délai tient compte
          de l&apos;assemblage, du réglage et des contrôles.
        </p>
        <p>
          Livraison offerte en France métropolitaine. Les livraisons vers la
          Belgique, la Suisse, le Luxembourg et Monaco sont possibles ; les
          éventuels droits et taxes à l&apos;importation restent à la charge du
          destinataire.
        </p>
        <p>
          En cas de retard, le client peut contacter{" "}
          <a href={`mailto:${entreprise.email}`}>{entreprise.email}</a>.
          Conformément à l&apos;article L216-6 du code de la consommation, si le
          bien n&apos;est pas livré dans un délai supplémentaire raisonnable, le
          client peut résoudre le contrat et obtenir le remboursement des sommes
          versées.
        </p>
        <p>
          Il appartient au client de vérifier l&apos;état du colis à la
          réception et d&apos;émettre toute réserve auprès du transporteur.
        </p>
      </Article>

      <Article id="article-7" titre="Article 7 — Droit de rétractation">
        <p>
          Le client consommateur dispose d&apos;un délai de{" "}
          <strong>quatorze jours</strong> à compter de la réception pour exercer
          son droit de rétractation, sans avoir à motiver sa décision
          (article L221-18 du code de la consommation). Il suffit d&apos;en
          informer {entreprise.denomination} par une déclaration dénuée
          d&apos;ambiguïté adressée à{" "}
          <a href={`mailto:${entreprise.email}`}>{entreprise.email}</a>.
        </p>
        <p>
          Le bien doit être retourné dans les quatorze jours suivant cette
          déclaration, dans son état d&apos;origine et complet. Les frais de
          retour sont à la charge du client. Le remboursement intervient dans les
          quatorze jours suivant la récupération du bien.
        </p>
        <p>
          <strong>
            Exception importante concernant les montres personnalisées.
          </strong>{" "}
          Conformément à l&apos;article L221-28 3° du code de la consommation, le
          droit de rétractation ne s&apos;applique pas aux biens confectionnés
          selon les spécifications du consommateur ou nettement personnalisés.
          Les montres composées dans le configurateur étant assemblées sur mesure
          d&apos;après la combinaison choisie par le client,{" "}
          <strong>elles ne sont ni reprises ni échangées</strong>. Le client en
          est informé avant de valider son paiement.
        </p>
        <p>
          Les modèles de la collection, proposés dans une configuration standard,
          demeurent quant à eux couverts par le droit de rétractation.
        </p>
      </Article>

      <Article id="article-8" titre="Article 8 — Garanties légales">
        <p>
          Indépendamment de toute garantie commerciale, le vendeur reste tenu des
          défauts de conformité du bien et des vices rédhibitoires.
        </p>
        <p>
          Le client bénéficie de la <strong>garantie légale de conformité</strong>{" "}
          pendant deux ans à compter de la délivrance (articles L217-3 et
          suivants du code de la consommation). Il peut choisir entre la
          réparation et le remplacement, sous réserve des conditions de coût
          prévues à l&apos;article L217-12. Il est dispensé de rapporter la
          preuve du défaut pendant les vingt-quatre mois suivant la délivrance.
        </p>
        <p>
          Le client bénéficie également de la{" "}
          <strong>garantie des vices cachés</strong> (articles 1641 et suivants
          du code civil), pendant deux ans à compter de la découverte du vice,
          lui permettant d&apos;obtenir la résolution de la vente ou une
          réduction du prix.
        </p>
        <p>
          Ces garanties ne couvrent pas l&apos;usure normale, les dommages
          résultant d&apos;un choc, d&apos;une immersion au-delà de
          l&apos;étanchéité annoncée, d&apos;une intervention par un tiers ou
          d&apos;un défaut d&apos;entretien.
        </p>
        <p>
          Toute demande est à adresser à{" "}
          <a href={`mailto:${entreprise.email}`}>{entreprise.email}</a>.
        </p>
      </Article>

      <Article id="article-9" titre="Article 9 — Médiation de la consommation">
        <p>
          En cas de litige non résolu directement, le client consommateur peut
          recourir gratuitement à un médiateur de la consommation
          (article L612-1 du code de la consommation) :
        </p>
        <p>
          <ARemplir valeur={entreprise.mediateur.nom} quoi="nom du médiateur" />
          {entreprise.mediateur.adresse ? ` — ${entreprise.mediateur.adresse}` : null}
          {entreprise.mediateur.site ? (
            <>
              {" — "}
              <a
                href={entreprise.mediateur.site}
                target="_blank"
                rel="noopener noreferrer"
              >
                {entreprise.mediateur.site}
              </a>
            </>
          ) : (
            <>
              {" — "}
              <ARemplir valeur={null} quoi="site du médiateur" />
            </>
          )}
        </p>
        <p>
          Le client peut également utiliser la plateforme européenne de règlement
          en ligne des litiges :{" "}
          <a
            href="https://ec.europa.eu/consumers/odr"
            target="_blank"
            rel="noopener noreferrer"
          >
            ec.europa.eu/consumers/odr
          </a>
          .
        </p>
      </Article>

      <Article id="article-10" titre="Article 10 — Données personnelles">
        <p>
          Le traitement des données collectées à l&apos;occasion d&apos;une
          commande est décrit dans la{" "}
          <Link href="/confidentialite">politique de confidentialité</Link>.
        </p>
      </Article>

      <Article id="article-11" titre="Article 11 — Droit applicable et litiges">
        <p>
          Les présentes conditions sont soumises au droit français. À défaut de
          résolution amiable, les tribunaux français sont compétents. Le
          consommateur peut saisir soit la juridiction du lieu où il demeurait au
          moment de la conclusion du contrat, soit celle du lieu de la livraison
          effective.
        </p>
      </Article>
    </PageLegale>
  );
}
