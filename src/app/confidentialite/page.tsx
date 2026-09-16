import type { Metadata } from "next";
import Link from "next/link";
import PageLegale, { ARemplir, Article } from "@/components/legal/PageLegale";
import { entreprise, sousTraitants } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Données collectées par My Dial, finalités, destinataires, durées de conservation et droits des personnes.",
};

export default function ConfidentialitePage() {
  return (
    <PageLegale
      eyebrow="Vos données"
      titre="Politique de confidentialité"
      chapeau="Ce site collecte le strict nécessaire pour traiter une commande et répondre à un message. Rien d'autre."
    >
      <Article titre="Responsable du traitement">
        <p>
          <strong>{entreprise.denomination}</strong>,{" "}
          <ARemplir valeur={entreprise.adresse} quoi="adresse du siège" />, SIRET{" "}
          <ARemplir valeur={entreprise.siret} quoi="numéro SIRET" />. Contact :{" "}
          <a href={`mailto:${entreprise.email}`}>{entreprise.email}</a>.
        </p>
      </Article>

      <Article titre="Données collectées et finalités">
        <p>Aucune donnée n&apos;est collectée à la simple consultation du site.</p>
        <ul>
          <li>
            <strong>Commande</strong> — nom, e-mail, téléphone, adresse de
            livraison et de facturation, détail de la configuration choisie.
            Finalité : exécuter la vente, livrer, assurer le suivi et le service
            après-vente. Base légale : exécution du contrat (article 6.1.b du
            RGPD). Ces données sont nécessaires : sans elles, la commande ne peut
            aboutir.
          </li>
          <li>
            <strong>Formulaire de contact</strong> — nom, e-mail, sujet et
            contenu du message. Finalité : répondre à la demande. Base légale :
            intérêt légitime à traiter les sollicitations reçues
            (article 6.1.f).
          </li>
          <li>
            <strong>Newsletter</strong> — adresse e-mail. Finalité : envoyer les
            nouveautés. Base légale : consentement (article 6.1.a), retirable à
            tout moment.
          </li>
          <li>
            <strong>Journaux techniques</strong> — adresse IP et informations de
            connexion, conservées par l&apos;hébergeur. Finalité : sécurité et
            bon fonctionnement du service. Base légale : intérêt légitime.
          </li>
        </ul>
        <p>
          <strong>Aucune donnée bancaire ne transite par ce site.</strong> Le
          paiement se déroule intégralement sur une page hébergée par Stripe :{" "}
          {entreprise.denomination} ne voit ni ne conserve de numéro de carte.
        </p>
      </Article>

      <Article titre="Destinataires">
        <p>
          Les données ne sont ni vendues, ni louées, ni cédées à des fins
          publicitaires. Elles sont accessibles à {entreprise.denomination} et
          aux seuls prestataires nécessaires au service :
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-white/15 text-silver-500">
                <th className="py-2 pr-4 font-normal">Prestataire</th>
                <th className="py-2 pr-4 font-normal">Rôle</th>
                <th className="py-2 font-normal">Lieu</th>
              </tr>
            </thead>
            <tbody>
              {sousTraitants.map((s) => (
                <tr key={s.nom} className="border-b border-white/8 align-top">
                  <td className="py-3 pr-4">
                    <a href={s.politique} target="_blank" rel="noopener noreferrer">
                      {s.nom}
                    </a>
                  </td>
                  <td className="py-3 pr-4">{s.role}</td>
                  <td className="py-3">{s.lieu}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Certains de ces prestataires sont établis aux États-Unis. Les
          transferts correspondants sont encadrés par les clauses contractuelles
          types de la Commission européenne et, le cas échéant, par
          l&apos;adhésion au cadre de protection des données UE–États-Unis.
        </p>
        <p>
          Des données peuvent également être communiquées à un transporteur pour
          la livraison, ainsi qu&apos;aux autorités sur réquisition légale.
        </p>
      </Article>

      <Article titre="Durées de conservation">
        <ul>
          <li>
            <strong>Commandes et factures</strong> — dix ans à compter de la
            clôture de l&apos;exercice, en application des obligations comptables
            (article L123-22 du code de commerce).
          </li>
          <li>
            <strong>Messages de contact</strong> — trois ans à compter du dernier
            échange.
          </li>
          <li>
            <strong>Newsletter</strong> — jusqu&apos;au retrait du consentement,
            puis trois ans au maximum.
          </li>
          <li>
            <strong>Journaux techniques</strong> — douze mois au maximum.
          </li>
        </ul>
      </Article>

      <Article titre="Vos droits">
        <p>
          Conformément au règlement (UE) 2016/679 et à la loi Informatique et
          Libertés, vous disposez des droits d&apos;accès, de rectification,
          d&apos;effacement, de limitation, d&apos;opposition et de portabilité,
          ainsi que du droit de définir des directives relatives au sort de vos
          données après votre décès.
        </p>
        <p>
          Pour les exercer, écrivez à{" "}
          <a href={`mailto:${entreprise.email}`}>{entreprise.email}</a>. Une
          réponse vous sera apportée dans un délai d&apos;un mois. Une preuve
          d&apos;identité pourra être demandée en cas de doute raisonnable.
        </p>
        <p>
          Si la réponse ne vous satisfait pas, vous pouvez introduire une
          réclamation auprès de la CNIL, 3 place de Fontenoy, TSA 80715, 75334
          Paris Cedex 07 —{" "}
          <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">
            cnil.fr
          </a>
          .
        </p>
      </Article>

      <Article titre="Profilage et décision automatisée">
        <p>
          Aucun profilage n&apos;est réalisé et aucune décision produisant des
          effets juridiques n&apos;est prise sur le seul fondement d&apos;un
          traitement automatisé.
        </p>
      </Article>

      <Article titre="Cookies">
        <p>
          Ce site ne dépose aucun cookie. Voir la{" "}
          <Link href="/cookies">politique relative aux cookies</Link>.
        </p>
      </Article>
    </PageLegale>
  );
}
