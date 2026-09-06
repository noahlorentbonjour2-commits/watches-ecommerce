import {
  categoryById,
  layerOrder,
  optionFor,
  type Configuration,
} from "@/lib/parts";

type SummaryProps = {
  config: Configuration;
  total: number;
};

const euro = (value: number) =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);

export default function Summary({ config, total }: SummaryProps) {
  return (
    <section
      aria-labelledby="recapitulatif-titre"
      className="mt-10 border border-white/10 bg-navy-950/50 p-7 sm:p-8"
    >
      <h2
        id="recapitulatif-titre"
        className="text-[0.68rem] uppercase tracking-luxe text-gold-500"
      >
        Récapitulatif
      </h2>

      <dl className="mt-6 divide-y divide-white/8">
        {layerOrder.map((categoryId) => {
          const category = categoryById(categoryId);
          const option = optionFor(categoryId, config[categoryId]);
          return (
            <div
              key={categoryId}
              className="flex items-baseline justify-between gap-4 py-3.5 first:pt-0"
            >
              <dt className="text-sm text-silver-300">
                <span className="text-silver-500">{category.label} — </span>
                {option.image ? option.label : "lunette d'origine"}
              </dt>
              <dd className="shrink-0 text-sm text-cream">
                {option.extra === 0 ? "Inclus" : `+ ${euro(option.extra)}`}
              </dd>
            </div>
          );
        })}

        <div className="flex items-baseline justify-between gap-4 pt-5">
          <dt className="font-serif text-xl text-cream">Total</dt>
          <dd className="font-serif text-3xl text-gold-400">{euro(total)}</dd>
        </div>
      </dl>

      <p className="mt-5 text-xs leading-relaxed text-silver-500">
        Mouvement automatique et verre saphir bombé compris. Livraison offerte en
        France — délai d&apos;assemblage 10 jours ouvrés.
      </p>
    </section>
  );
}
