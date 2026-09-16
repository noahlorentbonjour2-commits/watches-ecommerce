import type { Metadata } from "next";
import PageLegale, { ARemplir, Article } from "@/components/legal/PageLegale";
import { entreprise, hebergeur } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Éditeur, hébergeur et propriété intellectuelle du site My Dial.",
};

export default function MentionsLegalesPage() {
  return (
    <PageLegale
      eyebrow="Informations légales"
      titre="Mentions légales"
      chapeau="Informations publiées en application de l'article 6 III de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique."
    >
      <Article titre="Éditeur du site">
        <dl className="grid gap-x-8 gap-y-3 sm:grid-cols-[10rem_1fr]">
          <dt className="text-silver-500">Dénomination</dt>
          <dd>{entreprise.denomination}</dd>

          <dt className="text-silver-500">Forme juridique</dt>
          <dd>
            <ARemplir valeur={entreprise.formeJuridique} quoi="forme juridique" />
          </dd>

          <dt className="text-silver-500">Responsable</dt>
          <dd>
            <ARemplir valeur={entreprise.responsable} quoi="nom du responsable" />
          </dd>

          <dt className="text-silver-500">Siège</dt>
          <dd>
            <ARemplir valeur={entreprise.adresse} quoi="adresse du siège" />
          </dd>

          <dt className="text-silver-500">SIRET</dt>
          <dd>
            <ARemplir valeur={entreprise.siret} quoi="numéro SIRET" />
          </dd>

          <dt className="text-silver-500">Immatriculation</dt>
          <dd>
            <ARemplir valeur={entreprise.rcs} quoi="RCS ou RM" />
          </dd>

          <dt className="text-silver-500">TVA</dt>
          <dd>
            {entreprise.tvaIntracommunautaire ?? (
              "TVA non applicable, article 293 B du code général des impôts"
            )}
          </dd>

          <dt className="text-silver-500">Téléphone</dt>
          <dd>
            <ARemplir valeur={entreprise.telephone} quoi="téléphone" />
          </dd>

          <dt className="text-silver-500">E-mail</dt>
          <dd>
            <a href={`mailto:${entreprise.email}`}>{entreprise.email}</a>
          </dd>
        </dl>
      </Article>

      <Article titre="Directeur de la publication">
        <p>
          <ARemplir valeur={entreprise.responsable} quoi="nom du responsable" />,
          en qualité de représentant légal de {entreprise.denomination}.
        </p>
      </Article>

      <Article titre="Hébergeur">
        <p>
          Le site est hébergé par <strong>{hebergeur.denomination}</strong>,{" "}
          {hebergeur.adresse} —{" "}
          <a href={hebergeur.site} target="_blank" rel="noopener noreferrer">
            {hebergeur.site}
          </a>
          .
        </p>
      </Article>

      <Article titre="Propriété intellectuelle">
        <p>
          L&apos;ensemble du site — structure, textes, photographies, visuels des
          composants et du configurateur, logo — est protégé par le droit de la
          propriété intellectuelle. Toute reproduction ou représentation, totale
          ou partielle, sans autorisation écrite préalable est interdite.
        </p>
        <p>
          Les marques citées dans les descriptions de modèles appartiennent à
          leurs titulaires respectifs. Les montres proposées sont des pièces
          modifiées et assemblées par {entreprise.denomination} : elles ne sont
          ni fabriquées, ni distribuées, ni garanties par les titulaires de ces
          marques, et {entreprise.denomination} n&apos;entretient avec eux aucun
          lien de partenariat ou d&apos;affiliation.
        </p>
      </Article>

      <Article titre="Responsabilité">
        <p>
          Les visuels du configurateur sont une simulation destinée à figurer le
          rendu de l&apos;assemblage. De légères variations de teinte ou de
          finition peuvent exister entre la simulation et la pièce livrée, sans
          que cela constitue un défaut de conformité.
        </p>
        <p>
          {entreprise.denomination} s&apos;efforce de maintenir le site
          accessible et les informations à jour, sans garantie d&apos;absence
          d&apos;interruption ni d&apos;erreur.
        </p>
      </Article>

      <Article titre="Droit applicable">
        <p>
          Le présent site est soumis au droit français. Pour toute question,
          écrivez à{" "}
          <a href={`mailto:${entreprise.email}`}>{entreprise.email}</a>.
        </p>
      </Article>
    </PageLegale>
  );
}
