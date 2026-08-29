import Image from "next/image";
import {
  categoryById,
  layerOrder,
  optionFor,
  type Configuration,
  type PartCategoryId,
} from "@/lib/parts";

type WatchPreviewProps = {
  config: Configuration;
  /**
   * Catégorie ouverte dans les sélecteurs. Toutes ses variantes sont montées en
   * opacité 0 : le prochain clic ne déclenche aucun téléchargement, donc aucun
   * clignotement de l'aperçu.
   */
  preloadCategory: PartCategoryId;
};

/**
 * Aperçu de la montre : les calques 1000×1000 sont empilés dans l'ordre
 * physique (bracelet → boîtier → cadran → lunette → aiguilles → trotteuse).
 */
export default function WatchPreview({
  config,
  preloadCategory,
}: WatchPreviewProps) {
  const description = layerOrder
    .map((id) => {
      const option = optionFor(id, config[id]);
      const label = categoryById(id).label.toLowerCase();
      return option.image
        ? `${label} ${option.label.toLowerCase()}`
        : `sans ${label}`;
    })
    .join(", ");

  return (
    <div className="relative aspect-square w-full">
      <div
        aria-hidden="true"
        className="absolute inset-[6%] rounded-full bg-[radial-gradient(circle,var(--color-navy-700)_0%,transparent_68%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-[3%] rounded-full border border-gold-500/12"
      />

      <div
        role="img"
        aria-label={`Aperçu de votre montre : ${description}.`}
        className="absolute inset-0"
      >
        {layerOrder.map((categoryId, index) => {
          const selected = optionFor(categoryId, config[categoryId]);
          const options =
            categoryId === preloadCategory
              ? categoryById(categoryId).options
              : [selected];

          return (
            <div key={categoryId} className="absolute inset-0">
              {options.map((option) =>
                // L'option « Aucune » n'a pas de calque à dessiner.
                option.image ? (
                  <Image
                    key={option.id}
                    src={option.image}
                    alt=""
                    aria-hidden="true"
                    fill
                    sizes="(max-width: 1024px) 88vw, 40vw"
                    preload={index < 2 && option.id === selected.id}
                    className={`object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.55)] transition-opacity duration-300 ${
                      option.id === selected.id ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ) : null,
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
