import type { Metadata } from "next";
import Link from "next/link";
import PageLegale, { Article } from "@/components/legal/PageLegale";
import { entreprise } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Cookies",
  description:
    "Ce site ne dépose aucun cookie et ne charge aucun service tiers de mesure d'audience.",
};

export default function CookiesPage() {
  return (
    <PageLegale
      eyebrow="Traceurs"
      titre="Politique relative aux cookies"
      chapeau="Ce site ne dépose aucun cookie, n'utilise aucun stockage local et ne charge aucun script tiers."
    >
      <Article titre="Aucun cookie déposé">
        <p>
          La consultation de ce site n&apos;entraîne le dépôt d&apos;aucun
          cookie, ni de {entreprise.denomination}, ni d&apos;un tiers. Aucune
          donnée n&apos;est écrite dans le stockage local de votre navigateur.
        </p>
        <p>
          C&apos;est la raison pour laquelle aucune bannière de consentement ne
          vous est présentée : en l&apos;absence de traceur soumis à
          consentement, l&apos;article 82 de la loi Informatique et Libertés
          n&apos;impose aucun recueil préalable.
        </p>
      </Article>

      <Article titre="Aucune mesure d'audience">
        <p>
          Le site n&apos;intègre ni outil statistique, ni régie publicitaire, ni
          bouton de réseau social traçant votre navigation. Les polices de
          caractères et les images sont servies depuis le domaine du site,
          sans requête vers un service extérieur.
        </p>
      </Article>

      <Article titre="Pendant le paiement">
        <p>
          Au moment de régler une commande, vous êtes redirigé vers une page
          hébergée par Stripe. Ce site, distinct du nôtre, dépose ses propres
          cookies, strictement nécessaires au fonctionnement et à la sécurité du
          paiement — notamment la prévention de la fraude.
        </p>
        <p>
          Ces cookies relèvent de la politique de Stripe :{" "}
          <a
            href="https://stripe.com/fr/legal/cookies-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            stripe.com/fr/legal/cookies-policy
          </a>
          .
        </p>
      </Article>

      <Article titre="Journaux du serveur">
        <p>
          Indépendamment de tout cookie, l&apos;hébergeur enregistre des journaux
          techniques de connexion (adresse IP, date, page demandée) nécessaires à
          la sécurité et au bon fonctionnement du service. Leur traitement est
          décrit dans la{" "}
          <Link href="/confidentialite">politique de confidentialité</Link>.
        </p>
      </Article>

      <Article titre="Si cela devait changer">
        <p>
          L&apos;ajout ultérieur d&apos;un outil de mesure d&apos;audience ou de
          publicité donnerait lieu à la mise en place d&apos;une bannière de
          consentement et à la mise à jour de la présente page avant toute
          activation.
        </p>
      </Article>
    </PageLegale>
  );
}
